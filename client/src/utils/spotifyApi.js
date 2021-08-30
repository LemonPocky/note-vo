// // Used to load env vars in development from ".env" file.  
// // On heroku, we need to add key/value pairs to the config.
// require("dotenv").config();

// const { SpotifyClient } = require("../../../server/utils/spotifyAPI");

// // test function with dummy song, "Finale"; in our actual searches we will use a query 
// async function testSearch() {
//   try {
//     const spotifyClient = new SpotifyClient();

//     const result = await spotifyClient.search("Finale");
//     console.log(result.body.tracks);
//     // console.log(result);
//   } catch (error) {
//     // console.log(error);
//   }
// }
// // testSearch();