import React, { useEffect, useState } from 'react';
import api from '../api';
import { ACCESS_TOKEN } from '../token';
import { Badge } from 'react-bootstrap';


const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [ratedIds, setRatedIds] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const token = localStorage.getItem(ACCESS_TOKEN);
                const res = await api.get('/api/recommendations/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRecommendations(res.data.recommendations);
                setRatedIds(res.data.rated_ids || []);
            } catch (err) {
                console.error('Failed to fetch recommendations', err);
                setError('Could not load recommendations.');
            }
        };

        fetchRecommendations();
    }, []);

    if (error) return <p className="error-message">{error}</p>;
    if (!recommendations.length) return <p>Loading recommendations...</p>;

    return (
        <div className="recommendations" style={{ padding: '20px' }}>
            <h3 style={{ color: '#c90000', marginBottom: '50px' }}>
            🎬 Recommended Movies
            </h3>

            <div className="row">
                {recommendations.map(movie => (
                    <div className="col-md-3 mb-4" key={movie.id}>
                        <div className="card shadow-sm h-100">
                            <div className="position-relative text-center p-2">
                                <img
                                    src={movie.image_url}
                                    alt={movie.movie_title}
                                    className="img-fluid"
                                    style={{ height: "200px", objectFit: "cover", borderRadius: "10px" }}
                                />
                                {ratedIds.includes(movie.movie_id) && (
                                    <Badge
                                        bg="danger"
                                        style={{ position: 'absolute', top: 10, right: 10 }}
                                    >
                                        Already Seen
                                    </Badge>
                                )}
                            </div>
                            <div className="card-body text-center">
                                <h5 className="card-title text-truncate">{movie.movie_title}</h5>
                                <div className="mb-2">
                                {movie.movie_genre.map((genre) => (
                                    <span
                                    key={genre.id}
                                    className="mx-1 px-2 py-1 rounded text-white text-sm fw-semibold"
                                    style={{ backgroundColor: "#050a30 ", display: "inline-block" }}
                                    >
                                    {genre.name}
                                    </span>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
