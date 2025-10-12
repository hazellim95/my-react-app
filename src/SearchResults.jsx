import { useState, useEffect } from 'react';
import './SearchResults.css';
import Tracklist from './Tracklist.jsx'
import Playlist from './Playlist.jsx'
import { Buffer } from 'buffer';


function SearchResults(props) {
    const receivedText = props.receivedText;
    const receivedData = props.receivedData;
    const loading = props.loading;
    const error= props.error;


    // if (loading) return <p>Loading data...</p>
    // if (error) return (
    //     <>
    //         <p>Search results:</p>
    //         <div id="container">
    //             <p>Error: {error.message}</p>
    //         </div>
    //     </>
    // )

    return (
        <>
            <div id="container">
                <div id="searchResults">
                    <Tracklist receivedText={receivedText} receivedData={receivedData} loading={loading} error={error}/>
                </div>
                <div id="playlist">
                    <Playlist />
                </div>
            </div>
        </>
    )
}

export default SearchResults;