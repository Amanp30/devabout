import React, { useState } from "react";
import { API } from "../../config";

function ImageInput({ iname, imgvalue, folder }) {
  const [showImg, setShowImg] = useState(false);
  const [file, setFile] = useState(null);

  const [imgpath, setimgpath] = useState(API + "/" + folder + "/" + imgvalue);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    if (event.target.files[0]) {
      setimgpath(URL.createObjectURL(event.target.files[0]));
    }
  };

  var classdiv = `imageinput`;
  return (
    <>
      <div>
        <div className={classdiv}>
          {imgvalue || imgpath.startsWith("blob") ? (
            <img src={imgpath} style={{ height: "200px", width: "200px" }} />
          ) : (
            "Choose Image File"
          )}
        </div>
        <div className="chooseimg">
          {imgvalue ? (
            <input
              type="file"
              accept="image/*"
              name={iname}
              onChange={handleFileChange}
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              name={iname}
              onChange={handleFileChange}
              required
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ImageInput;
