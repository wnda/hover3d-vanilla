hovera-js
=========
Apple TV 3D hover effect in vanilla JS

Usage
-----
    <script src="hovera.js"></script>
    <script>hovera({ options });</script>

Key           |     Default     |  Expects         | If not configured 
--------------|-----------------|------------------|--------------------------
selector      |     null        | string           | N/A (this must be configured)
perspective   |     false       | string or number | `perspective: 1000px`
sensitivity   |     false       | number           | 20 (internal property)
invert        |     false       | boolean          | no inversion
scale         |     false       | boolean          | no scaling transformation
shadow        |     false       | boolean          | no box-shadow
shine         |     false       | boolean          | no lighting
persist       |     false       | boolean          | transforms reset on mouseleave/touchend
position      |     false       | { object }       | `position: relative`
transition    |     false       | { object }       | `transition: transform 0.2s cubic-bezier(0.3,1,0.2,1)`
hoverInClass  |     false       | "string"         | none
hoverOutClass |     false       | "string"         | none
hoverClass    |     false       | "string"         | none
touchEnabled  |     touch()     | N/A              | N/A (this function automatically detects touch/no-touch and passes the info down the chain)
