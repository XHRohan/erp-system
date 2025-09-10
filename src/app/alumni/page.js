'use client';
import { useState } from 'react';

const alumniData = [
  { id: 1, name: 'Rahul Sharma', batch: '2020', company: 'Google', position: 'Senior Software Engineer', email: 'rahul@example.com', department: 'Computer Science' },
  { id: 2, name: 'Priya Agarwal', batch: '2019', company: 'Microsoft', position: 'Principal Product Manager', email: 'priya@example.com', department: 'Computer Science' },
  { id: 3, name: 'Arjun Patel', batch: '2021', company: 'Amazon', position: 'Machine Learning Engineer', email: 'arjun@example.com', department: 'Computer Science' },
  { id: 4, name: 'Sneha Reddy', batch: '2018', company: 'Apple', position: 'Senior UX Designer', email: 'sneha@example.com', department: 'Computer Science' },
  { id: 5, name: 'Vikram Singh', batch: '2020', company: 'Tesla', position: 'Mechanical Design Engineer', email: 'vikram@example.com', department: 'Mechanical Engineering' },
  { id: 6, name: 'Kavya Nair', batch: '2019', company: 'SpaceX', position: 'Aerospace Engineer', email: 'kavya@example.com', department: 'Mechanical Engineering' },
  { id: 7, name: 'Rohan Gupta', batch: '2022', company: 'Meta', position: 'Software Engineer', email: 'rohan@example.com', department: 'Computer Science' },
  { id: 8, name: 'Ananya Joshi', batch: '2021', company: 'Netflix', position: 'Data Scientist', email: 'ananya@example.com', department: 'Computer Science' }
];

const events = [
  { id: 1, title: 'Annual Alumni Meet 2025', date: '2025-03-15', description: 'Grand reunion of all batches with networking dinner and cultural programs' },
  { id: 2, title: 'Industry Mentorship Program', date: '2025-02-20', description: 'Alumni mentoring current students for career guidance and internship opportunities' },
  { id: 3, title: 'Tech Talk: AI & Future', date: '2025-04-10', description: 'Leading tech alumni discussing Artificial Intelligence and emerging technologies' },
  { id: 4, title: 'Startup Showcase', date: '2025-05-05', description: 'Alumni entrepreneurs presenting their startups and sharing entrepreneurship insights' },
  { id: 5, title: 'Placement Preparation Workshop', date: '2025-02-28', description: 'Alumni from top companies conducting mock interviews and resume reviews' }
];

export default function AlumniCorner() {
  const [activeTab, setActiveTab] = useState('directory');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlumni = alumniData.filter(alumni => 
    alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.batch.includes(searchTerm)
  );

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <h1>Alumni Corner</h1>
          <div className="navbar-right">
            <button onClick={() => window.location.href = '/'} className="btn btn-primary">
              Back to Login
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => setActiveTab('directory')} 
            className={`btn ${activeTab === 'directory' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Alumni Directory
          </button>
          <button 
            onClick={() => setActiveTab('events')} 
            className={`btn ${activeTab === 'events' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Events
          </button>
          <button 
            onClick={() => setActiveTab('stories')} 
            className={`btn ${activeTab === 'stories' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Success Stories
          </button>
        </div>

        {activeTab === 'directory' && (
          <div>
            <div className="card">
              <h2>Alumni Directory</h2>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Search by name, company, or batch year..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ marginBottom: '20px' }}
                />
              </div>
              
              <div className="grid">
                {filteredAlumni.map(alumni => (
                  <div key={alumni.id} className="card">
                    <h3>{alumni.name}</h3>
                    <p><strong>Batch:</strong> {alumni.batch}</p>
                    <p><strong>Department:</strong> {alumni.department}</p>
                    <p><strong>Company:</strong> {alumni.company}</p>
                    <p><strong>Position:</strong> {alumni.position}</p>
                    <p><strong>Email:</strong> {alumni.email}</p>
                    <button className="btn btn-primary">Connect</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="card">
            <h2>Upcoming Events</h2>
            {events.map(event => (
              <div key={event.id} style={{ 
                padding: '20px', 
                borderBottom: '1px solid #eee',
                marginBottom: '15px'
              }}>
                <h3>{event.title}</h3>
                <p><strong>Date:</strong> {event.date}</p>
                <p>{event.description}</p>
                <button className="btn btn-success">Register</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="card">
            <h2>Success Stories</h2>
            
            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h3>From College to Silicon Valley</h3>
              <p><strong>Rahul Sharma, CSE Batch of 2020</strong></p>
              <p>
                "My journey from a computer science student to a Senior Software Engineer at Google has been transformative. 
                The rigorous curriculum, especially data structures and algorithms, along with the supportive faculty 
                prepared me well for the industry. The coding culture and technical festivals at our college 
                gave me the confidence to crack top tech interviews. Keep coding, keep learning!"
              </p>
            </div>

            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h3>Engineering Innovation at Tesla</h3>
              <p><strong>Vikram Singh, Mechanical Engineering Batch of 2020</strong></p>
              <p>
                "Working as a Mechanical Design Engineer at Tesla, I'm contributing to the future of sustainable transportation. 
                The strong foundation in thermodynamics, fluid mechanics, and design thinking from our college 
                has been invaluable. The hands-on projects and industry exposure helped me transition smoothly 
                into the automotive industry. Dream big and work hard!"
              </p>
            </div>

            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h3>Leading Product Innovation</h3>
              <p><strong>Priya Agarwal, CSE Batch of 2019</strong></p>
              <p>
                "As a Principal Product Manager at Microsoft, I lead teams building products used by millions globally. 
                The analytical thinking, project management skills, and technical depth I gained during my engineering 
                studies have been crucial. The college's emphasis on both technical and soft skills prepared me 
                for leadership roles. Focus on problem-solving, not just coding!"
              </p>
            </div>
          </div>
        )}

        <div className="card" style={{ marginTop: '30px', textAlign: 'center' }}>
          <h2>Join Our Alumni Network</h2>
          <p>Stay connected with your alma mater and fellow graduates</p>
          <div style={{ margin: '20px 0' }}>
            <button className="btn btn-primary" style={{ margin: '5px' }}>Register as Alumni</button>
            <button className="btn btn-success" style={{ margin: '5px' }}>Update Profile</button>
            <button className="btn btn-primary" style={{ margin: '5px' }}>Mentorship Program</button>
          </div>
        </div>
      </div>
    </div>
  );
}