const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    ratings: [Rating]
  }

  type Song {
    songId: String!
    title: String
    artists: [String]
    album: Album
    link: String
    previewUrl: String
    expiration: String
  }

  type Album {
    title: String
    image: String
  }

  type Rating {
    rating: Int
    song: Song
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  input SongInput {
    songId: String!
    title: String
    artists: [String]
    album: AlbumInput
    link: String
    previewUrl: String
  }

  input AlbumInput {
    title: String
    image: String
  }

  type Query {
    me: User
    user(username: String!): User
    song(songId: String): Song
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addRating(songId: String, rating: Int): Rating
    addSong(song: SongInput): Song
  }
`;

module.exports = typeDefs;
