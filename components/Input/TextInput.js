import React from 'react';

import { noop, returnTrue, invariant } from '../util/functions';

class TextInput extends React.Component {

	constructor(props) {
		super(props);
		this.change = this.change.bind(this);
		this.handleKeys = this.handleKeys.bind(this);
		this.register = this.register.bind(this);
		this.commit = this.commit.bind(this);

		this.state = {
			value: props.value,
			transient_value: props.value
		};
	}

	componentWillReceiveProps({ value }) {
		if (value !== this.state.value) {
			this.setState({
				value: value,
				transient_value: value
			})
		}
	}

	componentDidUpdate(previous_props, previous_state) {
		if (this.state.value === previous_state.value) {
			return;
		}
		if (this.state.value !== this.props.value) {
			this.props.onChange(this.state.value, this.props.property);
		}
	}

	change(e) {
		let input_value = e.target.value;

		let state = {
			transient_value: input_value
		};

		if (this.props.valid(input_value)) {
			state['value'] = input_value;
		}

		this.setState(state);
	}

	handleKeys(e) {
		let handled = true;
		switch (e.key) {
			case 'Enter':
				this.commit(e);
				break;
			case 'ArrowUp':
				this.props.onNext(e);
				break;
			case 'ArrowDown':
				this.props.onPrev(e);
				break;
			default:
				handled = false;
		}
		if (handled) {
			e.preventDefault();
		}
	}

	commit(e) {
		this.setState(
			current_state => {
				return current_state.transient_value !== current_state.value ? 
					{ transient_value: current_state.value } : null;
			}, 
			() => {
				this.props.onEnd(e);
			}
		);
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

	render() {

		let {
			className,
			tabIndex
		} = this.props;

		let {
			transient_value
		} = this.state;

		let input_value = transient_value === undefined ? '' : transient_value;

		return (
			<div
				className={`
					uix-input
					${ className || '' }
				`}
			>
				<input
					tabIndex={tabIndex}
					value={input_value}
					onChange={this.change}
					onKeyDown={this.handleKeys}
					onFocus={this.props.onStart}
					onBlur={this.commit}
					ref={this.register}
				/>
				{this.props.children}
			</div>
		);
	}
}

TextInput.defaultProps = {
	tabIndex: 0,
	className: undefined,
	onStart: noop,
	onEnd: noop,
	onPrev: noop,
	onNext: noop,
	valid: returnTrue,
	onChange: noop,
	suffix: '%'
};

export default TextInput;