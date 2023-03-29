import express from 'express';
import { connectToFullStackChallengeDb } from './database/fullstackChallenge_db_connector.js';
import API_ROUTER from './apiRoutes.js'; 
import cors from 'cors'; 

connectToFullStackChallengeDb(process.argv[2]); 
const app = express();
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', API_ROUTER); 

app.listen(3001, () => console.log('Server started'))