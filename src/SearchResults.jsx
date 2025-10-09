import { useState } from 'react';
import './SearchResults.css';
import Tracklist from './Tracklist.jsx'
import Playlist from './Playlist.jsx'

function SearchResults(props) {
    const receivedText = props.receivedText;
    return (
        <>
            <p>Search results:</p>
            <div id="container">
                <div id="searchResults">
                    <Tracklist receivedText={receivedText}/>
                </div>
                <div id="playlist">
                    <Playlist />
                </div>
            </div>
        </>
    )
}

export default SearchResults;