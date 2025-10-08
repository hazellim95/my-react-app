import { useState } from 'react';
import './SearchResults.css';

function SearchResults() {
    return (
        <>
            <p>Search results:</p>
            <div id="container">
                <div id="searchResults"></div>
                <div id="playlist"></div>
            </div>
        </>
    )
}

export default SearchResults;