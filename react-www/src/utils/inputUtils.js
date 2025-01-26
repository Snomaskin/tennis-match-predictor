import { CONFIG } from './config.js';
import playerIndexCsv from '../assets/player_index_df.csv'


export const DataUtils = {
    /**
     * @returns {Promise<Array<Object>>}
     */
    async loadCsvData() {
        try {
            const fetchCSV = await fetch(playerIndexCsv);
            const csvData = await fetchCSV.text();
            return this.parseCsvToJson(csvData);
        } catch (error) {
            console.error('Error loading player data:', error);
            return null;
        }
    },

    /**
     * @param {string} csvData
     * @returns {Array<Object>}
     */
    parseCsvToJson(csvData) {
        const rows = csvData.trim().split('\n');
        return rows.slice(1).map(row => { // Skip the first row (header)
            const [Player, Index, TotalWins] = row.split(',').map(item => item.trim());
            // 'searchName' for lookup and 'Player' for display:
            return {
                Player,
                Index: parseInt(Index),
                TotalWins: parseInt(TotalWins),
                searchName: Player.toLowerCase()
            }
        });
    }
}

export const ValidationUtils = {
    /**
     * Formats a player's name as "LastName FirstInitial."
     * @param {string} name 
     * @param {string} inputFieldId 
     * @param {string} displayString 
     * @returns {string} formattedPlayerName
     * @throws {Error} clientError
     */
    formatPlayerName(name, inputFieldId, displayString) {
        const isValid = this.canFormatAsPlayerName(name);
        this.executeValidationCallback(isValid, inputFieldId, displayString);

        return name.trim().split(' ')
            .map((part, index, arr) => {
                // Format FirstInitial.
                if (index === arr.length -1) {
                    return part.charAt(0).toUpperCase() + '.';
                }
                // Format LastName.
                return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
            })
            .join(' ');
    },

    /**
     * 
     * @param {string} name 
     * @returns {boolean} isValid
     */
    canFormatAsPlayerName(name) {
        return  name.trim().length >= 3 &&
                name.includes(' ') && 
                CONFIG.VALIDATION.NAME_REGEX.test(name);
    },
}

export const RateLimiter = {
    requests: {}, // Endpoint -> [timestamp]
    maxRequests: 10,      
    timeWindow: 60000,   
    
    checkLimit(endpoint) {
        const now = Date.now();
        const recentRequests = this.requests[endpoint] || [];
        
        // Remove old requests
        const validRequests = recentRequests.filter(
            timeStamp => now - timeStamp < this.timeWindow
        );
        
        if (validRequests.length >= this.maxRequests) {
            throw new Error('Too many requests. Please wait before trying again.');
        }

        validRequests.push(now);
        this.requests[endpoint] = validRequests;
    }
};