import { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { API } from "../../config";

var form = (e) => {
  const [values, setvalues] = useState({
    email: "",
    password: "",
  });
  const [message, setmessage] = useState("");

  const datachange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const gosignup = (e) => {
    e.preventDefault();

    const options = {
      method: "post",
      url: `${API}/api/user/add`,
      data: values,
    };

    axios
      .request(options)
      .then(function (response) {
        setvalues({ email: "", password: "" });
        setmessage("Account Created Successfully");
        setInterval(() => {
          Router.push("/signin");
        }, 4000);
      })
      .catch(function (error) {
        setmessage(error.response.data.error);
      });
  };

  return (
    <>
      {message ? <>{message}</> : null}
      <form>
        <div className="ffg">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={(e) => datachange(e)}
          />
        </div>
        <div className="ffg">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={values.password}
            onChange={(e) => datachange(e)}
          />
        </div>
        <div className="submit">
          <input type="submit" onClick={(e) => gosignup(e)} />
          <a href="/signin">signin</a>
        </div>
      </form>
    </>
  );
};

function signup() {
  return <>{form()}</>;
}

export default signup;
