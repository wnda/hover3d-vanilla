!function(){
  "use strict";
  function hover3d(options){
    
    var config =
      {
        selector      : null        || options.selector,
        perspective   : 1000        || options.perspective,
        sensitivity   : 20          || options.sensitivity,
        invert        : false       || options.invert,
        shine         : false       || options.shine,
        persist       : false       || options.persist,
        position      : false       || options.position,
        transition    : false       || options.transition,
        hoverInClass  : false       || options.hoverInClass,
        hoverOutClass : false       || options.hoverOutClass,
        hoverClass    : false       || options.hoverClass
      };
   
    var $targets = document.querySelectorAll(config.selector),
        i     = $targets.length,
        j     = 0;
    
    for( ; i > j; j++){
      var $target    = $targets[j],
          $container = $target.parentNode;
          
      handleHover($target, $container,config);
    }
    
  }
    
  function handleHover($target, $container, config){
    
    function removeClass(cssClasses, cssClass){
      var rxp = new RegExp(cssClass + '\\s*', 'gi');
      return cssClasses.replace(rxp, '').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
    
    // This is important to prevent the element being rendered 2D
    $container.style.webkitPerspective = config.perspective + "px";
    $container.style.mozPerspective    = config.perspective + "px";
    $container.style.perspective       = config.perspective + "px";
    $container.style.webkitTransformStyle = "preserve-3d";
    $container.style.mozTransformStyle    = "preserve-3d";
    $container.style.transformStyle       = "preserve-3d";
    
    // This is important to prevent the element being rendered 2D
    $target.style.webkitPerspective = config.perspective + "px";
    $target.style.mozPerspective    = config.perspective + "px";
    $target.style.perspective       = config.perspective + "px";
    $target.style.webkitTransformStyle = "preserve-3d";
    $target.style.mozTransformStyle    = "preserve-3d";
    $target.style.transformStyle       = "preserve-3d";
    
    // Important: this tells the browser which is the frontface
    // Without this, some browsers may interpret the frontface as the backface
    $target.style.webkitTransform      = "rotateY(0deg) rotateX(0deg)";
    $target.style.mozTransform         = "rotateY(0deg) rotateX(0deg)";
    $target.style.transform            = "rotateY(0deg) rotateX(0deg)";
    
    // Hide the mirror face in 3D space for higher framerate
    $target.style.webkitBackfaceVisibility = "hidden";
    $target.style.mozBackfaceVisibility    = "hidden";
    $target.style.backfaceVisibility       = "hidden";
    
    // Enable the user to specify that the target element is absolute or fixed position
    if (config.position){
      $target.style.position = config.position;
    } else {
      $target.style.position = "relative";
    }
    
    // Important: check that the variable passed in userConfig is an array
    if (config.transition && typeof config.transition === "object"){
      $target.style.willChange               = config.transition.prop;
      $target.style.transitionProperty       = config.transition.prop;
      $target.style.transitionDuration       = config.transition.duration;
      $target.style.transitionTimingFunction = config.transition.timing;
      $target.style.transitionDelay          = config.transition.delay;
    } else {
      $target.style.willChange               = "transform";
      $target.style.transitionProperty       = "transform";
      $target.style.transitionDuration       = "0.2s";
      $target.style.transitionTimingFunction = "cubic-bezier(0.3,1,0.2,1)";
      // Do not set a delay by default:
      // $target.style.transitionDelay          = "0";
    }
    
    if (config.shine){
      var $shine            = document.createElement('div');
      $shine.className      = "shine";
      $shine.style.position = "absolute";
      $shine.style.top      = 0;
      $shine.style.left     = 0;
      $shine.style.bottom   = 0;
      $shine.style.right    = 0;
      $shine.style.zIndex   = 9;
      
      if (config.transition && typeof config.transition === "object"){
        $shine.style.willChange               = "background-image";
        $shine.style.transitionProperty       = "background-image";
        $shine.style.transitionDuration       = config.transition.duration;
        $shine.style.transitionTimingFunction = config.transition.timing;
        $shine.style.transitionDelay          = config.transition.delay;
      } else {
        $shine.style.willChange               = "background-image";
        $shine.style.transitionProperty       = "background-image";
        $shine.style.transitionDuration       = "0.2s";
        $shine.style.transitionTimingFunction = "cubic-bezier(0.3,1,0.2,1)";
        // Do not set a delay by default:
        // $shine.style.transitionDelay          = "0";
      }
      
      $target.appendChild($shine);
    }
    
    function enter(){
      
      if (config.hoverClass && config.hoverInClass){
        $target.className += ' ' + config.hoverClass + ' ' + config.hoverInClass;
        
        setTimeout(function(){
          $target.className = removeClass($target.className,config.hoverInClass);
        }, 1000);
      
      } else if (config.hoverClass){
        $target.className += ' ' + config.hoverInClass;
        
        setTimeout(function(){
          $target.className = removeClass($target.className,config.hoverInClass);
        }, 1000);
        
      } else if (config.hoverInClass){
        $target.className += ' ' + config.hoverClass;
      }
      
    }
      
    function move(event){
           
      var w      = $container.offsetWidth,
          h      = $container.offsetHeight,
          ax     = config.invert ?  (w / 2 - event.offsetX) / config.sensitivity : -(w / 2 - event.offsetX)/config.sensitivity,
          ay     = config.invert ? -(h / 2 - event.offsetY) / config.sensitivity :  (h / 2 - event.offsetY)/config.sensitivity,
          dy     = event.offsetY - h / 2,
          dx     = event.offsetX - w / 2,
          theta  = Math.atan2(dy,dx),
          ang    = theta * 180 / Math.PI - 90,
          angle  = ang < 0 ? angle = ang + 360 : angle = ang;
      
      $target.style.webkitTransform      = "rotateY(" + ax + "deg) rotateX(" + ay + "deg)";
      $target.style.mozTransform         = "rotateY(" + ax + "deg) rotateX(" + ay + "deg)";
      $target.style.msTransform          = "rotateY(" + ax + "deg) rotateX(" + ay + "deg)";
      $target.style.transform            = "rotateY(" + ax + "deg) rotateX(" + ay + "deg)";
      
      if (config.shine){
        $shine.style.backgroundImage='linear-gradient('+angle+'deg,rgba(230,230,230,'+ event.offsetY / h * 0.5 +') 0%,transparent 80%)';
      }
    }
    
    function leave(){

      if (!config.persist){
        $target.style.webkitTransform = "rotateX(0deg) rotateY(0deg)";
        $target.style.mozTransform    = "rotateX(0deg) rotateY(0deg)";
        $target.style.msTransform     = "rotateX(0deg) rotateY(0deg)";
        $target.style.transform       = "rotateX(0deg) rotateY(0deg)";
        
        if (config.shine){
          $shine.style.backgroundImage='none';
        }
      }
      
      if (config.hoverClass && config.hoverOutClass){
        $target.className += ' ' + config.hoverOutClass;
        $target.className = removeClass($target.className,config.hoverClass);
        
        setTimeout(function(){
          $target.className = removeClass($target.className,config.hoverOutClass);
        }, 1000);
      
      } else if (config.hoverClass){
        $target.className = removeClass($target.className,config.hoverClass);
        
      } else if (config.hoverOutClass){
        $target.className += ' ' + config.hoverOutClass;
        
        setTimeout(function(){
          $target.className = removeClass($target.className,config.hoverOutClass);
        }, 1000);
      }
      
    }
    
    if(document.addEventListener){
      
      $container.addEventListener("mouseenter", function(){
        return enter();
      });
    
      $container.addEventListener("mousemove", function(event){
        return move(event);
      });
      
      $container.addEventListener("mouseleave", function(){
        return leave();
      });
    
    } else {
      
      $container.attachEvent("onmouseenter",function(){
        return enter();
      });
      
      $container.attachEvent("onmousemove",function(event){
        return move(event);
      });
      
      $container.attachEvent("onmouseleave",function(){
        return leave();
      });
    }
  }
    
  window.hover3d=hover3d;
}();
