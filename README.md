# RewardHub Dashboard

## 📖 Project Overview

RewardHub is a modern, responsive, and interactive dashboard built to manage employee performance, track KPI scores, and distribute rewards efficiently. Designed with a premium aesthetic and smooth user experience, it serves as a central hub for administrators and managers to review their team's accomplishments, monitor key metrics, and recognize top performers.

The application includes a fully collapsible sidebar, seamless navigation, interactive data visualizations, and full support for Dark Mode with preferences persisted across sessions.

---

## ✨ Features

- **📊 Interactive Dashboard**
  - High-level overview with key statistics (Total Employees, Avg. Performance Rating, Total Rewards Given).
  - Department-wise performance visualizations using Bar Charts.
  - Reward distribution breakdown using Pie Charts.
  - Feed of recent employee activities and actions.

- **👥 Employee Management**
  - Comprehensive employee table displaying names, roles, departments, performance ratings, and rewards.
  - Real-time search filtering.
  - Clean and accessible modal form to easily add new employees to the system.

- **📈 Performance Tracking**
  - Detailed performance cards for each team member.
  - Custom color-coded KPI progress bars (e.g., Code Quality, Task Completion).
  - 5-star rating system with half-star support.
  - Collapsible manager feedback panels with smooth transitions.
  - Distinctive visual highlighting for the team's "Top Performer".

- **🎁 Rewards System**
  - Visually appealing reward cards showcasing bonuses (in ₹) and assigned perks (gift cards, leaves, etc.).
  - Smooth hover effects (card lift, avatar scaling, dynamic chip colors).
  - Color-coordinated gradient badges representing different recognition tiers.

- **🌙 Global Dark Mode**
  - Seamless toggle between light and dark themes.
  - Clean implementation using Tailwind CSS custom variants.
  - Theme preference securely saved via `localStorage`.

---

## 🛠️ Tech Stack

This project was built leveraging modern web development tools and libraries:

- **Framework:** [React 19](https://react.dev/) via [Vite](https://vitejs.dev/) for lightning-fast HMR and building.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) using the new PostCSS integration for highly customizable, utility-first styling.
- **Data Visualization:** [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/) for responsive, dynamic charts.
- **Icons:** Inlined [Heroicons](https://heroicons.com/) (SVG) to keep the bundle lightweight without external font dependencies.
- **State Management:** React Hooks (`useState`, `useContext`) combined with the Context API for theme handling.
- **Fonts:** [Google Fonts (Inter)](https://fonts.google.com/specimen/Inter) for a clean, modern typography suite.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/SaakshiJha29/Reward-Dashboard.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Reward-Dashboard
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173/`
