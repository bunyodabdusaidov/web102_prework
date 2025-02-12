/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    var gameId = 0; // unique id for each game
    for (let game of games) {
        // create a new div element, which will become the game card
        let gameCardDiv = document.createElement("div");
        // add the class game-card to the list
        gameCardDiv.className = "game-card";
        // add unique id to each game
        const uniqueId = `game-${gameId}`;
        gameCardDiv.setAttribute('id', uniqueId);
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCardDiv.innerHTML = `
            <img class="game-img" src=${game.img} />
            <h4>${game.name}</h4>
            <p>${game.description}</p>
            <p>Pledged: ${game.pledged.toLocaleString("en-US")}</p>
            <p>Goal: ${game.goal.toLocaleString("en-US")}</p>
            <p>Backers: ${game.backers.toLocaleString("en-US")}</p>`;
        // append the game to the games-container
        const gamesContainerDiv = document.getElementById("games-container");
        gamesContainerDiv.appendChild(gameCardDiv);
        gameId++;
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

var games = GAMES_JSON


// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
// use reduce() to count the number of total contributions by summing the backers
const numContributions = games.reduce((backers, game) => {
    return backers + game.backers;
}, 0)
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = numContributions.toLocaleString('en-US');


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const numPledged = games.reduce((pledged, game) => {
    return pledged + game.pledged;
}, 0)
// set inner HTML using template literal
raisedCard.innerHTML = numPledged.toLocaleString('en-US')


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const numGames = Object.keys(games).length;
gamesCard.innerHTML = numGames

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfundedGames = games.filter((game) => {
        return game.pledged < game.goal;
    });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFundedGames = games.filter((game) => {
        return game.pledged >= game.goal;
    });
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFundedGames);
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    // add all games from the JSON data to the DOM
    addGamesToPage(games);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfundedGames = games.filter((game) => {
    return game.pledged < game.goal;
});

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${numPledged.toLocaleString('en-US')} has been raised for ${numGames} ${numGames === 1 ? "Game" : "Games"}. 
                    Currently, ${numUnfundedGames.length} ${numUnfundedGames.length === 1 ? "game remains" : "games remain"} unfunded.
                    We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const descriptionExtra = document.createElement("p");
descriptionExtra.innerHTML = displayStr;
descriptionContainer.appendChild(descriptionExtra);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});``

console.log(sortedGames);

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...lastGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("h4");
firstGameElement.innerHTML = firstGame.name;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("h4");
secondGameElement.innerHTML = secondGame.name;
secondGameContainer.appendChild(secondGameElement);

// create search function to search the games
function searchGames(query) {
    const lowercaseQuery = query.toLowerCase();
    return games.filter(game =>
        game.name.toLowerCase().includes(lowercaseQuery) ||
        game.description.toLowerCase().includes(lowercaseQuery)
    );
  }

function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value;
    const searchResults = searchGames(searchTerm);

    // Display search results in real-time
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    searchResults.forEach(result => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = `#games-container`;
        anchor.textContent = result.name;
        listItem.appendChild(anchor);
        searchResultsContainer.appendChild(listItem);
    });
}

const searchBar = document.getElementById("searchInput");
searchBar.addEventListener("input", handleSearch);

// Add click event listener to the document body
document.body.addEventListener("click", function (event) {
    const searchResultsContainer = document.getElementById("searchResults");

    // Check if the clicked element is outside the search bar and search results container
    if (~searchBar.contains(event.target) && !searchResultsContainer.contains(event.target)) {
        searchResultsContainer.innerHTML = ''; // Hide the search results
    }
});