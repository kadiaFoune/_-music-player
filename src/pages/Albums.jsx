import React, { useState, useEffect } from 'react';
import { getAlbums } from '../services/api';
import AlbumCard from '../components/AlbumCard';

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await getAlbums();
      setAlbums(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.artist_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={{ textAlign: 'center', color: 'white', fontSize: '24px', marginTop: '50px' }}>Chargement...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>Albums</h1>
      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Rechercher un album ou artiste..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '8px',
            outline: 'none'
          }}
        />
      </div>
      
      {filteredAlbums.length === 0 && searchTerm !== '' ? (
        <div style={{
          textAlign: 'center',
          color: 'white',
          padding: '60px 20px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          marginTop: '40px'
        }}>
          <p style={{ fontSize: '24px', marginBottom: '10px' }}>🔍 Aucun résultat</p>
          <p style={{ fontSize: '18px', opacity: 0.8 }}>
            Aucun album ne correspond à "{searchTerm}"
          </p>
          <p style={{ fontSize: '14px', marginTop: '20px', opacity: 0.6 }}>
            Essayez avec un autre titre ou nom d'artiste
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '25px'
        }}>
          {filteredAlbums.map(album => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Albums;