import { useState } from 'react';

import PlaylistTrack from './PlaylistTrack.jsx'
//import { Track, selectedSongs } from './Track.jsx'

function Playlist(props) {
    let selectedSongs = props.selectedSongs;
    let setSelectedSongs = props.setSelectedSongs;
    console.log(`selectedSongs: ${selectedSongs}`)

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