import React, { useState } from "react";

function MyForm() {
  // Declare a new state variable, which we'll call "inputs"
  const [inputs, setInputs] = useState([]);

  const socialMediaPlatforms = [
    {
      name: "Facebook",
      website: ["https://www.facebook.com/", "https://facebook.com/"],
    },
    {
      name: "Twitter",
      website: ["https://www.twitter.com/", "https://twitter.com/"],
    },
    {
      name: "Instagram",
      website: ["https://www.instagram.com/", "https://instagram.com/"],
    },
    {
      name: "TikTok",
      website: ["https://www.tiktok.com/", "https://tiktok.com/"],
    },
    {
      name: "LinkedIn",
      website: ["https://www.linkedin.com/", "https://linkedin.com/"],
    },
    {
      name: "Pinterest",
      website: ["https://www.pinterest.com/", "https://pinterest.com/"],
    },
    {
      name: "Snapchat",
      website: ["https://www.snapchat.com/", "https://snapchat.com/"],
    },
    {
      name: "Reddit",
      website: ["https://www.reddit.com/", "https://reddit.com/"],
    },
    {
      name: "YouTube",
      website: ["https://www.youtube.com/", "https://youtube.com/"],
    },
    {
      name: "WhatsApp",
      website: ["https://www.whatsapp.com/", "https://whatsapp.com/"],
    },
    {
      name: "Skype",
      website: ["https://www.skype.com/", "https://skype.com/"],
    },
    {
      name: "Google+",
      website: ["https://plus.google.com/", "https://google.com/"],
    },
    {
      name: "Vimeo",
      website: ["https://www.vimeo.com/", "https://vimeo.com/"],
    },
    {
      name: "Periscope",
      website: ["https://www.periscope.tv/", "https://periscope.tv/"],
    },
    {
      name: "Flickr",
      website: ["https://www.flickr.com/", "https://flickr.com/"],
    },
    {
      name: "Weibo",
      website: ["https://www.weibo.com/", "https://weibo.com/"],
    },
    { name: "Qzone", website: ["https://qzone.qq.com/", "https://qq.com/"] },
    {
      name: "WeChat",
      website: ["https://www.wechat.com/", "https://wechat.com/"],
    },
    { name: "Line", website: ["https://line.me/", "https://me/"] },
    {
      name: "Viber",
      website: ["https://www.viber.com/", "https://viber.com/"],
    },
  ];

  console.log(socialMediaPlatforms);
  // This function will be called when the "Add new" button is clicked
  function handleAddInput() {
    // Add a new element to the inputs array
    if (inputs.length < 6) {
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

  // var profiles = [""]

  return (
    <div>
      {/* Render the input boxes */}
      {inputs.map((input, index) => (
        <>
          <div className="ffg">
            <label htmlFor={`profile-${index}`}>
              {/* Display a label based on the URL */}
              {socialMediaPlatforms.map((platform) =>
                platform.website[0].toLowerCase() === input.toLowerCase() ? (
                  <span>{platform.name}</span>
                ) : null
              )}
              {!socialMediaPlatforms.some((platform) =>
                input.toLowerCase().includes(platform.website.toLowerCase())
              ) && <span>Link</span>}
            </label>{" "}
            <input
              key={index}
              type="url"
              value={input}
              name={`profile-${index}`}
              onChange={(e) => handleInputChange(e, index)}
            />
            <button onClick={() => handleRemoveInput(index)}>Remove</button>
          </div>
        </>
      ))}
      {/* Render the "Add new" button */}
      {inputs.length < 6 && (
        <button onClick={handleAddInput}>Add new</button>
      )}{" "}
    </div>
  );
}

export default MyForm;
