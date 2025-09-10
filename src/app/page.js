'use client';
import { useState } from 'react';
import { users } from '../data/mockData';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.location.href = `/${user.role}`;
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <div style={{ maxWidth: '400px', margin: '50px auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#007bff', fontSize: '36px', marginBottom: '10px' }}>
            🎓 College ERP System
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>Academic Management Portal</p>
        </div>
        
        <div className="card">
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Login</h2>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Login
            </button>
          </form>
          
          <div style={{ marginTop: '20px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
            <p><strong>Demo Accounts:</strong></p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <div>
                <p><strong>Admin:</strong></p>
                <p>admin / admin123</p>
              </div>
              <div>
                <p><strong>Professor:</strong></p>
                <p>prof1 / prof123</p>
              </div>
              <div>
                <p><strong>Student:</strong></p>
                <p>student1 / student123</p>
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              onClick={() => window.location.href = '/alumni'} 
              className="btn btn-success"
              style={{ width: '100%' }}
            >
              Visit Alumni Corner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}