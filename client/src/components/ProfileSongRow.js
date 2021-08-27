import { Grid, Header, Image } from 'semantic-ui-react';
import Stars from './Stars';

const ProfileSongRow = ({ song, rating }) => {
  const updateRating = function (newRating) {
    alert(`Updating rating!
RatingId: ${rating._id}
New Rating: ${newRating}`);
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
      </Grid.Column>
    </Grid.Row>
  );
};

export default ProfileSongRow;
