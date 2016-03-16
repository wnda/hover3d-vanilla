# hover3d in vanilla JavaScript
port of [jQuery-hover3d](https://github.com/ariona/hover3d)

this is a port of [ariona](https://github.com/ariona)'s [excellent jQuery hover3d plugin](https://github.com/ariona/hover3d) for animating elements in 3D space.

I made this mostly because I don't like using jQuery.

The implementation differs slightly, and more control has been added.

To use
------
Include the script in your HTML:

    <script src="/hover3d-vanilla.min.js"></script>

Initiate and configure:

    <script>
      hover3d(
        {
          selector:      ".selector1,#selector2,selector3",
          perspective   : 1000         // default: 1000
          sensitivity   : 20           // default: 20
          invert        : false        // default: false
          shine         : true         // default: false
          persist       : true         // default: false
          hoverInClass  : false,       // default: false
          hoverClass    : "hovering",  // default: false
          hoverOutClass : "false"      // default: false
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
Chrome | Safari | Firefox | IE | Opera
------ | ------ | ------- | -- | -----
1 | 3.2 (525.3) | 3.5 (1.9.1) | 8 | 10

Reliance on `.querySelectorAll()` pushes the lowest IE support to IE8, though in IE8 only classes, IDs and HTML4/XHTML1 tags are usable. Support everywhere else is green. attachEvent is conditionally used for IE8, and a polyfill for .trim() is used.
