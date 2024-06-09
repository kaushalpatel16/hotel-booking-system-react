

import { useEffect, useState } from "react";

import { Navbar } from "../../components";
import qs from "qs";
import "./BookTable.css";
import { loadStripe } from "@stripe/stripe-js";

const BookTable = () => {
  const [total, settotal] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [newselectetabelby3, setNewselectetabelby3] = useState(0);
  const [newselectetabelby4, setNewselectetabelby4] = useState(0);
  const [newselectetabelby5, setNewselectetabelby5] = useState(0);

  const [usernewname, setusernewname] = useState("");
  const [newphonenumber, setnewphonenumber] = useState("");
  const [newRequest, setnewRequest] = useState("");
  const [date, setdate] = useState("");

  const onchangename = (e) => {
    setusernewname(e.target.value);
  };

  const onchangenumber = (e) => {
    const inputPhoneNumber = e.target.value;

    if (inputPhoneNumber.length <= 10) {
      setnewphonenumber(inputPhoneNumber);
    }
  };

  const onchangerequest = (e) => {
    setnewRequest(e.target.value);
  };

  const onchangedate = (e) => {
    setdate(e.target.value);
    gettabledata();
  };

  const gettabledata = (selectedTime) => {
    if (selectedTime || selectedValue) {
      const endpoint = selectedTime
        ? `http://localhost:8081/bookinfos/${selectedTime}/${date}`
        : `http://localhost:8081/bookinfos/${selectedValue}/${date}`;

      fetch(endpoint)
        .then((response) => response.json())
        .then((result) => settotal(result))
        .catch((error) => console.error("Error fetching data:", error));
    }
  };

  useEffect(() => {
    gettabledata();
    const intervalId = setInterval(gettabledata, 10000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const handleSelectChange = (event) => {
    const selectedTime = event.target.value;
    setNewselectetabelby3("Select a 3 person tables ");
    setNewselectetabelby4("Select a 4 person tables");
    setNewselectetabelby5("Select a 5 person tables");

    setSelectedValue(selectedTime);
    gettabledata(selectedTime);
  };

  const handleSelectChangeon3persontable = (event) => {
    setNewselectetabelby3(event.target.value);
  };

  const handleSelectChangeon4persontable = (event) => {
    setNewselectetabelby4(event.target.value);
  };

  const handleSelectChangeon5persontable = (event) => {
    setNewselectetabelby5(event.target.value);
  };

  const makePayment = async () => {
    const finalrequest = newRequest === "" ? "NO" : newRequest;

    const adddataa = {
      name: usernewname,
      Time: selectedValue,
      request: finalrequest,
      phonenumber: newphonenumber,
      fivepersontable: newselectetabelby5,
      fourpersontable: newselectetabelby4,
      threepersontable: newselectetabelby3,
      visibility: "able",
      date: date,
    };

    const retrievedValue = localStorage.getItem("datatobook");

    if (retrievedValue) {
      localStorage.clear();
    }

    localStorage.setItem("datatobook", JSON.stringify(adddataa));

    setusernewname("");
    setnewphonenumber("");
    setnewRequest("");
    setdate("");
    setSelectedValue("");

    const stripe = await loadStripe(
      "pk_test_51OiDisSI89PeMxe8blaTqGzRwwgcCRkvncyNNbpozk6qQp7spB4jrYZjTqXkPOwLrfvRNWz7PNkxbV3bKxEQ8ply00Awif4zgn"
    );

    const adddata = {
      name: usernewname,
      Time: selectedValue,
      fivepersontable: newselectetabelby5,
      fourpersontable: newselectetabelby4,
      threepersontable: newselectetabelby3,
    };

    const response = await fetch(
      "http://localhost:8081/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(adddata),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log("Payment not successful");
    }
  };

  return (
    <>
      <Navbar />
      <div className="app__bg app__wrapper section__padding" id="contact">
        <div className="app__newsletter  ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              makePayment(e);
            }}
          >
            <div className="app__newsletter-heading">
              <h1 className="headtext__cormorant">Select Date </h1>
              <p className="p__opensans">
                First, you need to select a date and time
              </p>
            </div>
            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                Select Date
              </button>

              <input
                className="input"
                type="date"
                placeholder="select date"
                value={date}
                onChange={onchangedate}
                required
              />
            </div>
            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                Select Time
              </button>

              <select
                value={selectedValue}
                onChange={handleSelectChange}
                className="select"
                required
              >
                <option value="">Select a time</option>
                <option key="10AM to 11:30AM" value="10AM to 11:30AM">
                  10AM to 11:30AM
                </option>
                <option key="11:30AM to 1PM" value="11:30AM to 1PM">
                  11:30AM to 1PM
                </option>
                <option key="1PM to 2:30PM" value="1PM to 2:30PM">
                  1PM to 2:30PM
                </option>
                <option key="2:30PM to 4PM" value="2:30PM to 4PM">
                  2:30PM to 4PM
                </option>
                <option key="4PM to 5:30PM" value="4PM to 5:30PM">
                  4PM to 5:30PM
                </option>
                <option key="5:30PM to 7PM" value="5:30PM to 7PM">
                  5:30PM to 7PM
                </option>
                <option key="7PM to 8:30PM" value="7PM to 8:30PM">
                  7PM to 8:30PM
                </option>
                <option key="8:30PM to 10PM" value="8:30PM to 10PM">
                  8:30PM to 10PM
                </option>
              </select>
            </div>

            <div className="app__newsletter-heading">
              <h1 className="headtext__cormorant">
                Select Table available at{" "}
              </h1>
              <h1 className="p__opensans">{selectedValue}</h1>
            </div>

            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                select how many table of 3 person you want
              </button>
              <select
                value={newselectetabelby3}
                onChange={handleSelectChangeon3persontable}
                className="select"
                required
              >
                <option value="">Select a 3 person tables</option>
                <option value={0}>0</option>

                {total.totalthreepersontable !== 5 &&
                  Array.from(
                    { length: 5 - total.totalthreepersontable },
                    (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    )
                  )}
              </select>
            </div>

            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                select how many table of 4 person you want
              </button>
              <select
                value={newselectetabelby4}
                onChange={handleSelectChangeon4persontable}
                className="select"
                required
              >
                <option value="" Disabled>
                  Select a 4 person tables
                </option>
                <option value={0}>0</option>
                {total.totalfourpersontable !== 5 &&
                  Array.from(
                    { length: 5 - total.totalfourpersontable },
                    (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    )
                  )}
              </select>
            </div>

            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                select how many table of 5 person you want
              </button>
              <select
                value={newselectetabelby5}
                onChange={handleSelectChangeon5persontable}
                className="select"
                required
              >
                <option value="">Select a 5 person tables</option>
                <option value={0}>0</option>
                {total.totalfivepersontable !== 5 &&
                  Array.from(
                    { length: 5 - total.totalfivepersontable },
                    (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    )
                  )}
              </select>
            </div>

            <div className="app__newsletter-heading">
              <h1 className="headtext__cormorant">Enter your Information </h1>
            </div>
            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                Enter Name
              </button>
              <input
                className="input"
                type="text"
                placeholder="Enter your Name"
                onChange={onchangename}
                value={usernewname}

                required
              />
            </div>

            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                Enter Phone Number
              </button>
              <input
                className="input"
                type="number"
                placeholder="Enter your Phone number"
                onChange={onchangenumber}
                value={newphonenumber}
                required
              />
            </div>

            <div className="app__newsletter-heading">
              <h1 className="headtext__cormorant">Special Request </h1>
              <p className="p__opensans">
                if you have any special Request in food test or decorate table for birthday or other,  add here
              </p>
            </div>
            <div className="app__newsletter-input flex__center">
              <button type="button" className="custom__button">
                Enter your request
              </button>
              <input
                type="text"
                className="input"
                placeholder="Enter your test"
                onChange={onchangerequest}
                value={newRequest}
              />
            </div>
            <div className="app__newsletter-input flex__center">
              <button type="submit" className="custom__button submitbtn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}; 

export default BookTable;