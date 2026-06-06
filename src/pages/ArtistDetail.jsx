import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistById, getAlbumsByArtist } from '../services/api';
import AlbumCard from '../components/AlbumCard';

function ArtistDetail() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtistData();
  }, [id]);

  const fetchArtistData = async () => {
    try {
      const [artistRes, albumsRes] = await Promise.all([
        getArtistById(id),
        getAlbumsByArtist(id)
      ]);
      setArtist(artistRes.data);
      setAlbums(albumsRes.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', color: 'white', fontSize: '24px', marginTop: '50px' }}>Chargement...</div>;
  if (!artist) return <div style={{ textAlign: 'center', color: '#ff6b6b', fontSize: '24px', marginTop: '50px' }}>Artiste non trouvé</div>;

  return (
    <div>
      <div style={{
        display: 'flex',
        gap: '40px',
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        marginBottom: '40px'
      }}>
        <img 
          src={artist.image_url} 
          alt={artist.name}
          style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '15px', color: '#333' }}>{artist.name}</h1>
          <p style={{ color: '#666', lineHeight: '1.6' }}>{artist.bio || 'Aucune biographie disponible'}</p>
          <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#667eea' }}>{albums.length} albums</p>
        </div>
      </div>
      
      <section>
        <h2 style={{ color: 'white', marginBottom: '20px' }}>Albums</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '25px'
        }}>
          {albums.map(album => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ArtistDetail;