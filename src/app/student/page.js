'use client';
import { useState, useEffect } from 'react';
import { timetable, attendance, fees, grades, assignments, users } from '../../data/mockData';
import { getAllNotices } from '../../data/noticesData';
import { calculateAttendancePercentage, getStudentAttendanceHistory, getStudentAttendanceBySubject, calculateAttendancePercentageBySubject } from '../../data/attendanceData';
import { submitAssignment, getStudentAssignmentStatus } from '../../data/assignmentData';
import { makePayment, getFeeSummary, payAllPendingFees } from '../../data/feeData';

export default function StudentDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSubmitAssignment, setShowSubmitAssignment] = useState(false);
  const [selectedAssignmentForSubmission, setSelectedAssignmentForSubmission] = useState(null);
  const [submissionFile, setSubmissionFile] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('');
  const [selectedDateFilter, setSelectedDateFilter] = useState('');
  const [feeData, setFeeData] = useState(null);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.role !== 'student') {
      window.location.href = '/';
      return;
    }
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setFeeData(getFeeSummary(currentUser.username));
    }
    setNotices(getAllNotices());
  }, [currentUser]);

  // Refresh notices when notices tab is accessed
  useEffect(() => {
    if (activeTab === 'notices') {
      setNotices(getAllNotices());
    }
  }, [activeTab]);

  // Auto-refresh notices every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setNotices(getAllNotices());
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  if (!currentUser) return <div>Loading...</div>;

  const studentAttendance = calculateAttendancePercentage(currentUser.username, currentUser.class);
  const attendanceHistory = getStudentAttendanceHistory(currentUser.username, currentUser.class);
  const studentFeeSummary = feeData || { total: 0, paid: 0, pending: 0, payments: [] };
  const studentTimetable = timetable[currentUser.class] || [];
  const studentGrades = grades[currentUser.username] || { subjects: {}, overall: { percentage: 0, grade: 'N/A' } };
  const studentAssignments = assignments.filter(a => a.class === currentUser.class);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <h1>Student Portal</h1>
          <div className="navbar-right">
            <span>Welcome, {currentUser.name}</span>
            <button onClick={() => window.location.href = '/alumni'} className="btn btn-success">Alumni Corner</button>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="tab-navigation">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('timetable')}
            className={`tab-button ${activeTab === 'timetable' ? 'active' : ''}`}
          >
            Timetable
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`tab-button ${activeTab === 'attendance' ? 'active' : ''}`}
          >
            Attendance
          </button>
          <button
            onClick={() => setActiveTab('notices')}
            className={`tab-button ${activeTab === 'notices' ? 'active' : ''}`}
          >
            Notices
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`tab-button ${activeTab === 'fees' ? 'active' : ''}`}
          >
            Fees
          </button>
          <button
            onClick={() => setActiveTab('grades')}
            className={`tab-button ${activeTab === 'grades' ? 'active' : ''}`}
          >
            Grades
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`tab-button ${activeTab === 'assignments' ? 'active' : ''}`}
          >
            Assignments
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <div className="stats">
              <div className="stat-item">
                <div className="stat-number">{currentUser.year}</div>
                <div className="stat-label">Year</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{currentUser.rollNo}</div>
                <div className="stat-label">Roll Number</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{currentUser.department}</div>
                <div className="stat-label">Department</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{studentAttendance.percentage}%</div>
                <div className="stat-label">Attendance</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">₹{studentFeeSummary.pending}</div>
                <div className="stat-label">Pending Fees</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{studentGrades.overall.percentage}%</div>
                <div className="stat-label">Overall Grade</div>
              </div>
            </div>

            <div className="grid">
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h2>Recent Notices</h2>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setNotices(getAllNotices());
                      setActiveTab('notices');
                    }}
                    style={{ fontSize: '11px', padding: '4px 8px' }}
                  >
                    View All
                  </button>
                </div>
                {notices.slice(0, 3).map(notice => (
                  <div key={notice.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
                      <h4 style={{ margin: 0, fontSize: '16px' }}>{notice.title}</h4>
                      {notice.priority && (
                        <span className={`status-badge ${notice.priority === 'high' ? 'status-danger' :
                            notice.priority === 'medium' ? 'status-warning' : 'status-info'
                          }`} style={{ fontSize: '10px' }}>
                          {notice.priority.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}>
                      {notice.content.length > 100 ? notice.content.substring(0, 100) + '...' : notice.content}
                    </p>
                    <small style={{ color: '#666' }}>{notice.date}</small>
                  </div>
                ))}
                {notices.length === 0 && (
                  <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                    No notices available.
                  </p>
                )}
              </div>

              <div className="card">
                <h2>Quick Info</h2>
                <div style={{ padding: '10px' }}>
                  <p><strong>Name:</strong> {currentUser.name}</p>
                  <p><strong>Class:</strong> {currentUser.class}</p>
                  <p><strong>Roll No:</strong> {currentUser.rollNo}</p>
                  <p><strong>Attendance:</strong> {studentAttendance.present}/{studentAttendance.total} ({studentAttendance.percentage}%)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timetable' && (
          <div className="card">
            <h2>Class Timetable - {currentUser.class}</h2>
            <div className="schedule-table-wrapper">
              <table className="table schedule-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                  </tr>
                </thead>
                <tbody>
                  {studentTimetable.map(day =>
                    day.periods.map((period, index) => {
                      const teacher = users.find(u => u.username === period.teacher);
                      return (
                        <tr key={`${day.day}-${index}`}>
                          <td><strong>{day.day}</strong></td>
                          <td>{period.time}</td>
                          <td>{period.subject}</td>
                          <td>{teacher?.name || period.teacher || 'N/A'}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div>
            <div className="card">
              <h2>Attendance Summary</h2>
              <div className="stats">
                <div className="stat-item">
                  <div className="stat-number">{studentAttendance.present}</div>
                  <div className="stat-label">Present Days</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{studentAttendance.total - studentAttendance.present}</div>
                  <div className="stat-label">Absent Days</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{studentAttendance.total}</div>
                  <div className="stat-label">Total Days</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{studentAttendance.percentage}%</div>
                  <div className="stat-label">Percentage</div>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <div style={{
                  width: '100%',
                  height: '20px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${studentAttendance.percentage}%`,
                    height: '100%',
                    backgroundColor: studentAttendance.percentage >= 75 ? '#28a745' : '#dc3545',
                    borderRadius: '10px'
                  }}></div>
                </div>
                <p style={{ marginTop: '10px', textAlign: 'center' }}>
                  {studentAttendance.percentage >= 75 ?
                    'Good attendance! Keep it up.' :
                    'Low attendance. Please improve to avoid issues.'
                  }
                </p>
              </div>
            </div>

            <div className="card">
              <h2>Attendance History</h2>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div className="form-group" style={{ minWidth: '200px', margin: 0 }}>
                  <label>Filter by Subject:</label>
                  <select
                    value={selectedSubjectFilter}
                    onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    {[...new Set(attendanceHistory.map(record => record.subject))].map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ minWidth: '150px', margin: 0 }}>
                  <label>Filter by Date:</label>
                  <input
                    type="date"
                    value={selectedDateFilter}
                    onChange={(e) => setSelectedDateFilter(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'end' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setSelectedSubjectFilter('');
                      setSelectedDateFilter('');
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceHistory
                    .filter(record => {
                      const matchesSubject = !selectedSubjectFilter || record.subject === selectedSubjectFilter;
                      const matchesDate = !selectedDateFilter || record.date === selectedDateFilter;
                      return matchesSubject && matchesDate;
                    })
                    .slice(0, 20)
                    .map((record, index) => {
                      const teacher = users.find(u => u.username === record.teacher);
                      return (
                        <tr key={index}>
                          <td>{record.date}</td>
                          <td>{record.subject}</td>
                          <td>{teacher?.name || record.teacher}</td>
                          <td>
                            <span className={`status-badge ${record.present ? 'status-success' : 'status-danger'}`}>
                              {record.present ? 'Present' : 'Absent'}
                            </span>
                          </td>
                          <td>{record.time || 'N/A'}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {attendanceHistory.length === 0 && (
                <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                  No attendance records found.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'notices' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>All Notices</h2>
              <button
                className="btn btn-primary"
                onClick={() => setNotices(getAllNotices())}
                style={{ fontSize: '12px', padding: '6px 12px' }}
              >
                Refresh
              </button>
            </div>
            {notices.map(notice => (
              <div key={notice.id} style={{
                padding: '15px',
                borderBottom: '1px solid #eee',
                marginBottom: '10px'
              }}>
                <h3>{notice.title}</h3>
                <p style={{ margin: '10px 0' }}>{notice.content}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <small style={{ color: '#666' }}>Posted on: {notice.date}</small>
                  {notice.priority && (
                    <span className={`status-badge ${notice.priority === 'high' ? 'status-danger' :
                        notice.priority === 'medium' ? 'status-warning' : 'status-info'
                      }`}>
                      {notice.priority.toUpperCase()}
                    </span>
                  )}
                </div>
                {notice.author && (
                  <small style={{ color: '#999', fontStyle: 'italic' }}>By: {notice.author}</small>
                )}
              </div>
            ))}
            {notices.length === 0 && (
              <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                No notices available at the moment.
              </p>
            )}
          </div>
        )}

        {activeTab === 'fees' && (
          <div>
            <div className="card">
              <h2>Fee Summary</h2>
              <div className="stats">
                <div className="stat-item">
                  <div className="stat-number">₹{studentFeeSummary.total}</div>
                  <div className="stat-label">Total Fees</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">₹{studentFeeSummary.paid}</div>
                  <div className="stat-label">Paid Amount</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">₹{studentFeeSummary.pending}</div>
                  <div className="stat-label">Pending Amount</div>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <h3>Payment Status</h3>
                <div style={{
                  padding: '20px',
                  backgroundColor: studentFeeSummary.pending > 0 ? '#fff3cd' : '#d4edda',
                  border: `1px solid ${studentFeeSummary.pending > 0 ? '#ffeaa7' : '#c3e6cb'}`,
                  borderRadius: '4px',
                  marginTop: '10px'
                }}>
                  {studentFeeSummary.pending > 0 ? (
                    <div>
                      <p><strong>Payment Due!</strong></p>
                      <p>Amount: ₹{studentFeeSummary.pending}</p>
                      <div className="btn-group" style={{ marginTop: '10px' }}>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            if (studentFeeSummary.pending > 0) {
                              if (payAllPendingFees(currentUser.username)) {
                                alert('Payment successful! Thank you.');
                                // Update the fee data state to reflect the payment
                                setFeeData(getFeeSummary(currentUser.username));
                              } else {
                                alert('Payment failed. Please try again.');
                              }
                            } else {
                              alert('No pending fees to pay.');
                            }
                          }}
                        >
                          Pay Now
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p><strong>All fees paid!</strong></p>
                      <p>Thank you for your payment.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="card">
              <h2>Payment History</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Semester</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentFeeSummary.payments.map(payment => (
                    <tr key={payment.id}>
                      <td>{payment.date || 'Pending'}</td>
                      <td>₹{payment.amount}</td>
                      <td>{payment.type}</td>
                      <td>{payment.semester}</td>
                      <td>
                        <span className={`status-badge ${payment.status === 'paid' ? 'status-success' : 'status-warning'}`}>
                          {payment.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'grades' && (
          <div>
            <div className="card">
              <h2>Academic Performance</h2>
              <div className="stats">
                <div className="stat-item">
                  <div className="stat-number">{studentGrades.overall.percentage}%</div>
                  <div className="stat-label">Overall Percentage</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{studentGrades.overall.grade}</div>
                  <div className="stat-label">Overall Grade</div>
                </div>
              </div>
            </div>

            <div className="card">
              <h2>Subject-wise Marks</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Marks Obtained</th>
                    <th>Max Marks</th>
                    <th>Percentage</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(studentGrades.subjects).map(([subject, data]) => (
                    <tr key={subject}>
                      <td>{subject}</td>
                      <td>{data.marks}</td>
                      <td>{data.maxMarks}</td>
                      <td>{((data.marks / data.maxMarks) * 100).toFixed(1)}%</td>
                      <td>{data.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="card">
            <h2>Assignments</h2>
            <div className="grid">
              {studentAssignments.map(assignment => {
                const submissionStatus = getStudentAssignmentStatus(assignment.id, currentUser.username);
                return (
                  <div key={assignment.id} className="card">
                    <h3>{assignment.title}</h3>
                    <p><strong>Subject:</strong> {assignment.subject}</p>
                    <p><strong>Due Date:</strong> {assignment.dueDate}</p>
                    <p><strong>Max Marks:</strong> {assignment.marks}</p>
                    <p><strong>Status:</strong>
                      <span className={`status-badge ${submissionStatus.submitted ? 'status-success' : 'status-warning'}`}>
                        {submissionStatus.submitted ? 'SUBMITTED' : 'PENDING'}
                      </span>
                    </p>

                    {submissionStatus.submitted ? (
                      <div style={{ marginTop: '15px' }}>
                        <p><strong>Submitted On:</strong> {submissionStatus.submissionDate}</p>
                        <p><strong>File:</strong> {submissionStatus.file}</p>
                        {submissionStatus.grade && (
                          <div>
                            <p><strong>Grade:</strong> {submissionStatus.grade}/{assignment.marks}</p>
                            {submissionStatus.feedback && (
                              <p><strong>Feedback:</strong> {submissionStatus.feedback}</p>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="btn-group">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setSelectedAssignmentForSubmission(assignment);
                            setShowSubmitAssignment(true);
                          }}
                        >
                          Submit Assignment
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {showSubmitAssignment && selectedAssignmentForSubmission && (
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
            <div className="card" style={{ width: '400px' }}>
              <h3>Submit Assignment</h3>
              <p><strong>Assignment:</strong> {selectedAssignmentForSubmission.title}</p>
              <p><strong>Subject:</strong> {selectedAssignmentForSubmission.subject}</p>
              <p><strong>Due Date:</strong> {selectedAssignmentForSubmission.dueDate}</p>
              <p><strong>Max Marks:</strong> {selectedAssignmentForSubmission.marks}</p>

              <div className="form-group">
                <label>File Name:</label>
                <input
                  type="text"
                  value={submissionFile}
                  onChange={(e) => setSubmissionFile(e.target.value)}
                  placeholder="Enter file name (e.g., assignment1.pdf)"
                  required
                />
              </div>

              <div className="btn-group">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    if (submissionFile.trim()) {
                      if (submitAssignment(selectedAssignmentForSubmission.id, currentUser.username, submissionFile)) {
                        alert('Assignment submitted successfully!');
                        setShowSubmitAssignment(false);
                        setSelectedAssignmentForSubmission(null);
                        setSubmissionFile('');
                      }
                    } else {
                      alert('Please enter a file name.');
                    }
                  }}
                >
                  Submit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setShowSubmitAssignment(false);
                    setSelectedAssignmentForSubmission(null);
                    setSubmissionFile('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}