# Surface

`Surface` is a low-level component which provides the user interaction for components such as [`Slider`](../Slider/README.md), [`Pad`](../Pad/README.md) and [`ColorPicker`](../ColorPicker/README.md).

[Storybook for `Surface`](https://danburzo.github.io/uiuiui/storybook-static/?selectedKind=Surface), containing some examples.

## How it's built

The `Surface` component uses a scale from the [`d3-scale`](https://github.com/d3/d3-scale) library to map the user's screen coordinates to the `[0..100]` range.

## Properties

Property | Type | Default value | Notes
-------- | ---- | ------------- | -----
`onChange` | `function` | `({x, y}) => {}` | A callback that is invoked each time the X/Y coordinates are changed based on user interaction.
`onStart` | `function` | `() => {}` | A callback that is invoked when the user starts an interaction (e.g. MouseDown on the Surface)
`onEnd` | `function` | `() => {}` | A callback that is invoked when the user ends an interaction (e.g. on MouseUp)

### `onChange`

The `onChange` callback receives an object containing `x` and `y` coordinates expressed in percentages in the interval `[0..100]` describing the user's position on the surface.

### `onStart`

This is provided for symmetry with `onEnd`.

### `onEnd`

The `onEnd` callback is useful when you need to know that the user has finished interacting with the surface. While you might stage a transient value on the `onChange` callback, you can use `onEnd` to commit that value.

## CSS

### Class Name

The `Surface` component has the class name __`uix-surface`__.

### Dimensions

`Surface` components have no intrinsic dimensions, and by default will expand to fill the full width and height of its parent. To work as expected, make sure that the parent component has intrinsic dimensions. Alternatively, you can style `.uix-surface` to provide it with an explicit width and height.

## Children 

The `Surface` component accepts arbitrary children.

