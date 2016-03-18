# hover3d in vanilla JavaScript

This is a JavaScript library for recreating and adapting the 3D "parallax" hover effect used on Apple TV. This library was influenced by [ariona](https://github.com/ariona)'s [jQuery hover3d plugin](https://github.com/ariona/hover3d) for animating elements in 3 dimensional space with a parallax effect.

I made this mostly because I don't like using jQuery, but it later grew into the more configurable library that it is today as I desired additional features. I also wished to move beyond the aforementioned jQuery lib because it did not allow for programmatic control over positioning, transitions, optimisation (`will-change`, `backface-visibility`) and so on. This implementation also takes care to cater to older versions of Chrome, Safari and Firefox by accessing style properties via vendor-prefixes.

To use
------
First, include the script in your HTML, at the bottom of the `<body>` element (or `<html>` element if you're rolling without a `<head>` and `<body>`) like so:

    <script src="/static/js/hover3d-vanilla.min.js"></script>

Then below the library, call the function, passing in the configuration object:

    <script>
      hover3d(
        {
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
    
These options are largely optional and the default configuration will minimise repaints, add a simple transition effect, assume a relatively positioned element and apply no CSS classes for hovering, hovering in or hovering out. The only mandatory option is the selector. Because the library uses `document.querySelectorAll` to find the elements you wish to transform on hover, multiple selectors can be passed in, enabling many different elements of your webpage to be given the hover3d effect.
    
No CSS is technically required, as the `perspective` and `transform` changes are made programmatically. Additional effects are up to you to decide. The default transition can be removed by passing in `transition: { prop:none }` if you prefer to control this from your stylesheet.

Breakdown of options
--------------------

Option | Type | Default | Description
------ | ---- | ------- | -----------
selector | string | null | Selector for element that will be the 3d card
perspective | integer | 1000 | Perspective value for 3d space
sensitivity | integer | 20 | Mouse movement sensitivity, larger number is less sensitive
invert | boolean | false | Default behavior is the element will follow the mouse, look like it facing the mouse
scale | boolean | false | Add a zoom-like effect to the element on hover using scale3d(x,y,z)
shine | boolean | false | Add shining layer
shadow | boolean | false | Add shadow layer
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
- [ ] Change the strategy for handling older browsers from not adding the hover event listeners to not executing at all. This should be done like so: `if (document.body.style.webkitTransform !== undefined || document.body.style.mozTransform !== undefined || document.body.style.transform !== undefined){ // execute }`
- [ ] Open scale, shine and shadow methods to be objects so that they can be customised
