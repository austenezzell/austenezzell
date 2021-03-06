/* ====================================
   Onload functions
   ==================================== */

var aeApp = aeApp || {};

  aeApp.aboutStory = function() {


    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
           return null;
        }
        else{
           return results[1] || 0;
        }
    }

    // example.com?id=company name
    $.urlParam('id');        // company name
    var companyName = decodeURIComponent($.urlParam('id'));

    if($.urlParam('id')){

      $('.about-content p').first().before('<p>Dear ' + companyName + ',</p><p>My name is Austen Ezzell. I\'m a big fan of your work and I would love the opportunity to talk to you further, but before we do that, here\'s a little about me.</p>');
      $('.nav-home').hide();
    }

    var $toggleLink = $('.toggle-link');
    var $toggleContent = $('.toggle-content');

    $toggleLink.click(function(e){
      e.preventDefault();
      var description = $(this).attr('data-description');

      if($(this).hasClass('active')){
        $(this).removeClass('active');
        $('.toggle-content[data-description=' + description + ']').hide();
      }else {

        $(this).addClass('active');
        $('.toggle-content[data-description=' + description + ']').show();
      }
    })


  };



  aeApp.albumClick = function() {
    var $album = $('.albums a');
    var albumChild;
    var bgImages = $('.bgimage-container').html();
    var newContent = '<div class="bg-container">' + bgImages + '</div>';

    if ($('body').hasClass('collections') ){

      if (! $('body').find($('.bg-container')).length > 0) {
        $('#main-container').after(newContent);
        $('.og').remove();
      } else {
        var replacementContent = bgImages;
        $('.bg-container').html(replacementContent);
        $('.og').remove();
      }

    } else if ($('body').hasClass('photo-collection')) {

        $('.full-page-image').velocity({
          height: "70vh",
          marginTop: "15vh",
          marginLeft: "17.5vw",
          width: "65vw",
        },{
          duration: 300,
          delay: 500
        },  [ 250, 15 ]);
      if (! $('body').find($('.bg-container')).length > 0) {
        $('#main-container').after(newContent);
        $('.og').remove();
      }

    } else {
      $('.bg-container').remove();
    }



    $album.hover(function(){
      var albumChild = $(this).attr('data-child');

      $('body').find($('.bgimage')).velocity('stop').velocity({
        opacity: 0,
      },{
        duration: 800
      });

      $('body').find('.bg-container').find("[data-parent='" + albumChild + "']").velocity('stop').velocity({
        opacity: 1,
      },{
        duration: 800,
        display:'block'
      });

    }, function(){
      $('body').find($('.bgimage')).velocity('stop').velocity({
        opacity: 0,
      },{
        duration: 0
      });
    });
  };






  aeApp.mobile = function() {

    var blogOnboarding = function(){
      if($('body').hasClass('blog-page')){
        $('.blog-container').before('<div class="blog-onboarding" style="display: none; opacity: 0;"><p>Tap image to navigate</p></div>');
        $('.blog-onboarding').velocity({
          opacity: 1,
        },{
          duration: 400,
          display: 'block',
          delay: 800,
          complete: function(){
            $(this).velocity({
              opacity: 0,
            },{
              duration: 400,
              display: 'block',
              delay: 3200
            });
          }
        });
      }
    };

    var showOnboarding = function() {
      if($('body').hasClass('blog-page')){
        if (Cookies.get('onboarded') == 'true') {

        } else {
          blogOnboarding();
          Cookies.set('onboarded', 'true', { expires: 7 });
        }
      }
    };




    var $menuToggle = $('.menu-toggle');
    var $mainNav = $('.main-navigation');

    $menuToggle.click(function(e){
      e.preventDefault();

      if ($('body').hasClass('menu-active')){
        $(this).text('menu');
        $('body').removeClass('menu-active');
        hideOverlay($mainNav);
      } else {
        $(this).text('close');
        $('body').addClass('menu-active');
        showOverlay($mainNav);
      }
    });

    var hideOverlay = function(e){
      e.find($('a')).velocity({
        opacity: 0,
        top: 50
      },{
        duration: 200,
        complete: function(){
          e.velocity({
            opacity: 0,
          },{
            duration:200,
            display: 'none'
          });
        }
      });
    };

    var showOverlay = function(e){
      e.velocity({
        opacity: 1,
      },{
        duration: 200,
        display: 'block',
        complete: function(){
          e.find($('a')).velocity({
            opacity: 1,
            top:0
          },{
            duration:200
          });
        }
      });
    };

    var $video = $('video');
    var mobileVideo = function(){
      if($(this).attr('data-mobile-image')){
        var image = $(this).data('mobile-image');
        $(this).hide();
        $(this).after('<img class="mobile-video-replacement" src="' + image + '">');
      } else {
        $(this).parent().hide();
      }
    };

    // Anything mobile
    enquire.register("(max-width: 992px)", {
      match: function() {
        $video.each(mobileVideo);
        showOnboarding();
      },
      unmatch: function() {
        $video.show();
        $video.parent().show();
        $('.mobile-video-replacement').hide();
      }
    });

    enquire.register("(min-width: 786px)", {
      match: function() {
        $('.main-navigation').attr('style', '');
        $('.main-navigation a').attr('style', '');
      }
    });
  };

  aeApp.bgColor = function() {
      $.adaptiveBackground.run();
  };

  aeApp.blog = function(){

    var $moreInfo = $('.more-info');
    var $infoButton = $('.info');
    var $closeInfo = $('.close-info');
    var $navHome = $('.site-title');
    var $mainNav = $('.main-navigation');

    $infoButton.click(function(e){
      e.preventDefault();
      hideNav();
      showInfo();
    });

    $closeInfo.click(function(e){
      e.preventDefault();
      showNav();
      hideInfo();
    });

    showInfo = function(){
      $moreInfo.velocity({
        top: '0',
        opacity: 1,
      },{
        duration: 800,
        delay: 0,
        display: 'block'
      });
    };
    hideInfo = function(){
      $moreInfo.velocity({
        top: 24,
        opacity: 0,
      },{
        duration: 800,
        delay: 0,
        display: 'none'
      });
    };

    showNav = function(){
      $navHome.velocity({
        top: 0,
        opacity: 1,
      },{
        duration: 400,
        delay: 0
      });
      $mainNav.velocity({
        right: '0',
        opacity: 1,
      },{
        duration: 400,
        delay: 0
      });
    };

    hideNav = function(){
      $navHome.velocity({
        top: -300,
        opacity: 0,
      },{
        duration: 400
      });
      $mainNav.velocity({
        right: '-200',
        opacity: 0,
      },{
        duration: 400
      });
    };

    var bg = $('.scene_element').css('background-color');
    if($('body').hasClass('black-bg')){
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


   if($('body').hasClass('home-page')){
    var numberOfFeatures = $('.feature-container').length;
    //var randomFeature = Math.floor(Math.random() * numberOfFeatures) + 1;

    var animateIn = function(element, order){
      order *= 400;

      if(element.hasClass('home-feature')){
        element.velocity({
          opacity: 1
        }, {
          duration: 800,
          delay: order,
          complete: function(){
            element.find('span').velocity({
              opacity: 1
            }, {
              duration: 1800,
              delay: 200,
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
            delay: 200
          });
        }
    };

    if(! Cookies.get('lastFeature') || Cookies.get('lastFeature') == '1') {
      animateIn($('.feature-container-1'), 0);
      Cookies.set('lastFeature', '2', { expires: 7 });
    } else {
      animateIn($('.feature-container-2'), 0);
      Cookies.set('lastFeature', '1', { expires: 7 });
    }

    // animateIn($('.feature-container-' + randomFeature), 0);
    // animateIn($('.page-description'), 1);
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

aeApp.recentWork = function(){
  var windowHeight = $( window ).outerHeight();
  var $fullHeight = $('.full-height');
  var $centerMargin =  $('.center-margin');
  var featuredHeight = $centerMargin.height();
  var centeredMarginTop = (windowHeight - featuredHeight - 24) / 2;

  if(centeredMarginTop < 90){
    centeredMarginTop = 90;
  } else {
    centeredMarginTop = (windowHeight - featuredHeight - 24) / 2;
  }

  var peak = function(){
    $('.peak').velocity('stop').velocity({
        marginTop: centeredMarginTop
      }, {
        duration: 0,
        delay: 0,
        complete: function(){
          $(this).velocity({
            marginTop: centeredMarginTop - 36
          }, {
            duration: 400,
            delay: 800
          });
        }
    });
  };
  peak();
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
  if(centeredMarginTop < 90){
    centeredMarginTop = 90;
  } else {
    centeredMarginTop = (windowHeight - featuredHeight - 24) / 2;
  }

  $centerMargin.css('margin-top', centeredMarginTop);
  $('.center-margin-first').css('margin-top', centeredMarginTopFirst);

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
      var slow   = (100 - (scrollTop * .3))/100;
      var medium   = (100 - (scrollTop * 1))/100;
      var fast   = (100 - (scrollTop * 18))/100;

      $('.page-description').css({
        'opacity': medium,
        'top': scrollTop * .7
      });
      $('.home-feature span').css('opacity', slow);

      var featuredImageOpacity   = (fast) + 1;
      // if (featuredImageOpacity > 1){
      //   featuredImageOpacity = 1;
      // } else if (featuredImageOpacity < 0) {
      //   featuredImageOpacity = 0;
      // }
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
        } else if ($(targetElement).hasClass('nav-photography') || $(targetElement).hasClass('nextBlogEntry')){
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

        } else if ($(targetElement).hasClass('photo-album')) {

          $('.bgimage').velocity({
              opacity: 0,
            },{
              duration: 0,
              delay: 850,
              display: 'none',
              complete: function(){
                var bgImages = $('.bgimage-container').html();
                var replacementContent = bgImages;
                $('.bg-container').html(replacementContent);
                $('.og').remove();
              }
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

          if ($(targetElement).hasClass('nav-home')){
            $('.footer-bg').velocity({
              opacity: 0,
            },{
              duration: 800
            });
          }
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
  aeApp.mobile();
  aeApp.recentWork();
  aeApp.albumClick();
  aeApp.aboutStory();
};

(function($, window, document) {

  aeApp.onload();

}(window.jQuery, window, document));
