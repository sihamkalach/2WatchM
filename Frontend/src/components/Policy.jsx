import React from "react";
import { assets } from "../assets/assets";

function Policy() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      {/* Policies Section */}
      <div style={{ backgroundColor: "#f4f6fc", color: "#050a30" }} className="py-5">
        <div className="row text-center">
          <div className="col-12 col-sm-4 mb-4 mb-sm-0">
            <img
              src={assets.exchange_icon}
              className="img-fluid mb-3"
              alt="Exchange Icon"
              width="50"
            />
            <p className="fw-bold" style={{ color: "#050a30" }}>Easy Exchange Policy</p>
            <p>We offer hassle-free exchange policy.</p>
          </div>
          <div className="col-12 col-sm-4 mb-4 mb-sm-0">
            <img
              src={assets.quality_icon}
              className="img-fluid mb-3"
              alt="Quality Icon"
              width="50"
            />
            <p className="fw-bold" style={{ color: "#050a30" }}>7 Days Return Policy</p>
            <p>We provide a 7-day free return policy.</p>
          </div>
          <div className="col-12 col-sm-4">
            <img
              src={assets.support_img}
              className="img-fluid mb-3"
              alt="Support Icon"
              width="50"
            />
            <p className="fw-bold" style={{ color: "#050a30" }}>Best Customer Support</p>
            <p>We provide 24/7 customer support.</p>
          </div>
        </div>
      </div>

      {/* Subscription Section */}
      <div style={{ backgroundColor: "#050a30", color: "#f4f6fc" }} className="container text-center py-5">
        <h1 className="mb-3 fw-semibold" style={{ color: "#f4f6fc" }}>
          Subscribe now & get <span style={{ color: "#c90000" }}>20% off</span>
        </h1>
        <p className="mb-4">Stay updated with our latest movies and recommendations.</p>
        <form
          onSubmit={handleSubmit}
          className="row justify-content-center align-items-center g-3"
        >
          <div className="col-auto">
            <input
              required
              type="email"
              className="form-control rounded-pill px-4"
              placeholder="Enter your email"
              style={{ backgroundColor: "#f4f6fc", color: "#050a30", border: "none" }}
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn rounded-pill px-4 text-uppercase"
              style={{
                backgroundColor: "#c90000",
                border: "none",
                color: "#f4f6fc"
              }}
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Policy;

