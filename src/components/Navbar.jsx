import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      background: 'rgba(19, 17, 17, 0.8)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backdropFilter: 'blur(10px)',
      marginBottom: '20px'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>🎵 MusicApp</Link>
      </div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link 
          to="/" 
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            transition: 'color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#667eea'}
          onMouseLeave={(e) => e.target.style.color = 'white'}
        >
          Accueil
        </Link>
        <Link 
          to="/artists" 
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            transition: 'color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#667eea'}
          onMouseLeave={(e) => e.target.style.color = 'white'}
        >
          Artistes
        </Link>
        <Link 
          to="/albums" 
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            transition: 'color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#667eea'}
          onMouseLeave={(e) => e.target.style.color = 'white'}
        >
          Albums
        </Link>
        <Link 
          to="/favorites" 
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            transition: 'color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#667eea'}
          onMouseLeave={(e) => e.target.style.color = 'white'}
        >
          Favoris
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;