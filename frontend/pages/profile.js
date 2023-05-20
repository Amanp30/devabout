import React, { useEffect, useState } from "react";
import Menu from "../components/menus/menu";
import Profilemenu from "../components/menus/profile";
import { getCookie, userid, thetoken } from "../actions/auth";
import axios from "axios";
import Notifysuccess from "../components/notify/notifysuccess";
import Notifyerror from "../components/notify/notifyerror";
import Link from "next/link";
import css from "../styles/forpart.module.css";
import { API } from "../config";

function index() {
  const [values, setvalues] = useState([]);
  const [Error, setError] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [loading, setloading] = useState(false);

  const fetchdata = () => {
    let config = {
      method: "get",
      url: `${API}/api/aboutsimple/${userid()}`,
      headers: { Authorization: `Bearer ${thetoken()}` },
    };

    axios(config)
      .then((response) => {
        setvalues(response.data);
        console.log(response.data);
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

    let config = {
      method: "post",
      url: `${API}/api/updateaboutsimple/${values._id}`,
      headers: { Authorization: `Bearer ${thetoken()}` },
      data: values,
    };

    axios(config)
      .then((response) => {
        setSuccess(true);
        setloading(false);
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

  function nochangepf(e) {
    e.preventDefault();
    // hide the notification div element
    var v = document.querySelector("#hidenotify");
    v.style.display = "none";
    document.cookie = "hidnot=true";
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
        <Profilemenu
          thefun={(e) => saveabout(e)}
          title="Profile"
          loadnow={loading}
        />
        {values?.profilephoto === "default-one.png" && (
          <>
            {getCookie("hidnot") ? (
              <></>
            ) : (
              <div className={css.headnotify} id="hidenotify">
                ❕ Your Profile Photo and Username is default change them --{" "}
                <Link href={"/settings"}>Change Here</Link>{" "}
                <span className={css.gotcha} onClick={(e) => nochangepf(e)}>
                  ❌
                </span>
              </div>
            )}
          </>
        )}
        <div className={css.twoparts}>
          <div className={css.pt1}>
            <p className={css.topp}>Basic information</p>
            <div className={css.pspd}>
              <div className={css.ffg}>
                <label htmlFor="first">First Name</label>
                <input
                  type="text"
                  name="first"
                  value={typeof values === "object" && values?.first}
                  onChange={(e) => onchangeHandle(e)}
                  title="First Name"
                />
              </div>
              <div className={css.ffg}>
                <label htmlFor="last">Last Name</label>
                <input
                  type="text"
                  name="last"
                  value={typeof values === "object" && values?.last}
                  onChange={(e) => onchangeHandle(e)}
                  title="Last Name"
                />
              </div>
              <div className={css.ffg}>
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  value={values?.gender}
                  onChange={(e) => onchangeHandle(e)}
                  title="gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className={css.pt2}>
            {" "}
            <p className={css.topp}>About You</p>
            <div className={css.pspd}>
              <div className={css.ffg}>
                <label htmlFor="bio">
                  Bio{" "}
                  <span className={css.lowtext}>
                    ({values?.bio?.length} /160)
                  </span>
                </label>
                <textarea
                  placeholder="Enter your text here"
                  name="bio"
                  value={values.bio}
                  onChange={(e) => onchangeHandle(e)}
                  className={css.biotext}
                  maxLength={160}
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      {Success && (
        <Notifysuccess
          message="Data Saved Successfully"
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
