import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { useMutation, useLazyQuery } from '@apollo/client';
import Stars from '../components/Stars';
import { ADD_RATING, ADD_SONG, EDIT_RATING } from '../utils/mutations';
import { QUERY_SPOTIFY_SONG } from '../utils/queries';

const Homepage = () => {
  // state for holding returned spotify api data
  const [searchedSongs, setSearchedSongs] = useState([]);
  // lazyquery for getting search results
  const [getSearchResults, { loading, spotifySearchError, data }] =
    useLazyQuery(QUERY_SPOTIFY_SONG);
  const [addSong, { addSongError }] = useMutation(ADD_SONG);
  const [addRating, { addRatingError }] = useMutation(ADD_RATING);
  // state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // Log errors if they happen
  useEffect(() => {
    if (addSongError) {
      console.log(addSongError);
    }
  }, [addSongError]);
  // Log errors if they happen
  useEffect(() => {
    if (addRatingError) {
      console.log(addRatingError);
    }
  }, [addRatingError]);

  // method to search for songs and set state upon form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    console.log(searchInput);
    await getSearchResults({
      variables: { query: searchInput },
    });
    if (loading) {
      return <h1>Loading data...</h1>;
    }

    if (data) {
      const response = JSON.parse(data.searchSpotify);
      console.log(response);
      const { items } = response.body.tracks;

      const songData = items.map((song) => {
        const newSong = {
          songId: song.id,
          artists: song.artists?.map((artist) => {
            return artist.name;
          }),
          title: song.name,
          album: {
            title: song.album?.name,
            image: song.album?.images ? song.album.images[0].url : '',
          },
          link: song.href,
          previewUrl: song.preview_url,
        };

        return newSong;
      });

      // Update these song, or add these song
      // to the database if it doesn't already exist
      // TODO: hacky, pls fix
      for (let i = 0; i < songData.length; i++) {
        const newSong = songData[i];
        try {
          const addedToDatabaseSong = await addSong({
            variables: {
              song: newSong,
            },
          });
          // Get the id of the song in the database
          newSong._id = addedToDatabaseSong.data.addSong._id;
          songData[i] = newSong;
        } catch (error) {
          console.log(JSON.stringify(error, null, 2));
        }
      }
      setSearchedSongs(songData);
      setSearchInput('');
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for a song:</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a song"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedSongs.length
            ? `Viewing ${searchedSongs.length} results:`
            : 'Search for a song to begin'}
        </h2>
        <CardColumns>
          {searchedSongs.map((song) => {
            return (
              <Card key={song._id} border="dark">
                {song.image ? (
                  <Card.Img
                    src={song.image}
                    alt={`The cover for ${song.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{song.title}</Card.Title>
                  <p className="small">Artist: {song.artists.join(', ')}</p>
                  <Card.Text>{song.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Stars
                      initialRating={0}
                      // function to handle saving a song to our database
                      onUpdateRating={async (newRating) => {
                        try {
                          await addRating({
                            variables: { songId: song._id, rating: newRating },
                          });
                          console.log(`Rating updated: ${newRating}`);
                        } catch (error) {
                          console.log(JSON.stringify(error, null, 2));
                        }
                      }}
                    />
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Homepage;
