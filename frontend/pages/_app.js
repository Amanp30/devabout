import React, { useState, useEffect } from "react";
import { checkServer } from "../actions/auth";
import "../styles/globals.css";
export default function MyApp({ Component, pageProps }) {
  const [serverStatus, setServerStatus] = useState("checking");

  useEffect(() => {
    setTimeout(() => {
      checkServer()
        .then((response) => {
          setServerStatus("running");
        })
        .catch((error) => {
          setServerStatus("not running");
        });
    }, 5000);
  }, []);

  return (
    <>
      {serverStatus === "not running" && "Server is not running"}
      <Component {...pageProps} />
    </>
  );
}
