import React from 'react';
import { assets } from '../assets/assets';

function Footer() {
  return (
    <div className="mt-3" style={{ backgroundColor: '#050a30', color: '#f4f6fc' }}>
      <div className="d-flex justify-content-center container m-auto py-4 border-bottom" style={{ borderColor: '#f4f6fc44' }}>
        <div className="row gy-4 gx-5 w-100">
          {/* Logo & Description Section */}
          <div className="col-12 col-sm-6 col-md-6 d-flex flex-column align-items-start">
            <img src={assets.logo} className="img-fluid mb-3" alt="Logo" width={160} />
            <p className="small w-75" style={{ color: '#f4f6fc' }}>
              Welcome to <strong style={{ color: '#c90000' }}>2WatchM</strong>, your personalized movie companion.
              Dive into a world of intelligent recommendations, tailored just for your taste.
              Discover, watch, and enjoy cinema like never before.
            </p>
          </div>

          {/* Section Company */}
          <div className="col-12 col-sm-6 col-md-3 d-flex flex-column align-items-start">
            <h5 className="mb-4" style={{ color: '#f4f6fc' }}>COMPANY</h5>
            <ul className="list-unstyled small">
              <li className="mb-2 text-light">Home</li>
              <li className="mb-2 text-light">About Us</li>
              <li className="mb-2 text-light">Privacy Policy</li>
            </ul>
          </div>

          {/* Section Get in Touch */}
          <div className="col-12 col-sm-6 col-md-3 d-flex flex-column align-items-start">
            <h5 className="mb-4 text-uppercase" style={{ color: '#f4f6fc' }}>Get in Touch</h5>
            <ul className="list-unstyled small">
              <li className="mb-2 text-light">+212 621356867</li>
              <li className="mb-2 text-light">sihamkalach3@gmail.com</li>
              <li className="mb-2">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                  style={{ color: '#f4f6fc' }}
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center small py-3" style={{ color: '#f4f6fc' }}>
        <p className="m-0">
          &copy; 2024 <strong style={{ color: '#c90000' }}>2WatchM</strong> - All Rights Reserved.
        </p>
        <p className="m-0">
          Developed by <strong style={{ color: '#c90000' }}>Siham Kalach</strong>
        </p>
      </div>
    </div>
  );
}

export default Footer;
