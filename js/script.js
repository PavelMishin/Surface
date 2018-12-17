    var width = parseFloat($('body').css('width')),
        sliders = $('.slider'),
        slides = $('.slides'),
        sliderControl = $('.slider__control-item'),
        sliderControlFirst = $('.slider__control-item:first-child'),
        appeal = $('.appeal__main');

function appealTop() {
    appeal.each(function(i, el) {
        var header = parseFloat($(el).find('h2').css('height')),
            rectangle = parseFloat($('.appeal__rectangle').css('height'));
        if (width >= 1263) {
            if (width > 1423 && width < 1900)
                width = 1440;
            else if (width >= 1903)
                width = 1903;
            if (header < rectangle) {
                $(el).css('padding-top', width/5 - (header + (rectangle - header)/2));
            } else if (header > rectangle) {
                $(el).css('padding-top', width/5 - (header - (header - rectangle)/2));
            }            
        } else if (width < 1263) {
            $(el).css('padding-top', '');
        } 
    });
}

function slider() {
    if (width < 768) {
        sliders.each(function(i, slider) {
            var slide = $(slider).find('.slider__slide'),
            controls = $(slider).find('.slider__control-item'),
            slides = $(slider).find('.slides');
            
            $(slider).swipe({
                swipeLeft:function() {
                    slides.css('right', function(i, value) {
                        var right = (parseFloat(value) + width) % (width * slide.length);
                        controls.removeClass('slider__control-item--active');
                        controls.eq(right/width).addClass('slider__control-item--active');
                        return right;
                    });
                },
                swipeRight:function() {
                    slides.css('right', function(i, value) {
                        var right = (parseFloat(value) - width);
                        if (right < 0)
                            right = (width * (slide.length - 1));
                        controls.removeClass('slider__control-item--active');
                        controls.eq(right/width).addClass('slider__control-item--active');
                        return right;
                    });
                }
            });
            
            controls.each(function(j, control) {
                $(control).click(function() {
                    controls.removeClass('slider__control-item--active');
                    $(control).addClass('slider__control-item--active');
                    slides.css('right', width * j);
                });
            });
        });
    }
}

$(document).ready(function() {  
   appealTop();
    slider(); 
});


$(window).resize(function() {
    width = parseFloat($('body').css('width'));
    
    slides.css('right', 0);
    sliderControl.removeClass('slider__control-item--active');
    sliderControlFirst.addClass('slider__control-item--active');
    
    appealTop();
    slider();
});