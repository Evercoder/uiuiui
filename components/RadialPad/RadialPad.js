import React from 'react';
import { scaleLinear } from 'd3-scale';

import RadialSurface from '../RadialSurface';

import { to_step } from '../util/numbers';

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
			.domain([0, 50])
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
			transient_r: to_step(this.r_scale(r), this.props.r_step, this.props.r_precision),
			transient_t: to_step(this.t_scale(t), this.props.t_step, this.props.t_precision)
		}, () => {
			this.props.onChange({
				r: this.state.transient_r, 
				t: this.state.transient_t 
			})
		});
	}

	render() {

		let {
			transient_r,
			transient_t,
			interacting
		} = this.state;

		let {
			r_step,
			t_step,
		} = this.props;

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
								r_step: r_step,
								t_step: t_step,
								interacting: interacting,

								...child.props
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
	t_start: -180,
	t_end: 180,
	r_step: 1,
	r_precision: 0,
	t_step: 1,
	t_precision: 0,
	t: 0,
	onChange: ({r, t}) => {}
};

export default RadialPad;