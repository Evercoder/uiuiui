import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ControlledComponentWrapper from '../../../.storybook/helpers/ControlledComponentWrapper';

import TextInput from '../TextInput';
import NumericInput from '../NumericInput';
import NumericInputControls from '../NumericInputControls';
import ColorInput from '../ColorInput';
import ColorTextInput from '../ColorTextInput';

storiesOf('Input', module)
	.add('TextInput', () => {
		return (
			<TextInput
				value="hello"
				onChange={action('onChange')}
				valid={value => value.match(/^\d+$/)}
			/>
		);
	})
	.add('NumericInput', () => {
		return (
			<NumericInput onChange={action('onChange')}>
				<NumericInputControls />
			</NumericInput>
		);
	})
	.add('NumericInput, cyclical', () => {
		return (
			<NumericInput
				onChange={action('onChange')}
				cyclical
				start="5"
				end="-5"
				step="0.1"
				precision="1"
			>
				<NumericInputControls />
			</NumericInput>
		);
	})
	.add('NumericInput, Controlled', () => {
		return (
			<ControlledComponentWrapper>
				<NumericInput property="some_property" />
			</ControlledComponentWrapper>
		);
	})
	.add('ColorInput', () => {
		return (
			<ColorInput current={value => <Swatch color={value} />}>
				<ColorPicker />
			</ColorInput>
		);
	})
	.add('ColorInput controlled', () => {
		return (
			<ControlledComponentWrapper onChange={action('onChange')}>
				<ColorInput property="some_property" current={value => <Swatch color={value} />}>
					<ColorPicker />
				</ColorInput>
			</ControlledComponentWrapper>
		);
	})
	.add('ColorInput in portal', () => {
		return (
			<ControlledComponentWrapper onChange={action('onChange')}>
				<ColorInput
					property="some_property"
					current={value => <Swatch color={value} />}
					target={document.body}
				>
					<ColorPicker />
				</ColorInput>
			</ControlledComponentWrapper>
		);
	})
	.add('ColorTextInput', () => {
		return <ColorTextInput value="#000" format="hex" onChange={action('onChange')} />;
	});
