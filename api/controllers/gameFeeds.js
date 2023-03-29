import express from 'express';
import { getGameFeedByLeagueId } from '../Adapters/gameFeedsAdapter.js';
import { LEAGUE_IDS } from '../utils/leagueConfig.js';
import { asyncRequestWrapper } from '../utils/utils.js';
const GameFeedController = express.Router(); 

/**Home controller */
GameFeedController.get('/', async (req, res) => {
    res.json({
        message: 'default route.'
    });
});

/** Nba Feed controller */
GameFeedController.get('/nbaFeed', asyncRequestWrapper(async (req, res) => {
    const gameFeed = await getGameFeedByLeagueId(LEAGUE_IDS.NBA); 
    res.send({gameFeed: gameFeed});
})); 

/** MLB feed controller */
GameFeedController.get('/mlbFeed', asyncRequestWrapper(async (req, res) => {
    const gameFeed = await getGameFeedByLeagueId(LEAGUE_IDS.MLB); 
    res.send({gameFeed: gameFeed});
})); 

export default GameFeedController; 