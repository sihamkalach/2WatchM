import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import { Row, Col, Card, Badge } from 'react-bootstrap';
import api from "../api";
import "../css/Genres.css"; // make sure to import your global styles

function Collections() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get("/api/genres");
                setCategories(response.data);
            } catch (error) {
                console.error("Erreur lors du fetch des catégories :", error);
            }
        }
        fetchData();
    }, []);

    const handleCategoryClick = (categoryName) => {
        navigate(`/movies/${categoryName}`);
    };

    return (
        <div>
            <Nav />
            <div className="text-center py-5">
                <div className="container">
                    <h2 className="mb-4 text-center fw-bold collection-title">
                         Our Movie Genres
                    </h2>
                    <p className="text-center mb-5 px-5 collection-description">
                         Discover our diverse selection of movie genres — from action and comedy to romance and science fiction. 
                        Find the perfect category for your next watch.
                    </p>
                </div>
                <div className="categories m-5">
                    <Row className="g-4">
                        {categories.map((category) => (
                            <Col key={category.id} lg={3} md={6} sm={12}>
                                <Card
                                    className="shadow-sm border-0 h-100 position-relative custom-card"
                                    style={{
                                        overflow: "hidden",
                                        borderRadius: "15px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleCategoryClick(category.name)}
                                >
                                    <Card.Img
                                        className="p-5"
                                        src={category.image}
                                        alt={category.name}
                                        style={{ height: "300px" }}
                                    />
                                    <Card.Body className="text-center">
                                        <Badge className="mb-2 p-2 custom-badge">
                                            {category.name}
                                        </Badge>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Collections;
