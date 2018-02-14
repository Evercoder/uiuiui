import React from 'react';
import EventListener from 'react-event-listener';

import Surface from '../Surface';

import { noop } from '../util/functions';

const initial_state = {
	interacting: false
};

class MultiSlider extends React.Component {
	
	constructor(props) {
		super(props);
		this.onStartInteraction = this.onStartInteraction.bind(this);
		this.onEndInteraction = this.onEndInteraction.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onInsert = this.onInsert.bind(this);
		this.state = initial_state;
	}

	onStartInteraction(e, property) {
		this.setState({
			interacting: true,
			interacting_property: property
		});
	}

	onEndInteraction(e) {
		this.setState({
			interacting: false,
			interacting_property: null
		});
	}

	onChange({x, y}) {
		this.props.onChange(x, this.state.interacting_property);
	}

	onInsert({x, y}) {
		this.props.onInsert(x);
	}

	render() {

		let {
			interacting
		} = this.state;

		return (
			<div className='rc-multislider'>

				<Surface 
					passive 
					interacting={interacting}
					onChange={this.onChange}
					onInsert={this.onInsert}
				>

				{
					React.Children.map(
						this.props.children,
						child => 
							React.cloneElement(child, {
								onStartInteraction: this.onStartInteraction
							})
					)
				}
				</Surface>

				{
					interacting &&
						<EventListener
							target='document'
							onMouseUp={this.onEndInteraction}
						/>
				}
			</div>
		);
	}
}

MultiSlider.defaultProps = {
	onChange: noop,
	onInsert: noop
};

export default MultiSlider;