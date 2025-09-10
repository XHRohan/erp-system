// Subject-wise attendance data storage
export let attendanceRecords = {
  // Format: [class][date][subject][teacher][studentUsername] = { present: boolean, time: string }
  'CSE-3A': {
    '2025-01-15': {
      'Data Structures': {
        teacher: 'prof2',
        students: {
          'student1': { present: true, time: '09:00' },
          'student2': { present: true, time: '09:00' }
        }
      },
      'Operating Systems': {
        teacher: 'prof1',
        students: {
          'student1': { present: false, time: null },
          'student2': { present: true, time: '10:00' }
        }
      },
      'Database Management': {
        teacher: 'prof1',
        students: {
          'student1': { present: true, time: '11:15' },
          'student2': { present: true, time: '11:15' }
        }
      }
    },
    '2025-01-14': {
      'Data Structures': {
        teacher: 'prof2',
        students: {
          'student1': { present: true, time: '09:00' },
          'student2': { present: false, time: null }
        }
      },
      'Operating Systems': {
        teacher: 'prof1',
        students: {
          'student1': { present: true, time: '10:00' },
          'student2': { present: true, time: '10:00' }
        }
      }
    }
  },
  'CSE-2A': {
    '2025-01-15': {
      'Data Structures': {
        teacher: 'prof2',
        students: {
          'student4': { present: true, time: '09:00' }
        }
      },
      'Digital Logic': {
        teacher: 'prof5',
        students: {
          'student4': { present: true, time: '10:00' }
        }
      }
    }
  },
  'MECH-3A': {
    '2025-01-15': {
      'Thermodynamics': {
        teacher: 'prof3',
        students: {
          'student3': { present: true, time: '09:00' }
        }
      },
      'Fluid Mechanics': {
        teacher: 'prof3',
        students: {
          'student3': { present: false, time: null }
        }
      }
    }
  }
};

// Function to add subject-wise attendance record
export const addAttendanceRecord = (className, date, subject, teacher, studentUsername, isPresent) => {
  if (!attendanceRecords[className]) {
    attendanceRecords[className] = {};
  }
  
  if (!attendanceRecords[className][date]) {
    attendanceRecords[className][date] = {};
  }
  
  if (!attendanceRecords[className][date][subject]) {
    attendanceRecords[className][date][subject] = {
      teacher: teacher,
      students: {}
    };
  }
  
  attendanceRecords[className][date][subject].students[studentUsername] = {
    present: isPresent,
    time: isPresent ? new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : null
  };
  
  return true;
};

// Function to get attendance for a class on a specific date and subject
export const getAttendanceByDateAndSubject = (className, date, subject) => {
  return attendanceRecords[className]?.[date]?.[subject] || { teacher: null, students: {} };
};

// Function to get all subjects for a class on a specific date
export const getSubjectsByDate = (className, date) => {
  const dateRecords = attendanceRecords[className]?.[date] || {};
  return Object.keys(dateRecords);
};

// Function to get student's attendance history (subject-wise)
export const getStudentAttendanceHistory = (studentUsername, className) => {
  const history = [];
  const classRecords = attendanceRecords[className] || {};
  
  Object.keys(classRecords).forEach(date => {
    const dateRecords = classRecords[date];
    Object.keys(dateRecords).forEach(subject => {
      const subjectRecord = dateRecords[subject];
      const studentRecord = subjectRecord.students[studentUsername];
      if (studentRecord) {
        history.push({
          date,
          subject,
          teacher: subjectRecord.teacher,
          present: studentRecord.present,
          time: studentRecord.time
        });
      }
    });
  });
  
  return history.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Function to get student's attendance history filtered by subject
export const getStudentAttendanceBySubject = (studentUsername, className, subject) => {
  const history = [];
  const classRecords = attendanceRecords[className] || {};
  
  Object.keys(classRecords).forEach(date => {
    const subjectRecord = classRecords[date][subject];
    if (subjectRecord && subjectRecord.students[studentUsername]) {
      const studentRecord = subjectRecord.students[studentUsername];
      history.push({
        date,
        subject,
        teacher: subjectRecord.teacher,
        present: studentRecord.present,
        time: studentRecord.time
      });
    }
  });
  
  return history.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Function to calculate attendance percentage (overall)
export const calculateAttendancePercentage = (studentUsername, className) => {
  const history = getStudentAttendanceHistory(studentUsername, className);
  if (history.length === 0) return { present: 0, total: 0, percentage: 0 };
  
  const present = history.filter(record => record.present).length;
  const total = history.length;
  const percentage = Math.round((present / total) * 100 * 10) / 10;
  
  return { present, total, percentage };
};

// Function to calculate attendance percentage by subject
export const calculateAttendancePercentageBySubject = (studentUsername, className, subject) => {
  const history = getStudentAttendanceBySubject(studentUsername, className, subject);
  if (history.length === 0) return { present: 0, total: 0, percentage: 0 };
  
  const present = history.filter(record => record.present).length;
  const total = history.length;
  const percentage = Math.round((present / total) * 100 * 10) / 10;
  
  return { present, total, percentage };
};

// Function to get teacher's subjects for a class
export const getTeacherSubjects = (teacherUsername, className) => {
  const subjects = new Set();
  const classRecords = attendanceRecords[className] || {};
  
  Object.keys(classRecords).forEach(date => {
    const dateRecords = classRecords[date];
    Object.keys(dateRecords).forEach(subject => {
      if (dateRecords[subject].teacher === teacherUsername) {
        subjects.add(subject);
      }
    });
  });
  
  return Array.from(subjects);
};
// Function to get attendance status for a teacher's classes and subjects
export const getTeacherAttendanceStatus = (teacherUsername, className, subject) => {
  const classRecords = attendanceRecords[className] || {};
  const markedDates = [];
  const pendingDates = [];
  
  // Get current date and calculate date range (last 30 days)
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  // Generate array of dates for the last 30 days (excluding weekends)
  const dateRange = [];
  for (let d = new Date(thirtyDaysAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      dateRange.push(d.toISOString().split('T')[0]);
    }
  }
  
  // Check each date to see if attendance was marked
  dateRange.forEach(date => {
    const dateRecord = classRecords[date];
    const subjectRecord = dateRecord?.[subject];
    
    if (subjectRecord && subjectRecord.teacher === teacherUsername) {
      markedDates.push(date);
    } else {
      // Only consider it pending if it's not a future date
      const checkDate = new Date(date);
      if (checkDate <= today) {
        pendingDates.push(date);
      }
    }
  });
  
  return {
    markedDates: markedDates.sort((a, b) => new Date(b) - new Date(a)),
    pendingDates: pendingDates.sort((a, b) => new Date(b) - new Date(a)),
    totalDays: dateRange.length,
    markedCount: markedDates.length,
    pendingCount: pendingDates.length
  };
};

// Function to get all pending attendance for a teacher
export const getTeacherPendingAttendance = (teacherUsername, classes, subjects) => {
  const allPending = [];
  
  classes.forEach(className => {
    subjects.forEach(subject => {
      const status = getTeacherAttendanceStatus(teacherUsername, className, subject);
      if (status.pendingCount > 0) {
        allPending.push({
          className,
          subject,
          pendingDates: status.pendingDates,
          pendingCount: status.pendingCount
        });
      }
    });
  });
  
  return allPending;
};

// Function to check if attendance is marked for today
export const isTodayAttendanceMarked = (teacherUsername, className, subject) => {
  const today = new Date().toISOString().split('T')[0];
  const todayRecord = attendanceRecords[className]?.[today]?.[subject];
  return todayRecord && todayRecord.teacher === teacherUsername;
};

// Function to get attendance summary for a class and subject
export const getClassSubjectAttendanceSummary = (className, subject, teacherUsername) => {
  const classRecords = attendanceRecords[className] || {};
  let totalClasses = 0;
  let studentsPresent = 0;
  let totalStudentDays = 0;
  
  Object.keys(classRecords).forEach(date => {
    const subjectRecord = classRecords[date][subject];
    if (subjectRecord && subjectRecord.teacher === teacherUsername) {
      totalClasses++;
      const students = Object.keys(subjectRecord.students);
      totalStudentDays += students.length;
      studentsPresent += students.filter(student => subjectRecord.students[student].present).length;
    }
  });
  
  const attendancePercentage = totalStudentDays > 0 ? Math.round((studentsPresent / totalStudentDays) * 100) : 0;
  
  return {
    totalClasses,
    attendancePercentage,
    studentsPresent,
    totalStudentDays
  };
};