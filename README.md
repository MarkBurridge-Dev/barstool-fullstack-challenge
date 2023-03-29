# Mark Burridge: Boxscore Challenge
* Phone Number: 570-332-5672
* Email: markburridge1731@gmail.com or markburridgedev@gmail.com
* LinkedIn: https://www.linkedin.com/in/mark-burridge-2b1ab8183/
## Table of contents
  * [Set up](#set-up)
  * [API](#api)
  * [Client](#client)
# Set up 
  * From the root directory, run `npm run package:install `. This will install all the necessary dependencies for the project. 
  * Start local mongoDb server and get host url. Example: `mongodb://127.0.0.1:27017`. 
  * cd into the client directory: ` cd client/fsc_client/`. 
  * From the `fsc_client` directory run: `npm run hopeFullyThisWorks -- -- [your mongoDb host url]` to start the project. This cmd will connect to a mongoDb istance with the provided url, start the api, and then start the web app. 

# API
This api was built using `node.js` and `express.js` which will be hosted at `localhost:3001`; 
### Endpoints
This api will have the following endpoints. 
* `http://localhost:3001/gameFeeds/nbaFeed`: This endpoint will return an NBA feed either from a mongoDb cache or a network call to the barstool api. If the feed has been in the cache longer then 15 seconds, it will be refreshed with the next network call. 
* `http://localhost:3001/gameFeeds/mlbFeed`: This endpoint will return an MLB feed either from a mongoDb cache or a network call to the barstool api. If the feed has been in the cache longer then 15 seconds, it will be refreshed with the next network call.
## Logs
In the termainal that the app was started in, you will be able to see which type of retrevial happened. Example: 
<img width="844" alt="image" src="https://user-images.githubusercontent.com/129324306/228647212-78c99da2-7446-4332-82b7-ffee9c2664ba.png">


# Client 
This client was built using `react.js` and lightly styles with `MaterialUi`. 

## Client Endpoints




