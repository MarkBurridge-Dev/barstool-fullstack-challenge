import mongoose from 'mongoose';

/**
 * Function to connect to a local mongoDd instance. 
 * @param {connectionString} connectionString the provided mongodB url
 */
export function connectToFullStackChallengeDb(connectionString){
    if(connectionString.charAt(connectionString.length-1) === '/'){
        connectionString = connectionString.substr( 0, connectionString.length -1 );
    }
    mongoose.connect(connectionString + "/fullstack-challenge", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }); 
}