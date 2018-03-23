# uiuiui

Simple, accessible, React controls and form elements.

See an [online demo](https://danburzo.github.io/uiuiui/storybook-static) created with [Storybook](https://storybook.js.org).

## Rationale

When I started working on this React UI component library, there were a few things I had in mind:

### Interaction: Subtlety and accessibility

A control should react to all the [subtle interactions available in a browser](https://medium.com/@addyosmani/accessible-ui-components-for-the-web-39e727101a67), which sometimes tend to be ignored. [Inclusive Components](https://inclusive-components.design/) by Heydon Pickering is an example of things to be mindful of.

### CSS: Responsiveness and flexibility

A control should delegate as much of the styling as possible to the user, and provide helpful hooks for them to do so. It should be unassuming about the context in which it's going to be used, and that means steering clear of hardcoded dimensions and other anti-patterns which may crop up in React projects.

The project uses a consistent CSS naming system based on the BEM methodology, which I've found makes more sense for me when building complex interfaces.

### Architecture: Structure and clarity

The project aims to provide the user with useful primitives with which to build they can build their own controls. That means keeping all the components short and sweet, so that rewriting any of them to match your needs is not a hassle. Everything should be swappable.

### Comprehensively documented

Along with its main use as a component library to be used directly, the code should be clear and heavily annotated to provide information on how each component is built, how it works, and how one might implement similar components.

## Controls

Taking a leaf from [_Atomic Web Design_](bradfrost.com/blog/post/atomic-web-design/), the library provides a set of increasingly complex building blocks:

### Atoms (Utility components)

These low-level components, not meant for public consumption, may form the basis of new high-level components:

* [Position](./components/Position/README.md)
* [Surface](./components/Surface/README.md)

### Molecules (High-level components)

These are components usable in a project, based on _Atoms_:

* [Slider](./components/Slider/README.md)
* [Pad](./components/Pad/README.md)

### Organisms (Components using other components)

See:

* [uiuiui-color](https://github.com/danburzo/uiuiui-color)

## Development

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Open Source

This project uses:

* [D3.js](https://github.com/d3)

