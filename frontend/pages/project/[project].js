import { useEffect, useState } from "react";
import { API } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Youtube from "../../components/youtubewatch";

import { socialprofiles } from "../../components/socialmedias";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

function index(props) {
  const [data, setdata] = useState(props.data);

  console.log(data);

  return (
    <>
      <div style={{ background: "white" }}>
        <div className="databoard">
          <div className="holasdg">
            {" "}
            <img
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "20px",
              }}
              src={API + "/projectlogo/" + data.project.projectlogo}
            />{" "}
            <div style={{ marginLeft: "1em" }}>
              {" "}
              <h1>{data.project.projectname}</h1>
            </div>
          </div>
          <div className="thebioji"> {data.project.tagline}</div>

          <Swiper
            slidesPerView={2}
            spaceBetween={60}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {data.project?.videourl && (
              <SwiperSlide>
                <Youtube
                  url={data.project.videourl}
                  width={"100%"}
                  height={"300"}
                  autoplay={1}
                  /* start={12} */
                  controls
                  color={"white"}
                />
              </SwiperSlide>
            )}
            <SwiperSlide>
              {" "}
              <img src={API + "/projectimages/" + data.project.imageone} />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img src={API + "/projectimages/" + data.project.imagetwo} />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img src={API + "/projectimages/" + data.project.imagethree} />
            </SwiperSlide>
          </Swiper>

          <div className="thirtyseventy" style={{ marginTop: "2.6em" }}>
            <div className="thirty">
              <div className="yoboxes">
                {" "}
                {data.project.links.map((link, index) => {
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
                        <p
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "200px",
                          }}
                        >
                          {link}
                        </p>
                      </a>
                    );
                  } else {
                    return (
                      <a target="_blank" href={link}>
                        <img
                          className="outsidelinkimg"
                          src="/static/icons/internetglobe.svg"
                          alt=""
                        />
                        <p
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "200px",
                          }}
                        >
                          {link}
                        </p>
                      </a>
                    );
                  }
                })}
              </div>
              <div className="yoboxes">
                <h2 style={{ marginBottom: "1em" }}>Builder</h2>
                <Link href={"/@" + data.profile.username}>
                  {" "}
                  <img
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: ".5em",
                    }}
                    src={API + "/profile/" + data.profile.profilephoto}
                  />
                  <p>
                    {data.profile.first} {data.profile.last}
                  </p>
                </Link>
              </div>
            </div>
            <div className="seventy">
              {" "}
              <h2>The problem {data.project.projectname} solves</h2>
              <p style={{ marginTop: ".4em" }}>{data.project.problems}</p>
              <h2 style={{ marginTop: ".4em" }}>Challenges we ran into</h2>
              <p style={{ marginTop: ".4em" }}>{data.project.challenges}</p>
              <div style={{ marginTop: "2em", padding: "1em" }}>
                {data.project.technology.map((item) => {
                  return (
                    <>
                      <span
                        style={{
                          marginRight: "1.4em",
                          padding: ".4em .8em",
                          background: "beige",
                          borderRadius: "15px",
                        }}
                      >
                        {item}
                      </span>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  console.log(params.project);
  const res = await fetch(`${API}/api/projectsone/${params.project}`);
  const data = await res.json();

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default index;
