(function(window) {
var document = window.document;

window.doncare = window.DC = {
    
    ie: (function(){
        var rv = false;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        } else if (navigator.appName == 'Netscape') {
            var ua = navigator.userAgent;
            var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");  //for IE 11
            if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
        }
        return rv;
    }()),
    
    firefox: (navigator.userAgent.indexOf("Firefox") != -1),
    
    css3D: (function(){
        var props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'MsPerspective'], 
            testDom = document.createElement('a');
        for (var i = 0; i < props.length; i++) {
            if (props[i] in testDom.style) {
                return true;
            }
        }
        return false;
    }),
    
    scrollPosition: function() {
    	var p={left:0,top:0,width:0,height:0};
    	if(self.innerHeight){
    		p.height=self.innerHeight;
    		p.width=self.innerWidth;
    		p.left=self.pageXOffset;
    		p.top=self.pageYOffset;
    	}else if(ie6){
    		p.height=d.documentElement.clientHeight;
    		p.width=d.documentElement.clientWidth;
    		p.top=d.documentElement.scrollTop;
    		p.left=d.documentElement.scrollLeft;
    	}else if(d.body){
    		p.height=d.body.clientHeight;
    		p.width=d.body.clientWidth;
    		p.left=d.body.scrollLeft;
    		p.top=d.body.scrollTop;
    	}
    	return p;
    },
    
    closeAlert: function(ob) {
        $(ob).parent().slideUp("fast");
    },
    
    showModal: function(ob) {
        if (DC.underFrame) {
            $(DC.topDocument()).find("#modal-top-mask").show();
            $(DC.topDocument()).find("#profile,#bg-header").css("z-index", 90);
        }
        
        $("#modal-mask").height($(document).height()).show();
        $("#profile,#bg-header").hide();
        
        var pos = DC.scrollPosition()
            x = (pos.width - 130 - $(ob).outerWidth()) / 2,
            y = (pos.height - 30 - $(ob).outerHeight()) / 2;
        
        $(ob).css({
            left: x,
            top: y
        }).fadeIn("fast");
    },
    
    hideModal: function(ob) {
        if (DC.underFrame) {
            $(DC.topDocument()).find("#modal-top-mask").hide();
            $(DC.topDocument()).find("#profile,#bg-header").css("z-index", 300);
        }
        
        $("#modal-mask").hide();
        $("#profile,#bg-header").show();
        
        $(ob).hide();
    },
    
    tab: function(ob) {
        $(ob).find("> li > a").each(function(){
            $(this).data("toggle", this.getAttribute("href")).click(function(){
                $(this).parent().addClass("active").siblings().removeClass("active");
                $($(this).data("toggle")).addClass("active").siblings().removeClass("active");
            });
            this.setAttribute("href", "javascript:;");
        });
    },
    
    topDocument: function() {
        return window.top.window.document;
    },
    
    underFrame: (window.top != window.self)
};

if (DC.underFrame) {
    if ($("#modal-mask").length < 1) {
        $("body:first").append('<div id="modal-mask" class="modal-mask"></div>');
    }
}

if (DC.ie && DC.ie < 7) {
   for (var i=0; i<document.images.length; i++) {
      var img = document.images[i]
      var imgName = img.src.toUpperCase()
      if (imgName.substring(imgName.length-3, imgName.length) == "PNG") {
         var imgID = (img.id) ? "id='" + img.id + "' " : ""
         var imgClass = (img.className) ? "class='" + img.className + "' " : ""
         var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
         var imgStyle = "display:inline-block;" + img.style.cssText 
         if (img.align == "left") imgStyle = "float:left;" + imgStyle
         if (img.align == "right") imgStyle = "float:right;" + imgStyle
         if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
         var strNewHTML = "<span " + imgID + imgClass + imgTitle
         + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
         + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
         + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>" 
         img.outerHTML = strNewHTML;
         i = i-1;
      }
   }
}

})(window);