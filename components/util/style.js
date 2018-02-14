const isGecko = navigator.userAgent.indexOf('Gecko/') >= 0;

const linear_gradient = isGecko ? '-moz-linear-gradient':'linear-gradient';

export const valueSaturationGradient = hue => `
	${linear_gradient}(to bottom, hsla(${hue}, 100%, 0%, 0), hsla(${hue}, 100%, 0%, 1)),
	${linear_gradient}(to right, hsl(${hue}, 100%, 100%), hsl(${hue}, 100%, 50%))
`;

export const opacityGradient = color => `
	${linear_gradient}(
		to left,
		hsla(${isNaN(color[0]) ? 0 : color[0]}, ${color[1] * 100}%, ${color[2] * 100}%, 1),
		hsla(${isNaN(color[0]) ? 0 : color[0]}, ${color[1] * 100}%, ${color[2] * 100}%, 0)
	)
`;

export const hueGradient = (direction) => `
	${linear_gradient}(
		${direction},
		hsl(0, 100%, 50%),
		hsl(60, 100%, 50%),
		hsl(120, 100%, 50%),
		hsl(180, 100%, 50%),
		hsl(240, 100%, 50%),
		hsl(300, 100%, 50%),
		hsl(360, 100%, 50%)
	)
`;

export const gradient = (stops) => `
	${linear_gradient}(
		to right, 
		${
			stops
				.slice()
				.sort((a, b) => a.position - b.position)
				.map(
					stop => 
						`${stop.color} ${stop.position}%`
				).join(', ')
		}
	)
`