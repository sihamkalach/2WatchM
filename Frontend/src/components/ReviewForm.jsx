import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";
import "../css/ReviewForm.css";
import { ACCESS_TOKEN } from "../token";

const ReviewForm = () => {
    const {id} = useParams();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [productId, setProductId] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // fetch order details to get the product id

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!rating || !review || !productId)  {
            setError("Please provide a rating, review ");
            return;
        }

        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            console.log('access token', token);
            const payload = {
                product: productId,
                rating: rating,
                comment: review,
            };
            console.log('payload', payload);

            await api.post('/reviews/', payload, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            toast.success('Review submitted successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setRating(0);
            setReview('');
            window.location.reload();
        } catch (error) {
            setError("Failed to submit review");
            console.log("Failed to submit review", error.response?.data || error.message);
            toast.error('Failed to submit review', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="review-form">
            <ToastContainer />
            <h2>Give A Review</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Rating:</label>
                    <input
                        type="number"
                        value={rating}
                        min="1"
                        max="5"
                        required
                        onChange={(e) => setRating(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Review:</label>
                    <textarea
                        value={review}
                        required
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">Submit Review</button>
            </form>
        </div>
    );
}

export default ReviewForm;