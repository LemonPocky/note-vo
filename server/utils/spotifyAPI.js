// when query is tested, returns error requiring auth token

export const searchSpotify = (query)  => {
    return fetch (`https://api.spotify.com/v1/tracks/${query}`);
  };

