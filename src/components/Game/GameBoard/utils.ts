import { GUESS_LENGTH } from "../../../constants";
import { isValidString } from "../../../utils/utils";
import type { Answer } from "../utils";

import type { Guess, TGameInfo } from "./GameBoard";

function compareEachLetter(guess: string, answer: Answer): Guess {
	const guessAsArray = guess.split("");
	return guessAsArray.map((letter, index) => {
		const result = { letter, status: "incorrect" } as Guess[number];
		if (letter === answer[index]) {
			result.status = "correct";
		} else if (answer.includes(letter)) {
			result.status = "misplaced";
		}
		return result;
	});
}

function compareGuessAndAnswer(guess: string, answer: Answer) {
	const comparedWord = compareEachLetter(guess, answer);
	const isGuessRight = comparedWord.every((letter) => letter.status === "correct");
	return { comparedWord, isGuessRight };
}

type validateGuessReturn = { success: true } | { success: false; message: string };
export type { validateGuessReturn };
function validateGuess(
	guessInput: string,
	answer: string,
	updateGame: (partialGame: Partial<TGameInfo>) => void
): validateGuessReturn {
	if (guessInput.length !== GUESS_LENGTH) {
		return { success: false, message: "Guess must be a word with five letters" };
	}
	if (!isValidString(guessInput)) {
		return { success: false, message: "No numbers or special characters allowed" };
	}
	const { comparedWord, isGuessRight } = compareGuessAndAnswer(guessInput, answer);
	updateGame({ guesses: [comparedWord], didUserWin: isGuessRight });

	return { success: true };
}

export { validateGuess };
