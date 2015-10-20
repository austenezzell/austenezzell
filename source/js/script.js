/* ====================================
   Onload functions
   ==================================== */

var aeApp = aeApp || {};

  aeApp.bgColor = function() {
      $.adaptiveBackground.run();
  };

  aeApp.blog = function(){
    var bg = $('.scene_element').css('background-color');
    if($('body').hasClass('blog-page')){
      if(bg === 'rgba(0, 0, 0, 0)'){
        $('body').addClass('black-bg');
        $('body').css('background', '#000');
      } else {
        $('body').removeClass('black-bg');
        $('body').css('background', '');
      }
    }
    $('.nextBlogEntry').hover(function(){
      $('#follow').velocity({
        opacity: 1
      },{
        duration: 400,
        display: 'block',
      });
      $('.nextBlogEntry').on('mousemove', function(e){
        $('#follow').css({
           left:  e.pageX,
           top:   e.pageY
        });
      });
    }, function(){
      $('#follow').velocity({
        opacity: 0
      },{
        duration: 400,
        display: 'none',
      });
    });

  };

  var numberOfClicks = 0;
  var numberOfImages;

  aeApp.intro = function() {
   $('.footer-content').velocity({
     opacity: 1
   }, {
     duration: 400,
     delay: 800,
     display: 'block'
   });

   if($('body').hasClass('blog-page')){
     numberOfImages = $('.image').length;
     var $blogContainer = $('.blog-container');
     var fadeIn = function(e, order){
       order *= 400;
       e.velocity({
         opacity: 1
       }, {
         duration: 400,
         delay: order
       });
     };

     fadeIn($('.image-1'), 1);
     if(numberOfImages == 2) {
       fadeIn($('.image-2'), 2);
     }
     if(numberOfImages == 3){
       fadeIn($('.image-3'), 3);
     }
   }

   if($('body').hasClass('home-page')){
    var numberOfFeatures = $('.feature-container').length;
    var randomFeature = Math.floor(Math.random() * numberOfFeatures) + 1;

    var animateIn = function(element, order){
      order *= 400;

      if(element.hasClass('home-feature')){
        element.velocity({
          opacity: 1
        }, {
          duration: 400,
          delay: order,
          complete: function(){
            element.find('span').velocity({
              opacity: 1
            }, {
              duration: 1800,
              delay: 400,
              display: 'block'
            });
            }
          });
        } else {
          element.velocity({
            opacity: 1
          }, {
            duration: order,
            display: 'block',
            delay: 400
          });
        }
    };
    animateIn($('.feature-container-' + randomFeature), 0);
    animateIn($('.page-description'), 1);
    animateIn($('.home-feature-1'),2);
    animateIn($('.home-feature-2'),3);
    animateIn($('.home-feature-3'),4);
    animateIn($('.home-details'),5);
  }
};

aeApp.bodyClass = function() {
  var pageClassElement = $('.page');
  var pageClass = pageClassElement.data('page-class');
  $('body').attr('class', '');
  $('body').addClass(pageClass);
};

aeApp.resize = function() {
  var windowHeight = $( window ).outerHeight();
  var $fullHeight = $('.full-height');
  var $centerMargin =  $('.center-margin');
  var featuredHeight = $centerMargin.height();
  var centeredMarginTop = (windowHeight - featuredHeight - 90) / 2;
  var centeredMarginTopFirst = (windowHeight - featuredHeight) / 2;

  $fullHeight.velocity('stop').velocity({
    height: windowHeight
  });

  $centerMargin.css('margin-top', centeredMarginTop);
  $('.center-margin-first').css('margin-top', centeredMarginTopFirst);

  var centerNav = function(){
    var windowHeight = $( window ).outerHeight();
    var $mainNav = $('.main-navigation');
    var mainNavTop = (windowHeight / 2) - ($mainNav.height() / 2);
    console.log(mainNavTop);
    $mainNav.css('top',mainNavTop);
  }

  // centerNav();

  var peak = function(){
    $('.peak').velocity('stop').velocity({
        marginTop: centeredMarginTop
      }, {
        duration: 0,
        delay: 0,
        complete: function(){
          $(this).velocity({
            marginTop: centeredMarginTop - 24
          }, {
            duration: 400,
            delay: 800
          });
        }
    });
  }

  // Anything Desktop
  enquire.register("(min-width: 768px)", {
    match: function() {
      console.log('match desktop');
      peak();
    },
    unmatch: function() {
      console.log('un-match');

    }
  });

  // Anything mobile
  enquire.register("(max-width: 768px)", {
    match: function() {
      console.log('match');
    },
    unmatch: function() {
      console.log('un-match');
    }
  });




  var lastScrollTop = 0;




  $(window).scroll(function () {
    var scrollTop                = $(window).scrollTop();
    var footerOffset             = $('.footer').offset().top;
    var footerDistance           = (footerOffset - scrollTop);
    var footerOpacity            = (footerDistance - 200) / -200;

    if (footerOpacity > 1){
      footerOpacity = 1;
    } else if (footerOpacity < 0) {
      footerOpacity = 0;
    }

    $('.footer-bg').css('opacity', footerOpacity);

    if ($('body').hasClass('home-page')) {
      var pageDescriptionOffset    = $('.page-description').offset().top;
      var pageDescriptionDistance  = (pageDescriptionOffset - scrollTop);
      var pageDescriptionOpacity   = (pageDescriptionDistance) / 100;

      $('.page-description').css('opacity', pageDescriptionOpacity);
      $('.home-feature span').css('opacity', featuredImageOpacity);

      var featuredImageOpacity   = (pageDescriptionOpacity) + 1;
      if (featuredImageOpacity > 1){
        featuredImageOpacity = 1;
      } else if (featuredImageOpacity < 0) {
        featuredImageOpacity = 0;
      }
    }

  });

};

aeApp.homepageHoverAnimations = function() {
  var $employer = $('.employer');
  $employer.hover(function(){
    $('.featured-work-container').velocity('stop').velocity({
      opacity: 0
    }, {
      duration: 200
    });

    $('.cinco').velocity('stop').velocity({
      opacity: 1
    }, {
      duration: 200,
      delay: 200,
      display: 'block'
    });

  }, function(){
    $('.featured-work-container').velocity({
      opacity: 1
    }, {
      duration: 200,
      delay: 200,
    });
    $('.cinco').velocity('stop').velocity({
      opacity: 0
    }, {
      duration: 200,
      display: 'none'
    });
  });
};



aeApp.hoverMovement = function() {
  $('.employer').mousemove(function(e) {
    var parentOffset = $(this).offset();
    var relX = (e.pageX - parentOffset.left) / 2;
    var relY = (e.pageY - parentOffset.top) / 2;

    $('.cinco').css({
      left: relX,
      top: relY
    });
  });
};



aeApp.recentWorkAnimations = function() {

  var $feature = $('.hover-bg-target');
  var projectColor;
  var pageColor = $('.scene_element').attr("data-background-color");

  $('.scene_element').velocity({
      backgroundColor: pageColor
    }, {
      duration: 0,
      delay: 0
  });

  $feature.hover(function(){
    projectColor = $('span', this).attr("data-background").toString();
    $('.scene_element').velocity('stop').velocity({
        backgroundColor: projectColor
      }, {
        duration: 400,
        delay: 0
    });
  }, function(){
    $('.scene_element').velocity('stop').velocity({
        backgroundColor: '#fff'
      }, {
        duration: 400,
        delay: 0
    });
  });

  $('.next').hover(function(){
    nextColor = $(this).attr("data-background").toString();
    $('.scene_element').velocity('stop').velocity({
        backgroundColor: nextColor
      }, {
        duration: 400,
        delay: 0
    });
  }, function(){
    if ($('.scene_element').attr('data-background-color')) {
      $('.scene_element').velocity('stop').velocity({
          backgroundColor: pageColor
        }, {
          duration: 400,
          delay: 0
      });
    } else {
      $('.scene_element').velocity('stop').velocity({
          backgroundColor: '#fff'
        }, {
          duration: 400,
          delay: 0
      });
    }
  });

  $('.home-feature span').hover(function(){
    nextColor = $(this).attr("data-background").toString();
    $('.scene_element').velocity('stop').velocity({
        backgroundColor: nextColor
      }, {
        duration: 400,
        delay: 0
    });
  }, function(){
    if ($('.scene_element').attr('data-background-color')) {
      $('.scene_element').velocity('stop').velocity({
          backgroundColor: pageColor
        }, {
          duration: 400,
          delay: 0
      });
    } else {
      $('.scene_element').velocity('stop').velocity({
          backgroundColor: '#fff'
        }, {
          duration: 400,
          delay: 0
      });
    }
  });
};




aeApp.cloud = function() {
  if($('body').hasClass('nextbit')){
  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelRequestAnimationFrame = window[vendors[x] +
        'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
          },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());

  var layers = [],
    objects = [],
    world = document.getElementById('world'),
    viewport = document.getElementById('viewport'),
    d = 0,
    p = 400,
    worldXAngle = 0,
    worldYAngle = 0;

  viewport.style.webkitPerspective = p;
  viewport.style.MozPerspective = p;
  viewport.style.oPerspective = p;

  generate();

  function createCloud() {
    var div = document.createElement('div');
    div.className = 'cloudBase';
    var x = 0;
    var y = 0;
    var z = 100;
    var t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px )';
    world.appendChild(div);
    for (var j = 0; j < Math.random() * (7 - 4) + 4; j++) {
      var cloud = document.createElement('div');
      cloud.style.opacity = 0;
      cloud.style.opacity = 0.8;
      cloud.className = 'cloudLayer';
      if (j === 0) {
        x = 200;
      } else if (j === 1) {
        x = -200;
      } else {
        x = Math.random() * (200 - (-200)) + -200;
      }
      y = -64;
      z = Math.random() * (200 - 150) + 150;
      var a = Math.random() * 360;
      var s = Math.random() * (1.25 - 0.8) + 0.8;
      x *= 0.5;
      y *= 0.5;
      cloud.data = {
        x: x,
        y: y,
        z: z,
        a: a,
        s: s,
        speed: Math.random() * (0.03 - 0.062) + 0.062
      };
      t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px ) rotateZ( ' + a + 'deg ) scale( ' + s + ' )';
      cloud.style.webkitTransform = t;
      cloud.style.MozTransform = t;
      cloud.style.oTransform = t;
      div.appendChild(cloud);
      layers.push(cloud);
    }

    return div;
  }

  if (window.DeviceMotionEvent) {
    window.ondevicemotion = function(event) {
      worldXAngle = event.accelerationIncludingGravity.y / 5;
      worldYAngle = event.accelerationIncludingGravity.x / 5;
      updateView();
    };
  }

  var initalLocationY;
  var initalLocationX;

  $('body').on('mouseleave', function(e) {
    initalLocationY = null;
    initalLocationX = null;
  });

  $('body').on('mousemove', function(e) {

    worldYAngle = -(0.5 - (e.clientX / viewport.clientWidth)) * 180 / 100;
    worldXAngle = (0.5 - (e.clientY / viewport.clientWidth)) * 180 / 100;

    if (!initalLocationY && !initalLocationX) {
      initalLocationY = worldYAngle;
      initalLocationX = worldXAngle;
    }

    worldXAngle = initalLocationX - worldXAngle;
    worldYAngle = initalLocationY - worldYAngle;
    updateView();

  });

  function generate() {
    objects = [];
    if (world.hasChildNodes()) {
      while (world.childNodes.length >= 1) {
        world.removeChild(world.firstChild);
      }
    }
    for (var j = 0; j < 1; j++) {
      objects.push(createCloud());
    }
  }

  function updateView() {
    var t = 'rotateX( ' + worldXAngle + 'deg) rotateY( ' + worldYAngle + 'deg)';
    world.style.webkitTransform = t;
    world.style.MozTransform = t;
    world.style.oTransform = t;
  }

  function onContainerMouseWheel(event) {
    event = event ? event : window.event;
    d = d - (event.detail ? event.detail * -5 : event.wheelDelta / 8);
    updateView();
  }

  function update() {

    for (var j = 0; j < layers.length; j++) {
      var layer = layers[j];
      layer.data.a += layer.data.speed;
      var t = 'translateX( ' + layer.data.x + 'px ) translateY( ' + layer.data.y + 'px ) translateZ( ' + layer.data.z + 'px ) rotateY( ' + (-worldYAngle) + 'deg ) rotateX( ' + (-worldXAngle) + 'deg ) rotateZ( ' + layer.data.a + 'deg ) scale( ' + layer.data.s + ')';
      layer.style.webkitTransform = t;
      layer.style.MozTransform = t;
      layer.style.oTransform = t;
    }

    requestAnimationFrame(update);

  }

  update();
  }
};



aeApp.smoothState = function() {
  // SmoothState
  var $body = $('html, body');
  var targetElement;

  var options = {
      prefetch: true,
      prefetchOn: 'mouseover touchstart',
      cacheLength: 2,
      debug: true,
      blacklist: '.no-smoothState',
      onBefore: function(element) {
        targetElement = element;

        if ($(targetElement).hasClass('featured-work')) {
          var projectColor = $('span', targetElement).attr("data-background");
          $('body').velocity({
              backgroundColor: projectColor
            }, {
              duration: 400,
              delay: 0
          });

        } else if ($(targetElement).hasClass('nav-home')){
          $('html').velocity("scroll", { offset: '0px', mobileHA: false });
          $('body').velocity({
              backgroundColor: '#fff'
            }, {
              duration: 400,
              delay: 0
          });
        } else if ($(targetElement).hasClass('nav-blog') || $(targetElement).hasClass('nextBlogEntry')){
          $('body').velocity({
              backgroundColor: '#000'
            }, {
              duration: 400,
              delay: 0
          });
        } else if ($(targetElement).hasClass('next') || $(targetElement).hasClass('featured-case-study')) {
          var nextProjectColor = $(targetElement).attr("data-background");

          $('body').velocity({
              backgroundColor: nextProjectColor
            }, {
              duration: 0,
              delay: 0
          });
        } else {
          $('body').velocity({
              backgroundColor: '#fff'
            }, {
              duration: 400,
              delay: 0
          });
        }
      },

      onStart: {
        duration: 400, // Duration of our animation
        render: function($container) {
          // Add your CSS animation reversing class
          $container.addClass('is-exiting');
          // Restart your animation
          smoothState.restartCSSAnimations();
          // aeApp.onload();
        }
      },
      onReady: {
        duration: 0,
        render: function($container, $newContent) {
          // Remove your CSS animation reversing class
          $container.removeClass('is-exiting');
          // Inject the new content
          $container.html($newContent);
          aeApp.onload();
        }
      }
    },
    smoothState = $('#main-container').smoothState(options).data('smoothState');
};

$( window ).resize(function() {
  aeApp.resize();
});

// Define load object
aeApp.onload = function() {
  aeApp.smoothState();
  aeApp.bodyClass();
  aeApp.blog();
  aeApp.resize();
  aeApp.intro();
  aeApp.bgColor();
  aeApp.recentWorkAnimations();
  aeApp.homepageHoverAnimations();
  aeApp.hoverMovement();
  aeApp.cloud();
};

(function($, window, document) {

  aeApp.onload();

}(window.jQuery, window, document));
