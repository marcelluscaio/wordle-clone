import { KEYBOARD_KEYS, type TInitialGuess } from "../../../../constants";
import type { Guess } from "../GameBoard";

import { getClass } from "./utils";

type Props = {
	guesses: (Guess | TInitialGuess)[];
};

function Keyboard({ guesses }: Props) {
	return (
		<section className="keyboard">
			{KEYBOARD_KEYS.map((row, index) => (
				<div key={index}>
					{row.map((letter) => (
						<span
							key={letter}
							className={getClass(guesses, letter)}
						>
							{letter}
						</span>
					))}
				</div>
			))}
		</section>
	);
}

export default Keyboard;
