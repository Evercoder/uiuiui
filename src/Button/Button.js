import React from 'react';
import PropTypes from 'prop-types';

import { noop } from '../util/functions';

import './Button.css';

class Button extends React.Component {
	static propTypes = {
		onPush: PropTypes.func,
		disabled: PropTypes.bool,
		className: PropTypes.string
	};

	static defaultProps = {
		disabled: false,
		onPush: noop
	};

	render() {
		return (
			<button
				type="button"
				className={`uix-button ${this.props.className || ''}`}
				onClick={this.props.onPush}
				disabled={this.props.disabled}
			>
				{this.props.children}
			</button>
		);
	}
}

export default Button;
