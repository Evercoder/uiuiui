import React from 'react';
import ReactDOM from 'react-dom';

import { identity } from '../util/functions';

const initial_state = {
	left: null,
	top: null
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
			let ref = this.props.reference;
			if (ref) {
				let rect = (typeof ref === 'function' ? ref() : ref).getBoundingClientRect();
				this.setState({
					left: rect.left,
					top: rect.top
				});
			}
		}
	}

	render() {
		let {
			target,
			reference
		} = this.props;

		let { 
			left, 
			top
		} = this.state;

		if (target) {
			return ReactDOM.createPortal(
				<div 
					className='uix-portal' 
					style={
						{
							left: `${left}px`,
							top: `${top}px`
						}
					}
					ref={this.register}
				>
					{ this.props.children }
				</div>, 
				target
			);
		} else {
			return this.props.children;
		}
	}
}

Portal.defaultProps = {
	target: undefined
};

export default Portal;