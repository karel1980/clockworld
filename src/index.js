import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';


const Clock = (props) => {
	const hourMarkers = [0,1,2,3,4,5,6,7,8,9,10,11].map((hour) => {
		const hourLabel = hour == 0 ? '12' : hour;
		return (
				<a-entity position="0 0 0.02">
					<a-entity rotation={'0 0 '+hour*360/12}>
						<a-box key={'hourMarker'+hour} color="#333333" position="0 0.12 0"
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
		<Entity position={{x: 0, y: 1.5, z: -2}}>
			<a-cylinder color="#eeeeee" rotation="90 0 0" radius="0.14" height="0.04"></a-cylinder>
			<a-torus color="#43A367" radius="0.16" radius-tubular="0.01"></a-torus>
			{hourMarkers}
			{hourHand}
			{minuteHand}
		</Entity>);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: 'red'};
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  render () {
    return (
      <Scene>
        <a-assets>
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
          <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
        </a-assets>

        <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>
        <Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
        <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
        <Entity particle-system={{preset: 'snow', particleCount: 2000}}/>
        <Entity text={{value: 'Hello, A-Frame React!', align: 'center'}} position={{x: 0, y: 2, z: -1}}/>

		<Clock hour={14} minutes={35}/>

        <Entity primitive="a-camera">
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
        </Entity>
      </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
