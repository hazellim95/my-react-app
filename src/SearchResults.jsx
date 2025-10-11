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

        const token = 'BQD6FfvYATLv7PlJtHfKOq8WhcHf7CL_dQhkx3AjBipjDs1Zca2fXGq3Gnw5ZTiH9gH2M3oJLaJWMelZRmR7QIX3SVkMrNawpOkDliH1rd5cXq9zhELQGwxSH9XK7KD6XsqG_cav-RdBc9IBkTxxz25tlE7GHFN7-5CvwH2lO6Vh-bZh58KmFNfE32-4n12w4XmzA9l-Ndrp6exzF-VPVuxCv5z3mxkIfkNTNW6libxbpryojceTM_gsQWnl1wSwDOt4RJP2rpFfxrKe-ERup7NNHM6F4n5w_FyEecr6';

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
            
            
            let endPoint = 'v1/search?q=remaster%2520track%3A' + receivedText + '&type=track';

            const response = await fetchWebApi(endPoint, 'GET');

            // const response = await fetchWebApi(
            //         'v1/search?q=remaster%2520track%3ATaylorSwift&type=track', 'GET')
            

            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            
            console.log(typeof result);
            console.log(result.tracks.items);

            // const resultList = result.items?.map(
            //         ({name, artists}) =>
            //         `${name} by ${artists.map(artist => artist.name).join(', ')}`
            //     )

            const resultList = result.tracks.items?.map(
                    ({name, artists, album}) =>
                    `${name} by ${artists.map(artist => artist.name).join(', ')}, from the album ${album.name}`
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