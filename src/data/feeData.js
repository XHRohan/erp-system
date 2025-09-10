// Default fee payment data
const defaultFeePayments = {
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

// Storage key for localStorage
const FEE_STORAGE_KEY = 'erpFeeData';

// Initialize fee data from localStorage or use default
const initializeFeeData = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(FEE_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored fee data:', error);
        localStorage.removeItem(FEE_STORAGE_KEY);
      }
    }
    // Save default data to localStorage
    localStorage.setItem(FEE_STORAGE_KEY, JSON.stringify(defaultFeePayments));
    return { ...defaultFeePayments };
  }
  return { ...defaultFeePayments };
};

// Save fee data to localStorage
const saveFeeData = (data) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(FEE_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving fee data:', error);
    }
  }
};

// Get current fee data
const getFeeData = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(FEE_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored fee data:', error);
        localStorage.removeItem(FEE_STORAGE_KEY);
        return initializeFeeData();
      }
    }
  }
  return initializeFeeData();
};

// Function to make payment
export const makePayment = (studentUsername, amount, type, semester) => {
  console.log('Making payment:', { studentUsername, amount, type, semester });

  const currentData = getFeeData();
  
  if (!currentData[studentUsername]) {
    currentData[studentUsername] = [];
  }

  // Find the first pending payment that matches the amount
  const pendingPayment = currentData[studentUsername].find(p => p.status === 'pending' && p.amount === amount);

  if (pendingPayment) {
    console.log('Found pending payment, updating to paid:', pendingPayment);
    // Update the existing pending payment to paid
    pendingPayment.status = 'paid';
    pendingPayment.date = new Date().toISOString().split('T')[0];
    console.log('Updated payment:', pendingPayment);
    saveFeeData(currentData);
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

    currentData[studentUsername].push(newPayment);
    console.log('Created new payment:', newPayment);
    saveFeeData(currentData);
    return true;
  }
};

// Function to get fee summary
export const getFeeSummary = (studentUsername) => {
  const currentData = getFeeData();
  const payments = currentData[studentUsername] || [];
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
  const currentData = getFeeData();
  
  if (!currentData[studentUsername]) {
    return false;
  }

  const pendingPayments = currentData[studentUsername].filter(p => p.status === 'pending');
  const currentDate = new Date().toISOString().split('T')[0];

  pendingPayments.forEach(payment => {
    payment.status = 'paid';
    payment.date = currentDate;
  });

  if (pendingPayments.length > 0) {
    saveFeeData(currentData);
    return true;
  }
  
  return false;
};

// Function to get all pending fees (for admin)
export const getAllPendingFees = () => {
  const currentData = getFeeData();
  const allPending = [];

  Object.keys(currentData).forEach(studentUsername => {
    const pending = currentData[studentUsername].filter(p => p.status === 'pending');
    pending.forEach(payment => {
      allPending.push({
        ...payment,
        studentUsername
      });
    });
  });

  return allPending;
};