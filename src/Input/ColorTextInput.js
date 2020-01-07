import React from 'react';
import PropTypes from 'prop-types';
import { formatter } from 'culori';

import { noop } from '../util/functions';

import TextInput from './TextInput';

class ColorTextInput extends React.PureComponent {
	static getDerivedStateFromProps(props, current_state) {
		return {
			value: props.autoFormat ? formatter(props.format)(props.value) : props.value
		};
	}

	constructor(props) {
		super(props);
		this.format_color = this.format_color.bind(this);
		this.state = {};
	}

	format_color(value) {
		return formatter(this.props.format)(value);
	}

	render() {
		return (
			<TextInput
				value={this.state.value}
				valid={this.format_color}
				format={this.format_color}
				onChange={this.props.onChange}
			/>
		);
	}
}

ColorTextInput.propTypes = {
	format: PropTypes.string,
	onChange: PropTypes.func,
	autoFormat: PropTypes.bool
};

ColorTextInput.defaultProps = {
	format: 'hex',
	onChange: noop,
	autoFormat: false
};

export default ColorTextInput;
