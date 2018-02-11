const isGecko = navigator.userAgent.indexOf('Gecko/') >= 0;

const linear_gradient = isGecko ? '-moz-linear-gradient':'-webkit-linear-gradient';

export const valueSaturationGradient = hue => `
	${linear_gradient}(top, hsla(${hue}, 100%, 0%, 0), hsla(${hue}, 100%, 0%, 1)),
	${linear_gradient}(left, hsl(${hue}, 100%, 100%), hsl(${hue}, 100%, 50%))
`;

export const opacityGradient = color => `
	${linear_gradient}(
		to left,
		hsla(${isNaN(color[0]) ? 0 : color[0]}, ${color[1] * 100}%, ${color[2] * 100}%, 1),
		hsla(${isNaN(color[0]) ? 0 : color[0]}, ${color[1] * 100}%, ${color[2] * 100}%, 0)
	)
`;