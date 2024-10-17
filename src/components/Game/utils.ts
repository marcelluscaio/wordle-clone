import { WORDS } from "../../data";
import { sample } from "../../utils/utils";

type Answer = string;
type AnswerSuccess = {
	answer: Answer;
	success: true;
};
type AnswerError = {
	error: string;
	success: false;
};
type AnswerTry = AnswerSuccess | AnswerError;

function getNewAnswer(): AnswerTry {
	try {
		return {
			answer: sample(WORDS),
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

export { getNewAnswer };
export type { Answer };
