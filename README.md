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
position | object | false | Sometimes, you might want to apply the effect to an absolute/fixed position element. Use this to declare the positioning required or leave it unconfigured to roll with `position: relative` by default
transition | object | false | The transition object is automatically configured, but this object allows custom control over which properties have a transition applied, the duration, timing-function and, if desired, the delay.
hoverInClass | string | hover-in | Helper class when mouse hover in the element, will be removed after 300ms
hoverOutClass | string | hover-out | Helper class when mouse hover Out the element, will be removed after 300ms
hoverClass | string | hover-3d | Helper class when the mouse is hovering the element

Compatibility
-------------
Compatibility for the actual CSS is as follows:

Chrome | Safari | Firefox | IE | Opera
------ | ------ | ------- | ----- | -----
12 | 4 | 10 | 10 | 15

Vendor prefixes are used via their respective JavaScript APIs.

If [transforms were to be polyfilled (ha)](http://www.useragentman.com/blog/csssandpaper-a-css3-javascript-library/), the JS, the story is a little less gloomy:

Chrome | Safari | Firefox | IE | Opera
------ | ------ | ------- | ----- | -----
1 | 3.2 | 3.5 | 8 | 10

Reliance on `.querySelectorAll()` pushes the lowest IE support to IE8, though in IE8 only classes, IDs and HTML4/XHTML1 tags are usable. 

Support everywhere else is green. `.attachEvent()` is conditionally used for IE8, and a polyfill for .trim() is used. 

This is all irrelevant, of course, because CSS3 transforms already act as a bar to entry.

Roadmap
-------
- [x] Programmatically set `backface-visibility: hidden` and `will-change: transform` to optimise repaint performance 
- [ ] Closure Compiler aggressively reduces the lib to 1KB gzipped. Refactoring might be a good idea.
