import React, { useState } from "react";
import { API } from "../../config";

function ImageInput({ iname, ichange, imgvalue, remove }) {
  const [showImg, setShowImg] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRemove = () => {
    setShowImg(false);
    remove(iname);
  };

  return (
    <>
      {imgvalue && (
        <img
          src={API + "/projectlogo/" + imgvalue}
          style={{ height: "200px", width: "200px" }}
        />
      )}
      {!imgvalue && (
        <input
          type="file"
          accept="image/*"
          name={iname}
          onChange={handleFileChange}
        />
      )}
      <p onClick={handleRemove}>Reset</p>
    </>
  );
}

export default ImageInput;
