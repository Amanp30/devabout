import { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { API } from "../../config";
import Link from "next/link";
import { ThreeDots } from "react-loader-spinner";
import css from "../../styles/auth.module.css";

var form = (e) => {
  const [values, setvalues] = useState({
    email: "",
    password: "",
  });

  const [loadbtn, setloadbtn] = useState(false);
  const [message, setmessage] = useState("");
  const [success, setsuccess] = useState("");

  const datachange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const gosignup = (e) => {
    e.preventDefault();

    setmessage("");
    setsuccess("");
    setloadbtn(true);

    const options = {
      method: "post",
      url: `${API}/api/user/add`,
      data: values,
    };
    setTimeout(() => {
      axios
        .request(options)
        .then(function (response) {
          console.log(response);
          setloadbtn(false);
          setvalues({ email: "", password: "" });
          setsuccess("Account Created Successfully");
          setTimeout(() => {
            Router.push("/signin");
          }, 1000);
        })
        .catch(function (error) {
          setmessage(error.response.data.error);
          setloadbtn(false);
        });
    }, 1500);
  };

  return (
    <>
      <div className={css.authbody}>
        <img src="/static/projectstory.png" className={css.logosp} />
        {message ? (
          <>
            <p className={css.message}>{message}</p>
          </>
        ) : null}
        {success ? (
          <>
            <p className={css.success}>{success}</p>
          </>
        ) : null}
        <form className={css.jiform} method="post">
          <h1 className={css.jkg}>SIGN UP</h1>
          <div className={css.ffg}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={(e) => datachange(e)}
            />
          </div>
          <div className={css.ffg}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={values.password}
              onChange={(e) => datachange(e)}
            />
          </div>
          <div className={css.submit}>
            {loadbtn ? (
              <button className={css.blackbos} disabled>
                <ThreeDots
                  height="16"
                  width="40"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </button>
            ) : (
              <input
                type="submit"
                onClick={(e) => gosignup(e)}
                className={css.blackbos}
                value="SIGN UP"
              />
            )}
          </div>
          <hr className={css.brhr} />
          <span className={css.haveacc}>OR</span>
          <Link href="/signin">
            <button className={css.whitebos}>LOG IN</button>
          </Link>
        </form>
      </div>
    </>
  );
};

function signup() {
  return <>{form()}</>;
}

export default signup;
