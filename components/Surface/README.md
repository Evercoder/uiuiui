# Surface

Surfaces are low-level components which provide the user interaction for other components, such as [Sliders](../Slider/README.md) and [Pads](../Pad/README.md). The [storybook for `Surface`](https://danburzo.github.io/uiuiui/storybook-static/?selectedKind=Surface) contains some examples.

## How it's built

The Surface uses a [Position](../Position/README.md) component to get the user's coordinates, which it then scales to the `[0%, 100%]` interval using [`d3-scale`](https://github.com/d3/d3-scale).

## Properties

Property | Type | Default | Description
-------- | ---- | ------- | -----------
`className` | String | _empty_ | Additional CSS classes to add to the component.
`x_scale` | Scale | `scaleLinear().range([0, 100]).clamp(true)` | 
`y_scale` | Scale | `scaleLinear().range([0, 100]).clamp(true)` | 
`onChange` | Function | _none_ | A callback function that's invoked whenever the user's coordinates change. It receives an object in the form `{x: …, y: …}` with X and Y as percentages.
`onStart` | Function | _none_ | A callback function that's invoked when the user starts an interaction (e.g. the `mousedown` event). It receives the original DOM event as its only parameter.
`onEnd` | Function | _none_ | A callback function that's invoked when the user ends an interaction (e.g. the `mouseup` event). It receives the original DOM event as its only parameter.
`property` | Any | `undefined` | An optional identifier for [the `property` pattern][property].
`passive` | Boolean | `false` | Whether the Surface should be _active_ or _passive_. See clarification below. 
`interacting` | Boolean | `false` | Whether the Surface should be interacting.
`onInsert` | Function | _none_ | A callback function that's invoked when the user triggers the _insert_ behavior (doubleclick event).

### Active vs. Passive Surfaces

An __active__ Surface receives `mousedown` events and starts an interaction.

Conversely, for a __passive__ Surface the interaction is controlled through the `interacting` flag. It can, however, trigger an _insert_ action when the user double-clicks the surface.

## CSS

The `Surface` component has the class name __`uix-surface`__.

`Surface` components have no intrinsic dimensions, and by default will expand to fill the full width and height of its parent. To work as expected, make sure that the parent component has intrinsic dimensions. Alternatively, you can style `.uix-surface` to provide it with an explicit width and height.

## Children 

The `Surface` component accepts arbitrary children.

[property]: https://github.com/danburzo/react-recipes/blob/master/recipes/property-pattern.md

## Other types of Surfaces

### `PolarSurface`

TBD.

### `DeltaSurface`

TBD.
