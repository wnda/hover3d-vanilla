hovera-js
=========
Apple TV 3D hover effect in vanilla JS

Usage
-----
    <script src="hovera.js"></script>
    <script>hovera({ options });</script>

Key           |     Default     |  Expects           | Example
--------------|-----------------|--------------------|--------------------------
selector      |     null        | `string`           | `.content-block,#search-box`
perspective   |     false       | `number`           | `1000`
sensitivity   |     false       | `number`           | `20`
invert        |     false       | `boolean`          | `false`
scale         |     false       | `boolean`          | `true`
shadow        |     false       | `boolean`          | `true`
shine         |     false       | `boolean`          | `true`
persist       |     false       | `boolean`          | `false`
position      |     false       | `{ object }`       | `{`<br>`method: "absolute",`<br>`zindex: 5`<br>`}`
transition    |     false       | `{ object }`       | `{`<br>`property: "transform, background-color",`<br>`duration: "0.2",`<br>`timing: "cubic-bezier(0.3,1,0.2,1)"`<br>`}`
hoverInClass  |     false       | `"string"`         | `hover-in`
hoverOutClass |     false       | `"string"`         | `hover-out`
hoverClass    |     false       | `"string"`         | `hovering`
touchEnabled  |     touch()     | `N/A`              | N/A (this function automatically detects touch/no-touch and passes the info down the chain)
