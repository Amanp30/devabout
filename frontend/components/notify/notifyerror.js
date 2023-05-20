import React, { useState } from "react";
import css from "../../styles/notifyerror.module.css";

function notifyerror({ message, Error, setError }) {
  if (Error) {
    setInterval(() => {
      setError(false);
    }, 3000);
  }

  return <div className={css.notifyerror}>🛑 {message}</div>;
}

export default notifyerror;
