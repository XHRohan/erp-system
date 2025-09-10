'use client';
import { useState, useEffect } from 'react';
import { users, classes, timetable, assignments, grades } from '../../data/mockData';
import { addAttendanceRecord, getAttendanceByDateAndSubject, calculateAttendancePercentage, getTeacherSubjects, getTeacherAttendanceStatus, getTeacherPendingAttendance, isTodayAttendanceMarked } from '../../data/attendanceData';
import { getAssignmentSubmissions, gradeAssignment } from '../../data/assignmentData';
import { subjects, getSubjectsByDepartment } from '../../data/subjects';

export default function TeacherDashboard() {
    const [currentUser, setCurrentUser] = useState(null);
    const [students, setStudents] = useState([]);
    const [showAddStudent, setShowAddStudent] = useState(false);
    const [showAttendance, setShowAttendance] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [newStudent, setNewStudent] = useState({ name: '', rollNo: '', username: '', password: '', class: '' });
    const [attendanceData, setAttendanceData] = useState({});
    const [showCreateAssignment, setShowCreateAssignment] = useState(false);
    const [newAssignment, setNewAssignment] = useState({ title: '', subject: '', dueDate: '', class: '' });
    const [showSubmissions, setShowSubmissions] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [gradingData, setGradingData] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (user.role !== 'teacher') {
            window.location.href = '/';
            return;
        }
        setCurrentUser(user);
        setStudents(users.filter(u => u.role === 'student'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        window.location.href = '/';
    };

    const handleAddStudent = (e) => {
        e.preventDefault();
        const student = {
            id: Date.now(),
            ...newStudent,
            role: 'student'
        };
        setStudents([...students, student]);
        setNewStudent({ name: '', rollNo: '', username: '', password: '', class: '' });
        setShowAddStudent(false);
        alert('Student added successfully!');
    };

    const handleAttendanceChange = (studentUsername, present) => {
        setAttendanceData({
            ...attendanceData,
            [studentUsername]: present
        });
    };

    const submitAttendance = () => {
        if (!selectedSubject) {
            alert('Please select a subject first.');
            return;
        }
        
        let successCount = 0;
        
        Object.keys(attendanceData).forEach(studentUsername => {
            const isPresent = attendanceData[studentUsername];
            if (addAttendanceRecord(selectedClass, selectedDate, selectedSubject, currentUser.username, studentUsername, isPresent)) {
                successCount++;
            }
        });
        
        if (successCount > 0) {
            alert(`Attendance marked successfully for ${successCount} students in ${selectedSubject}!`);
            setShowAttendance(false);
            setAttendanceData({});
            setSelectedClass('');
            setSelectedSubject('');
        } else {
            alert('Please mark attendance for at least one student.');
        }
    };

    const handleCreateAssignment = (e) => {
        e.preventDefault();
        const assignment = {
            id: Date.now(),
            ...newAssignment,
            status: 'pending'
        };
        alert('Assignment created successfully!');
        setNewAssignment({ title: '', subject: '', dueDate: '', class: '' });
        setShowCreateAssignment(false);
    };

    if (!currentUser) return <div>Loading...</div>;

    const myClasses = currentUser.classes || [];
    const myStudents = students.filter(s => myClasses.includes(s.class));
    const classStudents = selectedClass ? students.filter(s => s.class === selectedClass) : [];
    const myAssignments = assignments.filter(a => myClasses.includes(a.class));

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-content">
                    <h1>Professor Dashboard</h1>
                    <div className="navbar-right">
                        <span>Welcome, {currentUser.name}</span>
                        <button onClick={() => window.location.href = '/alumni'} className="btn btn-success">Alumni Corner</button>
                        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                    </div>
                </div>
            </nav>

            <div className="container">
                <div className="stats">
                    <div className="stat-item">
                        <div className="stat-number">{myClasses.length}</div>
                        <div className="stat-label">My Classes</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">{myStudents.length}</div>
                        <div className="stat-label">My Students</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">1</div>
                        <div className="stat-label">My Subject</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">
                            {getTeacherPendingAttendance(currentUser.username, myClasses, [currentUser.subject])
                                .reduce((total, item) => total + item.pendingCount, 0)}
                        </div>
                        <div className="stat-label">Pending Days</div>
                    </div>
                </div>

                {/* Today's Attendance Status */}
                <div className="today-status-container">
                    {myClasses.map(className => {
                        const subject = currentUser.subject;
                        const todayMarked = isTodayAttendanceMarked(currentUser.username, className, subject);
                        return (
                            <div key={`${className}-${subject}`} className={`today-status ${todayMarked ? 'completed' : 'pending'}`}>
                                <span className="today-status-icon">{todayMarked ? '✅' : '⏰'}</span>
                                <span>
                                    {className} - {subject}: {todayMarked ? 'Attendance Marked' : 'Pending for Today'}
                                </span>
                                {!todayMarked && (
                                    <button
                                        onClick={() => {
                                            setSelectedClass(className);
                                            setSelectedSubject(subject);
                                            setSelectedDate(new Date().toISOString().split('T')[0]);
                                            setShowAttendance(true);
                                        }}
                                        className="btn btn-primary"
                                        style={{ marginLeft: 'auto', fontSize: '12px', padding: '4px 8px' }}
                                    >
                                        Mark Now
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="grid">
                    <div className="card">
                        <h2>Attendance Overview</h2>
                        <div className="attendance-overview">
                            {myClasses.map(className => {
                                const subject = currentUser.subject;
                                const attendanceStatus = getTeacherAttendanceStatus(currentUser.username, className, subject);
                                const todayMarked = isTodayAttendanceMarked(currentUser.username, className, subject);
                                
                                return (
                                    <div key={className} className="class-attendance-card">
                                        <h4>{className}</h4>
                                        <div className="subject-attendance-row">
                                            <div className="subject-info">
                                                <span className="subject-name">{subject}</span>
                                                <div className="attendance-stats">
                                                    <span className="marked-count">{attendanceStatus.markedCount} marked</span>
                                                    <span className="pending-count">{attendanceStatus.pendingCount} pending</span>
                                                    {todayMarked ? (
                                                        <span className="status-badge status-success">Today ✓</span>
                                                    ) : (
                                                        <span className="status-badge status-warning">Today Pending</span>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setSelectedClass(className);
                                                    setSelectedSubject(subject);
                                                    setShowAttendance(true);
                                                }}
                                                className={`btn ${todayMarked ? 'btn-secondary' : 'btn-primary'}`}
                                                style={{ fontSize: '12px', padding: '6px 12px' }}
                                            >
                                                {todayMarked ? 'Update' : 'Mark'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="card">
                        <h2>My Classes</h2>
                        {myClasses.map(className => {
                            return (
                                <div key={className} className="class-card">
                                    <h3>{className}</h3>
                                    <p>Students: {students.filter(s => s.class === className).length}</p>
                                    <p>My Subject: {currentUser.subject || 'None'}</p>
                                    <div className="btn-group">
                                        <button
                                            onClick={() => {
                                                setSelectedClass(className);
                                                setShowAttendance(true);
                                            }}
                                            className="btn btn-primary"
                                        >
                                            Mark Attendance
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="card">
                        <h2>Student Management</h2>
                        <div className="btn-group">
                            <button
                                onClick={() => setShowAddStudent(true)}
                                className="btn btn-success"
                            >
                                Add New Student
                            </button>
                        </div>

                        <div className="table-responsive">
                            <table className="table student-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Roll No</th>
                                        <th>Class</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myStudents.map(student => (
                                        <tr key={student.id}>
                                            <td title={student.name}>{student.name}</td>
                                            <td title={student.rollNo}>{student.rollNo}</td>
                                            <td title={student.class}>{student.class}</td>
                                            <td title={student.username}>{student.username}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card">
                        <h2>My Schedule</h2>
                        {myClasses.length > 0 ? (
                            <div className="schedule-table-wrapper">
                                <table className="table schedule-table">
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            <th>Time</th>
                                            <th>Subject</th>
                                            <th>Class</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myClasses.map(className => 
                                            timetable[className]?.map(day => 
                                                day.periods
                                                    .filter(period => period.teacher === currentUser.username && period.subject === currentUser.subject)
                                                    .map((period, index) => (
                                                        <tr key={`${className}-${day.day}-${index}`}>
                                                            <td><strong>{day.day}</strong></td>
                                                            <td>{period.time}</td>
                                                            <td>{period.subject}</td>
                                                            <td>{className}</td>
                                                        </tr>
                                                    ))
                                            )
                                        ).flat().filter(Boolean)}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No schedule available</p>
                        )}
                    </div>

                    <div className="card">
                        <h2>Assignments</h2>
                        <div className="btn-group">
                            <button
                                onClick={() => setShowCreateAssignment(true)}
                                className="btn btn-success"
                            >
                                Create Assignment
                            </button>
                        </div>

                        <div className="assignments-grid">
                            {myAssignments.map(assignment => (
                                <div key={assignment.id} className="assignment-card">
                                    <div className="assignment-header">
                                        <h4>{assignment.title}</h4>
                                        <span className={`status-badge ${assignment.status === 'submitted' ? 'status-success' : 'status-warning'}`}>
                                            {assignment.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="assignment-details">
                                        <p><strong>Subject:</strong> {assignment.subject}</p>
                                        <p><strong>Class:</strong> {assignment.class}</p>
                                        <p><strong>Due:</strong> {assignment.dueDate}</p>
                                        <p><strong>Marks:</strong> {assignment.marks}</p>
                                    </div>
                                    <div className="btn-group">
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setSelectedAssignment(assignment);
                                                setShowSubmissions(true);
                                            }}
                                        >
                                            View Submissions
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {showAddStudent && (
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
                            <h3>Add New Student</h3>
                            <form onSubmit={handleAddStudent}>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        value={newStudent.name}
                                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Roll Number:</label>
                                    <input
                                        type="text"
                                        value={newStudent.rollNo}
                                        onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Class:</label>
                                    <select
                                        value={newStudent.class}
                                        onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Class</option>
                                        {myClasses.map(cls => (
                                            <option key={cls} value={cls}>{cls}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Username:</label>
                                    <input
                                        type="text"
                                        value={newStudent.username}
                                        onChange={(e) => setNewStudent({ ...newStudent, username: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        value={newStudent.password}
                                        onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="btn-group">
                                    <button type="submit" className="btn btn-success">Add Student</button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddStudent(false)}
                                        className="btn btn-danger"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showAttendance && (
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
                        <div className="card" style={{ width: '600px', maxHeight: '80vh', overflow: 'auto' }}>
                            <h3>Mark Attendance - {selectedClass}</h3>
                            
                            <div className="form-group">
                                <label>Date:</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Subject:</label>
                                <select
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    required
                                >
                                    <option value="">Select Subject</option>
                                    <option value={currentUser.subject}>{currentUser.subject}</option>
                                </select>
                            </div>

                            {selectedSubject && (
                                <div>
                                    <p><strong>Marking attendance for:</strong> {selectedSubject} on {selectedDate}</p>
                                    
                                    {/* Show recent attendance status */}
                                    <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                                        <h5 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#495057' }}>Recent Status:</h5>
                                        {(() => {
                                            const status = getTeacherAttendanceStatus(currentUser.username, selectedClass, selectedSubject);
                                            return (
                                                <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
                                                    <span style={{ color: '#28a745' }}>✓ {status.markedCount} days marked</span>
                                                    <span style={{ color: '#dc3545' }}>⏳ {status.pendingCount} days pending</span>
                                                    <span style={{ color: '#6c757d' }}>📅 Last 30 working days</span>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                    
                                    <table className="table">
                                <thead>
                                    <tr>
                                        <th>Roll No</th>
                                        <th>Name</th>
                                        <th>Present</th>
                                        <th>Absent</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classStudents.map(student => {
                                        const attendanceStats = calculateAttendancePercentage(student.username, selectedClass);
                                        return (
                                            <tr key={student.id}>
                                                <td>{student.rollNo}</td>
                                                <td>{student.name}</td>
                                                <td>
                                                    <input
                                                        type="radio"
                                                        name={`attendance_${student.username}`}
                                                        onChange={() => handleAttendanceChange(student.username, true)}
                                                        checked={attendanceData[student.username] === true}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="radio"
                                                        name={`attendance_${student.username}`}
                                                        onChange={() => handleAttendanceChange(student.username, false)}
                                                        checked={attendanceData[student.username] === false}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                                </div>
                            )}

                            <div className="btn-group" style={{ marginTop: '20px' }}>
                                <button onClick={submitAttendance} className="btn btn-success" disabled={!selectedSubject}>
                                    Submit Attendance
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAttendance(false);
                                        setSelectedSubject('');
                                        setAttendanceData({});
                                    }}
                                    className="btn btn-danger"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showCreateAssignment && (
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
                            <h3>Create New Assignment</h3>
                            <form onSubmit={handleCreateAssignment}>
                                <div className="form-group">
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        value={newAssignment.title}
                                        onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Subject:</label>
                                    <select
                                        value={newAssignment.subject}
                                        onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Subject</option>
                                        <option value={currentUser.subject}>{currentUser.subject}</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Class:</label>
                                    <select
                                        value={newAssignment.class}
                                        onChange={(e) => setNewAssignment({ ...newAssignment, class: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Class</option>
                                        {myClasses.map(cls => (
                                            <option key={cls} value={cls}>{cls}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Due Date:</label>
                                    <input
                                        type="date"
                                        value={newAssignment.dueDate}
                                        onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="btn-group">
                                    <button type="submit" className="btn btn-success">Create Assignment</button>
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateAssignment(false)}
                                        className="btn btn-danger"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showSubmissions && selectedAssignment && (
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
                        <div className="card" style={{ width: '600px', maxHeight: '80vh', overflow: 'auto' }}>
                            <h3>Assignment Submissions - {selectedAssignment.title}</h3>
                            <p><strong>Subject:</strong> {selectedAssignment.subject}</p>
                            <p><strong>Due Date:</strong> {selectedAssignment.dueDate}</p>
                            <p><strong>Total Marks:</strong> {selectedAssignment.marks}</p>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Status</th>
                                        <th>Submitted On</th>
                                        <th>File</th>
                                        <th>Grade</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myStudents.filter(s => s.class === selectedAssignment.class).map(student => {
                                        const submission = getAssignmentSubmissions(selectedAssignment.id)[student.username] || {
                                            submitted: false,
                                            submissionDate: null,
                                            file: null,
                                            grade: null,
                                            feedback: null
                                        };
                                        
                                        return (
                                            <tr key={student.username}>
                                                <td>{student.name}</td>
                                                <td>
                                                    <span className={`status-badge ${submission.submitted ? 'status-success' : 'status-warning'}`}>
                                                        {submission.submitted ? 'Submitted' : 'Pending'}
                                                    </span>
                                                </td>
                                                <td>{submission.submissionDate || 'Not submitted'}</td>
                                                <td>{submission.file || 'No file'}</td>
                                                <td>
                                                    {submission.submitted ? (
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max={selectedAssignment.marks}
                                                            value={gradingData[student.username]?.grade || submission.grade || ''}
                                                            onChange={(e) => setGradingData({
                                                                ...gradingData,
                                                                [student.username]: {
                                                                    ...gradingData[student.username],
                                                                    grade: parseInt(e.target.value)
                                                                }
                                                            })}
                                                            style={{ width: '60px', padding: '4px' }}
                                                        />
                                                    ) : (
                                                        'N/A'
                                                    )}
                                                </td>
                                                <td>
                                                    {submission.submitted && (
                                                        <button
                                                            className="btn btn-success"
                                                            style={{ fontSize: '12px', padding: '4px 8px' }}
                                                            onClick={() => {
                                                                const grade = gradingData[student.username]?.grade || submission.grade;
                                                                const feedback = gradingData[student.username]?.feedback || 'Good work';
                                                                if (grade && gradeAssignment(selectedAssignment.id, student.username, grade, feedback)) {
                                                                    alert('Grade saved successfully!');
                                                                    setGradingData({});
                                                                }
                                                            }}
                                                        >
                                                            Save Grade
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            <div className="btn-group" style={{ marginTop: '20px' }}>
                                <button
                                    onClick={() => {
                                        setShowSubmissions(false);
                                        setSelectedAssignment(null);
                                        setGradingData({});
                                    }}
                                    className="btn btn-danger"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}