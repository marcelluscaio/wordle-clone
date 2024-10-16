type Props = { answer: string };

function LoseMessage({ answer }: Props) {
	return (
		<p>
			<span>Sorry!</span> The correct answer is <span>{answer}</span>.
		</p>
	);
}

export default LoseMessage;
