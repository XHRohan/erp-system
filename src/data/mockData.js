// Mock data for the College ERP system
export const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Dr. Admin Kumar' },

  // CSE Department Teachers - Each specializes in one subject
  {
    id: 2,
    username: 'prof1',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Rajesh Sharma',
    subject: 'Operating Systems',
    department: 'CSE',
    classes: ['CSE-3A', 'CSE-4B']
  },
  {
    id: 3,
    username: 'prof2',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Priya Patel',
    subject: 'Data Structures',
    department: 'CSE',
    classes: ['CSE-2A', 'CSE-3A']
  },
  {
    id: 4,
    username: 'prof5',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Kiran Kumar',
    subject: 'Digital Logic',
    department: 'CSE',
    classes: ['CSE-2A', 'CSE-2B']
  },
  {
    id: 5,
    username: 'prof9',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Ankit Verma',
    subject: 'Database Management',
    department: 'CSE',
    classes: ['CSE-3A', 'CSE-4B']
  },
  {
    id: 6,
    username: 'prof10',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Sanjay Gupta',
    subject: 'Computer Networks',
    department: 'CSE',
    classes: ['CSE-3A', 'CSE-4B']
  },
  {
    id: 7,
    username: 'prof11',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Kavita Singh',
    subject: 'Software Engineering',
    department: 'CSE',
    classes: ['CSE-3A', 'CSE-4B']
  },
  {
    id: 8,
    username: 'prof12',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Rohit Sharma',
    subject: 'Algorithm Analysis',
    department: 'CSE',
    classes: ['CSE-2A', 'CSE-3A']
  },
  {
    id: 9,
    username: 'prof13',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Deepak Kumar',
    subject: 'Computer Organization',
    department: 'CSE',
    classes: ['CSE-2A', 'CSE-2B']
  },

  // MECH Department Teachers
  {
    id: 10,
    username: 'prof3',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Amit Singh',
    subject: 'Thermodynamics',
    department: 'MECH',
    classes: ['MECH-3A', 'MECH-4A']
  },
  {
    id: 11,
    username: 'prof7',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Ravi Gupta',
    subject: 'Strength of Materials',
    department: 'MECH',
    classes: ['MECH-3A', 'MECH-4A']
  },
  {
    id: 12,
    username: 'prof8',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Neha Sharma',
    subject: 'Engineering Drawing',
    department: 'MECH',
    classes: ['MECH-3A', 'MECH-4A']
  },
  {
    id: 13,
    username: 'prof14',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Vikash Jain',
    subject: 'Fluid Mechanics',
    department: 'MECH',
    classes: ['MECH-3A', 'MECH-4A']
  },
  {
    id: 14,
    username: 'prof15',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Pooja Agarwal',
    subject: 'Machine Design',
    department: 'MECH',
    classes: ['MECH-3A', 'MECH-4A']
  },
  {
    id: 15,
    username: 'prof16',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Manoj Tiwari',
    subject: 'Manufacturing Processes',
    department: 'MECH',
    classes: ['MECH-3A', 'MECH-4A']
  },

  // Mathematics Department
  {
    id: 16,
    username: 'prof4',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Sunita Verma',
    subject: 'Mathematics-III',
    department: 'MATH',
    classes: ['CSE-2A', 'CSE-3A', 'MECH-3A']
  },
  {
    id: 17,
    username: 'prof17',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Ramesh Chandra',
    subject: 'Discrete Mathematics',
    department: 'MATH',
    classes: ['CSE-2A', 'CSE-2B']
  },

  // English Department
  {
    id: 18,
    username: 'prof6',
    password: 'prof123',
    role: 'teacher',
    name: 'Dr. Meera Jain',
    subject: 'Technical Communication',
    department: 'ENG',
    classes: ['CSE-2A', 'CSE-2B', 'MECH-3A']
  },

  // Students
  { id: 19, username: 'student1', password: 'student123', role: 'student', name: 'Arjun Mehta', class: 'CSE-3A', rollNo: 'CSE21001', year: '3rd Year', department: 'Computer Science' },
  { id: 20, username: 'student2', password: 'student123', role: 'student', name: 'Sneha Gupta', class: 'CSE-3A', rollNo: 'CSE21002', year: '3rd Year', department: 'Computer Science' },
  { id: 21, username: 'student3', password: 'student123', role: 'student', name: 'Vikram Joshi', class: 'MECH-3A', rollNo: 'MECH21003', year: '3rd Year', department: 'Mechanical Engineering' },
  { id: 22, username: 'student4', password: 'student123', role: 'student', name: 'Kavya Reddy', class: 'CSE-2A', rollNo: 'CSE22001', year: '2nd Year', department: 'Computer Science' }
];

export const classes = [
  { id: 'CSE-3A', name: 'CSE 3rd Year Section A', teacher: 'Dr. Rajesh Sharma', students: 45, department: 'Computer Science Engineering' },
  { id: 'CSE-4B', name: 'CSE 4th Year Section B', teacher: 'Dr. Rajesh Sharma', students: 42, department: 'Computer Science Engineering' },
  { id: 'CSE-2A', name: 'CSE 2nd Year Section A', teacher: 'Dr. Priya Patel', students: 48, department: 'Computer Science Engineering' },
  { id: 'CSE-2B', name: 'CSE 2nd Year Section B', teacher: 'Dr. Priya Patel', students: 46, department: 'Computer Science Engineering' },
  { id: 'MECH-3A', name: 'MECH 3rd Year Section A', teacher: 'Dr. Amit Singh', students: 40, department: 'Mechanical Engineering' },
  { id: 'MECH-4A', name: 'MECH 4th Year Section A', teacher: 'Dr. Amit Singh', students: 38, department: 'Mechanical Engineering' }
];

export const timetable = {
  'CSE-3A': [
    {
      day: 'Monday',
      periods: [
        { subject: 'Data Structures', teacher: 'prof2', time: '09:00-10:00' },
        { subject: 'Operating Systems', teacher: 'prof1', time: '10:00-11:00' },
        { subject: 'Database Management', teacher: 'prof9', time: '11:15-12:15' },
        { subject: 'Software Engineering', teacher: 'prof11', time: '12:15-13:15' },
        { subject: 'Mathematics-III', teacher: 'prof4', time: '14:00-15:00' },
        { subject: 'Computer Networks', teacher: 'prof10', time: '15:00-16:00' },
        { subject: 'Algorithm Analysis', teacher: 'prof12', time: '16:00-17:00' }
      ]
    },
    {
      day: 'Tuesday',
      periods: [
        { subject: 'Computer Networks', teacher: 'prof10', time: '09:00-10:00' },
        { subject: 'Algorithm Analysis', teacher: 'prof12', time: '10:00-11:00' },
        { subject: 'Operating Systems', teacher: 'prof1', time: '11:15-12:15' },
        { subject: 'Database Management', teacher: 'prof9', time: '12:15-13:15' },
        { subject: 'Data Structures', teacher: 'prof2', time: '14:00-15:00' },
        { subject: 'Mathematics-III', teacher: 'prof4', time: '15:00-16:00' },
        { subject: 'Software Engineering', teacher: 'prof11', time: '16:00-17:00' }
      ]
    },
    {
      day: 'Wednesday',
      periods: [
        { subject: 'Operating Systems', teacher: 'prof1', time: '09:00-10:00' },
        { subject: 'Database Management', teacher: 'prof9', time: '10:00-11:00' },
        { subject: 'Data Structures', teacher: 'prof2', time: '11:15-12:15' },
        { subject: 'Computer Networks', teacher: 'prof10', time: '12:15-13:15' },
        { subject: 'Algorithm Analysis', teacher: 'prof12', time: '14:00-15:00' },
        { subject: 'Mathematics-III', teacher: 'prof4', time: '15:00-16:00' },
        { subject: 'Software Engineering', teacher: 'prof11', time: '16:00-17:00' }
      ]
    },
    {
      day: 'Thursday',
      periods: [
        { subject: 'Software Engineering', teacher: 'prof11', time: '09:00-10:00' },
        { subject: 'Algorithm Analysis', teacher: 'prof12', time: '10:00-11:00' },
        { subject: 'Operating Systems', teacher: 'prof1', time: '11:15-12:15' },
        { subject: 'Database Management', teacher: 'prof9', time: '12:15-13:15' },
        { subject: 'Data Structures', teacher: 'prof2', time: '14:00-15:00' },
        { subject: 'Mathematics-III', teacher: 'prof4', time: '15:00-16:00' },
        { subject: 'Computer Networks', teacher: 'prof10', time: '16:00-17:00' }
      ]
    },
    {
      day: 'Friday',
      periods: [
        { subject: 'Data Structures', teacher: 'prof2', time: '09:00-10:00' },
        { subject: 'Operating Systems', teacher: 'prof1', time: '10:00-11:00' },
        { subject: 'Database Management', teacher: 'prof9', time: '11:15-12:15' },
        { subject: 'Software Engineering', teacher: 'prof11', time: '12:15-13:15' },
        { subject: 'Mathematics-III', teacher: 'prof4', time: '14:00-15:00' },
        { subject: 'Algorithm Analysis', teacher: 'prof12', time: '15:00-16:00' },
        { subject: 'Free Period', teacher: null, time: '16:00-17:00' }
      ]
    }
  ],
  'CSE-2A': [
    {
      day: 'Monday',
      periods: [
        { subject: 'Data Structures', teacher: 'prof2', time: '09:00-10:00' },
        { subject: 'Digital Logic', teacher: 'prof5', time: '10:00-11:00' },
        { subject: 'Mathematics-III', teacher: 'prof4', time: '11:15-12:15' },
        { subject: 'Algorithm Analysis', teacher: 'prof12', time: '12:15-13:15' },
        { subject: 'Computer Organization', teacher: 'prof13', time: '14:00-15:00' },
        { subject: 'Technical Communication', teacher: 'prof6', time: '15:00-16:00' },
        { subject: 'Discrete Mathematics', teacher: 'prof17', time: '16:00-17:00' }
      ]
    },
    {
      day: 'Tuesday',
      periods: [
        { subject: 'Computer Organization', teacher: 'prof13', time: '09:00-10:00' },
        { subject: 'Discrete Mathematics', teacher: 'prof17', time: '10:00-11:00' },
        { subject: 'Data Structures', teacher: 'prof2', time: '11:15-12:15' },
        { subject: 'Technical Communication', teacher: 'prof6', time: '12:15-13:15' },
        { subject: 'Algorithm Analysis', teacher: 'prof12', time: '14:00-15:00' },
        { subject: 'Digital Logic', teacher: 'prof5', time: '15:00-16:00' },
        { subject: 'Mathematics-III', teacher: 'prof4', time: '16:00-17:00' }
      ]
    },
    {
      day: 'Wednesday',
      periods: [
        { subject: 'Digital Logic', teacher: 'prof5', time: '09:00-10:00' },
        { subject: 'Mathematics-III', teacher: 'prof4', time: '10:00-11:00' },
        { subject: 'Data Structures', teacher: 'prof2', time: '11:15-12:15' },
        { subject: 'Computer Organization', teacher: 'prof13', time: '12:15-13:15' },
        { subject: 'Algorithm Analysis', teacher: 'prof12', time: '14:00-15:00' },
        { subject: 'Discrete Mathematics', teacher: 'prof17', time: '15:00-16:00' },
        { subject: 'Library', teacher: null, time: '16:00-17:00' }
      ]
    },
    {
      day: 'Thursday',
      periods: [
        { subject: 'Algorithm Analysis', teacher: 'prof12', time: '09:00-10:00' },
        { subject: 'Discrete Mathematics', teacher: 'prof17', time: '10:00-11:00' },
        { subject: 'Data Structures', teacher: 'prof2', time: '11:15-12:15' },
        { subject: 'Technical Communication', teacher: 'prof6', time: '12:15-13:15' },
        { subject: 'Digital Logic', teacher: 'prof5', time: '14:00-15:00' },
        { subject: 'Mathematics-III', teacher: 'prof4', time: '15:00-16:00' },
        { subject: 'Computer Organization', teacher: 'prof13', time: '16:00-17:00' }
      ]
    },
    {
      day: 'Friday',
      periods: [
        { subject: 'Data Structures', teacher: 'prof2', time: '09:00-10:00' },
        { subject: 'Digital Logic', teacher: 'prof5', time: '10:00-11:00' },
        { subject: 'Mathematics-III', teacher: 'prof4', time: '11:15-12:15' },
        { subject: 'Algorithm Analysis', teacher: 'prof12', time: '12:15-13:15' },
        { subject: 'Computer Organization', teacher: 'prof13', time: '14:00-15:00' },
        { subject: 'Technical Communication', teacher: 'prof6', time: '15:00-16:00' },
        { subject: 'Sports', teacher: null, time: '16:00-17:00' }
      ]
    }
  ],
  'MECH-3A': [
    {
      day: 'Monday',
      periods: [
        { subject: 'Thermodynamics', teacher: 'prof3', time: '09:00-10:00' },
        { subject: 'Fluid Mechanics', teacher: 'prof14', time: '10:00-11:00' },
        { subject: 'Machine Design', teacher: 'prof15', time: '11:15-12:15' },
        { subject: 'Manufacturing Processes', teacher: 'prof16', time: '12:15-13:15' },
        { subject: 'Strength of Materials', teacher: 'prof7', time: '14:00-15:00' },
        { subject: 'Engineering Drawing', teacher: 'prof8', time: '15:00-16:00' },
        { subject: 'Mathematics-III', teacher: 'prof4', time: '16:00-17:00' }
      ]
    },
    {
      day: 'Tuesday',
      periods: [
        { subject: 'Strength of Materials', teacher: 'prof7', time: '09:00-10:00' },
        { subject: 'Thermodynamics', teacher: 'prof3', time: '10:00-11:00' },
        { subject: 'Engineering Drawing', teacher: 'prof8', time: '11:15-12:15' },
        { subject: 'Fluid Mechanics', teacher: 'prof14', time: '12:15-13:15' },
        { subject: 'Machine Design', teacher: 'prof15', time: '14:00-15:00' },
        { subject: 'Manufacturing Processes', teacher: 'prof16', time: '15:00-16:00' },
        { subject: 'Technical Communication', teacher: 'prof6', time: '16:00-17:00' }
      ]
    },
    {
      day: 'Wednesday',
      periods: [
        { subject: 'Fluid Mechanics', teacher: 'prof14', time: '09:00-10:00' },
        { subject: 'Machine Design', teacher: 'prof15', time: '10:00-11:00' },
        { subject: 'Thermodynamics', teacher: 'prof3', time: '11:15-12:15' },
        { subject: 'Manufacturing Processes', teacher: 'prof16', time: '12:15-13:15' },
        { subject: 'Engineering Drawing', teacher: 'prof8', time: '14:00-15:00' },
        { subject: 'Strength of Materials', teacher: 'prof7', time: '15:00-16:00' },
        { subject: 'Mathematics-III', teacher: 'prof4', time: '16:00-17:00' }
      ]
    },
    {
      day: 'Thursday',
      periods: [
        { subject: 'Manufacturing Processes', teacher: 'prof16', time: '09:00-10:00' },
        { subject: 'Strength of Materials', teacher: 'prof7', time: '10:00-11:00' },
        { subject: 'Fluid Mechanics', teacher: 'prof14', time: '11:15-12:15' },
        { subject: 'Engineering Drawing', teacher: 'prof8', time: '12:15-13:15' },
        { subject: 'Machine Design', teacher: 'prof15', time: '14:00-15:00' },
        { subject: 'Thermodynamics', teacher: 'prof3', time: '15:00-16:00' },
        { subject: 'Technical Communication', teacher: 'prof6', time: '16:00-17:00' }
      ]
    },
    {
      day: 'Friday',
      periods: [
        { subject: 'Engineering Drawing', teacher: 'prof8', time: '09:00-10:00' },
        { subject: 'Thermodynamics', teacher: 'prof3', time: '10:00-11:00' },
        { subject: 'Fluid Mechanics', teacher: 'prof14', time: '11:15-12:15' },
        { subject: 'Machine Design', teacher: 'prof15', time: '12:15-13:15' },
        { subject: 'Manufacturing Processes', teacher: 'prof16', time: '14:00-15:00' },
        { subject: 'Strength of Materials', teacher: 'prof7', time: '15:00-16:00' },
        { subject: 'Free Period', teacher: null, time: '16:00-17:00' }
      ]
    }
  ]
};

// Import notices from separate data file
import { getAllNotices } from './noticesData.js';
export const notices = getAllNotices();

export const attendance = {
  'student1': { present: 142, total: 160, percentage: 88.8 },
  'student2': { present: 155, total: 160, percentage: 96.9 },
  'student3': { present: 138, total: 160, percentage: 86.3 },
  'student4': { present: 148, total: 160, percentage: 92.5 }
};

export const fees = {
  'student1': { total: 125000, paid: 75000, pending: 50000, dueDate: '2025-02-15', semester: 'Spring 2025' },
  'student2': { total: 125000, paid: 125000, pending: 0, dueDate: '2025-02-15', semester: 'Spring 2025' },
  'student3': { total: 110000, paid: 60000, pending: 50000, dueDate: '2025-02-15', semester: 'Spring 2025' },
  'student4': { total: 125000, paid: 100000, pending: 25000, dueDate: '2025-02-15', semester: 'Spring 2025' }
};

export const grades = {
  'student1': {
    subjects: {
      'Data Structures': { marks: 88, grade: 'A', maxMarks: 100, credits: 4 },
      'Operating Systems': { marks: 82, grade: 'A-', maxMarks: 100, credits: 4 },
      'Database Management': { marks: 91, grade: 'A+', maxMarks: 100, credits: 3 },
      'Software Engineering': { marks: 85, grade: 'A', maxMarks: 100, credits: 3 },
      'Computer Networks': { marks: 79, grade: 'B+', maxMarks: 100, credits: 4 },
      'Machine Learning': { marks: 93, grade: 'A+', maxMarks: 100, credits: 3 }
    },
    overall: { percentage: 86.3, grade: 'A', cgpa: 8.6 }
  },
  'student2': {
    subjects: {
      'Data Structures': { marks: 95, grade: 'A+', maxMarks: 100, credits: 4 },
      'Operating Systems': { marks: 89, grade: 'A', maxMarks: 100, credits: 4 },
      'Database Management': { marks: 87, grade: 'A', maxMarks: 100, credits: 3 },
      'Software Engineering': { marks: 92, grade: 'A+', maxMarks: 100, credits: 3 },
      'Computer Networks': { marks: 84, grade: 'A-', maxMarks: 100, credits: 4 },
      'Machine Learning': { marks: 90, grade: 'A+', maxMarks: 100, credits: 3 }
    },
    overall: { percentage: 89.5, grade: 'A+', cgpa: 9.0 }
  },
  'student3': {
    subjects: {
      'Thermodynamics': { marks: 76, grade: 'B+', maxMarks: 100, credits: 4 },
      'Fluid Mechanics': { marks: 82, grade: 'A-', maxMarks: 100, credits: 4 },
      'Machine Design': { marks: 88, grade: 'A', maxMarks: 100, credits: 3 },
      'Manufacturing Processes': { marks: 79, grade: 'B+', maxMarks: 100, credits: 3 },
      'Heat Transfer': { marks: 85, grade: 'A', maxMarks: 100, credits: 4 },
      'Industrial Engineering': { marks: 81, grade: 'A-', maxMarks: 100, credits: 3 }
    },
    overall: { percentage: 81.8, grade: 'A-', cgpa: 8.2 }
  }
};

export const assignments = [
  // CSE-3A Assignments
  { id: 1, title: 'Binary Search Tree Implementation', subject: 'Data Structures', dueDate: '2025-01-20', status: 'pending', class: 'CSE-3A', marks: 25, teacher: 'prof2' },
  { id: 2, title: 'Process Scheduling Algorithms', subject: 'Operating Systems', dueDate: '2025-01-18', status: 'submitted', class: 'CSE-3A', marks: 30, teacher: 'prof1' },
  { id: 3, title: 'Database Design Project', subject: 'Database Management', dueDate: '2025-01-25', status: 'pending', class: 'CSE-3A', marks: 40, teacher: 'prof9' },
  { id: 4, title: 'Software Requirements Analysis', subject: 'Software Engineering', dueDate: '2025-01-22', status: 'pending', class: 'CSE-3A', marks: 35, teacher: 'prof11' },
  { id: 5, title: 'Network Protocol Implementation', subject: 'Computer Networks', dueDate: '2025-01-28', status: 'pending', class: 'CSE-3A', marks: 30, teacher: 'prof10' },
  { id: 6, title: 'Sorting Algorithm Analysis', subject: 'Algorithm Analysis', dueDate: '2025-01-24', status: 'submitted', class: 'CSE-3A', marks: 25, teacher: 'prof12' },
  { id: 7, title: 'Calculus Problem Set', subject: 'Mathematics-III', dueDate: '2025-01-30', status: 'pending', class: 'CSE-3A', marks: 20, teacher: 'prof4' },

  // CSE-2A Assignments
  { id: 8, title: 'Linked List Implementation', subject: 'Data Structures', dueDate: '2025-01-26', status: 'pending', class: 'CSE-2A', marks: 25, teacher: 'prof2' },
  { id: 9, title: 'Digital Circuit Design', subject: 'Digital Logic', dueDate: '2025-01-28', status: 'pending', class: 'CSE-2A', marks: 30, teacher: 'prof5' },
  { id: 10, title: 'Assembly Language Programming', subject: 'Computer Organization', dueDate: '2025-01-30', status: 'submitted', class: 'CSE-2A', marks: 35, teacher: 'prof13' },
  { id: 11, title: 'Graph Theory Problems', subject: 'Discrete Mathematics', dueDate: '2025-01-25', status: 'pending', class: 'CSE-2A', marks: 20, teacher: 'prof17' },
  { id: 12, title: 'Dynamic Programming Solutions', subject: 'Algorithm Analysis', dueDate: '2025-01-27', status: 'pending', class: 'CSE-2A', marks: 30, teacher: 'prof12' },
  { id: 13, title: 'Technical Report Writing', subject: 'Technical Communication', dueDate: '2025-01-29', status: 'submitted', class: 'CSE-2A', marks: 15, teacher: 'prof6' },

  // MECH-3A Assignments
  { id: 14, title: 'Heat Engine Analysis', subject: 'Thermodynamics', dueDate: '2025-01-28', status: 'pending', class: 'MECH-3A', marks: 30, teacher: 'prof3' },
  { id: 15, title: 'Fluid Flow Simulation', subject: 'Fluid Mechanics', dueDate: '2025-01-24', status: 'submitted', class: 'MECH-3A', marks: 25, teacher: 'prof14' },
  { id: 16, title: 'Gear Design Project', subject: 'Machine Design', dueDate: '2025-01-26', status: 'pending', class: 'MECH-3A', marks: 35, teacher: 'prof15' },
  { id: 17, title: 'Manufacturing Process Analysis', subject: 'Manufacturing Processes', dueDate: '2025-01-30', status: 'pending', class: 'MECH-3A', marks: 25, teacher: 'prof16' },
  { id: 18, title: 'Beam Stress Analysis', subject: 'Strength of Materials', dueDate: '2025-01-25', status: 'submitted', class: 'MECH-3A', marks: 30, teacher: 'prof7' },
  { id: 19, title: 'CAD Drawing Project', subject: 'Engineering Drawing', dueDate: '2025-01-27', status: 'pending', class: 'MECH-3A', marks: 20, teacher: 'prof8' },
  { id: 20, title: 'Differential Equations', subject: 'Mathematics-III', dueDate: '2025-01-29', status: 'pending', class: 'MECH-3A', marks: 25, teacher: 'prof4' }
];