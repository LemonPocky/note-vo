import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_SONG = gql`
  mutation addSong($song: SongInput) {
    addSong(song: $song) {
      _id
      songId
      title
      artists
    }
  }
`;

export const ADD_RATING = gql`
  mutation addRating($songId: String!, $rating: Int!) {
    addRating(songId: $songId, rating: $rating) {
      _id
    }
  }
`;

export const EDIT_RATING = gql`
  mutation editRating($ratingId: ID!, $rating: Int!) {
    editRating(ratingId: $ratingId, rating: $rating) {
      _id
    }
  }
`;
