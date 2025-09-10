// Assignment submissions and management
export let assignmentSubmissions = {
  // CSE-3A Assignments
  1: { // Binary Search Tree Implementation - Data Structures (prof2)
    'student1': { submitted: false, submissionDate: null, file: null, grade: null, feedback: null },
    'student2': { submitted: true, submissionDate: '2025-01-16', file: 'bst_implementation.cpp', grade: 23, feedback: 'Good implementation, minor optimization needed' }
  },
  2: { // Process Scheduling Algorithms - Operating Systems (prof1)
    'student1': { submitted: true, submissionDate: '2025-01-17', file: 'process_scheduling.pdf', grade: 28, feedback: 'Excellent work on FCFS and SJF algorithms' },
    'student2': { submitted: true, submissionDate: '2025-01-17', file: 'scheduling_project.zip', grade: 30, feedback: 'Perfect implementation with all algorithms' }
  },
  3: { // Database Design Project - Database Management (prof9)
    'student1': { submitted: false, submissionDate: null, file: null, grade: null, feedback: null },
    'student2': { submitted: false, submissionDate: null, file: null, grade: null, feedback: null }
  },
  4: { // Software Requirements Analysis - Software Engineering (prof11)
    'student1': { submitted: true, submissionDate: '2025-01-18', file: 'requirements_analysis.docx', grade: 32, feedback: 'Comprehensive analysis with good use cases' },
    'student2': { submitted: false, submissionDate: null, file: null, grade: null, feedback: null }
  },
  5: { // Network Protocol Implementation - Computer Networks (prof10)
    'student1': { submitted: false, submissionDate: null, file: null, grade: null, feedback: null },
    'student2': { submitted: true, submissionDate: '2025-01-19', file: 'tcp_implementation.py', grade: 27, feedback: 'Good understanding of TCP protocol' }
  },
  6: { // Sorting Algorithm Analysis - Algorithm Analysis (prof12)
    'student1': { submitted: true, submissionDate: '2025-01-15', file: 'sorting_analysis.pdf', grade: 24, feedback: 'Good time complexity analysis' },
    'student2': { submitted: true, submissionDate: '2025-01-15', file: 'algorithm_comparison.zip', grade: 25, feedback: 'Excellent comparative study' }
  },

  // CSE-2A Assignments
  8: { // Linked List Implementation - Data Structures (prof2)
    'student4': { submitted: true, submissionDate: '2025-01-20', file: 'linked_list.cpp', grade: 22, feedback: 'Good basic implementation' }
  },
  9: { // Digital Circuit Design - Digital Logic (prof5)
    'student4': { submitted: false, submissionDate: null, file: null, grade: null, feedback: null }
  },
  10: { // Assembly Language Programming - Computer Organization (prof13)
    'student4': { submitted: true, submissionDate: '2025-01-18', file: 'assembly_program.asm', grade: 30, feedback: 'Excellent assembly code with proper comments' }
  },

  // MECH-3A Assignments
  14: { // Heat Engine Analysis - Thermodynamics (prof3)
    'student3': { submitted: false, submissionDate: null, file: null, grade: null, feedback: null }
  },
  15: { // Fluid Flow Simulation - Fluid Mechanics (prof14)
    'student3': { submitted: true, submissionDate: '2025-01-17', file: 'fluid_simulation.pdf', grade: 23, feedback: 'Good simulation results with proper analysis' }
  },
  18: { // Beam Stress Analysis - Strength of Materials (prof7)
    'student3': { submitted: true, submissionDate: '2025-01-16', file: 'beam_analysis.xlsx', grade: 28, feedback: 'Excellent stress calculations and diagrams' }
  }
};

// Function to submit assignment
export const submitAssignment = (assignmentId, studentUsername, fileName) => {
  if (!assignmentSubmissions[assignmentId]) {
    assignmentSubmissions[assignmentId] = {};
  }

  assignmentSubmissions[assignmentId][studentUsername] = {
    submitted: true,
    submissionDate: new Date().toISOString().split('T')[0],
    file: fileName,
    grade: null,
    feedback: null
  };

  return true;
};

// Function to grade assignment
export const gradeAssignment = (assignmentId, studentUsername, grade, feedback) => {
  if (assignmentSubmissions[assignmentId] && assignmentSubmissions[assignmentId][studentUsername]) {
    assignmentSubmissions[assignmentId][studentUsername].grade = grade;
    assignmentSubmissions[assignmentId][studentUsername].feedback = feedback;
    return true;
  }
  return false;
};

// Function to get assignment submissions for a class
export const getAssignmentSubmissions = (assignmentId) => {
  return assignmentSubmissions[assignmentId] || {};
};

// Function to get student's assignment status
export const getStudentAssignmentStatus = (assignmentId, studentUsername) => {
  return assignmentSubmissions[assignmentId]?.[studentUsername] || {
    submitted: false,
    submissionDate: null,
    file: null,
    grade: null,
    feedback: null
  };
};