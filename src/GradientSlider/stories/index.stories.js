import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import GradientSlider from '../GradientSlider';

storiesOf('GradientSlider', module).add('Basic GradientSlider', () => {
	return <GradientSlider />;
});
