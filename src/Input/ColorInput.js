import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Husk from '../Husk/Husk';
import Popup from '../Popup/Popup';
import Portal from '../Portal/Portal';
import { identity, noop } from '../util/functions';

import './ColorInput.css';

class ColorInput extends React.Component {
	static getDerivedStateFromProps(props, current_state) {
		return props.value !== current_state.prev_prop_value
			? {
					value: props.value,
					prev_prop_value: props.value
			  }
			: null;
	}

	constructor(props) {
		super(props);
		this.change = this.change.bind(this);
		this.start = this.start.bind(this);
		this.end = this.end.bind(this);
		this.register = this.register.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);

		this.state = {
			interacting: false,
			initial_value: props.value,
			prev_prop_value: undefined
		};
	}

	componentDidUpdate() {
		if (this.state.value !== this.props.value) {
			this.props.onChange(this.state.value, this.props.property);
		}
	}

	change(value) {
		this.setState({ value });
	}

	start() {
		this.setState({ interacting: true }, () => {
			this.props.onStart();
		});
	}

	end() {
		this.setState({ interacting: false }, () => {
			this.props.onEnd();
		});
	}

	cancel() {
		this.setState(
			{
				interacting: false,
				value: this.state.initial_value
			},
			() => {
				this.props.onCancel();
			}
		);
	}

	register(el) {
		this._el = el;
	}

	onKeyDown(e) {
		if (this.props.shouldKeyDownEndInteraction(e)) {
			e.stopImmediatePropagation();
			this.end();
		} else if (this.props.shouldKeyDownCancelInteraction(e)) {
			e.stopImmediatePropagation();
			this.cancel();
		}
	}

	onKeyUp(e) {
		if (this.props.shouldKeyUpEndInteraction(e)) {
			e.stopImmediatePropagation();
			this.end();
		} else if (this.props.shouldKeyUpCancelInteraction(e)) {
			e.stopImmediatePropagation();
			this.cancel();
		}
	}

	render() {
		let { interacting, value } = this.state;

		let { className, target, mirror } = this.props;

		return (
			<div
				className={`
					uix-colorinput
					${className || ''}
				`}
				ref={this.register}
			>
				<div className="uix-colorinput__current" onClick={this.start}>
					{this.props.current(value)}
				</div>
				{interacting && (
					<Portal target={target} mirror={mirror || this._el}>
						<Popup
							className={`
									uix-colorinput__popup 
									${target ? 'uix-colorinput__popup--portal' : ''}
								`}
							onClose={this.end}
						>
							<Husk
								useEffect={() => {
									document.addEventListener('keydown', this.onKeyDown, true);
									document.addEventListener('keyup', this.onKeyUp, true);
									return () => {
										document.removeEventListener(
											'keydown',
											this.onKeyDown,
											true
										);
										document.removeEventListener('keyup', this.onKeyUp, true);
									};
								}}
							/>

							{React.Children.map(this.props.children, child =>
								React.cloneElement(child, {
									value: value,
									onChange: this.change
								})
							)}
						</Popup>
					</Portal>
				)}
			</div>
		);
	}
}

ColorInput.propTypes = {
	property: PropTypes.any,
	value: PropTypes.string,
	onChange: PropTypes.func,
	onStart: PropTypes.func,
	onEnd: PropTypes.func,
	onCancel: PropTypes.func,
	shouldKeyDownEndInteraction: PropTypes.func,
	shouldKeyUpEndInteraction: PropTypes.func,
	shouldKeyDownCancelInteraction: PropTypes.func,
	shouldKeyUpCancelInteraction: PropTypes.func,
	current: PropTypes.any
};

ColorInput.defaultProps = {
	onChange: noop,
	onStart: noop,
	onEnd: noop,
	onCancel: noop,
	shouldKeyDownEndInteraction: noop,
	shouldKeyUpEndInteraction: noop,
	shouldKeyDownCancelInteraction: noop,
	shouldKeyUpCancelInteraction: noop,
	current: identity
};

export default ColorInput;
