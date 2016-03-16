# hover3d in vanilla JavaScript

This is a port of [ariona](https://github.com/ariona)'s excellent [jQuery hover3d plugin](https://github.com/ariona/hover3d) for animating elements in 3 dimensional space with a parallax effect.

I made this mostly because I don't like using jQuery. The implementation differs slightly: it's obviously less pretty than jQuery code, but more control has been added (additional features are also the subject of a PR to the jQuery original).

To use
------
Include the script in your HTML, at the bottom of the `<body>` element (or `<html>` element if you're rolling without a `<head>` and `<body>`) like so:

    <script src="/hover3d-vanilla.min.js"></script>

Then below the library, create a script element to call the function and pass in the configuration object:

    <script>
      hover3d(
        {
          // Only 'selector' is mandatory
          selector:      ".selector1", // default: null
          perspective   : 1000,        // default: 1000
          sensitivity   : 20,          // default: 20
          invert        : false,       // default: false
          shine         : true,        // default: false
          persist       : true,        // default: false
          hoverInClass  : "hovered",   // default: false
          hoverClass    : "hovering",  // default: false
          hoverOutClass : "left"       // default: false
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
- [ ] Programmatically set `backface-visibility: hidden` and `will-change: transform` to optimise repaint performance 
