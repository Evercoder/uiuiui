import React from 'react';
import PropTypes from 'prop-types';
import { noop } from '../util/functions';
import './ListItem.css';

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
		let { selected, tabIndex, className, title } = this.props;

		return (
			<li
				tabIndex={tabIndex}
				className={`uix-list__item ${
					selected ? 'uix-list__item--selected' : ''
				}  ${className || ''}`}
				onClick={this.select}
				onKeyDown={this.keydown}
			>
				{this.props.children}
			</li>
		);
	}
}

ListItem.propTypes = {
	value: PropTypes.any,
	selected: PropTypes.bool,
	onSelect: PropTypes.func,
	className: PropTypes.string
};

ListItem.defaultProps = {
	value: null,
	selected: false,
	onSelect: noop
};

export default ListItem;
