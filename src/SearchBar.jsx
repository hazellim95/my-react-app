import { useState } from 'react';
import './SearchBar.css';
import SearchResults from './SearchResults.jsx';


function SearchBar() {
    const [userInput, setUserInput] = useState('');
    function handleUserInput(e) {
        setUserInput(e.target.value);
    }

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
                    <button id="searchButton" onClick={() => alert(`You entered: ${userInput}`)}>Search</button>
                </div>
            </div>
            <SearchResults receivedText={userInput} />
        </>
    )
}

export default SearchBar;