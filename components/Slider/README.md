# Slider

`Slider` is a high-level component that provides functionality similar to the HTML [`range` input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range), but with some extra perks.

Take a look at the [Storybook for `Slider`](https://danburzo.github.io/uiuiui/storybook-static/?selectedKind=Slider) for some examples.

## How it's built

`Slider` uses [`Surface`](../Surface/README.md) under the hood to capture the user interaction, out of which it extracts the X or the Y coordinate, depending on whether it's a horizontal or vertical slider.

It uses a linear scale from [`d3-scale`](https://github.com/d3/d3-scale) to map between the percentage received from `Surface` and the slider's range, as defined by its `start` and `end` properties.

## Properties

Property | Type | Default value | Notes
-------- | ---- | ------------- | -----
`property` | Any | _none_ | [An optional identifier][property] to pass along to the callback functions.
`className` | String | _none_ | Any additional class names to pass to the component.
`tabIndex` | Integer | `0` | The component's tab index.
`value` | `number` | _none_ | The initial value for the slider.
`start` | `number` | `0` | The __starting value__ for the range.
`end` | `number` | `100` | The __end value__ for the range. It is __not necessary__ that `start <= end`, as the Slider works well even with inverted ranges.
`step` | `number` | `1` | I recommend you also define an appropriate `precision` to go along with the `step`, to make sure you don't get bitten by JavaScript's float operation errors.
`precision` | `number` | `0` | The number of decimals to round the value to.
`increment` | `number` | none | (Optional) number that defines the _increment step_ when the user presses the arrow keys. When not defined, the `step` property will be used for this purpose.
`vertical` | `boolean` | `false` | Whether the slider should be horizontal or vertical.

## CSS

### Class name

The `Slider` component has the class name `uix-slider`. 

### Dimensions

The `Slider` component is by default `1em` in height, but this can be customized via CSS.

## Children

The `Slider` component accepts arbitrary children, which it passes along to the underlying [`Surface`](../Surface/README.md) component.

It places a couple of useful properties on each child:

Property | Type | Notes
-------- | ---- | -----
`value` | `number` | This is the absolute value, which also gets sent on the `onChange` callback to the outside world. You may use this value to show a tooltip, as is the case of the `SliderTooltip` component.
`scale` | `function` | This is the [d3-scale](https://github.com/d3/d3-scale) used to map the percentage received from `Surface` to the `Slider`'s range, as defined by its `start` and `end` numbers. Since the child is passed along to, and nested within, the `Surface` component, it's useful to get back that percentage with `scale.invert(value)` and style the child appropriately.
`interacting` | `boolean` | This tells the child whether the user is interacting with the Slider or not. You may use this flag to style the child appropriately.
`vertical` | `boolean` | Each child gets the parent Slider's orientation. When set to `true`, the slider is vertical. Otherwise it's a plain, horizontal, slider.

### Build-in child components

#### `SliderHandle`

This component displays a handle positioned at the slider value's position. Usage:


```js
import { SliderHandle } from './components/Slider';
```

It has the class name `uix-slider__handle`.

#### `SliderProgress`

This component fills part of the slider with a different color, depending on its value. Usage:


```js
import { SliderProgress } from './components/Slider';
```

It has the class name `uix-slider__progress`.

#### `SliderTooltip`

This component displays the slider's value above the slider. Usage:


```js
import { SliderTooltip } from './components/Slider';
```

It has the class name `uix-slider__tooltip`.


[property]: https://github.com/danburzo/react-recipes/blob/master/recipes/property-pattern.md