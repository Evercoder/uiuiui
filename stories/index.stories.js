import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Slider from '../components/Slider';

storiesOf('Slider', module)
	.add('Basic Slider', () => {
		return <Slider/>;
	})
	.add('Min: 1, max: 10', () => {
		return <Slider min='1' max='10' value='3'/>;
	});
