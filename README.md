# Newsletter Renewal Flow - Frontend

This README outlines the solution for the Newsletter Renewal Flow - Frontend, including features, setup, and assumptions made during development.
Features

    Dynamic Flow Simulation: Mimics a real-world newsletter renewal process by sending reminders and updating subscription statuses.
    Real-Time Logs: Displays a detailed progression of events with timestamps to improve traceability.
    Backend Integration: Configurable via environment variables to support various deployment environments.
    Dark-Themed UI: A user-friendly interface with a professional dark mode.

Getting Started
Prerequisites

    Node.js (v18 or newer)
    npm or yarn for package management

Installation Steps

    Clone the repository: git clone https://github.com/KeshavMakkad/Newsletter_Renewal_Flow_Frontend

    Navigate to the project directory: cd newsletter-renewal-frontend

    Install dependencies: Use npm install or yarn install.

Environment Variables

Ensure a .env file exists at the root level of your project with this content:

REACT_APP_BACKEND_URL=https://newsletter-renewal-flow-backend.onrender.com

This URL integrates the frontend with the backend. If not provided, it defaults to http://localhost:3000.
Running the Application

    Start the development server: Run npm start or yarn start.

    Access the app: Open your browser and navigate to http://localhost:3000.

FlowSimulation Component

    The FlowSimulation component drives the newsletter renewal simulation.
    Backend Endpoints Used:
        POST /start to initiate the flow.
        PUT /update to update the flow’s status and logs.

How It Works

    Click Start Flow to begin the simulation.
    Logs dynamically update with timestamps for each step.
    The system sends reminders and handles subscription statuses automatically based on user interaction.

Assumptions

    The backend is deployed and operational.
    API endpoints (/start and /update) comply with expected contract specifications.

Project Structure

    src/components/Flow.jsx: Contains the flow simulation logic.
    src/App.jsx: Frontend entry point.
    App.css: Styles for the dark-themed UI.
    .env: Configuration file for environment variables.
