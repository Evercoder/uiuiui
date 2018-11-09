import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ControlledComponentWrapper from '../../../.storybook/helpers/ControlledComponentWrapper';

import List from '../List';
import ListItem from '../ListItem';

storiesOf('List', module)
	.add('Basic List', () => {
		return (
			<ControlledComponentWrapper>
				<List property="some_property">
					<ListItem value="hello">Hello</ListItem>
					<ListItem value="moto">Moto</ListItem>
				</List>
			</ControlledComponentWrapper>
		);
	})
	.add('List with dynamic items', () => {
		let items = [{ label: 'Hello', value: 'hello' }, { label: 'Moto', value: 'moto' }];

		return (
			<ControlledComponentWrapper>
				<List property="some_property">
					{items.map(item => (
						<ListItem key={item.value} value={item.value}>
							{item.label}
						</ListItem>
					))}
				</List>
			</ControlledComponentWrapper>
		);
	});
