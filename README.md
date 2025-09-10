# College ERP Management System

A comprehensive ERP-based college management system built with Next.js for hackathons and prototyping.

## Features

### Admin Dashboard
- Create and manage professor accounts
- View system statistics (professors, students, sections)
- Generate reports (attendance, fees, academic)
- Overview of all departments and sections

### Professor Dashboard
- Create and manage student accounts for their sections
- Mark attendance for students
- Create and manage assignments/projects
- View class schedules and timetables
- Access to student information in their sections

### Student Dashboard
- View personal dashboard with key statistics (CGPA, attendance, etc.)
- Access semester timetable with subjects
- Check attendance records with visual progress
- View and pay semester fees
- Read college notices and announcements
- View grades, CGPA and academic performance
- Submit assignments and projects
- Access to alumni corner

### Alumni Corner
- Alumni directory with search functionality
- Upcoming events and registration
- Success stories from graduates
- Networking and mentorship opportunities

## Demo Accounts

### Admin
- Username: `admin`
- Password: `admin123`

### Professor
- Username: `prof1`
- Password: `prof123`
- Username: `prof2`
- Password: `prof123`

### Student
- Username: `student1`
- Password: `student123`
- Username: `student2`
- Password: `student123`
- Username: `student3`
- Password: `student123`

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technology Stack

- **Frontend**: Next.js 15.5.2 with React 19
- **Styling**: Simple CSS (no external frameworks)
- **Data**: Mock data for prototyping
- **Authentication**: Simple localStorage-based auth

## Project Structure

```
src/
├── app/
│   ├── admin/          # Admin dashboard
│   ├── teacher/        # Teacher dashboard
│   ├── student/        # Student dashboard
│   ├── alumni/         # Alumni corner
│   ├── globals.css     # Global styles
│   ├── layout.js       # Root layout
│   └── page.js         # Login page
└── data/
    └── mockData.js     # Mock data for all features
```

## Features Overview

### For Students
- **Dashboard**: Quick overview of attendance, fees, grades
- **Timetable**: Weekly class schedule
- **Attendance**: Detailed attendance tracking with visual indicators
- **Notices**: School announcements and important updates
- **Fees**: Fee payment status and online payment option
- **Grades**: Subject-wise marks and overall performance
- **Assignments**: View and submit assignments

### For Teachers
- **Class Management**: View assigned classes and students
- **Attendance**: Mark daily attendance for students
- **Student Management**: Add new students to classes
- **Assignment Creation**: Create and manage assignments
- **Schedule**: View teaching timetable

### For Admins
- **User Management**: Create teacher accounts
- **System Overview**: Statistics and reports
- **Class Management**: Overview of all classes
- **Reports**: Attendance, fee collection, and academic reports

### Alumni Features
- **Directory**: Search and connect with alumni
- **Events**: Alumni meetups and networking events
- **Success Stories**: Inspiring stories from graduates

## Future Enhancements

When integrating with Supabase:
- Replace mock data with real database
- Implement proper authentication
- Add real-time updates
- File upload for assignments
- Email notifications
- Mobile responsiveness improvements
- Advanced reporting features

## Notes

This is a simplified version designed for hackathons and rapid prototyping. The code is intentionally kept simple and beginner-friendly, using basic CSS instead of complex frameworks.