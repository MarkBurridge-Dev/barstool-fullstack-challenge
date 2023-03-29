import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';

import '../styles/boxscore.css';

function ScoreTable(props) {
    const { apiResult } = props;

    const boxscore = (
        <div>
            <Paper className="paper">
                {generateHeader(apiResult)}
                <div className="tableDiv">
                    <Table padding="none" align='center' className="table">
                        <TableHead>
                            {generateTableHeadder(apiResult)}
                        </TableHead>
                        <TableBody>
                            {returnRows(apiResult)}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
            <Button className="button" onClick={refresh} variant="outlined" startIcon={<RefreshIcon />}>Refresh</Button>
        </div>
    );

    return (
        <div>
            {boxscore}
        </div>
    );
}

/**
 * Function to refresh the page. 
 */
function refresh() {
    window.location.reload(true);
}

/**
 * Function to generate the top section of the box score that displays the team names and the state 
 * of the game
 * @param {*} apiResult the api result
 * @returns the component html
 */
function generateHeader(apiResult) {
    let awayTeamName = apiResult.away_team.full_name;
    let homeTeamName = apiResult.home_team.full_name

    let status = apiResult.event_information.status === 'completed' ? "final" : apiResult.event_information.status;

    return <Grid>
        <Grid className="HeaderGrid" item xs={12}>
            <div>{awayTeamName}</div>
            <div>@</div>
            <div>{homeTeamName}</div>
            <div>{status}</div>
        </Grid>
    </Grid>
}

/**
 * Generates the first row in the boscore table based on the leagueID. 
 * @param {*} apiResult the api result 
 * @returns the top row of the boxscore
 */
function generateTableHeadder(apiResult) {
    let header = [];
    let numberOfCells = apiResult.away_period_scores.length;
    let league = apiResult.league

    header.push(<TableCell key={"blank"} className="cell shaded"></TableCell>)

    for (let i = 0; i < numberOfCells; i++) {
        header.push(<TableCell key={i} className="cell">{i + 1}</TableCell>);
    }

    if (league === "MLB") {
        header.push(<TableCell key={"R"} className="cell shaded">R</TableCell>);
        header.push(<TableCell key={"H"} className="cell shaded">H</TableCell>);
        header.push(<TableCell key={"E"} className="cell shaded">E</TableCell>);
    } else if (league === "NBA") {
        header.push(<TableCell key={"T"} className="cell shaded">T</TableCell>);
    }

    return <TableRow className="tableRow">{header}</TableRow>;
}

/**
 * Returns the home and away rows in the boxscore table. 
 * @param {*} apiResult 
 * @returns the component html
 */
function returnRows(apiResult) {
    let awayCells = buildCellsForTeamData(apiResult, "away");
    let homeCells = buildCellsForTeamData(apiResult, "home");

    let rows = [];
    rows.push(<TableRow className="tableRow" key={"awayRow"}>{awayCells}</TableRow>)
    rows.push(<TableRow className="tableRow" key={"homeRow"}>{homeCells}</TableRow>)

    return rows;
}

/**
 * Builds the cells for each team based on home and away. 
 * @param {} apiResult 
 * @param {*} side 
 * @returns the component html
 */
function buildCellsForTeamData(apiResult, side) {
    let cells = [];
    let total = 0;

    let ScoreData = side === "away" ? apiResult.away_period_scores : apiResult.home_period_scores;
    let teamData = side === "away" ? apiResult.away_team : apiResult.home_team;

    cells.push(<TableCell key={"id"} className="cell shaded">{teamData.abbreviation}</TableCell>);

    for (let i = 0; i < ScoreData.length; i++) {
        total = total + ScoreData[i];

        cells.push(<TableCell key={i} className="cell">{ScoreData[i]}</TableCell>);
    }

    if (apiResult.league === "MLB") {
        let hits = side === "away" ? apiResult.away_batter_totals.hits : apiResult.home_batter_totals.hits;
        let errors = side === "away" ? apiResult.away_errors : apiResult.home_errors;

        cells.push(<TableCell key={"R"} className="cell shaded">{total}</TableCell>);
        cells.push(<TableCell key={"H"} className="cell shaded">{hits}</TableCell>);
        cells.push(<TableCell key={"E"} className="cell shaded" >{errors}</TableCell>);

    } else if (apiResult.league === "NBA") {
        cells.push(<TableCell key={"T"} className="cell shaded">{total}</TableCell>);
    }

    return cells;
}

export default (ScoreTable);