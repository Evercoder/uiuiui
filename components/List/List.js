import React from 'react';

import { noop } from '../util/functions';

class List extends React.Component {
	constructor(props) {
		super(props);
		this.select = this.select.bind(this);
	}

	select(value) {
		this.props.onSelect(value, this.props.property);
		if (value !== this.props.value) {
			this.props.onChange(value, this.props.property);
		}
	}

	render() {

		let {
			value,
			tabIndex,
			className
		} = this.props;

		return (
			<ul 
				className={`uix-list ${className || ''}`}
				tabIndex={tabIndex}
			>
				{ 
					React.Children.map(
						this.props.children,
						child => 
							React.cloneElement(child, {
								onSelect: this.select,
								tabIndex: tabIndex,
								selected: value === child.props.value
							})
					) 
				}
			</ul>
		);
	}
}

List.defaultProps = {
	className: undefined,
	tabIndex: '0',
	value: null,
	onChange: noop,
	onSelect: noop,
	property: undefined
};

export default List;