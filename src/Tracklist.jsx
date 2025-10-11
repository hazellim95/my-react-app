import { useState } from 'react';
import Track from './Track.jsx'

function Tracklist(props) {
    const receivedText = props.receivedText;
    const receivedData = props.receivedData;

    return (
        <>
        <div>
            <p>{receivedText}</p>
            <ul>
                {receivedData.map((trackName, index) => (
                    <li key={index}><Track trackName={trackName}/></li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default Tracklist;