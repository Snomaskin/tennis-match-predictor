import './styles/SuggestionsMenu.css'
import { DataUtils } from '../utils/inputUtils';
import { useState, useEffect } from 'react';

export default function SuggestionsMenu({ searchTerm, inputField, setInputFn }) {
    const [playersDb, setPlayersDb] = useState([]);
    const [matchingPlayers, setMatchingPlayers] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(true);
    
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await DataUtils.loadCsvData();
                setPlayersDb(data);
            } catch (error) {
                console.error('Error loading player data:', error);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        const updateMatches =  () => {
            const matches = (playersDb.length > 0 && searchTerm.length > 2) 
            ? matchPlayers(searchTerm, playersDb) 
            : [];
            setMatchingPlayers(matches)
        };
        
        updateMatches()
    }, [searchTerm, playersDb])

    const handleChange = (player) => {
        const playerName = player.Player;
        setInputFn(inputField, playerName);
        setShowSuggestions(false);
    }

    return matchingPlayers.length > 0 && showSuggestions ? (
    <>       
        <ul className='suggestions-list'>
            {matchingPlayers.map((player) =>            
                <li 
                    key={player.Player}
                    className='suggestions-item'
                    onClick={() => handleChange(player)}
                >
                    <div className='player-name'>
                        {player.Player} <br />
                        Wins: {player.TotalWins}
                    </div>
                </li>
            )}
        </ul>
    </>
    ): null;
}


/**
 * Sets up the auto-lookup functionality for a given input field.
 * @param {HTMLInputElement} inputField - The input field to monitor for changes
 * @param {HTMLDivElement} suggestionsContainer - The container for displaying suggestions
 * @param {Array<Object>} playerData - An array of player objects
 */
export function setupPlayerSuggestions(inputField, suggestionsContainer, playerData) {
    inputField.addEventListener('input', () => {
        const searchTerm = inputField.value;
        if (searchTerm.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        const matchingPlayers = matchPlayers(searchTerm, playerData);
        setupSuggestionsContainer(matchingPlayers, inputField, suggestionsContainer);
        });
}

function matchPlayers(searchTerm, playerData) {
    const match = playerData.filter(player => 
        player.searchName.includes(searchTerm.toLowerCase()) // searchName is lowercase for case-insensitive search
    ).slice(0,5); // Find first 5 matching players
    return match
}

/**
 * Updates the player suggestionsContainer with matching players. 
 * @param {Array<Object>} players
 * @param {HTMLDivElement} suggestionsContainer
 * @param {HTMLInputElement} inputField
 */
function setupSuggestionsContainer(matchingPlayers, inputField, suggestionsContainer){
    if (matchingPlayers.length === 0){
        suggestionsContainer.style.display = 'none';
        return;
    }

    suggestionsContainer.innerHTML = '';
    const ul = document.createElement('ul');
    ul.className = 'suggestions-list';

    appendPlayerSuggestions(matchingPlayers, inputField, suggestionsContainer, ul);

    suggestionsContainer.appendChild(ul);
    suggestionsContainer.style.display = 'block';
}

/**
* @param {Array<Object>} players
* @param {HTMLInputElement} inputField 
* @param {HTMLElement} suggestionsContainer 
* @param {HTMLUListElement} ul 
*/
function appendPlayerSuggestions(matchingPlayers, inputField, suggestionsContainer, ul) {
    matchingPlayers.forEach(player => {
        const li = document.createElement('li');
        li.className = 'suggestions-item';
        // Use the correctly capitalized player name for display:
        li.innerHTML = `<div class="player-name">${player.Player}<br>
        Wins: ${player.TotalWins}
        </div>`;

        li.addEventListener('click', () => {
            inputField.value = player.Player; // Use the correctly capitalized player name for input
            suggestionsContainer.style.display = 'none';
            inputField.parentNode.querySelector('.clear-button').style.display = 'flex';
        });

        ul.appendChild(li);
    });
}