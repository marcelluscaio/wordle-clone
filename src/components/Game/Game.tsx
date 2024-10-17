import { getNewAnswer } from "./utils";
import GameBoard from "./GameBoard";
import { useState } from "react";

const initialAnswer = getNewAnswer();

function Game() {
	const [answerObject, setAnswerObject] = useState(initialAnswer);
	function resetAnswer() {
		const newAnswer = getNewAnswer();
		setAnswerObject(newAnswer);
	}
	if (!answerObject.success) {
		return (
			<main>
				<p>Something went wrong</p>
				<p>{answerObject.error}</p>
			</main>
		);
	} else {
		return (
			<GameBoard
				answer={answerObject.answer}
				resetAnswer={resetAnswer}
			/>
		);
	}
}

export default Game;
