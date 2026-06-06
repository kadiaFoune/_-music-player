import React from 'react';
import { useNavigate } from 'react-router-dom';

function ArtistCard({ artist }) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/artist/${artist.id}`)}
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
        src={artist.image_url} 
        alt={artist.name}
        style={{ width: '100%', height: '250px', objectFit: 'cover' }}
      />
      <h3 style={{ padding: '15px', textAlign: 'center', margin: 0 }}>{artist.name}</h3>
      <p style={{ padding: '0 15px 15px', color: '#666', textAlign: 'center' }}>{artist.bio}</p>
    </div>
  );
}

export default ArtistCard;