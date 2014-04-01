(function($) {
    
    function checkScrollDaemon() {
        var tmp = DC.scrollPosition().top, nowTime = new Date().getTime();
        
        if ( ! lastScrollTime) {
            lastScrollTime = nowTime;
        }
        
        // console.log(nowTime - lastScrollTime);
        lastScrollTime = nowTime;
        
        // still scrolling
        if (lastScrollTop != tmp) {
            return;
        }

        var header = $("#header"), 
            bgHeader = $("#bg-header"), 
            profile = $(top.document).find("#profile");

        if (tmp < 20) {
            header.stop().animate({top: 0}, "fast");
            profile.stop().animate({top: 24}, "fast");
            $(top.document).find("#bg-header").removeClass("bg-header-fade");
            header.removeClass("header-shadow");
            if (parseInt(bgHeader.css("top")) < 0) {
                bgHeader.stop().hide().css("top", 0);
            } else {
                bgHeader.stop().css("top", 0).fadeOut("fast");
            }
        } else if (scrollTotal < 300) {
            header.stop().animate({top: -65}, "fast");
            profile.stop().animate({top: -65}, "fast");
            bgHeader.stop().animate({top: -65}, "fast");
            $(top.document).find("#bg-header").addClass("bg-header-fade");
        } else {
            header.stop().animate({top: 0}, "fast");
            profile.stop().animate({top: 24}, "fast");
            if (parseInt(bgHeader.css("top")) < 0) {
                bgHeader.stop().show().animate({top: 0}, "fast");
            } else {
                bgHeader.stop().fadeIn("fast");
            }
            $(top.document).find("#bg-header").removeClass("bg-header-fade");
            header.addClass("header-shadow");
        }
        
        scrollTotal = 0;
    }
    
    var lastScrollTop = 0, lastScrollTime = 0;
    
    $(window).scroll(function(){
        var pos = DC.scrollPosition(), 
            nowTop = pos.top, 
            nowTime = new Date().getTime(), 
            isScrollDown = (nowTop > lastScrollTop);
            
        var header = $("#header"), 
            topProfile = $(top.document).find("#profile"),
            topBgHeader = $(top.document).find("#bg-header");
            
        do {
            // scroll to top
            if (nowTop <= 10) {
                header.removeClass("header-smaller").removeClass("header-fade");
                topBgHeader.removeClass("bg-header-fade");
                topProfile.removeClass("profile-smaller");
                break;
            }

            // scroll down
            if (isScrollDown) {
                if (nowTop > 10 && ! header.hasClass("header-smaller")) {
                    header.addClass("header-smaller").addClass("header-fade");
                    topBgHeader.addClass("bg-header-fade");
                    topProfile.addClass("profile-smaller");
                }
                break;
            }
            
            // scroll up with big power
            if (nowTop - lastScrollTop < -80 && nowTime - lastScrollTime < 50) {
                header.removeClass("header-smaller");
                topProfile.removeClass("profile-smaller");
                break;
            }
            
        } while (0);

        lastScrollTime = nowTime;
        lastScrollTop = nowTop;
    });
    
})(jQuery);