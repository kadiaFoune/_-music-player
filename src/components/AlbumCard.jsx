import React from 'react';
import { useNavigate } from 'react-router-dom';

function AlbumCard({ album }) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/album/${album.id}`)}
      style={{
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <img 
        src={album.cover_url} 
        alt={album.title}
        style={{ width: '100%', height: '250px', objectFit: 'cover' }}
      />
      <h3 style={{ padding: '15px 15px 5px', textAlign: 'center', margin: 0 }}>{album.title}</h3>
      <p style={{ textAlign: 'center', color: '#666', margin: '5px 0' }}>{album.artist_name}</p>
      <p style={{ textAlign: 'center', color: '#999', fontSize: '12px', marginBottom: '15px' }}>{album.year}</p>
    </div>
  );
}

export default AlbumCard;