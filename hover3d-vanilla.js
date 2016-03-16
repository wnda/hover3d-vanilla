(function(){
  
  function hover3d(options){
    
    var config =
      {
        selector      : null        || options.selector,
        perspective   : 1000        || options.perspective,
        sensitivity   : 20          || options.sensitivity,
        invert        : false       || options.invert,
        shine         : false       || options.shine,
        persist       : false       || options.persist,
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
      return cssClasses.replace(rxp, '').trim();
    }

    $container.style.perspective      = config.perspective + "px";
    $container.style.transformStyle   = "preserve-3d";
    
    $target.style.perspective         = config.perspective + "px";
    $target.style.transformStyle      = "preserve-3d";
    $target.style.position            = "relative";
    
    if (config.shine){
      var $shine            = document.createElement('div');
      $shine.className      = "shine";
      $shine.style.position = "absolute";
      $shine.style.top      = 0;
      $shine.style.left     = 0;
      $shine.style.bottom   = 0;
      $shine.style.right    = 0;
      $shine.style.zIndex   = 9;
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
      
      $target.style.perspective    = config.perspective + "px";
      $target.style.transformStyle = "preserve-3d";
      $target.style.transform      = "rotateY(" + ax + "deg) rotateX(" + ay + "deg)";
      
      if (config.shine){
        $shine.style.backgroundImage='linear-gradient('+angle+'deg,rgba(255,255,255,'+ event.offsetY / h * 0.5 +') 0%,rgba(255,255,255,0) 80%)';
      }
    }
    
    function leave(){
                        
      if (!config.persist){
        $target.style.perspective    = config.perspective + "px";
        $target.style.transformStyle = "preserve-3d";
        $target.style.transform      = "rotateX(0) rotateY(0)";
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
    
  window.hover3d=hover3d;
})();

hover3d({
  selector: "#YOUR,.SELECTORS,GO>HERE"
});
