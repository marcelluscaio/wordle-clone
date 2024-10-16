type Props = { guessesNumber: number };

function WinMessage({ guessesNumber }: Props) {
	return (
		<p>
			<span>Congratulations!</span> Got it in <span>{guessesNumber}</span> guesses.
		</p>
	);
}

export default WinMessage;
