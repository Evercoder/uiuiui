import { line, curveBasis, curveCatmullRom, curveCardinal, curveNatural, curveMonotoneX, curveMonotoneY } from 'd3-shape';
import { range, zip } from 'd3-array';
import { scaleLinear, scalePoint, scaleQuantize } from 'd3-scale';
import React from 'react';
import { polynomial } from 'everpolate';
import cubicspline from 'cubic-spline';

const poly = coefficients =>  x => coefficients.reduce((sum, coef, idx, arr) => sum + coef * Math.pow(x, arr.length - 1 - idx), 0);

class Polynomial extends React.Component {
	render() {

		let controls = [
			[0, 0],
			[24, 199],
			[128, 128],
			[192, 192],
			[256, 256]
		];

		let x_coords = zip(...controls)[0];
		let y_coords = zip(...controls)[1];

		let samp_num = 1000;

		let w = 500;
		let h = 500;

		let sample_scale = scalePoint()
			.domain(range(0, samp_num))
			.range([0, 256]);

		let sample_input = range(0, samp_num).map(i => sample_scale(i));

		// let thresh_scale = scaleQuantize()
		// 	.domain([0, 256])
		// 	.range(
		// 		range(0, controls.length)
		// 	);

		function polynomial_interpolation_for(value) {
			let control_idx = controls.indexOf(controls.find(c => c[0] >= value)) - 1;
			let start_ctrl = control_idx - 1;
			let end_ctrl = control_idx + 1;

			if (start_ctrl < 0) {
				end_ctrl += 0 - start_ctrl;
				start_ctrl = 0;
			} else if (end_ctrl > controls.length - 1) {
				start_ctrl = start_ctrl - (end_ctrl - controls.length + 1);
				end_ctrl = controls.length - 1;
			}

			// console.log(value, control_idx, start_ctrl, end_ctrl);
			
			return polynomial(value, x_coords.slice(start_ctrl, end_ctrl + 1), y_coords.slice(start_ctrl, end_ctrl + 1));
		}

		// let sample_output = polynomial(sample_input, zip(...controls)[0], zip(...controls)[1]);

		let xScale = scaleLinear().domain([0, 256]).range([0, w]);
		let yScale = scaleLinear().domain([0, 256]).range([h, 0]).clamp(true);

		let path_func = line()
			.x(d => xScale(d))
			.y(d => yScale(cubicspline(d, x_coords, y_coords)));

		let path = path_func(sample_input);

		let natural_func = line()
			.x((d, i) => xScale(controls[i][0]))
			.y((d, i) => yScale(controls[i][1]))
			.curve(curveNatural);

		let natural = natural_func(range(0, controls.length));

		let basis_func = line()
			.x((d, i) => xScale(controls[i][0]))
			.y((d, i) => yScale(controls[i][1]))
			.curve(curveBasis);

		let basis = basis_func(range(0, controls.length));


		let monotonex_func = line()
			.x((d, i) => xScale(controls[i][0]))
			.y((d, i) => yScale(controls[i][1]))
			.curve(curveMonotoneX);

		let monotonex = monotonex_func(range(0, controls.length));

		let monotoney_func = line()
			.x((d, i) => xScale(controls[i][0]))
			.y((d, i) => yScale(controls[i][1]))
			.curve(curveMonotoneY);

		let monotoney = monotoney_func(range(0, controls.length));

		return (
			<svg width={w} height={h} style={{ overflow: 'visible', border: '1px solid #ccc' }}>

				<defs>
					<pattern id='grid' width={w/10} height={h/10} patternUnits='userSpaceOnUse'>
						<rect width='100%' height='100%' fill='none' stroke='#ccc'/>
					</pattern>
				</defs>

				<rect fill='url(#grid)' width='100%' height='100%' x='0' y='0'></rect>

				<line x1='0' y1='100%' x2='100%' y2='0'  stroke='#ccc'/>

				<path d={natural} fill='none' stroke='blue' />
				<text fill='blue' x='110%' y='20'>natural</text>

				<path d={basis} fill='none' stroke='red' />
				<text fill='red' x='110%' y='40'>basis</text>

				<text fill='black' x='110%' y='60'>cubic</text>

				<path d={monotonex} fill='none' stroke='green' />
				<text fill='green' x='110%' y='80'>monotone x</text>

				<path d={monotoney} fill='none' stroke='orange' />
				<text fill='orange' x='110%' y='100'>monotone y</text>

				<path d={path} fill='none' stroke='#000'/>

				{ 
					controls.map(
						(c, idx) => 
							<g transform={`translate(${xScale(c[0])}, ${yScale(c[1])})`} key={idx}>
								<circle cx='0' cy='0' r='3'/>
								<text fontSize='11'>{`${c[0]}, ${c[1]}`}</text>
							</g>
						)
				}
			</svg>
		);
	}
}

export default Polynomial;