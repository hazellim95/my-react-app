import { useState } from 'react';
import Playlist from './Playlist.jsx';

function Track(props) {
    const trackName = props.trackName;
    const selectedSongs= props.selectedSongs;
    const setSelectedSongs= props.setSelectedSongs;

    const handleSelect = (selectedSongs, trackName) => {
        // let copyArray = [...selectedSongs];
        // copyArray.push(trackName);
        // selectedSongs.push(trackName);  
        setSelectedSongs((prevItems) => [...prevItems, trackName]);
        console.log(`${trackName} pushed to selectedSongs`);
        console.log(`Selected Songs: ${selectedSongs}`);
        alert('Clicked')
        // console.log(`${trackName} Selected: ${selected}`);
        // console.log(`Selected Songs: ${selectedSongs}`);
        // alert(`${trackName} clicked: ${selected}`);
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
