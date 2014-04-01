(function(window) {

var document = window.document;

var page = (function() {
    var pages = {},
        showcase = false,
        pageNow = null,
        pageCount = 0,
        css3D = DC.css3D,
        cleanFrameClasses = 'animShowFromLarger animShowFromSmaller animHideToLarger animHideToSmaller',
        cleanSparkClasses = 'animBgLarger animBgSmaller',
        config = {
            appendTo: "#main"
        };
        
    var page = function(dom, myConfig) {
        return new fn.init(dom, myConfig);
    };
    
    fn = page.prototype = {
        constructor: page,
        init: function(dom, myConfig) {
        }
    };
    
    fn.init.prototype = fn;
    
    page.open = function(url) {
        if (DC.underFrame) {
            return window.top.window.DC.page.open(url);
        }
        
        if (typeof pages[url] != 'undefined') {
            if (typeof pages[url]['frame'] != 'undefined') {
                page.ready(pages[url]['frame']);
            }
            return;
        }
        
        pages[url] = {
            url: url,
            index: ++pageCount
        };
        
        var now = new Date(),
            pid = "_dc_page"+now.getMinutes()+now.getMilliseconds()+parseInt(Math.random() * 100000000);
            htm = '<iframe id="' + pid + '" src="' + url + '" frameborder="0" style="opacity: 0" allowTransparency="true" onload="DC.page.ready(this)" pageUrl="' + url + '"></iframe>';
        htm += '<div id="' + pid + 'cover" class="page-cover" style="display:none"></div>';
        $(config.appendTo).append(htm);
        
        // $("#main").addClass("loading");
        // $("#frame-loading").show();
    };
    
    page.ready = function(ob) {
        var url = ob.getAttribute("pageUrl"), t;

        if (typeof pages[url]['frame'] == 'undefined') {
            pages[url]['frame'] = ob;
            pages[url]['window'] = ob.contentWindow;
            pages[url]['document'] = ob.contentWindow.document;
            pages[url]['title'] = ob.contentWindow.document.title;
            pages[url]['cover'] = document.getElementById(ob.id + 'cover');
        
            t = pages[url]['title'];
            if ($(pages[url]['document']).find("#header-title").length > 0) {
                t = "<h2 style='margin-top:32%'>" + t + "<br /><small>" + $(pages[url]['document']).find("#header-title").text() + "</small></h2>";
            } else {
                t = '<h2>' + t + '</h2>';
            }
        
            $(pages[url]['cover']).html(t).click(function(){
                page.hidecase(url);
            }).hover(function(){
                $(this).addClass('page-cover-hover');
            }, function(){
                $(this).removeClass('page-cover-hover');
            });

            $("#btn-showcase span").html(pageCount);
        }
        
        // $(pages[url]['document']).find("body").css("background", "transparent");
        
        var me = pages[url], copy;
        
        if ( ! pageNow) {
            page.showFromLarger(me.frame);
        } else if (pageNow.index > me.index) {
            page.hideToSmaller(pageNow.frame);
            page.showFromLarger(me.frame);
        } else if (pageNow.index < me.index) {
            page.hideToLarger(pageNow.frame);
            page.showFromSmaller(me.frame);
        }
        
        pageNow = me;
        
        $("#caption").html(me.title);
        $("#btn-reload").show();
        
        // $("#main").removeClass("loading");
        // $("#frame-loading").hide();
    };
    
    page.showFromLarger = function(frame) {
        $(frame).css("z-index", 410);
        if (css3D) {
            $(frame).removeClass(cleanFrameClasses).show().addClass("animShowFromLarger");
            return;
        }
        
        var css = {left: "-10%", top: "-10%", width: "120%", height: "120%", opacity: 0},
            anim = {left: 0, top: 0, width: "100%", height: "100%", opacity: 1};
        $(frame).css(css).show().animate(anim, "normal");
    };
    
    page.showFromSmaller = function(frame) {
        $(frame).css("z-index", 410);
        if (css3D) {
            $(frame).removeClass(cleanFrameClasses).show().addClass("animShowFromSmaller");
            return;
        }
        
        var css = {left: "10%", top: "10%", width: "80%", height: "80%", opacity: 0},
            anim = {left: 0, top: 0, width: "100%", height: "100%", opacity: 1};
        $(frame).css(css).show().animate(anim, "normal");
    };
    
    page.hideToLarger = function(frame) {
        $(frame).css("z-index", 409);
        if (css3D) {
            $(frame).removeClass(cleanFrameClasses).show().addClass("animHideToLarger");
            if ( ! $("#bg-spark").hasClass("animBgLarger")) {
                $("#bg-spark").removeClass(cleanSparkClasses).addClass("animBgLarger");
            }
            return;
        }
        
        var anim = {left: "-10%", top: "-10%", width: "120%", height: "120%", opacity: 0};
        $(frame).animate(anim, "fast", function() {
            $(this).hide();
        });
    };
    
    page.hideToSmaller = function(frame) {
        $(frame).css("z-index", 409);
        if (css3D) {
            $(frame).removeClass(cleanFrameClasses).show().addClass("animHideToSmaller");
            if ( ! $("#bg-spark").hasClass("animBgSmaller")) {
                $("#bg-spark").removeClass(cleanSparkClasses).addClass("animBgSmaller");
            }
            return;
        }
        
        var anim = {left: "10%", top: "10%", width: "80%", height: "80%", opacity: 0};
        $(frame).animate(anim, "fast", function() {
            $(this).hide();
        });
    };
    
    page.reload = function() {
        if (pageNow) {
            pageNow.window.location.reload();
        }
    };
    
    page.caseIsShowing = function() {
        return showcase;
    };
    
    page.showcase = function() {
        var i, y, url, mainWidth, cid;
        
        if (showcase) {
            // page.hidecase(pageNow.url);
            return;
        }
        
        showcase = true;
        
        $("#caption").html("选择您要访问的标签");
        $("#btn-reload").hide();
        
        $("#main").css("overflow", "auto");
        
        i = 0;
        y = 100;
        mainWidth = $("#main").width();
        for (url in pages) {
            if (i * 206 + 200 > mainWidth) {
                i = 0;
                y += 206;
            }
            $(pages[url].frame).removeClass(cleanFrameClasses)
                .css({
                    opacity: 0.8,
                    marginLeft: -100,
                    marginTop: -100,
                })
                .css("-webkit-transform", "scale(.5)")
                .css("-moz-transform", "scale(.5)")
                .css("-ms-transform", "scale(.5)")
                .css("-o-transform", "scale(.5)")
                .css("transform", "scale(.5)");
            if (pageCount < 10) {
                $(pages[url].frame).show()
                    .animate({
                        width: 400,
                        height: 400,
                        left: (i * 206),
                        top: y
                    }, {
                        duration: (i * 100 + 100),
                        complete: function() {
                            var cid = "#" + this.id + "cover";
                            if (this.getAttribute("pageUrl") == pageNow.url) {
                                $(cid).addClass("page-cover-now");
                            } else {
                                $(cid).removeClass("page-cover-now");
                            }
                            $(cid).css({
                                left: $(this).css("left"),
                                top: $(this).css("top"),
                                width: 200 - 4,
                                height: 200 - 4
                            }).fadeIn("fast");
                        }
                    });
            } else {
                $(pages[url].frame).css({
                    width: 400,
                    height: 400,
                    left: (i * 206),
                    top: y
                }).show();
                
                cid = "#" + pages[url].frame.id + "cover";
                if (pages[url].frame.getAttribute("pageUrl") == pageNow.url) {
                    $(cid).addClass("page-cover-now");
                } else {
                    $(cid).removeClass("page-cover-now");
                }
                $(cid).css({
                    left: $(pages[url].frame).css("left"),
                    top: $(pages[url].frame).css("top"),
                    width: 200 - 4,
                    height: 200 - 4
                }).show();
            }
            i++;
        }
    };
    
    page.hidecase = function(url) {
        if (typeof url == "undefined") {
            url = pageNow.url;
        }
        
        var k, me = pages[url];
        
        if ( ! showcase) {
            return;
        }
        
        showcase = false;
        
        $("#main").css("overflow", "hidden");
        
        // if ( ! $("#bg-spark").hasClass("animBgLarger")) {
        //     $("#bg-spark").removeClass(cleanSparkClasses).addClass("animBgLarger");
        // }
        
        $("#caption").html(me.title);
        $("#btn-reload").show();
        
        $(me.cover).fadeOut("fast");
        $(me.frame).css({
            display: "none",
            opacity: 1,
            left: 0,
            top: 0,
            marginLeft: 0,
            marginTop: 0,
            width: "100%",
            height: "100%"
        })
        .css("-webkit-transform", "scale(1)")
        .css("-moz-transform", "scale(1)")
        .fadeIn("fast");
        // page.showFromSmaller(me.frame);
        
        pageNow = me;

        for (k in pages) {
            if (k != url) {
                $(pages[k].cover).hide();
                $(pages[k].frame).hide().css({
                        left: 0,
                        top: 0,
                        marginLeft: 0,
                        marginTop: 0,
                        width: "100%",
                        height: "100%"
                    })
                    .css("-webkit-transform", "scale(1)")
                    .css("-moz-transform", "scale(1)");
            }
        }
    };
    
    return page;
})();

window.doncare.page = page;

})(window);