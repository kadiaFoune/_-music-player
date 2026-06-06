import { testArtists, testAlbums, testSongs } from '../data/testData';

export const getArtists = () => {
  return Promise.resolve({ data: testArtists });
};

export const getArtistById = (id) => {
  const artist = testArtists.find(a => a.id === parseInt(id));
  return Promise.resolve({ data: artist });
};

export const getAlbums = () => {
  return Promise.resolve({ data: testAlbums });
};

export const getAlbumById = (id) => {
  const album = testAlbums.find(a => a.id === parseInt(id));
  return Promise.resolve({ data: album });
};

export const getAlbumsByArtist = (artistId) => {
  const albums = testAlbums.filter(a => a.artist_id === parseInt(artistId));
  return Promise.resolve({ data: albums });
};

export const getSongs = () => {
  return Promise.resolve({ data: testSongs });
};

export const getSongsByAlbum = (albumId) => {
  const songs = testSongs.filter(s => s.album_id === parseInt(albumId));
  return Promise.resolve({ data: songs });
};

export const getFavorites = () => {
  const favorites = localStorage.getItem('favoriteSongs');
  return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = (songId) => {
  const favorites = getFavorites();
  if (!favorites.includes(songId)) {
    favorites.push(songId);
    localStorage.setItem('favoriteSongs', JSON.stringify(favorites));
  }
};

export const removeFavorite = (songId) => {
  let favorites = getFavorites();
  favorites = favorites.filter(id => id !== songId);
  localStorage.setItem('favoriteSongs', JSON.stringify(favorites));
};

export const isFavorite = (songId) => {
  return getFavorites().includes(songId);
};