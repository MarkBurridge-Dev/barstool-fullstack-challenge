import React, { useEffect, useState } from "react";
import {requestFeed} from '../adapters/fullStackApiAdapter.js'; 
import ScoreTable from "./boxscore.js";

function NbaFeedWrapper(props) { 
  const leagueId = "NBA"; 
  
  const [gameFeed, setGamefeed] = useState([]);

  async function fetchData(leagueId) {
    try {
      const response = await requestFeed(leagueId); 
      setGamefeed(response.data.gameFeed)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData(leagueId);
  },[])

  if(gameFeed && !Array.isArray(gameFeed)){
    return (
      <ScoreTable apiResult={gameFeed} />
      );
  }else{
    return <div>waiting..</div>
  }

}

export default NbaFeedWrapper;