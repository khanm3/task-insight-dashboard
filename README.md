# Task Insight Dashboard
A React dashboard for exploring and interacting with tasks, built as a learning project to strengthen React skills.

## Motivation
I wanted to practice building React applications that fetch data from an API and maintain state across sessions. This project allowed me to experiment with component structure, state management, and persisting user interactions with localStorage.

## Features
- Fetches a list of tasks from a public example API for developers.
- Select tasks to mark them as “active” (bolded text).
- Persist task selection across page reloads using localStorage.
- Simple interface built with React functional components and hooks.

## Tech Stack
- React (Functional Components, Hooks)
- JavaScript (ES6+)
- HTML5 & CSS3
- LocalStorage for state persistence
- Fetch API for retrieving tasks
- Vitest & React Testing Library for testing

## Demo
Check out the live demo: [Task Insight Dashboard Live](https://task-insight-dashboard.netlify.app/)

*(Screenshot placeholder — UI is minimal at the moment, but will be enhanced with CSS in future updates.)*

## Installation
1. Clone the repo: `git clone https://github.com/yourusername/task-insight-dashboard.git`
2. Install dependencies: `npm install`
3. Start the app: `npm start`

## Running Tests
- Run all tests: `npm test`
- Includes tests for persisting task selection after page reload, written using Vitest and React Testing Library.
- One feature was developed using Test-Driven Development (TDD) principles.

## Usage
- Click on a task to select it (text will be bolded).
- Reload the page — your selected tasks will persist.

## Key Learnings
- Strengthened understanding of React Hooks and state management.
- Practiced persisting UI state with localStorage.
- Learned to fetch and display data from an external API.
- Gained experience structuring a small React project and handling user interactions.
- Gained hands-on experience writing tests with Vitest/React Testing Library and applying TDD for one feature.

## Future Improvements
- Add, edit, and delete tasks to implement full CRUD functionality using React and localStorage.
- Enable custom statuses and priorities for tasks, expanding filtering options.
- Enhance UI with responsive design and a polished, mobile-friendly layout.
- Optionally, integrate with a backend API in the future for cloud persistence.
