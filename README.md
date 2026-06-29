# ☁️ CloudArchitect AI

> **AI-Powered AWS Infrastructure Advisor**

CloudArchitect AI is a full-stack AI application that analyzes natural language project requirements and generates an optimized AWS cloud architecture. It leverages Google Gemini AI to recommend AWS services, estimate infrastructure costs, suggest security best practices, and generate Terraform code for deployment.

---

## 🚀 Live Demo

**Frontend:**
http://cloudarchitect-ai-kartikeya.s3-website.ap-south-1.amazonaws.com

---

## 📌 Features

* 🤖 AI-powered AWS architecture generation
* ☁️ Intelligent AWS service recommendations
* 🔐 Security best practices
* 💰 Monthly infrastructure cost estimation
* 📄 Terraform code generation
* 🏗️ Interactive architecture visualization
* 📋 Deployment guide
* 📥 Terraform download
* 📄 PDF report export
* 🕒 Architecture history (Local Storage)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Axios
* jsPDF
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* Google Gemini API

### Cloud & DevOps

* AWS EC2
* Amazon S3 Static Website Hosting
* PM2
* Git
* GitHub

---

## 🏗️ Architecture

```
                User
                  │
                  ▼
      Amazon S3 Static Website
                  │
                  ▼
          React Frontend
                  │
          REST API Request
                  │
                  ▼
      AWS EC2 (Node.js + Express)
                  │
                  ▼
         Google Gemini AI API
                  │
                  ▼
      AI Generated Architecture
```

---

## 📂 Project Structure

```
CloudArchitect-AI
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── services
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/kar98star/Infrastructure-advisor.git
```

```bash
cd Infrastructure-advisor
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Start the backend:

```bash
node server.js
```

or using PM2

```bash
pm2 start server.js --name cloudarchitect-backend
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

For production build:

```bash
npm run build
```

---

## 🚀 Deployment

### Frontend

* Amazon S3 Static Website Hosting

### Backend

* AWS EC2
* PM2 Process Manager

---

## 📸 Application Workflow

1. User enters project requirements.
2. Frontend sends request to Express REST API.
3. Backend invokes Google Gemini AI.
4. AI analyzes the requirements.
5. Application returns:

   * AWS Architecture
   * Security Recommendations
   * Cost Estimation
   * Terraform Code
   * Deployment Guide
6. User can export the report as PDF or download the Terraform file.

---

## 💡 Example Prompt

```
Build a food delivery application for 50,000 users with real-time order tracking.
```

---

## 🎯 Future Improvements

* User Authentication
* MongoDB Integration
* CloudFront + HTTPS
* Custom Domain
* Kubernetes Deployment
* Docker Support
* CI/CD using GitHub Actions
* CloudWatch Monitoring
* Multi-cloud Recommendations (AWS, Azure, GCP)

---

## 👨‍💻 Author

**Kartikeya Verma**

* GitHub: https://github.com/kar98star
* LinkedIn: https://www.linkedin.com/in/kartikeya-verma-12737328a/

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
