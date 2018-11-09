import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MultiSlider from '../MultiSlider';
import MultiSliderHandle from '../MultiSliderHandle';

storiesOf('MultiSlider', module).add('Basic MultiSlider', () => {
	return (
		<MultiSlider onChange={action('onChange')}>
			<MultiSliderHandle property="prop1" />
			<MultiSliderHandle property="prop2" />
		</MultiSlider>
	);
});
