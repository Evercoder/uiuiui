import React from 'react';

import {
	MultiSlider,
	MultiSliderHandle
} from '../MultiSlider';

import {
	Gradient as GradientSpectrum
} from '../Spectrum';

class Gradient extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stops: props.stops
		}

		this.onChange = this.onChange.bind(this);
		this.onInsert = this.onInsert.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			stops: props.stops
		});
	}

	onChange(value, stop_idx) {
		this.setState(
			prev_state => {
				return {
					stops: prev_state.stops.map(
						(stop, i) => i === stop_idx ? {...stop, position: value } : stop
					)
				}
			}
		)
	}

	onInsert(value) {
		this.setState(
			prev_state => ({
				stops: prev_state.stops.concat({
					// todo should interpolate colors
					color: 'tomato',
					position: value
				})
			})
		);
	}

	render() {

		let { 
			stops 
		} = this.state;

		return (
			<div className='uiuiui-gradient'>
				<GradientSpectrum stops={stops}/>
				<MultiSlider 
					onChange={this.onChange}
					onInsert={this.onInsert}
				>
					{
						stops.map(
							(stop, idx) => 
								<MultiSliderHandle 
									key={idx} 
									value={stops[idx].position}
									property={idx}
								/>
						)
					}
				</MultiSlider>
			</div>
		);
	}
}

Gradient.defaultProps = {
	stops: [
		{ position: 0, color: '#000' },
		{ position: 100, color: '#fff' }
	]
};

export default Gradient;