import { useState } from 'react';
import './PlaylistTrack.css'

function PlaylistTrack(props) {
    const trackName = props.trackName;
    const artists = props.artists;
    const album = props.album;
    const id = props.id;
    const uri = props.uri;
    const selectedSongs = props.selectedSongs;
    const setSelectedSongs = props.setSelectedSongs;

    function handleRemove(trackName, id) {
        if(selectedSongs.some(obj => obj.id === id)) {
            console.log(`Remove this song with id ${id}`);
            const filteredSongs = selectedSongs.filter(
                (obj) => obj.id !== id
            );
            console.log(`filteredSongs = ${filteredSongs}`);
            setSelectedSongs(filteredSongs);
        }
        
    }

    return (
        <>
        <div id="container1">
            <p>{trackName} by {artists}, {album}</p>
            <button id="removeButton" onClick={() => handleRemove(trackName, id)}>Remove</button>
        </div>
        </>
    )
}

export default PlaylistTrack;