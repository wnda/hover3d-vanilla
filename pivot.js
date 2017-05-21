;(function (win, doc) {

  'use strict';

  win.pivot = {
    'init': init
  };
  
  var _prevent_scroll = false;

  function init (config) {
    var _touch = (!!('ontouchstart' in win) || !!('onmsgesturechange' in win) || !!(navigator.MaxTouchPoints));
    var _targets;
    var _target;
    var _container;
    var i = 0;
    var j = 0;

    if (typeof config === 'undefined' || typeof config !== 'object') { return; }
    if ('touch' in config) { _touch = config.touch; }
    if ('selector' in config) { _targets = doc.querySelectorAll(config.selector); }

    if (_targets.length > 0) {

      i = _targets.length;

      for (; i > j; j++) {
        _target    = _targets[j];
        _container = _target.parentNode;
        handleHover(_target, _container, config, _touch);
      }
    }
  }

  function handleHover (target, container, config, touch) {
    var _shadow;
    var _shine;
    var sensitivity                     = 0;
    var perspectiveProp                 = getProp(['perspective', 'webkitPerspective', 'mozPerspective']);
    var transformStyleProp              = getProp(['transformStyle', 'webkitTransformStyle', 'mozTransformStyle']);
    var transformProp                   = getProp(['transform', 'webkitTransform', 'mozTransform']);
    var backfaceVisProp                 = getProp(['backfaceVisibility', 'webkitBackfaceVisibility', 'mozBackfaceVisibility']);
    var willChangeProp                  = getProp(['willChange']);
    var boxShadowProp                   = getProp(['boxShadow', 'webkitBoxShadow', 'mozBoxShadow']);
    var userSelectProp                  = getProp(['userSelect', 'webkitUserSelect', 'mozUserSelect']);
    var transitionPropertyProp          = getProp(['transitionProperty', 'webkitTransitionProperty', 'mozTransitionProperty']);
    var transitionDurationProp          = getProp(['transitionDuration', 'webkitTransitionDuration', 'mozTransitionDuration']);
    var transitionDelayProp             = getProp(['transitionDelay', 'webkitTransitionDelay', 'mozTransitionDelay']);
    var transitionTimingProp            = getProp(['transitionTimingFunction', 'webkitTransitionTimingFunction', 'mozTransitionTimingFunction']);

    if (config.perspective && typeof config.perspective === 'number') {
      container.style[perspectiveProp]  = config.perspective + 'px';
      target.style[perspectiveProp]     = config.perspective + 'px';

    } else {
      container.style[perspectiveProp]  = '1000px';
      target.style[perspectiveProp]     = '1000px';
    }

    container.style[transformStyleProp] = 'preserve-3d' || 'flat' || '';
    target.style[transformStyleProp]    = 'preserve-3d' || 'flat' || '';
    container.style[userSelectProp]     = 'none';
    target.style[userSelectProp]        = 'none';
    target.style[transformProp]         = 'rotateY(0deg) rotateX(0deg)';

    if (config.sensitivity && typeof config.sensitivity === 'number') {
      sensitivity = config.sensitivity;

    } else {
      sensitivity = 20;
    }

    if (touch) { target.style[backfaceVisProp] = 'hidden'; }

    if (config.position && typeof config.position === 'object') {
      target.style.position             = config.position.method;
      target.style.zIndex               = config.position.zindex;

    } else {
      target.style.position             = 'relative';
    }

    if (config.transition && typeof config.transition === 'object') {
      target.style[willChangeProp]                 = config.transition.prop;
      target.style[transitionPropertyProp]         = config.transition.prop;
      target.style[transitionDurationProp]         = getUnit(config.transition.duration);
      target.style[transitionTimingProp]           = getTFunc(config.transition.timing);

    } else {
      target.style[willChangeProp]                 = 'transform';
      target.style[transitionPropertyProp]         = 'transform';
      target.style[transitionDurationProp]         = '0.2s';
      target.style[transitionTimingProp]           = 'cubic-bezier(0.3, 1, 0.2, 1)';
    }

    if (config.shadow) {
      _shadow                                      = doc.createElement('div');
      _shadow.className                            = 'shadow';
      _shadow.style.position                       = 'absolute';
      _shadow.style.top                            = '5%';
      _shadow.style.left                           = '5%';
      _shadow.style.bottom                         = '5%';
      _shadow.style.right                          = '5%';
      _shadow.style.zIndex                         = 1;
      _shadow.style[transformProp]                 = 'translateZ(-2px)';
      _shadow.style[boxShadowProp]                 = '0 8px 30px rgba(14, 21, 47, 0.6)';

      if (config.transition && typeof config.transition === 'object') {
        _shadow.style[willChangeProp]              = 'box-shadow, transform';
        _shadow.style[transitionPropertyProp]      = 'box-shadow';
        _shadow.style[transitionDurationProp]      = getUnit(config.transition.duration);
        _shadow.style[transitionTimingProp]        = getTFunc(config.transition.timing);

      } else {
        _shadow.style[willChangeProp]              = 'box-shadow, transform';
        _shadow.style[transitionPropertyProp]      = 'box-shadow';
        _shadow.style[transitionDurationProp]      = '0.2s';
        _shadow.style[transitionTimingProp]        = 'cubic-bezier(0.3, 1, 0.2, 1)';
      }

      target.appendChild(_shadow);
    }

    if (config.shine) {
      _shine                                      = doc.createElement('div');
      _shine.className                            = 'shine';
      _shine.style.position                       = 'absolute';
      _shine.style.top                            = 0;
      _shine.style.left                           = 0;
      _shine.style.bottom                         = 0;
      _shine.style.right                          = 0;
      _shine.style.zIndex                         = 9;
      _shine.style.opacity                        = 0;

      if (config.transition && typeof config.transition === 'object') {
        _shine.style[willChangeProp]              = 'opacity, transform';
        _shine.style[transitionPropertyProp]      = 'opacity';
        _shine.style[transitionDurationProp]      = getUnit(config.transition.duration);
        _shine.style[transitionTimingProp]        = getTFunc(config.transition.timing);

      } else {
        _shine.style[willChangeProp]              = 'box-shadow, transform';
        _shine.style[transitionPropertyProp]      = 'box-shadow';
        _shine.style[transitionDurationProp]      = '0.2s';
        _shine.style[transitionTimingProp]        = 'cubic-bezier(0.3, 1, 0.2, 1)';
      }

      target.appendChild(_shine);
    }

    if (config.child3D && typeof config.child3D === 'number') {
      var p = _target.children.length;
      var q = 0;

      for (; p > q; q++) {
        if (!config.shadow || target.children[q].className !== _shadow.className) {
          if (!config.shine || target.children[q].className !== _shine.className) {
            target.children[q].style[transformProp] = 'translateZ(' + config.child3D + 'px)';
          }
        }
      }
    }

    function enter () {
      if (config.hoverClass && config.hoverInClass) {
        target.className  += ' ' + config.hoverClass + ' ' + config.hoverInClass;
        setTimeout(function () {
          target.className = removeClass(target.className, config.hoverInClass);
        }, 1000);

      } else if (config.hoverClass) {
        target.className += ' ' + config.hoverClass;

      } else if (config.hoverInClass) {
        target.className += ' ' + config.hoverInClass;
        setTimeout(function () {
          target.className = removeClass(target.className,config.hoverInClass);
        }, 1000);
      }
    }

    function move (e) {
      var w      = container.offsetWidth;
      var h      = container.offsetHeight;
      var rect   = target.getBoundingClientRect();
      var ox     = touch ? e.touches[0].clientX - rect.left : e.offsetX;
      var oy     = touch ? e.touches[0].clientY - rect.top  : e.offsetY;
      var ax     = config.invert ? -((w / 2) - ox) / sensitivity :  ((w / 2) - ox) / sensitivity;
      var ay     = config.invert ?  ((h / 2) - oy) / sensitivity : -((h / 2) - oy) / sensitivity;
      var dy     = oy - (h / 2);
      var dx     = ox - (w / 2);
      var theta  = Math.atan2(dy, dx);
      var ang    = (theta * (180 / Math.PI)) - 90;
      var angle  = ang < 0 ? ang + 360 : ang;

      if (config.scale) {
        target.style[transformProp] = 'rotateY(' + ax + 'deg) rotateX(' + ay + 'deg) scale3d(1.05, 1.05, 1.05)';

      } else {
        target.style[transformProp] = 'rotateY(' + ax + 'deg) rotateX(' + ay + 'deg)';
      }

      if (config.shadow) {
        _shadow.style[boxShadowProp] = '0 24px 48px rgba(14, 21, 47, 0.4), 0 12px 24px rgba(14, 21, 47, 0.4)';
      }

      if (config.shine) {
        _shine.style.opacity         = 1;
        _shine.style.backgroundImage = 'linear-gradient(' + angle + 'deg, rgba(230, 230, 230, ' + oy / h * 0.5 +') 0%, transparent 80%)';
      }
    }

    function leave () {
      if (config.shadow) {
        _shadow.style[boxShadowProp]  = '0 8px 30px rgba(14, 21, 47, 0.6)';
      }

      if (!config.persist) {
        target.style[transformProp]  = 'rotateX(0deg) rotateY(0deg)';

        if (config.shine) {
          _shine.style.opacity        = 0;
        }
      }

      if (config.hoverClass && config.hoverOutClass) {
        target.className += ' ' + config.hoverOutClass;
        target.className = removeClass(target.className, config.hoverClass);
        setTimeout(function () {
          target.className = removeClass(target.className, config.hoverOutClass);
        }, 1000);

      } else if (config.hoverClass) {
        target.className = removeClass(target.className, config.hoverClass);

      } else if (config.hoverOutClass) {
        target.className += ' ' + config.hoverOutClass;
        setTimeout(function () {
          target.className = removeClass(target.className, config.hoverOutClass);
        }, 1000);
      }
    }

    if (touch) {
      container.addEventListener('touchstart', function () {
        if (!_prevent_scroll) { _prevent_scroll = true; }
        return enter();
      });

      container.addEventListener('touchmove', function (e) {
        if (!!_prevent_scroll) { e.preventDefault(); }
        return move(e);
      });

      container.addEventListener('touchend', function () {
        if (!!_prevent_scroll) { win.preventScroll = false; }
        return leave();
      });

    } else {
      container.addEventListener('mouseenter', function () {
        return enter();
      });

      container.addEventListener('mousemove', function (e) {
        return move(e);
      });

      container.addEventListener('mouseleave', function () {
        return leave();
      });
    }
  }

  function getProp (props) {
    var i = props.length;
    var j = 0;

    for ( ; i > j; j++) {
      if (typeof doc.body.style[props[j]] !== 'undefined') {
        return props[j];
      }
    }

    return null;
  }

  function getUnit (t) {
    if (typeof t !== 'number') {
      console.warn('Please provide a numeric value');
      return '0.2s';

    } else if (t > 1 && t <= 50) {
      return '0.' + t + 's';

    } else if (t > 50) {
      return t + 'ms';

    } else {
      return t + 's';
    }
  }

  function getTFunc (tf) {
    var tfl = tf.length;

    if (tf.constructor !== Array) {
      console.warn('Bad input: expected array');
      return 'none';

    } else if (tfl === 4) {

      if (typeof tf[0] === 'number' && typeof tf[1] === 'number' && typeof tf[2] === 'number' && typeof tf[3] === 'number') {
        return 'cubic-bezier(' + tf[0] + ', ' + tf[1] + ', ' + tf[2] + ', ' + tf[3] + ')';

      } else {
        console.warn('Bad input: expected numbers');
        return 'none';
      }

    } else {
      console.warn('Bad input: expected four values');
      return 'none';
    }
  }

  function removeClass (cssClasses, cssClass) {
    var rxp = new RegExp(cssClass + '\\s*', 'gi');
    return cssClasses.replace(rxp, '').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }
  
  function rebounce (func) {
    var scheduled, context, args, i, j;
    return function () {
      context = this;
      args = [];
      i = arguments.length;
      j = 0;

      for (; j < i; ++j) {
        args[j] = arguments[j];
      }

      if (!!scheduled) {
        win.cancelAnimationFrame(scheduled);
      }

      scheduled = win.requestAnimationFrame(function () {
        func.apply(context, args);
        scheduled = null;
      });
    }
  }

})(window, document);
