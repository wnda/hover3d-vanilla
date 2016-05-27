;(function(){

  "use strict";

  function pivot(config){

      function touch(){
        return !!("ontouchstart" in window) || !!("onmsgesturechange" in window) || !!(navigator.MaxTouchPoints);
      }

      var touchEnabled = config.touchEnabled || touch(),
          $targets     = document.querySelectorAll(config.selector),
          i            = $targets.length,
          j            = 0;

      for( ; i > j; j++){
        var $target    = $targets[j],
            $container = $target.parentNode;

        handleHover($target, $container, config, touchEnabled);
      }
  }

  function handleHover($target, $container, config, touchEnabled){

    function getProp(props) {
      var i = props.length,
          j = 0;
        for ( ; i > j; j++){
            if (typeof document.body.style[props[j]] !== "undefined") {
                return props[j];
            }
        }
        return null;
    }

    function getUnit(t){
      if (typeof t !== "number"){
      	console.warn("Please provide a numeric value");
      	return "0.2s";
      }
      else if (t > 1 && t <= 50){
      	return "0."+t+"s";
      }
      else if (t > 50){
      	return t+"ms";
      }
      else {
      	return t+"s";
      }
    }

    function getTFunc(tf){
      var tfl = tf.length;
      if (tf.constructor !== Array){
      	console.warn("Bad input: expected array");
      	return "none";
      }
      else if (tfl === 4){
      	if (typeof tf[0] === "number" && typeof tf[1] === "number" && typeof tf[2] === "number" && typeof tf[3] === "number"){
      	  return "cubic-bezier("+tf[0]+","+tf[1]+","+tf[2]+","+tf[3]+")";
      	}
      	else {
      	  console.warn("Bad input: expected numbers");
      	  return "none";
      	}
      }
      else {
      	console.warn("Bad input: expected four values");
      	return "none";
      }
    }

    function removeClass(cssClasses, cssClass){
      var rxp = new RegExp(cssClass + "\\s*", "gi");
      return cssClasses.replace(rxp, "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }

    var perspectiveProp          = getProp(["perspective","webkitPerspective","mozPerspective"]),
        transformStyleProp       = getProp(["transformStyle","webkitTransformStyle","mozTransformStyle"]),
        transformProp            = getProp(["transform","webkitTransform","mozTransform"]),
        backfaceVisProp          = getProp(["backfaceVisibility","webkitBackfaceVisibility","mozBackfaceVisibility"]),
        willChangeProp           = getProp(["willChange"]),
        transitionPropertyProp   = getProp(["transitionProperty","webkitTransitionProperty","mozTransitionProperty"]),
        transitionDurationProp   = getProp(["transitionDuration","webkitTransitionDuration","mozTransitionDuration"]),
        transitionTimingProp     = getProp(["transitionTimingFunction","webkitTransitionTimingFunction","mozTransitionTimingFunction"]),
        transitionDelayProp      = getProp(["transitionDelay","webkitTransitionDelay","mozTransitionDelay"]),
        boxShadowProp            = getProp(["boxShadow","webkitBoxShadow","mozBoxShadow"]),
        userSelectProp           = getProp(["userSelect","webkitUserSelect","mozUserSelect"]),
        sensitivity              = 0;

    if (config.perspective && typeof config.perspective === "number"){
      $container.style[perspectiveProp] = config.perspective + "px";
      $target.style[perspectiveProp]    = config.perspective + "px";
    }
    else {
      $container.style[perspectiveProp] = "1000px";
      $target.style[perspectiveProp]    = "1000px";
    }

    $container.style[transformStyleProp] = "preserve-3d" || "flat" || "";
    $target.style[transformStyleProp]    = "preserve-3d" || "flat" || "";
    $container.style[userSelectProp]     = "none";
    $target.style[userSelectProp]        = "none";
    $target.style[transformProp]         = "rotateY(0deg) rotateX(0deg)";

    if (config.sensitivity && typeof config.sensitivity === "number"){
      sensitivity = config.sensitivity;
    }
    else {
      sensitivity = 20;
    }

    if (touchEnabled){
      $target.style[backfaceVisProp] = "hidden";
    }

    if (config.position && typeof config.position === "object"){
      $target.style.position = config.position.method;
      $target.style.zIndex   = config.position.zindex;
    }
    else {
      $target.style.position = "relative";
    }

    if (config.transition && typeof config.transition === "object"){
      $target.style[willChangeProp]              = config.transition.prop;
      $target.style[transitionPropertyProp]      = config.transition.prop;
      $target.style[transitionDurationProp]      = getUnit(config.transition.duration);
      $target.style[transitionTimingProp]        = getTFunc(config.transition.timing);
    }
    else {
      $target.style[willChangeProp]              = "transform";
      $target.style[transitionPropertyProp]      = "transform";
      $target.style[transitionDurationProp]      = "0.2s";
      $target.style[transitionTimingProp]        = "cubic-bezier(0.3,1,0.2,1)";
    }

    if (config.shadow){
      var $shadow                    = document.createElement("div");
      $shadow.className              = "shadow";
      $shadow.style.position         = "absolute";
      $shadow.style.top              = "5%";
      $shadow.style.left             = "5%";
      $shadow.style.bottom           = "5%";
      $shadow.style.right            = "5%";
      $shadow.style.zIndex           = 1;
      $shadow.style[transformProp]   = "translateZ(-2px)";
      $shadow.style[boxShadowProp]   = "0 8px 30px rgba(14,21,47,0.6)";

      if (config.transition && typeof config.transition === "object"){
        $shadow.style[willChangeProp]              = "box-shadow,transform";
        $shadow.style[transitionPropertyProp]      = "box-shadow";
        $shadow.style[transitionDurationProp]      = getUnit(config.transition.duration);
        $shadow.style[transitionTimingProp]        = getTFunc(config.transition.timing);
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
      var $shine            = document.createElement("div");
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
        $shine.style[transitionDurationProp]      = getUnit(config.transition.duration);
        $shine.style[transitionTimingProp]        = getTFunc(config.transition.timing);
      }
      else {
        $shine.style[willChangeProp]              = "box-shadow,transform";
        $shine.style[transitionPropertyProp]      = "box-shadow";
        $shine.style[transitionDurationProp]      = "0.2s";
        $shine.style[transitionTimingProp]        = "cubic-bezier(0.3,1,0.2,1)";
      }
      $target.appendChild($shine);
    }

    if (config.child3D && typeof config.child3D === "number"){
      var p=$target.children.length,
          q=0;
      for ( ; p > q; q++) {
        if(!config.shadow || $target.children[q].className !== $shadow.className){
          if(!config.shine || $target.children[q].className !== $shine.className){
            $target.children[q].style[transformProp] = "translateZ("+config.child3D+"px)";
          }
        }
      }
    }

    function enter(){

      if (config.hoverClass && config.hoverInClass){
        $target.className  += " " + config.hoverClass + " " + config.hoverInClass;
        setTimeout(function(){
          $target.className = removeClass($target.className,config.hoverInClass);
        }, 1000);
      }
      else if (config.hoverClass){
        $target.className += " " + config.hoverClass;
      }
      else if (config.hoverInClass){
        $target.className += " " + config.hoverInClass;
        setTimeout(function(){
          $target.className = removeClass($target.className,config.hoverInClass);
        }, 1000);
      }
    }

    function move(e){

      var w      = $container.offsetWidth,
          h      = $container.offsetHeight,
          rect   = $target.getBoundingClientRect(),
          ox     = touchEnabled ? e.touches[0].clientX - rect.left : e.offsetX,
          oy     = touchEnabled ? e.touches[0].clientY - rect.top  : e.offsetY,
          ax     = config.invert ? -(w / 2 - ox) / sensitivity :  (w / 2 - ox) / sensitivity,
          ay     = config.invert ?  (h / 2 - oy) / sensitivity : -(h / 2 - oy) / sensitivity,
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
        $shine.style.backgroundImage = "linear-gradient("+angle+"deg,rgba(230,230,230,"+ oy / h * 0.5 +") 0%,transparent 80%)";
      }
    }

    function leave(){

      if (config.shadow){
        $shadow.style[boxShadowProp]  = "0 8px 30px rgba(14,21,47,0.6)";
      }

      if (!config.persist){
        $target.style[transformProp]  = "rotateX(0deg) rotateY(0deg)";

        if (config.shine){
          $shine.style.opacity        = 0;
        }
      }

      if (config.hoverClass && config.hoverOutClass){
        $target.className += " " + config.hoverOutClass;
        $target.className = removeClass($target.className,config.hoverClass);
        setTimeout(function(){
          $target.className = removeClass($target.className,config.hoverOutClass);
        }, 1000);
      }
      else if (config.hoverClass){
        $target.className = removeClass($target.className,config.hoverClass);
      }
      else if (config.hoverOutClass){
        $target.className += " " + config.hoverOutClass;
        setTimeout(function(){
          $target.className = removeClass($target.className,config.hoverOutClass);
        }, 1000);
      }
    }

    if (touchEnabled){
      $container.addEventListener("touchstart", function(){
        if (window.preventScroll){
          window.preventScroll = true;
        }
        return enter();
      });
      $container.addEventListener("touchmove", function(e){
        if (window.preventScroll){
	        e.preventDefault();
	      }
        return move(e);
      });
      $container.addEventListener("touchend", function(){
        if (window.preventScroll){
          window.preventScroll = false;
        }
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

  window.pivot=pivot;

}());
