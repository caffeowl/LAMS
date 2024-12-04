import React, { useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import lamslog from '../lams_logo_new.png';
import CaseGrid from './card';
import AddPCPage from './addpc';
import Faculty from './faculty';
import Session from './session';
export default function Admin() {
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/adminlogin', { replace: true }); // Redirect to login if session is invalid
    }
  }, [navigate]);

  // Logout Handler
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('reg');
    // Redirect to login page
    navigate('/adminlogin', { replace: true });
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div
        className="sidebar"
        style={{
          width: '250px',
          backgroundColor: 'black',
          color: 'white',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <div className="logo" style={{ marginBottom: '20px' }}>
          <img src={lamslog} alt="Admin Logo" style={{ width: '120px' }} />
        </div>
        {/* Navigation Links */}
        <ul
          className="nav-links"
          style={{ listStyle: 'none', padding: '0', width: '100%' }}
        >
          <li>
            <a
              href="/admin"
              onClick={() => navigate('/admin')}
              style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: '16px',
                padding: '10px 20px',
                display: 'block',
                transition: 'background-color 0.3s',
              }}
            >
              Lams Board
            </a>
          </li>
          <li>
            <a
              href="/admin/faculty"
              onClick={() => navigate('/admin/faculty')}
              style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: '16px',
                padding: '10px 20px',
                display: 'block',
                transition: 'background-color 0.3s',
              }}
            >
              Manage Faculty
            </a>
          </li>
          <li>
            <a
              href="/admin/session"
              onClick={() => navigate('/admin/session')}
              style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: '16px',
                padding: '10px 20px',
                display: 'block',
                transition: 'background-color 0.3s',
              }}
            >
              LAB Sessions
            </a>
          </li>
          <li>
            <a
              href="/admin/addpc"
              onClick={() => navigate('/admin/addpc')} // Navigate to Add PC Page
              style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: '16px',
                padding: '10px 20px',
                display: 'block',
                transition: 'background-color 0.3s',
              }}
            >
              PC Details
            </a>
          </li>
          <li>
            <a
              href="#logout"
              onClick={handleLogout} // Attach the logout handler
              style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: '16px',
                padding: '10px 20px',
                display: 'block',
                transition: 'background-color 0.3s',
              }}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="main-content" style={{ flex: 1, padding: '20px', backgroundColor: 'white', color: 'black' }}>
        <Routes>
          <Route path="/" element={<CaseGrid />} />
          <Route path="/addpc" element={<AddPCPage />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path='/session' element={<Session/>}/>
        </Routes>
      </div>
    </div>
  );
}
