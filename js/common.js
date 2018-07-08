$(function(){
	
	$('head').append(
		'<style type="text/css">.main-col { display: none; }</style>'
	);
	
	
	jQuery.event.add(window,"load",function() { // Function called after completion of all reading
	
	
	pjaxComplete();
		
		/*--------PJAX [.pjax] --------*/
		$(function(){
			$.pjax({
				area : '#pjaxContent',// Multiple container IDs to be replaced, separated by commas
				link : '.pjax:not([target])',// Limit links that do pjax (if not applicable for all links)
				ajax: { timeout: 30000 }, // If it takes more to read, shift to normal transition
				wait : 1200 // Make an effect wait time
			});
			
			//Smart device identification processing
			if ((navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
				$(document).bind('pjax:fetch', function(){
					$('body').css('overflow-y', 'scroll');
					$('#pjaxContent').attr({'class': 'pjaxFadeOut'});
				});
				$(document).bind('pjax:render', function(){
					$('#pjaxContent').attr({'class': 'pjaxFadeIn'});
					$('body').css('overflow-y', 'scroll');
					pjaxComplete();
				});
			}
			
			else {
				
				$(document).bind('pjax:fetch', function(){
					$('body').css('overflow-y', 'scroll');
					$('#pjaxContent').attr({'class': 'pjaxBgColourOut'});
				});
				$(document).bind('pjax:render', function(){
					$('#pjaxContent').attr({'class': 'pjaxBgColourIn'});
					$('body').css('overflow-y', 'scroll');
					
					pjaxComplete();
				});
			}
			
			
		});
		
	});
	
});

function pjaxComplete(){
	
	/*--------Intro--------*/
	$(function() {
		
		if ((navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
			
			if($("pjaxFadeIn").size()){//.Only if there is a pjaxBgColourIn class
			}else{
				$("body").addClass("pjaxFadeIn");
				$('body').css('overflow-y', 'scroll');
			}
			
		}else{
			if($("pjaxBgColourIn").size()){//.Only if there is a pjaxBgColourIn class
			}else{
				$("body").addClass("pjaxBgColourIn");
				$('body').css('overflow-y', 'scroll');
			}
		}
	});
	
	int();

}

function int(){
	
	/*--------Animation setting control--------*/
	$(function(){
		
		/*separate animation setting*/
		/*$(".separate-w-m").wrap('<div class="anmation_container separate_anm-extend" />');*/
		separateAnimation="animation_box fade-in anm_speed-m "
		
		/*Definition of animation*/
		animation01 ="animation_box fade-in translate-bottom-in-s anm_speed-l "/*From the bottom(Small)*/
		animation02 ="animation_box fade-in translate-bottom-in-m anm_speed-l "/*From the bottom(Medium)*/
		animation04 ="animation_box fade-in translate-bottom-in-l anm_speed-l "/*From the bottom(Large)*/
		animation03 ="animation_box fade-in translate-left-in-l anm_speed-l "/*From the left (large)*/
		animation06 ="animation_box fade-in translate-right-in-l anm_speed-l "/*From the right (large)*/
		animation07 ="animation_box fade-in translate-top-in-l anm_speed-l "/*From above (Large)*/
		animation05 ="animation_box fade-in anm_speed-l "/*Fade in only*/
		
		/*Background color animation definition*/
		efc_bgColour="efc-bgColour ";
		efc_bgColourInline="efc-bgColour efc-inline ";
		effect_box="effect_box ";
		
		/****** [Common Module] Gallery list ********/
		$('.gallery-module-06').addClass("performance anmation_container");
		$('.gallery-module-06 .thum-box img').addClass(animation04 + "anm_delay-m");
		$('.gallery-module-06 .more-btn').addClass(animation03 + "anm_delay2-s");
		
		/****** [Common Module] Title ********/
		$('.title').addClass("anmation_container");
		$('.title h2').addClass(animation04 + "anm_delay-s");
		
		
		$(function(){
			/*Animation display control*/
			$('.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
				if (isInView) {//When an element is visible		
					if (visiblePartY == 'both'){//When both the top and bottom of the element are in the display area
						$(this).addClass("active");
					}
				}
			});
			$('.performance.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
				if (isInView) {//When an element is visible		
					if (visiblePartY == 'both'){//When both the top and bottom of the element are in the display area
						$(this).addClass("active");
					}else if (visiblePartY == 'top'){//When the top of the element is in the display area
						$(this).addClass("active");
					}else if (visiblePartY == 'bottom'){//When the bottom of the element is in the display area
						$(this).addClass("active");
					}
				}
			});
		});

	});


	/*--------Processing by page--------*/
	var pageId = ($('body > div').attr('id'));//Obtain ID of body
	
	//Top page processing
	if( pageId == 'TOP'){ loadTop(); loadCommon();}
	//Works page processing
	else if( pageId == 'WORKS'){ loadCommon(); loadWorks(); }			
	//About page processing
	else if( pageId == 'ABOUT'){ loadCommon(); loadAbout(); }					
	//Other page processing
	else{ loadCommon();}
}

/******* Process common to pages *********/
function loadCommon() {
	
	/*--------Navigation icon（Hamburger menu） [.n_hamburger] --------*/
	$(function(){	
		$('.nav_icon a').on('click touchend', function() {
			$('.globalNavigation-module-01').toggleClass("active");
			$('.n_hamburger02').toggleClass('active');
			$('.n_hamburger02').removeClass("hover");
			return false;
		});
		
		$('.nav_icon a').on({'mouseenter touchstart': function() {// Processing at mouseover	
			if($('.n_hamburger02').hasClass("active")){}else{ $('.n_hamburger02').addClass("hover"); }
			return false;
		  },
		  'mouseleave touchend': function() {// Processing at mouse-out
			$('.n_hamburger02').removeClass("hover");
			return false;
		  }
		});
	});
	
	/*--------Hover animation [.border_anm01] --------*/
	$(function(){	
		$('.border_anm01 a').on({'mouseenter touchstart': function() {// Processing at mouseover	
			$('.border_anm01').addClass("hover");
			return false;
		  },
		  'mouseleave touchend': function() {// Processing at mouse-out
			$('.border_anm01').removeClass("hover");
			return false;
		  }
		});
	});
	
	/*--------Scroll easing--------*/ 
	// Mac(iPhone ipad Exclusion)
	var ua = navigator.userAgent.toLowerCase();
	var isMac = ((ua.indexOf('mac') > -1) && (ua.indexOf('os') > -1)) && !((ua.indexOf('iphone') > -1) || (ua.indexOf('ipad') > -1) || (ua.indexOf('windows') > -1));
	 
	if(isMac) {
	}else{
		
		$(function(){
			scrLength = 400;
			scrSpeed = 600;
			scrEasing = 'easeOutCirc';
		 
			var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
			$(document).on(mousewheelevent,function(e){
				e.preventDefault();
				var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
				if (delta < 0){
					scrSet =  $(document).scrollTop()+scrLength;
				} else {
					scrSet =  $(document).scrollTop()-scrLength;
				}
				$('html,body').stop().animate({scrollTop:scrSet},scrSpeed,scrEasing);
				return false;
			});
		});
	}
	
	/*--------Smooth scroll [smoothScroll] --------*/
	$(function() {
		smoothScroll.init({
			selector: '[data-scroll]',				// Smooth Attributes attached to scroll-enabled links
			selectorHeader: '[data-scroll-header]',		// Attributes attached to fixed navigation
			speed: 600,						// Total time to reach (ms)
			easing: 'easeInOutCubic',			// Types of speed
			offset: -10,							// Number of pixels that are out of reach
			updateURL: true,					// Would you like to change the URL to [# ~]?
			callback: function () {}				// Callback function (function executed upon arrival)
		}) ;
	
	});
	
	/*--------Hover animation--------*/
	$(function(){
		
		$('.link-animeline').on({'mouseenter touchstart': function() {// Processing at mouseover	
			$(this).addClass("hover");
		  },
		  'mouseleave touchend': function() {// Processing at mouse-out
			$(this).removeClass("hover");
			
		  }
		});
		$('.gallery-module-06').on({'mouseenter touchstart': function() {// Processing at mouseover	
			$(this).addClass("hover");
		  },
		  'mouseleave touchend': function() {// Processing at mouse-out
			$(this).removeClass("hover");
			
		  }
		});
		$('.gallery-module-07 .flexslider .slides li a').on({'mouseenter touchstart': function() {// Processing at mouseover	
			$(this).addClass("hover");
		  },
		  'mouseleave touchend': function() {// Processing at mouse-out
			$(this).removeClass("hover");
			
		  }
		});
		

	});

	
	/*--------Do not right-click and drag images only--------*/
	$(function(){	
		$('img').attr('onmousedown', 'return false');
		$('img').attr('onselectstart', 'return false');
		$('img').attr('oncontextmenu', 'return false');
	});
}

/******* TOP page processing *********/
function loadTop() {
	
	/*--------Animation setting control--------*/
	$(function(){
		/****** [Individual page] top page ******/
		/*First view*/
		$('#TOP .firstview-module-05').addClass("performance anmation_container");
		$('#TOP .firstview-module-05 h2').addClass(efc_bgColourInline + "e_bg-white");
		$('#TOP .firstview-module-05 h2 img').addClass(effect_box);
		 /*project*/
		$('#TOP .gallery-module-07').addClass("performance anmation_container");
		$('#TOP .gallery-module-07 .flexslider').addClass(animation04 + "anm_delay-m");
		/*Footer sub area */
		$("#TOP .footer-suvArea .separate-w-m").wrap('<div class="anmation_container separate_anm-extend" />');
		$("#TOP .footer-suvArea .separate-w-m").addClass(separateAnimation);
	
	});
	/*Animation display control*/
	$(function(){
		$('.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//When an element is visible		
				if (visiblePartY == 'both'){//When both the top and bottom of the element are in the display area
					$(this).addClass("active");
				}
			}
		});
		$('.performance.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//When an element is visible		
				if (visiblePartY == 'both'){//When both the top and bottom of the element are in the display area
					$(this).addClass("active");
				}else if (visiblePartY == 'top'){//When the top of the element is in the display area
					$(this).addClass("active");
				}else if (visiblePartY == 'bottom'){//When the bottom of the element is in the display area
					$(this).addClass("active");
				}
			}
		});
	});
	
	/*top page*/
	$('#TOP .firstview-module-05 h2.efc-bgColour').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
	if (isInView) {//When an element is visible
		effect_wrp='#TOP .firstview-module-05 h2 .effect_wrp';
		effect_box='#TOP .firstview-module-05 h2 .effect_box';		
			if(!($(".TOP01_active").size())){//.Only when there is no view_active class
				if (visiblePartY == 'both'){//When both the top and bottom of the element are in the display area
					if(!($(effect_wrp).size())){//.Only when there is no effect_wrp class
						efcStart();
						$(this).addClass('active');
						$(this).addClass('TOP01_active');
					}			
				}else if(visiblePartY == 'top'){
					efcStart();
						$(this).addClass('active');
						$(this).addClass('TOP01_active');
				}			
			}					
		}
		
		function efcStart(){
		/*Add tags above specified tag*/
		$(effect_box).wrap('<div class="effect_wrp" />');
		$(effect_wrp).wrap('<div class="effect_container" />');
		}
		function efcEnd(){
			/*Delete tags above the specified tag*/
			$(effect_wrp).unwrap();
			$(effect_box).unwrap();
		}
	});
	
	/*=============  [Flex Slider]  ============*/
	$(function(){
		simple_slider();
	});
	
	function simple_slider() {
		$('.gallery-module-07 .flexslider').flexslider({
		animation: "slide", //fade or slide
		easing:"easeOutExpo",//The default is "swing"
		animationLoop: true, //Slide loop,
		slideshow:false,//“true”Auto Slide Show in
		slideshowSpeed:4000, //Speed of sliding interval
		animationSpeed:600, //Speed of motion during animation
		initDelay:0,//Delay until slide show begins. The default is 0, which can be specified in milliseconds.
		//itemWidth: 300, //Width of one image when setting a carousel
		//itemMargin: 30, //Carousel picture one margin
		//minItems: 1, //How many images of the carousel should be displayed at a minimum on a single screen
		//maxItems: 1, //How many images of carousel are displayed on one screen at maximum
		//smoothHeight:true, //When the height of the slider changes, change the height while animating
		//randomize:true, //Randomize slide order
		//pasneOnHover:true, //Stop the slideshow with mouse over
		//video:false, Whether to allow movies to be included in slides. The default is false.

		controlNav:true,//Prev and next control buttons on both sides. The default is true, false disables it....
		directionNav:true,//Prev and next control buttons on both sides. The default is true, false disables it.
		move:1,//How many slide images of the carousel image will be moved. If it is 0, move it all. The default is 0.
		prevText:"",//String of "back" navigation. The default is "Previous".
		nextText:"",//A character string of "forward" navigation. The default is "Next".
		touch:false
		
	  });
	}

}
/******* WORKS page processing *********/
function loadWorks() {
	
	/*--------Animation setting control--------*/
	$(function(){
		/****** [Individual page]  Works details ******/
		/*First view*/
		$('#WORKS.detail .firstview-module-06').addClass("performance anmation_container");
		$('#WORKS.detail .firstview-module-06 .thum-title').addClass(efc_bgColour + "e_bg-white");
		$('#WORKS.detail .firstview-module-06 .thum-title .bg-white').addClass(effect_box);
		/*At the beginning*/
		$('#WORKS.detail .about-module-08 > div').addClass("performance anmation_container");
		$('#WORKS.detail .about-module-08 > div.detail-boutou .heading4').addClass(animation04);
		$('#WORKS.detail .about-module-08 > div.detail-credit > div').addClass(animation02 + "anm_delay-s");

		/*story*/
		$('#WORKS.detail .story > div').addClass("performance anmation_container");
		$('#WORKS.detail .story > div img').addClass(animation04 + "anm_delay-m");
		$('#WORKS.detail .story > div .heading2').addClass(animation04 + "anm_delay-l");
		$('#WORKS.detail .story > div .p1').addClass(animation04 + "anm_delay-xl");
		$('#WORKS.detail .story > div .story-wrp .flexbox.position-inner-center').addClass(animation05 + "anm_delay-l");
		/*gallery*/
		$('#WORKS.detail .swipe_container').addClass("performance anmation_container");
		$('#WORKS.detail .swipe_container .thum-box').addClass(animation04 + "anm_delay-m");
		/*Footer sub area */
		$("#WORKS .footer-suvArea .separate-w-m").wrap('<div class="anmation_container separate_anm-extend" />');
		$("#WORKS .footer-suvArea .separate-w-m").addClass(separateAnimation);

	});
	/*Animation display control*/
	$(function(){
		$('.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//When an element is visible		
				if (visiblePartY == 'both'){//When both the top and bottom of the element are in the display area
					$(this).addClass("active");
				}
			}
		});
		$('.performance.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//When an element is visible		
				if (visiblePartY == 'both'){//When both the top and bottom of the element are in the display area
					$(this).addClass("active");
				}else if (visiblePartY == 'top'){//When the top of the element is in the display area
					$(this).addClass("active");
				}else if (visiblePartY == 'bottom'){//When the bottom of the element is in the display area
					$(this).addClass("active");
				}
			}
		});
	});
	/*Works display control*/
	$('#WORKS.detail .firstview-module-06 .thum-title.efc-bgColour').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
	if (isInView) {//When an element is visible
		effect_wrp='#WORKS .thum-title .effect_wrp';
		effect_box='#WORKS .thum-title .effect_box';		
			if(!($(".WORKS01_active").size())){//.Only when there is no view_active class
				if (visiblePartY == 'both'){//When both the top and bottom of the element are in the display area
					if(!($(effect_wrp).size())){//.Only when there is no effect_wrp class

						efcStart();
						$(this).addClass('active');
						$(this).addClass('WORKS01_active');
					}			
				}else if(visiblePartY == 'top'){
					efcStart();
						$(this).addClass('active');
						$(this).addClass('WORKS01_active');
				}			
			}					
		}
		
		function efcStart(){
		/*Add tags above specified tag*/
		$(effect_box).wrap('<div class="effect_wrp" />');
		$(effect_wrp).wrap('<div class="effect_container" />');
		}
		function efcEnd(){
			/*Delete tags above the specified tag*/
			$(effect_wrp).unwrap();
			$(effect_box).unwrap();
		}
	});
	
	

}
/******* ABOUT page processing *********/
function loadAbout() {
	
	/*--------Animation setting control--------*/
	$(function(){
		/****** [Individual page]  About ******/
		/*First view*/
		if ((navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
			$('#ABOUT .about-module-09 .heading1.none-pc').addClass(efc_bgColourInline + "e_bg-white");
			$('#ABOUT .about-module-09 .heading1.none-pc span').addClass(effect_box);

			
		}else{
			$('#ABOUT .about-module-09 .heading1.visible-pc').addClass(efc_bgColourInline + "e_bg-white");
			$('#ABOUT .about-module-09 .heading1.visible-pc span').addClass(effect_box);

		}
		
		$('#ABOUT .about-module-09').addClass("performance anmation_container");
		$('#ABOUT .about-module-09 h2').addClass(efc_bgColourInline + "e_bg-white");
		$('#ABOUT .about-module-09 h2 img').addClass(effect_box);
		$("#ABOUT .about-module-09 .separate-w-m").wrap('<div class="anmation_container separate_anm-extend" />');
		$("#ABOUT .about-module-09 .separate-w-m").addClass(separateAnimation + "anm_delay-xl");
		/*About outline*/
		$('#ABOUT .about-module-10').addClass("performance anmation_container");
		$('#ABOUT .about-module-10 img').addClass(animation04 + "anm_delay-m");

		$('#ABOUT .about-module-10 h2').addClass(animation04 + "anm_delay-m");
		$('#ABOUT .about-module-10 h3').addClass(animation04 + "anm_delay-l");
		$('#ABOUT .about-module-10 p').addClass(animation04 + "anm_delay-xl");
		$("#ABOUT .about-module-10 .separate-w-s").wrap('<div class="anmation_container separate_anm-extend" />');
		$("#ABOUT .about-module-10 .separate-w-s").addClass(separateAnimation + "anm_delay-l");
		/*contact*/
		$('#ABOUT .footer-suvArea').addClass("anmation_container");
		$('#ABOUT .footer-suvArea .p2-EN').addClass(animation02 + "anm_delay-l");
		$('#ABOUT .footer-suvArea .small1').addClass(animation01 + "anm_delay-xl");
		$("#ABOUT .footer-suvArea .separate-w-m").wrap('<div class="anmation_container separate_anm-extend" />');
		$("#ABOUT .footer-suvArea .separate-w-m").addClass(separateAnimation);
	
	});
	/*Animation display control*/
	$(function(){
		$('.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//When an element is visible		
				if (visiblePartY == 'both'){//When both the top and bottom of the element are in the display area
					$(this).addClass("active");
				}
			}
		});
		$('.performance.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//When an element is visible		
				if (visiblePartY == 'both'){//When both the top and bottom of the element are in the display area
					$(this).addClass("active");
				}else if (visiblePartY == 'top'){//When the top of the element is in the display area
					$(this).addClass("active");
				}else if (visiblePartY == 'bottom'){//When the bottom of the element is in the display area
					$(this).addClass("active");
				}
			}
		});
	});
	/*About display control*/
	$('#ABOUT .heading1.efc-bgColour').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
	if (isInView) {//When an element is visible
		effect_wrp='#ABOUT .heading1 .effect_wrp';
		effect_box='#ABOUT .heading1 .effect_box';		
			if(!($(".ABOUT01_active").size())){//.Only when there is no view_active class
				if (visiblePartY == 'both'){//When both the top and bottom of the element are in the display area
					if(!($(effect_wrp).size())){//.Only when there is no effect_wrp class
						efcStart();
						$(this).addClass('active');
						$(this).addClass('ABOUT01_active');
					}			
				}else if(visiblePartY == 'top'){
					efcStart();
						$(this).addClass('active');
						$(this).addClass('ABOUT01_active');
				}			
			}					
		}
		
		function efcStart(){
		/*Add tags above specified tag*/
		$(effect_box).wrap('<div class="effect_wrp" />');
		$(effect_wrp).wrap('<div class="effect_container" />');
		}
		function efcEnd(){
			/*Delete tags above the specified tag*/
			$(effect_wrp).unwrap();
			$(effect_box).unwrap();
		}
	});
	$('#ABOUT h2.efc-bgColour').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
	if (isInView) {//When an element is visible
		effect_wrp='#ABOUT h2 .effect_wrp';
		effect_box='#ABOUT h2 .effect_box';		
			if(!($(".ABOUT02_active").size())){//.Only when there is no view_active class
				if (visiblePartY == 'both'){//When both the top and bottom of the element are in the display area
					if(!($(effect_wrp).size())){//.Only when there is no effect_wrp class
						efcStart();
						$(this).addClass('active');
						$(this).addClass('ABOUT02_active');
					}			
				}else if(visiblePartY == 'top'){
					efcStart();
						$(this).addClass('active');
						$(this).addClass('ABOUT02_active');
				}			
			}					
		}
		
		function efcStart(){
		/*Add tags above specified tag*/
		$(effect_box).wrap('<div class="effect_wrp" />');
		$(effect_wrp).wrap('<div class="effect_container" />');
		}
		function efcEnd(){
			/*Delete tags above the specified tag*/
			$(effect_wrp).unwrap();
			$(effect_box).unwrap();
		}
	});
	

}

