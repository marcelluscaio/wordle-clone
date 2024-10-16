const NUM_OF_GUESSES_ALLOWED = 6;

const GUESS_LENGTH = 5;

const KEYBOARD_KEYS = [
	["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
	["A", "S", "D", "F", "G", "H", "J", "K", "L"],
	["Z", "X", "C", "V", "B", "N", "M"],
] as const;

const INITAL_GUESS = Array.from({ length: GUESS_LENGTH }, () => ({
	letter: " ",
	status: "" as const,
}));
type TInitialGuess = typeof INITAL_GUESS;
const INITIAL_GUESSES = Array.from(
	{ length: NUM_OF_GUESSES_ALLOWED },
	() => INITAL_GUESS
);

export { NUM_OF_GUESSES_ALLOWED, GUESS_LENGTH, KEYBOARD_KEYS, INITIAL_GUESSES };
export type { TInitialGuess };
