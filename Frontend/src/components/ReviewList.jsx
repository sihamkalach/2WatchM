import React, { useState } from "react";
import "../css/ReviewForm.css";

const ReviewsList = ({ reviews = [] }) => {
  const [visibleReviews, setVisibleReviews] = useState(3); // Show 3 reviews initially

  const showMoreReviews = () => {
    setVisibleReviews((prev) => prev + 3); // Load 3 more reviews on click
  };

  return (
    <div className="reviews-section ">
      <h2 className="reviews-title">Customer Reviews</h2>
      {reviews.length > 0 ? (
        <>
          <div className="reviews-container">
            {reviews.slice(0, visibleReviews).map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <p className="review-user">{review.reviewerName}</p>
                  <span className="review-rating">⭐ {review.rating} / 5</span>
                </div>
                <p className="review-comment">{review.comment}</p>
                <p className="review-date">
                  <strong>Submitted on:</strong> {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
          {visibleReviews < reviews.length && (
            <button className="load-more-btn" onClick={showMoreReviews}>
              Read More Reviews
            </button>
          )}
        </>
      ) : (
        <p className="no-reviews">No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
};

export default ReviewsList;
