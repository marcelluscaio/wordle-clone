import { WORDS } from "../../data";
import { sample } from "../../utils/utils";

type Answer = string;
type AnswerSuccess = {
	initialAnswer: Answer;
	success: true;
};
type AnswerError = {
	error: string;
	success: false;
};
type InitialAnswerTry = AnswerSuccess | AnswerError;

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

export { getInitialAnswer };
export type { Answer };
