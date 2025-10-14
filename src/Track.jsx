import { useState } from 'react';
import Playlist from './Playlist.jsx';

function Track(props) {
    const trackName = props.trackName;
    const selectedSongs= props.selectedSongs;
    const setSelectedSongs= props.setSelectedSongs;

    const handleSelect = (selectedSongs, trackName) => {
        if (!selectedSongs.includes(trackName)) {
            setSelectedSongs((prevItems) => [...prevItems, trackName]);
            console.log(`${trackName} pushed to selectedSongs`);
            console.log(`Selected Songs: ${selectedSongs}`);
            alert('Clicked')
        }
    }

    return (
        <>
            <div>
                <p>{trackName}</p>
                <button onClick={() => handleSelect(selectedSongs, trackName)}>Select</button>
            </div>
            
        </>
    )
}

export default Track;
