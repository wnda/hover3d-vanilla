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

Breakdown of options:

    selector      : using .querySelectorAll(), hover3d-vanilla can be applied to multiple elements at once by supplying a comma-delimited list of selectors. For browsers that do not support .querySelectoAll(), .getElementsByTagName() or a manually constructed array of .getElementById() could be used instead.
    perspective   : set the initial perspective value in px
    sensitivity   : set the sensitivity or amount by which the element transforms on mousemove
    invert        : optionally invert the direction of transformation
    shine         : optionally add a linear-gradient overlay representing lighting in 3 dimensions
    persist       : optionally enable transformed elements to retain their last transformed state on mouseleave
    hoverInClass  : apply a CSS class on mouseenter and remove after 1s
    hoverClass    : apply a CSS class on (first) mousemove
    hoverOutClass : apply a CSS class on mouseleave and remove after 1s

Compatibility:

Reliance on `.querySelectorAll()` pushes the lowest IE support to IE8, though in IE8 only classes, IDs and HTML4/XHTML1 tags are usable. Support everywhere else is green. attachEvent is conditionally used for IE8, and a polyfill for .trim() is used.
