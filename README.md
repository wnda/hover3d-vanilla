Pivot.js
=========
Apple TV 3D hover effect in vanilla JS

Usage
-----
    <script src="pivot.js"></script>
    <script>pivot({ options });</script>

Key           |     Default     |  Expects           | Example
--------------|-----------------|--------------------|--------------------------
selector      |     null        | `string`           | `.content-block,#search-box`
perspective   |     false       | *`number`*         | `1000`
sensitivity   |     false       | *`number`*         | `20`
invert        |     false       | `boolean`          | `false`
scale         |     false       | `boolean`          | `true`
shadow        |     false       | `boolean`          | `true`
shine         |     false       | `boolean`          | `true`
persist       |     false       | `boolean`          | `false`
position      |     false       | `{object}`         | `{`<br>&nbsp;&nbsp;`method: "absolute",`<br>&nbsp;&nbsp;`zindex: 5`<br>`}`
transition    |     false       | `{object}`         | `{`<br>&nbsp;&nbsp;`property: "transform, background-color",`<br>&nbsp;&nbsp;`duration: 0.2,`<br>&nbsp;&nbsp;`timing: "cubic-bezier(0.3,1,0.2,1)"`<br>`}`
hoverInClass  |     false       | `"string"`         | `hover-in`
hoverOutClass |     false       | `"string"`         | `hover-out`
hoverClass    |     false       | `"string"`         | `hovering`
touchEnabled  |     touch()     | `N/A`              | N/A (this function automatically detects touch/no-touch and passes the info down the chain)

Notes on inputs
---------------
This plugin is designed to be quite difficult to break. Most inputs are type-checked and improper inputs are substituted for standard values in the event of a mistake. This does mean that the plugin is relatively script when it comes to initiating.

`perspective` should be provided as a number, to which "px" is then appended to give the value expected for the CSS property. Entering a string here will not work, and will cause the default value to be used.

`sensitivity` is an internal value used to calculate the magnitude of the rotate transformation. It should be a number and will default to 20 if it is not fed a new number.

`invert`, `scale`, `shadow`, `shine` and `persist` are not customisable at the moment. `invert`, `shine` and `persist` are really binary options which can only be flicked on and off&mdash;though the actual `shine` colour could technically be opened up to user customisation. `shadow` and `scale` are definitely more customisable, and I will be expanding the code to allow for initial and hovered values for `box-shadow` in the future; `scale` will also be opened up to enable the user to pick a scale factor.

`position`'s `zindex` property expects a number, and if it receives a string it will default to 5. Similarly, `transition.duration` also expects a number. This number will be handled according to a formatting standard whereby time values in excess of 50 will be assumed to be milliseconds and numbers greater than 1 expected to be decimal fractions of a second. This behaviour can therefore be overridden by supplying a massive number like 3000, but transitions really shouldn't exceed a second or two at maximum, and thus we assume values larger than 1 to be user errors.

`transition.timing` is a subject for debate. I would prefer to require an `[a,r,r,a,y]` of four numeric values to fulfil a cubic-bezier curve, but the thought occurs that many users of this plugin might prefer to enter `ease` or `linear`. It strikes me that such users can add transition effects from their stylesheet if they cannot work with cubic-bezier curves.

The length of the timeouts for the hover-in and hover-out classes will also be opened up at a later date.
