import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumById, getSongsByAlbum } from '../services/api';
import SongCard from '../components/SongCard';
import Player from '../components/Player';

function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbumData();
  }, [id]);

  const fetchAlbumData = async () => {
    try {
      const [albumRes, songsRes] = await Promise.all([
        getAlbumById(id),
        getSongsByAlbum(id)
      ]);
      setAlbum(albumRes.data);
      setSongs(songsRes.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const playSong = (song) => {
    setCurrentSong(song);
  };

  if (loading) return <div style={{ textAlign: 'center', color: 'white', fontSize: '24px', marginTop: '50px' }}>Chargement...</div>;
  if (!album) return <div style={{ textAlign: 'center', color: '#ff6b6b', fontSize: '24px', marginTop: '50px' }}>Album non trouvé</div>;

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
          src={album.cover_url} 
          alt={album.title}
          style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
        />
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '10px', color: '#333' }}>{album.title}</h1>
          <p style={{ color: '#666', margin: '5px 0' }}>{album.artist_name}</p>
          <p style={{ color: '#666', margin: '5px 0' }}>Année: {album.year}</p>
          <p style={{ color: '#666', margin: '5px 0' }}>{songs.length} chansons</p>
        </div>
      </div>
      
      <section>
        <h2 style={{ color: 'white', marginBottom: '20px' }}>Liste des chansons</h2>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '80px'
        }}>
          {songs.map((song, index) => (
            <SongCard 
              key={song.id} 
              song={song} 
              index={index + 1}
              onPlay={() => playSong(song)}
            />
          ))}
        </div>
      </section>

      {currentSong && <Player song={currentSong} />}
    </div>
  );
}

export default AlbumDetail;