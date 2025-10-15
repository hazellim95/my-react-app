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
        const token = 'BQCiiD61yPq2lU-esgmsqVNSx1qwN2EkAI-YRpaqmuAXmyUSf4qsXFYc-x36_xU4P5gJJ4G5QR76Z1Q0fiNlpPFQaaN7VCHqV8o1dMV2j97ygG08q7GIkWs_fon4fFIVmdEacT1-zpq9-3y7uvdoFFO5L--ERzaiRYjytHk8HUaSIUaRKuDBhl2cMSpMYGx3zAPubh54IKZ08KGWSdJEUnferM-4NuNlaLGLAjavFicfcEkjAmncgR_2WewwL3hZ9RHUNynqaQ0MdOIVui5iicjK6Roc3En2wTmXJMlQ';

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
            console.log(result.tracks)


            // const resultList = result.items?.map(
            //         ({name, artists}) =>
            //         `${name} by ${artists.map(artist => artist.name).join(', ')}`
            //     )

            // const resultList = result.tracks.items?.map(
            //         ({name, artists, album, id, uri}) =>
            //         `${name} by ${artists.map(artist => artist.name).join(', ')}, from the album ${album.name}; id: ${id}; uri: ${uri}`
            //     )

            const resultList = result.tracks.items?.map(
                    ({name, artists, album, id, uri}) => [name, artists.map(artist => artist.name).join(', '), album.name, id, uri]
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