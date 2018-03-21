## Prerequisites

This project uses:

* Node and NPM 
* [Yarn](https://yarnpkg.org) (optional, but recommended)
* [Storybook](https://storybook.js.org)

## Installation

Clone this repository and run `yarn` in your project folder.

## Running the Storybook

Run `yarn storybook:start` and visit [`http://localhost:6006`](http://localhost:6006) in your browser.

## Building the Storybook

Run `yarn storybook:build` to create a static version of the storybook, amenable to publish via Github Pages. You can view it online at [danburzo.github.io/uiuiui/storybook-static](https://danburzo.github.io/uiuiui/storybook-static/).

## Building the library for NPM

Prior to pushing to NPM, the library needs to be built with `yarn build`.