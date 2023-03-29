import { Router } from 'express';
import GameFeedEndpoints from './controllers/gameFeeds.js'; 
let apiRouter = Router(); 

apiRouter.use('/gameFeeds', GameFeedEndpoints); 

export default apiRouter; 


