import React from 'react';

import { noop, invariant } from '../util/functions';

import { Dropdown } from '../Dropdown';

class Select extends React.Component {

	constructor(props) {
		super(props);
		this.select = this.select.bind(this);
		this.focus = this.focus.bind(this);
		this.register = this.register.bind(this);
		this.onEnter = this.onEnter.bind(this);
	}

	select(value) {
		if (value !== this.props.value) {
			this.props.onChange(value, this.props.property);
		}
	}

	focus() {
		if (this._el) {
			this._el.focus();
		}
	}

	register(el) {
		this._el = el;
	}

	onEnter(callback) {
		return e => {
			switch(e.key) {
				case 'Enter':
					callback();
					break;
			}
		}
	}

	render() {

		let { 
			className,
			tabIndex 
		} = this.props;

		return (
			<div
				className={`
					uix-select
					${ className || '' }
				`}
				ref={this.register}
			>
				<Dropdown
					trigger={
						open => 
							<div
								className='uix-select__current' 
								onClick={ open }
								tabIndex={ tabIndex }
								onKeyDown={ this.onEnter(open) }
							>
								<div className='uix-select__value'>
									{ this.props.current(this.props.value) }
								</div>
								<div className='uix-select__button'>
									<button tabIndex="-1">↓</button>
								</div>
							</div>
					}
				>
					{ 
						close =>
							React.Children.map(
								this.props.children,
								child => React.cloneElement(child, {
									value: this.props.value,
									onSelect: value => {
										this.select(value);
										close();
										this.focus();
									}
								})
							)
					}
				</Dropdown>
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