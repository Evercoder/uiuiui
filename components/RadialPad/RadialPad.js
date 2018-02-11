import React from 'react';
import { scaleLinear } from 'd3-scale';

import RadialSurface from '../RadialSurface';

const initial_state = {
	interacting: false,
	transient_r: null,
	transient_t: null
};

class RadialPad extends React.PureComponent {

	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.onInteractionStart = this.onInteractionStart.bind(this);
		this.onInteractionEnd = this.onInteractionEnd.bind(this);

		this.state = {
			...initial_state,
			transient_r: props.r,
			transient_t: props.t
		};
		
		this.computed_props(props);
	}

	componentWillReceiveProps(props) {

		this.setState({
			transient_r: props.r,
			transient_t: props.t
		});

		this.computed_props(props);
	}

	computed_props(props) {
		this.r_scale = scaleLinear()
			.domain([0, 100])
			.range([this.props.r_start, this.props.r_end])
			.clamp(true);

		this.t_scale = scaleLinear()
			.domain([-Math.PI, Math.PI])
			.range([this.props.t_start, this.props.t_end])
			.clamp(true);
	}

	onInteractionStart() {
		this.setState({ interacting: true });
	}

	onInteractionEnd() {
		this.setState({ interacting: false });
	}

	onChange({ r, t }) {

		console.log(r, t);

		this.setState({
			transient_r: this.r_scale(r),
			transient_t: this.t_scale(t)
		});
	}

	render() {

		let {
			transient_r,
			transient_t,
			interacting
		} = this.state;

		return (
			<div className='rc-radialpad'>
				<RadialSurface 
					onChange={this.onChange}
					onInteractionStart={this.onInteractionStart}
					onInteractionEnd={this.onInteractionEnd}
				>
					{
						React.Children.map(
							this.props.children,
							child => React.cloneElement(child, {
								r: transient_r,
								t: transient_t,
								r_scale: this.r_scale,
								t_scale: this.t_scale,
								interacting: interacting
							})
						)
					}
				</RadialSurface>
			</div>
		);
	}
}

RadialPad.defaultProps = {
	r: 0,
	r_start: 0,
	r_end: 100,
	t_start: 0,
	t_end: 360,
	t: 0
};

export default RadialPad;