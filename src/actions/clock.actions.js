
const Actions = {
	NEXT_QUESTION: 'NEXT_QUESTION',
	HANDLE_ANSWER: 'HANDLE_ANSWER'
};

export const nextQuestion = () => ({
	type: Actions.NEXT_QUESTION
});

export const handleAnswer = (answer) => ({
	type: Actions.HANDLE_ANSWER,
	answer: answer
});

export default Actions;
