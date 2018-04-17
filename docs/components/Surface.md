# Surface

Surfaces are low-level components which provide the user interaction for other components, such as [Sliders](./Slider.md) and [Pads](./Pad.md). The [storybook for `Surface`][storybook] contains some examples.

It uses a [Position](./Position.md) component to get the user's coordinates, which it then relates to its own bounds. By default it reports the coordinates as percentages (numbers in the range 0 — 100), but any scale from [`d3-scale`][d3-scale] can be used instead.

## Properties

Property | Type | Default | Description
-------- | ---- | ------- | -----------
`className` | String | _empty_ | Additional CSS classes to add to the component.
`property` | Any | _none_ | [An optional identifier][property] to pass along to the callback functions.
`passive` | Boolean | `false` | Whether the Surface should be _active_ or _passive_. See clarification below. 
`interacting` | Boolean | `false` | Whether the Surface should be interacting.
`x_scale` | Scale | `scaleLinear().range([0, 100]).clamp(true)` | The scale to use on the X axis.
`y_scale` | Scale | `scaleLinear().range([0, 100]).clamp(true)` | The scale to use on the Y axis.
`onChange` | Function | _none_ | A callback function that's invoked whenever the user's coordinates change. It receives an object in the form `{x: …, y: …}` with X and Y as percentages. When the `property` prop is set, it will be passed back as the second argument.
`onStart` | Function | _none_ | A callback function that's invoked when the user starts an interaction (e.g. the `mousedown` event). It receives the original DOM event as its first argument. When the `property` prop is set, it will be passed back as the second argument.
`onEnd` | Function | _none_ | A callback function that's invoked when the user ends an interaction (e.g. the `mouseup` event). It receives the original DOM event as its first argument. When the `property` prop is set, it will be passed back as the second argument.
`onInsert` | Function | _none_ | A callback function that's invoked when the user triggers the _insert_ behavior (doubleclick event). When the `property` prop is set, it will be passed back as the second argument.

### Active vs. Passive Surfaces

An __active__ Surface receives `mousedown` events and starts an interaction.

Conversely, for a __passive__ Surface the interaction is controlled through the `interacting` flag. It can, however, trigger an _insert_ action when the user double-clicks the surface.

## CSS

The `Surface` component has the class name __`uix-surface`__.

`Surface` components have no intrinsic dimensions, and by default will expand to fill the full width and height of its parent. To work as expected, make sure that the parent component has intrinsic dimensions. Alternatively, you can style `.uix-surface` to provide it with an explicit width and height.

## Children 

The `Surface` component accepts arbitrary children.

## Variations

### `PolarSurface`

A PolarSurface is a surface that reports the angle and distance from the surface's center. The `onChange` callback function will receive an object in the form `{ r: …, t: … }`, with `r` being the radius (distance from the center) and `t` the angle, in radians.

### `DeltaSurface`

A DeltaSurface is a surface that reports the distance between the current coordinates in relation to the initial coordinates at the start of the interaction. The `onChange` callback function will receive an object in the form `{ dx: …, dy: … }`.

[storybook]: https://danburzo.github.io/uiuiui/storybook-static/?selectedKind=Surface
[d3-scale]: https://github.com/d3/d3-scale
[property]: https://github.com/danburzo/react-recipes/blob/master/recipes/property-pattern.md
