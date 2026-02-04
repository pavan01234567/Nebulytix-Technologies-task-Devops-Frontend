//api/config.js
// export const BACKEND_BASE_URL ="http://localhost:5054/api";
// export const BASE_URL ="http://localhost:5054";
// export const BACKEND_BASE_URL ="http://192.168.1.4:5054/api";
// export const BASE_URL ="http://192.168.1.4:5054";
export const BACKEND_BASE_URL ="http://192.168.88.6:5054/api";
export const BASE_URL ="http://192.168.88.6:5054";
   
// Add these for Cloudinary
export const CLOUDINARY_CLOUD_NAME = "ds3slw5pq";
export const CLOUDINARY_UPLOAD_PRESET = "your_unsigned_preset"; 

// Presets for your 3 specific dashboards
export const CLOUDINARY_PRESETS = {
  ADMIN: "admin_preset",
  HR: "hr_preset",
  EMPLOYEE: "employee_preset",
  DOCUMENTS: "general_docs_preset" ,
//   HR_PAYSLIPS: "hr_payslips_preset",      // Folder: hr/payslips (Restrict to PDF)
//   HR_RESUMES: "hr_resumes_preset",        // Folder: hr/resumes (Restrict to PDF/DOCX)
//   DAILY_REPORTS: "admin_reports_preset",  // Folder: admin/reports
//   EMPLOYEE_TASKS: "employee_tasks_preset",// Folder: employee/tasks
//   PROJECT_DOCS: "project_docs_preset"     // Folder: projects/docs
};