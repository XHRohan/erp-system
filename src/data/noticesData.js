// Default notices data
const defaultNoticesData = [
  { id: 1, title: 'Semester Exam Schedule', content: 'End semester examinations will commence from February 15th, 2025. Students are advised to check the detailed timetable on the college portal.', date: '2025-01-15', author: 'Dr. Admin Kumar', priority: 'high' },
  { id: 2, title: 'Industry Expert Lecture', content: 'Guest lecture by Mr. Sundar Pichai, CEO Google, on "Future of Technology" scheduled for January 20th at 2 PM in the main auditorium.', date: '2025-01-10', author: 'Dr. Admin Kumar', priority: 'medium' },
  { id: 3, title: 'Technical Fest - TechnoVision 2025', content: 'Annual technical festival will be held from January 25-27th. Registration for events is now open. Prizes worth ₹5 lakhs!', date: '2025-01-08', author: 'Dr. Admin Kumar', priority: 'high' },
  { id: 4, title: 'Placement Drive', content: 'Microsoft, Google, and Amazon will be conducting campus placements from February 1st. Eligible students should register immediately.', date: '2025-01-05', author: 'Dr. Admin Kumar', priority: 'high' },
  { id: 5, title: 'Library Extended Hours', content: 'Central library will remain open 24/7 during exam period (Feb 1-28). Students can access study halls and digital resources.', date: '2025-01-12', author: 'Dr. Admin Kumar', priority: 'medium' }
];

// Storage key for localStorage
const STORAGE_KEY = 'erpNoticesData';

// Initialize notices data from localStorage or use default
const initializeNoticesData = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored notices data:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    // Save default data to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNoticesData));
    return [...defaultNoticesData];
  }
  return [...defaultNoticesData];
};

// Save notices data to localStorage
const saveNoticesData = (data) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving notices data:', error);
    }
  }
};

// Get current notices data
const getNoticesData = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored notices data:', error);
        localStorage.removeItem(STORAGE_KEY);
        return initializeNoticesData();
      }
    }
  }
  return initializeNoticesData();
};

// Function to add a new notice
export const addNotice = (title, content, author, priority = 'medium') => {
  const currentData = getNoticesData();
  const newNotice = {
    id: Date.now(),
    title: title.trim(),
    content: content.trim(),
    date: new Date().toISOString().split('T')[0],
    author: author,
    priority: priority
  };
  
  currentData.unshift(newNotice); // Add to beginning of array (most recent first)
  saveNoticesData(currentData);
  return newNotice;
};

// Function to delete a notice
export const deleteNotice = (noticeId) => {
  const currentData = getNoticesData();
  const index = currentData.findIndex(notice => notice.id === noticeId);
  if (index !== -1) {
    currentData.splice(index, 1);
    saveNoticesData(currentData);
    return true;
  }
  return false;
};

// Function to update a notice
export const updateNotice = (noticeId, title, content, priority) => {
  const currentData = getNoticesData();
  const notice = currentData.find(notice => notice.id === noticeId);
  if (notice) {
    notice.title = title.trim();
    notice.content = content.trim();
    notice.priority = priority;
    saveNoticesData(currentData);
    return true;
  }
  return false;
};

// Function to get all notices
export const getAllNotices = () => {
  const currentData = getNoticesData();
  return currentData.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Function to get notices by priority
export const getNoticesByPriority = (priority) => {
  const currentData = getNoticesData();
  return currentData.filter(notice => notice.priority === priority)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Function to get recent notices (last N notices)
export const getRecentNotices = (count = 5) => {
  const currentData = getNoticesData();
  return currentData
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);
};