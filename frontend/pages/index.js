import React from "react";
import Link from "next/link";
import HtmlParser from "react-html-parser";
import { isAuth } from "../actions/auth";

function index() {
  return (
    <div>
      {isAuth ? (
        <Link href={"/profile"}>Go to Dashboard</Link>
      ) : (
        <>
          <Link href={"/signin"}>Signin</Link>
          <Link href={"/signup"}>Signup</Link>
        </>
      )}
    </div>
  );
}

export default index;
