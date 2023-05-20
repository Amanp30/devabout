import React, { useEffect, useState } from "react";
import Menu from "../components/menus/menu";
import Plusit from "../components/plusit";
import { userid, thetoken } from "../actions/auth";
import axios from "axios";
import { API } from "../config";
import Updateproject from "../components/updateproject";
import Notifysuccess from "../components/notify/notifysuccess";
import Notifyerror from "../components/notify/notifyerror";

function projects1() {
  const [data, setdata] = useState([]);
  const [Error, setError] = useState(false);
  const [Success, setSuccess] = useState(false);

  const fetchdata = () => {
    let config = {
      method: "get",
      url: `${API}/api/projects/allprojects/${userid()}`,
      headers: { Authorization: `Bearer ${thetoken()}` },
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const deleteProject = (id) => {
    let config = {
      method: "get",
      url: `${API}/api/projects/delete/${id}`,
      headers: { Authorization: `Bearer ${thetoken()}` },
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSuccess(true);
        fetchdata();
      })
      .catch((error) => {
        console.log(error);
        setSuccess(false);
      });
  };

  return (
    <>
      <Menu />
      <div className="built">
        <h1>Share what you built</h1>
        <p>Inspire other builders share your great work</p>
        <Plusit />
      </div>

      <Updateproject array={data} deleteit={deleteProject} />
      {Success && (
        <Notifysuccess
          message="Project Deleted Successfully"
          Success={Success}
          setSuccess={setSuccess}
        />
      )}
      {Error && (
        <Notifyerror
          message="Sorry but unable to Delete Project"
          Error={Error}
          setError={setError}
        />
      )}
    </>
  );
}

export default projects1;
