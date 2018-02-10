import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Surface from '../components/Surface';

import Slider, { 
	SliderHandle, 
	SliderProgress, 
	SliderTooltip 
} from '../components/Slider';

import Pad, { PadHandle } from '../components/Pad';

import ColorPicker from '../components/ColorPicker';


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
			</Pad>
		);
	});

storiesOf('Surface', module)
	.add('Basic Surface', () => {
		return <div style={ {width: '300px', height: '300px', 'background': '#f0f0f0' } }>
			<Surface onChange={action('onChange')}/>
		</div>;
	});

storiesOf('Color Picker', module)
	.add('Basic Color Picker', () => {
		return <ColorPicker/>;
	})