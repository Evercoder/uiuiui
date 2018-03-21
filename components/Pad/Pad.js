import React from 'react';
import EventListener from 'react-event-listener';

import { scaleLinear } from 'd3-scale';

import { noop } from '../util/functions';
import { to_step, clamp, cycle } from '../util/math';

import './Pad.css';

import { Surface } from '../Surface';

const initial_state = {
	x: null,
	y: null,
	interacting: false
};

class Pad extends React.PureComponent {

	constructor(props) {

		super(props);
		
		// Event handlers
		this.change = this.change.bind(this);
		this.keydown = this.keydown.bind(this);
		this.start = this.start.bind(this);
		this.end = this.end.bind(this);

		// Initial state
		this.state = {
			...initial_state,
			x: props.x,
			y: props.y
		}

		this.computed_props(props);
	}

	componentWillReceiveProps(props) {
		if (this.state.x !== props.x || this.state.y !== props.y) {
			this.setState({
				x: props.x,
				y: props.y
			});
		}
		this.computed_props(props);
	}

	componentDidUpdate(prev_props, prev_state) {
		if (this.state.x !== prev_state.x || this.state.y !== prev_state.y) {
			this.props.onChange({
				x: this.state.x,
				y: this.state.y
			}, this.props.property);
		}
	}

	computed_props(props) {

		// Avoid unnecessary scale reinitialization
		if (
			this.x_scale &&
			this.y_scale &&
			this.props.x_start === props.x_start &&
			this.props.x_end === props.x_end &&
			this.props.y_start === props.y_start &&
			this.props.y_end === props.y_end
		) {
			return;
		}

		this.x_scale = scaleLinear()
			.domain([0, 100])
			.range([props.x_start, props.x_end])
			.clamp(true);

		this.y_scale = scaleLinear()
			.domain([0, 100])
			.range([props.y_start, props.y_end])
			.clamp(true);
	}

	format_x(value, method = clamp) {
		return value 
			? to_step(
				method(value, this.props.x_start, this.props.x_end),
				this.props.x_step, 
				this.props.x_precision)
			: value;
	}

	format_y(value, method = clamp) {
		return value
			? to_step(
				method(value, this.props.y_start, this.props.y_end),
				this.props.y_step, 
				this.props.y_precision)
			: value;
	}

	change({x, y}) {
		let x_val = this.format_x(this.x_scale(x));
		let y_val = this.format_y(this.y_scale(y));

		this.setState(
			previous_state => {
				// Avoid unnecessary renders 
				// when values have not actually changed
				return (
					x_val === previous_state.x &&
					y_val === previous_state.y
				) ? null : { 
					x: x_val,
					y: y_val 
				};
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
			cyclical,
			tabIndex,
			className,
			x_step,
			y_step,
			x_precision,
			y_precision
		} = this.props;

		let {
			x,
			y,
			interacting
		} = this.state;

		return (
			<div 
				className={`
					uix-pad 
					${cyclical ? 'uix-pad--cyclical' : '' } 
					${interacting ? 'uix-pad--interacting' : '' } 
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
							x: x,
							y: y,
							x_scale: this.x_scale,
							y_scale: this.y_scale,
							x_step: x_step,
							y_step: y_step,
							x_precision: x_precision,
							y_precision: y_precision,
							interacting: interacting,
							...child.props
						})
					) 
				}
				</Surface>
			</div>
		);
	}

	step_x_amount(e) {
		return (
			typeof this.props.x_increment === 'function' ? 
				this.props.x_increment(e, this.props) : this.props.x_increment
		) || this.props.x_step;
	}

	step_y_amount(e) {
		return (
			typeof this.props.y_increment === 'function' ? 
				this.props.y_increment(e, this.props) : this.props.y_increment
		) || this.props.y_step;
	}

	offset_x(e, dir) {
		let amount = this.step_x_amount(e) * dir * Math.sign(this.props.x_end - this.props.x_start);
		this.setState(
			previous_state => {
				return { 
					x: this.format_x(
						previous_state.x + amount,
						this.props.cyclical ? cycle : clamp
					) 
				};
			});
	}

	offset_y(e, dir) {
		let amount = this.step_y_amount(e) * dir * Math.sign(this.props.y_end - this.props.y_start);
		this.setState(
			previous_state => {
				return { 
					y: this.format_y(
						previous_state.y + amount,
						this.props.cyclical ? cycle : clamp
					) 
				};
			});
	}

	keydown(e) {
		let handled = true;
		switch (e.key) {
			case 'ArrowUp':
				this.offset_y(e, -1);
				break;
			case 'ArrowDown':
				this.offset_y(e, 1);
				break;
			case 'ArrowLeft':
				this.offset_x(e, -1);
				break;
			case 'ArrowRight':
				this.offset_x(e, 1);
				break;
			default:
				handled = false;
		}
		if (handled) {
			e.preventDefault();
		}
	}
}

Pad.defaultProps = {
	property: undefined,
	x_start: 0,
	x_end: 100,
	y_start: 0,
	y_end: 100,
	x_step: 1,
	y_step: 1,
	x_precision: 0,
	y_precision: 0,
	x_increment: undefined,
	y_increment: undefined,
	x: 0,
	y: 0,
	tabIndex: 0,
	className: undefined,
	cyclical: false,
	onStart: noop,
	onEnd: noop
};

export default Pad;