# Tic Tac Toe

A clean, responsive Tic Tac Toe game built with **React 19** and **Vite**. Two players take turns on the same device — the game detects wins, draws, and announces the result in a modal.

## Demo

Live demo - https://tic-tac-toe-one-khaki-72.vercel.app
or
Run it locally with the steps below — the game launches at `http://localhost:5173`.

## Features

- Two-player local gameplay (X vs O)
- Live turn indicator and status message
- Automatic win detection across all 8 winning lines
- Draw detection when the board fills with no winner
- Game-over modal with "Play again" — also dismissible with `Escape` or by clicking the overlay
- Hover preview showing which symbol will land on an empty tile
- Reset button to start a new round at any time
- Fully responsive layout with CSS Modules (scoped styles, no global leakage)

## Tech Stack

- **React 19** — function components, hooks (`useState`, `useEffect`)
- **Vite 8** — dev server and build tool
- **CSS Modules** — scoped component styling
- **ESLint** — with `react-hooks` and `react-refresh` plugins

## What This Project Demonstrates

This repo is small on purpose, but it shows a few React patterns I use intentionally:

- **Custom hooks for state logic** — All game state and rules live in [`useTictactoe`](src/hooks/useTictactoe.jsx), keeping the [`Tictactoe`](src/components/tictactoe/Tictactoe.jsx) component purely presentational. The hook is a clean API: `board`, `handleTileClick`, `resetGame`, `statusMessage`, `gameOver`, `isXNext`.
- **Derived state over stored state** — `winner`, `isDraw`, and `gameOver` are computed from `board` on every render instead of being stored separately. Fewer `useState` calls means fewer chances for state to get out of sync.
- **Effect cleanup** — The `Escape`-to-close listener in [Tictactoe.jsx:25-39](src/components/tictactoe/Tictactoe.jsx#L25-L39) is added and removed with the modal's lifecycle, no leaked listeners.
- **Controlled interaction** — Tiles are `<button disabled={...}>` so already-filled cells aren't clickable and the UI is keyboard-accessible by default.
- **Immutable updates** — Board updates spread into a new array rather than mutating in place, which is how React expects state to change.
- **Separation of concerns** — Rules (hook) / presentation (component) / styles (CSS module) are each in their own file.

## Project Structure

```
src/
├── App.jsx                              # Root component
├── main.jsx                             # React entry point
├── components/
│   └── tictactoe/
│       ├── Tictactoe.jsx                # UI: board, status, modal
│       └── Tictactoe.module.css         # Scoped styles
└── hooks/
    └── useTictactoe.jsx                 # Game state & rules
```

## Getting Started

**Prerequisites:** Node.js 20.19+ or 22.12+ (required by Vite 8).

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview

# Lint
npm run lint
```

## How It Works

The game loop is intentionally simple:

1. `useTictactoe` holds a 9-element array (the board) and a boolean (`isXNext`).
2. On each click, `handleTileClick` checks if the move is legal, writes the current player's symbol into a new array, and flips the turn.
3. `calculateWinner` runs against the board after every render and checks the 8 win conditions.
4. When `gameOver` becomes true, the component opens a modal via `useEffect`.
5. "Play again" resets the board and the turn back to X.

---

Built by [Tal-Hadad](https://github.com/Tal-Hadad) as a small portfolio piece.
