import React, { useEffect, useState } from "react";
import qs from "qs";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const TodayRooms = () => {
  const navigate = useNavigate();

  const [record, setRecord] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const userrr = Cookies.get("user");
  if (!userrr) {
    navigate("/");
  }

  const getData = () => {
    fetch("http://localhost:8081/Rooms")
      .then((response) => response.json())
      .then((res) => setRecord(res));
  };

  useEffect(() => {
    getData();
    const intervalId = setInterval(getData, 10000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const Moredetail = async (item) => {
    <Link
      to={`/Moredetails/${item.name}/${item.phone}/${item.email}/${item._id}/${item.from}/${item.to}/${item.kingsize}/${item.queensize}/${item.adult}/${item.children}`}
    >
      Update
    </Link>;
  };

  const ableRowsCount = record.filter((item) => item.status === "able").length;

  const handleSearch = () => {
    getData();
  };

  const filteredRecords = searchQuery
    ? record.filter(
        (item) =>
          item.status === "able" &&
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : record.filter((item) => item.status === "able");

  return (
    <div className="col main pt-5 mt-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>
      <div
        className="alert alert-warning fade collapse"
        role="alert"
        id="myAlert"
      >
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
              <h6 className="text-uppercase">Rooms not checkin</h6>
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
              <th>Date From</th>
              <th>Date To</th>
              <th>adult</th>
              <th>children</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.from}</td>
                <td>{item.to}</td>
                <td>{item.adult}</td>
                <td>{item.children}</td>
                <td>
                  <Link
                    className="btn btn-outline-success"
                    to={`/Moredetails/${item.name}/${item.phone}/${item.email}/${item._id}/${item.from}/${item.to}/${item.kingsize}/${item.queensize}/${item.familysize}/${item.adult}/${item.children}/${item.status}`}
                  >
                    More
                  </Link>
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

export default TodayRooms;
