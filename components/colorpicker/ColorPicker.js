import React from 'react';

import Pad from '../Pad';
import PadHandle from '../PadHandle';
import Slider from '../Slider';
import SliderHandle from '../SliderHandle';

const initial_state = {
	hue: 120,
	saturation: 50,
	lightness: 75,
	opacity: 100
};

class ColorPicker extends React.Component {
	
	constructor(props) {
		super(props);
		this.onSaturationLightnessChanged = this.onSaturationLightnessChanged.bind(this);
		this.onHueChanged = this.onHueChanged.bind(this);
		this.onOpacityChanged = this.onOpacityChanged.bind(this);
		this.state = initial_state;
	}

	onSaturationLightnessChanged({ x: saturation, y: lightness }) {
		this.setState({ saturation, lightness });
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
			lightness,
			opacity
		} = this.state;

		console.log(`hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity/100})`);

		return (
			<div className='rc-colorpicker'>
				<div className='rc-colorpicker__pad'>
					<Pad 
						x={saturation} 
						y={lightness}
						onChange={this.onSaturationLightnessChanged}
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
							backgroundColor: `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity/100})`
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