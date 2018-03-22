import React from 'react';
import EventListener from 'react-event-listener';

class Dropdown extends React.Component {

	constructor(props) {
		super(props);
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.possibly_close = this.possibly_close.bind(this);
		this.register_dropdown_contents = this.register_dropdown_contents.bind(this);
		this.state = {
			expanded: false,
			position: 'bottom'
		};
	}

	open(e) {
		this.setState({
			expanded: true
		})
	}

	close(e) {
		this.setState({
			expanded: false
		});
	}

	possibly_close(e) {
		if (!this._dropdown_contents_el) {
			return;
		}
		if (this._dropdown_contents_el === e.target || this._dropdown_contents_el.contains(e.target)) {
			return;
		}
		this.close(e);
	}

	register_dropdown_contents(el) {
		this._dropdown_contents_el = el;
	}

	render() {

		let { expanded, position } = this.state;

		let { className } = this.props;

		return (
			<div 
				className={`
					uix-dropdown
					${ expanded ? 'uix-dropdown--expanded' : '' }
					${ className || '' } 
				`}
			>
				{ 
					this.props.trigger(this.open) 
				}

				{
					expanded &&
						<div 
							className={`
								uix-dropdown__contents
								uix-dropdown__contents--${position}
							`}
							ref={this.register_dropdown_contents}
						>
							
							<EventListener
								target='document'
								onMouseDown={this.possibly_close}
							/>

							{ this.props.children }
						</div>
				}
			</div>
		);
	}
}

Dropdown.defaultProps = {
	className: undefined,
	trigger: open => <button onClick={open}>Dropdown</button>
};

export default Dropdown;