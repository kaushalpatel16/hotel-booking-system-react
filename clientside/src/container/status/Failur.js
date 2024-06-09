import React from 'react'
import { useNavigate } from 'react-router-dom'; 
import './Failur.css';
const Failure = () => {
    const navigate = useNavigate()
    return (
      <div className="containerStylee">
      <div className="cardd">
        <div style={{ borderRadius: '50%', height: '200px', width: '200px', background: '#faeeee', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className="ii">❌</i>
        </div>
        <h1 className="h11">Payment Cancelled</h1>
        <p className="pp">Your payment has been cancelled.</p>
        <a  className="aa" href="/">Back to Home</a>
      </div>
    </div>
      );
}

export default Failure