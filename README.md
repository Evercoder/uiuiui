# react-controls

Simple, accessible, React controls and form elements.

See an [online demo](https://danburzo.github.io/react-controls/storybook-static) created with [Storybook](https://storybook.js.org).

## Rationale

When I started working on this React UI component library, there were a few things I had in mind:

### Accessibility

A control should react to all the [subtle interactions available in a browser](https://medium.com/@addyosmani/accessible-ui-components-for-the-web-39e727101a67), which sometimes tend to be ignored. [Inclusive Components](https://inclusive-components.design/) by Heydon Pickering is an example of things to be mindful of.

### CSS: Responsiveness and flexibility

A control should delegate as much of the styling as possible to the user, and provide helpful hooks for them to do so. It should be unassuming about the context in which it's going to be used, and that means steering clear of hardcoded dimensions and other anti-patterns which may crop up in React projects.

The project uses a consistent CSS naming system based on the BEM methodology, which I've found makes more sense for me when building complex interfaces.

## Controls

I've currently implemented these components, about which you can read on their respective README files:

* [Surface](./components/Surface/README.md)
* [Slider](./components/Slider/README.md)
* [Pad](./components/Pad/README.md)
* [ColorPicker](./components/ColorPicker/README.md)

## Development

### Prerequisites

This project uses:

* Node and NPM 
* [Yarn](https://yarnpkg.org) (optional, but recommended)
* [Storybook](https://storybook.js.org)

### Installation

Clone this repository and run `yarn` in your project folder.

### Running the Storybook

Run `yarn storybook:start` and visit [`http://localhost:6006`](http://localhost:6006) in your browser.

### Building the Storybook

Run `yarn storybook:build` to create a static version of the storybook, amenable to publish via Github Pages. You can view it online at [danburzo.github.io/react-controls/storybook-static](https://danburzo.github.io/react-controls/storybook-static/).

