# Position

`Position` is a low-level component that reports the cursor position on each `mousemove` event on the `onChange` callback, as long as its `interacting` property is set to `true`.

## Properties

Property | Type | Default | Description
-------- | ---- | ------- | -----------
`interacting` | Boolean | `false` | Whether the component should start reporting the mouse coordinates.
`property` | Any | _none_ | [An optional identifier][property] to pass along to the callback functions.
`onChange` | Function | _none_ | A callback function that's called on each mouse movement with an object in the form of `{x: …, y: …, event: …}`. When the `property` prop is set, it will be passed back as the second argument.
`onEnd` | Function | _none_ | A callback function that's called when the user finishes the interaction (the `mouseup` event) with an object in the form of `{x: …, y: …, event: …}`. When the `property` prop is set, it will be passed back as the second argument.

[property]: https://github.com/danburzo/react-recipes/blob/master/recipes/property-pattern.md