import { useState } from 'react';

import PlaylistTrack from './PlaylistTrack.jsx'

function Playlist(props) {
    // Retrieve selected songs from the search results
    const selectedSongs = ['Selected Song 1', 'Selected Song 2', 'Selected Song 3'];


    return (
        <>
            <h2>My Playlist</h2>
            <div>
                <ul>
                    {selectedSongs.map((trackName, index) => (<li key={index}><PlaylistTrack trackName={trackName}/></li>))}
                </ul>
            </div>
        </>
    );
}

export default Playlist;