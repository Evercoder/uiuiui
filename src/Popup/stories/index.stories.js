import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Popup from '../Popup';

storiesOf('Popup', module).add('basic', () => (
	<Popup property="some_property" onClose={action('onClose')}>
		Click outside me
	</Popup>
));
