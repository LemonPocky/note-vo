// when query is tested, returns error requiring auth token

// export const searchSpotify = (query)  => {
//     return fetch (`https://api.spotify.com/v1/tracks/${query}`);
// };


const SpotifyWebApi = require("spotify-web-api-node");

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

// Stop retrying a query after N failed attempts
const MAX_RETRIES = 3;

class SpotifyClient {
  token = "";
  client = null;

  constructor() {
    this.client = new SpotifyWebApi({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
    });
  }

  async fetchToken() {
      const result = await this.client.clientCredentialsGrant();
      const { access_token } = result.body;
      this.client.setAccessToken(access_token);
  }

  async search(query, failed = 0) {
    try {
      if (!this.token) {
        await this.fetchToken();
      }
      const result = await this.client.searchTracks(query);
      return result;
    } catch (error) {

      // refetch token. token is expired.
      if (error.statusCode === 401 && failed < MAX_RETRIES) {
        await this.fetchToken();
        return this.search.query(result, failed + 1);
      }
      throw error;
    }
  }
}

module.exports = { SpotifyClient };