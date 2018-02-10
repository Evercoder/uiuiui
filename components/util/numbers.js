// See: https://github.com/d3/d3-format/issues/32
export const to_precision = (value, precision = 0) => 
	Math.round(
		value * (precision = Math.pow(10, precision))
	) / precision;

export const to_step = (value, step, precision = 0) => 
	to_precision(
		Math.round(value / step) * step,
		precision
	)