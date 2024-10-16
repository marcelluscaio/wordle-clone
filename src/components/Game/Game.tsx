import { useState, type ChangeEvent, type FormEvent } from "react";

import { sample } from "../../utils/utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED as GUESSES_AMOUNT, GUESS_LENGTH } from "../../constants";

const initialAnswerTry = getInitialAnswer();

type Answer = string;

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
const INITAL_GUESS = Array.from({ length: GUESS_LENGTH }, () => ({
	letter: " ",
	status: "" as const,
}));
type InitialGuess = typeof INITAL_GUESS;
const INITIAL_GUESSES = Array.from({ length: GUESSES_AMOUNT }, () => INITAL_GUESS);

const KEYBOARD_KEYS = [
	["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
	["A", "S", "D", "F", "G", "H", "J", "K", "L"],
	["Z", "X", "C", "V", "B", "N", "M"],
] as const;

function compareWords(guess: string, answer: Answer): Guess {
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

function checkGuess(guess: string, answer: Answer) {
	const comparedWord = compareWords(guess, answer);
	const guessed = comparedWord.every((letter) => letter.status === "correct");
	return { comparedWord, guessed };
}

function getCountStyle(count: number) {
	if (count === 0) {
		return "neuter";
	} else if (count < 5) {
		return "less";
	} else if (count === 5) {
		return "exact";
	} else {
		return "more";
	}
}

const Win = ({ number }: { number: number }) => (
	<p>
		<span>Congratulations!</span> Got it in <span>{number} guesses</span>.
	</p>
);

const Lose = ({ guess }: { guess: string }) => (
	<p>
		<span>Sorry!</span> The correct answer is <span>{guess}</span>.
	</p>
);

function checkLetter(guesses: (Guess | InitialGuess)[], letter: string) {
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

type Guess = { letter: string; status: "incorrect" | "misplaced" | "correct" }[];

function Game() {
	//@ts-expect-error inside game we will get the initial answer. We will extract the error page, and the answer fetching to a parent component
	const [answer, setAnswer] = useState<string>(initialAnswerTry.initialAnswer);
	const [guesses, setGuesses] = useState<(Guess | InitialGuess)[]>([]);
	const [guessed, setGuessed] = useState(false);
	const [guessInput, setGuessInput] = useState("");
	const [error, setErorr] = useState("");

	/* if (!initialAnswerTry.success) {
		return <p>Something went wrong</p>;
	}  */ /* else {
		setAnswer(initialAnswerTry.initialAnswer);
	} */

	const inputLenght = guessInput.length;
	const gameRows = [...guesses, ...INITIAL_GUESSES].slice(0, GUESSES_AMOUNT);

	const endGame =
		guesses.filter((guess) => guess.every((letter) => letter.status !== "")).length ===
			6 || guessed;

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		setGuessInput(event.target.value.toUpperCase());
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (inputLenght !== 5) {
			setErorr("Guess must be a word with five letters");
			return;
		}
		//TODO handle input with numbers
		const { comparedWord, guessed } = checkGuess(guessInput, answer);
		setGuesses((previous) => [...previous, comparedWord]);
		setErorr("");
		setGuessInput("");
		if (guessed) {
			setGuessed(guessed);
		}
	}

	function resetGame() {
		setGuesses([]);
		setGuessed(false);
		setAnswer(sample(WORDS));
	}

	const FinalMessage = guessed ? (
		<Win number={guesses.length} />
	) : (
		<Lose guess={answer} />
	);

	return (
		<>
			{endGame && (
				<div className={`${guessed ? "happy" : "sad"} banner`}>
					{FinalMessage}
					<button onClick={resetGame}>Restart</button>
				</div>
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
			<form
				className="guess-input-wrapper"
				onSubmit={handleSubmit}
			>
				<label htmlFor="guess-input">Enter guess:</label>
				<input
					id="guess-input"
					type="text"
					onChange={handleInputChange}
					value={guessInput}
					disabled={endGame}
				/>
				<div>
					<p className={"count"}>
						Word count: <span className={getCountStyle(inputLenght)}>{inputLenght}</span>
					</p>
					<p className={"error"}>{error}</p>
				</div>
			</form>
			<section className="keyboard">
				{KEYBOARD_KEYS.map((row, index) => (
					<div key={index}>
						{row.map((letter) => (
							<span
								key={letter}
								className={checkLetter(guesses, letter)}
							>
								{letter}
							</span>
						))}
					</div>
				))}
			</section>
		</>
	);
}

export default Game;
