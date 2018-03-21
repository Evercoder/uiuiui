import React from 'react';

import { noop } from '../util/functions';

class ListItem extends React.PureComponent {
	
	constructor(props) {
		super(props);
		this.select = this.select.bind(this);
		this.keydown = this.keydown.bind(this);
	}

	select() {
		this.props.onSelect(this.props.value);
	}

	keydown(e) {
		if (e.key === 'Enter') {
			this.select();
			e.preventDefault();
			e.stopPropagation();
		}
	}

	render() {

		let { 
			selected,
			tabIndex,
			className
		} = this.props;

		return (
			<li 
				tabIndex={tabIndex}
				className={`uix-list__item ${ selected ? 'uix-list__item--selected' : ''}  ${className || ''}`}
				onClick={this.select}
				onKeyDown={this.keydown}
			>
				{ this.props.children }
			</li>
		);
	}
}

ListItem.defaultProps = {
	value: null,
	selected: false,
	onSelect: noop,
	className: undefined
};

export default ListItem;