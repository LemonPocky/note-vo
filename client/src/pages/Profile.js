import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Header, Divider, Grid } from 'semantic-ui-react';

import ProfileSongRow from '../components/ProfileSongRow';
import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const userData = {
    username: 'My Name',
    email: 'myemail@email.com',
  };
  return (
    <>
      <Header as="h1">Hello {userData.username}!</Header>

      <Grid container textAlign="center" celled="internally">
        <Divider horizontal>Recently Rated Songs</Divider>
        <ProfileSongRow />
      </Grid>
    </>
  );
};

export default Profile;
