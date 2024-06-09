
import "./Addpaneluser.css";
import qs from "qs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const AddPanelUser = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");


    const userr = Cookies.get('user');
    
    if(!userr){
        navigate('/');
    }

  const adduser = (event) => {
    event.preventDefault();
    const newTransaction = {
      name: username,
      phone: number,
      email: email,
      password: password,
      user: user,
    };

    fetch(`http://localhost:8081/logindata`,{
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify(newTransaction),
    })
      .then((result) => {
        console.log("add successfully");
        // Clear the form inputs after successful registration
        setUsername("");
        setNumber("");
        setPassword("");
        setEmail("");
        setUser("");
        navigate("/paneluser");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
          <form onSubmit={adduser}>
            <label className="addpanellabel" htmlFor="chk" aria-hidden="true">
              Add Panel User
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
              type="password"
              className="form-control "
              id="exampleFormControlInput4"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button className="addpanelbutton mt-3">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPanelUser;