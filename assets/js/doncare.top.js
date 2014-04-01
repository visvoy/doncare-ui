(function($){
    
    DC.backgroundSpark('bg-spark');
    
    $("#btn-showcase").click(DC.page.showcase);
    
    $("#btn-reload").click(DC.page.reload);
    
    var profileHover = false, profileTimer;
    
    function profileHide() {
        if (profileHover) {
            return;
        }
        
        $("#user-notification").stop().css({right: -190}).animate({right: -300}, 100);
    }
    
    $("#user-notification,#user-notification-main,#btn-showcase").hover(function() {
        profileHover = true;
    }, function() {
        if (profileTimer) {
            window.clearTimeout(profileTimer);
        }
        profileHover = false;
        profileTimer = window.setTimeout(profileHide, 300);
    });
    
    $("#btn-profile").hover(function(){
        profileHover = true;
        
        if (parseInt($("#user-notification").css("right")) == -20) {
            return;
        }
        
        $("#user-notification").stop().css({right: -90}).show().animate({right: -20}, 100);
        // $("#user-notification").stop().animate({right: 0}, "fast");
    }, function(){
        if (profileTimer) {
            window.clearTimeout(profileTimer);
        }
        profileHover = false;
        profileTimer = window.setTimeout(profileHide, 300);
    });
    
    
    var logoSpotCount = 4, logoSpotHover = false, logoSpotTimer;
    
    function logoSpotHide() {
        if (logoSpotHover) {
            return;
        }
        
        $("#logo-link").stop().animate({bottom: 1}, "fast");
        $("#logo-link").find("img").stop().animate({width: 80, height: 80}, "fast");

        for (var i = 0; i < logoSpotCount; i++) {
            $("#logo-spot" + (i + 1)).stop().animate({left: 39, bottom: 38}, (i + 1) * 150, function(){
                $(this).hide();
            });
        }
    }
    
    $("a.logo-spot").hover(function() {
        logoSpotHover = true;
    }, function() {
        if (logoSpotTimer) {
            window.clearTimeout(logoSpotTimer);
        }
        logoSpotHover = false;
        logoSpotTimer = window.setTimeout(logoSpotHide, 500);
    });
    
    $("#logo-link").hover(function(){
        logoSpotHover = true;
        
        if (parseInt($(this).css("bottom")) == -9) {
            return;
        }
        
        $(this).stop().animate({bottom: -9}, "fast");
        $(this).find("img").stop().animate({width: 60, height: 60}, "fast");

        var r = 50, ang = 116 / (logoSpotCount - 1), i, x, y;
        for (i = 0; i < logoSpotCount; i++) {
            x = 38 + parseInt(r * Math.sin((90 + ang * i) * 0.017453293));
            y = 38 + Math.abs(parseInt(r * Math.cos((90 + ang * i) * 0.017453293)));
            $("#logo-spot" + (i + 1)).css({left: 39, bottom: 38}).show().stop()
                .animate({left: x, bottom: y}, (i + 1) * 100);
        }
    }, function(){
        if (logoSpotTimer) {
            window.clearTimeout(logoSpotTimer);
        }
        logoSpotHover = false;
        logoSpotTimer = window.setTimeout(logoSpotHide, 300);
    });
    
    // dock and menu
    var selectedMenu = 0, hoverMenu = -1, menuTimer = null;
    
    $("#dock a").hover(function(){
        var hoverIndex = $(this).index();
        
        if ( ! $("#bg-menu").is(":visible")) {
            $("#dock").stop().fadeTo(300, 1);
            $("#dock-text").fadeIn("fast");
            
            $("#dock a, #dock-text a").removeClass("hover");
            $("#menu-wrap div").addClass("level2");
            $("#bg-menu").stop().css({left: 100, opacity: 0.3}).show().animate({left: 170, opacity: 1}, 100);
        }
        
        if (hoverIndex == hoverMenu && $("#dock-text a:eq("+hoverIndex+")").hasClass("hover")) {
            return;
        }
        
        $("#menu-wrap div").hide().eq(hoverIndex).show();
        $("#dock-text a").each(function(n){
            toggleMenuHover(this, n, hoverIndex);
        });

        hoverMenu = hoverIndex;
    }, function(){
        $("#dock-text a").removeClass("hover");
        
        hoverMenu = -1;
        
        delayHideMenu();
    });
    
    $("#dock-text a").hover(function(){
        var hoverIndex = $(this).index();
        
        $("#dock a").each(function(n){
            toggleMenuHover(this, n, hoverIndex);
        });
        $("#dock-text a").each(function(n){
            toggleMenuHover(this, n, hoverIndex);
        });
        $("#menu-wrap div").hide().eq(hoverIndex).show();

        hoverMenu = hoverIndex;
    }, function(){
        $("#dock a").removeClass("hover");
        
        hoverMenu = -1;
        
        delayHideMenu();
    });
    
    $("#bg-menu, #bg-menu div, #menu-wrap div, #menu-wrap div a").hover(function(){
        var hoverIndex = $("#menu-wrap div:visible").index();
        
        $("#dock a").each(function(n){
            toggleMenuHover(this, n, hoverIndex);
        });
        $("#dock-text a").each(function(n){
            toggleMenuHover(this, n, hoverIndex);
        });

        hoverMenu = hoverIndex;
    }, function(){
        hoverMenu = -1;
        
        delayHideMenu();
    });
    
    function toggleMenuHover(ob, n, hoverIndex) {
        if (n != hoverIndex) {
            $(ob).removeClass("hover");
        } else {
            $(ob).addClass("hover");
        }
    }
    
    function delayHideMenu() {
        if (menuTimer) {
            window.clearTimeout(menuTimer);
        }
        
        menuTimer = window.setTimeout(hideMenu, 300);
    }
    
    function hideMenu() {
        if (hoverMenu < 0) {
            $("#bg-menu").hide();
            $("#menu-wrap div").hide().removeClass("level2").eq(selectedMenu).show();
            $("#dock a, #dock-text a").removeClass("hover");
            $("#dock a:eq("+selectedMenu+")").addClass("hover");
    
            $("#dock").stop().fadeTo(300, 0.5);
            $("#dock-text").fadeOut("fast");
        }
    }
    
    $("#dock a, #dock-text a, #menu-wrap div.menu a").each(function(){
        if ($(this).attr("rel") == 'external') {
            return;
        }
        var url = $(this).attr("href");
        this.onclick = function() {
            if (DC.page.caseIsShowing()) {
                DC.page.hidecase();
            }
            DC.page.open(url);
        }
        this.href='javascript:;';
        this.setAttribute("_url_bak_", url);
    });
    
})(jQuery);

