# Job Search Platform

A modern and intuitive job search platform designed to connect companies with job seekers efficiently. Inspired by LinkedIn, this platform ensures a secure, user-friendly experience for all parties.

---

## Features

### Company Management
- Admin approval for new companies to maintain quality.
- Full CRUD operations for company owners.
- Role assignment for HR managers to oversee job postings.

### User & Authentication
- Secure user registration and login with **JWT**.
- Authentication ensures data privacy and protection.

### Job Search & Application
- Advanced filtering options:  
  - **Location**, **Job Title**, **Working Time** (Full-time, Part-time).
- Easy and quick job application process.
- Search jobs within specific companies.

### Additional Features
- **Email Notifications** using Nodemailer.
- **File Uploads** (resumes, company logos) powered by Multer.
- **Cloud Storage** for documents and images via Cloudinary.
- Automated tasks using **Cron Jobs** (e.g., deleting expired OTPs every 6 hours).

### Security Enhancements
- Rate Limiting to prevent abuse.
- CORS for managing API access.
- Securing HTTP headers with Helmet.

---

## Tech Stack

**Backend**:  
- Express.js  
- Mongoose (MongoDB)  
- GraphQL  
- REST API  

**Authentication**:  
- JWT (JSON Web Tokens)  

**Utilities**:  
- Nodemailer (Email Notifications)  
- Multer (File Uploads)  
- Cloudinary (Cloud Storage)  
- Cron Jobs (Automated Tasks)  

**Security**:  
- Rate Limit (Prevent excessive API requests)  
- CORS (Cross-Origin Resource Sharing)  
- Helmet (HTTP Header Security)  


