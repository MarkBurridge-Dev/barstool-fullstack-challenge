import axios from 'axios';
import { GameFeed } from "../models/GameFeed_model.js";
import { LEAGUE_IDS } from "../utils/leagueConfig.js";

/**
 * Function to return a game feed based on the provided League ID.
 * If there is no game feed cached, it will make a network call and warm the cache. 
 * If there is a cached gameFeed and its been under 15 seconds,  it will return from the cache
 * If the cahce is stale, it will get a new feed and refresh the cache. 
 * @param {*} leagueId the leage id. 
 * @returns the game feed. 
 */
export async function  getGameFeedByLeagueId(leagueId){
    let data = await GameFeed.findOne({League: leagueId}).exec();
    let currentTime = Math.round(Date.now() / 1000);

    //Warm the empty cache 
    if(!data || Object.keys(data).length == 0){ 
        let feed = leagueId == LEAGUE_IDS.NBA ? await requestNbaFeed() : leagueId == LEAGUE_IDS.MLB ? await requestMlbFeed() : undefined;
        if(feed.data){
            let newGameFeed = {League: leagueId, GameData: feed.data, TimeRetrieved: Math.round(Date.now() / 1000)};  
            await GameFeed.create(newGameFeed);
            console.log("Creating new entry");
            return newGameFeed.GameData; 
        }else{
            throw new Error("Invalid League ID"); 
        }
    }else if((currentTime - data.TimeRetrieved) <= 15){
        //Use cached obj
        console.log("Hitting cache"); 
        return data.GameData;
    }else{
        //refresh cache
        let feed = leagueId == LEAGUE_IDS.NBA ? await requestNbaFeed() : leagueId == LEAGUE_IDS.MLB ? await requestMlbFeed() : undefined; 
        console.log("Made Network Request");  
        await GameFeed.findByIdAndUpdate(data._id, {GameData: feed.data, TimeRetrieved: Math.round(Date.now() / 1000)});
        return feed.data;
    }
}

/**
 * Function to make the network call for the NbaFeed. 
 * @returns 
 */
export async function requestNbaFeed(){
    return await axios.get('http://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json');
}

/**
 * Function to make the network call for the MlbFeed. 
 * @returns 
 */
export async function requestMlbFeed(){
    return await axios.get('https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json');
}