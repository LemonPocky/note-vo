const db = require("../config/connection");
const { Song } = require("../models");
const songSeeds = require("./songSeeds.json");

db.once("open", async () => {
  try {
    await db.dropDatabase();
    await Song.create(songSeeds);
    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
