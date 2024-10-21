# Wordle Clone in React and TypeScript

A Wordle clone built with React and TypeScript, inspired by the original project created by [Josh Comeau](https://www.joshwcomeau.com/). This version includes several enhancements and a clean, responsive UI, providing a fun and interactive word guessing game experience.

## Demo

Play the game live at: [https://wordle-clone-orpin-ten.vercel.app/](https://wordle-clone-orpin-ten.vercel.app/)

## Features

### Original Features

- **Guess Input**: Players can enter their guesses via a text input that enforces a strict 5-character length for each guess.
- **Feedback on Guesses**: Each letter is compared with the target word, and players receive feedback in the form of colored tiles.
- **Guess Tracking**: The game maintains a list of all player guesses and provides visual feedback on each row of tiles, aligned with the Wordle format.
- **Win/Lose Messages**: A banner is shown when the player wins or loses the game, with a corresponding message based on the outcome.

### Stretch Goals

- **Virtual Keyboard**: Displays an interactive on-screen keyboard showing which letters have been used in previous guesses, helping users track their progress.
- **Game Reset**: A feature to reset the game, clearing all guesses and starting fresh.

### My own stretch goals

- **Migration to TypeScript**: Converted the project to TypeScript, enabling type safety and reducing potential errors.
- **Word Validation**: Ensured the guessed word meets the correct length and checks for numbers or special characters to prevent invalid input.
- **Error handling**: Show user error according to their input.
- **Word Length Indicator**: A dynamic word length count that helps users ensure their guess matches the required length.
- **Changes to CSS**: Refactored CSS to delete unnecessary code, and to enhance code reusability.
- **Different layout according to screen-size**: Improved the layout to adapt to different screen sizes, ensuring a consistent user experience on mobile and desktop devices.

## Project Structure

```
└── 📁src
    └── 📁components
        └── 📁App
            └── App.js
            └── index.js
        └── 📁Game
            └── 📁GameBoard
                └── 📁Banner
                    └── Banner.tsx
                    └── index.js
                └── 📁Form
                    └── Form.tsx
                    └── index.js
                    └── utils.ts
                └── 📁Keyboard
                    └── index.js
                    └── Keyboard.tsx
                    └── utils.ts
                └── 📁LoseMessage
                    └── index.js
                    └── LoseMessage.tsx
                └── 📁WinMessage
                    └── index.js
                    └── WinMessage.tsx
                └── GameBoard.tsx
                └── index.js
                └── utils.ts
            └── Game.tsx
            └── index.js
            └── utils.ts
        └── 📁Header
            └── Header.js
            └── index.js
    └── 📁utils
        └── utils.ts
    └── constants.ts
    └── data.js
    └── index.js
    └── reset.css
    └── styles.css
```
