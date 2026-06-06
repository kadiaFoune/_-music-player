import React, { useState, useEffect } from 'react';
import { getFavorites, getSongs } from '../services/api';
import SongCard from '../components/SongCard';
import Player from '../components/Player';

function Favorites() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const songsRes = await getSongs();
      const favorites = getFavorites();
      const filteredSongs = songsRes.data.filter(song => favorites.includes(song.id));
      setAllSongs(songsRes.data);
      setFavoriteSongs(filteredSongs);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshFavorites = () => {
    const favorites = getFavorites();
    const filteredSongs = allSongs.filter(song => favorites.includes(song.id));
    setFavoriteSongs(filteredSongs);
  };

  const playSong = (song) => {
    setCurrentSong(song);
  };

  if (loading) return <div style={{ textAlign: 'center', color: 'white', fontSize: '24px', marginTop: '50px' }}>Chargement...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>Mes Favoris ❤️</h1>
      {favoriteSongs.length === 0 ? (
        <div style={{
          textAlign: 'center',
          color: 'white',
          padding: '60px 20px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px'
        }}>
          <p style={{ margin: '10px 0', fontSize: '18px' }}>Vous n'avez pas encore de chansons favorites</p>
          <p style={{ margin: '10px 0', fontSize: '18px' }}>Ajoutez vos chansons préférées en cliquant sur le cœur ❤️</p>
        </div>
      ) : (
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '80px'
        }}>
          {favoriteSongs.map((song, index) => (
            <SongCard 
              key={song.id} 
              song={song} 
              index={index + 1}
              onPlay={() => playSong(song)}
            />
          ))}
        </div>
      )}
      {currentSong && <Player song={currentSong} />}
    </div>
  );
}

export default Favorites;