# Input

## Design

`TextInput` gets its initial value from the `value` props, and subsequently reflects whatever the user is typing in the input (its `transient_value`).

If, in the process of typing, the input's value conforms to a certain `format`, emit the `onChange` event.

If the `value` is `undefined`, display an empty string in the input.

## TextInput

### Properties

Property | Type | Default | Description
-------- | ---- | ------- | -----------
`className` | String | _none_ | Any additional class names to pass to the component.
`tabIndex` | Integer | `0` | The component's tab index.
`autofocus` | Boolean | `false` |
`property` | Any | _none_ | [An optional identifier][property] to pass along to the callback functions.
`value` | String | _none_ |  
`onChange` | Function | _none_ | When the `property` prop is set, it will be passed back as the second argument.
`onStart` | Function | _none_ | When the `property` prop is set, it will be passed back as the second argument.
`onEnd` | Function | _none_ | When the `property` prop is set, it will be passed back as the second argument.
`onPrev` | Function | _none_ | When the `property` prop is set, it will be passed back as the second argument.
`onNext` | Function | _none_ | When the `property` prop is set, it will be passed back as the second argument.
`valid` | Function | `() => true` | 
`format` | Function | `value => value` |

### CSS

TextInput components have the class name __`uix-input`__.

## NumericInput

### Properties

Property | Type | Default | Description
-------- | ---- | ------- | -----------
`tabIndex` | Number | `0` |
`className` | String | _none_ |
`autofocus` | Boolean | `false` |
`property` | Any | _none_ | [An optional identifier][property] to pass along to the callback functions.
`value` | String | _none_ |  
`onChange` | Function | _none_ | When the `property` prop is set, it will be passed back as the second argument.
`onStart` | Function | _none_ | When the `property` prop is set, it will be passed back as the second argument.
`onEnd` | Function | _none_ | When the `property` prop is set, it will be passed back as the second argument.
`cyclical` | Boolean | `false` |
`step` | Number | `1` |
`precision` | Number | `0` |
`increment` | ? | `e => e ? (e.shiftKey ? 10 : 1) : undefined` |
`start` | Number | `0` |
`end` | Number | `100` |

### Built-in children

#### NumericInputControls

### CSS

NumericInput components have the class names __`uix-input uix-input--numeric`__.


[property]: https://github.com/danburzo/react-recipes/blob/master/recipes/property-pattern.md