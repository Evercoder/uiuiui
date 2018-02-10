const isGecko = navigator.userAgent.indexOf('Gecko/') >= 0;

const linear_gradient = isGecko ? '-moz-linear-gradient':'-webkit-linear-gradient';

export const valueSaturationGradient = hue => `
	${linear_gradient}(top, hsla(${hue}, 100%, 0%, 0), hsla(${hue}, 100%, 0%, 1)),
	${linear_gradient}(left, hsl(${hue}, 100%, 100%), hsl(${hue}, 100%, 50%))
`;