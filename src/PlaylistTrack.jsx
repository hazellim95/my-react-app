import { useState } from 'react';
import './PlaylistTrack.css'

function PlaylistTrack(props) {
    const trackName = props.trackName;
    const artists = props.artists;
    const album = props.album;
    const id = props.id;
    const uri = props.uri;

    return (
        <>
        <div id="container1">
            <p>{trackName} by {artists}, {album}</p>
            <button id="removeButton">Remove</button>
        </div>
        </>
    )
}

export default PlaylistTrack;