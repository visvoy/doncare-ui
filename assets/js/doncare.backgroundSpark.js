(function(window) {
var document = window.document;

var backgroundSpark = (function() {
    var sparks = {},
        animStart = true,
        config = {
            baseSize: 86,
            sizeRatio: 3,
            opacityRatio: 3,
            circleCount: 16
        };
        
    var backgroundSpark = function(dom, myConfig) {
        return new fn.init(dom, myConfig);
    };
    
    fn = backgroundSpark.prototype = {
        constructor: backgroundSpark,
        init: function(dom, myConfig) {
            var i, j, obj = (typeof dom == "string" ? document.getElementById(dom) : dom);
            
            if (typeof sparks[obj.id] != 'undefined') {
                return sparks[obj.id];
            }
            
            this.dom = obj;
        
            this.config = {};
            for (i in config) {
                this.config[i] = config[i];
            }
            if (typeof myConfig == "object") {
                for (i in myConfig) {
                    this.config[i] = myConfig[i];
                }
            }
            
            var sqr, stepWidth, stepHeight, htm = '';
            var winWidth = $(window).width(), winHeight = $(window).height();
            
            sqr = parseInt(Math.sqrt(this.config.circleCount));
            stepWidth = parseInt(winWidth / sqr);
            stepHeight = parseInt(winHeight / sqr);

            var n=0;
            for (i = 0; i < sqr; i++) {
                for (j = 0; j < sqr; j++) {
                    htm += backgroundSpark.generateCircle(this.config, i * stepWidth, j * stepHeight);
                    n++;
                }
            }
            for (i = 0; i < Math.random() * 6; i++) {
                htm += backgroundSpark.generateCircle(this.config, parseInt(Math.random() * winWidth), parseInt(Math.random() * winHeight));
                n++;
            }
            
            this.dom.innerHTML = htm;
            
            var that = this;
            
            function sparkRandomMove() {
                var x, y, anim, pos = $(this).offset(), wid = $(this).width(), hgt = $(this).height();
                var winWidth = $(window).width(), winHeight = $(window).height();
                
                x = parseInt(Math.random() * 20) * (Math.random() < 0.5 ? -1 : 1);
                y = parseInt(Math.random() * 20) * (Math.random() < 0.5 ? -1 : 1);
                
                if (x < 0 && pos.left < - wid / 3) {
                    x = -x;
                } else if (x > 0 && pos.left + wid / 3 > winWidth) {
                    x = -x;
                }
                if (y < 0 && pos.top < - hgt / 3) {
                    y = -y;
                } else if (y > 0 && pos.top + hgt / 3 > winHeight) {
                    y = -y;
                }
                
                anim = {
                    left: (pos.left + x), 
                    top: (pos.top + y)
                };
                anim = {
                    left: (this._sparkx + x), 
                    top: (this._sparky + y)
                };
                
                var sp = this;
                
                if (doncare.firefox || $(sp).parent().hasClass('animBgLarger')) {
                    $(sp).fadeOut(parseInt(Math.random() * 3000 + 1000), function() {
                        if ( ! $(sp).parent().hasClass('animBgLarger')) {
                            $(sp).css(anim);
                        }
                        $(sp).fadeTo(
                            parseInt(Math.random() * 3000 + 1000), 
                            parseInt(Math.random() * that.config.opacityRatio * 10) / 100,
                            function() {
                                sparkRandomMove.call(sp);
                            }
                        );
                    });
                } else {
                    $(sp).animate(anim, parseInt(Math.random() * 1000 + 1000) , function(){
                        sparkRandomMove.call(sp);
                    });
                }
            }
            
            if ( ! doncare.ie) {
                $(that.dom).find("img").each(function(){
                    var img = this;
                    img._sparkx = $(img).offset().left;
                    img._sparky = $(img).offset().top;
                    $(img).fadeTo(
                        parseInt(Math.random() * 2000), 
                        parseInt(Math.random() * that.config.opacityRatio * 10) / 100,
                        sparkRandomMove
                    );
                });
            } else {
                $(that.dom).find("img").each(function(){
                    var img = this;
                    $(img).fadeTo(
                        parseInt(Math.random() * 2000), 
                        parseInt(Math.random() * that.config.opacityRatio * 10) / 100
                    );
                });
            }

            sparks[obj.id] = this;
            return this;
        }
    };
    
    fn.init.prototype = fn;
    
    backgroundSpark.setConfig = function(key, value) {
    };
    
    backgroundSpark.config = function(key) {
    };
    
    backgroundSpark.start = function() {
        animStart = true;
    };
    
    backgroundSpark.stop = function() {
        for (var k in sparks) {
            $(sparks[k]).find("img").stop();
        }
        animStart = false;
    };
    
    backgroundSpark.generateCircle = function(cfg, x, y) {
        var radius, circle;
        radius = parseInt(Math.random() * cfg.sizeRatio * cfg.baseSize + 100);
        x = parseInt(x - Math.random() * radius + Math.random() * radius);
        y = parseInt(y - Math.random() * radius + Math.random() * radius);
        if (doncare.ie && doncare.ie < 7) {
            circle = 'circle.gif';
        } else {
            circle = 'circle' + parseInt(Math.random() * 5 + 1) + '.png';
        }
        
        return '<img src="assets/img/'+circle+'" style="width:'+radius+'px;height:'+radius+'px;top:'+y+'px;left:'+x+'px;" />';
    };
    
    return backgroundSpark;
})();

window.doncare.backgroundSpark = backgroundSpark;
})(window);