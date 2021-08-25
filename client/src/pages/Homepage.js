import React from "react";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=a767b606a056499aace59c11b3a3824f&response_type=code&redirect_uri=http://localhost:3000&scope=20%user-read-email$20user-read-private%20user-library-read$20user-library-modify-read%20user-read-playback-state%20user-modify-playback-state";

const Homepage = () => {
  return (
    <>
      <h1>Hello</h1>;<button class="ui button">Button</button>
    </>
  );
};

export default Homepage;
