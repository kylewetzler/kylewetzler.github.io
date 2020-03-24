var $animation_elements = $('.overflow');
var $window = $(window);
var animated = false;

function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    $.each($animation_elements, function() {
        console.log($animation_elements);
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
            $element.addClass('in-view');
            if(!animated){
                animated = true;
                new Scene({
                    ".overflow.in-view .text span": i => ({
                        0: {
                            transform: {
                                translateY: "100%",
                            }
                        },
                        1: {
                            transform: {
                                translateY: "0%",
                            }
                        },
                        options: {
                            delay: i * 0.2,
                        }
                    }),
                }, {
                    easing: "ease-in-out",
                    selector: true,
                    iterationCount: "1",
                }).play();
            }
        } else {
            $element.removeClass('in-view');
            animated = false;
        }
    });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');