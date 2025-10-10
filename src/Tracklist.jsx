import { useState } from 'react';
import Track from './Track.jsx'

function Tracklist(props) {
    const receivedText = props.receivedText;

    // Implement function that takes the receivedText and inputs it into the spotify API to search for tracks

    // Implement function that retrieves the searched tracks from the API and then render each track as a Track component

    const trackNames = ['Song 1', 'Song 2', 'Song 3'];

    return (
        <>
        <div>
            <p>{receivedText}</p>
            <ul>
                {trackNames.map((trackName, index) => (
                    <li key={index}><Track trackName={trackName}/></li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default Tracklist;