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
import { useMutation } from '@apollo/client';
// TODO: import spotify api
import { saveSongIds, getSavedSongIds } from '../utils/localStorage';
// TODO: add save song mutation to ../utils/mutations
import { SAVE_SONG } from '../utils/mutations';
// TODO: import and implement Stars 

const SearchSongs = () => {
  // state for holding returned api data
  const [searchedSongs, setSearchedSongs] = useState([]);
  // state for holding search field data
  const [searchInput, setSearchInput] = useState('');
  //  state to hold saved songId values
  const [savedSongIds, setSavedSongIds] = useState(getSavedSongIds());

  const [saveSong, { error: mutationError }] = useMutation(SAVE_SONG);

  // hook to save savedSongIds to localStorage
  useEffect(() => {
    return () => saveSongIds(savedSongIds);
  });

  // method to search for songs and set state when form is submitted
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    // try {
    // // TODO: implement API response
    // //   const response = await spotifySearch(searchInput);

    //   if (!response.ok) {
    //     throw new Error('something went wrong!');
    //   }

    //   const { items } = await response.json();
    // // TODO: define map based on API values; current values are assumed dummy values
    //   const songData = items.map((song) => ({
    //     songId: song.id,
    //     artist: song.album.artist || ['no artist available'],
    //     title: song.album.title || ['no song title available'],
    //     description: song.album.description,
    //     image: song.album.imageLinks?.thumbnail || '',
    //   }));

    //   setSearchedSongs(songData);
    //   setSearchInput('');
    // } catch (err) {
    //   console.error(err);
    // }
  };

  // function to handle saving a song to our database
  // todo: make sure values match API data
  const handleSaveSong = async (songId) => {
  // find song by matching id
    const songToSave = searchedSongs.find((song) => song.songId === songId);

    try {
      await saveSong({
        variables: { input: songToSave },
      });
      // if song successfully saves to user's account, save song id to state
      setSavedSongIds([...savedSongIds, songToSave.songId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Songs!</h1>
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
              <Card key={song.songId} border="dark">
                {song.image ? (
                  <Card.Img
                    src={song.image}
                    alt={`The cover for ${song.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{song.title}</Card.Title>
                  <p className="small">Artist: {song.artist}</p>
                  <Card.Text>{song.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedSongIds?.some(
                        (savedSongId) => savedSongId === song.songId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveSong(song.songId)}
                    >
                      {savedSongIds?.some(
                        (savedSongId) => savedSongId === song.songId
                      )
                        ? 'This song has already been saved!'
                        : 'Save this Song!'}
                    </Button>
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

export default SearchSongs;