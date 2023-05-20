import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../config";
import { thetoken } from "../../actions/auth";
import UrlsInput from "../../components/myinputs/urlsinput";
import Menu from "../../components/menus/menu";
import Imageinput from "../../components/myinputs/imageinput";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";

function MyComponent({ data }) {
  const [values, setValues] = useState(data);
  const [Uploading, setUploading] = useState(false);
  const [Redirecting, setRedirecting] = useState(false);

  const Router = useRouter();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    // Check if the form is submitted
    event.preventDefault();

    setUploading(true);

    var form = document.getElementById("updateForm");
    const formData = new FormData(form);

    let config = {
      method: "post",
      url: `${API}/api/projects/update/${values._id}`,
      headers: {
        Authorization: `Bearer ${thetoken()}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    axios
      .request(config)
      .then(function (response) {
        setTimeout(() => {
          setRedirecting(true);
          setTimeout(() => {
            Router.push("/projects");
          }, 1000);
        }, 1500);
      })
      .catch(function (error) {
        setUploading(false);
        console.log(error);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed, code will not run.");
      event.preventDefault();
    }
  };

  useEffect(() => {
    const form = document.getElementById("updateForm");
    form.addEventListener("submit", handleSubmit);
    form.addEventListener("keypress", handleKeyPress);
    return () => {
      form.removeEventListener("submit", handleSubmit);
      form.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  /* asg */

  const handleCheckbox = (event) => {
    const { name, value, checked } = event.target;
    setValues((prevState) => {
      // Copy the platforms array from the previous state
      const platforms = [...prevState.platforms];
      // Check if the checkbox is checked or not
      if (checked) {
        // If checked, add the value to the platforms array
        platforms.push(value);
      } else {
        // If not checked, remove the value from the platforms array
        platforms.splice(platforms.indexOf(value), 1);
      }
      // Return a new state object with the updated platforms array
      return {
        ...prevState,
        platforms,
      };
    });
  };

  return (
    <>
      <Menu />
      {Uploading ? (
        <div className="jichalo">
          <Oval
            height={20}
            width={20}
            color="#00ff18"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="white"
            strokeWidth={10}
            strokeWidthSecondary={10}
          />
          <span> {Redirecting ? "Data Saved " : "Saving Data"}</span>
        </div>
      ) : null}
      <div className="topgbar">
        <h1 className="pjname">Tell us more about {values.projectname}</h1>
      </div>
      <form id="updateForm">
        <div className="magio">
          <div className="projectgroup">
            <label htmlFor="projectname">
              Project Name{" "}
              <span
                style={{
                  fontSize: ".8em",
                  color: values.projectname?.length >= 50 ? "red" : "black",
                }}
              >
                ({values.projectname?.length}/50)
              </span>
            </label>
            <span className="mifgo">WHAT ARE YOU CALLING IT?</span>
            <input
              type="text"
              name="projectname"
              value={values.projectname}
              onChange={handleInputChange}
              maxLength={50}
            />
          </div>
          <div className="projectgroup">
            <label htmlFor="tagline">
              Tagline{" "}
              <span
                style={{
                  fontSize: ".8em",
                  color: values.tagline?.length >= 200 ? "red" : "black",
                }}
              >
                ({values.tagline?.length}/200)
              </span>
            </label>
            <span className="mifgo">
              WRITE A SHORT, SHARP AND ON POINT DESCRIPTION OF YOUR PROJECT
            </span>

            <textarea
              name="tagline"
              value={values.tagline}
              onChange={handleInputChange}
              maxLength={200}
            />
          </div>
          <div className="projectgroup">
            <label>
              Problem It Solves{" "}
              <span
                style={{
                  fontSize: ".8em",
                  color: values.problems?.length >= 2000 ? "red" : "black",
                }}
              >
                ({values.problems?.length}/2000)
              </span>
            </label>
            <span className="mifgo">
              DESCRIBE WHAT CAN PEOPLE USE IT FOR, OR HOW IT MAKES EXISTING
              TASKS EASIER/SAFER E.T.C (MARKDOWN SUPPORTED){" "}
            </span>
            <textarea
              name="problems"
              value={values.problems}
              onChange={handleInputChange}
              maxLength={2000}
            />
          </div>
          <div className="projectgroup">
            <label>
              Challenges I ran into{" "}
              <span
                style={{
                  fontSize: ".8em",
                  color: values.challenges?.length >= 2000 ? "red" : "black",
                }}
              >
                ({values.challenges?.length}/2000)
              </span>
            </label>
            <span className="mifgo">
              TELL US ABOUT ANY SPECIFIC BUG OR HURDLE YOU RAN INTO WHILE
              BUILDING THIS PROJECT. HOW DID YOU GET OVER IT?
            </span>
            <textarea
              name="challenges"
              value={values.challenges}
              onChange={handleInputChange}
              maxLength={2000}
            />
          </div>
          <div className="projectgroup">
            <label>
              Technology{" "}
              <span
                style={{
                  fontSize: ".8em",
                  color: values.technology?.length == 5 ? "red" : "black",
                }}
              >
                ({values.technology?.length}/5)
              </span>
            </label>
            <span className="mifgo">
              WRITE LIST OF TECHNOLOGIES YOU USED IN BUILDING THE PROJECT.
            </span>
            <UrlsInput
              compname={`technology`}
              array={values.technology}
              setInput={setValues}
              type="text"
              required={true}
              placeholder="Type technology and press enter to add more"
            />
          </div>
          <div className="projectgroup">
            <label>
              Links{" "}
              <span
                style={{
                  fontSize: ".8em",
                  color: values.links?.length == 5 ? "red" : "black",
                }}
              >
                ({values.links?.length}/5)
              </span>
            </label>
            <span className="mifgo">
              ADD LINKS TO GITHUB, WEBSITE, APP STORE E.T.C OR WHEREVER THE
              PROJECT CAN BE TESTED LIVE
            </span>
            <UrlsInput
              compname={`links`}
              array={values.links}
              setInput={setValues}
              type="url"
              required={true}
              placeholder="Type a link and press `Enter` to add more"
            />
          </div>

          <div className="projectgroup">
            <label>Video Demo </label>
            <span className="mifgo">
              ADD LINK TO YOUTUBE VIDEO DEMOING THE FUNCTIONING OF THE PROJECT.
            </span>
            <input
              type="text"
              name="videourl"
              value={values.videourl}
              onChange={handleInputChange}
            />
          </div>

          {/* logo test */}

          <div className="projectgroup">
            <label>Logo</label>
            <span className="mifgo">
              UPLOAD A LOGO TO REPRESENT YOUR PROJECT (SIZE: MAX 1MB)
            </span>
            <Imageinput
              iname={`projectlogo`}
              imgvalue={values.projectlogo}
              folder="projectlogo"
            />
          </div>

          <div className="projectgroup" style={{ marginTop: "1.5em" }}>
            <label>Demo Images</label>
            <span className="mifgo">
              DEMO PICTURES (SIZE: MAX 1MB EACH) SHOWCASING YOUR PROJECT.
            </span>
            <div className="rowimg">
              <Imageinput
                iname={`projectimgone`}
                imgvalue={values.imageone}
                folder="projectimages"
              />
              <Imageinput
                iname={`projectimgtwo`}
                imgvalue={values.imagetwo}
                folder="projectimages"
              />
              <Imageinput
                iname={`projectimgthree`}
                imgvalue={values.imagethree}
                folder="projectimages"
              />
            </div>
          </div>
        </div>

        {/* Checkboxes  */}
        <div className="thecheks">
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2em",
              marginBottom: "1em",
            }}
          >
            Platforms
          </p>

          <section>
            <div className="wowcheck">
              <input
                type="checkbox"
                name="platforms"
                value="Web"
                checked={values.platforms?.includes("Web")}
                onChange={handleCheckbox}
              />
              <span>Web</span>
            </div>
            <div className="wowcheck">
              <input
                type="checkbox"
                name="platforms"
                value="Android"
                checked={values.platforms?.includes("Android")}
                onChange={handleCheckbox}
              />
              <span>Android</span>
            </div>
            <div className="wowcheck">
              <input
                type="checkbox"
                name="platforms"
                value="iOS"
                checked={values.platforms?.includes("iOS")}
                onChange={handleCheckbox}
              />
              <span>iOS</span>
            </div>
            <div className="wowcheck">
              <input
                type="checkbox"
                name="platforms"
                value="macOS"
                checked={values.platforms?.includes("macOS")}
                onChange={handleCheckbox}
              />
              <span>macOS</span>
            </div>
          </section>
          <div className="savediv">
            <input
              type="submit"
              className="savebtn"
              value={"Publish"}
              disabled={Uploading ? true : false}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export async function getServerSideProps({ params }) {
  //var res = await fetch(`http://localhost:8000/api/${params.slug}`);
  console.log(params.username);
  var res = await fetch(
    `http://localhost:8000/api/projects/${params.projectUrl}`
  );
  var data = await res.json();
  console.log(data);

  if (!data) {
    return {
      redirect: {
        destination: "/new/no-project-found",
      },
    };
  } else {
    return {
      props: { data }, // will be passed to the page component as props
    };
  }
}

export default MyComponent;
