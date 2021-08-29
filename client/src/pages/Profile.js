import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Header, Divider, Grid } from 'semantic-ui-react';

import ProfileSongRow from '../components/ProfileSongRow';
import Auth from '../utils/auth';
import { QUERY_USER_PROFILE } from '../utils/queries';

const Profile = () => {
  let { username: userParam } = useParams();

  // If userParam is undefined, try to visit the logged in user's page
  if (!userParam) {
    if (Auth.loggedIn()) {
      userParam = Auth.getProfile().data.username;
    }
  }

  const { loading, data } = useQuery(QUERY_USER_PROFILE, {
    variables: { username: userParam },
  });

  const user = data?.user || {};

  if (loading) {
    return <h1>Loading data...</h1>;
  }

  return (
    <>
      {Auth.loggedIn() && Auth.getProfile().data.username === userParam ? (
        <Header as="h1">Hello {user.username}!</Header>
      ) : (
        <Header as="h1">{user.username}'s Profile</Header>
      )}

      <Grid container textAlign="center" celled="internally">
        <Divider horizontal>Recently Rated Songs</Divider>
        {user.ratings.map((rating) => (
          <ProfileSongRow key={rating._id} rating={rating} />
        ))}
      </Grid>
    </>
  );
};

export default Profile;
