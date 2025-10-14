import { useState } from 'react';
import Playlist from './Playlist.jsx';

let selectedSongs = [''];

function Track(props) {
    const trackName = props.trackName;
    const [selected, setSelected] = useState(null);
    
    const handleClick = () => {
        setSelected(true);
        selectedSongs.push(trackName)
        console.log(`${trackName} Selected: ${selected}`);
        console.log(`Selected Songs: ${selectedSongs}`);
        // alert(`${trackName} clicked: ${selected}`);
    }

    return (
        <>
            <div>
                <p>{trackName}</p>
                <button onClick={handleClick}>Select</button>
            </div>
            
        </>
    )
}

export { Track, selectedSongs } ;
