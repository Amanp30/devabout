import React from "react";
import { API } from "../config";
import Link from "next/link";

function updateproject({ array, deleteit }) {
  /*     console.log(array);
   */
  var bx = [];
  const projectsList = array.map((item) => {
    if (item.status === "unpublished") {
      bx.push(1);
    }
  });
  var cx = [];
  const projectsList1 = array.map((item) => {
    if (item.status === "published") {
      cx.push(1);
    }
  });

  return (
    <>
      {cx.length !== 0 && (
        <div className="heyprojcts" style={{ marginBottom: "6em" }}>
          <h2
            style={{
              textAlign: "center",
              marginTop: "0em",
              marginBottom: "3em",
            }}
          >
            Published
          </h2>
          <div className="innerproject">
            {array.map((item) => {
              return (
                <>
                  {item.status === "published" && (
                    <>
                      <div className="project">
                        <div style={{ display: "flex", gap: "5%" }}>
                          <h3
                            style={{
                              width: "80%",
                              fontSize: "1.6em",
                              minHeight: "4em",
                              height: "4em",
                              maxHeight: "4em",
                            }}
                          >
                            {" "}
                            {item.projectname}{" "}
                            <a target="_blank" href={"/project/" + item.slug}>
                              <img
                                src="/static/externallink.svg"
                                style={{ width: "25px", height: "25px" }}
                              />
                            </a>
                          </h3>
                          <div style={{ width: "20%" }}>
                            <img
                              src="/static/delete.svg"
                              style={{
                                width: "20px",
                                height: "20px",
                                float: "right",
                              }}
                              onClick={(e) => deleteit(item._id)}
                            />
                          </div>
                        </div>
                        {item?.projectlogo && (
                          <img src={API + "/projectlogo/" + item.projectlogo} />
                        )}{" "}
                        <Link href={"/edit/" + item.slug} className="editthis">
                          Edit{" "}
                        </Link>
                      </div>
                    </>
                  )}
                </>
              );
            })}
          </div>
        </div>
      )}

      {/* unpublished  */}

      {bx.length !== 0 && (
        <div
          className="heyprojcts"
          style={{ marginTop: "0em", marginBottom: "4em" }}
        >
          <h2
            style={{
              textAlign: "center",
              marginTop: "0em",
              marginBottom: "3em",
            }}
          >
            Drafts
          </h2>
          <div className="innerproject">
            {array.map((item) => {
              return (
                <>
                  {item.status === "unpublished" && (
                    <>
                      <div className="project">
                        <div style={{ display: "flex", gap: "5%" }}>
                          <h3
                            style={{
                              width: "80%",
                              fontSize: "1.6em",
                              minHeight: "4em",
                              height: "4em",
                              maxHeight: "4em",
                            }}
                          >
                            {" "}
                            {item.projectname}
                          </h3>
                          <div style={{ width: "20%" }}>
                            <img
                              src="/static/delete.svg"
                              style={{
                                width: "20px",
                                height: "20px",
                                float: "right",
                              }}
                              onClick={(e) => deleteit(item._id)}
                            />
                          </div>
                        </div>
                        {item?.projectlogo && (
                          <img src={API + "/projectlogo/" + item.projectlogo} />
                        )}
                        <Link href={"/edit/" + item.slug} className="editthis">
                          Edit{" "}
                        </Link>
                      </div>
                    </>
                  )}
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default updateproject;
