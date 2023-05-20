import React, { useEffect, useState } from "react";
import Menu from "../components/menus/menu";
import Profilemenu from "../components/menus/profile";
import { userid, thetoken } from "../actions/auth";
import axios from "axios";
import Notifysuccess from "../components/notify/notifysuccess";
import Notifyerror from "../components/notify/notifyerror";
import css from "../styles/forpart.module.css";
import { API } from "../config";

function settings() {
  const [values, setvalues] = useState([]);
  const [usererror, setusererror] = useState(false);
  const [pserror, setpserror] = useState([]);
  const [Error, setError] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [profilephoto, setprofilephoto] = useState();
  const [loading, setloading] = useState(false);

  const handleprofile = (e) => {
    if (e.target.type === "file") {
      var checkType = e.target.files[0];
      // Check the file type
      if (checkType && checkType.type.startsWith("image/")) {
        // The file is an image file, so allow it to be selected
        setprofilephoto({ [e.target.name]: e.target.files[0] });
        return true;
      } else {
        // The file is not an image file, so show an error message and reset the input field
        alert("Please select an image file.");
        e.target.value = "";
        setprofilephoto(null);
        return false;
      }
    }
  };

  const fetchdata = () => {
    let config = {
      method: "get",
      url: `${API}/api/aboutsimple/${userid()}`,
      headers: { Authorization: `Bearer ${thetoken()}` },
    };

    axios(config)
      .then((response) => {
        setvalues(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const savedata = (e) => {
    e.preventDefault();

    // Handle File Data from the state Before Sending
    const form = document.getElementById("myform");
    const data = new FormData(form);

    setloading(true);
    const hasSpace = /\s/.test(values.username);
    if (hasSpace) {
      alert("There are spaces in the text!");
      setloading(false);
      return false;
    }

    let config = {
      method: "post",
      url: `${API}/api/updateusername/${values._id}/${values.postedBy}`,
      headers: { Authorization: `Bearer ${thetoken()}` },
      data: data,
      onProgress: (event) => {
        const progress = (event.loaded / event.total) * 100;
        console.log(`Upload progress: ${progress}%`);
      },
    };

    axios(config)
      .then((response) => {
        console.log(response);
        setloading(false);
        if (response.data.pserror) {
          setusererror(true);
          setpserror(response.data.pserror);
        } else {
          setSuccess(true);
          fetchdata();
        }
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const onchangeHandle = (e) => {
    if (
      e.target.type === "text" ||
      e.target.type === "url" ||
      e.target.type === "select-one" ||
      e.target.type === "textarea"
    ) {
      setvalues({ ...values, [e.target.name]: e.target.value });
    }
    console.log(e.target.type);
    console.log(values);
  };

  const saveabout = (e) => {
    e.preventDefault();
  };

  const deletephoto = (e, profileurl) => {
    e.preventDefault();

    setloading(true);

    let config = {
      method: "post",
      url: `${API}/api/deletephoto/${profileurl}/${values._id}`,
      headers: { Authorization: `Bearer ${thetoken()}` },
    };

    axios(config)
      .then((response) => {
        console.log(response);
        setloading(false);
        if (response.data.pserror) {
          setusererror(true);
          setpserror(response.data.pserror);
        } else {
          setSuccess(true);
          setprofilephoto(null);
          fetchdata();
        }
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  return (
    <>
      <div className={css.marginji}>
        <Menu />
        <form
          className="ffg2"
          method="post"
          onSubmit={(e) => savedata(e)}
          encType="multipart/form-data"
          id="myform"
        >
          <Profilemenu
            thefun={(e) => saveabout(e)}
            title="Settings"
            loadnow={loading}
          />
          <div className={css.twoparts}>
            <div className={css.pt1}>
              <p className={css.topp}>Publish Profile</p>
              <div className={css.pspd}>
                <div className={css.ffg}>
                  <label htmlFor="username">User Name</label>
                  <input
                    type="text"
                    name="username"
                    value={typeof values === "object" && values.username}
                    onChange={(e) => onchangeHandle(e)}
                    title="Last Name"
                  />
                  <a
                    style={{
                      textDecoration: "none",
                      fontWeight: "bolder",
                      color: "black",
                    }}
                    target="_blacnk"
                    href={"/@" + values.username}
                  >
                    View Profile{" "}
                    <img
                      src="/static/externallink.svg"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className={css.pt2}>
              {" "}
              <p className={css.topp}>Profile Image</p>
              <div className={css.pspd}>
                <div className={css.klgvg}>
                  <div className={css.lft}>
                    {" "}
                    <div className={css.profile}>
                      {profilephoto &&
                      profilephoto.profilephoto instanceof Blob ? (
                        <>
                          <img
                            src={
                              typeof profilephoto.profilephoto === "object" &&
                              profilephoto.profilephoto instanceof Blob &&
                              window.URL.createObjectURL(
                                profilephoto.profilephoto
                              )
                            }
                            alt="profile photo"
                            className={css.profilepic}
                          />
                        </>
                      ) : (
                        typeof values === "object" &&
                        values.profilephoto && (
                          <img
                            src={`${API}/profile/${values.profilephoto}`}
                            alt="profile photo"
                            className={css.profilepic}
                          />
                        )
                      )}
                    </div>
                  </div>
                  <div className={css.rght}>
                    <div className={css.hellok}>
                      <input
                        type="file"
                        name="profilephoto"
                        accept="image/jpeg,image/png,image/gif"
                        title="profile photo"
                        id={css.profilepic}
                        onChange={(e) => handleprofile(e)}
                      />
                    </div>
                    {values.profilephoto !== "default-one.png" && (
                      <div
                        className={css.hellok + " " + css.delpic}
                        onClick={(e) => deletephoto(e, values.profilephoto)}
                      >
                        <label htmlFor="profilephoto" className={css.makeit}>
                          Delete Photo
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {Success && (
            <Notifysuccess
              message="Changes Saved"
              Success={Success}
              setSuccess={setSuccess}
            />
          )}
          {usererror && (
            <Notifyerror
              message={pserror}
              Error={usererror}
              setError={setusererror}
            />
          )}
          {Error && (
            <Notifyerror
              message="Sorry but unable to save data"
              Error={Error}
              setError={setError}
            />
          )}
        </form>
      </div>
    </>
  );
}

export default settings;
