import { useState } from 'react';
import Track from './Track.jsx';
import './Tracklist.css';

function Tracklist(props) {
    const receivedText = props.receivedText;
    const receivedData = props.receivedData;
    const loading = props.loading;
    const error= props.error;
    const selectedSongs= props.selectedSongs;
    const setSelectedSongs= props.setSelectedSongs;
    const authError = props.authError;


    if (loading) return <p>Loading data...</p>
    if (error) return (
        <>
            <h2>Search Results</h2>
            <div id="container">
                <p>Error: {error.message}</p>
            </div>
        </>
    )
    
    if (authError) return (
         <>
            <h2>Search Results</h2>
            <div id="container">
                <p>Error: {authError.message}</p>
            </div>
        </>
    )
    

    return (
        <>
        <div>
            <h2>Search Results</h2>
            <ul>
                {receivedData?.map(([trackName, artists, album, id, uri], index) => (
                    <li key={index}>
                        <Track trackName={trackName} artists={artists} album={album} id={id} uri={uri} selectedSongs={selectedSongs} setSelectedSongs={setSelectedSongs}/>
                    </li>
                ))}
            </ul>
        </div>

        </>
    );
}

export default Tracklist;