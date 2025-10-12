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
        const token = 'BQBntXtK2QW_QvR-gjorrBIFlkILBe2H9XPn3OE06EHkXN9B_uuzpZR9ld0Hp30uU8gJqimDwufsjh_poyaGxnAbheep1Ju18pG8ZvmxX2HuZhtZrPO9HuBn4KRz3C56uJcDHtmyJe-TBBtU9v09LTz6T_x6fmj7tk_-GILSQABnp8bDp5NJWIOF2ejt7im-908TIDe1ru908PzzROGg-Ixfp2Hil7ILsuxG5ir8SYN9qw8Ai2cLKT2dzt6ArUJiISBqYwKyWBOyVWIlhZTVpn9KwxnBSB5HEj9xGLo7';

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
                >
                </input>
                <div>
                    <button id="searchButton" onClick={handleClick}>Search</button>
                </div>
            </div>
            <SearchResults receivedText={userInput} receivedData={data} loading={loading} error={error}/>
        </>
    )
}

export default SearchBar;