import React from 'react';

import { noop } from '../util/functions';

class ListItem extends React.PureComponent {
	
	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect() {
		this.props.onSelect(this.props.value);
	}

	render() {

		let { 
			selected 
		} = this.props;

		return (
			<li 
				className={`rc-list__item ${ selected ? 'rc-list__item--selected' : ''}`}
				onClick={this.onSelect}
			>
				{ this.props.children }
			</li>
		);
	}
}

ListItem.defaultProps = {
	value: null,
	selected: false,
	onSelect: noop
};

export default ListItem;