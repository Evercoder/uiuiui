import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Portal from '../Portal';

import './style.css';

storiesOf('Portal', module).add('Portal', () => {
	return (
		<div>
			<Portal
				target={document.body}
				reference={() => document.querySelector('.portal-reference')}
			>
				Hello
			</Portal>
			<div className="portal-reference" />
		</div>
	);
});
