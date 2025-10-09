import { useState } from 'react';
import './SearchResults.css';

function SearchResults(props) {
    return (
        <>
            <p>Search results:</p>
            <div id="container">
                <div id="searchResults">
                    <p>{props.receivedText}</p>
                </div>
                <div id="playlist"></div>
            </div>
        </>
    )
}

export default SearchResults;