// Hardcoded subjects for different departments
export const subjects = {
  CSE: [
    'Data Structures',
    'Operating Systems',
    'Database Management',
    'Software Engineering',
    'Computer Networks',
    'Algorithm Analysis',
    'Web Development',
    'Machine Learning',
    'Programming in C++',
    'Object Oriented Programming',
    'Digital Logic',
    'Computer Organization',
    'Database Lab',
    'Programming Lab',
    'Project Work'
  ],
  MECH: [
    'Thermodynamics',
    'Fluid Mechanics',
    'Machine Design',
    'Manufacturing Processes',
    'Heat Transfer',
    'Industrial Engineering',
    'Strength of Materials',
    'Engineering Drawing',
    'CAD Lab',
    'Manufacturing Lab',
    'Workshop'
  ],
  MATH: [
    'Mathematics-III',
    'Discrete Mathematics',
    'Mathematics Tutorial'
  ],
  ENG: [
    'Technical Communication'
  ],
  GENERAL: [
    'Industry Training',
    'Industry Visit',
    'Seminar',
    'Tutorial',
    'Library',
    'Sports',
    'Free Period'
  ]
};

// Get all subjects for a department
export const getSubjectsByDepartment = (department) => {
  return subjects[department] || [];
};

// Get all subjects (flattened)
export const getAllSubjects = () => {
  return Object.values(subjects).flat();
};

// Get subject department
export const getSubjectDepartment = (subject) => {
  for (const [dept, subjectList] of Object.entries(subjects)) {
    if (subjectList.includes(subject)) {
      return dept;
    }
  }
  return 'GENERAL';
};