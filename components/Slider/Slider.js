import React from 'react';
import EventListener from 'react-event-listener';

import { scaleLinear } from 'd3-scale';

import { to_step } from '../util/numbers';

import Surface from '../Surface';

const initial_state = {
	transient_value: null,
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
			transient_value: props.value
		}
		this.computed_props(props);
	}

	componentWillReceiveProps(props) {
		this.setState({
			transient_value: props.value
		});
		this.computed_props(props);
	}

	computed_props(props) {
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

		if (value !== this.state.transient_value) {
			this.setState(
				{ transient_value: value }, 
				() => this.props.onChange(value)
			);
		}
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

				let proposed_value = previous_state.transient_value 
					+ amount * dir * Math.sign(this.props.end - this.props.start);
				return { 
					transient_value: this.format_value(
						this.scale(
							this.scale.invert(proposed_value)
						),
						this.props.increment
					) 
				};
			},
			() => {
				this.props.onChange(this.state.transient_value);
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
			transient_value,
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
							value: transient_value,
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
	start: 0,
	end: 100,
	step: 1,
	precision: 0,
	increment: undefined,
	value: 0,
	vertical: false,
	onChange: (value) => {},
	onStartInteraction: () => {},
	onEndInteraction: () => {}
};

export default Slider;