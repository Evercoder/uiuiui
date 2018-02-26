import React from 'react';

import { scaleLinear } from 'd3-scale';

import { to_step } from '../util/math';
import { noop } from '../util/functions';

import { Surface } from '../Surface';

const initial_state = {
	interacting: false,
	values: undefined
};

class BandPad extends React.Component {

	constructor(props) {

		super(props);

		this.onStart = this.onStart.bind(this);
		this.onEnd = this.onEnd.bind(this);
		this.onChange = this.onChange.bind(this);

		this.state = {
			...initial_state,
			values: props.values || new Array(props.bands).fill(0)
		};

		this.computed_props(props);
	}

	componentWillReceiveProps(props) {
		this.setState({
			values: props.values || new Array(props.bands).fill(0)
		});

		this.computed_props(props);
	}

	computed_props(props) {
		this.scale = scaleLinear()
			.domain([0, 100])
			.range([0, this.props.bands])
			.clamp(true);

	}

	onStart() {
		this.setState({
			interacting: true
		});
	}

	onEnd() {
		this.setState({
			interacting: false
		});
	}

	onChange({x, y}) {

		let band = Math.floor(this.scale(x));
		if (band >= this.props.bands) {
			band = this.props.bands - 1;
		}

		let proposed_value = to_step(100 - y, this.props.step, this.props.precision);

		this.setState(
			previous_state => {
				return {
					values: previous_state.values.map(
						(val, idx) => idx === band ? proposed_value : val
					)
				}
			},
			() => {
				this.props.onChange(this.state.values, this.props.property);
			}
		);
	}

	render() {

		let {
			bands
		} = this.props;

		let { 
			values 
		} = this.state;

		return (
			<div className='uix-bandpad'>
				<Surface
					onStart={this.onStart}
					onEnd={this.onEnd}
					onChange={this.onChange}
				>

					{
						React.Children.map(
							this.props.children,
							child => 
								React.cloneElement(child, {
									bands: bands,
									values: values,
									...child.props
								})
						)
					}

				</Surface>
			</div>
		);
	}
}

BandPad.defaultProps = {
	values: undefined,
	bands: 36,
	step: 1,
	precision: 0,
	onChange: noop,
	property: undefined
};

export default BandPad;