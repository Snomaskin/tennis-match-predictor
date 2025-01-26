import { ValidationUtils, RateLimiter } from './inputUtils.js';
import { CONFIG } from './config.js';


export default function handleSubmit(inputs, endpoint) {
    if (endpoint === 'predict_winner') {
        const { player1, player2, court_surface } = inputs;
        return predictWinner(player1, player2, court_surface)
    } else if (endpoint === 'lookup_stats') {
        const { player } = inputs;
        const stats = lookupPlayerStats(player)
        return stats
    }
}

/**
 * @param {string} player1 
 * @param {string} player2 
 * @param {string} courtSurface 
 */
function predictWinner(player1, player2, courtSurface) {
    try {    
        const formData = {
            player1: ValidationUtils.formatPlayerName(player1, "player1", "Player 1"),
            player2: ValidationUtils.formatPlayerName(player2, "player2", "Player 2"),
            court_surface: courtSurface
        };
        const jsonData = JSON.stringify(formData);
        const returnString = fetchData(CONFIG.ENDPOINTS.WINNER_PREDICTION, jsonData)

        return returnString
        .catch((serverError) => {
            console.log(`Server Error: ${serverError}`);
            return serverError.message;
        });
        } catch (clientError) {
            console.log(`Client Error: ${clientError}`);
            return clientError.message;
        }
}

/**
 * 
 * @param {string} player - "LastName FirstInitial." format
 */
function lookupPlayerStats(player) {
    try {
    const formData = {
        player: ValidationUtils.formatPlayerName(player, "player", "Player")
    };
    const jsonData = JSON.stringify(formData);
    const returnString = fetchData(CONFIG.ENDPOINTS.LOOKUP_STATS, jsonData)
        
    return returnString
    .catch((serverError) => {
        console.log(`Server Error: ${serverError}`);
        return serverError.message;
    });
    } catch (clientError) {
        console.log(`Client Error: ${clientError}`);
        return clientError.message;
    }
}

/**
 * @param {string} endpoint 
 * @param {string} formData 
 * @returns {Promise<string>} 
 * @throws {Error} serverError
 */
const cache = new Map();
async function fetchData(endpoint, formData) {
    const cacheKey = endpoint + formData;

    if (cache.has(cacheKey)) {
        return Promise.resolve(cache.get(cacheKey));
    }
    try {
        RateLimiter.checkLimit(endpoint);
        const response = await fetch(CONFIG.API.BASE_URL + endpoint, {
            ...CONFIG.FETCH_OPTIONS,
            body: formData,
        });
        return await handleResponse(response, cacheKey);
    } catch (error) {
        console.log(`Client Error: ${error}`);
        throw error;
    }
}

async function handleResponse(response, cacheKey) {
    if (response.status === 200) {
        const returnString = await response.text();
        cache.set(cacheKey, returnString);
        return returnString;
    } else {
        const invalidResponse = await response.text();
        const errorMessage = JSON.parse(invalidResponse).detail;
        const serverError = new Error(errorMessage);
        serverError.isServerError = true;
        throw serverError;
        };
}