import React from "react";
import imagenotfound from "../assets/imagenotfound.jpg";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";

function ProductItem({ id, title, rating = 0, image, genres = [] }) {
  // Fonction pour afficher les étoiles du rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="card shadow-sm h-100">
      {/* Image du film */}
      <div className="position-relative text-center p-3">
        <img
          src={image || imagenotfound}
          alt={title}
          className="img-fluid"
          style={{ height: "250px", objectFit: "cover", borderRadius: "10px" }}
        />
      </div>

      {/* Contenu de la carte */}
      <div className="card-body text-center">
        <h5 className="card-title text-truncate">{title}</h5>
        <div className="mb-2">
          {genres.map((genre) => (
            <span
              key={genre.id}
              className="mx-1 px-2 py-1 rounded text-white text-sm fw-semibold"
              style={{ backgroundColor: "#050a30", display: "inline-block" }}
            >
              {genre.name}
            </span>
          ))}
        </div>
        {/* Affichage du rating */}
        <p className="card-text text-warning mb-2" style={{ fontSize: "1.2rem" }}>
          {renderStars(rating)}
        </p>

        {/* Lien vers la page de détails */}
        <Link
          to={`/movie/${id}`}
          style={{
            backgroundColor: '#c90000',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#a80000'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#c90000'}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
