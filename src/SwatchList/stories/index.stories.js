import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ControlledComponentWrapper from '../../../.storybook/helpers/ControlledComponentWrapper';

import SwatchList from '../SwatchList';
import Swatch from '../../Swatch/Swatch';

import culoriscales from 'culori-scales';
let { scales } = culoriscales;

storiesOf('SwatchList', module).add('Many swatchlists', () => {
	return (
		<ControlledComponentWrapper>
			<SwatchList property="some_property">
				{scales['YlGn'].map(c => (
					<Swatch color={c} value={c} key={c} />
				))}
			</SwatchList>
			<SwatchList property="some_property">
				{scales['RdBu'].map(c => (
					<Swatch color={c} value={c} key={c} />
				))}
			</SwatchList>
		</ControlledComponentWrapper>
	);
});
