import {registerComponent} from 'aframe';
import 'aframe-react';

/**
 *  * Listen to an event.
 *   * When that event is emitted, emit an event on another entity.
 *    */
registerComponent('event-proxy', {
	schema: {
		listen: {default: ''},
		target: {type: 'selector'},
		emit: {default: ''}
	},

	update: function () {
		var data = this.data;
		this.el.addEventListener(data.listen, function () {
			data.target('whatever');
		});
	}
});
