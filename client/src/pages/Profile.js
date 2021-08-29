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

  const songData = {
    songId: 'abc123',
    title: 'Craxx traxxxx',
    artists: ['C-Show', 't+pazolite'],
    album: {
      title: 'Lite Show Magic',
    },
    link: 'https://www.youtube.com/watch?v=hjVJhsyNI8A',
    previewUrl: 'https://www.youtube.com/watch?v=hjVJhsyNI8A',
    expiration: new Date(1930018869797),
  };

  const ratingData = {
    _id: 'foobar',
    rating: 4,
    song: songData,
    user: user,
  };

  if (loading) {
    return <h1>Loading data...</h1>;
  }

  return (
    <>
      <Header as="h1">Hello {user.username}!</Header>

      <Grid container textAlign="center" celled="internally">
        <Divider horizontal>Recently Rated Songs</Divider>
        <ProfileSongRow song={songData} rating={ratingData} />
      </Grid>
    </>
  );
};

export default Profile;
