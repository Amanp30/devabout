import React, { useEffect, useState } from "react";
import Menu from "../components/menus/menu";
import Profilemenu from "../components/menus/profile";
import { userid, thetoken } from "../actions/auth";
import axios from "axios";
import Notifysuccess from "../components/notify/notifysuccess";
import Notifyerror from "../components/notify/notifyerror";
import { socialprofiles } from "../components/socialmedias";
import css from "../styles/forpart.module.css";
import { API } from "../config";

function index() {
  // Declare a new state variable, which we'll call "inputs"
  const [updateid, setupdateid] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [Error, setError] = useState(false);
  const [Success, setSuccess] = useState(false);

  function generateUUID() {
    let d = new Date().getTime();
    if (
      typeof performance !== "undefined" &&
      typeof performance.now === "function"
    ) {
      d += performance.now();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  const fetchdata = () => {
    let config = {
      method: "get",
      url: `${API}/api/aboutsimple/${userid()}`,
      headers: { Authorization: `Bearer ${thetoken()}` },
    };

    axios(config)
      .then((response) => {
        setInputs(response.data.links);
        setupdateid(response.data._id);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const savedata = (e) => {
    e.preventDefault();

    // Handle File Data from the state Before Sending
    /*  const form = document.getElementById("myform");
    const data = new FormData(form);
 */
    let config = {
      method: "post",
      url: `${API}/api/updatelinkprofiles/${updateid}`,
      headers: { Authorization: `Bearer ${thetoken()}` },
      data: { links: inputs },
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSuccess(true);
        fetchdata();
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  function handleAddInput() {
    // Add a new element to the inputs array
    if (inputs[inputs.length - 1] !== "" && inputs.length < 6) {
      setInputs([...inputs, ""]);
    }
  }

  // This function will be called when any of the input boxes are changed
  function handleInputChange(e, index) {
    // Make a copy of the inputs array
    const updatedInputs = [...inputs];
    // Update the value of the input that was changed
    updatedInputs[index] = e.target.value;
    // Set the inputs state to the updated array
    setInputs(updatedInputs);
    console.log(inputs);
  }

  function handleRemoveInput(index) {
    // Make a copy of the inputs array
    const updatedInputs = [...inputs];
    // Remove the element at the specified index
    updatedInputs.splice(index, 1);
    // Set the inputs state to the updated array
    setInputs(updatedInputs);
  }

  return (
    <div className={css.marginji}>
      <Menu />
      <form
        className="ffg2"
        method="post"
        onSubmit={(e) => savedata(e)}
        encType="multipart/form-data"
        id="myform"
      >
        <Profilemenu thefun={(e) => saveabout(e)} title="Links" />
        <div className={css.twoparts}>
          <div className={css.pt1}>
            <p className={css.topp}>Your online presence</p>
            <div className={css.pspd}>
              <p className={css.pmrgn}>
                Add links to your website, blog, GitHub, LinkedIn, Stack
                Overflow, Dribbble, Kaggle or anywhere where your work stands
                out.
              </p>
              {inputs.map((input, index) => (
                <>
                  <div className={css.alllinks} key={index}>
                    <label
                      htmlFor={`profile-${index}`}
                      className={css.labellink}
                    >
                      {input
                        ? socialprofiles.find((profile) =>
                            input.toLowerCase().includes(profile.website)
                          )
                          ? socialprofiles.find((profile) =>
                              input.toLowerCase().includes(profile.website)
                            ).name
                          : "Link"
                        : "Link"}
                    </label>
                    <div className={css.ffgrm}>
                      <input
                        key={index}
                        type="url"
                        value={input}
                        name={`profile-${index}`}
                        onChange={(e) => handleInputChange(e, index)}
                        className={css.lurl}
                        required
                      />
                      <button
                        onClick={() => handleRemoveInput(index)}
                        className={css.rmbtn}
                      >
                        ⛔
                      </button>
                    </div>
                  </div>
                </>
              ))}
              {/* Render the "Add new" button */}
              {inputs.length < 6 && (
                <button onClick={handleAddInput} className={css.addnewbtn}>
                  ➕ Add new
                </button>
              )}{" "}
            </div>
          </div>
          <div className={css.pt2}></div>
        </div>
      </form>
      {Success && (
        <Notifysuccess
          message="Links updated successfully"
          Success={Success}
          setSuccess={setSuccess}
        />
      )}
      {Error && (
        <Notifyerror
          message="Sorry but unable to save data"
          Error={Error}
          setError={setError}
        />
      )}
    </div>
  );
}

export default index;
