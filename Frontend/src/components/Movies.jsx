import React from "react";
import { useParams } from "react-router-dom";  // Import useParams from react-router-dom
import Nav from "./Nav";
import Footer from "./Footer";
import GetMovies from "./GetMovies";

function Products() {
    const { categoryName } = useParams();  // Get categoryName from URL parameters

    return (
        <>
            <Nav />
            <GetMovies categoryId={categoryName} />  {/* Pass categoryName to GetProducts */}
            <Footer />
        </>
    );
}

export default Products;

