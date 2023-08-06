
//field counter
let fieldCounter = document.getElementsByClassName('frm-field-counter')
function fieldCounterButtons(index) {
	return `
        <button class="btn button-plus" data-index="${index}" data-type="plus"></button>
        <button class="btn button-minus" data-index="${index}" data-type="minus"></button>
    `
}
function fieldCounterCreator() {
	for (i = 0; i < fieldCounter.length; i++) {
		fieldCounter[i].insertAdjacentHTML('beforeend', fieldCounterButtons(i))
		fieldCounter[i].onclick = function (event) {
			const type = event.target.dataset.type
			const index = event.target.dataset.index
			if (index) {
				const fieldCounterPlus = fieldCounter[index].children[1]
				const fieldCounterMinus = fieldCounter[index].children[2]
				const fieldCounterInput = fieldCounter[index].children[0]
				if (type === 'plus') {
					fieldCounterInput.textContent = Number(fieldCounterInput.textContent) + 1
				} else if (type === 'minus') {
					fieldCounterInput.textContent = Number(fieldCounterInput.textContent) - 1
				}
				if (Number(fieldCounterInput.textContent) > 0) {
					fieldCounterMinus.removeAttribute('disabled')
				} else if (Number(fieldCounterInput.textContent) < 1) {
					fieldCounterMinus.setAttribute('disabled', true)
				}
			}
		}
	}
}
fieldCounterCreator();


$(document).ready(function(){

	//phone masked
	$('input[type="tel"]').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$('input[type="tel"]').on('click', function() {
		$(this).setCursorPosition(4);
	})
	$.fn.setCursorPosition = function(pos) {
	  this.each(function(index, elem) {
	    if (elem.setSelectionRange) {
	      elem.setSelectionRange(pos, pos);
	    } else if (elem.createTextRange) {
	      var range = elem.createTextRange();
	      range.collapse(true);
	      range.moveEnd('character', pos);
	      range.moveStart('character', pos);
	      range.select();
	    }
	  });
	  return this;
	};


    //popups
    let popupCurrent;
    $('.js-popup-open').on('click', function () {
        $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
        $('.popup-outer-box').removeClass('active');
        $('body').addClass('popup-open');
        popupCurrent = $(this).attr('data-popup');
        $('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
		if ($(this).hasClass('button-filter-help')) {
			let curT = $(this).offset().top - $(document).scrollTop() + 24;
			let curL = $(this).offset().left;
			let curR =  $(document).width() - $(this).offset().left;
			console.log(curR)
			let mW = $(document).width() - curL - 30;
			let mWR = $(document).width() - curR - 30;
			$('body').addClass('popup-open-scroll');
			$('.popup-outer-box[id="' + popupCurrent + '"]').addClass('popup-position');
			$('.popup-outer-box[id="' + popupCurrent + '"]').children('.popup-box').css('top', curT);
			$('.popup-outer-box[id="' + popupCurrent + '"]').children('.popup-box').css('max-width', mW);
			$('.popup-outer-box[id="' + popupCurrent + '"]').children('.popup-box').css('left', curL);
			if ($(this).closest('.card-box').length > 0) {
				$('.popup-outer-box[id="' + popupCurrent + '"]').children('.popup-box').css('max-width', mWR);
				$('.popup-outer-box[id="' + popupCurrent + '"]').children('.popup-box').css('left', 'auto');
				$('.popup-outer-box[id="' + popupCurrent + '"]').children('.popup-box').css('right', curR);
			}
		}
        return false;
    })
    $('.js-popup-close').on('click', function () {
        $('body').removeClass('popup-open');
        $('body').removeClass('popup-open-scroll');
        $('.popup-outer-box').removeClass('active');
        return false;
    })
    $('.popup-outer-box').on('click', function (event) {
        if (!event.target.closest('.popup-box')) {
			$('body').removeClass('popup-open');
			$('body').removeClass('popup-open-scroll');
			$('.popup-outer-box').removeClass('active');
			return false;
		}
    })

    //swipebox
    if (!!$('[data-swipebox]').offset()) {
        $('[data-swipebox]').swipebox();
    }
	
	
	//section-more
	$('.section-more .button-more-toggle').on('click', function() {
		$(this).parents('.section-more').toggleClass('section-open');
		return false;
	})


    //popup block
    $('.js-popup-wrap .js-btn-toggle').on('click', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('body').removeClass('menu-show');
            $('.js-popup-wrap').removeClass('popup-right');
        } else {
            $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
            $(this).addClass('active');
            if ($(this).parent().hasClass('main-menu-wrap')) {
                $('body').addClass('menu-show');
            }
            pLeft = $(this).parent('.js-popup-wrap').find('.js-popup-block').offset().left;
            pWidth = $(this).parent('.js-popup-wrap').find('.js-popup-block').outerWidth();
            pMax = pLeft + pWidth;
            if ( pMax > $('.wrap').width() ) {
                $(this).parent('.js-popup-wrap').addClass('popup-right');
            } else {
                $('.js-popup-wrap').removeClass('popup-right');
            }
        }
        return false;
    })
    $('.js-popup-wrap .js-btn-close').on('click', function() {
        $(this).parents('.js-popup-wrap').children('.js-btn-toggle').removeClass('active');
        $('.js-popup-wrap').removeClass('popup-right');
        $('body').removeClass('menu-show');
        return false;
    })
    $(document).click(function(event) {
        if ($(event.target).closest(".js-popup-block").length) return;
        $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
        $('.js-popup-wrap').removeClass('popup-right');
        $('body').removeClass('menu-show');
        event.stopPropagation();
    });
    $('.js-popup-wrap').each(function() {
        if ($(this).hasClass('js-popup-select')) {
            if ($(this).find('.js-popup-block').find('.active').length>0) {
                $(this).find('.js-btn-toggle').addClass('selected');
                var currentSelect = $(this).find('.js-popup-block').find('.active').html();
                $(this).find('.js-btn-toggle').children('.button-title').html(currentSelect);
            } else {
                $(this).find('.js-btn-toggle').removeClass('selected');
            }
        }
    })
    $('.js-popup-wrap.js-popup-select .js-popup-block a').on('click', function() {
        if ($(this).hasClass('active')) {} else {
            $(this).parents('.js-popup-wrap').find('.js-popup-block').find('.active').removeClass('active');
            $(this).addClass('active');
            $('.js-tab-block').removeClass('active');
            $('.js-tabs-nav').each(function() {
                $('.js-tab-block[data-tab*="'+$(this).find('.js-popup-block').find('.active').attr('data-tab')+'"]').addClass('active');
            })
        }
        $('.js-popup-wrap').each(function() {
            if ($(this).hasClass('js-popup-select')) {
                if ($(this).find('.js-popup-block').find('.active').length>0) {
                    $(this).find('.js-btn-toggle').addClass('selected');
                    var currentSelect = $(this).find('.js-popup-block').find('.active').html();
                    $(this).find('.js-btn-toggle').children('.button-title').html(currentSelect);
                } else {
                    $(this).find('.js-btn-toggle').removeClass('selected');
                }
            }
        })
        $(this).parents('.js-popup-wrap').find('.js-btn-toggle').removeClass('active');
        return false;
    })

    //tabs
    $('.js-tabs-nav').each(function() {
        $('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
    })
    $('.js-tab-title').each(function() {
        if ($(this).hasClass('active')) {
            $(this).next('.js-tab-content').show(0);
        }
    })
    $('.js-tabs-nav').on('click', 'a[data-tab]', function() {
		if ($(this).hasClass('js-button-map')) {
			$('.wrap').addClass('map-active');
			$(this).parents('.section-contacts-wrap').addClass('active');
			$('html, body').stop().animate({
				scrollTop: 0
			}, 1);
		} else {
			$('.wrap').removeClass('map-active');
			$(this).parents('.section-contacts-wrap').removeClass('active');
		}
		if ($(this).closest('.js-btn-toggle')) {
			$(this).parents('.js-btn-toggle').addClass('active')
		}
        if ($(this).hasClass('active')) {} else {
            $('.js-tab-block').removeClass('active');
            $(this).parents('.js-tabs-nav').find('.active').removeClass('active');
            $(this).addClass('active');
            $('.js-tabs-nav').each(function() {
                $('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
            })
        }
        return false;
    })
    $('.js-tab-title').on('click' , function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').next('.js-tab-content').slideUp(200);
        } else {
            $(this).addClass('active').next('.js-tab-content').slideDown(200);
        }
    })
    
    
    //sticky breadcrumbs
    if (!!$('.page-title-box .links-top-wrap').offset()) {
		if ($(window).innerWidth() < 1024) {
			$('.page-title-box').css('padding-top', $('.page-title-box .links-top-wrap').height())
			$('.page-full').css('padding-top', $('.page-title-box .links-top-wrap').height())		
		}
    }
    
    
    //sticky breadcrumbs
    $('.button-filter-toggle').on('click', function() {
        $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
        $('body').removeClass('menu-show').toggleClass('filter-show');
        return false;
    })


    //btn tgl
    $('.js-btn-tgl:not(.tgl-one)').on('click', function () {
        $(this).toggleClass('active');
        return false;
    })


	//item-tile-video
	$('.js-btn-video').on('click', function () {
		let videoURL = $(this).parent('.item-tile-video').attr('data-video');
		$(this).parents('.item-tile-video').addClass('active');
		$(this).parents('.item-tile-video').append('<iframe width="100%" height="100%" src="' + videoURL + '" frameborder="0" allowfullscreen></iframe>')
		return false;
	})


    //#range-slider
    if (!!$('#range-slider').offset()) {
        $('#range-slider').slider({
            range: true,
            min: 1000,
            max: 100800,
            values: [16000, 100800],
            slide: function (event, ui) {
                $('#range-slider-min').val(ui.values[0]);
                $('#range-slider-max').val(ui.values[1]);
            }
        })
        $('#range-slider-min').val($('#range-slider').slider('values', 0));
        $('#range-slider-max').val($('#range-slider').slider('values', 1));
        $('#range-slider-min').bind('focusout', function () {
            if ($(this).val() > $('#range-slider').slider('values', 1)) {
                $(this).val($('#range-slider').slider('values', 0));
            }
            $('#range-slider').slider('values', 0, $(this).val());
        })
        $('#range-slider-max').bind('focusout', function () {
            if ($(this).val() < $('#range-slider').slider('values', 0)) {
                $(this).val($('#range-slider').slider('values', 1));
            }
            $('#range-slider').slider('values', 1, $(this).val());
        })
        $('#range-slider-min').bind('keypress', function (e) {
            if (e.keyCode == 13) {
                if ($(this).val() > $('#range-slider').slider('values', 1)) {
                    $(this).val($('#range-slider').slider('values', 0));
                }
                $('#range-slider').slider('values', 0, $(this).val());
            }
        })
        $('#range-slider-max').bind('keypress', function (e) {
            if (e.keyCode == 13) {
                if ($(this).val() < $('#range-slider').slider('values', 0)) {
                    $(this).val($('#range-slider').slider('values', 1));
                }
                $('#range-slider').slider('values', 1, $(this).val());
            }
        })
        $('#widget').draggable();
    }


	//slider-box
	if (!!$('.slider-box').offset()) {
		if ($(window).innerWidth() > 1023) {
			$('.slider-box .slider').slick({
				dots: false,
				slidesToShow: 1,
				variableWidth: false,
				infinite: true,
				adaptiveHeight: false,
				rows: 1,
				swipeToSlide: true,
				prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
				nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
			});
		}
	}



	//gallery slider
	if (!!$('.photos-slider-box').offset()) {
		let pSlider = $('.photos-slider-box .slider-wrap .slider').slick({
			dots: false,
			slidesToShow: 1,
			infinite: true,
			prevArrow: false,
			nextArrow: false,
		});
		if ($(window).innerWidth() > 1023) {
			let pSliderPreview = $('.photos-slider-box .slider-preview-wrap .slider').slick({
				dots: false,
				slidesToShow: 8,
				vertical: true,
				infinite: true,
				prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
				nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
				responsive: [
					{
						breakpoint: 1600,
						settings: {
							slidesToShow: 4,
						}
					},
					{
						breakpoint: 1400,
						settings: {
							slidesToShow: 4,
						}
					},
				]
			});
		}
		$('.photos-slider-box .slider-wrap .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
			$('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
			$('.photos-slider-box .slider-preview-wrap .elm-photo[data-slide="' + currentSlide + '"]').parent().addClass('active');
		});
		$('.photos-slider-box .slider-preview-wrap .slider .elm-photo').click(function () {
			let newSlide = $(this).attr('data-slide');
			$('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
			$(this).parent().addClass('active');
			$('.photos-slider-box .slider-wrap .slider').slick('slickGoTo', newSlide);
			return false;
		})
		$('.photos-slider-box .elm-photo[data-slide="0"]').parent('.sl-wrap').addClass('active');
	}
	
});


$(window).on('load', function () {
	//compare-list-box
	if (!!$('.compare-list-box').offset()) {
		if ($(window).innerWidth() > 1023) {
			$('.compare-list-box .slider').slick({
				dots: false,
				slidesToShow: 5,
				variableWidth: false,
				infinite: false,
				adaptiveHeight: false,
				rows: 1,
				swipeToSlide: true,
				prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
				nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
				touchMove: false,
				draggable: false,
				responsive: [
					{
						breakpoint: 1600,
						settings: {
							slidesToShow: 4,
						}
					},
				]
			});
		}
		$('.compare-list-box .slider-list .ico-arrow-prev').on('click', function() {
			$('.compare-list-box .slider-features-section .ico-arrow-prev').click();
		})
		$('.compare-list-box .slider-list .ico-arrow-next').on('click', function() {
			$('.compare-list-box .slider-features-section .ico-arrow-next').click();
		})

		$('.compare-list-box .slider-title-wrap').each(function () {
			let titleHeight = $(this).outerHeight();
			let titleTop = $(this).next('.slider-section-wrap').offset().top - $(window).scrollTop();
			$(this).next('.slider-section-wrap').css('margin-top', titleHeight);
			$(this).css('top', titleTop);
		})
		$('.compare-list-box .slider-inner-title-wrap').each(function () {
			let titleInnerHeight = $(this).outerHeight();
			let titleInnerTop = $(this).next('.slider-outer-wrap').offset().top - $(window).scrollTop();
			$(this).next('.slider-outer-wrap').css('margin-top', titleInnerHeight);
			$(this).css('top', titleInnerTop);
		})
		$(window).on('scroll', function () {
			$('.compare-list-box .slider-title-wrap').each(function () {
				let titleHeight = $(this).outerHeight();
				let titleTop = $(this).next('.slider-section-wrap').offset().top - $(window).scrollTop() - titleHeight;
				$(this).next('.slider-section-wrap').css('margin-top', titleHeight);
				$(this).css('top', titleTop);
			})
			$('.compare-list-box .slider-inner-title-wrap').each(function () {
				let titleInnerHeight = $(this).outerHeight();
				let titleInnerTop = $(this).next('.slider-outer-wrap').offset().top - $(window).scrollTop() - titleInnerHeight;
				$(this).next('.slider-outer-wrap').css('margin-top', titleInnerHeight);
				$(this).css('top', titleInnerTop);
			})
		});
		$('html, body').stop().animate({
			scrollTop: 1
		}, 1);
	}


	//gallery-box
	if (!!$('.gallery-box').offset()) {
		if ($(window).innerWidth() > 1023) {
			$('.gallery-box .slider').slick({
				dots: false,
				slidesToShow: 2,
				variableWidth: true,
				infinite: false,
				adaptiveHeight: false,
				rows: 1,
				swipeToSlide: true,
				prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
				nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
			});
		}
	}
	
	
});