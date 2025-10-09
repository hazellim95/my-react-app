import { useState } from 'react';
import './SearchResults.css';
import Track from './Track.jsx'

function SearchResults(props) {
    const receivedText = props.receivedText;
    return (
        <>
            <p>Search results:</p>
            <div id="container">
                <div id="searchResults">
                    <p>{receivedText}</p>
                </div>
                <div id="playlist">
                    <Track />
                </div>
            </div>
        </>
    )
}

export default SearchResults;