import { getInitialAnswer } from "./utils";
import GameBoard from "./GameBoard";

const initialAnswerTry = getInitialAnswer();

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
