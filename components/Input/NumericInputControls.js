import React from 'react';
import EventListener from 'react-event-listener';

const initial_state = {
	incrementing: false,
	decrementing: false
};

class NumericInputControls extends React.PureComponent {

	constructor(props) {
		super(props);

		this.startIncrement = this.startIncrement.bind(this);
		this.doIncrement = this.doIncrement.bind(this);
		this.stopIncrement = this.stopIncrement.bind(this);

		this.startDecrement = this.startDecrement.bind(this);
		this.doDecrement = this.doDecrement.bind(this);
		this.stopDecrement = this.stopDecrement.bind(this);

		this.state = initial_state;
	}

	startIncrement(e) {
		this.setState({
			incrementing: true
		}, () => {
			this.doIncrement(600);
		});
	}

	doIncrement(timeout = 1000/20) {
		if (this.state.incrementing) {
			this.props.increment();
			window.setTimeout(this.doIncrement, timeout);
		}
	}

	stopIncrement(e) {
		this.setState({
			incrementing: false
		});
	}

	startDecrement(e) {
		this.setState({
			decrementing: true
		}, () => {
			this.doDecrement(600);
		});
	}

	doDecrement(timeout = 1000/20) {
		if (this.state.decrementing) {
			this.props.decrement();
			window.setTimeout(this.doDecrement, timeout);
		}
	}

	stopDecrement(e) {
		this.setState({
			decrementing: false
		});
	} 

	render() {

		let {
			incrementing,
			decrementing
		} = this.state;

		return (
			<span className='rc-input__controls'>
				<span 
					className='rc-input__control rc-input__control--increment'
					onMouseDown={this.startIncrement}
				/>

				{ 
					incrementing && 
						<EventListener
							target='document'
							onMouseUp={this.stopIncrement}
						/>
				}
				
				<span 
					className='rc-input__control rc-input__control--decrement'
					onMouseDown={this.startDecrement}
				/>

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

export default NumericInputControls;