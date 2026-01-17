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


3rd commit 

# 🏥 Hospital Management System – Backend

A Node.js + Express + MongoDB backend for managing hospital patient intake with **rule-based medical triage**, severity classification, and specialization assignment.

This project is designed to be:

* Modular & maintainable
* Explainable (non–black-box logic)
* AI-ready for future upgrades
* Viva / review friendly

---

## 📌 What Has Been Implemented

### 1️⃣ Patient Case Management (Core Feature)

* Create new patient cases
* Fetch all patient cases
* Persist data in MongoDB using Mongoose

**Endpoints**

* `POST /api/patients` → Create patient case
* `GET /api/patients` → Get all cases (latest first)

---

### 2️⃣ Rule-Based Medical Triage Engine

Located in:

```
src/services/triage.service.js
```

The triage engine:

* Analyzes patient symptoms (plain text)
* Determines:

  * Severity (`low`, `medium`, `high`, `critical`)
  * Emergency flag
  * Recommended doctor specialization
* Uses keyword-based logic (explainable & deterministic)

This avoids black-box AI while remaining **upgrade-ready**.

---

### 3️⃣ Automatic Severity & Specialization Assignment

When a patient case is created:

* Symptoms are analyzed automatically
* Severity is calculated
* Doctor specialization is inferred
* Data is stored with medical context

Example:

```json
{
  "symptoms": "chest pain and difficulty breathing",
  "severity": "critical",
  "specialization": "cardiology",
  "emergency": true
}
```

---

### 4️⃣ Robust Validation & Error Handling

* Required field validation at controller level
* Schema-level validation using Mongoose
* Centralized error logging via `try/catch`
* Prevents invalid or incomplete patient records

---

### 5️⃣ Clean Project Architecture (MVC)

```
src/
 ├── controllers/        # Request handling logic
 ├── models/             # Mongoose schemas
 ├── routes/             # API route definitions
 ├── services/           # Business logic (triage)
 └── config/             # DB & environment setup
```

This structure allows:

* Easy feature expansion
* Independent service testing
* Minimal coupling

---

## 🧪 Example API Flow

**POST** `/api/patients`

Request body:

```json
{
  "name": "John Doe",
  "age": 45,
  "gender": "male",
  "symptoms": "chest pain and difficulty breathing"
}
```

Response:

```json
{
  "message": "Patient case created successfully",
  "data": {
    "severity": "critical",
    "specialization": "cardiology",
    "status": "waiting"
  }
}
```

---

## ⚙️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **dotenv**
* **nodemon** (development)

---

## 📦 Required Installations

### 1️⃣ System Requirements

* Node.js (v18+ recommended)
* MongoDB (local or Atlas)
* npm

---

### 2️⃣ Backend Dependencies

Install using:

```bash
npm install
```

Key packages:

* `express`
* `mongoose`
* `dotenv`
* `nodemon`

---

### 3️⃣ Environment Variables

Create a `.env` file in the backend root:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hospital_db
```

---

## ▶️ How to Run the Project

### Development Mode

```bash
npm run dev
```

Server output:

```
🚀 Server running on port 5000
✅ MongoDB Connected
```

---

### Base URL

```
http://localhost:5000
```

Health check:

```
GET /
```

---

## 🧠 Design Decisions (Important)

* **Rule-based triage instead of AI**

  * Transparent
  * Deterministic
  * Easy to justify academically
* **Service-layer business logic**

  * Keeps controllers thin
  * Future AI replacement is seamless
* **Strict schema validation**

  * Prevents silent data corruption

---

## 🚧 Pending / Planned Features

### 🔜 Phase 2 (Next Logical Steps)

* Doctor model & availability tracking
* Auto doctor assignment based on specialization
* Emergency case prioritization
* Status lifecycle (`waiting → assigned → completed`)

---

### 🔐 Phase 3 (Security & Roles)

* JWT authentication
* Role-based access (Admin / Doctor)
* Protected routes

---

### 📊 Phase 4 (Production Readiness)

* Logs & audit trails
* Pagination & filtering
* API documentation (Swagger)
* Unit tests

---

## 🤝 Contribution Notes (For Future Developers / AI)

* Do **not** move triage logic into controllers
* Keep medical logic deterministic
* Any AI integration must be optional & explainable
* Follow existing MVC pattern strictly

---

## 📄 License

Educational / Academic use

---

## ✨ Final Note

This backend is intentionally designed to **scale in complexity without refactoring**.
Any future developer or AI can extend this system safely by following existing patterns.

---

**Status:** Stable & Feature-Complete for Phase 1
**Ready for:** Viva, Demo, and Extension


# 🏥 Hospital Management System – Backend

A scalable, secure, and modular **Hospital Management Backend API** built with **Node.js, Express, MongoDB**, featuring **JWT authentication**, **role-based access control**, and **AI-ready triage logic**.

This backend is designed to be production-ready and easily extendable by both humans and AI systems.

---

## 📌 Tech Stack

* **Node.js** (v18+ recommended)
* **Express.js**
* **MongoDB** (Mongoose ODM)
* **JWT** (Authentication)
* **bcryptjs** (Password hashing)
* **dotenv** (Environment variables)
* **cors**
* **nodemon** (development)

---

## 📁 Project Structure

```
backend/
│
├── server.js
├── .env
├── package.json
│
└── src/
    ├── app.js
    │
    ├── config/
    │   └── db.js
    │
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── patient.controller.js
    │   ├── doctor.controller.js
    │   └── assignment.controller.js
    │
    ├── models/
    │   ├── User.js
    │   ├── PatientCase.js
    │   └── Doctor.js
    │
    ├── routes/
    │   ├── auth.routes.js
    │   ├── patient.routes.js
    │   ├── doctor.routes.js
    │   ├── triage.routes.js
    │   ├── assignment.routes.js
    │   └── test.routes.js
    │
    ├── services/
    │   └── triage.service.js
    │
    └── middlewares/
        └── auth.middleware.js
```

---

## ⚙️ Environment Variables (`.env`)

Create a `.env` file in the `backend` root:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hospital_db
JWT_SECRET=supersecretkey
NODE_ENV=development
```

---

## 🚀 How to Run the Project

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Start MongoDB

Ensure MongoDB is running locally or update `MONGO_URI`.

### 3️⃣ Run the server

```
npm run dev
```

You should see:

```
🚀 Server running on port 5000
✅ MongoDB Connected
```

---

## 🧪 Health Check

```
GET /health
```

Response:

```json
{
  "status": "OK",
  "message": "Hospital Management Backend is running"
}
```

---

## 🔐 Authentication (Phase 6 – Completed)

### Register

```
POST /api/auth/register
```

Body (JSON):

```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "password123",
  "role": "admin"
}
```

---

### Login

```
POST /api/auth/login
```

Response:

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "id": "...",
    "role": "admin"
  }
}
```

---

### 🔑 Using JWT Token (IMPORTANT)

For protected routes, add **Header**:

```
Authorization: Bearer <PASTE_TOKEN_HERE>
```

No body is required unless the endpoint specifies it.

---

## 🛡️ Protected Route Test

```
GET /api/test
```

Headers:

```
Authorization: Bearer <JWT_TOKEN>
```

Response:

```json
{
  "success": true,
  "message": "Token is valid",
  "user": {
    "id": "...",
    "role": "admin"
  }
}
```

---

## 🧠 AI-Ready Triage System (Phase 3 – Completed)

### Endpoint

```
POST /api/patients
```

Body:

```json
{
  "name": "John Doe",
  "age": 45,
  "gender": "male",
  "symptoms": "chest pain and difficulty breathing"
}
```

Automatically determines:

* severity (`low | medium | high | critical`)
* emergency flag
* doctor specialization

---

## 🏥 Core Features Implemented

✅ Patient case creation
✅ Rule-based triage engine
✅ Doctor specialization mapping
✅ MongoDB schema validation
✅ JWT authentication
✅ Password hashing
✅ Role decoding
✅ Route protection middleware
✅ Modular architecture

---

## 🧩 Pending Phases (Clearly Defined)

### 🔜 Phase 6.1 – Role-Based Route Enforcement

* Admin-only doctor creation
* Admin-only assignment
* Doctor-only patient views

### 🔜 Phase 7 – Assignment Logic

* Auto-assign doctors based on triage
* Doctor availability checks
* Load balancing

### 🔜 Phase 8 – Advanced Features

* Pagination & filtering
* Audit logs
* Rate limiting
* API versioning
* Swagger / OpenAPI docs

### 🔜 Phase 9 – Frontend Integration

* React / Next.js frontend
* Admin dashboard
* Doctor panel
* Patient portal

---

## 🤝 Contribution & Continuation Notes

* Uses **CommonJS** (`require`)
* Folder name is **middlewares** (plural)
* JWT logic centralized in `auth.middleware.js`
* Business logic isolated from controllers
* Safe for AI continuation without refactor

---

## 🧠 Final Notes

This backend is:

* **Not a tutorial project**
* **Production-aligned**
* **AI-extensible**
* **Secure by default**

You are free to extend without breaking architecture.

---

🔥 Built with discipline, clarity, and future-proofing.



git add .
git commit -m "4th commit"
git push origin main

