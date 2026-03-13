# Task Insight Dashboard

**React • TypeScript • Tailwind CSS • Vitest • React Testing Library**

A responsive task management dashboard built with **React, TypeScript, and Tailwind CSS**. Users can add, edit, delete, and filter tasks while tracking completion progress in a clean, accessible interface.

**Testing Overview:**
Developed with **Test-Driven Development (TDD)** and a comprehensive automated test suite using **Vitest (Jest-compatible)** and **React Testing Library**, ensuring reliable functionality and real user interaction coverage.

**Live Demo:**
[https://task-insight-dashboard.netlify.app/](https://task-insight-dashboard.netlify.app/)

![Task Insight Dashboard Screenshot](assets/screenshot.png)

## Features

* Add, edit (inline), delete, and toggle completion of tasks
* Filter tasks by completion status (All / Completed / Incomplete) with persisted state using `localStorage`
* Fetches initial tasks from a public example API
* Accessible UI using ARIA attributes
* Responsive layout for multiple screen sizes
* Built with **TypeScript** for type safety
* CRUD operations for task management
* Automated **unit and integration tests** ensure code reliability
* Developed following **Test-Driven Development (TDD)** principles

## Tech Stack

* **Frontend:** React (Functional Components, Hooks)
* **Languages:** TypeScript, JavaScript (ES6+)
* **Styling:** Tailwind CSS
* **Persistence:** LocalStorage
* **Data Fetching:** Fetch API
* **Testing:** Vitest & React Testing Library

## Project Structure

* `src/components/` – reusable UI components (`TaskCard`, `TaskList`, `TaskFilter`, `AddTask`)
* `src/types.ts` – shared TypeScript types and domain models
* [`src/App.test.jsx`](https://github.com/khanm3/task-insight-dashboard/blob/main/src/App.test.jsx) – main test suite using **Vitest (Jest-compatible)** and **React Testing Library**
* `src/App.jsx` – root application component
* `src/main.jsx` – application entry point

## Testing Highlights

* Developed automated **unit and integration tests** using [**Vitest (Jest-compatible) and React Testing Library**](https://github.com/khanm3/task-insight-dashboard/blob/main/src/App.test.jsx)
* Tests cover rendering, user interactions, inline editing, task filtering, state persistence, and CRUD operations
* Followed **Test-Driven Development (TDD)** to define expected behaviors before implementation
* Mocked API calls and persisted UI state for reliable, isolated test results
* Simulated **real user interactions** with React Testing Library best practices (`getByRole`, `userEvent`, etc.)

## Installation

### Prerequisites

* Node.js 22.20 (Recommended via [nvm](https://github.com/nvm-sh/nvm))

### Steps

1. Clone the repo: `git clone https://github.com/khanm3/task-insight-dashboard.git`
2. Navigate: `cd task-insight-dashboard`
3. Use correct Node version: `nvm use`
4. Install dependencies: `npm install`
5. Start development server: `npm run dev`

## Running Tests

* Run all tests: `npm test`
* Includes tests for filtering, persistence, CRUD operations, and UI behaviors
* Developed using **TDD** to ensure predictable functionality

## Usage

* Add new tasks using the task input field
* Toggle task completion using the checkbox
* Edit task titles inline
* Delete tasks from the list
* Filter tasks by completion status (All / Completed / Incomplete)
* Reload the page — the selected filter will persist

## Key Learnings

* Strengthened understanding of **React Hooks and state management**
* Practiced **component-based architecture** with reusable, modular UI elements
* Developed **accessible interfaces** using ARIA attributes
* Built **type-safe applications** with TypeScript
* Created **robust automated tests** using Vitest (Jest-compatible) and React Testing Library
* Practiced **TDD**, mocking APIs, and simulating user interactions
* Designed **responsive layouts** with Tailwind CSS

## Future Improvements

* Expand CRUD functionality with backend API integration
* Add drag-and-drop task ordering
* Implement custom statuses and priorities for tasks
* Optional dark mode and enhanced styling
