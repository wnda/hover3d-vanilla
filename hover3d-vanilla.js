!function(){
  "use strict";
  function hover3d(options){

    if (document.addEventListener && (document.body.style.webkitPerspective !== undefined || document.body.style.mozPerspective !== undefined || document.body.style.perspective !== undefined)){
    
      function touch(){
        return !!('ontouchstart' in window) || !!('onmsgesturechange' in window) || !!(navigator.MaxTouchPoints);
      }
      
      var config =
        {
          selector      : null    || options.selector,
          perspective   : 1000    || options.perspective,
          sensitivity   : 20      || options.sensitivity,
          invert        : false   || options.invert,
          scale         : false   || options.scale,
          shadow        : false   || options.shadow,
          shine         : false   || options.shine,
          persist       : false   || options.persist,
          position      : false   || options.position,
          transition    : false   || options.transition,
          hoverInClass  : false   || options.hoverInClass,
          hoverOutClass : false   || options.hoverOutClass,
          hoverClass    : false   || options.hoverClass,
          touchEnabled  : touch() || options.touch
        };

      var $targets     = document.querySelectorAll(config.selector),
          i            = $targets.length,
          j            = 0;
  
      for( ; i > j; j++){
        var $target    = $targets[j],
            $container = $target.parentNode;
  
        handleHover($target, $container,config);
      }

    } else {
      console.warn("hover3d-vanilla is incompatible with your browser.");
      return;
    }
    
  }
    
  function handleHover($target, $container, config){
    
    function getProp(props) {
      var i = props.length,
          j = 0;
        for ( ; i > j; j++) {
            if (typeof document.body.style[props[j]] !== "undefined") {
                return props[j];
            }
        }
        return null;
    }
    
    function removeClass(cssClasses, cssClass){
      var rxp = new RegExp(cssClass + '\\s*', 'gi');
      return cssClasses.replace(rxp, '').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
    
    var persp       = ["perspective","webkitPerspective","mozPerspective"],
        trsfrmstyle = ["transformStyle","webkitTransformStyle","mozTransformStyle"],
        trsfrm      = ["transform","webkitTransform","mozTransform"],
        bfcvis      = ["backfaceVisibility","webkitBackfaceVisibility","mozBackfaceVisibility"],
        wllChng     = ["willChange"],
        trnstnPrp   = ["transitionProperty","webkitTransitionProperty","mozTransitionProperty"],
        trnstnDrt   = ["transitionDuration","webkitTransitionDuration","mozTransitionDuration"],
        trnstnTf    = ["transitionTimingFunction","webkitTransitionTimingFunction","mozTransitionTimingFunction"],
        trnstnDl    = ["transitionDelay","webkitTransitionDelay","mozTransitionDelay"],
        bxShdw      = ["boxShadow","webkitBoxShadow","mozBoxShadow"],
        perspectiveProp          = getProp(persp),
        transformStyleProp       = getProp(trsfrmstyle),
        transformProp            = getProp(trsfrm),
        backfaceVisProp          = getProp(bfcvis),
        willChangeProp           = getProp(wllChng),
        transitionPropertyProp   = getProp(trnstnPrp),
        transitionDurationProp   = getProp(trnstnDrt),
        transitionTimingProp     = getProp(trnstnTf),
        transitionDelayProp      = getProp(trnstnDl),
        boxShadowProp            = getProp(bxShdw);
           
      $container.style[perspectiveProp]      = config.perspective + "px";
      $target.style[perspectiveProp]         = config.perspective + "px";
      $container.style[transformStyleProp]   = "preserve-3d";
      $target.style[transformStyleProp]      = "preserve-3d";
      $target.style[transformProp]           = "rotateY(0deg) rotateX(0deg)";
    
    // Handle Chrome Mobile bug
    if (!config.touchEnabled && !window.chrome){
      $target.style[backfaceVisProp]         = "hidden";
    }
    
    if (config.position && typeof config.position === "object"){
      $target.style.position = config.position.type;
      $target.style.zIndex   = config.position.zindex;
    } else {
      $target.style.position = "relative";
    }
    
    if (config.transition && typeof config.transition === "object"){
      $target.style[willChangeProp]              = config.transition.prop;
      $target.style[transitionPropertyProp]      = config.transition.prop;
      $target.style[transitionDurationProp]      = config.transition.duration;
      $target.style[transitionTimingProp]        = config.transition.timing;
      $target.style[transitionDelayProp]         = config.transition.delay;
    } 
    else {
      $target.style[willChangeProp]              = "transform";
      $target.style[transitionPropertyProp]      = "transform";
      $target.style[transitionDurationProp]      = "0.2s";
      $target.style[transitionTimingProp]        = "cubic-bezier(0.3,1,0.2,1)";
      $target.style[transitionDelayProp]         = 0;
    }
    
    if (config.shadow){
      var $shadow                    = document.createElement('div');
      $shadow.className              = "shadow";
      $shadow.style.position         = "absolute";
      $shadow.style.top              = 0;
      $shadow.style.left             = 0;
      $shadow.style.bottom           = 0;
      $shadow.style.right            = 0;
      $shadow.style.zIndex           = 1;
      $shadow.style[boxShadowProp] = "0 6px 18px rgba(14,21,47,0.6)";  

      if (config.transition && typeof config.transition === "object"){
        $shadow.style[willChangeProp]              = "box-shadow,transform";
        $shadow.style[transitionPropertyProp]      = "box-shadow";
        $shadow.style[transitionDurationProp]      = config.transition.duration;
        $shadow.style[transitionTimingProp]        = config.transition.timing;
        $shadow.style[transitionDelayProp]         = config.transition.delay;
      }
      else {
        $shadow.style[willChangeProp]              = "box-shadow,transform";
        $shadow.style[transitionPropertyProp]      = "box-shadow";
        $shadow.style[transitionDurationProp]      = "0.2s";
        $shadow.style[transitionTimingProp]        = "cubic-bezier(0.3,1,0.2,1)";
      }
      $target.appendChild($shadow);
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
      $shine.style.opacity  = 0;
      
      if (config.transition && typeof config.transition === "object"){
        $shine.style[willChangeProp]              = "opacity,transform";
        $shine.style[transitionPropertyProp]      = "opacity";
        $shine.style[transitionDurationProp]      = config.transition.duration;
        $shine.style[transitionTimingProp]        = config.transition.timing;
        $shine.style[transitionDelayProp]         = config.transition.delay;
      }
      else {
        $shine.style[willChangeProp]              = "box-shadow,transform";
        $shine.style[transitionPropertyProp]      = "box-shadow";
        $shine.style[transitionDurationProp]      = "0.2s";
        $shine.style[transitionTimingProp]        = "cubic-bezier(0.3,1,0.2,1)";
      }
      $target.appendChild($shine);
    }
    
    function enter(){
      
      if (config.hoverClass && config.hoverInClass){
        $target.className += ' ' + config.hoverClass + ' ' + config.hoverInClass;
        setTimeout(function(){
          $target.className = removeClass($target.className,config.hoverInClass);
        }, 1000);
      } 
      else if (config.hoverClass){
        $target.className += ' ' + config.hoverInClass;
        setTimeout(function(){
          $target.className = removeClass($target.className,config.hoverInClass);
        }, 1000);
      } 
      else if (config.hoverInClass){
        $target.className += ' ' + config.hoverClass;
      }
    }
      
    function move(e){
      
      var w      = $container.offsetWidth,
          h      = $container.offsetHeight,
          ox     = config.touchEnabled ? e.touches[0].offsetX : e.offsetX,
          oy     = config.touchEnabled ? e.touches[0].offsetY : e.offsetY,
          ax     = config.invert ? -(w / 2 - ox) / config.sensitivity :  (w / 2 - ox) / config.sensitivity,
          ay     = config.invert ?  (h / 2 - oy) / config.sensitivity : -(h / 2 - oy) / config.sensitivity,
          dy     = oy - h / 2,
          dx     = ox - w / 2,
          theta  = Math.atan2(dy,dx),
          ang    = theta * 180 / Math.PI - 90,
          angle  = ang < 0 ? angle = ang + 360 : angle = ang;
      
      if (config.scale){
        $target.style[transformProp] = "rotateY(" + ax + "deg) rotateX(" + ay + "deg) scale3d(1.05,1.05,1.05)";
      }
      else {
        $target.style[transformProp] = "rotateY(" + ax + "deg) rotateX(" + ay + "deg)";
      }
      
      if (config.shadow){
        $shadow.style[boxShadowProp] = "0 24px 48px rgba(14,21,47,0.4), 0 12px 24px rgba(14,21,47,0.4)";
      }

      if (config.shine){
        $shine.style.opacity         = 1;
        $shine.style.backgroundImage = 'linear-gradient('+angle+'deg,rgba(230,230,230,'+ oy / h * 0.5 +') 0%,transparent 80%)';
      }
    }
    
    function leave(){
      
      if (config.shadow){
        $shadow.style[boxShadowProp]  = "0 6px 18px rgba(14,21,47,0.6)";
      }
      
      if (!config.persist){
        $target.style[transformProp]  = "rotateX(0deg) rotateY(0deg)";
  
        if (config.shine){
          $shine.style.opacity        = 0;
        }
      }
      
      if (config.hoverClass && config.hoverOutClass){
        $target.className += ' ' + config.hoverOutClass;
        $target.className = removeClass($target.className,config.hoverClass);
        setTimeout(function(){
          $target.className = removeClass($target.className,config.hoverOutClass);
        }, 1000);
      }
      else if (config.hoverClass){
        $target.className = removeClass($target.className,config.hoverClass);
      }
      else if (config.hoverOutClass){
        $target.className += ' ' + config.hoverOutClass;
        setTimeout(function(){
          $target.className = removeClass($target.className,config.hoverOutClass);
        }, 1000);
      }
    }
    
    if(config.touchEnabled){
      $container.addEventListener("touchstart", function(){
        return enter();
      });
      $container.addEventListener("touchmove", function(e){
        return move(e);
      });
      $container.addEventListener("touchend", function(){
        return leave();
      });
    } 
    else {
      $container.addEventListener("mouseenter", function(){
        return enter();
      });
      $container.addEventListener("mousemove", function(e){
        return move(e);
      });
      $container.addEventListener("mouseleave", function(){
        return leave();
      });
    }
  }
  
  // Expose lib
  window.hover3d=hover3d;
}();
