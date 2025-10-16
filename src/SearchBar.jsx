import { useState } from 'react';
import './SearchBar.css';
import SearchResults from './SearchResults.jsx';

const clientId = '77a4e36a7c0842b4b3c053d5503448fb';
const redirectUri = 'https://example.com/callback';

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const codeVerifier  = generateRandomString(64);
console.log(`codeVerifier: ${codeVerifier}`)

const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return await window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const hashed = await sha256(codeVerifier);
console.log(`hashed: ${hashed}`);
const codeChallenge = base64encode(hashed);

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

function requestUserAuth() {
    //generated in the previous step
    window.localStorage.setItem('code_verifier', codeVerifier);

    const params =  {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
}

const getToken = async code => {

    // stored in the previous step
    codeVerifier = localStorage.getItem('code_verifier');

    const url = "https://accounts.spotify.com/api/token";
    const payload = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
        }),
    }

    const body = await fetch(url, payload);
    const response = await body.json();
    console.log(`response: ${response}`);

    localStorage.setItem('access_token', response.access_token);
    console.log(`response.access_token: ${response.access_token}`);

    return response.access_token;
}   


function SearchBar() {
    const [userInput, setUserInput] = useState('');

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleUserInput(e) {
        setUserInput(e.target.value);
    }

    function handleClick() {
        

        // Fetch search results from Spotify API
        const fetchData = async () => {
        try {
             // Request User Authorisation
            requestUserAuth();
            const urlParams = new URLSearchParams(window.location.search);
            let code = urlParams.get('code');
            // Request for access token
            const token = getToken(code);         //const token = 'BQBZtIukaU0myPs97AYBXGvVSPcqVY9YTQSWGLuYIvFXo9qY3Hk3ddSg28GWDrRpzwK0UiwwfcryDTgZDHnfkd17hoKLDHvG_W59jrSVEZsqhQP015kALw0Qsp5S2bwk3xisB3cNHoKHDPBtqbQT0sh9bdmxH554Jm7E7Rkx1hcQzu-3OcK9zJEaw7bun3_aY6S2pasFf0_5xWnd00I5SCSPNz-5cZxqlwrDD1MA2IAxQWYs7Mi1-l0oDTsrFQ2T82YN5CeKtr_jpc7HS3bYuXLUWaE6yqVPnyuOnMNy';
            console.log(`token: ${token}`);  




            
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