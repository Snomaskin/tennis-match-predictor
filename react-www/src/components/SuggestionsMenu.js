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
            const matches = (playersDb.length > 0 && searchTerm.length >= 2) 
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

function matchPlayers(searchTerm, playerData) {
    const match = playerData.filter(player => 
        player.searchName.startsWith(searchTerm.toLowerCase()) // searchName is lowercase for case-insensitive search
    ).slice(0,5); // Find first 5 matching players
    return match
}
