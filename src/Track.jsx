import { useState } from 'react';

function Track(props) {
    const trackName = props.trackName;
    const [selected, setSelected] = useState(null);
    
    function handleClick() {
        setSelected(true);
        console.log(`${trackName} Selected: ${selected}`);
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

export default Track;
