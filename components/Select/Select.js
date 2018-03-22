import React from 'react';

import { noop, invariant } from '../util/functions';

import { Dropdown } from '../Dropdown';

class Select extends React.Component {

	constructor(props) {
		super(props);
		this.select = this.select.bind(this);
	}

	select(value) {
		this.props.onChange(value, this.props.property);
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
				tabIndex={tabIndex}
			>
				<Dropdown
					trigger={
						open => 
							<div
								className='uix-select__current' 
								onClick={open}
							>
								<div className='uix-select__value'>
									{ this.props.current(this.props.value) }
								</div>
								<div className='uix-select__button'>
									<button>↓</button>
								</div>
							</div>
					}
					autoclose
				>
					{ 
						React.Children.map(
							this.props.children,
							child => React.cloneElement(child, {
								value: this.props.value,
								onChange: this.select
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