## Prerequisites

This project uses:

* Node and NPM 
* [Yarn](https://yarnpkg.org) (optional, but recommended)
* [Storybook](https://storybook.js.org)

## Installation

Clone this repository and run `yarn` in your project folder.

## Scripts

* `yarn storybook:start` starts the Storybook on [`http://localhost:6001`](http://localhost:6001)
* `yarn storybook:build` creates a static version of the Storybook that will be available online at [danburzo.github.io/uiuiui/storybook-static](https://danburzo.github.io/uiuiui/storybook-static/)
* `yarn build` builds the library with Babel, so that you can then `npm publish` it
* `yarn build:watch` continously builds the library while you work. This is useful if you `yarn link` the repository when using it in other projects locally.

Finally, `yarn start` is a shorthand for `yarn build:watch` and `yarn storybook:start`.