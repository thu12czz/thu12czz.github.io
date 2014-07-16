// JavaScript Document

(function(win, undefined) 
{
	var HTMLGame = 
	{
		/*初始化*/
        init: function(id, options) 
		{
			options = options || {};
            this.canvas = $("#" + id || "#canvas");
            this.context = this.canvas[0].getContext('2d');
            this.title = $('title')[0];
            this.size = options.size || [640,520];
            this.canvas[0].width = this.width = this.size[0];
            this.canvas[0].height = this.height = this.size[1];
            this.pos = this.getCanvasPos(this.canvas[0]);
            this.fps = options.fps || 30;
            this.bgColor = options.bgColor;
            this.bgImageSrc = options.bgImageSrc;
        },
		
        /*获取canvas在页面的位置*/
        getCanvasPos : function(canvas)
		{
			var o = canvas.getBoundingClientRect();
			return [o.left, o.top];
		},
		
        /*判断是否在canvas外*/
        isOutsideCanvas:function(target)
		{
			if(target.pos[0] + target.size[0] < 0 || target.pos[0] > this.canvas.width
			|| target.pos[1] + target.size[1] < 0 || target.pos[1] > this.canvas.height)
			{
				return true;
			}
        },
		
        /*清空画布*/
        clean: function() {
            this.context.clearRect(0,0,this.width, this.height);
        },
		
        /*绘制画布背景色*/     
        drawBg:function()
		{
            if(this.bgColor)
			{
                var bgRect = new this.shape.Rect({width:this.width,height:this.height,style:this.bgColor});//绘制背景色
                bgRect.draw();
            }   
            else if(this.bgImageSrc)
			{
                if(this.pictureLoader.loadedImgs[this.bgImageSrc])
				{
                    this.context.drawImage(this.pictureLoader.loadedImgs[this.bgImageSrc],0,0,this.width,this.height);
				}
            }
        },
		
		/*生成命名空间,并执行相应操作,用于函数封装*/
        NewSpace : function(nameSpace, func) 
		{
            var nameArray = nameSpace.split(".");
            var parent = win;
            for (var i = 0 ; i < nameArray.length ; i++) {
                (typeof parent[nameArray[i]] == 'undefined') && (parent[nameArray[i]] = {});
                parent = parent[nameArray[i]];
            }
            if (func) {
                func.call(parent, this);
            }
            return parent;
		}
    };
    win["HTMLGame"] = HTMLGame;    
})(window, undefined);

/*基础函数*/
HTMLGame.NewSpace("HTMLGame.Basis",function(argu)
{
	/*绑定事件函数,可绑定多个,区分浏览器*/
	this.BindFunc = (function()
	{
		if (window.addEventListener) 
		{
			return function(target, type, handler) {target.addEventListener(type, handler, false);}
		}
		else if(window.attachEvent)
		{
			return function(target,type,handler){target.attachEvent("on" + type,handler);}
		}
	})();
	
	/*解除事件函数*/
	this.removeFunc = (function()
	{
		if(window.removeEventListerner)
		{
			return function(target,type,handler){target.removeEventListerner(type,handler,false);}
		}
		else if(window.detachEvent)
		{
			return function(target,type,handler){target.detachEvent("on" + type,handler);}
		}
	})();
	
	/*复制对象属性*/
    this.extend = function(destination, source, isCover) 
	{
        var isUndefined = this.isUndefined;
        (typeof(isCover) == 'undefined') && (isCover = true);
        for (var name in source) 
		{
            if (isCover || isUndefined(destination[name])) 
			{
                destination[name] = source[name];
            }
        }
        return destination;
    };
	
	/*获取事件对象*/
    this.getEventObj = function(eve)
	{
        return eve || win.event;
    };
	
	/*原型继承对象*/
	this.inherit=function(child,parent)
	{
		var func = function(){};
		func.prototype = parent.prototype;
		child.prototype = new func();
		child.prototype.constructor = child;
		child.prototype.parent = parent;
	};
});

/*ajax部分*/
HTMLGame.NewSpace("HTMLGame.ajax", function(argu) 
{
    var activeXString; //为IE特定版本保留的activeX字符串
    var onXMLhttpload = function(XMLhttp, options) 
	{
        return function(events) 
		{
			if (XMLhttp.readyState == 4) 
			{
                if (XMLhttp.status == 200 )
				 {
                    var onSuccess = options.onSuccess;
                    onSuccess && onSuccess();
                }
                else {
                    var onError = options.onError;
                    onError && onError();

                }
            }
        }
    };
	
    /*生成XMLHttpRequest对象*/
    this.creatXMLhttp = function()
	{
		if (window.XMLHttpRequest)
		{// code for IE7, Firefox, Opera, etc
			return new XMLHttpRequest();
		}
		else if (window.ActiveXObject)
		{// code for IE6, IE5
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	
    /*发送请求*/
    this.request = function(options) 
	{
        var defaultObj = 
		{
            type: "get"
        };
        argu.Basis.extend(defaultObj, options);
        var type = options.type;
        var XMLhttp = this.creatXMLhttp();
		argu.Basis.BindFunc(XMLhttp, "readystatechange", function(eve) 
		{//资源加载完成回调函数
            if (XMLhttp.readyState == 4) 
			{
                if (XMLhttp.status >= 200) 
				{
                    var onSuccess = options.onSuccess;
                    onSuccess && onSuccess();
                }
                else {
                    var onError = options.onError;
                    onError && onError();

                }
            }
        });

        var requestOpt = options.requestOpt;
        var url = options.url;

        if (type == "get") {//get请求数据处理
            if (url.indexOf("?") < 0) 
			{
                url += "?";
            }
            else
			 {
                url += "&";
            }

            for (name in requestOpt) {
                if (requestOpt.hasOwnProperty(name)) {
                    url += encodeURIComponent(name) + "=" + encodeURIComponent(requestOpt[name]) + "&";
                    url = url.slice(0, -1);
                    XMLhttp.open(type, url, true);
                    XMLhttp.send(null);
                }
            }
        }
        else if (type == "post") {//post请求数据处理
            var _requestOpt = {}
            for (name in requestOpt) {
                if (requestOpt.hasOwnProperty(name)) {
                    _requestOpt[encodeURIComponent(name)] = encodeURIComponent(requestOpt[name]);
                }
            }
            XMLhttp.open(type, url, true);
            XMLhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            XMLhttp.send(_requestOpt);
        }
    }
});

/*本地存储*/
HTMLGame.NewSpace("HTMLGame", function(argu) {
    var win=window;
    var localStorage=
	{/*设置名值对*/
        set:function(key,value)
		{//可传入对象或名值对
            if(typeof(key) == 'object' )
			{
                for(n in key)
				{
                    if(key.hasOwnProperty(n)) {arguments.callee(n,key[n]);}
                }
                return;
            }
            win.localStorage.setItem(key,value);
        },
        /*获取值*/
        get:function(name)
		{
            return win.localStorage.getItem(name);
        },
        /*删除结果*/        
        remove:function(name)
		{
            win.localStorage.removeItem(name);
        },
		
        /*清空localStorage*/         
        clear:function()
		{
            win.localStorage.clear();
        }
    }
    this.localStorage=localStorage;
});

/*数据加载*/
HTMLGame.NewSpace("HTMLGame", function(argu) {
    var file_type = {}
    file_type["js"] = "js";
    file_type["json"] = "json";
    file_type["wav"] = "audio";
    file_type["mp3"] = "audio";
    file_type["ogg"] = "audio";
    file_type["png"] = "image";
    file_type["jpg"] = "image";
    file_type["jpeg"] = "image";
    file_type["gif"] = "image";
    file_type["bmp"] = "image";
    file_type["tiff"] = "image";
	 /*资源加载完毕的处理程序*/
    var resourceLoad = function(self, type) 
	{
        return function() 
		{   
            type == "image" && (self.loadedImgs[this.srcPath] = this);
            type == "audio" && (self.loadedAudios[this.srcPath] = this);
            if(type == "error")
			{
                self.errorCount ++;
            }
            else
			{
                self.loadedCount ++;
            }
            argu.Basis.BindFunc(this, "load", arguments.callee);//保证图片的onLoad执行一次后销毁
            argu.Basis.BindFunc(this, "error", arguments.callee);
            argu.Basis.BindFunc(this, "canplay", arguments.callee);
            self.loadedPercent = Math.floor((self.loadedCount + self.errorCount) / self.sum * 100);
            self.onLoad && self.onLoad(self.loadedPercent);
            if (!type || self.loadedPercent === 100) 
			{//如果没有资源需要加载或者资源已经加载完毕
                self.loadedCount = 0;
                self.errorCount = 0;
                self.loadedPercent = 0;
                type == "image" && (self.loadingImgs = {});
                type == "audio" && (self.loadingAudios = {});
                if (self.gameObj && self.gameObj.initialize) 
				{
                    self.gameObj.initialize(self.startOptions);
                    if (argu.loop && !argu.loop.stop) 
					{//结束上一个循环
                        argu.loop.end();
                    }
                    argu.loop = new argu.GameLoop(self.gameObj,{fps:argu.fps}); //开始新游戏循环
                    argu.loop.start();
                }
            }
        }
    }
	
    var pictureLoader = 
	{
        sum: 0,         //图片总数
        loadedCount: 0, //图片已加载数
        errorCount:0,
        loadingImgs: {}, //未加载图片集合
        loadedImgs: {}, //已加载图片集合
        loadingAudios: {}, //未加载音频集合
        loadedAudios: {}, //已加载音频集合
        /*图像加载，之后启动游戏*/
        start: function(gameObj, options)
		{//options:srcArray,onload
            options=options||{};
            var srcArr = options.srcArray;
            this.startOptions = options.startOptions; //游戏开始需要的初始化参数
            this.onLoad = options.onLoad;
            this.gameObj = gameObj;
            this.sum = 0;
            argu.spriteList.clean();
            if(!srcArr)
			{//如果没有资源需要加载，直接执行resourceLoad回调
                resourceLoad(this)();
            }
            else if (typeof(srcArr) == 'object') 
			{
				for (var i in srcArr) 
				{
                    if (srcArr.hasOwnProperty(i)) 
					{
                        this.sum++;
                        var path = srcArr[i];
                        var suffix = srcArr[i].substring(srcArr[i].lastIndexOf(".") + 1);
                        var type = file_type[suffix];
                        if (type == "image") 
						{
                            var img=this.loadingImgs[path] = new Image();
                            argu.Basis.BindFunc(img, "load",  resourceLoad(this, type));
                            argu.Basis.BindFunc(img, "error", resourceLoad(this, "error"));
                            img.src = path;
                            img.srcPath = path; //没有经过自动变换的src
                        }
                        else if (type == "audio") {
                            var audio=this.loadingAudios[path] = new Audio(path);
                            argu.Basis.BindFunc(audio, "canplay", resourceLoad(this, type));
                            argu.Basis.BindFunc(audio, "error", resourceLoad(this, "error"));
                            audio.src = path;
                            audio.srcPath = path; //没有经过自动变换的src
                        }
                        else if (type == "js") {//如果是脚本，加载后执行
                            var head = argu.Basis.$('head')[0];
                            var script = document.createElement("script");
                            head.appendChild(script);
                            argu.Basis.BindFunc(script, "load", resourceLoad(this, type));
                            argu.Basis.BindFunc(script, "error", resourceLoad(this, "error"));
                            script.src = path;
                        }
                    }
                }
            }
        }
    };
    this.pictureLoader = pictureLoader;
});

/*输入记录*//*由于本此游戏只支持键盘操作，所以输入部分现在只写键盘的按下*/ 
HTMLGame.NewSpace("HTMLGame.input", function(argu) 
{
	var pressed_keys = {}; /*被按下的键的集合*/
	var keydown_callbacks = {}; /*键盘按下触发的处理函数*/
	var keyup_callbacks = {}
	/*键盘按键编码和键名*/
    var k = [];
    k[8] = "backspace"
    k[9] = "tab"
    k[13] = "enter"
    k[16] = "shift"
    k[17] = "ctrl"
    k[18] = "alt"
    k[19] = "pause"
    k[20] = "capslock"
    k[27] = "esc"
    k[32] = "space"
    k[33] = "pageup"
    k[34] = "pagedown"
    k[35] = "end"
    k[36] = "home"
    k[37] = "left"
    k[38] = "up"
    k[39] = "right"
    k[40] = "down"
    k[45] = "insert"
    k[46] = "delete"

    k[91] = "leftwindowkey"
    k[92] = "rightwindowkey"
    k[93] = "selectkey"
    k[106] = "multiply"
    k[107] = "add"
    k[109] = "subtract"
    k[110] = "decimalpoint"
    k[111] = "divide"

    var numpadkeys = ["numpad1", "numpad2", "numpad3", "numpad4", "numpad5", "numpad6", "numpad7", "numpad8", "numpad9"]
    var fkeys = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9"]
    var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    for (var i = 0; numbers[i]; i++) { k[48 + i] = numbers[i] }
    for (var i = 0; letters[i]; i++) { k[65 + i] = letters[i] }
    for (var i = 0; numpadkeys[i]; i++) { k[96 + i] = numpadkeys[i] }
    for (var i = 0; fkeys[i]; i++) { k[112 + i] = fkeys[i] }
	
	
	/*判断键是否被按下*/
	this.isPressed = function(keyName) 
	{
        return !!pressed_keys[keyName];
    };
	
	/*绑定键盘按下事件*/
    this.onKeyDown = function(keyName, handler)
	{
        keyName = keyName || "allKeys";
        if (typeof(keydown_callbacks[keyName]) == "undefined") 
		{
            keydown_callbacks[keyName] = [];
        }
        keydown_callbacks[keyName].push(handler);

    }
	
	/*清除键盘按下事件处理程序*/
    this.clearDownCallbacks = function(keyName)
	{
        if (keyName)
		{
            keydown_callbacks[keyName] = [];
        }
        else {keydown_callbacks = {};}
	}
	
	/*绑定键盘弹起事件*/	
	this.onKeyUp = function(keyName,handler)
	{
		keyName = keyName || "allKeys";
		if(typeof(keyup_callbacks[keyName]) == "undefined")
		{
			keyup_callbacks[keyName]=[];							
		}
		keyup_callbacks[keyName].push(handler);
	
	}
	
	/*清除键盘按下事件处理程序*/	
	this.clearDownCallbacks=function(keyName){
		if(keyName)
		{
			keydown_callbacks[keyName]=[];
		}
		else{keydown_callbacks={};}
	}
		
	/*记录键盘按下的键*/
    var recordPress = function(eve) 
	{
        eve = argu.Basis.getEventObj(eve);
        var keyName = k[eve.keyCode];
        pressed_keys[keyName] = true;
        if (keydown_callbacks[keyName]) 
		{
            for (var i = 0; i < keydown_callbacks[keyName].length;i++) 
			{
                keydown_callbacks[keyName][i]();
            }
        }
        if (keydown_callbacks["allKeys"]) {
            for (var i = 0; i < keydown_callbacks["allKeys"].length; i++)
			{
                keydown_callbacks["allKeys"][i]();
            }
        }
    }
	
	/*记录键盘松开的键*/	
	var recordUp = function(eve){
		eve = argu.Basis.getEventObj(eve);
		var keyName = k[eve.keyCode];
		pressed_keys[keyName] = false;
		if(keyup_callbacks[keyName])
		{
			for(var i = 0;i < keyup_callbacks[keyName].length;i++)
			{
				keyup_callbacks[keyName][i]();	
			}	
		}
		if(keyup_callbacks["allKeys"]){
			for(var i = 0;i < keyup_callbacks["allKeys"].length;i++)
			{
				keyup_callbacks["allKeys"][i]();	
			}
		}
	}
	argu.Basis.BindFunc(window,"keydown",recordPress);
	argu.Basis.BindFunc(window,"keyup",recordUp);
});

/*碰撞检测*//*目测本次游戏只用到矩形与矩形的碰撞*/
HTMLGame.NewSpace("HTMLGame.collision",function(argu)
{
	this.collision_between_rects = function(rect1,rect2)
	{
		if((rect1.right >= rect2.x && rect1.right <= rect2.right || rect1.x >= rect2.x && rect1.x<=rect2.right)
		 &&(rect1.bottom >= rect2.y && rect1.bottom <= rect2.bottom || rect1.y <= rect2.bottom && rect1.bottom >= rect2.y))
		 {return 1};
	}
});

/*基本的图形*//*本游戏中只用到矩形和文本*/
HTMLGame.NewSpace("HTMLGame.shape",function(argu)
{
	var rect = function(options) {
        if (!(this instanceof arguments.callee)) {
            return new arguments.callee(options);
        }
        this.init(options);
    };
	rect.prototype = {
        /*初始化*/
        init: function(options) 
		{
            this.pos = [0,0];
            this.size = [100,100];
            this.style = "Black";
            this.isFill = true;
            this.alpha = 1; 
            rect.parent.prototype.init.call(this,options);
        },
        /*设置参数*/
        setOptions: function(options) {
            argu.Basis.extend(this, options);
        },
        /*绘制矩形*/
        draw: function() 
		{
            var context = argu.context;
            context.globalAlpha = this.alpha;
            if (this.isFill) {
                context.fillStyle = this.style;
                context.fillRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
            }
            else {
                context.strokeStyle = this.style;
                context.strokeRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
            }
            return this;
        },
		
        /*改变尺寸*/
        resize: function(dSize) {
            this.size[0] += dSize[0];
            this.size[1] += dSize[1];
            return this;
        },
		
        /*改变尺寸*/
        resizeTo: function(size) {
            this.width = size[0];
            this.height = size[1];
            return this;
        },
		
        /*返回是否在某对象左边*/
        isLeftTo:function(obj,isCenter){//isCenter:是否以中点为依据判断
            if(isCenter) return this.pos[0] < obj.pos[0];
            return this.pos[0] + this.size[0] / 2 < obj.pos[0] - obj.size[0] / 2;
        },
        /*返回是否在某对象右边*/
        isRightTo:function(obj,isCenter){
            if(isCenter) return this.pos[0] > obj.pos[0];
            return this.pos[0] - this.size[0] / 2 > obj.pos[0] + obj.size[0] / 2;
        },
        /*返回是否在某对象上边*/
        isTopTo:function(obj,isCenter){
            if(isCenter) return this.pos[1] < obj.pos[1];
            return this.pos[1] + this.size[1] / 2 < obj.pos[1] - obj.size[0] / 2;
        },
        /*返回是否在某对象下边*/
        isBottomTo:function(obj,isCenter){
            if(isCenter) return this.pos[1] > obj.pos[1];
            return this.pos[1] - this.size[0] / 2 > obj.pos[1] + obj.size[1] / 2;
        },
        /*点是否在矩形内*/            
        isInside:function(point){
            var pointX = point[0];
            var pointY = point[1];
            var x = this.pos[0];
            var y = this.pos[1];
            var right = x + this.size[0];
            var bottom = y + this.size[1];
            return (pointX >= x && pointX <= right && pointY >= y && pointY <= bottom);
        },
    };
	var text=function(text,options){
		if(!(this instanceof arguments.callee)){
			return new arguments.callee(text,options);
		}
		this.init(text,options);
	
	}
	text.prototype={
		/**
		 *初始化
		**/
		init:function(text,options){
			/**
			 *默认值对象
			**/
			var defaultObj={
				x:100,
				y:100,
				style:"red",
				isFill:true
				
			};
			options=options||{};
			options=argu.Basis.extend(defaultObj,options);
			this.setOptions(options);
			this.text=text;		
		},
		/**
		*绘制
		**/
		draw:function(){
			var context = argu.context;
			(typeof(this.font) != 'undefined')&&(context.font=this.font);
			(typeof(this.textBaseline)!= 'undefined')&&(context.textBaseline=this.textBaseline);
			(typeof(this.textAlign)!= 'undefined')&&(context.textAlign=this.textAlign);
			(typeof(this.maxWidth)!= 'undefined')&&(context.maxWidth=this.maxWidth);
			if(this.isFill){
				context.fillStyle=this.style;
				this.maxWidth?context.fillText(this.text,this.x,this.y,this.maxWidth):context.fillText(this.text,this.x,this.y);
			}
			else{
				context.strokeStyle=this.style;
				this.maxWidth?context.strokeText(this.text,this.x,this.y,this.maxWidth):context.strokeText(this.text,this.x,this.y);
			}
		},
		/**
		*设置参数
		**/
		setOptions:function(options){
			this.x = options.x || this.x;
			this.y = options.y || this.y;
			this.maxWidth = options.maxWidth || this.maxWidth;
			this.font = options.font || this.font;
			this.textBaseline = options.textBaseline || this.textBaseline;
			this.textAlign = options.textAlign || this.textAlign;
			this.isFill = options.isFill || this.isFill;
			this.style = options.style || this.style;
			
		}
	};
	this.Text = text;
	this.Rect = rect;	
});

/*游戏地图*/
HTMLGame.NewSpace("HTMLGame", function(argu) 
{   
    /*地图对象*/
    var map = function(mapMatrix,options){
		
		if(!(this instanceof arguments.callee)){
			return new arguments.callee(mapMatrix,options);
		}
		this.init(mapMatrix,options);
	};
	map.prototype = { 
		/*初始化*/
        init: function(mapMatrix,options) 
		{
            var defaultObj =
			{
                beginX:0,
                beginY:0,
				cellSize:[32,32],
            };//默认值
            options = options || {};
            options = argu.Basis.extend(defaultObj, options);
			this.mapMatrix=mapMatrix;
			this.cellSize=options.cellSize;
			this.beginX=options.beginX;
			this.beginY=options.beginY;
			this.row=mapMatrix.length;//有多少行
        },
		
		/*根据map矩阵绘制map*/	
		draw:function(options){
			var mapMatrix = this.mapMatrix;
			var beginX = this.beginX;
			var beginY = this.beginY;
			var cellSize = this.cellSize;
			var currentRow;
			var currentCol
			var currentObj;
			var row = this.row;
			var img;
			for(var i = beginY,ylen = beginY + row * cellSize[1];i < ylen;i += cellSize[1])
			{	//根据地图矩阵，绘制每个方格
			    currentRow = (i - beginY) / cellSize[1];
				for(var j = beginX,xlen = beginX + mapMatrix[currentRow].length * cellSize[0];j < xlen;j += cellSize[0])
				{
					currentCol = (j - beginX) / cellSize[0];
					currentObj = options[mapMatrix[currentRow][currentCol]];
					currentObj.x = currentObj.x || 0;
					currentObj.y = currentObj.y || 0;
					img = argu.pictureLoader.loadedImgs[currentObj.src];
					argu.context.drawImage(img,currentObj.x,currentObj.y,cellSize[0],cellSize[1],j,i,cellSize[0],cellSize[1]);//绘制特定坐标的图像
				}
			}
		
		},
		/*获取特定对象在地图中处于的方格的值*/
		getPosValue:function(x,y){
			if(typeof(x) == 'object'){//只有一个输入值的时候
				y = x.y ;
				x = x.x;
			}
			x = Math.floor(x / this.cellSize[0]);
			y = Math.floor(y / this.cellSize[1]);
			if((typeof(this.mapMatrix[y])!= 'undefined')&&(typeof(this.mapMatrix[y][x]) != 'undefined'))
			{
				return this.mapMatrix[y][x];
			}
			return undefined;
		},
		/*获取特定对象在地图中处于的方格索引*/
		getCurrentIndex:function(x,y){
			if(typeof(x) == 'object'){
				y=x.y;
				x=x.x;
			}
			x = Math.floor(x) / this.cellSize[0];
			y = Math.floor(y) / this.cellSize[0];
			return [Math.floor(x),Math.floor(y)];
		},
		/*获取特定对象是否刚好与格子重合*/
		isMatchCell:function(x,y){
			if(typeof(x) == 'object'){
				y = x.y;
				x = x.x;
			}
			return (x % this.cellSize[0] == 0) && (y % this.cellSize[1] == 0);
		},
		/*设置地图对应位置的值*/
		setPosValue:function(x,y,value){
			this.mapMatrix[y][x]=value;	
		}
		
	}
    this.Map = map;
});

/*动画*/
HTMLGame.NewSpace("HTMLGame", function(argu)
{ 
	/*帧的增量*/
	var path = 1;
	/*获取帧集合*/
	var caculateFrames = function(options)
	{
		var frames = [];
		var width = options.width;
		var height = options.height;
		var beginX = options.beginX;
		var beginY = options.beginY;
		var frameSize = options.frameSize;
		var direction = options.direction;
		var x,y;
		/* 保存每一帧的精确位置 */
		if(direction == "right"){
			for(var y = beginY;y < height;y += frameSize[1]){
				for(var x = beginX;x < width;x += frameSize[0]){
					var frame = {};
					frame.x = x;
					frame.y = y;
					frames.push(frame);
				}
			}
		}
		else{
			for(var x = beginX;x < width;x += frameSize[0]){
				for(var y = beginY;y < height;y += frameSize[1]){
					var frame = {};
					frame.x = x;
					frame.y = y;
					frames.push(frame);
				}
			}		
		}
		return frames;	
	}
	/*包含多帧图像的大图片*/	
	spriteSheet=function(id,src,options)
	{
		if(!(this instanceof arguments.callee)){
			return new arguments.callee(id,src,options);
		}
		this.init(id,src,options);
	}
	spriteSheet.prototype=
	{
		/*初始化*/
		init:function(id,src,options)
		{
			/*默认对象*/	
			var defaultObj = {
				x:0,
				y:0,
				width:120,
				height:40,
				frameSize:[40,40],
				frameDuration:100,
				direction:"right",	//从左到右
				beginX:0,
				beginY:0,
				loop:false,
				bounce:false		
			};
			options = options||{};
			options = argu.Basis.extend(defaultObj,options);
			this.id = id;									//spriteSheet的id
			this.src = src;								//图片地址
			this.x = options.x;							//动画X位置
			this.y = options.y;							//动画Y位置
			this.width = options.width;					//图片的宽度
			this.height = options.height;					//图片的高度
			this.image = argu.pictureLoader.loadedImgs[this.src]; //图片对象
			this.frameSize = options.frameSize;			//每帧尺寸
			this.frameDuration = options.frameDuration;	//每帧持续时间
			this.direction = options.direction;			//读取帧的方向（从做到右或从上到下）
			this.currentIndex = 0;						//目前帧索引
			this.beginX = options.beginX;					//截取图片的起始位置X
			this.beginY = options.beginY;					//截图图片的起始位置Y
			this.loop = options.loop;						//是否循环播放
			this.bounce = options.bounce;					//是否往返播放
			this.onFinish = options.onFinish;				//播放完毕后的回调函数
			this.frames = caculateFrames(options);		//帧信息集合
			this.now = new Date().getTime();				//当前时间
			this.last=new Date().getTime();			//上一帧开始时间
		},
		/*更新帧*/	
		update:function()
		{
			this.now=new Date().getTime();
			var frames=this.frames;
			if((this.now - this.last) > this.frameDuration)
			{//如果间隔大于帧间间隔，则update
				var currentIndex = this.currentIndex;
				var length = this.frames.length;
				this.last = this.now;
				if(currentIndex >= length - 1)
				{
					if(this.loop){	//循环
						return frames[this.currentIndex = 0];	
					}
					else if(!this.bounce){//没有循环并且没有往返滚动，则停止在最后一帧
						this.onFinish&&this.onFinish();
						this.onFinish = undefined;
						return frames[currentIndex];
					}
				}
				if((this.bounce)&&((currentIndex >= length - 1 && path > 0) || (currentIndex <= 0 && path < 0))){	//往返
					path *= (-1);
				}
				this.currentIndex += path;
				
			}
			return frames[this.currentIndex];
		},
		/*跳到特定帧*/
		index:function(index){
			this.currentIndex=index;
			return this.frames[this.currentIndex];	
		},
		/**
		 *获取现时帧
		**/
		getCurrentFrame:function(){
			return this.frames[this.currentIndex];	
		},
		/**
		 *在特定位置绘制该帧
		**/
		draw:function(){
			
			var currentFrame=this.getCurrentFrame();
			var width=this.frameSize[0];
			var height=this.frameSize[1];
			argu.context.drawImage(this.image,currentFrame.x,currentFrame.y,width,height,this.x,this.y,width,height);
		}
		
	}
	this.SpriteSheet=spriteSheet;
										
});

/**
 *
 *sprite对象
 *
**/
HTMLGame.NewSpace("HTMLGame", function(argu) 
{							  
	var postive_infinity=Number.POSITIVE_INFINITY;			
	
	var sprite=function(id,options){
		if(!(this instanceof arguments.callee)){
			return new arguments.callee(id,options);
		}
		this.init(id,options);
	}
	sprite.prototype={
		/**
		 *初始化
		**/
		init:function(options){
			
			/**
			 *默认对象
			**/	
			var defaultObj={
				x:0,
				y:0,
				imgX:0,
				imgY:0,
				width:32,
				height:32,
				angle:0,
				speedX:0,
				speedY:0,
				rotateSpeed:0,
				aR:0,
				aX:0,
				aY:0,
				maxSpeedX:postive_infinity,
				maxSpeedY:postive_infinity,
				maxX:postive_infinity,
				maxY:postive_infinity,
				minX:-postive_infinity,
				minY:-postive_infinity,
				minAngle:-postive_infinity,
				maxAngle:postive_infinity
			};
			options=options||{};
			options=argu.Basis.extend(defaultObj,options);
			this.x=options.x;
			this.y=options.y;
			this.angle=options.angle;
			this.width=options.width;
			this.height=options.height;
			this.angle=options.angle;
			this.speedX=options.speedX;
			this.speedY=options.speedY;
			this.rotateSpeed=options.rotateSpeed;
			this.aR=options.aR;
			this.aX=options.aX;
			this.aY=options.aY;
			this.maxSpeedX=options.maxSpeedX;
			this.maxSpeedY=options.maxSpeedY;
			this.maxX=options.maxX;
			this.maxY=options.maxY;
			this.maxAngle=options.maxAngle;
			this.minAngle=options.minAngle;
			this.minX=options.minX;
			this.minY=options.minY;
			this.spriteSheetList={};
			
			if(options.src){	//传入图片路径
				this.setCurrentImage(options.src,options.imgX,options.imgY);
			}
			else if(options.spriteSheet){//传入spriteSheet对象
				this.addAnimation(options.spriteSheet);		
				setCurrentAnimation(options.spriteSheet);
			}
			
		},
		/**
		 *返回包含该sprite的矩形对象
		**/
		getRect:function(){
			return new argu.shape.Rect({x:this.x,y:this.y,width:this.width,height:this.height});
			
		},
		/**
		 *添加动画
		**/
		addAnimation:function(spriteSheet){
			this.spriteSheetList[spriteSheet.id]=spriteSheet;	
		},
		/**
		 *设置当前显示动画
		**/
		setCurrentAnimation:function(id){//可传入id或spriteSheet
			if(!this.isCurrentAnimation(id)){
				if(typeof(id) == 'string'){
					this.spriteSheet=this.spriteSheetList[id];
					this.image=this.imgX=this.imgY=undefined;
				}
				else if(typeof(id) == 'object'){
					this.spriteSheet=id;
					this.addAnimation(id);
					this.image=this.imgX=this.imgY=undefined;
				}
			}
		
		},
		/**
		 *判断当前动画是否为该id的动画
		**/
		isCurrentAnimation:function(id){
			if(typeof(id) == 'string'){
				return (this.spriteSheet&&this.spriteSheet.id===id);
			}
			else if(typeof(id) == 'object'){
				return this.spriteSheet===id;
			}
		},
		/**
		 *设置当前显示图像
		**/
		setCurrentImage:function(src,imgX,imgY){
			if(!this.isCurrentImage(src,imgX,imgY)){
				imgX=imgX||0;
				imgY=imgY||0;
				this.image=argu.pictureLoader.loadedImgs[src];	
				this.imgX=imgX;
				this.imgY=imgY;	
				this.spriteSheet=undefined;
			}
		},
		/**
		 *判断当前图像是否为该src的图像
		**/
		isCurrentImage:function(src,imgX,imgY){
			imgX=imgX||0;
			imgY=imgY||0;
			var image=this.image;
			if(typeof(src)=='string'){
				return (image&&image.srcPath===src&&this.imgX===imgX&&this.imgY===imgY);
			}
		},
			/**
		 *设置移动参数
		**/
		setMovement:function(options){
			isUndefined=argu.Basis.isUndefined;
			isUndefined(options.speedX)?this.speedX=this.speedX:this.speedX=options.speedX;
			isUndefined(options.speedY)?this.speedY=this.speedY:this.speedY=options.speedY;
			isUndefined(options.rotateSpeed)?this.rotateSpeed=this.rotateSpeed:this.rotateSpeed=options.rotateSpeed;
			isUndefined(options.aX)?this.aR=this.aR:this.aR=options.aR;
			isUndefined(options.aX)?this.aX=this.aX:this.aX=options.aX;
			isUndefined(options.aY)?this.aY=this.aY:this.aY=options.aY;
			isUndefined(options.maxX)?this.maxX=this.maxX:this.maxX=options.maxX;
			isUndefined(options.maxY)?this.maxY=this.maxY:this.maxY=options.maxY;
			isUndefined(options.maxAngle)?this.maxAngle=this.maxAngle:this.maxAngle=options.maxAngle;
			isUndefined(options.minAngle)?this.minAngle=this.minAngle:this.minAngle=options.minAngle;
			isUndefined(options.minX)?this.minX=this.minX:this.minX=options.minX;
			isUndefined(options.minY)?this.minY=this.minY:this.minY=options.minY;
			isUndefined(options.maxSpeedX)?this.maxSpeedX=this.maxSpeedX:this.maxSpeedX=options.maxSpeedX;	
			isUndefined(options.maxSpeedY)?this.maxSpeedY=this.maxSpeedY:this.maxSpeedY=options.maxSpeedY;	
			
			
		},
		/**
		 *重置移动参数回到初始值
		**/
		resetMovement:function(){
			this.speedX=0;
			this.speedY=0;
			this.rotateSpeed=0;
			this.aX=0;
			this.aY=0;
			this.aR=0;
			this.maxSpeedX=postive_infinity;
			this.maxSpeedY=postive_infinity;
			this.maxX=postive_infinity;
			this.minX=-postive_infinity;
			this.maxY=postive_infinity;
			this.minY=-postive_infinity;
			this.maxAngle=postive_infinity;
			this.minAngle=-postive_infinity;
		},
			/**
		 *更新位置和帧动画
		**/
		update:function(duration){//duration:该帧历时 单位：秒
			this.speedX=this.speedX+this.aX*duration;	
			if(this.maxSpeedX<0){
				this.maxSpeedX*=-1;
			}
			if(this.speedX<0){
				this.speedX=Math.max(this.speedX,this.maxSpeedX*-1)	;
			}
			else{
				this.speedX=Math.min(this.speedX,this.maxSpeedX);
			}
	
			this.speedY=this.speedY+this.aY*duration;	
			if(this.maxSpeedY<0){
				this.maxSpeedY*=-1;
			}
			if(this.speedY<0){
				this.speedY=Math.max(this.speedY,this.maxSpeedY*-1)	;
			}
			else{
				this.speedY=Math.min(this.speedY,this.maxSpeedY);
			}
			this.rotateSpeed=this.rotateSpeed+this.aR*duration;	
		
			this.rotate(this.rotateSpeed).move(this.speedX,this.speedY);
		
			if(this.spriteSheet){//更新spriteSheet动画
				this.spriteSheet.x=this.x
				this.spriteSheet.y=this.y;
				this.spriteSheet.update();
			}
		},
		/**
		 *绘制出sprite
		**/
		draw:function(){
			var context=argu.context;
			var halfWith;
			var halfHeight;
			if(this.spriteSheet){
				this.spriteSheet.x=this.x
				this.spriteSheet.y=this.y;
				this.spriteSheet.draw();
			}
			else if(this.image){
				context.save()
				halfWith=this.width/2;
				halfHeight=this.height/2;
				context.translate(this.x+halfWith, this.y+halfHeight);
				context.rotate(this.angle * Math.PI / 180*-1);
				context.drawImage(this.image,this.imgX,this.imgY,this.width,this.height,-halfWith,-halfHeight,this.width,this.height);
				context.restore();
			}
		
		},
		/**
		 *移动一定距离
		**/
		move:function(dx,dy){
			dx=dx||0;
			dy=dy||0;
			var x=this.x+dx;
			var y=this.y+dy;
			this.x=Math.min(Math.max(this.minX,x),this.maxX);
			this.y=Math.min(Math.max(this.minY,y),this.maxY);
			return this;
			
		},
		/**
		 *移动到某处
		**/
		moveTo:function(x,y){
			this.x=Math.min(Math.max(this.minX,x),this.maxX);
			this.y=Math.min(Math.max(this.minY,y),this.maxY);
			return this;
		},
		/**
		 *旋转一定角度
		**/
		rotate:function(da){
			da=da||0;
			var angle=this.angle+da;
			
			this.angle=Math.min(Math.max(this.minAngle,angle),this.maxAngle);
			return this;
		},
		/**
		 *旋转到一定角度
		**/
		rotateTo:function(a){
			this.angle=Math.min(Math.max(this.minAngle,a),this.maxAngle);
			return this;
			
		},
		/**
		 *改变一定尺寸
		**/
		resize:function(dw,dh){
			this.width+=dw;
			this.height+=dh;
			return this;
		},
		/**
		 *改变到一定尺寸
		**/
		resizeTo:function(width,height){
			this.width=width;
			this.height=height;
			return this;
		}
		
	}
	this.Sprite=sprite;							  
								  
});

/*sprite列表*/
HTMLGame.NewSpace("HTMLGame", function(argu) 
{							  
	var spriteList={
		length:0,
		add:function(sprite){
			Array.prototype.push.call(this,sprite);
		},
		remove:function(sprite){
			for(var i=0,len=this.length;i<len;i++){
				if(this[i]===sprite){
					Array.prototype.splice.call(this,i,1);
				}
			}
		},
		clean:function(){
			for(var i=0,len=this.length;i<len;i++){
				Array.prototype.pop.call(this);
			}	
		}
	}
	this.spriteList=spriteList;
});

/**
 *
 *游戏循环
 *
**/
HTMLGame.NewSpace("HTMLGame", function(argu) 
{
	var timeId;
	var interval;
	/**
	*循环方法
	**/	
	var loop=function(){
		var self=this;
		return function(){
			if(!self.pause&&!self.stop){
				var now=new Date().getTime();
				var duration=(now-self.lastTime)/1000;//帧历时
				var spriteList=argu.spriteList;
				self.loopDuration=(self.startTime-self.now)/1000;
		
				if(self.gameObj.update){//调用游戏对象的update
					self.gameObj.update(duration);
				}
				if(self.gameObj.draw){
					argu.context.clearRect(0,0,argu.width,argu.height);
					self.gameObj.draw();
				}
				for(var i=0,len=spriteList.length;i<len;i++){//更新所有sprite
				
					spriteList[i].update(duration);
					spriteList[i].draw();
				}
				self.lastTime=now;
			}
			timeId=window.setTimeout(arguments.callee,interval);
		}
	}
	
	var gameLoop=function(gameObj,options){
	
		if(!(this instanceof arguments.callee)){
			return new arguments.callee(gameObj,options);
		}
		this.init(gameObj,options);	
	}
	gameLoop.prototype={
		/**
		 *初始化
		**/
		init:function(gameObj,options){
			/**
			 *默认对象
			**/	
			var defaultObj={
				fps:30
			};
			options=options||{};
			
			options=argu.Basis.extend(defaultObj,options);
			this.gameObj=gameObj;
			this.fps=options.fps;
			interval=1000/this.fps;
			
			this.pause=false;
			this.stop=true;
		},
			
		/**
		 *开始循环
		**/	
		start:function(){
			if(this.stop){		//如果是结束状态则可以开始
				this.stop=false;
				var now=new Date().getTime();
				this.startTime=now;
				this.lastTime=now;
				this.loopDuration=0;	
				loop.call(this)();	
			}	
		},		/**
		 *继续循环
		**/	
		run:function(){
			this.pause=false;	
		},
		/**
		 *暂停循环
		**/	
		pause:function(){
			this.pause=true;	
		},
		/**
		 *停止循环
		**/	
		end:function(){
			this.stop=true;
			window.clearTimeout(timeId);
		}
	}
	this.GameLoop=gameLoop;
});