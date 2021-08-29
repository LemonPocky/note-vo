import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Grid, Header, Image, Message } from 'semantic-ui-react';
import { EDIT_RATING } from '../utils/mutations';
import Stars from './Stars';
import StaticStars from './StaticStars';

const ProfileSongRow = ({ rating }) => {
  const song = rating.song;
  const [showAlert, setShowAlert] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editRating, { error }] = useMutation(EDIT_RATING);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const updateRating = async function (newRating) {
    await editRating({
      variables: {
        ratingId: rating._id,
        rating: newRating,
      },
    });
    if (!error) {
      setEditSuccess(true);
    }
  };

  let albumImage = `${process.env.PUBLIC_URL}/images/placeholder-square.jpg`;
  if (song.album.image) {
    albumImage = song.album.image;
  }

  return (
    <Grid.Row columns={3}>
      <Grid.Column>
        <Image src={albumImage} size="small" centered />
      </Grid.Column>
      <Grid.Column>
        <Header as="h2">{song.title}</Header>
        <Header as="h3">{song.artists.join(', ')}</Header>
        <Header as="h3">{song.album.title}</Header>
      </Grid.Column>
      <Grid.Column>
        <Header as="h5">My Rating</Header>
        <Stars initialRating={rating.rating} onUpdateRating={updateRating} />
        {editSuccess && (
          <Header size="tiny" color="green">
            Rating updated successfully.
          </Header>
        )}
        {showAlert && (
          <Message
            color="red"
            onDismiss={() => setShowAlert(false)}
            header="Error"
            content="Could not edit rating. Try again later."
          />
        )}
      </Grid.Column>
    </Grid.Row>
  );
};

export default ProfileSongRow;
