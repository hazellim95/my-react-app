import { useState } from 'react';

function PlaylistTrack(props) {
    const trackName = props.trackName
    return (
        <>
            <p>{trackName}</p>
        </>
    )
}

export default PlaylistTrack;