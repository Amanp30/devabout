import React, { useState, useEffect } from "react";
import { userid, thetoken } from "../../actions/auth";
import axios from "axios";

function MyForm() {
  // Declare a new state variable, which we'll call "inputs"
  const [updateid, setupdateid] = useState([]);
  const [inputs, setInputs] = useState([]);

  console.log(inputs);
  const fetchdata = () => {
    let config = {
      method: "get",
      url: `http://localhost:8000/api/aboutsimple/${userid()}`,
      headers: { Authorization: `Bearer ${thetoken()}` },
    };

    axios(config)
      .then((response) => {
        setInputs(response.data.links);
        setupdateid(response.data._id);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const savedata = (e) => {
    e.preventDefault();

    // Handle File Data from the state Before Sending
    /*  const form = document.getElementById("myform");
    const data = new FormData(form);
 */
    let config = {
      method: "post",
      url: `http://localhost:8000/api/updatelinkprofiles/${updateid}`,
      headers: { Authorization: `Bearer ${thetoken()}` },
      data: { links: inputs },
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        fetchdata();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

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

  return (
    <div>
      <button onClick={(e) => savedata(e)}>Save</button>
      {/* Render the input boxes */}
      {inputs.map((input, index) => (
        <>
          <div className="ffgrm">
            <input
              key={index}
              type="url"
              value={input}
              name={`profile-${index}`}
              onChange={(e) => handleInputChange(e, index)}
              className="lurl"
            />
            <button onClick={() => handleRemoveInput(index)} className="rmbtn">
              ⛔
            </button>
          </div>
        </>
      ))}
      {/* Render the "Add new" button */}
      {inputs.length < 6 && (
        <button onClick={handleAddInput} className="addnewbtn">
          Add new
        </button>
      )}{" "}
    </div>
  );
}

export default MyForm;
