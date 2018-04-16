import React from 'react';

class PortalWrapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let child = React.Children.only(this.props.children);
		let Component = child.type;

		// let reference = React.Children.only(this.props.reference);
		// reference.props.ref = this.register;

		return <div>
			<Component {...child.props}/>
		</div>;
	}
}

export default PortalWrapper;