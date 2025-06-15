import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';
import '../css/Dashboard.css';
import { ACCESS_TOKEN } from '../token';
import { useAuth } from '../auth';
import Nav from './Nav';
import Footer from './Footer';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [ratedMovies, setRatedMovies] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const { isAuthorized, logout } = useAuth();

    useEffect(() => {
        const fetchUserDataAndRatings = async () => {
            if (!isAuthorized) {
                setLoading(false);
                return;
            }

            try {
                const accessToken = localStorage.getItem(ACCESS_TOKEN);
                if (!accessToken) throw new Error('No access token found');

                const headers = { Authorization: `Bearer ${accessToken}` };

                const userResponse = await api.get('/dashboard/', { headers });
                const userData = userResponse.data;
                setUserData(userData);
                setIsAdmin(userData.is_staff);

                const ratedMoviesResponse = await api.get('/api/user-rated-movies/', { headers });
                setRatedMovies(ratedMoviesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.response?.data?.detail || error.message);
                if (error.response?.status === 401) logout();
            } finally {
                setLoading(false);
            }
        };

        fetchUserDataAndRatings();
    }, [isAuthorized]);

    if (!isAuthorized) return <Navigate to="/login" replace />;
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;

    const renderUserData = () => (
        <div>
            <h2>Welcome, {userData.username}!</h2>
            {isAdmin && <p>You are an admin.</p>}
            <p>Status: {userData.is_active ? "Active" : "Inactive"}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );

    const renderRatedMovies = () => {
        const filteredMovies = ratedMovies.filter((rating) =>
            rating.movie.movie_title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="rated-movies-section">
                <h3 style={{ color: '#c90000', marginTop: '50px', marginBottom: '20px' }}>Your Rated Movies</h3>

                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="movie-search-input"
                />

                {filteredMovies.length > 0 ? (
                    <div className="rated-movie-list">
                        {filteredMovies.map((rating) => (
                            <div className="rated-movie-item" key={rating.id}>
                                {/* Infos à gauche */}
                                <div className="movie-text">
                                    <div className="title-id-line">
                                        <h5 className="movie-title">{rating.movie.movie_title}</h5>
                                        <span className="movie-id">ID: {rating.movie.movie_id}</span>
                                    </div>
                                    <p><strong>Rating:</strong> {rating.rating} ⭐</p>
                                    <p><strong>Genres:</strong> {rating.movie.movie_genre.map(g => g.name).join(', ')}</p>
                                </div>

                                {/* Image à droite */}
                                <div className="movie-icon">
                                    <img
                                        src={rating.movie.image_url || 'https://img.icons8.com/ios-filled/50/no-image.png'}
                                        alt={rating.movie.movie_title}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No movies match your search.</p>
                )}
            </div>
        );
    };

    return (
        <>
            <Nav />
            <div className="dashboard">
                <h1>Dashboard</h1>
                {renderUserData()}
                {renderRatedMovies()}
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
