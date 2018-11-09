import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ColorBand from '../ColorBand';
import HueBand from '../HueBand';
import CheckerboardBand from '../CheckerboardBand';

storiesOf('ColorBand', module)
	.add('HueBand', () => (
		<div className="colorband-container">
			<HueBand />
		</div>
	))
	.add('CheckerboardBand', () => (
		<div className="colorband-container">
			<CheckerboardBand />
		</div>
	));
