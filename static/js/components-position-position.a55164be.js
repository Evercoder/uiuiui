(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"./components/Position/Position.mdx":function(e,n,t){"use strict";t.r(n);var a=t("./node_modules/react/index.js"),o=t.n(a),r=t("./node_modules/@mdx-js/tag/dist/index.js");function m(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}n.default=function(e){var n=e.components;m(e,["components"]);return o.a.createElement(r.MDXTag,{name:"wrapper",components:n},o.a.createElement(r.MDXTag,{name:"h1",components:n,props:{id:"position"}},"Position"),o.a.createElement(r.MDXTag,{name:"p",components:n},o.a.createElement(r.MDXTag,{name:"a",components:n,parentName:"p",props:{href:"../../components/Position/Position.js"}},"source")," | ",o.a.createElement(r.MDXTag,{name:"a",components:n,parentName:"p",props:{href:"https://danburzo.github.io/uiuiui/storybook-static/?selectedKind=Position"}},"storybook")),o.a.createElement(r.MDXTag,{name:"p",components:n},"Position is a low-level component that reports the cursor position on each ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"mousemove")," event on the ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"onChange")," callback function. It's used in ",o.a.createElement(r.MDXTag,{name:"a",components:n,parentName:"p",props:{href:"../Surface.md"}},"Surfaces"),"."),o.a.createElement(r.MDXTag,{name:"h2",components:n,props:{id:"properties"}},"Properties"),o.a.createElement(r.MDXTag,{name:"table",components:n},o.a.createElement(r.MDXTag,{name:"thead",components:n,parentName:"table"},o.a.createElement(r.MDXTag,{name:"tr",components:n,parentName:"thead"},o.a.createElement(r.MDXTag,{name:"th",components:n,parentName:"tr",props:{align:null}},"Property"),o.a.createElement(r.MDXTag,{name:"th",components:n,parentName:"tr",props:{align:null}},"Type"),o.a.createElement(r.MDXTag,{name:"th",components:n,parentName:"tr",props:{align:null}},"Default"),o.a.createElement(r.MDXTag,{name:"th",components:n,parentName:"tr",props:{align:null}},"Description"))),o.a.createElement(r.MDXTag,{name:"tbody",components:n,parentName:"table"},o.a.createElement(r.MDXTag,{name:"tr",components:n,parentName:"tbody"},o.a.createElement(r.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(r.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"property")),o.a.createElement(r.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"Any"),o.a.createElement(r.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(r.MDXTag,{name:"em",components:n,parentName:"td"},"none")),o.a.createElement(r.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(r.MDXTag,{name:"a",components:n,parentName:"td",props:{href:"https://github.com/danburzo/react-recipes/blob/master/recipes/property-pattern.md"}},"An optional identifier")," to pass along to the callback functions.")),o.a.createElement(r.MDXTag,{name:"tr",components:n,parentName:"tbody"},o.a.createElement(r.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(r.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"onChange")),o.a.createElement(r.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"Function"),o.a.createElement(r.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(r.MDXTag,{name:"em",components:n,parentName:"td"},"none")),o.a.createElement(r.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"A callback function that's called on each mouse movement with an object in the form of ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"{x: \u2026, y: \u2026, event: \u2026}"),". When the ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"property")," prop is set, it will be passed back as the second argument.")),o.a.createElement(r.MDXTag,{name:"tr",components:n,parentName:"tbody"},o.a.createElement(r.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(r.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"onEnd")),o.a.createElement(r.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"Function"),o.a.createElement(r.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(r.MDXTag,{name:"em",components:n,parentName:"td"},"none")),o.a.createElement(r.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"A callback function that's called when the user finishes the interaction (the ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"mouseup")," event) with an object in the form of ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"{x: \u2026, y: \u2026, event: \u2026}"),". When the ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"property")," prop is set, it will be passed back as the second argument.")))),o.a.createElement(r.MDXTag,{name:"h2",components:n,props:{id:"usage"}},"Usage"),o.a.createElement(r.MDXTag,{name:"p",components:n},"The example below continously reads the user's mouse coordinates:"),o.a.createElement(r.MDXTag,{name:"pre",components:n},o.a.createElement(r.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-jsx",metaString:""}},"import React from 'react';\nimport { Position } from 'uiuiui';\n\nclass MyComponent extends React.Component {\n    constructor(props) {\n        super(props);\n        this.state = {};\n    }\n\n    render() {\n        return (\n            <div>\n                <p>\n                    The mouse coordinates are currently {this.state.x}: {this.state.y}\n                </p>\n                <Position onChange={coords => this.setState(coords)} />\n            </div>\n        );\n    }\n}\n\nexport default MyComponent;\n")),o.a.createElement(r.MDXTag,{name:"p",components:n},"We can conditionally add the Position component to the DOM only after the user holds down the mouse (on the ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"mousedown")," event), and stop reading the coordinates on ",o.a.createElement(r.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"mouseup"),":"),o.a.createElement(r.MDXTag,{name:"pre",components:n},o.a.createElement(r.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-jsx",metaString:""}},"class MyComponent extends React.Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            interacting: false\n        };\n    }\n\n    render() {\n        return (\n            <div\n                onMouseDown={e => {\n                    this.setState({ interacting: true });\n                    e.preventDefault();\n                }}\n            >\n                <p>\n                    Hold down the mouse here and move it to read its coordinates: {this.state.x}:{' '}\n                    {this.state.y}\n                </p>\n                {this.state.interacting && (\n                    <Position\n                        onChange={coords => this.setState(coords)}\n                        onEnd={e => this.setState({ interacting: false })}\n                    />\n                )}\n            </div>\n        );\n    }\n}\n")),o.a.createElement(r.MDXTag,{name:"p",components:n},o.a.createElement(r.MDXTag,{name:"em",components:n,parentName:"p"},"Note: these examples use less than ideal React idioms to make them shorter. For better performance, avoid passing inline functions as callbacks.")))}}}]);