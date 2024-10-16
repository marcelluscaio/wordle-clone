import { useState, type ChangeEvent, type FormEvent } from "react";
import { getCountStyle } from "./utils";
import type { validateGuessReturn } from "../utils";

type Props = {
	submitAction: (guessInput: string) => validateGuessReturn;
	didGameEnd: boolean;
};

function Form({ submitAction, didGameEnd }: Props) {
	const [guessInput, setGuessInput] = useState("");
	const [error, setErorr] = useState("");

	const inputLenght = guessInput.length;

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		setGuessInput(event.target.value.toUpperCase());
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const result = submitAction(guessInput);
		const { success } = result;
		if (success) {
			setErorr("");
			setGuessInput("");
		} else {
			setErorr(result.message);
		}
	}

	return (
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
				disabled={didGameEnd}
			/>
			<div>
				<p className={"count"}>
					Word count: <span className={getCountStyle(inputLenght)}>{inputLenght}</span>
				</p>
				<p className={"error"}>{error}</p>
			</div>
		</form>
	);
}

export default Form;
