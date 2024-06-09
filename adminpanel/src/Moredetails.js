import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';

const Moredetails = () => {
  const navigate = useNavigate();
  const { name, phone, email, _id, From, To, kingsize, queensize, familysize, adult, children,status } = useParams();
  const [upperstatus, setUpperStatus] = useState(status);
  const [record, setRecord] = useState([]);
  const userrr = Cookies.get('user');
  if (!userrr) {
    navigate('/');
}
  const getData = () => {
    fetch(`http://localhost:8081/roominfos/${name}/${phone}/${From}/${To}`)
      .then((response) => response.json())
      .then((res) => setRecord(res));
  };

  useEffect(() => {
    getData();
    const intervalId = setInterval(getData, 10000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const conformBooking = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data).toString(),
      });

      if (response.ok) {
        console.log('Update successful');
      } else {
        console.error('Update failed');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
    getData();
  };

  const ConformBooking1 = async (id) => {
    await conformBooking(`http://localhost:8081/Rooms/${id}`, { status: 'disable' });
    setUpperStatus("disable");
  };

  const ConformBooking2 = async (id) => {
    await conformBooking(`http://localhost:8081/roominfos/${id}`, { status: 'disable' });
    
  };
  
  const filter=record.filter((item) => item.status === "able");
  return (
    <div className="col main pt-5 mt-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
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
          <div className="card text-white bg-success h-100">
            <div className="card-body bg-success">
              <h6 className="text-uppercase">Rooms not conform</h6>
              <h1 className="display-4">{filter.length}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-danger h-100">
            <div className="card-body bg-danger">
              <h6 className="text-uppercase">Total booked Rooms</h6>
              <h1 className="display-4">{record.length}</h1>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Adult</th>
              <th>Children</th>
              <th>KingSize</th>
              <th>QueenSize</th>
              <th>FamilySize</th>
              <th>From</th>
              <th>To</th>
              <th>Conform</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{name}</td>
              <td>{phone}</td>
              <td>{email}</td>
              <td>{adult}</td>
              <td>{children}</td>
              <td>{kingsize}</td>
              <td>{queensize}</td>
              <td>{familysize}</td>
              <td>{From}</td>
              <td>{To}</td>
              <td>
                {(upperstatus==="able")?<button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => ConformBooking1(_id)}
                  >
                    Conform
                  </button>:<span style={{ color: "green" }}>&#10004;</span>
                  }
                  
                </td>
            </tr>
          </tbody>
        </table>
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>Room Name</th>
              <th>Room No</th>
              <th>Conform</th>
            </tr>
          </thead>
          <tbody>
            {record.map((item, index) => (
              <tr key={index}>
                <td>{item.kingsize ? "kingsize" : item.queensize ? "queensize" : "familysize"}</td>
                <td>{item.kingsize || item.queensize || item.familysize}</td>
                <td>
                {(item.status==="able")?<button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => ConformBooking2(item._id)}
                  >
                    Conform
                  </button>:<span style={{ color: "green" }}>&#10004;</span>
                  }
                  
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

export default Moredetails;
