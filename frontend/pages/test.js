import React from "react";

function test() {
  var socialmedias = [
    {
      name: "Facebook",
      website: "https://www.facebook.com",
      svgimage: "/static/icons/facebook.svg",
    },
    {
      name: "Twitter",
      website: "https://twitter.com",
      svgimage: "/static/icons/twitter.svg",
    },
    {
      name: "Instagram",
      website: "https://instagram.com",
      svgimage: "/static/icons/instagram.svg",
    },
    {
      name: "TikTok",
      website: "https://www.tiktok.com",
      svgimage: "/static/icons/tiktok.svg",
    },
    {
      name: "LinkedIn",
      website: "https://www.linkedin.com",
      svgimage: "/static/icons/linkedin.svg",
    },
  ];

  var links = [
    "https://twitter.com/amanpareek",
    "https://www.facebook.com/amanpareek",
  ];
  return (
    <div>
      {links.map((link, index) => {
        let socialmedia = socialmedias.find(
          (sm) => link.startsWith(sm.website)
          /* sm.website.startsWith(link) */
        );
        if (socialmedia) {
          return (
            <div key={index}>
              <img src={socialmedia.svgimage} alt={socialmedia.name} />
            </div>
          );
        } else {
          return <div key={index}>{link}</div>;
        }
      })}
    </div>
  );
}

export default test;
