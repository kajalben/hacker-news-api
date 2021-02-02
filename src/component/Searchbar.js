import React from 'react';
import '../styles/searchbar.css';

const SearchBar = () => {
    return (
        <>
        <div class="wrap">
            <div className="search">
                <input type="text" className="searchTerm" placeholder="What are you looking for?" />
                <button type="submit" className="searchButton">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
        </>

    );

}

export default SearchBar;