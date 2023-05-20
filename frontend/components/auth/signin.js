import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import { isAuth, authenticate, setCookie } from "../../actions/auth";
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
      url: `${API}/api/user/signin`,
      data: values,
    };
    setTimeout(() => {
      axios
        .request(options)
        .then(function (response) {
          setloadbtn(false);
          setsuccess("Voila Credentials matched");
          authenticate(response.data, () => {
            setTimeout(() => {
              setCookie("re", "true");
              Router.replace("/profile");
            }, 1000);
          });
        })
        .catch(function (error) {
          if (
            typeof error.response !== "undefined" &&
            typeof error.response === "object"
          ) {
            setmessage(error.response.data.error);
          }
          setloadbtn(false);
        });
    }, 1500);
  };

  useEffect(() => {
    isAuth() && Router.push("/profile");
  }, []);

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
          <h1 className={css.jkg}>Login</h1>
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
            <label htmlFor="password">
              Password{" "}
              <span className={css.fgpass}>
                <Link href="/auth/forgot">Forget Password</Link>
              </span>
            </label>
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
                value="LOG IN"
              />
            )}
          </div>
          <hr className={css.brhr} />
          <span className={css.haveacc}>OR</span>
          <Link href="/signup">
            <button className={css.whitebos}>SIGN UP</button>
          </Link>
        </form>
      </div>
    </>
  );
};

function signin() {
  return <>{form()}</>;
}

export default signin;
