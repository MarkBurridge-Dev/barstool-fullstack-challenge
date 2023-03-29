import axios from "axios";
const NBA_URL = 'http://localhost:3001/gameFeeds/nbaFeed';
const MLB_URL = 'http://localhost:3001/gameFeeds/mlbFeed';

export async function requestFeed(leagueId) {
    try {
        const url = leagueId == "NBA" ? NBA_URL : leagueId == "MLB" ? MLB_URL : undefined;
        console.log(url); 
        const response = await axios.get(url)
        return response
    } catch (error) {
        console.error(error);
    }
}
