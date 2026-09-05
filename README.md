# CARBONLENS — Urban Carbon Footprint Calculator

> **Track. Understand. Reduce Your Campus Carbon Footprint.**

**Event:** AVINYA 2026 — EcoInnovate Challenge  
**Organized by:** Prakriti Club × Techniche | IIT Guwahati  
**Team:** Tech-Bro  
**Platform Status:** Production-Quality Full-Stack Application  

---

## 🌿 Core Philosophy

CarbonLens is built on a direct, action-oriented philosophy:

$$\text{\bf TRACK} \longrightarrow \text{\bf UNDERSTAND} \longrightarrow \text{\bf REDUCE}$$

1. **TRACK:** Users enter their real daily habits across commuting, electricity consumption, food choices, and waste generation.
2. **UNDERSTAND:** CarbonLens automatically identifies root causes, determines the biggest contributor to personal emissions, and provides data-backed explanations.
3. **REDUCE:** The platform generates tailored action plans and provides a real-time **What-If Simulator** where users test lifestyle changes before committing.
4. **MEASURE & SCALE:** Historical progress is monitored over time, while privacy-safe aggregation delivers institutional decarbonization analytics for university administration.

---

## 🚀 Key Features

* **5-Step Carbon Wizard:** Fluid, validated intake flow for Transport, Energy, Food, and Solid Waste with zero-negative input enforcement and live CO₂ subtotal previews.
* **Automated Contributor Detection:** Algorithms detect which specific category produces the largest share of CO₂ (e.g., *"Transport is your biggest contributor"*).
* **Personalized Conditional Action Plans:** Dynamic recommendations customized to each user’s actual data rather than generic static text.
* **Real-Time What-If Simulator:** Interactive sliders modifying commuting distances, vehicle modes, kWh electricity, dietary shifts, and recycling percentages with instant client- and server-side recalculation.
* **Scenario Comparison Matrix:** Save named scenarios (e.g. *Scenario A: Baseline*, *Scenario B: Bus Commute*, *Scenario C: Zero Waste*) and automatically benchmark the **Best Reduction Scenario**.
* **Progress Tracking & Trajectory Classification:** Month-over-month historical analysis classifying trends into **↓ Decreasing**, **→ Stable**, and **↑ Increasing**.
* **Aggregated Campus Analytics:** Anonymized institutional dashboard displaying total participants, average footprint, category weightings, and 6-month decarbonization trends with strict privacy preservation.
* **Multi-Campus Hierarchy:** Database architecture supporting expansion: `University → Campus → Users → Calculations → Aggregated Analytics`.
* **Gamification & Eco-Badges:** Non-shaming encouragement system awarding badges for consistency, percentage milestones (10% and 25% reduction), eco-transit, and high diversion rates.
* **Campus Sustainability Challenges:** Community campaigns (*Cycle Week*, *Public Transport Week*, *Energy Saving Challenge*, *Zero Waste Challenge*) with real participant progress tracking.
* **Centralized Emission Factor System:** Fully decoupled configuration with public transparency APIs distinguishing illustrative demo factors from official CEA/IPCC baselines.
* **1-Click Demo Mode:** Pre-fills the wizard with standardized benchmark parameters (20 km/day car, 150 kWh/mo electricity, regular diet, 2 kg/day waste, 60% recycling) for hackathon jury evaluation.

---

## 🛠 Technology Stack

### Frontend
* **React 18** (Modern functional components & hooks)
* **Tailwind CSS v3** (Custom dark eco-futuristic palette, glassmorphism, responsive utilities)
* **Vite 6** (Blazing fast HMR and optimized production bundling)
* **React Router v6** (Client-side routing with scroll restoration)
* **Recharts** (Interactive Donut charts, Category bar charts, Trend area charts, Comparison charts)
* **Lucide React** (Modern clean iconography)
* **Axios** (Configured HTTP client with JWT interceptors)

### Backend
* **Python 3.13 / 3.11+**
* **Flask 3.1** (RESTful API factory pattern, Blueprint architecture)
* **Flask-CORS** (Cross-Origin Resource Sharing for modern SPA integration)
* **Flask-SQLAlchemy 3.1 & SQLAlchemy 2.0 ORM** (Database abstraction)
* **PyJWT 2.10** (Secure stateless JWT authentication)
* **Werkzeug 3.1** (Cryptographic PBKDF2-HMAC password hashing)
* **python-dotenv** (Environment variable isolation)

### Database
* **SQLite 3** (Default for development and hackathon demonstrations)
* Configured for seamless migration to **PostgreSQL** or **MongoDB** via SQLAlchemy dialect configurations.

---

## 📂 Project Structure

```text
carbonlens/
│
├── frontend/
│   ├── src/
│   │   ├── charts/
│   │   │   ├── DonutChart.jsx          # Category breakdown donut chart
│   │   │   ├── CategoryBarChart.jsx    # Category subtotal bar chart
│   │   │   ├── TrendChart.jsx          # Historical area trend chart
│   │   │   └── ComparisonChart.jsx     # Current vs Simulated bar chart
│   │   ├── components/
│   │   │   ├── calculator/
│   │   │   │   ├── ProgressBar.jsx     # 5-step interactive wizard indicator
│   │   │   │   ├── TransportStep.jsx   # Commute distance, vehicle mode, days
│   │   │   │   ├── EnergyStep.jsx      # Electricity kWh input & CEA notice
│   │   │   │   ├── FoodStep.jsx        # Diet patterns (Regular, Veg, Plant-based)
│   │   │   │   ├── WasteStep.jsx       # Daily waste & live recycling slider
│   │   │   │   └── ReviewStep.jsx      # Summary review before submission
│   │   │   ├── Navbar.jsx              # Responsive navigation with notifications & profile
│   │   │   ├── Footer.jsx              # Mission statement & legal disclaimer
│   │   │   ├── BadgeDisplay.jsx        # Unlocked eco-badges and milestones
│   │   │   ├── ChallengeCard.jsx       # Campus challenge cards & join handler
│   │   │   └── NotificationPanel.jsx   # In-app notification drawer
│   │   ├── hooks/
│   │   │   └── useAuth.jsx             # Authentication context & state
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx         # Hero, philosophy, features, mission
│   │   │   ├── CalculatorPage.jsx      # 5-step wizard with demo loader
│   │   │   ├── DashboardPage.jsx       # Central dashboard & root cause card
│   │   │   ├── WhatIfPage.jsx          # Real-time simulator & scenario matrix
│   │   │   ├── ProgressPage.jsx        # Historical timeline & trend classification
│   │   │   ├── CampusPage.jsx          # Aggregated institutional analytics
│   │   │   ├── ChallengesPage.jsx      # Campus-wide decarbonization campaigns
│   │   │   ├── HowItWorksPage.jsx      # Methodology & factor transparency
│   │   │   ├── LoginPage.jsx           # Sign in with 1-click demo login
│   │   │   └── RegisterPage.jsx        # Account registration
│   │   ├── services/
│   │   │   └── api.js                  # Axios instance with auth interceptors
│   │   ├── utils/
│   │   │   ├── formatters.js           # Metric formatters and styling tokens
│   │   │   └── validators.js           # Validation and input boundaries
│   │   ├── App.jsx                     # Route definitions
│   │   ├── main.jsx                    # React DOM root
│   │   └── index.css                   # Global glassmorphism & typography
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/
│   ├── app.py                          # Flask app factory, blueprints & seeding
│   ├── config/
│   │   ├── settings.py                 # App settings, DB URI & JWT keys
│   │   └── emission_factors.py         # Centralized emission factors & notes
│   ├── models/
│   │   ├── user.py                     # User model with password hashing
│   │   ├── calculation.py              # CarbonCalculation records
│   │   ├── campus.py                   # University, Campus & Aggregates
│   │   ├── challenge.py                # Campus challenges & participants
│   │   ├── badge.py                    # Badges & UserBadges
│   │   ├── scenario.py                 # Saved What-If scenarios
│   │   ├── notification.py             # In-app notifications
│   │   └── emission_factor.py          # Database emission factor overrides
│   ├── calculations/
│   │   ├── engine.py                   # Pure mathematical calculation engine
│   │   └── recommendations.py          # Conditional recommendation engine
│   ├── routes/
│   │   ├── auth.py                     # Register, Login, Me endpoints
│   │   ├── calculations.py             # Calculation CRUD, Simulate, Compare
│   │   ├── dashboard.py                # Central dashboard & recommendations
│   │   ├── scenarios.py                # Scenario saving and listing
│   │   ├── campus.py                   # Privacy-safe campus analytics
│   │   ├── challenges.py               # Campus challenges & join route
│   │   ├── badges.py                   # User badges route
│   │   ├── notifications.py            # Notification management
│   │   └── emission_factors.py         # Transparency endpoint
│   ├── services/
│   │   ├── auth_service.py             # JWT token handling & decorators
│   │   ├── badge_service.py            # Badge evaluation rules
│   │   ├── campus_service.py           # Anonymized SQL aggregations
│   │   └── demo_service.py             # Seeding challenges, campuses & badges
│   ├── tests/
│   │   └── test_engine.py              # Unit & integration test suite
│   └── requirements.txt
│
├── database/
│   └── carbonlens.db                   # SQLite database
├── .env.example
└── README.md
```

---

## ⚡ Quick Start Guide

### Prerequisites
* **Python 3.10+** (Tested on Python 3.13)
* **Node.js 18+** (Tested on Node.js v24.19 LTS)
* **npm** or **pnpm**

---

### 1. Backend Setup & Startup

1. Open a terminal and navigate to the project directory:
   ```bash
   cd "carbon calculator"
   ```

2. Install Python dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. (Optional) Configure environment variables:
   ```bash
   cp .env.example .env
   ```

4. Run the backend automated test suite:
   ```bash
   python -m unittest backend/tests/test_engine.py
   ```

5. Start the Flask backend server:
   ```bash
   python backend/app.py
   ```
   * The backend starts on `http://127.0.0.1:5000`
   * Database tables and demo data are automatically initialized on startup.

---

### 2. Frontend Setup & Startup

1. Open a new terminal window and navigate to `frontend`:
   ```bash
   cd "carbon calculator/frontend"
   ```

2. Install Node dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   * The application is available at `http://localhost:5173`

---

## 🔬 Calculation Methodology

The core formula executed by `backend/calculations/engine.py`:

$$\text{Total CO}_2 = \text{Transport CO}_2 + \text{Energy CO}_2 + \text{Food CO}_2 + \text{Waste CO}_2$$

### 1. Transport Emissions
$$\text{Transport CO}_2 = \text{Daily Distance (km)} \times \text{Mode Factor} \times \text{Commute Days per Month}$$
* **Car:** $0.21\text{ kg CO}_2/\text{km}$
* **Motorcycle:** $0.11\text{ kg CO}_2/\text{km}$
* **Bus:** $0.05\text{ kg CO}_2/\text{km/passenger}$
* **Train:** $0.03\text{ kg CO}_2/\text{km/passenger}$
* **Bicycle / Walking:** $0.00\text{ kg CO}_2/\text{km}$ (Zero operational emissions)

### 2. Energy / Electricity Emissions
$$\text{Energy CO}_2 = \text{Monthly Electricity (kWh)} \times \text{Grid Emission Factor}$$
* **Illustrative Grid Factor:** $0.82\text{ kg CO}_2/\text{kWh}$ (Calibrated to Indian national grid averages).

### 3. Food Emissions
$$\text{Food CO}_2 = \text{Dietary Baseline Footprint (kg CO}_2/\text{month)}$$
* **Regular (Mixed Diet):** $150.0\text{ kg CO}_2/\text{month}$
* **Vegetarian (Lacto-Veg):** $95.0\text{ kg CO}_2/\text{month}$
* **Mostly Plant-Based:** $60.0\text{ kg CO}_2/\text{month}$

### 4. Waste Emissions
$$\text{Base Waste} = \text{Daily Waste (kg)} \times 0.5 \times 30$$
$$\text{Net Waste CO}_2 = \text{Base Waste} \times \left(1 - \frac{\text{Recycling \%}}{100} \times 0.70\right)$$
* Demonstrates real mathematical leverage: shifting recycling from $20\%$ to $60\%$ reduces monthly waste emissions from $25.8\text{ kg}$ down to $17.4\text{ kg}$.

---

## 🛡 Emission Factor Transparency

All emission factors are decoupled from frontend views and stored strictly in `backend/config/emission_factors.py`.

> [!NOTE]
> **Scientific Integrity Disclaimer:** Emission factors in this version are **illustrative demonstration estimates**. In production deployment, they should be connected directly to verified regional databases:
> * **CEA (Central Electricity Authority):** Annual CO₂ Baseline Database for the Indian Power Sector.
> * **FAO / IPCC:** Life Cycle Analysis datasets for Indian food production.
> * **CPCB:** Municipal Solid Waste characterization datasets.

Transparency endpoint:
```http
GET /api/emission-factors
```

---

## 🔒 Privacy & Security Architecture

* **No Plaintext Passwords:** Passwords are never stored in plaintext; they are securely hashed using `werkzeug.security.generate_password_hash` with PBKDF2-HMAC-SHA256 and salt.
* **JWT Authentication:** Stateless, signed JSON Web Tokens for API requests.
* **Campus Anonymity:** Campus dashboards only execute aggregate SQL functions (`COUNT`, `AVG`, `SUM`). Individual records, emails, or personal identifiers are never returned in aggregate endpoints.
* **Input Validation:** Strict server-side and client-side boundary checks rejecting negative numbers, excessive values, and invalid enumerations.

---

## 🔮 Future Expansion Scope

1. **Mobile Application (React Native):** Direct reuse of the calculation engine and API service layer for iOS and Android campus apps.
2. **IoT Smart Meter Integration:** Automatic ingestion of electricity usage from smart campus hostel meters.
3. **Multi-Campus Network:** Federated expansion enabling inter-university competitions between IIT Guwahati, IIT Bombay, IIT Delhi, and global institutions.
4. **Verified Carbon Offsets:** Micro-offsetting partnerships allowing student clubs to fund campus tree planting or solar canopy installations.

---

## 🏆 AVINYA 2026 Credits

* **Event:** AVINYA 2026 — EcoInnovate Challenge
* **Organized by:** Prakriti Club × Techniche | Indian Institute of Technology Guwahati
* **Team:** Tech-Bro
* **License:** MIT License
