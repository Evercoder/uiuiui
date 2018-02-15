import React from 'react';

class Checkerboard extends React.PureComponent {
	render() {
		return (
			<svg 
				className='uiuiui-spectrum uiuiui-spectrum--checkerboard'
			>
				<defs>
					<pattern 
						id='checkerboard_pattern'
						x='0'
						y='0'
						width='10'
						height='10'
						patternUnits="userSpaceOnUse"
					>
						<rect x='0' y='0' width='5' height='5' fill='#ccc'/>
						<rect x='5' y='5' width='5' height='5' fill='#ccc'/>
					</pattern>
				</defs>

				<rect 
					x='0' 
					y='0' 
					width='100%' 
					height='100%'
					fill="url(#checkerboard_pattern)"
				/>
			</svg>
		);
	}
}

export default Checkerboard;