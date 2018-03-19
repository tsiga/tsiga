$(document).ready(function() {
  tsiga.init();
});

var tsiga = {
  init: function() {
    tsiga.initFullPage();
    $("#menuOpen").on("click", function() {
      tsiga.openNav();
    });
    $(".overlay-content a").on("click", function() {
      tsiga.closeNav();
    });

    tsiga.toggleCards(false);
  },
  openNav: function() {
    document.getElementById("myNav").style.width = "100%";
  },
  closeNav: function() {
    document.getElementById("myNav").style.width = "0%";
  },
  initFullPage: function() {
    $("#fullpage").fullpage({
      //Navigation
      menu: "#menu",
      lockAnchors: false,
      anchors: ["page1", "page2", "page3", "page4"],
      navigation: true,
      navigationPosition: "right",
      navigationTooltips: ["Page 1", "Page 2", "Page 3", "Page 4"],
      showActiveTooltip: false,
      slidesNavigation: true,
      slidesNavPosition: "bottom",

      //Scrolling
      css3: true,
      scrollingSpeed: 500,
      autoScrolling: true,
      fitToSection: true,
      fitToSectionDelay: 1000,
      scrollBar: false,
      easing: "easeInOutCubic",
      easingcss3: "ease-out",
      loopBottom: false,
      loopTop: false,
      loopHorizontal: true,
      continuousVertical: false,
      continuousHorizontal: false,
      scrollHorizontally: true,
      interlockedSlides: false,
      dragAndMove: false,
      offsetSections: false,
      resetSliders: false,
      fadingEffect: true,
      normalScrollElements: null,
      scrollOverflow: false,
      scrollOverflowReset: false,
      scrollOverflowOptions: null,
      touchSensitivity: 15,
      normalScrollElementTouchThreshold: 5,
      bigSectionsDestination: null,

      //Accessibility
      keyboardScrolling: true,
      animateAnchor: true,
      recordHistory: true,

      //Design
      controlArrows: true,
      verticalCentered: true,
      // sectionsColor : [url("../img/medical1.jpeg"), '#fff'],
      paddingTop: "3em",
      paddingBottom: "10px",
      fixedElements: "#header, .footer",
      responsiveWidth: 0,
      responsiveHeight: 0,
      responsiveSlides: false,
      parallax: false,
      parallaxOptions: {
        type: "reveal",
        percentage: 62,
        property: "translate"
      },

      //Custom selectors
      sectionSelector: ".section",
      slideSelector: ".slide",

      lazyLoading: true,

      //events
      onLeave: function(index, nextIndex, direction) {
        $("#trans-hr" + index).removeClass("trans-grow");
        tsiga.toggleCards(false);
      },
      afterLoad: function(anchorLink, index) {
        console.log(".trans-hr" + index);
        $("#trans-hr" + index).addClass("trans-grow");

        if(index == 3){
          tsiga.toggleCards(true);
        }
      },
      afterRender: function() {},
      afterResize: function() {},
      afterResponsive: function(isResponsive) {},
      afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {},
      onSlideLeave: function(
        anchorLink,
        index,
        slideIndex,
        direction,
        nextSlideIndex
      ) {}
    });
  },
  toggleCards: function(show){
    if(show){
      $('#card1').removeClass('hidden');
      $('#card2').removeClass('hidden');
      $('#card3').removeClass('hidden');
      $('#card4').removeClass('hidden');
      $('#card1').addClass('animated bounceInLeft');
      $('#card2').addClass('animated bounceInDown');
      $('#card3').addClass('animated bounceInUp');
      $('#card4').addClass('animated bounceInRight');
    }else{
      $('#card1').addClass('hidden');
      $('#card2').addClass('hidden');
      $('#card3').addClass('hidden');
      $('#card4').addClass('hidden');
      $('#card1').removeClass('animated bounceInLeft');
      $('#card2').removeClass('animated bounceInDown');
      $('#card3').removeClass('animated bounceInUp');
      $('#card4').removeClass('animated bounceInRight');
    }
  }
};
