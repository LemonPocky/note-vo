import { gql } from "@apollo/client";

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
