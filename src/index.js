import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene } from 'aframe-react';
import './components/event-proxy';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect} from 'react-redux';

import {handleAnswer, nextQuestion} from "./actions/clock.actions";

import store from './store.js';

const BaseAnswerButtons = (props) => (
	<a-entity>
		<Entity events={{click:() => props.onAnswer(0)}}>
			<a-box id="answer-1" depth="0.02" height="0.2" width="0.40" color="#ff3333" position="0.6 0 0">
				<Entity primitive="a-text" value={props.answers[0].label} 
					align="center" scale="0.3 0.3" position="0 0.01 0.01"></Entity>
			</a-box>
		</Entity>
		<Entity events={{click:() => props.onAnswer(1)}}>
			<a-box id="answer-2" depth="0.02" height="0.2" width="0.40" color="#33ff33" position="0 0.4 0">
				<Entity primitive="a-text" value={props.answers[1].label} 
					align="center" scale="0.3 0.3" position="0 0.01 0.01"></Entity>
			</a-box>
		</Entity>
		<Entity events={{click:() => props.onAnswer(2)}}>
			<a-box id="answer-3" depth="0.02" height="0.2" width="0.40" color="#3333ff" position="-0.6 0 0">
				<Entity primitive="a-text" value={props.answers[2].label} 
					align="center" scale="0.3 0.3" position="0 0.01 0.01"></Entity>
			</a-box>
		</Entity>
	</a-entity>
);

const mstp = (state) => {
	console.log('TTT', state);
	return {
		...state
	};
};

const mdtp = (dispatch) => ({});

const AnswerButtons = connect( mstp, mdtp )(BaseAnswerButtons);


const Clock = (props) => {
	const hourMarkers = [0,1,2,3,4,5,6,7,8,9,10,11].map((hour) => {
		const hourLabel = hour === 0 ? '12' : hour;
		return (
				<a-entity key={'hourMaker-'+hour} position="0 0 0.02">
					<a-entity rotation={'0 0 '+hour*360/12}>
						<a-box color="#333333" position="0 0.12 0"
							depth="0.01" height="0.03" width="0.01"></a-box>
					</a-entity>
					<a-entity rotation={'0 0 '+(-hour*360/12)}>
						<a-entity position="0 0.24 0">
							<a-text scale="0.3 0.3" rotation={'0 0 '+(hour*360/12)} value={hourLabel} align="center"></a-text>
						</a-entity>
					</a-entity>
				</a-entity>)
	});

	const hourHand = (<a-entity position="0 0 0.02">
					<a-entity rotation={'0 0 '+ -(props.hour+props.minutes/60)*360/12}>
						<a-box color="#ff0000" position="0 0.035 0.01"
							depth="0.01" height="0.07" width="0.01"></a-box>
					</a-entity>
				</a-entity>);

	const minuteHand = (<a-entity position="0 0 0.02">
					<a-entity rotation={'0 0 '+ -(props.minutes*6)}>
						<a-box color="#00ff00" position="0 0.045 0.01"
							depth="0.01" height="0.09" width="0.01"></a-box>
					</a-entity>
				</a-entity>);

	return (
		<a-entity>
			<a-cylinder color="#eeeeee" rotation="90 0 0" radius="0.14" height="0.04"></a-cylinder>
			<a-torus color="#43A367" radius="0.16" radius-tubular="0.01"></a-torus>
			{hourMarkers}
			{hourHand}
			{minuteHand}
		</a-entity>)
}

const BaseApp = (props) => (
<Scene>
	<a-assets>
		<img id="skyTexture" src="react-vr-3d.jpg"/>
	</a-assets>

	{/*environment*/}
	<Entity primitive="a-light" type="ambient" color="#445451"/>
	<Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
	<Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="180" width="2048"/>

	{/*clock and answers*/}
	{props.question && props.answers &&
	<a-entity position="0 1.5 -1">
		<Clock hour={props.question.hours} minutes={props.question.minutes}/>
		<AnswerButtons answers={props.answers} onAnswer={props.handleAnswer}/>
	</a-entity>}

	<a-text value={props.score} position="0 0.5 -2"></a-text>

	{/*test box*/}
	{/*<a-cylinder id="plusOne" color="#F55" radius="0.1"
	 animation="startEvents: plusOne; property: color; dir: alternate; dur: 1000; easing: easeInSine; loop: false; to: #5F5"
	 animation__scale="startEvents: plusOne; property: scale; dir: alternate; dur: 200; easing: easeInSine; loop: false; to: 1.2 1 1.2"
	 animation__yoyo="startEvents: plusOne; property: position; dir: alternate; dur: 1000; easing: easeInSine; loop: false; to: 0 2 0">
	 </a-cylinder>
	 <a-box id="plusOneBox" event-proxy="emit: plusOne" mixin="option" depth="0.02" height="0.2" width="0.40" color="#ff00ff" position="0.6 0 0"></a-box>
	 */}

	{props.scoreChange !== 0 &&
	<Entity primitive="a-text"
	        value={props.scoreChange === 1 ? '+1' : '-1'}
	        color={props.scoreChange > 0 ? '#5f0' : '#F55'} height="3"
	        animation__position="property: position; dur: 500; repeat: 1; to: 0 1.5 -2;"
	        animation__alpha="property: opacity; dur: 500; repeat: 1; to: 0;"
	        position="0 1 -2"
	        events={{animationcomplete: () => props.nextQuestion()}}>
	</Entity>
	}

	{/*camera/cursor*/}
	<Entity primitive="a-camera">
		<Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
	</Entity>
</Scene>
);

const mapStateToProps = (state) => {
	console.log('mapping state to props for App', state);
	return state;
}

const mapDispatchToProps = (dispatch) => ({
	nextQuestion: () => {
		console.log('FFFF show next question');
		return dispatch(nextQuestion());
	},
	handleAnswer: (answer) => {
		console.log('user chose answer', answer);
		dispatch(handleAnswer(answer));
	}
});

const App = connect(
	mapStateToProps,
	mapDispatchToProps,
)(BaseApp);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.querySelector('#sceneContainer'));
