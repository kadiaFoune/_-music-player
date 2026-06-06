import React, { useState, useEffect } from 'react';
import { getArtists } from '../services/api';
import ArtistCard from '../components/ArtistCard';

function Artists() {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await getArtists();
      setArtists(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={{ textAlign: 'center', color: 'white', fontSize: '24px', marginTop: '50px' }}>Chargement...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>Artistes</h1>
      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Rechercher un artiste..."
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
      
      {/* Message quand aucun résultat n'est trouvé */}
      {filteredArtists.length === 0 && searchTerm !== '' ? (
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
            Aucun artiste ne correspond à "{searchTerm}"
          </p>
          <p style={{ fontSize: '14px', marginTop: '20px', opacity: 0.6 }}>
            Essayez avec un autre nom ou consultez tous nos artistes
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {filteredArtists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Artists;