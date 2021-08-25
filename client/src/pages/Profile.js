import React from 'react';
import { Header, Divider, Grid, Image } from 'semantic-ui-react';

const userData = {
  username: 'My Name',
  email: 'myemail@email.com',
};

const Profile = () => {
  return (
    <>
      <Header as="h1">Hello {userData.username}!</Header>

      <Grid container textAlign="center" celled="internally">
        <Divider horizontal>Recently Rated Songs</Divider>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Image
              src={`${process.env.PUBLIC_URL}/images/placeholder-square.jpg`}
              size="small"
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h2">Song Title</Header>
            <Header as="h3">Artist Name</Header>
            <Header as="h3">Album Title</Header>
          </Grid.Column>
          <Grid.Column>5 Stars</Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Profile;
