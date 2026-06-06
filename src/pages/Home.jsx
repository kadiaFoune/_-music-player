import React, { useState, useEffect } from 'react';
import { getArtists } from '../services/api';
import ArtistCard from '../components/ArtistCard';

function Home() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await getArtists();
      setArtists(response.data.slice(0, 6));
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', color: 'white', fontSize: '24px', marginTop: '50px' }}>Chargement...</div>;

  return (
    <div>
      <div style={{ textAlign: 'center', color: 'white', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Bienvenue sur MusicApp</h1>
        <p style={{ fontSize: '20px', opacity: 0.9 }}>Découvrez vos artistes et musiques préférées</p>
      </div>
      
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>Artistes populaires</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {artists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;