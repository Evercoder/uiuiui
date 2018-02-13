import React from 'react';
import { scaleLinear } from 'd3-scale';

import RadialSurface from '../RadialSurface';

import { to_step } from '../util/math';
import { noop } from '../util/functions';

const initial_state = {
	interacting: false,
	r: null,
	t: null
};

class RadialPad extends React.PureComponent {

	constructor(props) {

		super(props);

		this.onChange = this.onChange.bind(this);
		this.onInteractionStart = this.onInteractionStart.bind(this);
		this.onInteractionEnd = this.onInteractionEnd.bind(this);

		this.state = {
			...initial_state,
			r: props.r,
			t: props.t
		};
		
		this.computed_props(props);

	}

	componentWillReceiveProps(props) {

		this.setState({
			r: props.r,
			t: props.t
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
		this.setState({ 
			interacting: true 
		});
	}

	onInteractionEnd() {
		this.setState({ 
			interacting: false 
		});
	}

	onChange({ r, t }) {

		let r_val = to_step(this.r_scale(r), this.props.r_step, this.props.r_precision);
		let t_val = to_step(this.t_scale(t), this.props.t_step, this.props.t_precision);

		// don't update state with the same values
		if (r_val === this.state.r && t_val === this.state.t) {
			return; 
		}

		this.setState({
			r: r_val,
			t: t_val
		}, () => {
			this.props.onChange({
				r: this.state.r, 
				t: this.state.t 
			}, this.props.property)
		});
	}

	render() {

		let {
			r,
			t,
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
								r: r,
								t: t,
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
	onChange: noop,
	property: undefined
};

export default RadialPad;