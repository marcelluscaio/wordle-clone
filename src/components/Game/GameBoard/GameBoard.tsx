import { useState } from "react";
import { validateGuess } from "./utils";
import {
	INITIAL_GUESSES,
	NUM_OF_GUESSES_ALLOWED as GUESSES_AMOUNT,
	type TInitialGuess,
} from "../../../constants";
import WinMessage from "./WinMessage";
import LoseMessage from "./LoseMessage";
import Banner from "./Banner";
import Form from "./Form";
import Keyboard from "./Keyboard";

type Guess = { letter: string; status: "incorrect" | "misplaced" | "correct" }[];

type TGameInfo = {
	guesses: (Guess | TInitialGuess)[];
	didUserWin: boolean;
};

type Props = {
	answer: string;
	resetAnswer: () => void;
};

function GameBoard({ answer, resetAnswer }: Props) {
	const initialGame = {
		guesses: [],
		didUserWin: false,
	};
	const [gameInfo, setGameInfo] = useState<TGameInfo>(initialGame);
	const { guesses, didUserWin } = gameInfo;
	function updateGame(partialGame: Partial<TGameInfo>) {
		setGameInfo((previous) => {
			const result = partialGame.guesses
				? {
						...previous,
						...partialGame,
						guesses: [...previous.guesses, ...partialGame.guesses],
				  }
				: { ...previous, ...partialGame };

			return result;
		});
	}

	function submitGuess(guessInput: string) {
		return validateGuess(guessInput, answer, updateGame);
	}

	const gameRows = [...guesses, ...INITIAL_GUESSES].slice(0, GUESSES_AMOUNT);

	const didGameEnd =
		guesses.filter((guess) => guess.every((letter) => letter.status !== "")).length ===
			6 || didUserWin;

	function resetGame() {
		setGameInfo(initialGame);
		resetAnswer();
	}

	const FinalMessage = didUserWin ? (
		<WinMessage guessesNumber={guesses.length} />
	) : (
		<LoseMessage answer={answer} />
	);

	return (
		<main>
			{didGameEnd && (
				<Banner
					guessed={didUserWin}
					resetGame={resetGame}
				>
					{FinalMessage}
				</Banner>
			)}

			<div className="guess-results">
				{gameRows.map((guesses, index) => (
					<p
						key={index}
						className="guess"
					>
						{guesses.map((guess, index) => (
							<span
								key={index}
								className={`cell ${guess.status}`}
							>
								{guess.letter}
							</span>
						))}
					</p>
				))}
			</div>
			<div className="form-container">
				<Form
					didGameEnd={didGameEnd}
					submitAction={submitGuess}
				/>
				<Keyboard guesses={guesses} />
			</div>
		</main>
	);
}

export default GameBoard;
export type { TGameInfo, Guess };
