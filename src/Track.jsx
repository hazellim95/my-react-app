import { useState } from 'react';

function Track(props) {
    const trackName = props.trackName;
    return (
        <>
            <div>
                <p>{trackName}</p>
                <button>Select</button>
            </div>
        </>
    )
}

export default Track;