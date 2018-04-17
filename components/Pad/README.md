# Pad

Pads are two-dimensional surfaces the user can interact with. The [storybook for `Pad`](https://danburzo.github.io/uiuiui/storybook-static/?selectedKind=Pad) contains some examples.

Internally, Pads use [Surfaces](../Surface/README.md).

## Properties

Property | Type | Default | Description
-------- | ---- | ------- | -----------
`property` | Any | _none_ | 
`className` | String | _none_ |
`tabIndex` | Number | _none_ |
`x_start` | Number | `0` | 
`x_end` | Number | `100` |
`y_start` | Number | `0` |
`y_end` | Number | `100` |
`x_step` | Number | `1` |
`y_step` | Number | `1` |
`x_precision` | Number | `0` |
`y_precision` | Number | `0` |
`x_increment` | ? | _none_ |
`y_increment` | ? | _none_ |
`x` | Number | _none_ |
`y` | Number | _none_ |
`cyclical` | Boolean | `false` |
`onChange` | Function | _none_ |
`onStart` | Function | _none_ |
`onEnd` | Function | _none_ |

## Children

## Built-in children

#### PadGrid

#### PadHandle

#### PadTooltip

## Variations

### PolarPad

#### Built-in children

* `PolarPadGrid`
* `PolarPadHandle`

### BandPad

#### Built-in children

* `BandPadProgress`