import React, { useState } from "react";
import "./Addpaneluser.css";
import qs from "qs";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePanelUserdata = () => {
  const { name, phone, email: emailParam, user: userParam, password: passwordParam, _id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState(name);
  const [number, setNumber] = useState(phone);
  const [password, setPassword] = useState(passwordParam);
  const [email, setEmail] = useState(emailParam);
  const [user, setUser] = useState(userParam);

  const updateUserData = (event) => {
    event.preventDefault();
    const updatedTransaction = {
      name: username,
      phone: number,
      email: email,
      password: password,
      user: user,
    };

    fetch(`http://localhost:8081/logindata/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify(updatedTransaction),
    })
      .then((result) => {
        console.log("update successfully");
        // Clear the form inputs after successful update
        setUsername("");
        setNumber("");
        setPassword("");
        setEmail("");
        setUser("");

        // Navigate to PanelUser component
        navigate("/paneluser");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div className="col main pt-5 mt-3 adduserbody">
      <div className="addusermain">
        <input
          className="addpanelinput"
          type="checkbox"
          id="chk"
          aria-hidden="true"
        />

        <div className="signup">
          <form onSubmit={updateUserData}>
            <label className="addpanellabel" htmlFor="chk" aria-hidden="true">
              Update Panel User
            </label>
            <label className="text-white" htmlFor="exampleFormControlInput1">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter name"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <label
              className="text-white mt-3"
              htmlFor="exampleFormControlInput2"
            >
              Phone Number
            </label>
            <input
              type="Number"
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="Enter phone number"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
              required
            />
            <label
              className="text-white mt-3"
              htmlFor="exampleFormControlInput3"
            >
              Email Address
            </label>
            <input
              type="email"
              className="form-control "
              id="exampleFormControlInput3"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label
              className="text-white mt-3"
              htmlFor="exampleFormControlSelect1"
            >
              Admin/superAdmin
            </label>
            <select
              className="custom-select mr-sm-2"
              id="exampleFormControlSelect1"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            >
              <option value="" disabled selected>
                Choose...
              </option>
              <option value="admin">admin</option>
              <option value="superadmin">superadmin</option>
            </select>
            <label
              className="text-white mt-3"
              htmlFor="exampleFormControlInput4"
            >
              Password
            </label>
            <input
              type="text"
              className="form-control "
              id="exampleFormControlInput4"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button className="addpanelbutton mt-3" >
              Update
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePanelUserdata;