type Props = { guessesNumber: number };

function WinMessage({ guessesNumber }: Props) {
	const numberParticle = guessesNumber === 1 ? "" : "es";
	return (
		<p>
			<span>Congratulations!</span> Got it in <span>{guessesNumber}</span>
			{`guess${numberParticle}`}.
		</p>
	);
}

export default WinMessage;
