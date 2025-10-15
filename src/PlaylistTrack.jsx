import { useState } from 'react';

function PlaylistTrack(props) {
    const trackName = props.trackName;
    const artists = props.artists;
    const album = props.album;
    const id = props.id;
    const uri = props.uri;

    return (
        <>
            <p>{trackName} by {artists}, {album}</p>
            <button>Remove</button>
        </>
    )
}

export default PlaylistTrack;