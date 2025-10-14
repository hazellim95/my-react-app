import { useState } from 'react';
import './SearchBar.css';
import SearchResults from './SearchResults.jsx';


function SearchBar() {
    const [userInput, setUserInput] = useState('');

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleUserInput(e) {
        setUserInput(e.target.value);
    }

    function handleClick() {
        // alert(`You entered: ${userInput}`);
      // You can now use inputValue for further processing,
      // like sending it to an API, updating other parts of the state, etc.
        const token = 'BQDW73Xv03xzAG6O9spxd_PS_MZLuhiTVnnL2aSii9cHRsABu01sZRJy-QB-Y_0L0kOLKxWRWKy6w08uenb_zV8c30P4LtvDz7mR56QFsYzvZj8IyEJAsp0CtbvRCJYWQu-Z_uTHx7aFqW6Zsnjk53Q7go0vo4PNtZeA1t0UIxUg4F6jf3Hnw66vcITMKGOOS6ZacMa4F2JR4rIX8c06U0cu9M1P8VNCnj387kpgAlnV7nOR2UgTmTN1RGUB2PTfqOC5gsnr9igLPcs2caHx4wyMXHD0a-YVNPRQNd7y';

        // Fetch search results from Spotify API
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

            
            let endPoint = 'v1/search?q=remaster%2520track%3A' + userInput + '&type=track';

            const response = await fetchWebApi(endPoint, 'GET');

            // const response = await fetchWebApi(
            //         'v1/search?q=remaster%2520track%3ATaylorSwift&type=track', 'GET')
            

            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            
            console.log(typeof result);
            console.log(`result: ${result.tracks.items}`);

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
    //end of function handleClick
    }


    // if (loading) return <p>Loading data...</p>
    // if (error) return (
    //     <>
    //         <div id="container">
    //             <p>Error: {error.message}</p>
    //         </div>
    //     </>
    // )

    return (
        <>
            <div>
                <p>Search for your favourite songs:</p>
                <input 
                    id="searchBar" 
                    type="text" 
                    onChange={handleUserInput} 
                    value={userInput}
                />
                <div>
                    <button id="searchButton" onClick={handleClick}>Search</button>
                </div>
            </div>
            <SearchResults receivedText={userInput} receivedData={data} loading={loading} error={error}/>
        </>
    )
}

export default SearchBar;