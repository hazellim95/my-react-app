import { useState } from 'react';
import { Track, selectedSongs } from './Track.jsx';

function Tracklist(props) {
    const receivedText = props.receivedText;
    const receivedData = props.receivedData;
    const loading = props.loading;
    const error= props.error;


    if (loading) return <p>Loading data...</p>
    if (error) return (
        <>
            <h2>Search Results</h2>
            <div id="container">
                <p>Error: {error.message}</p>
            </div>
        </>
    )

    return (
        <>
        <div>
            <h2>Search Results</h2>
            <ul>
                {receivedData?.map((trackName, index) => (
                    <li key={index}><Track trackName={trackName}/></li>
                ))}
            </ul>
        </div>

        </>
    );
}

export default Tracklist;