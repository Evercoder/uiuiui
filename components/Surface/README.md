# Surface

`Surface` is a low-level component which provides the user interaction for components such as [`Slider`](../Slider/README.md), [`Pad`](../Pad/README.md) and [`ColorPicker`](../ColorPicker/README.md).

## Properties

Property | Type | Default value | Notes
-------- | ---- | ------------- | -----
`onChange` | `function` | `({x, y}) => {}` | A callback that is invoked each time the X/Y coordinates are changed based on user interaction.
`onInteractionStart` | `function` | `() => {}` | A callback that is invoked when the user starts an interaction (e.g. MouseDown on the Surface)
`onInteractionEnd` | `function` | `() => {}` | A callback that is invoked when the user ends an interaction (e.g. on MouseUp)

### `onChange`

The `onChange` callback receives an object containing `x` and `y` coordinates expressed in percentages in the interval `[0..100]` describing the user's position on the surface.

### `onInteractionStart`

This is provided for symmetry with `onInteractionEnd`.

### `onInteractionEnd`

The `onInteractionEnd` callback is useful when you need to know that the user has finished interacting with the surface. While you might stage a transient value on the `onChange` callback, you can use `onInteractionEnd` to commit that value.

