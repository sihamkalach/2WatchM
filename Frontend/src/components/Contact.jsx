import { useState } from "react";
import Navbar from "./Nav";
import Footer from "./Footer";
import image_form from "../assets/contact_img.jpg";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message from ${formData.name} has been submitted!`);
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#f5f5f5", padding: "60px 0" }}>
        <div className="container d-flex flex-column flex-lg-row bg-white shadow rounded-4 overflow-hidden w-75">
          
          {/* Image Section */}
          <div className="col-lg-5 p-0">
            <img
              src={image_form}
              alt="Contact"
              className="img-fluid h-100 w-100 object-fit-cover"
              style={{ objectFit: "cover", height: "90%" }}
            />
          </div>

          {/* Form Section */}
          <div className="col-lg-7 p-5">
            <h2 className="mb-4 text-center fw-bold" style={{ color: "#c90000" }}>
              Contact Us
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control rounded-pill px-4 py-2"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control rounded-pill px-4 py-2"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  className="form-control rounded-4 px-4 py-3"
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  required
                />
              </div>
              <button
                type="submit"
                className="btn w-100 py-2 rounded-pill fw-bold"
                style={{ backgroundColor: "#c90000", color: "#fff", fontSize: "16px", letterSpacing: "0.5px" }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
