import React, { useState } from 'react';
import qs from 'qs';

import SubHeading from '../SubHeading/SubHeading';
import './Newsletter.css';

const Newsletter = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const adduser = (event) => {
    event.preventDefault();
    const newTransaction = {
      name: username,
      email: email,
    };

    fetch(`http://localhost:8081/Subscriber`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(newTransaction),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Add successfully');
          // Clear the form inputs after successful registration
          setUsername('');
          setEmail('');
          // Show the popup
          setShowPopup(true);
          // Hide the popup after a certain time (e.g., 3 seconds)
          setTimeout(() => {
            setShowPopup(false);
          }, 3000);
        } else {
          console.error('Failed to add user. Status:', response.status);
          // Handle error cases, e.g., show an error message to the user
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle fetch error cases
      });
  };

  return (
    <div className="app__newsletter">
      <div className="app__newsletter-heading">
        <SubHeading title="Newsletter" />
        <h1 className="headtext__cormorant">Subscribe To Our Newsletter</h1>
        <p className="p__opensans">And never miss the latest updates!</p>
      </div>
      <div className="app__newsletter-input flex__center">
        <form onSubmit={adduser} >
          <div className="input-group mb-3">
            <input
              type="text"
              placeholder="Enter your name"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="custom__buttonn ">
              Subscribe
            </button>
          </div>
        </form>
        {showPopup && (
          <div className="popup">
            <p>Successfully subscribed!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
