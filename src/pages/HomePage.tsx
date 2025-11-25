import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomePage.css';

import { mockUsers } from '../data/mockData';
import { useAuthStore } from '../store/useAuthStore';

const HomePage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Check username and password directly for all users in mockUsers
    const user = mockUsers.find(u => u.username === username && password === (u.username === 'ramesh' ? 'ramesh123' : u.username === 'dilip' ? 'dilip123' : ''));
    // If not found, try exact match (for copy-paste)
    const userExact = mockUsers.find(u => u.username === username && password === (username === 'ramesh' ? 'ramesh123' : username === 'dilip' ? 'dilip123' : ''));
    const finalUser = user || userExact;
    if (finalUser) {
      login(finalUser, 'mock-token');
      setError('');
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  // Default to local public asset for reliability. Use Vite BASE_URL for subpath deployments.
  // const remoteHero = 'https://source.unsplash.com/1400x900/?metro,train,subway,blue,teal';
  const localHero = `${import.meta.env.BASE_URL}kochi-metro.png.png`;
  const [imgSrc, setImgSrc] = useState<string>(localHero);
  const handleImgError = () => setImgSrc(localHero);

  return (
    <div className="homepage-container">
      <div className="homepage-left">
        <div className="metro-hero">
          <img
            src={imgSrc}
            alt="Modern metro train"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={handleImgError}
          />
        </div>
        <h1 className="homepage-title">Kochi Metro</h1>
        <p className="homepage-tagline">Connecting the city, powering the future.</p>
        <a href="https://kochimetro.org/" target="_blank" rel="noopener noreferrer" className="official-link">
          Visit Official Website
        </a>
      </div>
      <div className="homepage-right">
        <div className="auth-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin} className="auth-form">
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="auth-submit">Login</button>
            {error && <div className="auth-error">{error}</div>}
          </form>
          <div className="demo-credentials">
            <strong>Demo Credentials:</strong>
            <ul className="demo-list">
              <li>Username: <b>ramesh</b> | Password: <b>ramesh123</b></li>
              <li>Username: <b>dilip</b> | Password: <b>dilip123</b></li>
            </ul>
          </div>
          <p className="switch-auth">Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>

      <footer className="homepage-footer">
        <div className="footer-links">
          <a href="https://kochimetro.org/" target="_blank" rel="noreferrer">KMRL</a>
          <span>•</span>
          <a href="#">Privacy</a>
          <span>•</span>
          <a href="#">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

