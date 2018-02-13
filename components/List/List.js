import React from 'react';

import { noop } from '../util/functions';

class List extends React.Component {
	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(value) {
		this.props.onChange(value, this.props.property);
	}

	render() {

		let {
			value
		} = this.props;

		return (
			<ul className='rc-list'>
				{ 
					React.Children.map(
						this.props.children,
						child => 
							React.cloneElement(child, {
								onSelect: this.onSelect,
								selected: value === child.props.value
							})
					) 
				}
			</ul>
		);
	}
}

List.defaultProps = {
	value: null,
	onChange: noop,
	property: undefined
};

export default List;