import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import "./paneluser.css";
import { useNavigate } from 'react-router-dom';
const PanelUser = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState([]);
  const [userdetails, setUserDetails] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  
  const userid = Cookies.get('id');
  const username = Cookies.get('username');
  const user = Cookies.get('user');

  if (!user) {
    navigate('/');
}


  const getData = () => {
    fetch("http://localhost:8081/logindatas")
      .then((response) => response.json())
      .then((res) => setRecord(res))
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    getData();

    fetch(`http://localhost:8081/logindatas/${userid}`)
      .then((response) => response.json())
      .then((res) => setUserDetails(res))
      .catch(error => console.error('Error fetching user details:', error));

    const intervalId = setInterval(getData, 10000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [userid, username]);

  const admincount = record.filter((item) => item.user === "admin").length;
  const superadmincount = record.filter((item) => item.user === "superadmin").length;
  
  const handleSearch = () => {
    const filtered = record.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecords(filtered);
    setSearchClicked(true);
  };

  const removeuser = (itemId) => {

    fetch(`http://localhost:8081/logindata/${itemId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        getData();
        if (userid == itemId) {
          navigate('/');
      }
      }) // Fetch data after deletion
      .catch(error => console.error('Error removing user:', error));
  };


  return (
    <div className="col main pt-5 mt-3">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        {/* Breadcrumb items */}
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/dashboard">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Paneluser
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>

      {/* Alert */}
      <div className="alert alert-warning fade collapse" role="alert" id="myAlert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
        <strong>Data and Records</strong> Learn more about employee
      </div>

      {/* Total Admin */}
      <div className="mb-3">
  <div className="col-xl-3 col-sm-6 py-2">
    <div className="card bg-success text-white h-100">
      <div className="card-body bg-success" style={{ backgroundColor: "#57b960" }}>
        <h6 className="text-uppercase">Total Admins</h6>
        <h1 className="display-4">{admincount}</h1>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-sm-6 py-2">
    <div className="card bg-danger text-white h-100">
      <div className="card-body bg-danger" style={{ backgroundColor: "#57b960" }}>
        <h6 className="text-uppercase">Total SuperAdmins</h6>
        <h1 className="display-4">{superadmincount}</h1>
      </div>
    </div>
  </div>
</div>

 <hr />

      {/* User Details */}
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th>Your Name</th>
            <th>Your Phone Number</th>
            <th>Your Email</th>
            <th>Your Password</th>
            <th>User</th>
            
          
                <th>Update</th>
                <th>Delete</th>
              
           
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userdetails.name}</td>
            <td>{userdetails.phone}</td>
            <td>{userdetails.email}</td>
            <td>{userdetails.password}</td>
            <td>{userdetails.user}</td>
        
         
                <td>
                  <Link className="btn btn-outline-success" to={`/update/${userdetails.name}/${userdetails.phone}/${userdetails.email}/${userdetails.user}/${userdetails.password}/${userdetails._id}`}>
                    Update
                  </Link>
                </td>
                <td>
                  <button type="button" className="btn btn-outline-danger" onClick={() => removeuser(userdetails._id)}>
                    Remove
                  </button>
                </td>
           
          </tr>
        </tbody>
      </table>

      {/* Search */}
      <div className="mb-3">
        <label htmlFor="search" className="form-label">
          Search by Name
        </label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="Enter name to search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Filtered Records */}
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>User</th>
            {user === "superadmin" && (
              <>
                <th>Update</th>
                <th>Delete</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {searchClicked
            ? filteredRecords.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.user}</td>
                  {user === "superadmin" && (
                    <>
                      <td>
                        <Link className="btn btn-outline-success" to={`/update/${item.name}/${item.phone}/${item.email}/${item.user}/${item.password}/${item._id}`}>
                          Update
                        </Link>
                      </td>
                      <td>
                        <button type="button" className="btn btn-outline-danger" onClick={() => removeuser(item._id)}>
                          Remove
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            : record.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.user}</td>
                  {user === "superadmin" && (
                    <>
                      <td>
                        <Link className="btn btn-outline-success" to={`/update/${item.name}/${item.phone}/${item.email}/${item.user}/${item.password}/${item._id}`}>
                          Update
                        </Link>
                      </td>
                      <td>
                        <button type="button" className="btn btn-outline-danger" onClick={() => removeuser(item._id)}>
                          Remove
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default PanelUser;
