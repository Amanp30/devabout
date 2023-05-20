import React from "react";
import css from "../../styles/notifysuccess.module.css";
function notifysuccess({ message, Success, setSuccess }) {
  if (Success) {
    setInterval(() => {
      setSuccess(false);
    }, 3000);
  }

  return <div className={css.notifysuccess}>✅ {message}</div>;
}

export default notifysuccess;
