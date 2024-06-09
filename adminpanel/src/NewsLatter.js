
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const NewsLatter = () => {
  const [record, setRecord] = useState([]);
  const [msg, setMsg] = useState("");
  const [successIndicators, setSuccessIndicators] = useState([]);

  const form = useRef();

 
      const navigate = useNavigate();
      const userr = Cookies.get('user');
      
      if(!userr){
          navigate('/');
      }

  const getData = () => {
    fetch("http://localhost:8081/Subscribers")
      .then((response) => response.json())
      .then((res) => setRecord(res));
  };

  useEffect(() => {
    getData();
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();

    for (const [index, subscriber] of record.entries()) {
      // Check if subscriber has a valid email address
      if (subscriber.email) {
        const emailParams = {
          from_name: "gericht",
          to_email: subscriber.email,
          to_name: subscriber.name,
          message: msg,
        };

        try {
          const response = await emailjs.send(
            "service_hcmgan6",
            "template_n0k80bb",
            emailParams,
            "Gdm-ostSYFEnfebuY"
          );

          console.log("Email sent successfully:", response);

          // Update the success indicators
          setSuccessIndicators((prevIndicators) => [
            ...prevIndicators,
            index,
          ]);
        } catch (error) {
          console.error("Failed to send email:", error);
        }
      } else {
        console.log("Invalid email address for subscriber:", subscriber);
      }
    }
  };

  return (
    <div className="col main pt-5 mt-3 ">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
          <Link to="/dashboard">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            NewsLatter
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>
      <div className="alert alert-warning fade collapse" role="alert" id="myAlert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
        <strong>Data and Records</strong> Learn more about employee
      </div>
      <div className="row">
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card bg-success text-white h-100">
            <div
              className="card-body bg-success"
              style={{ backgroundColor: "#57b960" }}
            >
              <h6 className="text-uppercase">Total Subscribers</h6>
              <h1 className="display-4">{record.length}</h1>
            </div>
          </div>
        </div>
        <form ref={form} onSubmit={sendEmail}>
          <label className="mt-3 ">Write Message to send msg in all email</label>
          <textarea
            className="form-control"
            name="message"
            onChange={(e) => setMsg(e.target.value)}
          />
          <input className="addpanelbutton mt-3" type="submit" value="Send" />
        </form>
      </div>
      <hr />
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {record.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  {successIndicators.includes(index) ? (
                    <span style={{ color: "green" }}>&#10004;</span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a id="more"></a>
      <hr />
    </div>
  );
};

export default NewsLatter;
