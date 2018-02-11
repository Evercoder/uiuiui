
export const arc_from_circle = (cx, cy, r) => `
	M ${cx} ${cy}
	m ${-r} 0
	a ${r} ${r} 0 1 1 ${r * 2} 0
	a ${r} ${r} 0 1 1 ${-r * 2} 0
`;