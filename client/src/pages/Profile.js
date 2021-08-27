import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Header, Divider, Grid } from 'semantic-ui-react';

import ProfileSongRow from '../components/ProfileSongRow';
import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

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

  const userData = {
    _id: '123456',
    username: 'My Name',
    email: 'myemail@email.com',
  };

  const ratingData = {
    _id: 'foobar',
    rating: 4,
    song: songData,
    user: userData,
  };

  return (
    <>
      <Header as="h1">Hello {userData.username}!</Header>

      <Grid container textAlign="center" celled="internally">
        <Divider horizontal>Recently Rated Songs</Divider>
        <ProfileSongRow song={songData} rating={ratingData} />
      </Grid>
    </>
  );
};

export default Profile;
