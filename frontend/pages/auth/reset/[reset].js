import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";
import Link from "next/link";
import { ThreeDots } from "react-loader-spinner";
import css from "../../../styles/auth.module.css";
import { useRouter } from "next/router";

var form = (e) => {
  const [values, setvalues] = useState({ password: "" });

  const [loadbtn, setloadbtn] = useState(false);
  const [message, setmessage] = useState("");
  const [success, setsuccess] = useState("");

  const Router = useRouter();
  var resetLinkID = Router.query.reset;

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
      url: `${API}/api/user/reset/${resetLinkID}`,
      data: values,
    };
    setTimeout(() => {
      axios
        .request(options)
        .then(function (response) {
          setloadbtn(false);
          setsuccess("Password reset link was sent to your email.");
          setTimeout(() => {
            Router.push("/signin");
          }, 2000);
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
          <h1 className={css.jkg}>Your New Password</h1>
          <div className={css.ffg}>
            <label htmlFor="email">Password</label>
            <input
              type="password"
              name="password"
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
                value="Change Password"
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
};

function reset() {
  return <>{form()}</>;
}

export default reset;
