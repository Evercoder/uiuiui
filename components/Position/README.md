# Position

`Position` is a low-level component that reports the cursor position on each `mousemove` event on the `onChange` callback, as long as its `interacting` property is set to `true`.

## Properties

Property | Type | Default | Description
-------- | ---- | ------- | -----------
`interacting` | Boolean | false | Whether the component should start reporting the mouse coordinates.
`property` | Any | undefined | An optional identifier for [the `property` pattern][property].
`onChange` | Function | none | A callback function that's called on each mouse movement with an object in the form of `{x: …, y: …, event: …}`.
`onEnd` | Function | none | A callback function that's called when the user finishes the interaction (the `mouseup` event) with an object in the form of `{x: …, y: …, event: …}`.

[property]: https://github.com/danburzo/react-recipes/blob/master/recipes/property-pattern.md