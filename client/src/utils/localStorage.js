export const getSavedSongIds = () => {
    const savedSongIds = localStorage.getItem("saved_songs")
      ? JSON.parse(localStorage.getItem("saved_songs"))
      : [];
  
    return savedSongIds;
  };
  
  export const saveSongIds = (songIdArr) => {
    if (songIdArr.length) {
      localStorage.setItem("saved_songs", JSON.stringify(songIdArr));
    } else {
      localStorage.removeItem("saved_songs");
    }
  };
  
  export const removeSongId = (songId) => {
    const savedSongIds = localStorage.getItem("saved_songs")
      ? JSON.parse(localStorage.getItem("saved_songs"))
      : null;
  
    if (!savedSongIds) {
      return false;
    }
  
    const updatedSavedSongIds = savedSongIds?.filter(
      (savedSongId) => savedSongId !== songId
    );
    localStorage.setItem("saved_songs", JSON.stringify(updatedSavedSongIds));
  
    return true;
  };