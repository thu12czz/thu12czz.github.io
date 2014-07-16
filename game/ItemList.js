var stressItem = 0 ;
var currentItemNumber = 0 ;
var mirrorFlag = false;
var Itemlistcheck = [0,0,0,0,
					0,0,0,0,
					0,0,0,0,
					0,0,0,0];	
var getItem = function(NUM)
{
	var len = NUM.length
	for(var i = 0 ;i<len;i++)
	{
		ItemList[NUM[i][0]].number+=NUM[i][1];
		if(NUM[i][1] ==0){ItemList[NUM[i][0]].number = 0;}
		if(NUM[i][1] > 0)
		{
			$('#prompt').append('<p>获得 '+ItemList[NUM[i][0]].name+'</p>')
		}
		else
		{
			$('#prompt').append('<p>失去 '+ItemList[NUM[i][0]].name+'</p>')
		}
		
	}
	if(len == 1){$('#prompt').attr('style','height:40px;opacity:1;');}
	else if(len == 2) {$('#prompt').attr('style','height:60px;opacity:1;');}
	else if(len == 3) {$('#prompt').attr('style','height:80px;opacity:1;');}
	LastStaus = gameStaus;
	gameStaus = 5;
} 

var closegetItem =function()
{
	$('#prompt').attr('style','opacity:0;');
	$('#prompt').empty();
	if(LastStaus == 3 || LastStaus == 4)
	{
		closeItemList();
		showItemList();
		LastStaus = 3;
	}
	gameStaus = LastStaus;
	if(LastStaus = 3)
	{
		LastStaus = 1
	};
}
var showItemList = function()
{
	$('#item').attr('style','opacity:1;');
	for(var i = 0 ; i < ItemList.length ; i++)
	{
		if(ItemList[i].number > 0)
		{
			$('#item').find('td:eq(' + currentItemNumber +')').append('<p>' + ItemList[i].name +' *'+ ItemList[i].number + '</p>');
			Itemlistcheck[currentItemNumber] = i + 1;
			currentItemNumber++;
		}
	}
	if(currentItemNumber > 0)
		stressedThisItem();
	else
	{
		$('#item').find('td:eq(0)').append('<p>什么也没有</p>');
	}
}

var stressedThisItem = function()
{
	stressItem = stressItem % currentItemNumber;
	$('#item').find('td').removeAttr('class'); 
	$('#item').find('td:eq(' + stressItem +')').attr('class','information1');
	showItemInformation(ItemList[Itemlistcheck[stressItem] - 1].description);
}

var closeItemList = function()
{
	currentItemNumber = 0 ;
	stressItem = 0;
	$('#item').attr('style','opacity:0;');
	$('#item').find('td').empty();
	clearIteminfomation();
}

var clearIteminfomation = function()
{
	$('#Iteminformation').attr('style','opacity:0;')
	gameStaus = 1;
	$('#Iteminformation').empty();
}

var showItemInformation = function(inf)
{
	$('#Iteminformation').attr('style','opacity:1;')
	$('#Iteminformation').empty();
	$('#Iteminformation').append('<p>' + inf+ '</p>');
}

var useItem = function(){
	if(Itemlistcheck[stressItem]  == 1 && targe == 6 && currentmap == 1){
		showItemInformation("向瓶子里灌满了水。");
		Itemchangetest=[];
		gameStaus = 4;
		getItem([[0,-1],[1,1]]);
	}
	else if(Itemlistcheck[stressItem] == 2 && targe == 7 && currentmap == 2){
		if(investigate.map[1].mapevent[3].flag == 0){
			showItemInformation("把水全部倒在酒坛里面了，但是似乎没有什么变化");
			investigate.map[1].mapevent[3].flag ++; 
			gameStaus = 4;
			getItem([[0,1],[1,-1]]);
		}
		else{
			showItemInformation("又倒进去了一瓶水，好像上浮了一些，嗯，够到了.");
			investigate.map[1].mapevent[3].flag ++; 
			gameStaus = 4;
			getItem([[0,1],[1,-1],[6,1]]);
		}
	}
	else if(Itemlistcheck[stressItem] == 2 && targe == 8 && currentmap == 1){
		if(investigate.map[0].mapevent[4].flag == 0){
			showItemInformation("小熊说:有水!得救了!");
			investigate.map[0].mapevent[4].flag ++; 
			gameStaus = 4;
			getItem([[1,-1]]);
		}
	}
	else if(Itemlistcheck[stressItem] == 3 && targe == 7 && currentmap == 15){
		if(ItemList[2].number == 4 && ItemList[12].number){
			showItemInformation("看起来正好，用这个粘合剂的话。成功了，镜子被拼好了。");
			mirrorFlag = true;
			gameStaus = 4;
			getItem([[2,-4],[12,-1]]);
			investigate.map[15].mapevent[3].flag = 1;
			
		}
		else{
			showItemInformation("看起来这些碎片应该是这个镜子的。不过，貌似缺了一点什么。");
		}
	}
	else if(Itemlistcheck[stressItem]== 6 && targe == 8 && currentmap == 10){
		if(investigate.map[9].mapevent[4].flag == 2){
			showItemInformation("用水清洗了一下手镯...没想到这个手镯原来这么漂亮啊，这一定很值钱！");
			gameStaus = 4;
			getItem([[5,-1],[11,1]]);
		}
		else{
			return;
		}
	}
	else if(Itemlistcheck[stressItem] == 9 && targe == 4 && currentmap == 8){
		showItemInformation("给钢琴加上这个发条之后，似乎钢琴能正常运作了。");
		investigate.map[7].mapevent[0].flag = 1;
		gameStaus = 4;
		getItem([[8,-1]]);
	}
	else if(Itemlistcheck[stressItem] == 11 && targe == 8 && currentmap == 10){
		if(investigate.map[9].mapevent[4].flag == 0){
			showItemInformation("用螺丝刀把水龙头拧了下来，嗯，原来里面卡了一把钥匙。");
			investigate.map[9].mapevent[4].flag = 1;
			gameStaus = 4;
			getItem([[7,1]]);
		}
		else if(investigate.map[9].mapevent[4].flag == 1){
			showItemInformation("再次用螺丝刀把水龙头拧了回去，我想这次能正常工作了吧。");
			investigate.map[9].mapevent[4].flag = 2;
			gameStaus = 4;
		}
	}
	else if(Itemlistcheck[stressItem] == 12&& targe == 7 && currentmap == 11){
		if(investigate.map[10].mapevent[3].flag == 1){
			showItemInformation("啊，这个就是我的手镯，太谢谢你了。你帮了我这么多忙，我该如何感谢你才好啊….对了这个送给你吧");
			investigate.map[10].mapevent[3].flag = 2;
			gameStaus = 4;
			getItem([[12,1],[11,-1]]);
		}
	}
	else if(Itemlistcheck[stressItem] == 14 && targe == 5 && currentmap == 7){
		if(ItemList[15].number){
			alert("恭喜通关游戏，达成NORMAL END");
		}
		else{
			alert("恭喜通关游戏，达成BAD END");
		}
	}
	else if(Itemlistcheck[stressItem] == 15 ){
		if(ItemList[4].number == 7){
			showItemInformation("没错，我想起来了。这就是Florent的项链。用这根线把之前的珍珠串起来，F L O R E N T，可是Florent你现在究竟在哪里啊！");
			gameStaus = 4;
			getItem([[4,-7],[14,-1],[15,1]]);
		}
	}
}




var ItemList = [
		{
			name: "空瓶子",
			description: "空空的玻璃瓶子，似乎可以装一些水。",
			number: 0
		},
		{
			name: "装水的瓶子",
			description: "装满了水的瓶子，应该可以用来做点什么。",
			number: 0
		},
		{
			name: "镜子碎片",
			description: "看起来是一面镜子的碎片，似乎很锋利，小心不要割到手了。",
			number: 0
		},
		{
			name: "古老的钥匙",
			description: "一枚古老的钥匙，看起来可以打开这扇门。",
			number: 0
		},
		{
			name: "珍珠",
			description: "璀璨夺目的珍珠，它的光芒似乎在闪耀。仔细一看，每个珍珠上还刻着一个字母。",
			number: 0
		},
		{
			name: "被红酒染污的手镯",
			description: "被红酒染污的手镯....不知道它原来好不好看，反正现在挺难看的。",
			number: 0
		},
		{
			name: "黄色的钥匙",
			description: "一枚黄色的钥匙，尺寸很小，应该不是用来开门的。",
			number: 0
		},
		{
			name: "铜色的钥匙",
			description: "铜色的钥匙，应该可以用来打开一扇门。不过到底是哪一扇呢？",
			number: 0
		},
		{
			name: "机械发条",
			description: "一根发条，看起来是某个机械的部件。如果没有了这根发条，我想那个机械就不能正常运转了吧。",
			number: 0
		},
		{
			name: "餐厅的钥匙",
			description: "一枚普通的钥匙，用来打开餐厅的门，嗯，不会有错的。",
			number: 0
		},
		{
			name: "螺丝刀",
			description: "一把做工精致的螺丝刀，手把上还绑了防滑手胶。",
			number: 0
		},
		{
			name: "闪闪发光的手镯",
			description: "这是刚才的那个手镯吗....看起来太漂亮了！",
			number: 0
		},
		{
			name: "粘合剂",
			description: "一瓶粘合剂，应该可以把某些破碎的东西复原。",
			number: 0
		},
		{
			name: "大门钥匙",
			description: "打开玄关那扇大门的钥匙，用了这个就能从这里离开了吧。",
			number: 0
		},
		{
			name: "线",
			description: "一条很细的线，应该可以把那些东西串起来了。",
			number: 0
		},
		{
			name: "珍珠项链",
			description: "一串璀璨夺目的珍珠项链，上面铭刻着：FLORENT",
			number: 0
		}
	]
	
