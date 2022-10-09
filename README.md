# Bertrand Xchange

Bertrand Xchange is a full-stack AI-powered trading exchange platform, designed to simulate real-time market data, offer advanced trading features, and provide AI-driven insights. This project showcases a modern, professional, and visually impressive trading dashboard.

<a href="https://bertrandAmobi.github.io/bertrand-exchange/">
  <img src="/images/app-image.png" width="100%" />
</a>

---

🔗 **[Live Demo](https://bertrandAmobi.github.io/bertrand-exchange/)**

</div>

> **Live Demo (GitHub Pages):** Uses a fully client-side market simulation so the dashboard remains interactive without backend infrastructure.

---

## Table of Contents
1. [Project Vision](#project-vision)
2. [Core Features](#core-features)
3. [Architecture](#architecture)
4. [Tech Stack](#tech-stack)
5. [Repository Structure](#repository-structure)
6. [Frontend Demo Experience](#frontend-demo-experience)
7. [Backend Services](#backend-services)
8. [AI & Market Simulation](#ai--market-simulation)
9. [Local Setup](#local-setup)
10. [Environment Variables](#environment-variables)
11. [Build & Deployment](#build--deployment)
12. [GitHub Pages Notes](#github-pages-notes)
13. [Scripts Reference](#scripts-reference)
14. [Roadmap](#roadmap)
15. [LICENSE](LICENSE)
16. [Disclaimer](#disclaimer)

---

## Project Vision
Bertrand Xchange demonstrates what a modern AI-assisted trading interface can feel like:
- fast and responsive dashboard interactions,
- simulated real-time market movement,
- portfolio and performance visibility,
- intelligent insight framing for decision support.

The app is intentionally built as a user-friendly showcase with clean modular code and production-like structure.

---

## Core Features

### Trading Dashboard (Frontend)
- User-friendly layout with dark/light theme support.
- Live-updating trend chart with animation.
- Market selector chips for instant symbol switching.
- Smart order panel with order-type controls (market, limit, stop-loss).
- Account overview panel (cash, portfolio value, recent orders).
- Live AI-style news feed and insights.
- Footer attribution + source link with GitHub icon.

### Backend System (APIs + Services)
- Express API skeleton with modular routes/controllers.
- JWT auth flow (`signup`, `signin`) with bcrypt password hashing.
- User account model with balance, watchlist, and order history.
- In-memory order book/matching engine for demo trading logic.
- Socket market broadcaster for server-side real-time extensions.

### Deployment
- Frontend production bundle copied to `/docs` for GitHub Pages.
- Root redirect `index.html` forwards to docs demo route.
- GitHub Actions workflow auto-builds and deploys Pages artifacts.

---

## Architecture

```text
Monorepo
├── backend/      # Express + Mongo model + trading services + socket simulation
├── frontend/     # React + Redux + charting + demo simulation UI
├── docs/         # Generated static build for GitHub Pages
├── scripts/      # Build helper for pages artifact generation
└── .github/      # CI workflow for pages deployment
```

Data flow in demo mode:
1. `useDemoMarket` updates prices/candles/news on an interval.
2. Redux store receives tick updates.
3. UI panels re-render (chart, watchlist chips, metrics, feed).
4. Order actions append simulated trades for immediate UX feedback.

---

## Tech Stack

### Frontend
- React 18
- Redux Toolkit
- Chart.js + react-chartjs-2
- Vite
- CSS custom properties for theme system

### Backend
- Node.js
- Express
- Socket.IO
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

### DevOps / Delivery
- npm workspaces
- GitHub Actions (Pages deployment)

---

## Repository Structure

```bash
bertrand-exchange
├── .github/
│   └── workflows/
│       └── pages.yml
├── backend/
│   ├── package.json
│   └── src/
│       ├── ai/
│       │   └── predictor.js
│       ├── app.js
│       ├── config/
│       │   └── env.js
│       ├── controllers/
│       │   ├── authController.js
│       │   └── tradingController.js
│       ├── middleware/
│       │   └── auth.js
│       ├── models/
│       │   └── User.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   └── tradingRoutes.js
│       ├── server.js
│       ├── services/
│       │   └── tradingEngine.js
│       └── sockets/
│           └── marketSocket.js
├── docs/
│   ├── assets/
│   │   ├── index-BLT9uWJr.css
│   │   ├── index-BWf-cHmw.js
│   │   ├── index-CMsDV33E.js
│   │   ├── index-CYKs1jcv.js
│   │   ├── index-DsO6Ladp.css
│   │   └── index-dMW4vxmR.css
│   └── index.html
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── MarketChart.jsx
│   │   │   └── OrderPanel.jsx
│   │   ├── data/
│   │   │   └── demoSeed.js
│   │   ├── hooks/
│   │   │   └── useDemoMarket.js
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   └── App.jsx
│   │   ├── store/
│   │   │   └── store.js
│   │   ├── styles/
│   │   │   └── app.css
│   │   └── utils/
│   │       └── indicators.js
│   └── vite.config.js
├── images/
│   └── app-image.png
└── scripts/
    └── build-pages.mjs
├── index.html
├── package.json
├── package-lock.json
├── .gitignore
├── .gitkeep
├── LICENSE
└── README.md
```

---

## Frontend Demo Experience
- **Theme Toggle:** switch between dark/light mode.
- **Chart Animation:** smooth transitions on every simulated tick.
- **Interactive Controls:** clickable symbols, order panel, recent trade updates.
- **Professional UI Polish:** hover states, spacing, consistent design language.
- **Responsive Layout:** adapts to desktop/tablet/mobile widths.

---

## Backend Services
The backend is intentionally lightweight but production-structured:
- `app.js`: middleware and route wiring.
- `server.js`: HTTP server + Socket.IO bootstrap.
- `controllers/`: auth and trading handlers.
- `services/tradingEngine.js`: in-memory order book and matching logic.
- `models/User.js`: persistent account schema.
- `sockets/marketSocket.js`: server-side market stream simulation.

---

## AI & Market Simulation

### AI-style insight generation
- Momentum and average-price based heuristic insight output.
- Demonstrates AI feature plumbing and UX presentation layer.

### Market data simulation
- Drift-based random walk for price movement.
- Rolling candle/trend buffers per symbol.
- Random event-style headlines for feed dynamics.

---

## Local Setup

### Prerequisites
- Node.js 20+
- npm 10+
- (optional) local MongoDB instance

### Install dependencies
```bash
npm install
```

### Run frontend + backend concurrently
```bash
npm run dev
```

- Frontend: typically `http://localhost:5173`
- Backend: typically `http://localhost:5000`

---

## Environment Variables
Create a `.env` file for backend configuration if needed:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bertrand_xchange
JWT_SECRET=change-me-in-production
```

If MongoDB is unavailable, the app still supports demo-focused behavior.

---

## Build & Deployment

### Standard production build
```bash
npm run build
```

### Build GitHub Pages artifacts
```bash
npm run build:pages
```
This will:
1. Build `frontend/dist`
2. Copy artifacts into `/docs`
3. Ensure root `index.html` redirects to `/docs/`

---

## GitHub Pages Notes
- Vite base is configured for repository path hosting.
- GitHub workflow builds and deploys Pages artifacts automatically.
- If you rename the repository, update `frontend/vite.config.js` `base` path accordingly.

---

## Scripts Reference

### Root
- `npm run dev` – run backend + frontend concurrently.
- `npm run build` – build frontend and backend build target.
- `npm run build:pages` – generate deployable docs artifacts for Pages.

### Backend workspace
- `npm run dev --workspace backend`
- `npm run start --workspace backend`

### Frontend workspace
- `npm run dev --workspace frontend`
- `npm run build --workspace frontend`
- `npm run preview --workspace frontend`

---

## Roadmap
Potential production-grade upgrades:
- real exchange market data integration,
- persistent order/trade storage layer,
- advanced technical indicators (MACD/EMA/Bollinger),
- strategy backtesting tools,
- OAuth-based identity providers,
- role-based access and audit logs,
- full test coverage (unit + integration + e2e).

---

## Licence

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Disclaimer
This project is for **educational and demonstration purposes only**.
It is **not** financial advice and is **not** intended for real-money trading.

