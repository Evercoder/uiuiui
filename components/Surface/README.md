# Surface

`Surface` is a low-level component which provides the user interaction for other components, such as [Sliders](../Slider/README.md) and [Pads](../Pad/README.md).

The [storybook for `Surface`](https://danburzo.github.io/uiuiui/storybook-static/?selectedKind=Surface) contains some examples.

## How it's built

The Surface uses a [Position](../Position/README.md) component to get the user's coordinates, which it then scales to the `[0%, 100%]` interval using [`d3-scale`](https://github.com/d3/d3-scale).

## Properties

Property | Type | Default | Description
-------- | ---- | ------- | -----------
`className` | String | _empty_ | Additional CSS classes to add to the component.
`passive` | Boolean | `false` | 
`interacting` | Boolean | `false` | 
`x_scale` | Scale | `scaleLinear().range([0, 100]).clamp(true)` | 
`y_scale` | Scale | `scaleLinear().range([0, 100]).clamp(true)` | 
`onChange` | Function | _none_ | A callback that is invoked each time the X/Y coordinates are changed based on user interaction.
`onStart` | Function | _none_ | A callback that is invoked when the user starts an interaction (e.g. MouseDown on the Surface)
`onEnd` | Function | _none_ | A callback that is invoked when the user ends an interaction (e.g. on MouseUp)
`onInsert` | Function | _none_ | 
`property` | Any | `undefined` | An optional identifier for [the `property` pattern][property].

### `onChange`

The `onChange` callback receives an object containing `x` and `y` coordinates expressed in percentages in the interval `[0..100]` describing the user's position on the surface.

### `onStart`

This is provided for symmetry with `onEnd`.

### `onEnd`

The `onEnd` callback is useful when you need to know that the user has finished interacting with the surface. While you might stage a transient value on the `onChange` callback, you can use `onEnd` to commit that value.

## CSS

The `Surface` component has the class name __`uix-surface`__.

`Surface` components have no intrinsic dimensions, and by default will expand to fill the full width and height of its parent. To work as expected, make sure that the parent component has intrinsic dimensions. Alternatively, you can style `.uix-surface` to provide it with an explicit width and height.

## Children 

The `Surface` component accepts arbitrary children.

[property]: https://github.com/danburzo/react-recipes/blob/master/recipes/property-pattern.md

