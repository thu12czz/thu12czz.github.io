// JavaScript Document

var gameStaus = 0;/*游戏状态参数，1为正常行走，2为探索物品，3为打开道具栏,4为使用道具提示,5为获得道具提示*/
var LastStaus = 1;
var playerPosition=[2,10];
var targe;
var keyLast = 0;
var keyDuration = 0.12;
var currentmap = 0;

/*地图管理器*/
var MapManager=(function()
{
	var optionsObj={};//所有关卡参数对象
	return {
		add:function(MapObj,gameObj)
		{
			var srcArr=[];
			for(name in MapObj.srcObj)
			{
				if(MapObj.srcObj.hasOwnProperty(name))
				{
					srcArr.push(MapObj.srcObj[name]);
				}
			}
			var opt = optionsObj[MapObj.mapN] = {};
			opt.gameObj = gameObj;
			opt.srcArray = srcArr;
			opt.startOptions = MapObj.startOptions||{};
			opt.startOptions.mapMatrix = MapObj.mapMatrix;
			opt.startOptions.srcObj = MapObj.srcObj;
			opt.startOptions.mapN = MapObj.mapN;
			opt.startOptions.mapchange = MapObj.mapchange;
		},
		startMap:function(num){ 
			var op=optionsObj[num];
			HTMLGame.pictureLoader.start(op.gameObj,op);	
		}
	}
})();

HTMLGame.init("gameCanvas",{width:640,height:530});//初始化游戏框架

var srcObj;
/*	玩家对象	*/
var player = function(options){
	this.init(options);
	this.angle = 0;/*旋转角*//*0:向右，90：向上，180：向左，270，向右*/
	this.moveSpeed = 5;
};
HTMLGame.Basis.inherit(player,HTMLGame.Sprite);
player.prototype.initialize=function()		{
	this.addAnimation(new HTMLGame.SpriteSheet("playerDown",srcObj.player,{width:128,height:48,frameSize:[32,48],loop:true}));
	this.addAnimation(new HTMLGame.SpriteSheet("playerLeft",srcObj.player,{width:128,height:96,frameSize:[32,48],loop:true,beginY:48}));
	this.addAnimation(new HTMLGame.SpriteSheet("playerRight",srcObj.player,{width:128,height:144,frameSize:[32,48],loop:true,beginY:96}));
	this.addAnimation(new HTMLGame.SpriteSheet("playerUp",srcObj.player,{width:128,height:192,frameSize:[32,48],loop:true,beginY:144}));
}
player.prototype.walk = function()
{
	console.log();
	if(isToLeft(this)){
		this.setCurrentAnimation("playerLeft");	
	}
	else if(isToRight(this)){
		this.setCurrentAnimation("playerRight");
	}
	else if(isToUp(this)){
		this.setCurrentAnimation("playerUp");	
	}
	else if(isToDown(this)){
		this.setCurrentAnimation("playerDown");
	}
}

/*获取目标方向值*/
var getExplore = function(obj,map)
{
	if(isToRight(obj))
	{
		var posValue = map.getPosValue(obj.x + obj.width,obj.y);
		return posValue ;
	}
	if(isToLeft(obj))
	{
		var posValue = map.getPosValue(obj.x - obj.moveSpeed,obj.y);
		return posValue ;
	}
	if(isToUp(obj))
	{
		var posValue = map.getPosValue(obj.x,obj.y-obj.moveSpeed);
		return posValue ;
	}
	if(isToDown(obj))
	{
		var posValue = map.getPosValue(obj.x,obj.y+obj.height);
		return posValue ;
	}   
}

/*判断是否可以向某方向移动*/
var canRight = function(obj,map)
{
	var posValue = map.getPosValue(obj.x + obj.width,obj.y);
	return (posValue == 0 );
}
var canLeft = function(obj,map){
	var posValue = map.getPosValue(obj.x - obj.moveSpeed,obj.y);
	return (posValue == 0 );
}
var canUp = function(obj,map){
	var posValue = map.getPosValue(obj.x,obj.y-obj.moveSpeed);
	return (posValue == 0 );
}
var canDown = function(obj,map){
	var posValue = map.getPosValue(obj.x,obj.y+obj.height);
	return (posValue == 0 );
}
/*	判断朝向是否为某方向	*/
var isToRight = function(obj) { return obj.angle == 0  ; }
var isToLeft  = function(obj) { return obj.angle == 180; }
var isToUp    = function(obj) { return obj.angle == 90 ; }
var isToDown  = function(obj) { return obj.angle == 270; }

/*	判断是否能探索当前方向	*/
var canExplore = function(obj,map)
{
	if(isToRight(obj))
	{
		var posValue = map.getPosValue(obj.x + obj.width,obj.y);
		return ( posValue > 3 );
	}
	if(isToLeft(obj))
	{
		var posValue = map.getPosValue(obj.x - obj.moveSpeed,obj.y);
		return ( posValue > 3 );
	}
	if(isToUp(obj))
	{
		var posValue = map.getPosValue(obj.x,obj.y-obj.moveSpeed);
		return ( posValue > 3);
	}
	if(isToDown(obj))
	{
		var posValue = map.getPosValue(obj.x,obj.y+obj.height);
		return ( posValue > 3);
	}   
}

/*获取目标方向坐标*/
var getExplorePosition = function(obj,map)
{
	if(!obj){return;}
	if(isToRight(obj)){
		return map.getCurrentIndex(obj.x + obj.width,obj.y);
	}
	else if(isToLeft(obj)){
		return map.getCurrentIndex(obj.x - obj.moveSpeed,obj.y);
	}
	else if(isToUp(obj)){
		return map.getCurrentIndex(obj.x,obj.y-obj.moveSpeed);
	}
	else if(isToDown(obj)){
		return map.getCurrentIndex(obj.x,obj.y+obj.height);
	}
}

/*判断当前移动方向是否为门*/
var isToDoor = function(obj,direction,map)
{
	if(!obj){return;}
	if(direction == "right"){
		obj.angle = 0;
		var posValue = map.getPosValue(obj.x + obj.width,obj.y);
		return ( posValue == 2 );
	}
	else if(direction == "left"){
		obj.angle = 180; 
		var posValue = map.getPosValue(obj.x - obj.moveSpeed,obj.y);
		return ( posValue == 2 );
	}
	else if(direction == "up"){
		obj.angle = 90; 
		var posValue = map.getPosValue(obj.x,obj.y-obj.moveSpeed);
		return ( posValue == 2);
	}
	else if(direction == "down"){
		obj.angle = 270;
		var posValue = map.getPosValue(obj.x,obj.y+obj.height);
		return ( posValue == 2);
	}
	return false;
}

/*	判断对象是否在地图内	*/
var isInnerMap = function(obj){
	return obj.x >= 0 && obj.x <= HTMLGame.width - obj[i].width && obj[i].y >= 0&&obj[i].y<=HTMLGame.height - obj[i].height;
}

/*	向不同方向移动的函数	*/
var move=function(obj,direction)
{
	if(!obj){ return; }
	if(direction == "right"){
		obj.speedX = obj.moveSpeed;
		obj.speedY = 0;
	}
	else if(direction == "left"){
		obj.speedX = -obj.moveSpeed;
		obj.speedY = 0;
	}
	else if(direction == "up"){
		obj.speedY = -obj.moveSpeed;
		obj.speedX = 0;
	}
	else if(direction == "down"){
		obj.speedY = obj.moveSpeed;
		obj.speedX = 0;
	}
	else if(direction == "stop"){
		obj.speedY = 0;
		obj.speedX = 0;
	}
}

/*	检测是否可移动，可以则移动	*/
var detectMove = function(obj,dir,map){
	if(!obj){
		return;
	}
	if(map.isMatchCell(obj))
	{//使player保持与格子重合
	    if(dir == "right") 
		{
			if(canRight(obj,map)) 
			{
				move(obj,"right");
			}
			else      
			{ move(obj,"stop");}
		}
		else if(dir == "left")
		{
			if(canLeft(obj,map))
			{  
				move(obj,"left"); 
			}
			else { move(obj,"stop");}				
		}
		else if(dir=="up")
		{
			if(canUp(obj,map))
			{ 
				move(obj,"up");
			}
			else {move(obj,"stop");}	
		}
		else if(dir=="down")
		{
			if(canDown(obj,map))
			{
				move(obj,"down");
			}	
			else {move(obj,"stop");}					
		}
		else {
			move(obj,"stop");
		}	
	}
}

var gameObj = (function()
{
	return{
		/*	初始化	*/
		initialize : function(options)
		{
			srcObj = options.srcObj;
			this.mapN = options.mapN;
			currentmap = options.mapN;
			this.mapchange = options.mapchange;
			this.map = new HTMLGame.Map (options.mapMatrix,{cellSize:[40,40]});
			$('#backgroundCanvas')[0].getContext('2d').drawImage(HTMLGame.pictureLoader.loadedImgs[srcObj.bgSrc],0,0,HTMLGame.width,HTMLGame.height);
			this.player = new player({src:srcObj.playerSrc,width: 40,height: 40,x: 40*playerPosition[0],y :40*playerPosition[1]});
			this.player.initialize();
			HTMLGame.spriteList.add(this.player) ;
		},
		/*	切换地图	*/
		toMap : function(mapNumber){
			this.end();
			if(mapNumber < 17)
			{
				MapManager.startMap(mapNumber);
			}
			else
			{	
			
			}
		},
		/*	更新	*/
		update:function(duration){
			var direction;
			var list = HTMLGame.spriteList;
			var _map = this.map;
			var _player = this.player;
			//键盘控制player的移动和探索
			if(gameStaus == 1)
			{
				if(HTMLGame.input.isPressed("right")){
					keyLast = 0;
					direction = "right";
				}
				else if(HTMLGame.input.isPressed("left")){
					keyLast = 0;
					direction="left";
				}
				else if(HTMLGame.input.isPressed("up")){
					keyLast = 0;
					direction="up";
				}
				else if(HTMLGame.input.isPressed("down")){
					keyLast = 0;
					direction="down";
				}
				else if(HTMLGame.input.isPressed("x") && _map.isMatchCell(_player)){
					if(keyLast > keyDuration)
					{
						direction = "stop";
						gameStaus = 3;
						keyLast = 0;
						showItemList();
					}
					
				}
				else if(HTMLGame.input.isPressed("z") && _map.isMatchCell(_player)){
					if(canExplore(_player,_map) && keyLast > keyDuration)
					{
						direction = "stop";
					    gameStaus = 2;
						keyLast = 0;
						targe = getExplore(_player,_map);
						investigate.map[currentmap - 1].mapevent[targe - 4].check();
					}
				}
				if(isToDoor(_player,direction,_map)) /*移动方向是否为门*/
				{
					if(this.mapchange.length == 1)
					{
						playerPosition = this.mapchange[0].newposition;
						this.toMap(this.mapchange[0].newmap);
						return;
					}
					else
					{
						var currentPosition = getExplorePosition(_player,_map);
						for(var i = 0;i < this.mapchange.length;i++)
						{
							if(currentPosition[0] == this.mapchange[i].leavepostion[0] &&
							   currentPosition[1] == this.mapchange[i].leavepostion[1] ) 
							{
								playerPosition = this.mapchange[i].newposition;
								this.toMap(this.mapchange[i].newmap);
								return;
							}
						}
					}
				}
				else{
				detectMove(_player,direction,_map);}
				keyLast += duration;
			}
			else if(gameStaus == 2)
			{
				if(HTMLGame.input.isPressed("z"))
				{
					if(keyLast > keyDuration)
					{
						keyLast = 0;
						if($('#information').find('.information1').length > 0)
						{
							investigate.map[currentmap - 1].mapevent[targe - 4].Staus += ($('#information').find('.information1').prev().length + 1);
						}
						investigate.map[currentmap - 1].mapevent[targe - 4].check();
					}
				}
				else if(HTMLGame.input.isPressed("x"))
				{
					if(keyLast > keyDuration)
					{
						showItemList();
						LastStaus = 2;
						gameStaus = 3;
						keyLast = 0;
					}
				}
				else if(HTMLGame.input.isPressed("up") || HTMLGame.input.isPressed("down"))
				{
					if(keyLast > keyDuration)
					{
						keyLast = 0;
						changeinformation();
					}
				}
				keyLast += duration;
			}
			else if(gameStaus == 3 )
			{
				if(HTMLGame.input.isPressed("x"))
				{
					if(keyLast > keyDuration)
					{
						closeItemList();
						gameStaus = LastStaus ;
						LastStaus = 1;
						keyLast = 0;
					}
				}
				else if(HTMLGame.input.isPressed("z") && LastStaus == 1 && canExplore(_player,_map) && currentItemNumber > 0)
				{
					if(keyLast > keyDuration)
					{
						keyLast = 0;
						targe = getExplore(_player,_map);
						useItem();
					}
				}
				else if(HTMLGame.input.isPressed("right"))
				{
					if((keyLast > keyDuration) && stressItem < (currentItemNumber - 1))
					{
						keyLast = 0;
						stressItem ++;
						stressedThisItem();
					}
				}
				else if(HTMLGame.input.isPressed("left"))
				{
					if((keyLast > keyDuration) && stressItem > 0)
					{
						keyLast = 0;
						stressItem --;
						stressedThisItem();
					}
				}
				else if(HTMLGame.input.isPressed("up"))
				{
					if((keyLast > keyDuration) && stressItem > 3)
					{
						keyLast = 0;
						stressItem -= 4;
						stressedThisItem();
					}
				}
				else if(HTMLGame.input.isPressed("down"))
				{
					if((keyLast > keyDuration) && stressItem < (currentItemNumber - 4))
					{
						keyLast = 0;
						stressItem += 4;
						stressedThisItem();
					}
				}
				keyLast += duration;
			}
			else if(gameStaus == 4)
			{
				if(HTMLGame.input.isPressed("z")){
					if(keyLast > keyDuration){
						keyLast = 0;
						closeItemList();
						showItemList();
						gameStaus = 3;
					}	
				}
				keyLast += duration;
			}
			else if(gameStaus == 5)
			{
				if(HTMLGame.input.isPressed("z")){
					if(keyLast > keyDuration){
						keyLast = 0;
						closegetItem();
					}	
				}
				keyLast += duration;
			}
			else if(gameStaus == 6)
			{
				if(HTMLGame.input.isPressed("c")){
					if(keyLast > keyDuration){
						keyLast = 0;
						mypassword = getPassWord();
					}	
				}
				keyLast += duration;
			}
			list[0].walk();
			
		},
		/*	画出实时地图	*/
		draw:function(){
		},
		/*	结束游戏	*/
		end:function(){
			HTMLGame.loop.end();

		}
	}
})();

/*	开始界面对象	*/
var startObj={
	initialize:function(options){
		var name="";
		var begin="";
		var state1="";
		var state2="";
		this.startSrc=options.srcObj.startSrc;
		this.text1=HTMLGame.shape.Text(name,{x:200,y:150,style:"#000",font:"bold 36px sans-serif"});
		this.text2=HTMLGame.shape.Text(begin,{x:160,y:240,style:"#000",font:"bold 32px sans-serif"});
		this.text3=HTMLGame.shape.Text(state1,{x:40,y:310,style:"#000",font:"bold 15px sans-serif"});
		this.text4=HTMLGame.shape.Text(state2,{x:120,y:330,style:"#000",font:"bold 15px sans-serif"});
		HTMLGame.input.onKeyDown("enter",function(){
			if(gameStaus ==0 ){
				var playerPosition=[3,11];
				MapManager.startMap("1");
				gameStaus = 1;
			}
		});
	},
	draw:function(){
		HTMLGame.context.drawImage(HTMLGame.pictureLoader.loadedImgs[this.startSrc],0,0,HTMLGame.width,HTMLGame.height);//画出开始界面
		this.text1.draw();
		this.text2.draw();
		this.text3.draw();
		this.text4.draw();
	}
}


var keyzdown1 = function(mapN)
{
	investigate.map[mapN - 1].mapevent[targe - 4].check();
};
