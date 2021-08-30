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
import { saveSongIds, getSavedSongIds } from '../utils/localStorage';
import { EDIT_RATING } from '../utils/mutations';
import { QUERY_SPOTIFY_SONG } from '../utils/queries';




const Homepage = () => {
  // state for holding returned spotify api data
  const [searchedSongs, setSearchedSongs] = useState([]);
  // lazyquery for getting search results
  const [getSearchResults, { loading, error, data }] = useLazyQuery(QUERY_SPOTIFY_SONG);
  // state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved songId values
  const [savedSongIds, setSavedSongIds] = useState(getSavedSongIds());

  const [saveSong, { error: mutationError }] = useMutation(EDIT_RATING);


  // useEffect hook to save `savedSongIds` list to localStorage on component unmount
 
  useEffect(() => {
    return () => saveSongIds(savedSongIds);
  });

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
    
      const user = data?.user || {};
      
      if (loading) {
          return <h1>Loading data...</h1>;
        }
                    
        if (data) {
            const response = JSON.parse(data.searchSpotify);
                console.log(response);
                const { items } = response.body.tracks;
            
                const songData = items.map((song) => ({
                  songId: song.id,

                  artists: song.artists?.map((artist) => {
                    return artist.name
                  }),



                  title: song.name,
                //   image: song.image || '',
                }));
            
                setSearchedSongs(songData);
                setSearchInput('');
        }
    };

  // function to handle saving a song to our database
  const handleSaveSong = async (songId) => {
    // find song in `searchedSongs` state by matching id
    const songToSave = searchedSongs.find((song) => song.songId === songId);

    try {
      await saveSong({
        variables: { input: songToSave },
      });
      setSavedSongIds([...savedSongIds, songToSave.songId]);
    } catch (err) {
      console.error(err);
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
                  <p className="small">Artist: {song.artists.join(", ")}</p>
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

export default Homepage;