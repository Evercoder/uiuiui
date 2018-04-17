# Select

Selects are similar to the HTML `<select>` elements, and allow the user to pick from a set of values. It puts its children (typically a [List](../List/README.md)) into a [Popup](../Popup/README.md), which in turn can be placed into a [Portal](../Portal/README.md) to avoid z-index problems in some situations.

## Properties

Property | Type | Default | Description
-------- | ---- | ------- | -----------
`tabIndex` | Number | 0 |
`property` | Any | _none_ | [An optional identifier][property] to pass along to the callback functions.
`className` | String | _none_ |
`value` | Any | _none_ |
`onChange` | Function | _none_ | When the `property` prop is set, it will be passed back as the second argument.
`target` | DOM Element | _none_ |

## CSS

Select components have the class name __`uix-select`__. When using a Portal, the __`uix-select--portal`__ class name is also present.

[property]: https://github.com/danburzo/react-recipes/blob/master/recipes/property-pattern.md
