import React from 'react';
import EventListener from 'react-event-listener';

import { scaleLinear } from 'd3-scale';

import { to_step, cycle, clamp } from '../util/math';
import { noop } from '../util/functions';

import { Surface } from '../Surface';

const initial_state = {
	value: null,
	interacting: false
};

class Slider extends React.Component {

	constructor(props) {

		super(props);

		// Event handlers
		this.change = this.change.bind(this);
		this.keydown = this.keydown.bind(this);
		this.start = this.start.bind(this);
		this.end = this.end.bind(this);

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

	format_value(value, method = clamp) {
		return to_step(
			method(value, this.props.start, this.props.end), 
			this.props.step, 
			this.props.precision
		);
	}

	change({x, y}) {

		let value = this.format_value(
			this.scale(this.props.vertical ? y : x)
		);

		this.setState(
			previous_state => {
				// Avoid unnecessary renders 
				// when value has not actually changed
				return value === previous_state.value ? null : { value: value }
			}
		);
	}

	start(e) {
		this.setState({
			interacting: true
		}, () => {
			this.props.onStart(e);
		});
	}

	end(e) {
		this.setState({
			interacting: false
		}, () => {
			this.props.onEnd(e);
		});
	}

	render() {

		let {
			vertical,
			circular,
			tabIndex,
			className
		} = this.props;

		let {
			value,
			interacting
		} = this.state;

		return (
			<div 
				className={`
					rc-slider 
					${vertical ? 'rc-slider--vertical' : '' } 
					${circular ? 'rc-slider--circular' : '' } 
					${className || ''}
				`}
				tabIndex={tabIndex}
				onKeyDown={this.keydown}
			>
				<Surface
					onStart={this.start}
					onEnd={this.end} 
					onChange={this.change}
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

	/*
		Keyboard handling
		----------------------------------------------------------------
	*/

	keydown(e) {
		let handled = true;
		switch (e.key) {
			case 'ArrowUp':
			case 'ArrowRight':
				this.offset(e, 1);
				break;
			case 'ArrowDown':
			case 'ArrowLeft':
				this.offset(e, -1);
				break;
			default:
				handled = false;
		}
		if (handled) {
			e.preventDefault();
		}
	}

	step_amount(e) {
		return (
			typeof this.props.increment === 'function' ? 
				this.props.increment(e, this.props) : this.props.increment
		) || this.props.step;
	}

	offset(e, dir) {
		let amount = this.step_amount(e) * dir * Math.sign(this.props.end - this.props.start);
		this.setState(
			previous_state => {
				let value = this.format_value(
					previous_state.value + amount,
					this.props.circular ? cycle : clamp
				);

				// Avoid unnecessary renders 
				// when value has not actually changed
				return value === previous_state.value ? null : { value: value };
			}
		);
	}
}

Slider.defaultProps = {

	className: undefined,
	property: undefined,
	tabIndex: 0,
	
	vertical: false,
	circular: false,
	
	value: 0,
	start: 0,
	end: 100,
	step: 1,
	precision: 0,
	increment: undefined,

	onChange: noop,
	onStart: noop,
	onEnd: noop

};

export default Slider;