# hover3d in vanilla Java Script
port of [jQuery-hover3d](https://github.com/ariona/hover3d)

this is a port of [ariona](https://github.com/ariona)'s [excellent jQuery hover3d plugin](https://github.com/ariona/hover3d) for animating elements in 3D space.

I made this mostly because I don't like using jQuery.

The implementation differs slightly, and more control has been added.

To use
------
    <script src="/hover3d-vanilla.min.js"></script>
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
