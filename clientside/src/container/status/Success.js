import React, { useEffect, useState } from 'react';
import qs from 'qs';
import './Success.css';

const Success = () => {
  const [name, setname] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const retrievedValue = JSON.parse(localStorage.getItem('datatobook'));

      if (retrievedValue) {
        console.log(retrievedValue);

        // Update the table data on the server
        try {
          const updateResponse = await fetch('http://localhost:8081/bookinfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: qs.stringify(retrievedValue),
          });

          if (updateResponse.ok) {
            console.log('Update successful');
            
            // Set the name after a successful update
            setname(retrievedValue.name);

            // Optionally, you can reset form fields or perform other actions after a successful update
            // Reset phone number field
            // Additional reset logic for other fields if needed
          } else {
            console.error('Update failed');
          }
        } catch (error) {
          console.error('Error updating data:', error);
        }

        // Clear local storage after retrieving the data
        localStorage.clear();
      }
    };

    fetchData();
  }, []);

  return (
    <div className="containerStyle">
      <div className="card">
        <div style={{ borderRadius: '50%', height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className="i">✓</i>
        </div>
        <h1 className="h1">Success</h1>
        <p className="p"> Hi, {name} We received your booking;<br/>we sent you an SMS please check<br/> Thank you</p>
        <a className="aa" href="/">Back to Home</a>
      </div>
    </div>
  );
};

export default Success;
