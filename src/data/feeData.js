// Fee payment and management
export let feePayments = {
  'student1': [
    { id: 1, amount: 25000, date: '2024-08-15', type: 'Tuition Fee', semester: 'Fall 2024', status: 'paid' },
    { id: 2, amount: 50000, date: '2024-12-20', type: 'Tuition Fee', semester: 'Spring 2025', status: 'paid' },
    { id: 3, amount: 50000, date: null, type: 'Tuition Fee', semester: 'Spring 2025', status: 'pending' }
  ],
  'student2': [
    { id: 4, amount: 25000, date: '2024-08-10', type: 'Tuition Fee', semester: 'Fall 2024', status: 'paid' },
    { id: 5, amount: 50000, date: '2024-12-15', type: 'Tuition Fee', semester: 'Spring 2025', status: 'paid' },
    { id: 6, amount: 50000, date: '2025-01-10', type: 'Tuition Fee', semester: 'Spring 2025', status: 'paid' }
  ],
  'student3': [
    { id: 7, amount: 30000, date: '2024-08-20', type: 'Tuition Fee', semester: 'Fall 2024', status: 'paid' },
    { id: 8, amount: 30000, date: '2024-12-25', type: 'Tuition Fee', semester: 'Spring 2025', status: 'paid' },
    { id: 9, amount: 50000, date: null, type: 'Tuition Fee', semester: 'Spring 2025', status: 'pending' }
  ],
  'student4': [
    { id: 10, amount: 50000, date: '2024-08-12', type: 'Tuition Fee', semester: 'Fall 2024', status: 'paid' },
    { id: 11, amount: 50000, date: '2024-12-18', type: 'Tuition Fee', semester: 'Spring 2025', status: 'paid' },
    { id: 12, amount: 25000, date: null, type: 'Tuition Fee', semester: 'Spring 2025', status: 'pending' }
  ]
};

// Function to make payment
export const makePayment = (studentUsername, amount, type, semester) => {
  console.log('Making payment:', { studentUsername, amount, type, semester });
  
  if (!feePayments[studentUsername]) {
    feePayments[studentUsername] = [];
  }
  
  // Find the first pending payment that matches the amount
  const pendingPayment = feePayments[studentUsername].find(p => p.status === 'pending' && p.amount === amount);
  
  if (pendingPayment) {
    console.log('Found pending payment, updating to paid:', pendingPayment);
    // Update the existing pending payment to paid
    pendingPayment.status = 'paid';
    pendingPayment.date = new Date().toISOString().split('T')[0];
    console.log('Updated payment:', pendingPayment);
    return true;
  } else {
    console.log('No matching pending payment found, creating new payment');
    // If no matching pending payment found, create a new payment record
    const newPayment = {
      id: Date.now(),
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      type: type || 'Tuition Fee',
      semester: semester || 'Spring 2025',
      status: 'paid'
    };
    
    feePayments[studentUsername].push(newPayment);
    console.log('Created new payment:', newPayment);
    return true;
  }
};

// Function to get fee summary
export const getFeeSummary = (studentUsername) => {
  const payments = feePayments[studentUsername] || [];
  const total = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const paid = payments.filter(p => p.status === 'paid').reduce((sum, payment) => sum + payment.amount, 0);
  const pending = payments.filter(p => p.status === 'pending').reduce((sum, payment) => sum + payment.amount, 0);
  
  return {
    total,
    paid,
    pending,
    payments: payments.sort((a, b) => new Date(b.date || '1970-01-01') - new Date(a.date || '1970-01-01'))
  };
};

// Function to pay all pending fees for a student
export const payAllPendingFees = (studentUsername) => {
  if (!feePayments[studentUsername]) {
    return false;
  }
  
  const pendingPayments = feePayments[studentUsername].filter(p => p.status === 'pending');
  const currentDate = new Date().toISOString().split('T')[0];
  
  pendingPayments.forEach(payment => {
    payment.status = 'paid';
    payment.date = currentDate;
  });
  
  return pendingPayments.length > 0;
};

// Function to get all pending fees (for admin)
export const getAllPendingFees = () => {
  const allPending = [];
  
  Object.keys(feePayments).forEach(studentUsername => {
    const pending = feePayments[studentUsername].filter(p => p.status === 'pending');
    pending.forEach(payment => {
      allPending.push({
        ...payment,
        studentUsername
      });
    });
  });
  
  return allPending;
};