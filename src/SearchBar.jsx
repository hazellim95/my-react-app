import { useState } from 'react';
import './SearchBar.css';


function SearchBar() {
    return (
        <>
            <div>
                <p>Search for your favourite songs:</p>
                <input id="searchBar" type="text"></input>
                <div>
                    <button id="searchButton">Search</button>
                </div>
            </div>
        </>
    )
}

export default SearchBar;