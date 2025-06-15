import React, { useState, useEffect } from "react";
import api from "../api"; // Adapter en fonction de votre configuration
import ProductItem from "./MovieItem";

function GetProducts({ categoryId }) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = categoryId
                    ? await api.get(`/api/genres/${categoryId}/movies/`)  // Filter by category
                    : await api.get("/api/movies", { timeout: 65000 });
                setProducts(response.data);
            } catch (error) {
                console.error("Erreur lors du fetch des produits :", error);
            }
        }
        fetchData();
    }, [categoryId]); // Trigger fetch when categoryId changes

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <>
            <div className="text-white text-center py-5">
            <div className="container">
                <h2 className="mb-4 text-center fw-bold" style={{color:  '#c90000'}}>Explore Our Movie Library</h2>
                <p className="text-light text-center mb-4 px-5">
                Dive into a world of cinema with our collection of over {products.length} movies—featuring timeless classics, modern blockbusters, and hidden gems from every genre.
                </p>
            </div>
                <div className="row g-4 mx-5 my-1">
                    {currentProducts.map((movie) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={movie.id}>
                            <ProductItem
                                id={movie.movie_id}
                                title={movie.movie_title}
                                rating={movie.user_rating}
                                image={movie.image_url}
                                genres={movie.movie_genre}
                                />
                        </div>
                    ))}
                </div>
                <div className="container d-flex justify-content-center my-4">
    <nav aria-label="Page navigation example">
        <ul className="pagination" style={{ backgroundColor: '#050a30', borderRadius: '8px', padding: '10px 20px' }}>
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                        backgroundColor: '#c90000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        marginRight: '10px',
                        padding: '6px 12px',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        opacity: currentPage === 1 ? 0.6 : 1
                    }}
                >
                    Previous
                </button>
            </li>

            <li className="page-item disabled">
                <span className="page-link text-white" style={{ backgroundColor: 'transparent', border: 'none' }}>
                    Page {currentPage} of {totalPages}
                </span>
            </li>

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                        backgroundColor: '#c90000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        marginLeft: '10px',
                        padding: '6px 12px',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        opacity: currentPage === totalPages ? 0.6 : 1
                    }}
                >
                    Next
                </button>
            </li>
        </ul>
    </nav>
</div>

            </div>
        </>
    );
}

export default GetProducts;
