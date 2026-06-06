import React, { useState, useEffect } from 'react';
import { addFavorite, removeFavorite, isFavorite } from '../services/api';

function SongCard({ song, index, onPlay }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(song.id));
  }, [song.id]);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(song.id);
    } else {
      addFavorite(song.id);
    }
    setFavorite(!favorite);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      background: 'white',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      transition: 'background 0.3s'
    }}>
      <div style={{ fontWeight: 'bold', color: '#667eea', width: '30px' }}>{index}</div>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: '5px' }}>{song.title}</h4>
        <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>{song.artist_name}</p>
      </div>
      <div style={{ color: '#999', fontSize: '14px' }}>{formatDuration(song.duration)}</div>
      <button onClick={onPlay} style={{
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '5px 10px'
      }}>▶</button>
      <button onClick={toggleFavorite} style={{
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '5px 10px'
      }}>
        {favorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

export default SongCard;