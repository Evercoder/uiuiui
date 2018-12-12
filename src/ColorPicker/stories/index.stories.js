import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Husk from '../../Husk/Husk';
import ColorPicker from '../ColorPicker';

storiesOf('Color Picker', module)
	.add('Basic Color Picker', () => {
		return <ColorPicker />;
	})
	.add('Reactive Color Picker', () => {
		return (
			<Husk useState={{ color: 'tomato' }}>
				{(state, setState) => (
					<React.Fragment>
						<ColorPicker
							reactive={true}
							value={state.color}
							onChange={color => {
								setState({ color });
							}}
						/>
					</React.Fragment>
				)}
			</Husk>
		);
	});
