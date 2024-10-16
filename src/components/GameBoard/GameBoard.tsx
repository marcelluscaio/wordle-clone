import { useState } from "react";
import type { TGameInfo } from "../Game/Game";
import { validateGuess } from "../Game/utils";
import {
	INITIAL_GUESSES,
	NUM_OF_GUESSES_ALLOWED as GUESSES_AMOUNT,
} from "../../constants";
import WinMessage from "../Game/WinMessage";
import LoseMessage from "../Game/LoseMessage";
import Banner from "../Game/Banner";
import Form from "../Game/Form";
import Keyboard from "../Game/Keyboard";

type Props = {
	answer: string;
};
function GameBoard({ answer }: Props) {
	const initialGame = {
		guesses: [],
		didUserWin: false,
	};
	const [game, setGame] = useState<TGameInfo>(initialGame);
	const { guesses, didUserWin } = game;
	function updateGame(partialGame: Partial<TGameInfo>) {
		setGame((previous) => {
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
		setGame(initialGame);
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
			<Form
				didGameEnd={didGameEnd}
				submitAction={submitGuess}
			/>
			<Keyboard guesses={guesses} />
		</main>
	);
}

export default GameBoard;
