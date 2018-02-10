import React from 'react';

import Pad from '../Pad';
import PadHandle from '../PadHandle';
import Slider from '../Slider';
import SliderHandle from '../SliderHandle';

import chroma from 'chroma-js';

import { valueSaturationGradient } from '../util/style';

const initial_state = {
	hue: 120,
	saturation: 50,
	value: 75,
	opacity: 100
};

class ColorPicker extends React.Component {
	
	constructor(props) {
		super(props);
		this.onSaturationAndValueChanged = this.onSaturationAndValueChanged.bind(this);
		this.onHueChanged = this.onHueChanged.bind(this);
		this.onOpacityChanged = this.onOpacityChanged.bind(this);
		this.state = initial_state;
	}

	onSaturationAndValueChanged({ x: saturation, y: value }) {
		this.setState({ saturation, value });
	}

	onHueChanged(hue) {
		this.setState({ hue });
	}

	onOpacityChanged(opacity) {
		this.setState({ opacity });
	}

	render() {

		let {
			hue,
			saturation,
			value,
			opacity
		} = this.state;

		console.log(`hsla(${hue}, ${saturation}%, ${value}%, ${opacity/100})`);

		return (
			<div className='rc-colorpicker'>
				<div className='rc-colorpicker__pad'>
					<div style={{
						width: '300px',
						height: '300px',
						background: valueSaturationGradient(hue)
					}}></div>
					<Pad 
						x={saturation} 
						y={value}
						y_start='100'
						y_end='0'
						onChange={this.onSaturationAndValueChanged}
					>
						<PadHandle/>
					</Pad>
				</div>
				<div className='rc-colorpicker__slider'>
					<Slider 
						value={hue}
						start='360'
						end='0'
						step='1'
						onChange={this.onHueChanged}
					>
						<SliderHandle/>
					</Slider>
				</div>

				<div className='rc-colorpicker__slider'>
					<Slider 
						value={opacity}
						start='0'
						end='100'
						step='0.1'
						precision='1'
						onChange={this.onOpacityChanged}
					>
						<SliderHandle/>
					</Slider>
				</div>

				<div 
					className='rc-colorpicker__swatch'
					style={
						{
							width: '100px',
							height: '100px',
							backgroundColor: `${ 
								chroma.hsv(hue, saturation/100, value/100).alpha(opacity/100).css()
							}`
						}
					}
				>

				</div>
			</div>
		);
	}
}

ColorPicker.defaultProps = {};

export default ColorPicker;