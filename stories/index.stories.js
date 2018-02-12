import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Surface from '../components/Surface';
import RadialSurface from '../components/RadialSurface';

import { NumericInput } from '../components/Input';

import { 
	Checkerboard, 
	Opacity,
	Hue
} from '../components/Spectrum';

import Slider, { 
	SliderHandle, 
	SliderProgress, 
	SliderTooltip 
} from '../components/Slider';

import Pad, { PadHandle, PadGrid } from '../components/Pad';
import RadialPad, { RadialPadHandle, RadialPadGrid } from '../components/RadialPad';

import ColorPicker from '../components/ColorPicker';

import './style.css';

class ControlledComponentWrapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		return (
			<div>
				{
					React.Children.map(
						this.props.children,
						child => React.cloneElement(child, {
							value: this.state[child.props.property] || 0,
							onChange: (value, property) => {
								action('ControlledComponentWrapper:onChange')(value, property);
								this.setState({ [property] : value });
							}
						})
					)
				}
			</div>
		);
	}
}


storiesOf('Slider', module)
	.add('Basic Slider', () => {
		return (
			<Slider onChange={action('onChange')}>
				<SliderTooltip/>
				<SliderHandle/>
				<SliderProgress/>
			</Slider>
		);
	})
	.add('Basic Slider, Controlled', () => {
		return (
			<ControlledComponentWrapper>
				<Slider property='myslider'>
					<SliderTooltip/>
					<SliderHandle/>
					<SliderProgress/>
				</Slider>
			</ControlledComponentWrapper>
		);
	})
	.add('Vertical Slider', () => {
		return (
			<div style={{ height: '200px'}}>
				<Slider vertical onChange={action('onChange')}>
					<SliderTooltip/>
					<SliderHandle/>
					<SliderProgress/>
				</Slider>
			</div>
		);
	})
	.add('Multiple vertical sliders', () => {
		return (
			<div className='equalizer'>
				<Slider vertical>
					<SliderProgress/>
				</Slider>
				<Slider vertical>
					<SliderProgress/>
				</Slider>
				<Slider vertical>
					<SliderProgress/>
				</Slider>
				<Slider vertical>
					<SliderProgress/>
				</Slider>
				<Slider vertical>
					<SliderProgress/>
				</Slider>
				<Slider vertical>
					<SliderProgress/>
				</Slider>
				<Slider vertical>
					<SliderProgress/>
				</Slider>
				<Slider vertical>
					<SliderProgress/>
				</Slider>
				<Slider vertical>
					<SliderProgress/>
				</Slider>
				<Slider vertical>
					<SliderProgress/>
				</Slider>
				<Slider vertical>
					<SliderProgress/>
				</Slider>
				<Slider vertical>
					<SliderProgress/>
				</Slider>
				<Slider vertical>
					<SliderProgress/>
				</Slider>
				<Slider vertical>
					<SliderProgress/>
				</Slider>
				
				<Slider vertical>
					<SliderProgress/>
				</Slider>
				<Slider vertical>
					<SliderProgress/>
				</Slider>
			</div>
		);
	})
	.add('Start: 1, End: 10', () => {
		return (
			<Slider start='1' end='10' value='3' onChange={action('onChange')}>
				<SliderHandle/>
			</Slider>
		);
	})
	.add('Start: 10, End: 1', () => {
		return (
			<Slider start='10' end='1' value='3' onChange={action('onChange')}>
				<SliderHandle/>
			</Slider>
		);
	})
	.add('Step: 0.33, Precision: 2', () => {
		return (
			<Slider step='0.33' precision='2' value='3' onChange={action('onChange')}>
				<SliderHandle/>
			</Slider>
		);
	});

storiesOf('Pad', module)
	.add('Basic Pad', () => {
		return (
			<Pad onChange={action('onChange')}>
				<PadHandle/>
				<PadGrid x_step='10' y_step='10'/>
			</Pad>
		);
	});

storiesOf('RadialPad', module)
	.add('Basic RadialPad', () => {
		return (
			<RadialPad onChange={action('onChange')} r_step='10' t_step='10'>
				<RadialPadHandle/>
				<RadialPadGrid />
			</RadialPad>
		);
	});

storiesOf('Surface', module)
	.add('Basic Surface', () => {
		return <div style={ {width: '300px', height: '300px', 'background': '#f0f0f0' } }>
			<Surface onChange={action('onChange')}/>
		</div>;
	});

storiesOf('RadialSurface', module)
	.add('Basic RadialSurface', () => {
		return <div className='radial-surface-container'>
			<RadialSurface onChange={action('onChange')}/>
		</div>;
	});

storiesOf('Spectrum', module)
	.add('Checkerboard', () => {
		return <div className='spectrum-container'>
			<Checkerboard/>
		</div>;
	})
	.add('Opacity', () => {
		return <div className='spectrum-container'>
			<Opacity/>
		</div>;
	})
	.add('Hue', () => {
		return <div className='spectrum-container'>
			<Hue/>
		</div>;
	});

storiesOf('Color Picker', module)
	.add('Basic Color Picker', () => {
		return <ColorPicker/>;
	});


storiesOf('Input', module)
	.add('NumericInput', () => {
		return <NumericInput onChange={action('onChange')}/>;
	})
	.add('NumericInput, Controlled', () => {
		return (
			<ControlledComponentWrapper>
				<NumericInput property='some_property'/>
			</ControlledComponentWrapper>
		);
	});