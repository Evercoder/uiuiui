import React from 'react';
import EventListener from 'react-event-listener';

import { scaleLinear } from 'd3-scale';

import { to_step } from '../util/math';
import { noop } from '../util/functions';

import Surface from '../Surface';

const initial_state = {
	value: null,
	interacting: false
};

class Slider extends React.Component {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onStartInteraction = this.onStartInteraction.bind(this);
		this.onEndInteraction = this.onEndInteraction.bind(this);
		this.state = {
			...initial_state,
			value: props.value
		}
		this.computed_props(props);
	}

	componentWillReceiveProps(props) {
		if (this.state.value !== props.value) {
			this.setState({
				value: props.value
			});
		}
		this.computed_props(props);
	}

	componentDidUpdate(prev_props, prev_state) {
		if (this.state.value !== prev_state.value) {
			this.props.onChange(this.state.value, this.props.property);
		}
	}

	computed_props(props) {

		if (
			this.scale &&
			this.props.vertical === props.vertical &&
			this.props.start === props.start &&
			this.props.end === props.end
		) {
			return;
		}

		this.scale = scaleLinear()
			.domain([0, 100])
			.range(
				this.props.vertical ? 
					[props.end, props.start] : 
					[props.start, props.end]
			)
			.clamp(true);
	}

	format_value(value, increment) {
		return to_step(value, increment === undefined ? this.props.step : increment, this.props.precision);
	}

	onChange({x, y}) {

		let value = this.format_value(
			this.scale(this.props.vertical ? y : x)
		);

		this.setState(
			previous_state => {

				// Avoid unnecessary renders when value has not actually changed
				if (value === previous_state.value) {
					return null;
				}

				return { 
					value: value 
				};
			}
		);
	}

	onStartInteraction() {
		this.setState({
			interacting: true
		}, () => {
			this.props.onEndInteraction();
		});
	}

	onEndInteraction() {
		this.setState({
			interacting: false
		}, () => {
			this.props.onEndInteraction();
		});
	}

	offset_value(dir) {

		this.setState(
			previous_state => {

				let amount = this.props.increment === undefined ? this.props.step : this.props.increment;

				let proposed_value = previous_state.value 
					+ amount * dir * Math.sign(this.props.end - this.props.start);

				let value = this.format_value(
					this.scale(
						this.scale.invert(proposed_value)
					),
					this.props.increment
				);

				// Avoid unnecessary renders when value has not actually changed
				if (value === previous_state.value) {
					return null;
				}

				return { 
					value: value
				};
			}
		);
	}

	onKeyDown(e) {
		let handled = true;
		switch (e.key) {
			case 'ArrowUp':
			case 'ArrowRight':
				this.offset_value(1);
				break;
			case 'ArrowDown':
			case 'ArrowLeft':
				this.offset_value(-1);
				break;
			default:
				handled = false;
		}
		if (handled) {
			e.preventDefault();
		}
	}

	render() {

		let {
			value,
			interacting
		} = this.state;

		let {
			vertical
		} = this.props;

		return (
			<div 
				className={`rc-slider ${vertical ? 'rc-slider--vertical' : '' }`}
				tabIndex='0'
				onKeyDown={this.onKeyDown}
			>
				<Surface
					onStartInteraction={this.onStartInteraction}
					onEndInteraction={this.onEndInteraction} 
					onChange={this.onChange}
				>
				{ 
					React.Children.map(
						this.props.children, 
						child => React.cloneElement(child, {
							value: value,
							scale: this.scale,
							interacting: interacting,
							vertical: vertical,

							...child.props
						})
					) 
				}
				</Surface>
			</div>
		);
	}
}

Slider.defaultProps = {
	property: undefined,
	start: 0,
	end: 100,
	step: 1,
	precision: 0,
	increment: undefined,
	value: 0,
	vertical: false,
	onChange: noop,
	onStartInteraction: noop,
	onEndInteraction: noop
};

export default Slider;