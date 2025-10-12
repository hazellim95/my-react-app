import { useState } from 'react';

function PlaylistTrack(props) {
    const trackName = props.trackName
    return (
        <>
            <p>{trackName} - I am a selected Playlist track</p>
        </>
    )
}

export default PlaylistTrack;