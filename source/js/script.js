/* ====================================
   Onload functions
   ==================================== */

var aeApp = aeApp || {};

  aeApp.bgColor = function() {
      $.adaptiveBackground.run();
  }

  aeApp.blog = function(){
    var bg = $('.scene_element').css('background-color');
    if($('body').hasClass('blog-page')){
      if(bg === 'rgb(0, 0, 0)'){
        $('body').addClass('black-bg');
        $('body').css('background', '#000');
      } else {
        $('body').removeClass('black-bg');
        $('body').css('background', '');
      }
    }
  }

  var numberOfClicks = 0;
  var numberOfImages;

  aeApp.intro = function() {
   $('.footer-content').velocity({
     opacity: 1
   }, {
     duration: 400,
     delay: 800,
     display: 'block',
   })

   if($('body').hasClass('blog-page')){
     numberOfImages = $('.image').length;
     numberOfClicks = 0;
     var $blogContainer = $('.blog-container');
     var nextPage = $blogContainer.data('next-page');
     var previousPage = $blogContainer.data('previous-page');
     var fadeIn = function(e, order){
       order *= 400;
       e.velocity({
         opacity: 1
       }, {
         duration: 400,
         delay: order,
         display: 'block'
       });
     }

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
          duration: 800,
          delay: 600,
          complete: function(){
            element.find('span').velocity({
              opacity: 1
            }, {
              duration: 1800,
              delay: 400,
              display: 'block'
            })
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
    }
    animateIn($('.feature-container-' + randomFeature), 0);
    animateIn($('.page-description'), 1);
    animateIn($('.home-feature-1'),2);
    animateIn($('.home-feature-2'),3);
    animateIn($('.home-feature-3'),4);
    animateIn($('.details'),5);
  }
}

aeApp.bodyClass = function() {
  var pageClassElement = $('.page');
  var pageClass = pageClassElement.data('page-class');
  $('body').attr('class', '');
  $('body').addClass(pageClass);
}

aeApp.resize = function() {
  var windowHeight = $( window ).outerHeight();
  var $fullHeight = $('.full-height');
  var $centerMargin =  $('.center-margin');
  var featuredHeight = $centerMargin.height();
  var centeredMarginTop = (windowHeight - featuredHeight) / 2;

  $fullHeight.velocity('stop').velocity({
    height: windowHeight
  });

  $centerMargin.css('margin-top', centeredMarginTop);

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
        })
      }
  });

  var lastScrollTop = 0;

  $(window).scroll(function () {
    var scrollTop                = $(window).scrollTop();
    var footerOffset             = $('.footer').offset().top;
    var footerDistance           = (footerOffset - scrollTop);
    var footerOpacity            = (footerDistance - 200) / -200;

    $('.footer-bg').css('opacity', footerOpacity);

    if (footerOpacity > 1){
      footerOpacity = 1
    } else if (footerOpacity < 0) {
      footerOpacity = 0
    }

    if ($('body').hasClass('home-page')) {
      if(scrollTop == 0){
        footerOpacity = 0;
      }
    }

    if ($('body').hasClass('home-page')) {
      var pageDescriptionOffset    = $('.page-description').offset().top;
      var pageDescriptionDistance  = (pageDescriptionOffset - scrollTop);
      var pageDescriptionOpacity   = (pageDescriptionDistance) / 100;

      $('.page-description').css('opacity', pageDescriptionOpacity);
      $('.home-feature span').css('opacity', featuredImageOpacity);

      var featuredImageOpacity   = (pageDescriptionOpacity) + 1;
      if (featuredImageOpacity > 1){
        featuredImageOpacity = 1
      } else if (featuredImageOpacity < 0) {
        featuredImageOpacity = 0
      }
    }

  });
}

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
}



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
}

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
        } else if ($(targetElement).hasClass('next') || $(targetElement).hasClass('featured-case-study') || $(targetElement).hasClass('blog-container')) {
          var projectColor = $(targetElement).attr("data-background");

          $('body').velocity({
              backgroundColor: projectColor
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
          aeApp.onload();
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
}

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
};

(function($, window, document) {

  aeApp.onload();

}(window.jQuery, window, document));
