const db = require("../config/connection");
const { Song, User, Rating } = require("../models");
const songSeeds = require("./songSeeds.json");
const userSeeds = require("./userSeeds.json");
const ratingSeeds = require("./ratingSeeds.json");
const songs = Song.create(songSeeds);
const users = await User.create(userSeeds);
const newRating = await Rating.create({
  rating: 3,
  user: users[0]._id,
  song: songs[0]._id,
});

db.once("open", async () => {
  try {
    await db.dropDatabase();
    await songs;
    await users;
    await newRating;
    await Song.findByIdAndUpdate(user[0]._id, {
      $addToSet: { ratings: newRating._id },
    });
    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
