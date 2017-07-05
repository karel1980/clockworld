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

const formatHour = (hour) => hour === 0 ? 12 : hour;

export const createAnswer = (correct, hours, minutes) => {
	let label = '';
	const nextHour = hours + 1;
	if (minutes === 0) {
		label = '' + formatHour(hours) + ' uur';
	} else if (minutes < 15) {
		label = minutes + ' over ' + formatHour(hours);
	} else if (minutes === 15) {
		label = 'kwart over ' + formatHour(hours);
	} else if (minutes < 30) {
		label = minutes + ' over ' + formatHour(hours);
	} else if (minutes === 30) {
		label = 'half ' + formatHour(nextHour);
	} else if (minutes < 45) {
		label = (60 - minutes) + ' voor ' + formatHour(nextHour);
	} else if (minutes === 45) {
		label = 'kwart voor ' + formatHour(nextHour);
	} else {
		label = (60 - minutes) + ' voor ' + formatHour(nextHour);
	}
	return {
		correct,
		hours,
		minutes,
		label
	};
};

const BOTH_SMALLER = 0;
const AROUND = 1;
//const BOTH_LARGER = 2;

const generateQuestionAndAnswers = () => {
	const hours = getRandomInt(0, 12);
	const minutes = getRandomInt(0, 11) * 5;

	let offsetMode = getRandomInt(0, 2);
	let offsets;
	if (offsetMode === BOTH_SMALLER) {
		offsets = [ -2, -1 ];
	} else if (offsetMode === AROUND) {
		offsets = [ -1, 1 ];
	} else {
		offsets = [ 1, 2 ];
	}
	const answers = inplaceShuffle([
		createAnswer(true,  hours % 12, minutes),
		createAnswer(false, (hours + offsets[0] + 12) % 12, minutes + getRandomInt(minutes === 0 ? 0:-1, 1) * 5),
		createAnswer(false, (hours + offsets[1] + 12) % 12, minutes + getRandomInt(minutes === 0 ? 0:-1, 1) * 5)
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
				scoreChange: 0
			};
		case Actions.HANDLE_ANSWER:
			const answer = state.answers[action.answer];
			const scoreChange = answer.correct ? 1 : -1;
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
