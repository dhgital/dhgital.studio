$(function(){
	
	$('head').append(
		'<style type="text/css">.main-col { display: none; }</style>'
	);
	
	
	jQuery.event.add(window,"load",function() { // 全ての読み込み完了後に呼ばれる関数
	
	
	pjaxComplete();
		
		/*--------ピージャックス【.pjax】--------*/
		$(function(){
			$.pjax({
				area : '#pjaxContent',// 置き換えるコンテナのID カンマで区切って複数可能
				link : '.pjax:not([target])',// pjaxを行うリンクを限定（ない場合全てのリンクが対象）
				ajax: { timeout: 30000 }, // 読み込みにこれ以上かかる場合は通常遷移に移行
				wait : 1200 // エフェクト分待ち時間を作る
			});
			
			//スマートデバイス判別処理
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
	
	/*--------イントロ--------*/
	$(function() {
		
		if ((navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
			
			if($("pjaxFadeIn").size()){//.pjaxBgColourInクラスがある場合のみ
			}else{
				$("body").addClass("pjaxFadeIn");
				$('body').css('overflow-y', 'scroll');
			}
			
		}else{
			if($("pjaxBgColourIn").size()){//.pjaxBgColourInクラスがある場合のみ
			}else{
				$("body").addClass("pjaxBgColourIn");
				$('body').css('overflow-y', 'scroll');
			}
		}
	});
	
	int();

}

function int(){
	
	/*--------アニメーション設定制御--------*/
	$(function(){
		
		/*separateアニメーション設定*/
		/*$(".separate-w-m").wrap('<div class="anmation_container separate_anm-extend" />');*/
		separateAnimation="animation_box fade-in anm_speed-m "
		
		/*アニメーションの定義*/
		animation01 ="animation_box fade-in translate-bottom-in-s anm_speed-l "/*下から(小)*/
		animation02 ="animation_box fade-in translate-bottom-in-m anm_speed-l "/*下から(中)*/
		animation04 ="animation_box fade-in translate-bottom-in-l anm_speed-l "/*下から(大)*/
		animation03 ="animation_box fade-in translate-left-in-l anm_speed-l "/*左から(大)*/
		animation06 ="animation_box fade-in translate-right-in-l anm_speed-l "/*右から(大)*/
		animation07 ="animation_box fade-in translate-top-in-l anm_speed-l "/*上から(大)*/
		animation05 ="animation_box fade-in anm_speed-l "/*フェードインのみ*/
		
		/*背景カラーアニメーション定義*/
		efc_bgColour="efc-bgColour ";
		efc_bgColourInline="efc-bgColour efc-inline ";
		effect_box="effect_box ";
		
		/******【共通モジュール】ギャラリー一覧 ********/
		$('.gallery-module-06').addClass("performance anmation_container");
		$('.gallery-module-06 .thum-box img').addClass(animation04 + "anm_delay-m");
		$('.gallery-module-06 .more-btn').addClass(animation03 + "anm_delay2-s");
		
		/******【共通モジュール】タイトル ********/
		$('.title').addClass("anmation_container");
		$('.title h2').addClass(animation04 + "anm_delay-s");
		
		
		$(function(){
			/*アニメーション表示制御*/
			$('.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
				if (isInView) {//要素が見えたとき		
					if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
						$(this).addClass("active");
					}
				}
			});
			$('.performance.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
				if (isInView) {//要素が見えたとき		
					if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
						$(this).addClass("active");
					}else if (visiblePartY == 'top'){//要素の上が表示域に入ってるとき
						$(this).addClass("active");
					}else if (visiblePartY == 'bottom'){//要素の下が表示域に入ってるとき
						$(this).addClass("active");
					}
				}
			});
		});

	});


	/*--------ページごとの処理--------*/
	var pageId = ($('body > div').attr('id'));//bodyのIDを取得
	
	//トップページの処理
	if( pageId == 'TOP'){ loadTop(); loadCommon();}
	//ワークスページの処理
	else if( pageId == 'WORKS'){ loadCommon(); loadWorks(); }			
	//アバウトページの処理
	else if( pageId == 'ABOUT'){ loadCommon(); loadAbout(); }					
	//その他ページの処理
	else{ loadCommon();}
}

/******* ページ共通の処理 *********/
function loadCommon() {
	
	/*--------ナビアイコン（ハンバーガーメニュー）【.n_hamburger】--------*/
	$(function(){	
		$('.nav_icon a').on('click touchend', function() {
			$('.globalNavigation-module-01').toggleClass("active");
			$('.n_hamburger02').toggleClass('active');
			$('.n_hamburger02').removeClass("hover");
			return false;
		});
		
		$('.nav_icon a').on({'mouseenter touchstart': function() {// マウスオーバー時の処理	
			if($('.n_hamburger02').hasClass("active")){}else{ $('.n_hamburger02').addClass("hover"); }
			return false;
		  },
		  'mouseleave touchend': function() {// マウスアウト時の処理
			$('.n_hamburger02').removeClass("hover");
			return false;
		  }
		});
	});
	
	/*--------ホバーアニメ【.border_anm01】--------*/
	$(function(){	
		$('.border_anm01 a').on({'mouseenter touchstart': function() {// マウスオーバー時の処理	
			$('.border_anm01').addClass("hover");
			return false;
		  },
		  'mouseleave touchend': function() {// マウスアウト時の処理
			$('.border_anm01').removeClass("hover");
			return false;
		  }
		});
	});
	
	/*--------スクロールイージング--------*/ 
	// Mac(iPhone ipad 除外)
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
	
	/*--------スムーススクロール【smoothScroll】--------*/
	$(function() {
		smoothScroll.init({
			selector: '[data-scroll]',				// スムーススクロールが有効なリンクに付ける属性
			selectorHeader: '[data-scroll-header]',		// 固定ナビに付ける属性
			speed: 600,						// 到達するまでの総時間(ミリ秒)
			easing: 'easeInOutCubic',			// スピードの種類
			offset: -10,							// 到達場所からズラすピクセル数
			updateURL: true,					// URLを[#〜]に変更するか？
			callback: function () {}				// コールバック関数 (到達時に実行される関数)
		}) ;
	
	});
	
	/*--------ホバーアニメ--------*/
	$(function(){
		
		$('.link-animeline').on({'mouseenter touchstart': function() {// マウスオーバー時の処理	
			$(this).addClass("hover");
		  },
		  'mouseleave touchend': function() {// マウスアウト時の処理
			$(this).removeClass("hover");
			
		  }
		});
		$('.gallery-module-06').on({'mouseenter touchstart': function() {// マウスオーバー時の処理	
			$(this).addClass("hover");
		  },
		  'mouseleave touchend': function() {// マウスアウト時の処理
			$(this).removeClass("hover");
			
		  }
		});
		$('.gallery-module-07 .flexslider .slides li a').on({'mouseenter touchstart': function() {// マウスオーバー時の処理	
			$(this).addClass("hover");
		  },
		  'mouseleave touchend': function() {// マウスアウト時の処理
			$(this).removeClass("hover");
			
		  }
		});
		

	});

	
	/*--------画像のみ右クリックとドラッグを禁止--------*/
	$(function(){	
		$('img').attr('onmousedown', 'return false');
		$('img').attr('onselectstart', 'return false');
		$('img').attr('oncontextmenu', 'return false');
	});
}

/******* TOPページの処理 *********/
function loadTop() {
	
	/*--------アニメーション設定制御--------*/
	$(function(){
		/******【個別ページ】トップページ ******/
		/*ファーストビュー*/
		$('#TOP .firstview-module-05').addClass("performance anmation_container");
		$('#TOP .firstview-module-05 h2').addClass(efc_bgColourInline + "e_bg-white");
		$('#TOP .firstview-module-05 h2 img').addClass(effect_box);
		 /*プロジェクト*/
		$('#TOP .gallery-module-07').addClass("performance anmation_container");
		$('#TOP .gallery-module-07 .flexslider').addClass(animation04 + "anm_delay-m");
		/*フッターサブエリア */
		$("#TOP .footer-suvArea .separate-w-m").wrap('<div class="anmation_container separate_anm-extend" />');
		$("#TOP .footer-suvArea .separate-w-m").addClass(separateAnimation);
	
	});
	/*アニメーション表示制御*/
	$(function(){
		$('.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//要素が見えたとき		
				if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
					$(this).addClass("active");
				}
			}
		});
		$('.performance.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//要素が見えたとき		
				if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
					$(this).addClass("active");
				}else if (visiblePartY == 'top'){//要素の上が表示域に入ってるとき
					$(this).addClass("active");
				}else if (visiblePartY == 'bottom'){//要素の下が表示域に入ってるとき
					$(this).addClass("active");
				}
			}
		});
	});
	
	/*トップページ*/
	$('#TOP .firstview-module-05 h2.efc-bgColour').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
	if (isInView) {//要素が見えたとき
		effect_wrp='#TOP .firstview-module-05 h2 .effect_wrp';
		effect_box='#TOP .firstview-module-05 h2 .effect_box';		
			if(!($(".TOP01_active").size())){//.view_activeクラスがない場合のみ
				if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
					if(!($(effect_wrp).size())){//.effect_wrpクラスがない場合のみ
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
		/*指定タグの上位にタグを追加*/
		$(effect_box).wrap('<div class="effect_wrp" />');
		$(effect_wrp).wrap('<div class="effect_container" />');
		}
		function efcEnd(){
			/*指定タグの上位のタグを削除*/
			$(effect_wrp).unwrap();
			$(effect_box).unwrap();
		}
	});
	
	/*============= 【スライダーflexslider】 ============*/
	$(function(){
		simple_slider();
	});
	
	function simple_slider() {
		$('.gallery-module-07 .flexslider').flexslider({
		animation: "slide", //fade or slide
		easing:"easeOutExpo",//デフォルトは"swing"
		animationLoop: true, //スライドをループ,
		slideshow:false,//“true”で自動スライドショーになる
		slideshowSpeed:4000, //スライドする間隔のスピード
		animationSpeed:600, //アニメーション時の動作のスピード
		initDelay:0,//スライドショーが始まるまでの遅延。デフォルトは0で、ミリ秒単位で指定できます。
		//itemWidth: 300, //カルーセルを設定した際の画像１枚の幅
		//itemMargin: 30, //カルーセルの画像１枚のマージン
		//minItems: 1, //カルーセルの画像を最低で何枚を一画面に表示するか
		//maxItems: 1, //カルーセルの画像を最大で何枚を一画面に表示するか
		//smoothHeight:true, //スライダーの高さが変わるとき、高さをアニメーションしながら変える
		//randomize:true, //スライドの順番をランダムにする
		//pasneOnHover:true, //マウスオーバーでスライドショーを止める
		//video:false,動画をスライドに含むことを許可するかどうか。デフォルトはfalseです。
		controlNav:true,//ナヴィゲーションを表示。デフォルトはtrueで、falseにすると非表示になります。
		directionNav:true,//両サイドにあるprevとnextのコントロールボタン。デフォルトはtrueで、falseにすると非表示になります。
		move:1,//カルーセルの画像をスライドで何枚動かすか。0だと全部動かす。デフォルトは0です。
		prevText:"",//「戻る」のナビゲーションの文字列。デフォルトは"Previous"です。
		nextText:"",//「進む」のナビゲーションの文字列。デフォルトは"Next"です。
		touch:false
		
	  });
	}

}
/******* WORKSページの処理 *********/
function loadWorks() {
	
	/*--------アニメーション設定制御--------*/
	$(function(){
		/******【個別ページ】ワークス詳細 ******/
		/*ファーストビュー*/
		$('#WORKS.detail .firstview-module-06').addClass("performance anmation_container");
		$('#WORKS.detail .firstview-module-06 .thum-title').addClass(efc_bgColour + "e_bg-white");
		$('#WORKS.detail .firstview-module-06 .thum-title .bg-white').addClass(effect_box);
		/*冒頭説明*/
		$('#WORKS.detail .about-module-08 > div').addClass("performance anmation_container");
		$('#WORKS.detail .about-module-08 > div.detail-boutou .heading4').addClass(animation04);
		$('#WORKS.detail .about-module-08 > div.detail-credit > div').addClass(animation02 + "anm_delay-s");

		/*ストーリー*/
		$('#WORKS.detail .story > div').addClass("performance anmation_container");
		$('#WORKS.detail .story > div img').addClass(animation04 + "anm_delay-m");
		$('#WORKS.detail .story > div .heading2').addClass(animation04 + "anm_delay-l");
		$('#WORKS.detail .story > div .p1').addClass(animation04 + "anm_delay-xl");
		$('#WORKS.detail .story > div .story-wrp .flexbox.position-inner-center').addClass(animation05 + "anm_delay-l");
		/*ギャラリー*/
		$('#WORKS.detail .swipe_container').addClass("performance anmation_container");
		$('#WORKS.detail .swipe_container .thum-box').addClass(animation04 + "anm_delay-m");
		/*フッターサブエリア */
		$("#WORKS .footer-suvArea .separate-w-m").wrap('<div class="anmation_container separate_anm-extend" />');
		$("#WORKS .footer-suvArea .separate-w-m").addClass(separateAnimation);

	});
	/*アニメーション表示制御*/
	$(function(){
		$('.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//要素が見えたとき		
				if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
					$(this).addClass("active");
				}
			}
		});
		$('.performance.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//要素が見えたとき		
				if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
					$(this).addClass("active");
				}else if (visiblePartY == 'top'){//要素の上が表示域に入ってるとき
					$(this).addClass("active");
				}else if (visiblePartY == 'bottom'){//要素の下が表示域に入ってるとき
					$(this).addClass("active");
				}
			}
		});
	});
	/*ワークス表示制御*/
	$('#WORKS.detail .firstview-module-06 .thum-title.efc-bgColour').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
	if (isInView) {//要素が見えたとき
		effect_wrp='#WORKS .thum-title .effect_wrp';
		effect_box='#WORKS .thum-title .effect_box';		
			if(!($(".WORKS01_active").size())){//.view_activeクラスがない場合のみ
				if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
					if(!($(effect_wrp).size())){//.effect_wrpクラスがない場合のみ
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
		/*指定タグの上位にタグを追加*/
		$(effect_box).wrap('<div class="effect_wrp" />');
		$(effect_wrp).wrap('<div class="effect_container" />');
		}
		function efcEnd(){
			/*指定タグの上位のタグを削除*/
			$(effect_wrp).unwrap();
			$(effect_box).unwrap();
		}
	});
	
	

}
/******* ABOUTページの処理 *********/
function loadAbout() {
	
	/*--------アニメーション設定制御--------*/
	$(function(){
		/******【個別ページ】アバウト ******/
		/*ファーストビュー*/
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
		/*アバウト概要*/
		$('#ABOUT .about-module-10').addClass("performance anmation_container");
		$('#ABOUT .about-module-10 img').addClass(animation04 + "anm_delay-m");

		$('#ABOUT .about-module-10 h2').addClass(animation04 + "anm_delay-m");
		$('#ABOUT .about-module-10 h3').addClass(animation04 + "anm_delay-l");
		$('#ABOUT .about-module-10 p').addClass(animation04 + "anm_delay-xl");
		$("#ABOUT .about-module-10 .separate-w-s").wrap('<div class="anmation_container separate_anm-extend" />');
		$("#ABOUT .about-module-10 .separate-w-s").addClass(separateAnimation + "anm_delay-l");
		/*コンタクト*/
		$('#ABOUT .footer-suvArea').addClass("anmation_container");
		$('#ABOUT .footer-suvArea .p2-EN').addClass(animation02 + "anm_delay-l");
		$('#ABOUT .footer-suvArea .small1').addClass(animation01 + "anm_delay-xl");
		$("#ABOUT .footer-suvArea .separate-w-m").wrap('<div class="anmation_container separate_anm-extend" />');
		$("#ABOUT .footer-suvArea .separate-w-m").addClass(separateAnimation);
	
	});
	/*アニメーション表示制御*/
	$(function(){
		$('.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//要素が見えたとき		
				if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
					$(this).addClass("active");
				}
			}
		});
		$('.performance.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//要素が見えたとき		
				if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
					$(this).addClass("active");
				}else if (visiblePartY == 'top'){//要素の上が表示域に入ってるとき
					$(this).addClass("active");
				}else if (visiblePartY == 'bottom'){//要素の下が表示域に入ってるとき
					$(this).addClass("active");
				}
			}
		});
	});
	/*アバウト表示制御*/
	$('#ABOUT .heading1.efc-bgColour').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
	if (isInView) {//要素が見えたとき
		effect_wrp='#ABOUT .heading1 .effect_wrp';
		effect_box='#ABOUT .heading1 .effect_box';		
			if(!($(".ABOUT01_active").size())){//.view_activeクラスがない場合のみ
				if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
					if(!($(effect_wrp).size())){//.effect_wrpクラスがない場合のみ
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
		/*指定タグの上位にタグを追加*/
		$(effect_box).wrap('<div class="effect_wrp" />');
		$(effect_wrp).wrap('<div class="effect_container" />');
		}
		function efcEnd(){
			/*指定タグの上位のタグを削除*/
			$(effect_wrp).unwrap();
			$(effect_box).unwrap();
		}
	});
	$('#ABOUT h2.efc-bgColour').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
	if (isInView) {//要素が見えたとき
		effect_wrp='#ABOUT h2 .effect_wrp';
		effect_box='#ABOUT h2 .effect_box';		
			if(!($(".ABOUT02_active").size())){//.view_activeクラスがない場合のみ
				if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
					if(!($(effect_wrp).size())){//.effect_wrpクラスがない場合のみ
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
		/*指定タグの上位にタグを追加*/
		$(effect_box).wrap('<div class="effect_wrp" />');
		$(effect_wrp).wrap('<div class="effect_container" />');
		}
		function efcEnd(){
			/*指定タグの上位のタグを削除*/
			$(effect_wrp).unwrap();
			$(effect_box).unwrap();
		}
	});
	

}

