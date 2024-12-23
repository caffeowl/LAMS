import './login.css'; // Use single quotes for file paths in JSX
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import lamslog from '../pages/lams_logo_new.png';
export default function Login() {
  const [reg, setReg] = useState('');
  const [psw, setPsw] = useState('');
  const navigate = useNavigate();
  
  async function handleSubmit(event) {
    event.preventDefault();

    // Basic validation (optional but recommended)
    if (!reg || !psw) {
      alert('Please enter both registration number and password.');
      return;
    }

    try {
      // Convert password to integer before sending to the server
      const passwordAsInteger = parseInt(psw, 10);

      if (isNaN(passwordAsInteger)) {
        alert('Password must be a valid number.');
        return;
      }

      // Send login request with password as an integer
      const response = await axios.post('http://localhost:1337/login', {
        reg,
        psw: passwordAsInteger, // Sending password as an integer
      });

      if (response.data.message === 'Login successful') {
        console.log('Login successful!');
        // Save login state to sessionStorage
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('reg', reg); // Optional: Save reg for user identification
        navigate('/attend',  { replace: true }); // Redirect to another page
      } else {
        alert('Invalid login credentials.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during login. Please try again.');
    }
  }

  return (
    <div className="container mt-5 body"> {/* Use className instead of class */}
    <div className='Header'>
    <img src={lamslog} alt="Logo" style={{ width: '220px'}} />
    </div>
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card">
            <div className="card-body">
              <form id="registrationForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="reg" id="label">
                    <b> Registration Number </b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={reg}
                    onChange={(e) => setReg(e.target.value)}
                    placeholder="Registration Number"
                    required
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="password" id="label_pass">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={psw}
                    onChange={(e) => setPsw(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-primary text-center">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
