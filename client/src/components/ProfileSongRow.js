import { Grid, Header, Image } from 'semantic-ui-react';

const ProfileSongRow = ({ song, rating }) => {
  return (
    <Grid.Row columns={3}>
      <Grid.Column>
        <Image
          src={`${process.env.PUBLIC_URL}/images/placeholder-square.jpg`}
          size="small"
          centered
        />
      </Grid.Column>
      <Grid.Column>
        <Header as="h2">Song Title</Header>
        <Header as="h3">Artist Name</Header>
        <Header as="h3">Album Title</Header>
      </Grid.Column>
      <Grid.Column>5 Stars</Grid.Column>
    </Grid.Row>
  );
};

export default ProfileSongRow;
