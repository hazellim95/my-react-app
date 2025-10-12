import { useState } from 'react';

function Playlist() {
    const selectedSongs = ['Selected Song 1', 'Selected Song 2', 'Selected Song 3'];

    return (
        <>
            <h2>My Playlist</h2>
            <div>
                <ul>
                    {selectedSongs.map((trackName, index) => (<li key={index}>{trackName}</li>))}
                </ul>
            </div>
        </>
    );
}

export default Playlist;