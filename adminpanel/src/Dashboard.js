import React, { useEffect, useState } from "react";
import qs from 'qs';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const [record, setRecord] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const userrr = Cookies.get('user');
  if (!userrr) {
    navigate('/');
}
  const getData = () => {
    fetch("http://localhost:8081/bookinfos")
      .then((response) => response.json())
      .then((res) => setRecord(res));
  };

  useEffect(() => {
    getData();
    const intervalId = setInterval(getData, 10000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const ConformBooking = async (item) => {
    try {
      const adddata = {
        name:item.name,
        Time: item.Time,
        request:item.request,
        phonenumber:item.phonenumber,
        fivepersontable: item.fivepersontable,
        fourpersontable: item.fourpersontable,
        threepersontable: item.threepersontable,
        visibility:"disable",
      };

      const updateResponse = await fetch(
        `http://localhost:8081/bookinfo/${item._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: qs.stringify(adddata),
        }
      );

      if (updateResponse.ok) {
        console.log('Update successful');
      } else {
        console.error('Update failed');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
    getData();
  };

  const ableRowsCount = record.filter((item) => item.visibility === "able").length;

  const handleSearch = () => {
    getData();
  };

  const filteredRecords = searchQuery
    ? record.filter(
        (item) =>
          item.visibility === "able" &&
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : record.filter((item) => item.visibility === "able");

  return (
    <div className="col main pt-5 mt-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a>Home</a>
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
      <div className="row mb-3">
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card bg-success text-white h-100">
            <div
              className="card-body bg-success"
              style={{ backgroundColor: "#57b960" }}
            >
              <h6 className="text-uppercase">Table Bookings Not conform</h6>
              <h1 className="display-4">{ableRowsCount}</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-danger h-100">
            <div className="card-body bg-danger">
              <h6 className="text-uppercase">Total Bookings</h6>
              <h1 className="display-4">{record.length}</h1>
            </div>
          </div>
        </div>
      </div>
      <hr />

      {/* Search Input */}
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

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Time</th>
              <th>Date</th>
              <th>3personTable</th>
              <th>4personTable</th>
              <th>5personTable</th>
              <th>Request</th>
              <th>Conform</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.phonenumber}</td>
                <td>{item.Time}</td>
                <td>{item.date}</td>
                <td>{item.threepersontable}</td>
                <td>{item.fourpersontable}</td>
                <td>{item.fivepersontable}</td>
                <td>{item.request}</td>
                
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => ConformBooking(item)}
                  >
                    Conform
                  </button>
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

export default Dashboard;