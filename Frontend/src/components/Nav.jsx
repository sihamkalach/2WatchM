import { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import ProductItem from './MovieItem';
export default function Nav() {

  // Menu items
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Genres', path: '/genres' },
    { name: 'Movies', path: '/movies' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search input state

  const searchHandler = () => {
    setShowSearch(!showSearch);
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg py-2" style=
      {{
        'boxShadow': '0px 1px 10px rgba(18, 34, 157, 0.71)'
        }}>
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo on the left */}
          <Link to="/" className="navbar-brand">
            <img src={assets.logo} alt="2WatchM Logo" width="140" />
          </Link>

          {/* Centered Navigation Links */}
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav text-uppercase gap-3">
              {menuItems.map((item, index) => (
                <li
                  className="nav-item position-relative"
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)} // Activer la ligne
                  onMouseLeave={() => setHoveredIndex(null)} // Désactiver la ligne
                >
                  <Link
                    to={item.path}
                    className="nav-link"
                    style={{
                      color:'#f4f6fc', 
                      position: 'relative',
                      paddingBottom: '10px', // Légère marge en dessous
                    }}
                  >
                    {item.name}
                    {/* Ligne en dessous */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0, // Ligne au bas
                        left: 0,
                        height: '3px',
                        width: hoveredIndex === index ? '100%' : '0',
                        backgroundColor: '#c90000', // Couleur de la ligne
                        transition: 'width 0.2s ease-in-out',
                      }}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right-side Icons */}
          <div className="d-flex align-items-center gap-4 ms-3">
            <Link>
              <img
                src={assets.search_icon}
                alt="Search Icon"
                width="60"
                onClick={searchHandler}
              />
            </Link>
            <Link to="/login">
              <img src={assets.profile_icon} alt="Profile Icon" width="30" />
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Search bar with recommendations */}
      {showSearch && (
        <div className="container-fluid m-3">
          <form 
            className="d-flex justify-content-center" 
            role="search" 
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          >
            <input
              className="form-control me-2 rounded-pill shadow-sm border-1 p-3"
              type="search"
              placeholder="Search for products, collections, or brands..."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      )}
    </>
  );
}
