import cookie from "js-cookie";
import Router from "next/router";
import axios from "axios";
import { API } from "../config";
// set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};
// get cookie
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};
// localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};
// autheticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const refreshauth = (e, next) => {
  if (getCookie("re")) {
    removeCookie("re");
    Router.reload();
  }
  if (!isAuth()) {
    Router.push("/signin");
  }
};

export const signout = () => {
  let config = {
    method: "get",
    url: `${API}/api/user/signout`,
  };

  axios(config)
    .then((response) => {
      removeCookie("token");
      removeLocalStorage("user");
      removeCookie("hidnot");
      refreshauth();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      const userJson = localStorage.getItem("user");
      try {
        const user = userJson ? JSON.parse(userJson) : null;
        return user;
      } catch (error) {
        console.error("Error parsing user JSON:", error);
        return null; // Or return a default user object or handle the error in a different way
      }
    }
  }
  return false; // Return false if cookieChecked is false or process.browser is false
};

export const userid = () => {
  return (
    process.browser && localStorage.getItem("user")?.replace(/(^"|"$)/g, "")
  );
};

export const thetoken = () => {
  return process.browser && getCookie("token");
};

export const checkServer = async () => {
  let config = {
    method: "get",
    url: `${API}/checkserver`,
  };

  return axios(config);
};
