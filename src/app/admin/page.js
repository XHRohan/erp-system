'use client';
import { useState, useEffect } from 'react';
import { users, classes, attendance, fees } from '../../data/mockData';
import { getAllPendingFees } from '../../data/feeData';
import { attendanceRecords } from '../../data/attendanceData';
import { subjects, getSubjectsByDepartment } from '../../data/subjects';
import { addNotice, deleteNotice, updateNotice, getAllNotices } from '../../data/noticesData';

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ name: '', department: '', subject: '', username: '', password: '' });
  const [showReports, setShowReports] = useState(false);
  const [reportType, setReportType] = useState('');
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [showManageNotices, setShowManageNotices] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', priority: 'medium' });
  const [notices, setNotices] = useState([]);
  const [editingNotice, setEditingNotice] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.role !== 'admin') {
      window.location.href = '/';
      return;
    }
    setCurrentUser(user);
    setTeachers(users.filter(u => u.role === 'teacher'));
    setNotices(getAllNotices());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();
    if (!newTeacher.subject) {
      alert('Please select a subject.');
      return;
    }
    const teacher = {
      id: Date.now(),
      ...newTeacher,
      role: 'teacher',
      classes: []
    };
    setTeachers([...teachers, teacher]);
    setNewTeacher({ name: '', department: '', subject: '', username: '', password: '' });
    setShowAddTeacher(false);
    alert('Professor added successfully!');
  };

  const handleAddNotice = (e) => {
    e.preventDefault();
    if (!newNotice.title.trim() || !newNotice.content.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    const notice = addNotice(newNotice.title, newNotice.content, currentUser.name, newNotice.priority);
    setNotices(getAllNotices());
    setNewNotice({ title: '', content: '', priority: 'medium' });
    setShowAddNotice(false);
    alert('Notice added successfully!');
  };

  const handleDeleteNotice = (noticeId) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      if (deleteNotice(noticeId)) {
        setNotices(getAllNotices());
        alert('Notice deleted successfully!');
      }
    }
  };

  const handleUpdateNotice = (e) => {
    e.preventDefault();
    if (!editingNotice.title.trim() || !editingNotice.content.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    if (updateNotice(editingNotice.id, editingNotice.title, editingNotice.content, editingNotice.priority)) {
      setNotices(getAllNotices());
      setEditingNotice(null);
      alert('Notice updated successfully!');
    }
  };

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <h1>Admin Dashboard</h1>
          <div className="navbar-right">
            <span>Welcome, {currentUser.name}</span>
            <button onClick={() => window.location.href = '/alumni'} className="btn btn-success">Alumni Corner</button>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="stats-responsive">
          <div className="stat-item">
            <div className="stat-number">{teachers.length}</div>
            <div className="stat-label">Professors</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{users.filter(u => u.role === 'student').length}</div>
            <div className="stat-label">Students</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{classes.length}</div>
            <div className="stat-label">Sections</div>
          </div>
        </div>

        <div className="admin-grid">
          <div className="card admin-reports-card">
            <h2 className="card-title">System Reports</h2>
            <div className="admin-card-buttons">
              <button
                className="btn btn-primary admin-btn-compact"
                onClick={() => {
                  setReportType('attendance');
                  setShowReports(true);
                }}
              >
                Attendance
              </button>
              <button
                className="btn btn-primary admin-btn-compact"
                onClick={() => {
                  setReportType('fees');
                  setShowReports(true);
                }}
              >
                Fee Collection
              </button>
              <button
                className="btn btn-primary admin-btn-compact"
                onClick={() => {
                  setReportType('academic');
                  setShowReports(true);
                }}
              >
                Academic
              </button>
            </div>

            <div className="quick-stats">
              <h4>Quick Stats</h4>
              <p>Total Collection: ₹{Object.values(fees).reduce((sum, fee) => sum + fee.paid, 0).toLocaleString()}</p>
              <p>Pending: ₹{Object.values(fees).reduce((sum, fee) => sum + fee.pending, 0).toLocaleString()}</p>
              <p>Avg Attendance: {(Object.values(attendance).reduce((sum, att) => sum + att.percentage, 0) / Object.values(attendance).length || 0).toFixed(1)}%</p>
            </div>
          </div>

          <div className="card">
            <h2 className="card-title">Professor Management</h2>
            <button
              onClick={() => setShowAddTeacher(true)}
              className="btn btn-primary admin-btn-compact"
              style={{ marginBottom: '15px' }}
            >
              Add New Professor
            </button>

            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Subject</th>
                    <th>Username</th>
                    <th>Sections</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map(teacher => (
                    <tr key={teacher.id}>
                      <td title={teacher.name}>{teacher.name}</td>
                      <td title={teacher.subject || teacher.subjects?.join(', ') || 'None'}>
                        {teacher.subject || teacher.subjects?.join(', ') || 'None'}
                      </td>
                      <td title={teacher.username}>{teacher.username}</td>
                      <td title={teacher.classes?.join(', ') || 'None'}>{teacher.classes?.join(', ') || 'None'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="card-title">Sections Overview</h2>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Section</th>
                    <th>Professor</th>
                    <th>Students</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map(cls => (
                    <tr key={cls.id}>
                      <td title={cls.name}>{cls.id}</td>
                      <td title={cls.teacher}>{cls.teacher}</td>
                      <td>{cls.students}</td>
                      <td title={cls.department}>{cls.department?.split(' ')[0] || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="card-title">Notice Management</h2>
            <div className="admin-card-buttons">
              <button
                onClick={() => setShowAddNotice(true)}
                className="btn btn-success admin-btn-compact"
              >
                Add New Notice
              </button>
              <button
                onClick={() => setShowManageNotices(true)}
                className="btn btn-primary admin-btn-compact"
              >
                Manage Notices
              </button>
            </div>

            <div className="quick-stats">
              <h4>Recent Notices</h4>
              {notices.slice(0, 3).map(notice => (
                <div key={notice.id} style={{ marginBottom: '8px', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <strong style={{ fontSize: '13px' }}>{notice.title}</strong>
                  <p style={{ fontSize: '12px', margin: '4px 0', color: '#666' }}>
                    {notice.content.length > 80 ? notice.content.substring(0, 80) + '...' : notice.content}
                  </p>
                  <small style={{ color: '#999' }}>{notice.date} - {notice.priority.toUpperCase()}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showAddTeacher && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div className="card" style={{ width: '90%', maxWidth: '400px' }}>
              <h3>Add New Professor</h3>
              <form onSubmit={handleAddTeacher}>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Department:</label>
                  <select
                    value={newTeacher.department}
                    onChange={(e) => {
                      setNewTeacher({ ...newTeacher, department: e.target.value, subject: '' });
                    }}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="CSE">Computer Science Engineering</option>
                    <option value="MECH">Mechanical Engineering</option>
                    <option value="MATH">Mathematics</option>
                    <option value="ENG">English</option>
                  </select>
                </div>

                {newTeacher.department && (
                  <div className="form-group">
                    <label>Subject:</label>
                    <select
                      value={newTeacher.subject}
                      onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                      required
                    >
                      <option value="">Select Subject</option>
                      {getSubjectsByDepartment(newTeacher.department).map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    value={newTeacher.username}
                    onChange={(e) => setNewTeacher({ ...newTeacher, username: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    value={newTeacher.password}
                    onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-modal-buttons">
                  <button type="submit" className="btn btn-success">Add Professor</button>
                  <button
                    type="button"
                    onClick={() => setShowAddTeacher(false)}
                    className="btn btn-danger"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showReports && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div className="card" style={{ width: '90%', maxWidth: '800px', maxHeight: '80vh', overflow: 'auto' }}>
              <h3>{reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h3>

              {reportType === 'attendance' && (
                <div>
                  <h4>Class-wise Attendance Summary</h4>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Class</th>
                        <th>Total Days</th>
                        <th>Students Tracked</th>
                        <th>Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(attendanceRecords).map(className => {
                        const classData = attendanceRecords[className];
                        const dates = Object.keys(classData);
                        const lastDate = dates.sort().pop();
                        const studentsCount = lastDate ? Object.keys(classData[lastDate]).length : 0;

                        return (
                          <tr key={className}>
                            <td>{className}</td>
                            <td>{dates.length}</td>
                            <td>{studentsCount}</td>
                            <td>{lastDate || 'No records'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {reportType === 'fees' && (
                <div>
                  <h4>Fee Collection Summary</h4>
                  <div className="stats">
                    <div className="stat-item">
                      <div className="stat-number">₹{Object.values(fees).reduce((sum, fee) => sum + fee.paid, 0).toLocaleString()}</div>
                      <div className="stat-label">Total Collected</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">₹{Object.values(fees).reduce((sum, fee) => sum + fee.pending, 0).toLocaleString()}</div>
                      <div className="stat-label">Total Pending</div>
                    </div>
                  </div>

                  <h4>Pending Payments</h4>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Semester</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getAllPendingFees().map(payment => {
                        const student = users.find(u => u.username === payment.studentUsername);
                        return (
                          <tr key={`${payment.studentUsername}-${payment.id}`}>
                            <td>{student?.name || payment.studentUsername}</td>
                            <td>₹{payment.amount}</td>
                            <td>2025-02-15</td>
                            <td>{payment.semester}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {reportType === 'academic' && (
                <div>
                  <h4>Academic Overview</h4>
                  <div className="stats">
                    <div className="stat-item">
                      <div className="stat-number">{classes.length}</div>
                      <div className="stat-label">Total Classes</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">{users.filter(u => u.role === 'student').length}</div>
                      <div className="stat-label">Total Students</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">{teachers.length}</div>
                      <div className="stat-label">Total Teachers</div>
                    </div>
                  </div>

                  <h4>Department-wise Distribution</h4>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Department</th>
                        <th>Classes</th>
                        <th>Students</th>
                        <th>Teachers</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Computer Science</td>
                        <td>{classes.filter(c => c.id.startsWith('CSE')).length}</td>
                        <td>{users.filter(u => u.role === 'student' && u.department === 'Computer Science').length}</td>
                        <td>{teachers.filter(t => t.department === 'CSE').length}</td>
                      </tr>
                      <tr>
                        <td>Mechanical Engineering</td>
                        <td>{classes.filter(c => c.id.startsWith('MECH')).length}</td>
                        <td>{users.filter(u => u.role === 'student' && u.department === 'Mechanical Engineering').length}</td>
                        <td>{teachers.filter(t => t.department === 'MECH').length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div className="admin-modal-buttons">
                <button
                  onClick={() => setShowReports(false)}
                  className="btn btn-danger"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddNotice && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div className="card" style={{ width: '90%', maxWidth: '500px' }}>
              <h3>Add New Notice</h3>
              <form onSubmit={handleAddNotice}>
                <div className="form-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    required
                    placeholder="Enter notice title"
                  />
                </div>
                <div className="form-group">
                  <label>Content:</label>
                  <textarea
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                    required
                    rows="4"
                    placeholder="Enter notice content"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e9ecef', borderRadius: '8px', resize: 'vertical' }}
                  />
                </div>
                <div className="form-group">
                  <label>Priority:</label>
                  <select
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="admin-modal-buttons">
                  <button type="submit" className="btn btn-success">Add Notice</button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddNotice(false);
                      setNewNotice({ title: '', content: '', priority: 'medium' });
                    }}
                    className="btn btn-danger"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showManageNotices && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div className="card" style={{ width: '90%', maxWidth: '800px', maxHeight: '80vh', overflow: 'auto' }}>
              <h3>Manage Notices</h3>

              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Priority</th>
                      <th>Author</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notices.map(notice => (
                      <tr key={notice.id}>
                        <td title={notice.title}>
                          {notice.title.length > 30 ? notice.title.substring(0, 30) + '...' : notice.title}
                        </td>
                        <td>{notice.date}</td>
                        <td>
                          <span className={`status-badge ${notice.priority === 'high' ? 'status-danger' :
                              notice.priority === 'medium' ? 'status-warning' : 'status-info'
                            }`}>
                            {notice.priority.toUpperCase()}
                          </span>
                        </td>
                        <td>{notice.author}</td>
                        <td>
                          <div className="admin-table-actions">
                            <button
                              onClick={() => setEditingNotice({ ...notice })}
                              className="btn btn-primary admin-action-btn"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteNotice(notice.id)}
                              className="btn btn-danger admin-action-btn"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="admin-modal-buttons">
                <button
                  onClick={() => setShowManageNotices(false)}
                  className="btn btn-danger"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {editingNotice && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div className="card" style={{ width: '90%', maxWidth: '500px' }}>
              <h3>Edit Notice</h3>
              <form onSubmit={handleUpdateNotice}>
                <div className="form-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    value={editingNotice.title}
                    onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Content:</label>
                  <textarea
                    value={editingNotice.content}
                    onChange={(e) => setEditingNotice({ ...editingNotice, content: e.target.value })}
                    required
                    rows="4"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e9ecef', borderRadius: '8px', resize: 'vertical' }}
                  />
                </div>
                <div className="form-group">
                  <label>Priority:</label>
                  <select
                    value={editingNotice.priority}
                    onChange={(e) => setEditingNotice({ ...editingNotice, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="admin-modal-buttons">
                  <button type="submit" className="btn btn-success">Update Notice</button>
                  <button
                    type="button"
                    onClick={() => setEditingNotice(null)}
                    className="btn btn-danger"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}