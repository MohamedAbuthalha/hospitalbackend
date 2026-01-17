# 🏥 Hospital Management Backend System

A scalable **Node.js + Express + MongoDB** backend for a Hospital Management System featuring **patient triage**, **severity analysis**, and a foundation for **doctor assignment and role-based access control**.

This project is built as a **college-level + real-world inspired backend**, focusing on clean architecture and future extensibility.

---

## 🚀 Features Implemented (Current Version)

* ✅ Express server setup with clean folder structure
* ✅ MongoDB connection using Mongoose
* ✅ Patient case creation API
* ✅ Intelligent triage system to determine severity:

  * Low
  * Medium
  * High
  * Critical
* ✅ Schema validation with enums and defaults
* ✅ RESTful API design
* ✅ Environment-based configuration
* ✅ Ready for role-based authentication & doctor matching

---

## 🧠 Core Innovation

Instead of storing patient data blindly, this system:

* Analyzes patient symptoms
* Dynamically determines **medical criticalness**
* Stores cases with severity for prioritization
* Enables intelligent doctor assignment in future phases

This mimics **real hospital triage workflows**.

---

## 🗂️ Project Structure

```
backend/
│
├── server.js
├── .env
├── package.json
├── README.md
│
└── src/
    ├── app.js
    │
    ├── config/
    │   └── db.js
    │
    ├── models/
    │   └── PatientCase.js
    │
    ├── controllers/
    │   └── patient.controller.js
    │
    ├── routes/
    │   └── patient.routes.js
    │
    └── services/
        └── triage.service.js
```

---

## 📦 Packages & Technologies Used

| Package      | Purpose                         |
| ------------ | ------------------------------- |
| **express**  | Web framework                   |
| **mongoose** | MongoDB ODM                     |
| **dotenv**   | Environment variable management |
| **cors**     | Cross-Origin Resource Sharing   |
| **nodemon**  | Development auto-restart        |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/MohamedAbuthalha/hospitalbackend.git
cd hospitalbackend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hospital_management
JWT_SECRET=your_secret_key
```

> ⚠️ MongoDB must be running locally or via MongoDB Compass.

---

## ▶️ Running the Project

### Development Mode

```bash
npm run dev
```

Expected output:

```
MongoDB connected
🚀 Server running on port 5000
```

---

## 🧪 API Endpoints

### ➕ Create Patient Case

**POST** `/api/patients`

```json
{
  "name": "John Doe",
  "age": 45,
  "gender": "male",
  "symptoms": "chest pain and breathing difficulty"
}
```

### 📥 Get All Patient Cases

**GET** `/api/patients`

---

## 🧠 Triage Logic (Simplified)

Symptoms are analyzed using keyword-based logic:

* Chest pain / breathing issues → **Critical**
* Fever / infection → **High**
* Pain / vomiting → **Medium**
* Otherwise → **Low**

This logic will be enhanced using weighted scoring in future updates.

---

## 🔮 Upcoming Features

* 🔐 Role-based authentication (Admin / Doctor / Patient)
* 👨‍⚕️ Doctor model with specialties
* 🤖 Smart doctor-patient matching algorithm
* 📊 Dashboard APIs
* 🧾 Medical history tracking

---

## 🎓 Academic Relevance

This project demonstrates:

* Backend architecture
* Database schema design
* Validation and error handling
* Domain-driven design
* Real-world problem modeling

Perfect for **college submission, viva, and resumes**.

---

## 👨‍💻 Author

**Mohamed Abuthalha**
Backend Developer | Computer Science Student

GitHub: [https://github.com/MohamedAbuthalha](https://github.com/MohamedAbuthalha)
