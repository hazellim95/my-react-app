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

        const token = 'BQDcGrxS-vEZpqv1bAezTbD7SgjdUG48z2PwPu2MzkjZ5eLhXgpLmP05SdEKCCoZLnXS5IYy-ahT4HOs6P5-xSldhDufnGeKgytpHwsVge66Jz__K_hGSUdG-0P6WGtLJKANZJim6yadlRWe-BTU0FhD4os5QnGknn-17zOgtX9zxYz-5oCQNgdaRwFF2gkrS4ClBwCj2A96DLVgwZ_wUr7qSblE5Bq7J83K4_IDOnGdBs_kBl9fXhibiUM8atGO7H0G-mzMnNQ_rPMfetsP2wHBLRlhLp9DP0bgmITZ';

        const fetchData = async () => {
        try {

             async function fetchWebApi(endpoint, method, body) {
                const res = await fetch(`https://api.spotify.com/${endpoint}`, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                    method,
                    body:JSON.stringify(body)
                });
                //return await res.json();
                return res;
            }

            // async function getTopTracks(){
            //     // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
            //     return (await fetchWebApi(
            //         'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
            //     )).items;
            // }

            //const response = await fetch('https://api.spotify.com');
            // const response = await fetchWebApi(
            //         'v1/me/top/tracks?time_range=long_term&limit=5', 'GET')
            
            // 
            const response = await fetchWebApi(
                    'v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=track', 'GET')
            

            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            
            console.log(typeof result);
            console.log(result.tracks.items);
            console.log(typeof result.items);

            // const resultList = result.items?.map(
            //         ({name, artists}) =>
            //         `${name} by ${artists.map(artist => artist.name).join(', ')}`
            //     )

            const resultList = result.tracks.items?.map(
                    ({name, artists}) =>
                    `${name} by ${artists.map(artist => artist.name).join(', ')}`
                )


            console.log(resultList)


            setData(resultList);
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
                <div id="searchResults">
                    <Tracklist receivedText={receivedText} receivedData={data}/>
                </div>
                <div id="playlist">
                    <Playlist />
                </div>
            </div>
        </>
    )
}

export default SearchResults;