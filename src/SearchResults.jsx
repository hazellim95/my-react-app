import { useState, useEffect } from 'react';
import './SearchResults.css';
import Tracklist from './Tracklist.jsx'
import Playlist from './Playlist.jsx'

function SearchResults(props) {
    const receivedText = props.receivedText;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('https://api.spotify.com');
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, []); // Empty dependency array means this runs once on mount

    


    if (loading) return <p>Loading data...</p>
    if (error) return (
        <>
            <p>Search results:</p>
            <div id="container">
                <p>Error: {error.message}</p>
            </div>
        </>
    )

    return (
        <>
            <p>Search results:</p>
            <div id="container">
                <h1>Fetched Data:</h1>
                {/* Render your data here */}
                <pre>{JSON.stringify(data, null, 2)}</pre>
                <div id="searchResults">
                    <Tracklist receivedText={receivedText}/>
                </div>
                <div id="playlist">
                    <Playlist />
                </div>
            </div>
        </>
    )
}

export default SearchResults;