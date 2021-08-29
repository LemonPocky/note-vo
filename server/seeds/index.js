const db = require("../config/connection");
const { Song, User, Rating } = require("../models");
const songSeeds = require("./songSeeds.json");
const userSeeds = require("./userSeeds.json");
const ratingSeeds = require("./ratingSeeds.json");
db.once("open", async () => {
  try {
    await db.dropDatabase();
    await Song.create(songSeeds);
    await User.create(userSeeds);
    await Rating.create(ratingSeeds);
    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
