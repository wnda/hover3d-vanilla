# hover3d in vanilla JavaScript

This is both a port and extension of [ariona](https://github.com/ariona)'s excellent [jQuery hover3d plugin](https://github.com/ariona/hover3d) for animating elements in 3 dimensional space with a parallax effect.

I made this mostly because I don't like using jQuery, but it later grew into the more configurable library that it is today as I desired additional features. The implementation takes care to cater to , but more control has been added (additional features are also the subject of a PR to the jQuery original).

To use
------
Include the script in your HTML, at the bottom of the `<body>` element (or `<html>` element if you're rolling without a `<head>` and `<body>`) like so:

    <script src="/hover3d-vanilla.min.js"></script>

Then below the library, create a script element to call the function and pass in the configuration object:

    <script>
      hover3d(
        {
          // Only 'selector' is mandatory
          selector      : ".selector1",
          perspective   : 1000,
          sensitivity   : 20,
          invert        : false,
          shine         : true,
          persist       : false,
          position      : {
                            method    : "absolute",
                            z         : "5"
                          },
          transition    : {
                            prop      : "transform,border-color",
                            duration  : "0.2s",
                            timing    : "ease",
                            delay     : "0"
                          },
          hoverInClass  : "hovered",
          hoverClass    : "hovering",
          hoverOutClass : "left"
        }
      );
    </script>
    
No CSS is required as the `perspective` and `transform` changes are made programmatically. Additional effects are up to you to decide.

Breakdown of options
--------------------

Option | Type | Default | Description
------ | ---- | ------- | -----------
selector | string | null | Selector for element that will be the 3d card
perspective | integer | 1000 | Perspective value for 3d space
sensitivity | integer | 20 | Mouse movement sensitivity, larger number is less sensitive
invert | boolean | false | Default behavior is the element will follow the mouse, look like it facing the mouse
shine | boolean | false | Add shining layer
persist | boolean | false | Transformed elements retain their transformations on mouseleave
position | object | false | Sometimes, you might want to apply the hover3d effects to absolute/fixed position elements. Use this to declare the position method and z-index required, or leave it unconfigured to roll with `position: relative` by default. Example: `position: { method: "absolute", z:5 }`
transition | object | false | The transition object is automatically configured, but this object allows custom control over which properties have a transition applied, the duration, timing-function and, if desired, the delay. Example: `transition: { prop: "transform,border-color", duration: "0.2s", timing: "cubic-bezier(.4,1,.2,1), delay:"0"}`
hoverInClass | string | hover-in | Helper class when mouse hover in the element, will be removed after 100ms
hoverOutClass | string | hover-out | Helper class when mouse hover Out the element, will be removed after 100ms
hoverClass | string | hover-3d | Helper class when the mouse is hovering the element

Compatibility
-------------
Compatibility is as follows:

Chrome | Safari | Firefox | IE | Opera
------ | ------ | ------- | ----- | -----
12 | 4 | 10 | 10 | 15

This is due to 3D transformations not being supported in older browsers. In older browsers, the function does not attach the event listeners. See the roadmap for future plans to handle older browsers better.

Roadmap
-------
- [x] Programmatically set `backface-visibility: hidden` and `will-change: transform` to optimise repaint performance
    - These settings are currently only set in Safari and Firefox, due to a bug in mobile Chrome which causes background-images to be invisible with `backface-visibility: hidden` 
- [ ] Open up timing configuration for hover-in, hover and hover-out classes by expanding the current method to accept an object
- [ ] Change the strategy for handling older browsers from not adding the hover event listeners to not executing at all. This should be done like so: `if (document.webkitTransform || document.mozTransform || document.transform){ // execute }`
