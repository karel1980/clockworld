import Actions from './actions/clock.actions';

const initialState = {
	question: undefined,
	answers: undefined,
	scoreChange: 0,
	score: 0,
};

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function inplaceShuffle(array) {
	var m = array.length, t, i;

	// While there remain elements to shuffle…
	while (m) {

		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}

const createAnswer = (correct, hours, minutes) => {
	const minutesPadded = (minutes < 10 ? '0' : '') + minutes;
	const label = '' + hours + ':' + minutesPadded;
	return {
		correct,
		hours,
		minutes,
		label
	};
};

const generateQuestionAndAnswers = () => {
	const hours = getRandomInt(0, 12);
	const minutes = getRandomInt(0, 11) * 5;

	const hourOffset = getRandomInt(-2, 0);
	const answers = inplaceShuffle([
		createAnswer(true, hours + hourOffset, minutes),
		createAnswer(false, hours + hourOffset + 1, minutes + getRandomInt(-1, 1) * 5),
		createAnswer(false, hours + hourOffset + 2, minutes + getRandomInt(-1, 1) * 5)
	]);

	return {
		question: {
			hours: hours,
			minutes: minutes
		},
		answers: answers
	}
};

const clockWorldReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.NEXT_QUESTION:
			return {
				...state,
				...generateQuestionAndAnswers(),
				scoreChange: 0,
				score: 0
			};
		case Actions.HANDLE_ANSWER:
			const scoreChange = action.answer.correct ? 1 : -1;
			return state = {
				...state,
				scoreChange: scoreChange,
				score: state.score + scoreChange
			};
		default:
			return state;
	}
};

export default clockWorldReducer;