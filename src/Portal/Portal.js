import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { identity } from '../util/functions';

import './Portal.css';

const initial_state = {
	rect: {}
};

class Portal extends React.Component {
	constructor(props) {
		super(props);
		this.register = this.register.bind(this);
		this.state = initial_state;
	}

	register(el) {
		this.el = el;
		if (el) {
			let ref = this.props.mirror;
			if (ref) {
				let rect = (typeof ref === 'function' ? ref() : ref).getBoundingClientRect();
				this.setState({
					rect: rect
				});
			}
		}
	}

	render() {
		let { target, mirror, className } = this.props;

		let { rect } = this.state;

		if (target) {
			return ReactDOM.createPortal(
				<div
					className={`
						uix-portal
						${className || ''} 
					`}
					style={{
						left: `${rect.left}px`,
						top: `${rect.top}px`,
						width: `${rect.width}px`,
						height: `${rect.height}px`
					}}
					ref={this.register}
				>
					{this.props.children}
				</div>,
				target
			);
		} else {
			return this.props.children;
		}
	}
}

Portal.propTypes = {
	className: PropTypes.string,
	target: PropTypes.object,
	mirror: PropTypes.object
};

Portal.defaultProps = {};

export default Portal;
