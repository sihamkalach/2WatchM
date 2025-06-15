import image from '../assets/notfound-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

export default function PageNotFound() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      <div
        className="container-fluid text-center py-5"
        style={{ backgroundColor: '#050a30', color: '#f4f6fc', minHeight: '100vh' }}
      >
        {/* Image Section */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <img
              src={image}
              alt="Page Not Found"
              className="img-fluid mb-4"
              style={{ maxWidth: '400px' }}
            />
          </div>
        </div>

        {/* Message Section */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <h1 className="fw-bold mb-4" style={{ color: '#c90000' }}>
              Oops! Page Not Found.
            </h1>
            <p className="mb-4" style={{ color: '#f4f6fc' }}>
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>

        {/* Button Section */}
        <div className="row justify-content-center">
          <div className="col-auto">
            <button
              onClick={handleClick}
              className="btn px-4 rounded-pill text-uppercase fw-bold"
              style={{ backgroundColor: '#c90000', color: '#fff', border: 'none' }}
            >
              Back To Home
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
