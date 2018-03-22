import React from 'react';

import { noop, invariant } from '../util/functions';

import { Dropdown } from '../Dropdown';

class Select extends React.Component {

	constructor(props) {
		super(props);
		
		this.select = this.select.bind(this);
		this.focus = this.focus.bind(this);
		this.register = this.register.bind(this);
		this.handleKeys = this.handleKeys.bind(this);
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);

		this.state = {
			interacting: false
		}
	}

	select(value) {
		this.close();
		this.focus();
		if (value !== this.props.value) {
			this.props.onChange(value, this.props.property);
		}
	}

	open() {
		this.setState({
			interacting: true
		});
	}

	close() {
		this.setState({
			interacting: false
		});
	}

	focus() {
		if (this._el) {
			this._el.focus();
		}
	}

	register(el) {
		this._el = el;
	}

	handleKeys(e) {
		switch(e.key) {
			case 'Enter':
				this.open(e);
				break;
		}
	}

	render() {

		let { 
			className,
			tabIndex 
		} = this.props;

		let {
			interacting
		} = this.state;

		return (
			<div
				className={`
					uix-select
					${ className || '' }
				`}
				ref={this.register}
				tabIndex={ tabIndex }
				onKeyDown={ this.handleKeys }
			>
				<div
					className='uix-select__current' 
					onClick={ this.open }
				>
					<div className='uix-select__value'>
						{ this.props.current(this.props.value) }
					</div>
					<div className='uix-select__button'>
						<button tabIndex="-1">↓</button>
					</div>
				</div>

				{
					interacting && 
						<Dropdown onClose={this.close}>
							{ 
								close =>
									React.Children.map(
										this.props.children,
										child => React.cloneElement(child, {
											value: this.props.value,
											onSelect: this.select
										})
									)
							}
						</Dropdown>
				}
				
			</div>
		);
	}
}

Select.defaultProps = {
	value: null,
	className: undefined,
	tabIndex: 0,
	current: invariant,
	onChange: noop,
	property: undefined
};

export default Select;