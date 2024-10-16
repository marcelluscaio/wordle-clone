import type { TInitialGuess } from "../../../constants";
import type { Guess } from "../Game";

function getClass(guesses: (Guess | TInitialGuess)[], letter: string) {
	const statuses = guesses
		.flat(1)
		.filter((guess) => guess.letter === letter)
		.map((guess) => guess.status);

	if (statuses.includes("correct")) {
		return "correct";
	} else if (statuses.includes("misplaced")) {
		return "misplaced";
	} else if (statuses.includes("incorrect")) {
		return "incorrect";
	}
}
export { getClass };
