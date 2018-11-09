import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ColorPicker from '../ColorPicker';

storiesOf('Color Picker', module).add('Basic Color Picker', () => {
	return <ColorPicker />;
});
