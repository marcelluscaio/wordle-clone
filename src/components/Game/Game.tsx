import { sample } from "../../utils/utils";
import { WORDS } from "../../data";
import type { TInitialGuess } from "../../constants";
import GameBoard from "../GameBoard";

const initialAnswerTry = getInitialAnswer();
type Answer = string;
export type { Answer };
type InitialAnswerTry =
	| {
			initialAnswer: Answer;
			success: true;
	  }
	| {
			error: string;
			success: false;
	  };
function getInitialAnswer(): InitialAnswerTry {
	try {
		return {
			initialAnswer: sample(WORDS),
			success: true,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error occurred";
		return {
			error: message,
			success: false,
		};
	}
}

type Guess = { letter: string; status: "incorrect" | "misplaced" | "correct" }[];
export type { Guess };

type TGameInfo = {
	guesses: (Guess | TInitialGuess)[];
	didUserWin: boolean;
};
export type { TGameInfo };

function Game() {
	if (!initialAnswerTry.success) {
		return (
			<main>
				<p>Something went wrong</p>
				<p>{initialAnswerTry.error}</p>
			</main>
		);
	} else {
		return <GameBoard answer={initialAnswerTry.initialAnswer} />;
	}
}

export default Game;
