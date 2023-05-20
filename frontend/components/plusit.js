import React, { useState } from "react";
import { userid, thetoken } from "../actions/auth";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { useRouter } from "next/router";
import { API } from "../config";

function plusit() {
  const [projectname, setprojectname] = useState("");
  const [showform, setshowform] = useState(false);
  const [loadbtn, setloadbtn] = useState(false);
  const Router = useRouter();

  const saveprojectname = (e) => {
    e.preventDefault();
    setloadbtn(true);
    setTimeout(() => {
      let config = {
        method: "get",
        url: `${API}/api/projects/${projectname}/${userid()}`,
        headers: { Authorization: `Bearer ${thetoken()}` },
      };

      axios(config)
        .then((response) => {
          setloadbtn(false);
          Router.push(`/edit/${response.data.slug}`);
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
          setloadbtn(false);
        });
    }, 2000);
  };

  return (
    <div className="plusit">
      <div>
        {showform ? (
          <div className="formthis">
            <form
              className="ffg2"
              method="post"
              onSubmit={(e) => saveprojectname(e)}
              encType="multipart/form-data"
              id="myform"
            >
              <h2>Let's get you started</h2>
              <div className="jiffg">
                <label htmlFor="projectname">
                  Name (You can change this later)
                </label>
                <input
                  type="text"
                  name="projectname"
                  value={projectname}
                  onChange={(e) => setprojectname(e.target.value)}
                  required
                  autoFocus={true}
                />{" "}
              </div>
              <div className="btngrp">
                <button type="submit" className="blues">
                  {loadbtn ? (
                    <>
                      <Oval
                        height={15}
                        width={15}
                        color="blue"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="white"
                        strokeWidth={10}
                        strokeWidthSecondary={10}
                      />
                      Begin
                    </>
                  ) : (
                    "Begin"
                  )}
                </button>
                <button
                  onClick={(e) => {
                    setshowform(!showform), setloadbtn(false);
                  }}
                  className="later"
                >
                  Later
                </button>{" "}
              </div>
            </form>
          </div>
        ) : (
          <img
            src="/static/plus.svg"
            alt="plusicon"
            title="Add new project"
            onClick={(e) => setshowform(!showform)}
            className="plusimg"
          />
        )}
      </div>
    </div>
  );
}

export default plusit;
