import React, { PureComponent } from 'react';

const KEY_PROPS = {
	27: 'onEsc',
	13: 'onEnter'
};

class GlobalKey extends PureComponent {
	componentDidMount() {
		document.addEventListener('keypress', this.handleKeyPress);
	}

	componentWillUnmount() {
		document.removeEventListener('keypress', this.handleKeyPress);
	}

	handleKeyPress = e => {
		const { keycode } = e;
		if (
			this.props.hasOwnProperty(KEY_PROPS[keyCode]) &&
			typeof this.props.hasOwnProperty(KEY_PROPS[keyCode]) === 'function'
		) {
			this.props.hasOwnProperty(KEY_PROPS[keyCode])(e);
		}
	};
}

export default GlobalKey;
