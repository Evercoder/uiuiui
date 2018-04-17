# Portal

Portals are low-level components that can place their children in any DOM element. Additionally, they can mirror the size and position of another DOM element. They're used in [Select](../Select/README.md) components.

## Properties

Property | Type | Default | Description
-------- | ---- | ------- | -----------
`className` | String | _none_ | Additional class names to add to the component.
`target` | DOM Element | _none_ | The DOM element where to place the component's children, via `React.createPortal`.
`mirror` | DOM Element | _none_ |  An optional DOM element whose size and position the Portal should mirror.

## Children

The `Portal` component accepts arbitrary children.

## CSS

Portals are identified by the class name __`uix-portal`__. 

They are absolutely positioned and will derive their size and position based on the DOM element they mirror.

__Note:__ Since a Portal will place its children outside the DOM subtree of its parent, make sure to add identifying class names to the Portal's children.