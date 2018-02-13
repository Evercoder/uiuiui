import React from 'react';

import { scaleLinear } from 'd3-scale';

import { to_step, clamp, parse_expression, parse_float } from '../util/math';
import { noop } from '../util/functions';

class NumericInput extends React.PureComponent {
	
	constructor(props) {

		super(props);

		this.onKeyDown = this.onKeyDown.bind(this);
		this.onChange = this.onChange.bind(this);
		this.register = this.register.bind(this);
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);

		this.state = {
			transient_value: props.value,
			value: props.value
		};

	}

	componentWillReceiveProps(props) {
		this.setState({
			transient_value: props.value,
			value: props.value
		});
	}

	onKeyDown(e) {
		let handled = true;
		switch (e.key) {
			case 'ArrowUp':
				this.increment(e);
				break;
			case 'ArrowDown':
				this.decrement(e);
				break;
			case 'Enter':
				this.commit();
			default:
				handled = false;
		}

		if (handled) {
			e.preventDefault();
		}
	}

	offset(e, dir) {
		let amount = this.step_amount(e);
		this.setState(
			previous_state => {
				let proposed_value = this.format_user_input() + 
					amount * dir * Math.sign(this.props.end - this.props.start);
				let value = this.format_value(proposed_value, this.props.step);

				return value !== previous_state.transient_value ? {
					transient_value: value,
					value: value
				} : false;
			});
	}

	onChange(e) {
		this.setState({
			transient_value: e.target.value
		});
	}

	componentDidUpdate(prev_props, prev_state) {
		if (this.state.value !== prev_state.value) {
			this.props.onChange(this.state.value, this.props.property);
		}
	}

	step_amount(e) {
		return this.props.increment === undefined ? 
			this.props.step : 
			typeof this.props.increment === 'function' ?
				this.props.increment(e) || this.props.step : 
				this.props.increment ;
	}

	format_value(value, increment) {
		return to_step(
			clamp(value, this.props.start, this.props.end),
			increment || this.props.step, 
			this.props.precision,
			'floor'
		);
	}

	format_user_input() {
		
		let value = this.props.parse_value(this.state.transient_value);

		if (!isNaN(value) && isFinite(value)) {
			return this.format_value(value);
		} else {
			return this.props.value;
		}
	}

	commit() {

		let value = this.format_user_input();

		this.setState({ 
			transient_value: value,
			value: value
		});
	}

	register(input) {
		if (input) {
			this.input = input;
			if (this.props.autofocus) {
				this.input.focus();
			}
		} else {
			this.input = null;
		}
	}

	increment(e) {
		this.offset(e, 1);
	}

	decrement(e) {
		this.offset(e, -1);
	}
 
	render() {

		let {
			type,
			autofocus,
			controls
		} = this.props;

		let {
			transient_value
		} = this.state;

		return (
			<div className='rc-input rc-input--numeric'>
				<input
					ref={this.register}
					onKeyDown={this.onKeyDown}
					onChange={this.onChange}
					type={type}
					value={transient_value}
				/>
				{
					React.Children.map(
						this.props.children,
						child => React.cloneElement(child, {
							increment: this.increment,
							decrement: this.decrement
						})
					)
				}
			</div>
		);
	}
}

const increment_bigger_step_on_shift = (e) => e ? (e.shiftKey ? 10 : 1) : undefined;

NumericInput.defaultProps = {
	type: 'text',
	autofocus: false,
	step: 1,
	precision: 0,
	increment: increment_bigger_step_on_shift,
	start: 0,
	end: 100,
	value: 0,
	onChange: noop,
	property: undefined,
	expressions: true,
	parse_value: parse_float
};

export default NumericInput;