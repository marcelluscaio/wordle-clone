import type { PropsWithChildren } from "react";

type Props = {
	guessed: boolean;

	resetGame: () => void;
} & PropsWithChildren;
function Banner({ guessed, resetGame, children }: Props) {
	const outcome = guessed ? "happy" : "sad";

	return (
		<div className={`${outcome} banner`}>
			{children}
			<button onClick={resetGame}>Restart</button>
		</div>
	);
}

export default Banner;
