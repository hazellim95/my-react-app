import { useState } from 'react';
import PlaylistTrack from './PlaylistTrack.jsx'
import './Playlist.css';

function Playlist(props) {
    let selectedSongs = props.selectedSongs;
    let setSelectedSongs = props.setSelectedSongs;
    // console.log(`selectedSongs: ${selectedSongs}`)

    // Create state for playlistName
    const [userInput, setUserInput] = useState('');

    // Create state for POST request
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleUserInput(e) {
        setUserInput(e.target.value);
    }

    function handleClick() {

        // if playlistName is not empty, save to Spotify
        if (userInput) {
            const token = 'BQBV6RZ-4xG1tLMbARfPXBwm3T5gfkViZ0xuYbAh6kiXF_IiffMKQMF7EbzT4u9Ud49zp16C39IQ2HepDtoa4NkeCg4CuO91VCggYDgZUOlVrYDSGXf2DzK-obGB_La5njhdJ_deekYm54jwMw8ys6C-exjyJ7jDUa1A0vpT3RpbrzbZJheVErpuk-CQBbxiIGycjLGXE3KdwtjolMMPvTLFd61LDlvC8vM1umGPGYFxteZJ03jlVYkAM5coJVsr5AHJ-EHMJcpk4CNyYnwFdVSAQhHmX3Mg7t7hFPlQ';

            const fetchData = async () => {
            
                try {

                    async function fetchWebApi(endpoint, method, body) {
                        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
                            headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            },
                            method,
                            body:JSON.stringify(body)
                        });
                        //return await res.json();
                        return res;
                    }

                    
                    let endPoint = 'v1/users/hazelll95/playlists';

                    const response = await fetchWebApi(endPoint, 'POST', { title: 'CreatePlaylistTest' });

                    // const response = await fetchWebApi(
                    //         'v1/search?q=remaster%2520track%3ATaylorSwift&type=track', 'GET')
                    

                    if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const result = await response.json();
                    
                    console.log(typeof result);
                    console.log(`result: ${result}`);

                    // const resultList = result.items?.map(
                    //         ({name, artists}) =>
                    //         `${name} by ${artists.map(artist => artist.name).join(', ')}`
                    //     )


                    setData(result);
                } catch (error) {
                setError(error);
                } finally {
                    setLoading(false);
                } 

            }

            fetchData();
        } else {
            alert('Enter a playlist name.');
        }
        
    } // End of function handleClick

    return (
        <>
            <h2>My Playlist</h2>
            <label for="playlistName">Name: </label>
            <input 
                type="text" 
                id="playlistName" 
                name="playlistName" 
                onChange={handleUserInput} 
                value={userInput}
            />
            <div>
                <ul>
                    {selectedSongs.map((trackName, index) => (<li key={index}><PlaylistTrack trackName={trackName}/></li>))}
                </ul>
            </div>
            <button onClick={handleClick}>Save to Spotify</button>
        </>
    );
}

export default Playlist;