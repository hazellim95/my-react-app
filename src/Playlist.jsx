import { useState } from 'react';
import PlaylistTrack from './PlaylistTrack.jsx'
import './Playlist.css';

function Playlist(props) {
    let selectedSongs = props.selectedSongs;
    let setSelectedSongs = props.setSelectedSongs;

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
            const token = 'BQBZtIukaU0myPs97AYBXGvVSPcqVY9YTQSWGLuYIvFXo9qY3Hk3ddSg28GWDrRpzwK0UiwwfcryDTgZDHnfkd17hoKLDHvG_W59jrSVEZsqhQP015kALw0Qsp5S2bwk3xisB3cNHoKHDPBtqbQT0sh9bdmxH554Jm7E7Rkx1hcQzu-3OcK9zJEaw7bun3_aY6S2pasFf0_5xWnd00I5SCSPNz-5cZxqlwrDD1MA2IAxQWYs7Mi1-l0oDTsrFQ2T82YN5CeKtr_jpc7HS3bYuXLUWaE6yqVPnyuOnMNy';

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
                    {selectedSongs.map(({trackName, artists, album, id, uri}, index) => (
                        <li key={index}>
                            <PlaylistTrack 
                                trackName={trackName} 
                                artists={artists} 
                                album={album}
                                id={id} 
                                uri={uri}
                                selectedSongs={selectedSongs}
                                setSelectedSongs={setSelectedSongs}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handleClick}>Save to Spotify</button>
        </>
    );
}

export default Playlist;