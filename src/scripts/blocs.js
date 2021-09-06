// Blocs.js Minified
function scrollToTarget(t) {
    1 == t ? t = 0 : 2 == t ? t = $(document).height() : (t = $(t).offset().top, $(".sticky-nav").length && (t -= $(".sticky-nav .navbar-header").height())), $("html,body").animate({
        scrollTop: t
    }, "slow"), $(".navbar-collapse").collapse("hide")
}

function animateWhenVisible() {
    $(window).scroll(function() {
        scrollToTopView()
    })
}

function scrollToTopView() {
    $(window).scrollTop() > $(window).height() / 3 ? $(".scrollToTop").hasClass("showScrollTop") || $(".scrollToTop").addClass("showScrollTop") : $(".scrollToTop").removeClass("showScrollTop")
}

function setUpLightBox() {
    window.targetLightbox, $(document).on("click", "[data-lightbox]", function(t) {
        t.preventDefault(), targetLightbox = $(this);
        var e = targetLightbox.attr("data-lightbox"),
            i = targetLightbox.attr("data-autoplay"),
            a = '<p class="lightbox-caption">' + targetLightbox.attr("data-caption") + "</p>",
            o = "no-gallery-set",
            l = targetLightbox.attr("data-frame");
        targetLightbox.attr("data-gallery-id") && (o = targetLightbox.attr("data-gallery-id")), targetLightbox.attr("data-caption") || (a = "");
        var n = "";
        1 == i && (n = "autoplay");
        var s = $('<div id="lightbox-modal" class="modal fade"><div class="modal-dialog"><div class="modal-content ' + l + ' blocs-lb-container"><button id="blocs-lightbox-close-btn" type="button" class="close-lightbox" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="modal-body"><a href="#" class="prev-lightbox" aria-label="prev"><span class="fa fa-chevron-left"></span></a><a href="#" class="next-lightbox" aria-label="next"><span class="fa fa-chevron-right"></span></a><img id="lightbox-image" class="img-responsive" src="' + e + '"><div id="lightbox-video-container" class="embed-responsive embed-responsive-16by9"><video controls ' + n + ' class="embed-responsive-item"><source id="lightbox-video" src="' + e + '" type="video/mp4"></video></div>' + a + "</div></div></div></div>");
        $("body").append(s), "fullscreen-lb" == l && ($("#lightbox-modal").addClass("fullscreen-modal").append('<a class="close-full-screen-modal animated fadeIn" style="animation-delay:0.5s;" onclick="$(\'#lightbox-modal\').modal(\'hide\');"><div class="close-icon"></div></a>'), $("#blocs-lightbox-close-btn").remove()), ".mp4" == e.substring(e.length - 4) ? ($("#lightbox-image, .lightbox-caption").hide(), $("#lightbox-video-container").show()) : ($("#lightbox-image,.lightbox-caption").show(), $("#lightbox-video-container").hide()), $("#lightbox-modal").modal("show"), "no-gallery-set" == o ? (0 == $("a[data-lightbox]").index(targetLightbox) && $(".prev-lightbox").hide(), $("a[data-lightbox]").index(targetLightbox) == $("a[data-lightbox]").length - 1 && $(".next-lightbox").hide()) : (0 == $('a[data-gallery-id="' + o + '"]').index(targetLightbox) && $(".prev-lightbox").hide(), $('a[data-gallery-id="' + o + '"]').index(targetLightbox) == $('a[data-gallery-id="' + o + '"]').length - 1 && $(".next-lightbox").hide()), addLightBoxSwipeSupport()
    }).on("hidden.bs.modal", "#lightbox-modal", function() {
        $("#lightbox-modal").remove()
    }), $(document).on("click", ".next-lightbox, .prev-lightbox", function(t) {
        t.preventDefault();
        var e = "no-gallery-set",
            i = $("a[data-lightbox]").index(targetLightbox),
            a = $("a[data-lightbox]").eq(i + 1);
        targetLightbox.attr("data-gallery-id") && (e = targetLightbox.attr("data-gallery-id"), i = $('a[data-gallery-id="' + e + '"]').index(targetLightbox), a = $('a[data-gallery-id="' + e + '"]').eq(i + 1)), $(this).hasClass("prev-lightbox") && (a = $('a[data-gallery-id="' + e + '"]').eq(i - 1), "no-gallery-set" == e && (a = $("a[data-lightbox]").eq(i - 1)));
        var o = a.attr("data-lightbox");
        if (".mp4" == o.substring(o.length - 4)) {
            var l = "";
            1 == a.attr("data-autoplay") && (l = "autoplay"), $("#lightbox-image, .lightbox-caption").hide(), $("#lightbox-video-container").show().html("<video controls " + l + ' class="embed-responsive-item"><source id="lightbox-video" src="' + o + '" type="video/mp4"></video>')
        } else $("#lightbox-image").attr("src", o).show(), $(".lightbox-caption").html(a.attr("data-caption")).show(), $("#lightbox-video-container").hide();
        targetLightbox = a, $(".next-lightbox, .prev-lightbox").hide(), "no-gallery-set" == e ? ($("a[data-lightbox]").index(a) != $("a[data-lightbox]").length - 1 && $(".next-lightbox").show(), $("a[data-lightbox]").index(a) > 0 && $(".prev-lightbox").show()) : ($('a[data-gallery-id="' + e + '"]').index(a) != $('a[data-gallery-id="' + e + '"]').length - 1 && $(".next-lightbox").show(), $('a[data-gallery-id="' + e + '"]').index(a) > 0 && $(".prev-lightbox").show())
    })
}

function addSwipeSupport() {
    $(".carousel-inner").length && $(".carousel-inner").swipe({
        swipeLeft: function(t, e, i, a, o) {
            $(this).parent().carousel("next")
        },
        swipeRight: function() {
            $(this).parent().carousel("prev")
        },
        threshold: 0
    })
}

function addKeyBoardSupport() {
    $(window).keydown(function(t) {
        37 == t.which ? $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click() : 39 == t.which && $(".next-lightbox").is(":visible") && $(".next-lightbox").click()
    })
}

function addLightBoxSwipeSupport() {
    $("#lightbox-image").length && $("#lightbox-image").swipe({
        swipeLeft: function(t, e, i, a, o) {
            $(".next-lightbox").is(":visible") && $(".next-lightbox").click()
        },
        swipeRight: function() {
            $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click()
        },
        threshold: 0
    })
}
$(document).ready(function() {  
    setUpLightBox(), addSwipeSupport(), addKeyBoardSupport()
}), $(window).load(function() {  
    animateWhenVisible()
});

window.scrollToTarget = scrollToTarget;

// Lors du click sur #scroll-hero -> fonction(t) est t.preventDefault()