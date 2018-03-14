import React from 'react';
import EventListener from 'react-event-listener';

import { noop } from '../util/functions';

const initial_state = {
	incrementing: false,
	decrementing: false
};

const repeat_delay = 600; // milliseconds
const repeat_interval = 50; // milliseconds

class NumericInputControls extends React.PureComponent {

	constructor(props) {
		super(props);

		this.startIncrement = this.startIncrement.bind(this);
		this.doIncrement = this.doIncrement.bind(this);
		this.stopIncrement = this.stopIncrement.bind(this);

		this.startDecrement = this.startDecrement.bind(this);
		this.doDecrement = this.doDecrement.bind(this);
		this.stopDecrement = this.stopDecrement.bind(this);

		this.end = this.end.bind(this);

		this.state = initial_state;
	}

	startIncrement(e) {
		this.setState({
			incrementing: true
		}, () => {
			this.start(e);
			this.doIncrement(repeat_delay);
		});
		e.preventDefault();
	}

	doIncrement(timeout = repeat_interval) {
		if (this.state.incrementing) {
			this.props.increment();
			window.setTimeout(this.doIncrement, timeout);
		}
	}

	stopIncrement(e) {
		this.setState({
			incrementing: false
		}, () => { this.end(e) });
	}

	start(e) {
		this.props.start(e);
	}

	end(e) {
		this.props.end(e);
	}

	startDecrement(e) {
		this.setState({
			decrementing: true
		}, () => {
			this.start(e);
			this.doDecrement(repeat_delay);
		});
		e.preventDefault();
	}

	doDecrement(timeout = repeat_interval) {
		if (this.state.decrementing) {
			this.props.decrement();
			window.setTimeout(this.doDecrement, timeout);
		}
	}

	stopDecrement(e) {
		this.setState({
			decrementing: false
		}, () => { this.end(e) });
	} 

	render() {

		let {
			incrementing,
			decrementing
		} = this.state;

		return (
			<span className='uix-input__controls'>
				<span 
					className='uix-input__control uix-input__control--increment'
					onMouseDown={this.startIncrement}
				>
					<svg viewBox='0 0 20 9' className='uix-icon uix-icon--uparrow'>
						<path d='M 5 7 L 10 2 L 15 7'/>
					</svg>
				</span>

				{ 
					incrementing && 
						<EventListener
							target='document'
							onMouseUp={this.stopIncrement}
						/>
				}
				
				<span 
					className='uix-input__control uix-input__control--decrement'
					onMouseDown={this.startDecrement}
				>
					<svg viewBox='0 0 20 9' className='uix-icon uix-icon--downarrow'>
						<path d='M 5 2 L 10 7 L 15 2'/>
					</svg>
				</span>

				{ 
					decrementing && 
						<EventListener
							target='document'
							onMouseUp={this.stopDecrement}
						/>
				}
			</span>
		);
	}
};

NumericInputControls.defaultProps = {
	increment: noop,
	decrement: noop,
	end: noop,
	start: noop
};

export default NumericInputControls;