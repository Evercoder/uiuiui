# Popup

Popups are low-level components that detect clicks outside their bounds. They're used in [Select](../Select/README.md) components.

## Properties

Property | Type | Default | Description
-------- | ---- | ------- | -----------
`className` | String | _none_ | Any additional class names to pass to the component.
`tabIndex` | Integer | `0` | The component's tab index.
`property` | Any | `undefined` | An optional identifier for [the `property` pattern][property].
`autofocus` | Boolean | `false` | Whether the component should autofocus when it's mounted in the DOM.
`onClose` | Function | _none_ | A callback function that gets invoked when there's a click outside the bounds of the popup.

## Children

The `Popup` component accepts arbitrary children. If a function is passed in the `children` prop, it will receive the `close` callback as its only parameter:

```jsx
<Popup>
	{
		close => <button onClick={close}>Close yourself</button>
	}
</Popup>
``` 

## CSS

The `Popup` component has the class name __`uix-popup`__.

`Popup` components are absolutely positioned and will have the dimensions of its content. 

[property]: https://github.com/danburzo/react-recipes/blob/master/recipes/property-pattern.md