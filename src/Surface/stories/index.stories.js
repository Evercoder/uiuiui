import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Surface from '../Surface';
import PolarSurface from '../PolarSurface';
import DeltaSurface from '../DeltaSurface';

import './style.css';

storiesOf('Surface', module)
	.add('Basic Surface', () => {
		return (
			<div style={{ width: '300px', height: '300px', background: '#f0f0f0' }}>
				<Surface onChange={action('onChange')} />
			</div>
		);
	})
	.add('Passive Surface', () => {
		return <Surface passive />;
	})
	.add('Basic PolarSurface', () => {
		return (
			<div className="polar-surface-container">
				<PolarSurface onChange={action('onChange')} />
			</div>
		);
	})
	.add('Basic DeltaSurface', () => {
		return <DeltaSurface onChange={action('onChange')}>DeltaSurface</DeltaSurface>;
	});
