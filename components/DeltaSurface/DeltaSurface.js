import React from 'react';
import EventListener from 'react-event-listener';

import { scaleLinear } from 'd3-scale';

// import { Surface } from '../Surface';

import { noop } from '../util/functions';

const initial_state = {
	interacting: false
};

class DeltaSurface extends React.Component {

	constructor(props) {
		super(props);
		
		this.startInteraction = this.startInteraction.bind(this);
		this.doInteraction = this.doInteraction.bind(this);
		this.endInteraction = this.endInteraction.bind(this);

		this.state = initial_state;

		this.scale = scaleLinear()
			.domain([0, 1])
			.range([this.props.start, this.props.end])
			.clamp(true)
	}

	startInteraction(e) {
		this.setState({
			interacting: true
		});
		this._initial_x = e.clientX;
		this._initial_y = e.clientY;
		e.preventDefault();
	}

	endInteraction(e) {
		this.setState({
			interacting: false
		});
		e.preventDefault();
	}

	doInteraction(e) {
		this.props.onChange({
			x: e.clientX - this._initial_x,
			y: e.clientY - this._initial_y
		});
	}

	render() {

		let {
			interacting
		} = this.state;

		let {
			vertical
		} = this.props;

		return (
			<div 
				className='rc-deltasurface'
				onMouseDown={this.startInteraction}
			>
				{
					interacting &&
						<EventListener
							target='document'
							onMouseMove={this.doInteraction}
							onMouseUp={this.endInteraction}
						/>
				}

				{ 'DeltaSurface' }
			</div>
		)
	}
}

DeltaSurface.defaultProps = {
	onChange: noop
};

export default DeltaSurface;