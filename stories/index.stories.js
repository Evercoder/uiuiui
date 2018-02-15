import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { 
	Surface,
	RadialSurface,
	DeltaSurface
} from '../components/Surface';

import { 
	NumericInput,
	NumericInputControls 
} from '../components/Input';

import { 
	List,
	ListItem 
} from '../components/List';

import { 
	Checkerboard, 
	Opacity,
	Hue
} from '../components/Spectrum';

import {
	Slider,
	SliderHandle,
	SliderProgress,
	SliderTooltip,
	SliderGrid
} from '../components/Slider';

import {
	Pad,
	PadGrid,
	PadHandle,
	RadialPad,
	RadialPadGrid,
	RadialPadHandle,
	BandPad,
	BandPadProgress
} from '../components/Pad';

import ColorPicker from '../components/ColorPicker';

import {
	MultiSlider,
	MultiSliderHandle
} from '../components/MultiSlider';

import {
	Gradient
} from '../components/Gradient';

import './style.css';

class ControlledComponentWrapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
	}

	onChange(value, prop) {
		action('onChange')(value, prop);
		this.setState({ [prop]: value });
	}

	render() {

		let child = React.Children.only(this.props.children);
		let Component = child.type;

		let value = this.state[child.props.property] || 0;

		return (
			<Component {...child.props} value={value} onChange={this.onChange}/>
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
				<SliderGrid/>
			</Slider>
		);
	})
	.add('Basic Slider With Grid', () => {
		return (
			<Slider onChange={action('onChange')} step='10'>
				<SliderTooltip/>
				<SliderHandle/>
				<SliderProgress/>
				<SliderGrid/>
			</Slider>
		);
	})
	.add('Basic Slider, Circular', () => {
		return (
			<Slider onChange={action('onChange')} circular>
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
	.add('Basic Slider, Circular Controlled', () => {
		return (
			<ControlledComponentWrapper>
				<Slider property='myslider' circular>
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
				<Slider vertical onChange={action('onChange')} >
					<SliderTooltip/>
					<SliderHandle/>
					<SliderProgress/>
					<SliderGrid y_step='4'/>
				</Slider>
			</div>
		);
	})
	.add('Multiple vertical sliders', () => {
		return (
			<div className='equalizer'>
				{
					(new Array(16)).fill(0).map(
						(v, idx) => 
							<Slider key={idx} vertical>
								<SliderProgress/>
							</Slider>
					)
				}
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
	})
	.add('Basic RadialPad', () => {
		return (
			<RadialPad onChange={action('onChange')} r_step='10' t_step='10'>
				<RadialPadHandle/>
				<RadialPadGrid />
			</RadialPad>
		);
	})
	.add('Basic BandPad', () => {
		return (
			<BandPad>
				<BandPadProgress/>
			</BandPad>
		);
	});

storiesOf('Surface', module)
	.add('Basic Surface', () => {
		return <div style={ {width: '300px', height: '300px', 'background': '#f0f0f0' } }>
			<Surface onChange={action('onChange')}/>
		</div>;
	})
	.add('Passive Surface', () => {
		return <Surface passive></Surface>;
	})
	.add('Basic RadialSurface', () => {
		return <div className='radial-surface-container'>
			<RadialSurface onChange={action('onChange')}/>
		</div>;
	})
	.add('Basic DeltaSurface', () => {
		return <DeltaSurface onChange={action('onChange')}>DeltaSurface</DeltaSurface>;
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
		return <NumericInput onChange={action('onChange')}>
			<NumericInputControls/>
		</NumericInput>;
	})
	.add('NumericInput, circular', () => {
		return <NumericInput 
			onChange={action('onChange')} 
			circular
			start='5'
			end='-5'
			step='0.1'
			precision='1'
		>
			<NumericInputControls/>
		</NumericInput>;
	})
	.add('NumericInput, Controlled', () => {
		return (
			<ControlledComponentWrapper>
				<NumericInput property='some_property'/>
			</ControlledComponentWrapper>
		);
	});

storiesOf('List', module)
	.add('Basic List', () => {
		return (
			<ControlledComponentWrapper>
				<List property="some_property">
					<ListItem value='hello'>Hello</ListItem>
					<ListItem value='moto'>Moto</ListItem>
				</List>
			</ControlledComponentWrapper>
		);
	})
	.add('List with dynamic items', () => {
		let items = [
			{ label: 'Hello', value: 'hello' },
			{ label: 'Moto', value: 'moto' }
		];

		return (
			<ControlledComponentWrapper>
				<List property="some_property">
					{ 
						items.map(
							item => 
								<ListItem 
									key={item.value} 
									value={item.value}
								>
									{item.label}
								</ListItem>
						)
					}
				</List>
			</ControlledComponentWrapper>
		);
	});

storiesOf('MultiSlider', module)
	.add('Basic MultiSlider', () => {
		return <MultiSlider onChange={action('onChange')}>
			<MultiSliderHandle property='prop1'/>
			<MultiSliderHandle property='prop2'/>
		</MultiSlider>
	});

storiesOf('Gradient', module)
	.add('Basic Gradient', () => {
		return <Gradient/>;
	});