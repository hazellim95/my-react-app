import { useState } from 'react';

function Track(props) {
    const trackName = props.trackName;
    
    function handleClick() {
        alert(`${trackName} clicked!`)

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