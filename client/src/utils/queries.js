import { gql } from '@apollo/client';

export const QUERY_USER_PROFILE = gql`
  query user($username: String!) {
    user(username: $username) {
      username
      email
      ratings {
        _id
        rating
        song {
          title
          artists
          album {
            title
            image
          }
          link
          previewUrl
        }
      }
    }
  }
`;

export const QUERY_SONG = gql`
  query song($songId: String) {
    song(songId: $songId) {
      songId
      title
      artists
      album {
        title
        image
      }
      link
      previewUrl
      expiration
    }
  }
`;

export const QUERY_SPOTIFY_SONG = gql`
  query searchSpotify($query: String) {
    searchSpotify(query: $query)
  }
`;