const scalePolar = (x, y) => ({
	r: Math.sqrt(x * x + y * y),
	t: Math.atan2(y, x)
});

scalePolar.invert = (r, t) => ({
	x: r * Math.cos(t),
	y: r * Math.sin(t)
});

export default scalePolar;