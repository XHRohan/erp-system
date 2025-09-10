export default function NotFound() {
  return (
    <div className="container">
      <div style={{ 
        textAlign: 'center', 
        marginTop: '100px',
        padding: '50px'
      }}>
        <h1 style={{ fontSize: '72px', color: '#007bff', marginBottom: '20px' }}>404</h1>
        <h2 style={{ marginBottom: '20px' }}>Page Not Found</h2>
        <p style={{ marginBottom: '30px', color: '#666' }}>
          The page you are looking for doesn't exist.
        </p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="btn btn-primary"
        >
          Go Back to Login
        </button>
      </div>
    </div>
  );
}