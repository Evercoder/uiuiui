import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Select from '../Select';
import List from '../../List/List';
import ListItem from '../../List/ListItem';

import ControlledComponentWrapper from '../../../.storybook/helpers/ControlledComponentWrapper';

import CustomSelectionUI from './CustomSelectionUI';

storiesOf('Select', module)
	.add('basic', () => {
		let items = [{ value: 1, label: 'one' }, { value: 2, label: 'two' }];

		return (
			<ControlledComponentWrapper>
				<Select
					property="some_property"
					current={item => (item ? item.label : 'Placeholder')}
				>
					<List>
						{items.map(item => (
							<ListItem key={item.value} value={item}>
								{item.label}
							</ListItem>
						))}
					</List>
				</Select>
			</ControlledComponentWrapper>
		);
	})
	.add('with portal', () => {
		let items = [
			{ value: 1, label: 'one' },
			{ value: 2, label: 'two' },
			{ value: 3, label: 'three' },
			{ value: 4, label: 'four' },
			{ value: 5, label: 'five' },
			{ value: 6, label: 'six' }
		];

		return (
			<ControlledComponentWrapper>
				<Select
					property="some_property"
					current={item => (item ? item.label : 'Placeholder')}
					target={document.body}
				>
					<List>
						{items.map(item => (
							<ListItem key={item.value} value={item}>
								{item.label}
							</ListItem>
						))}
					</List>
				</Select>
			</ControlledComponentWrapper>
		);
	})
	.add('with arbitrary contents', () => {
		return (
			<ControlledComponentWrapper>
				<Select property="some_property" current={item => (item ? item : 'Placeholder')}>
					<CustomSelectionUI />
				</Select>
			</ControlledComponentWrapper>
		);
	});
