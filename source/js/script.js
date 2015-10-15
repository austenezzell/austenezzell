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


     $('.image-1').velocity({
       opacity: 1
     }, {
       duration: 400,
       delay: 400,
       display: 'block',
     });

     var next = function(){
       if(numberOfClicks == 2){
         window.location = nextPage;
         numberOfClicks = 0;
         console.log(numberOfClicks);
       } else if(numberOfClicks == 1){
         if(numberOfImages == 2) {
           window.location = nextPage;
           numberOfClicks = 0;
           console.log(numberOfClicks);
         } else if(numberOfImages == 3){
           $('.image-3').velocity({
             opacity: 1
           }, {
             duration: 400,
             delay: 400,
             display: 'block',
           });
         }
         numberOfClicks = 2;
         console.log(numberOfClicks);
       } else if(numberOfClicks == 0){
         if(numberOfImages == 1){
           window.location = nextPage;
           numberOfClicks = 0;
           console.log(numberOfClicks);
         } else if(numberOfImages == 2 || numberOfImages == 3){
           $('.image-2').velocity({
             opacity: 1
           }, {
             duration: 400,
             delay: 400,
             display: 'block',
           });
         }
         numberOfClicks = 1;
         console.log(numberOfClicks);
       }
     };

     var previous = function(){
       if(numberOfClicks == 0){
         window.location = previousPage;

       } else if (numberOfClicks == 1){
         if(numberOfImages == 2){
           $('.image-2').velocity({
             opacity: 0
           }, {
             duration: 400,
             delay: 400,
             display: 'block',
           });
         }
         numberOfClicks == 0;
         console.log(numberOfClicks);
       } else if(numberOfClicks == 1){
         if(numberOfImages == 2) {
           $('.image-2').velocity({
             opacity: 0
           }, {
             duration: 400,
             delay: 400,
             display: 'block',
           });
           numberOfClicks = 0;

         }
       } else if(numberOfClicks == 2){
         if(numberOfImages == 3){
           $('.image-3').velocity({
             opacity: 0
           }, {
             duration: 400,
             delay: 400,
             display: 'block',
           });
         }
        numberOfClicks == 1;
        console.log(numberOfClicks);
       }
     };

     $(document).keydown(function(e){
         if (e.keyCode == 39) {
          next();
        } else if(e.keyCode == 37){
          previous();
        }
     });

     $blogContainer.click(function(){
       next();
     });

   }

   if($('body').hasClass('home-page')){
    var numberOfFeatures = $('.feature-container').length;
    var randomFeature = Math.floor(Math.random() * numberOfFeatures) + 1;

    $('.feature-container-' + randomFeature).velocity({
      opacity: 1
    },{
      display: 'block'
    });


    $('.page-description').velocity({
      opacity: 1
    }, {
      duration: 400,
      delay: 800,
      display: 'block',
    });

    $('.home-feature-1').velocity({
      opacity: 1
    }, {
      duration: 400,
      delay: 2000,
      complete: function(){
        $('.home-feature-1 span').velocity({
          opacity: 1
        }, {
          duration: 1800,
          delay: 400,
          display: 'block'
        })
      }
    });

    $('.home-feature-2').velocity({
      opacity: 1
    }, {
      duration: 400,
      delay: 2200,
      complete: function(){
        $('.home-feature-2 span').velocity({
          opacity: 1
        }, {
          duration: 1800,
          delay: 400,
          display: 'block'
        })
      }
    });

    $('.home-feature-3').velocity({
      opacity: 1
    }, {
      duration: 400,
      delay: 2600,
      complete: function(){
        $('.home-feature-3 span').velocity({
          opacity: 1
        }, {
          duration: 2000,
          delay: 400,
          display: 'block'
        })
      }
    });

    $('.details').velocity({
      opacity: 1
    }, {
      duration: 400,
      delay: 2400,
    });
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
    //projectColorHex = rgb2hex(projectColor);
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
        } else if ($(targetElement).hasClass('next') || $(targetElement).hasClass('featured-case-study')) {
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
          // $('body').attr('style', '');


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

          //$('body').attr('style', '');

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
