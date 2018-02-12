import React from 'react';
import EventListener from 'react-event-listener';

import { scaleLinear } from 'd3-scale';

import { to_step } from '../util/math';

import './Pad.css';

import Surface from '../Surface';

const initial_state = {
	transient_x: null,
	transient_y: null,
	interacting: false
};

class Pad extends React.PureComponent {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onStartInteraction = this.onStartInteraction.bind(this);
		this.onEndInteraction = this.onEndInteraction.bind(this);
		this.state = {
			...initial_state,
			transient_x: props.x,
			transient_y: props.y
		}
		this.computed_props(props);
	}

	componentWillReceiveProps(props) {
		this.setState({
			transient_x: props.x,
			transient_y: props.y
		});
		this.computed_props(props);
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

	format_x(value, increment) {
		return to_step(value, increment === undefined ? this.props.x_step : increment, this.props.x_precision);
	}

	format_y(value, increment) {
		return to_step(value, increment === undefined ? this.props.y_step : increment, this.props.y_precision);
	}

	onChange({x, y}) {
		let x_val = this.format_x(this.x_scale(x));
		let y_val = this.format_y(this.y_scale(y));
		if (x_val !== this.state.transient_x || y_val !== this.state.transient_y) {
			this.setState({
				transient_x: x_val,
				transient_y: y_val
			});
			this.props.onChange({ 
				x: x_val, 
				y: y_val 
			}, this.props.property);
		}
	}

	onStartInteraction() {
		this.setState({
			interacting: true
		});
	}

	onEndInteraction() {
		this.setState({
			interacting: false
		});
	}

	offset_x(dir) {
		this.setState(
			previous_state => {

				let amount = this.props.x_increment === undefined ? 
					this.props.x_step : this.props.x_increment;

				let proposed_value = previous_state.transient_x + 
					amount * dir * Math.sign(this.props.x_end - this.props.x_start);
				return { 
					transient_x: this.format_x(
						this.x_scale(
							this.x_scale.invert(proposed_value)
						)
					) 
				};
			},
			() => {
				this.props.onChange({ 
					x: this.state.transient_x, 
					y: this.state.transient_y 
				}, this.props.property);
			}
		);
	}

	offset_y(dir) {
		this.setState(
			previous_state => {

				let amount = this.props.y_increment === undefined ? 
					this.props.y_step : this.props.y_increment;

				let proposed_value = previous_state.transient_y + 
					amount * dir * Math.sign(this.props.y_end - this.props.y_start);
				return { 
					transient_y: this.format_y(
						this.y_scale(
							this.y_scale.invert(proposed_value)
						)
					) 
				};
			},
			() => {
				this.props.onChange({ 
					x: this.state.transient_x, 
					y: this.state.transient_y 
				}, this.props.property);
			}
		);
	}

	onKeyDown(e) {
		let handled = true;
		switch (e.key) {
			case 'ArrowUp':
				this.offset_y(-1);
				break;
			case 'ArrowDown':
				this.offset_y(1);
				break;
			case 'ArrowLeft':
				this.offset_x(-1);
				break;
			case 'ArrowRight':
				this.offset_x(1);
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
			transient_x,
			transient_y,
			interacting
		} = this.state;

		let {
			x_step,
			y_step
		} = this.props;

		return (
			<div 
				className='rc-pad'
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
							
							x: transient_x,
							y: transient_y,
							x_scale: this.x_scale,
							y_scale: this.y_scale,
							x_step: x_step,
							y_step: y_step,
							interacting: interacting,

							...child.props
						})
					) 
				}
				</Surface>
			</div>
		);
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
	x: 50,
	y: 50
};

export default Pad;