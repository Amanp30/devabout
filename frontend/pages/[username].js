import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { socialprofiles } from "../components/socialmedias";
import { API } from "../config";

function index(props) {
  const [data, setdata] = useState(props.myuser[0]);
  const Router = useRouter();
  var rusername = Router.query.username;
  console.log(data);
  console.log(API);

  return (
    <>
      {data?.attherateerror ? (
        <>
          You must visit username with{" "}
          <a href={`/@${rusername}`}>{`@${rusername}`}</a>
        </>
      ) : (
        <>
          <div style={{ background: "white" }}>
            <div className="databoard">
              <div className="topofit">
                <div className="holasdg">
                  {" "}
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                    src={`${API}/profile/${data.user.profilephoto}`}
                  />{" "}
                  <div style={{ marginLeft: "1em" }}>
                    {" "}
                    <h1>
                      {" "}
                      {data.user.first} {data.user.last}
                    </h1>
                    <p>@{data.user.username}</p>
                  </div>
                </div>
                <div className="thebioji"> {data.user.bio}</div>

                {/*  {data.user.links.map((link, index) => {
                  return (
                    <>
                      <a target="_blank" href={link}>
                        {socialprofiles.find(
                          (urlis, i) => urlis.website === link
                        ) && socialprofiles?.[i].name}
                      </a>
                      <br />
                    </>
                  );
                })} */}

                {data.user.links.map((link, index) => {
                  let socialmedia = socialprofiles.find(
                    (sm) => link.startsWith(sm.website)
                    /* sm.website.startsWith(link) */
                  );
                  if (socialmedia) {
                    return (
                      <a target="_blank" href={link}>
                        <img
                          className="outsidelinkimg"
                          src={socialmedia.svgimage}
                          alt={socialmedia.name}
                        />
                      </a>
                    );
                  } else {
                    return (
                      <a target="_blank" href={link}>
                        <img
                          className="outsidelinkimg"
                          src="/static/linkoutside.svg"
                          alt=""
                        />
                      </a>
                    );
                  }
                })}
              </div>

              <div className="showproject">
                <div
                  style={{
                    margin: "1.2em 0 .8em 0",
                    fontSize: "1.6em",
                    fontWeight: "bolder",
                  }}
                >
                  Projects
                </div>
                {data?.project?.map((item, index) => {
                  return (
                    <>
                      <div className="jiproject">
                        <a
                          target="_blank"
                          href={"/project/" + item.slug}
                          title={item.projectname}
                        >
                          <h3
                            style={{ fontSize: "1.4em", marginBottom: ".2em" }}
                          >
                            {item.projectname}
                          </h3>
                        </a>
                        <p style={{ color: "grey", fontSize: "1.2em" }}>
                          {" "}
                          {item.tagline}
                        </p>{" "}
                      </div>
                    </>
                  );
                })}
              </div>

              <div
                className="createown"
                style={{ textAlign: "center", margin: "4em 0 " }}
              >
                <a
                  href="/signup"
                  style={{
                    textDecoration: "none",
                    border: "2px solid",
                    padding: ".5em",
                    color: "black",
                  }}
                >
                  Share Your ProjectStroy
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ params }) {
  //var res = await fetch(`http://localhost:8000/api/${params.slug}`);
  console.log(params.username);
  var res = await fetch(`${API}/api/getusername/${params.username}`);
  var myuser = await res.json();

  if (!myuser) {
    return {
      redirect: {
        destination: "/user-not-found",
      },
    };
  } else {
    return {
      props: { myuser }, // will be passed to the page component as props
    };
  }
}

export default index;
