// Global search data for the examination system
export const globalSearchData = [
  // Dashboard
  { id: 1, title: 'Dashboard', path: '/', category: 'Navigation', keywords: 'home, main, overview' },
  
  // Exams
  { id: 2, title: 'Exam List', path: '/exam', category: 'Exams', keywords: 'exams, tests, assessments' },
  { id: 3, title: 'Add Exam', path: '/exam/add', category: 'Exams', keywords: 'create exam, new exam, exam setup' },
  
  // Candidates
  { id: 4, title: 'Candidates List', path: '/candidates', category: 'Candidates', keywords: 'students, participants, users' },
  { id: 5, title: 'Add Candidate', path: '/candidates/add', category: 'Candidates', keywords: 'register candidate, new student' },
  
  // Questions
  { id: 6, title: 'Questions List', path: '/questions', category: 'Questions', keywords: 'question bank, qbank, mcq' },
  { id: 7, title: 'Add Question', path: '/questions/add', category: 'Questions', keywords: 'create question, new question' },
  
  // Settings
  { id: 8, title: 'Settings Dashboard', path: '/settings', category: 'Settings', keywords: 'configuration, preferences, admin' },
  { id: 9, title: 'Sections', path: '/settings/sections', category: 'Settings', keywords: 'categories, departments, subjects' },
  { id: 10, title: 'Groups', path: '/settings/groups', category: 'Settings', keywords: 'candidate groups, batches, classes' },
  { id: 11, title: 'Directions', path: '/settings/directions', category: 'Settings', keywords: 'instructions, guidelines' },
  { id: 12, title: 'Assign Essay Marks', path: '/settings/assign-essay-marks', category: 'Settings', keywords: 'grading, evaluation, manual marks' },
  { id: 13, title: 'Import Questions', path: '/settings/import-questions', category: 'Settings', keywords: 'bulk upload, excel import' },
  { id: 14, title: 'Import Candidates', path: '/settings/import-candidates', category: 'Settings', keywords: 'bulk registration, csv upload' },
  { id: 15, title: 'Certificate Maker', path: '/settings/certificate-maker', category: 'Settings', keywords: 'certificates, diplomas' },
  { id: 16, title: 'Exam Monitor', path: '/settings/exam-monitor', category: 'Settings', keywords: 'live monitoring, proctoring' },
  { id: 17, title: 'Export Data', path: '/settings/export-data', category: 'Settings', keywords: 'download, backup, reports' },
  { id: 18, title: 'Send Emails', path: '/settings/send-emails', category: 'Settings', keywords: 'bulk email, notifications' },
  { id: 19, title: 'Send SMS', path: '/settings/send-sms', category: 'Settings', keywords: 'text messages, mobile notifications' },
  { id: 20, title: 'Email Settings', path: '/settings/email-settings', category: 'Settings', keywords: 'smtp, mail configuration' },
  { id: 21, title: 'SMS Settings', path: '/settings/sms-settings', category: 'Settings', keywords: 'sms api, text configuration' },
  { id: 22, title: 'Candidate Activity', path: '/settings/candidate-activity', category: 'Settings', keywords: 'logs, audit trail' },
  { id: 23, title: 'Preferences', path: '/settings/preferences', category: 'Settings', keywords: 'system settings, toggles' },
  { id: 24, title: 'Feedback', path: '/settings/feedback', category: 'Settings', keywords: 'reviews, ratings, comments' },
  { id: 25, title: 'Exam Security', path: '/settings/exam-security', category: 'Settings', keywords: 'anti-cheat, lockdown' },
  { id: 26, title: 'My Sales', path: '/settings/my-sales', category: 'Settings', keywords: 'revenue, transactions' },
  { id: 27, title: 'Exam Packages', path: '/settings/exam-packages', category: 'Settings', keywords: 'subscriptions, pricing' },
  
  // Statistics
  { id: 28, title: 'Statistics', path: '/statistics', category: 'Analytics', keywords: 'reports, analytics, metrics' },
  
  // Notifications
  { id: 29, title: 'Notifications List', path: '/notifications', category: 'Notifications', keywords: 'alerts, announcements' },
  { id: 30, title: 'Add Notification', path: '/notifications/add', category: 'Notifications', keywords: 'create notification, broadcast' },
  
  // Profile & Authentication
  { id: 31, title: 'Profile', path: '/profile', category: 'Account', keywords: 'user profile, personal info' },
  { id: 32, title: 'Account Settings', path: '/pages/account', category: 'Account', keywords: 'account management' },
  { id: 33, title: 'Sign In', path: '/authentication/sign-in', category: 'Authentication', keywords: 'login, signin' },
  { id: 34, title: 'Sign Up', path: '/authentication/sign-up', category: 'Authentication', keywords: 'register, signup' },
  { id: 35, title: 'Forgot Password', path: '/authentication/forget-password', category: 'Authentication', keywords: 'reset password, recover account' },
  
  // Help & Support
  { id: 36, title: 'Help & Support', path: '/help-support', category: 'Support', keywords: 'help center, faq, assistance' },
  { id: 37, title: 'Documentation', path: '/documentation', category: 'Support', keywords: 'guides, manuals, tutorials' },
  { id: 38, title: 'Changelog', path: '/changelog', category: 'Support', keywords: 'updates, release notes' }
];

// Function to search through the data
export const searchGlobalData = (query) => {
  if (!query || query.length < 1) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  return globalSearchData.filter(item => 
    item.title.toLowerCase().includes(searchTerm) ||
    item.category.toLowerCase().includes(searchTerm) ||
    item.keywords.toLowerCase().includes(searchTerm) ||
    item.path.toLowerCase().includes(searchTerm)
  ).slice(0, 8); // Limit to 8 results
};