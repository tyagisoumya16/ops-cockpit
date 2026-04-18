#Ops Cockpit — Frontend Assignment

#Overview

This project is an **Operations Cockpit UI** designed for monitoring and managing automated workflows.
It simulates a real-world operational dashboard with live updates, failure handling, and user actions.

#Features

# Core UI

3-panel layout:

  * Queue (left)
  * Details (middle)
  * Timeline (right)
* Synchronized state across panels

🔹 Live Data Simulation

* Interval-based updates (every few seconds)
* Simulates real-time system behavior

🔹 Operator Actions

* Retry (with optimistic UI)
* Pause
* Cancel
* Rollback on failure

🔹 Resilience & Failure Handling

* Offline simulation
* Random failure cases
* Conflict-like external updates

🔹 State Management

* URL-based state sync (`?selected=ID&filter=value`)
* Filter support (All / Running / Failed)

🔹 Timeline System

* Event logs for:

  * Updates
  * Actions
  * Failures
    
# Performance Considerations

* Handles large dataset (~200 items)
* Uses memoization (`useMemo`) for filtering
* Avoids unnecessary re-renders

# Architecture Decisions

* Single-page React app (TypeScript)
* Local state used for simplicity (no heavy backend)
* Simulated backend using intervals
* Optimistic updates to improve UX responsiveness

# Tradeoffs

* No real backend (mock simulation only)
* No virtualization (can be added for larger datasets)
* Conflict handling is simulated, not fully resolved

# Tech Stack

* React (TypeScript)
* Vite
* Basic CSS (inline styles)

# How to Run

bash
npm install
npm run dev

Open:

http://localhost:5173

#  AI Usage Disclosure

AI tools were used to:

* Guide architecture decisions
* Debug setup issues
* Improve implementation of optimistic UI and resilience features

All code was reviewed and understood before submission.

# Conclusion

This project demonstrates:

* Real-time UI behavior
* Optimistic UI with rollback
* Failure-aware design
* Scalable frontend architecture

Designed to reflect a **production-like operational interface** rather than a static dashboard.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
