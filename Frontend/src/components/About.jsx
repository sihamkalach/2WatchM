import React from "react";
import img1 from '../assets/image5.jpg';
import img2 from '../assets/image6.jpg';
import img3 from '../assets/image7.jpg';
import img4 from '../assets/image8.jpg';
import logo from '../assets/logo.png';
import Footer from "./Footer";
import Nav from "./Nav";

export default function About() {
  return (
    <>
      <Nav />
      <div className="about text-center py-5" style={{ backgroundColor: '#050a30' }}>
        <div className="container" >
          {/* Title and Introduction */}
          <h2 className="mb-4 fw-bold text-light" style={{ fontSize: "2.5rem" }}>Empowering Your Time with Style</h2>
          <p className="text mb-5" style={{ fontSize: "1.1rem", color: '#f4f6fc' }}>
            At 2WatchM, we believe watches are more than just timepieces—they are expressions of personality. Our mission is to help you discover the watches that empower your style and match your unique personality.
          </p>

          {/* Text + Image Section */}
          <div className="row">
            {/* Text Section */}
            <div className="col-md-6 px-5 text-start pt-5">
              <h3 className="fw-semibold mb-3" style={{ color: '#c90000' }}>Who We Are</h3>
              <p style={{ color: '#f4f6fc' }}>
                2WatchM is more than just a watch retailer—it's a brand that merges timeless style with cutting-edge technology. We offer a curated collection of watches that redefine the way you view time, with designs inspired by global trends and personal elegance.
              </p>
              <h3 className="fw-semibold mb-3" style={{ color: '#c90000' }}>Join the Movement</h3>
              <p style={{ color: '#f4f6fc' }}>
                Whether you are looking for your first smartwatch or the perfect luxury piece, 2WatchM is here to help you find the watch that fits your lifestyle. Explore our range and embrace a world where time meets fashion.
              </p>
            </div>

            {/* Image Section */}
            <div className="col-md-6">
              <div className="row g-3">
                <div className="col-6">
                  <img
                    src={img1}
                    alt="Watch Inspiration 1"
                    className="img-fluid rounded shadow-lg"
                    style={{ filter: 'brightness(85%)' }}
                  />
                </div>
                <div className="col-6">
                  <img
                    src={img2}
                    alt="Watch Inspiration 2"
                    className="img-fluid rounded shadow-lg"
                    style={{ filter: 'brightness(85%)' }}
                  />
                </div>
                <div className="col-6 mt-5">
                  <img
                    src={img3}
                    alt="Watch Inspiration 3"
                    className="img-fluid rounded shadow-lg"
                    style={{ filter: 'brightness(85%)' }}
                  />
                </div>
                <div className="col-6 mt-5">
                  <img
                    src={img4}
                    alt="Watch Inspiration 1"
                    className="img-fluid rounded shadow-lg"
                    style={{ filter: 'brightness(85%)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer style={{ backgroundColor: '#050a30', color: '#f4f6fc' }} />
    </>
  );
}
