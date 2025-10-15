import { useState } from 'react';
import Playlist from './Playlist.jsx';

function Track(props) {
    const trackName = props.trackName;
    const artists = props.artists;
    const album = props.album;
    const id = props.id;
    const uri = props.uri; 

    const selectedSongs= props.selectedSongs;
    const setSelectedSongs= props.setSelectedSongs;

    // TODO: Change format of selectedSongs to become a list of objects, with each object containing 3 attributes: trackName, id and uri
    const handleSelect = (selectedSongs, trackName, artists, album, id, uri) => {
        if (!selectedSongs.some(obj => obj.id === id)) {
            
            // Create new track object to push
            const selectedSong = {'trackName': trackName, 'artists': artists, 'album': album, 'id': id, 'uri': uri};
            // setSelectedSongs
            setSelectedSongs((prevItems) => [...prevItems, selectedSong]);
            console.log(`${trackName} pushed to selectedSongs`);
            console.log(`Selected Songs: ${selectedSongs}`);
        }

        // if (!selectedSongs.includes(trackName)) {
        //     setSelectedSongs((prevItems) => [...prevItems, trackName]);
        //     console.log(`${trackName} pushed to selectedSongs`);
        //     console.log(`Selected Songs: ${selectedSongs}`);
        // }
    }

    return (
        <>
            <div>
                <p>{trackName} by {artists}, {album}</p>
                <button onClick={() => handleSelect(selectedSongs, trackName, artists, album, id, uri)}>Select</button>
            </div>
            
        </>
    )
}

export default Track;
