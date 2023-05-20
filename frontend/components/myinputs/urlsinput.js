import { useState, useEffect } from "react";

import css from "../../styles/themyinputs.module.css";

function UrlsInput({ array, setInput, type, required, compname, placeholder }) {
  const [inputs, setInputs] = useState(array);
  /*  useEffect(() => {
    if (array.length === 0) {
      setInputs([...inputs, ""]);
    }
  }, []); */

  const handleKeyPress = (event, index) => {
    if (event.key === "Enter" && inputs[index] !== "" && inputs.length < 5) {
      setInputs([...inputs, inputs[index]]);
    }
  };

  function handleAddInput(event, index) {
    // Add a new element to the inputs array
    if (
      event.key === "Enter" &&
      inputs.length < 5 &&
      index === inputs.length - 1 &&
      inputs[inputs.length - 1].trim() !== ""
    ) {
      setInputs([...inputs, ""]);
      setInput((prev) => {
        return {
          ...prev,
          [compname]: inputs,
        };
      });
    }
  }

  function handleInputChange2(e, index) {
    // Make a copy of the inputs array
    const updatedInputs = [...inputs];
    // Update the value of the input that was changed
    updatedInputs[index] = e.target.value; // Set the inputs state to the updated array
    setInputs(updatedInputs);

    setInput((prev) => {
      return {
        ...prev,
        [compname]: updatedInputs,
      };
    });
  }

  function handleRemoveInput(index) {
    // Make a copy of the inputs array
    const updatedInputs = [...inputs];
    // Remove the element at the specified index
    updatedInputs.splice(index, 1);
    // Set the inputs state to the updated array
    setInputs(updatedInputs);
    setInput((prev) => {
      return {
        ...prev,
        [compname]: updatedInputs,
      };
    });
  }

  return (
    <>
      {inputs.map((input, index) => {
        return (
          <>
            <div key={index} className={css.theallinput}>
              <input
                key={index}
                type={type}
                value={input}
                name={`${compname}[]`}
                /* name={`profile - ${index}`} */
                onChange={(e) => handleInputChange2(e, index)}
                onKeyPress={(e) => handleAddInput(e, index)}
                required={required}
                placeholder={placeholder}
              />
              {inputs.length <= 1 ? null : (
                <p onClick={() => handleRemoveInput(index)}>⛔</p>
              )}
            </div>
          </>
        );
      })}
    </>
  );
}

export default UrlsInput;
