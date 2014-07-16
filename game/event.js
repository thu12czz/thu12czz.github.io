var mypassword = '';

var clearinfomation = function()
{
	$('#information').attr('style','opacity:0;')
	$('#information').empty();
	gameStaus = 1;
}

var showInformation = function(inf)
{
	$('#information').attr('style','opacity:1;')
	$('#information').empty();
	$('#information').append('<p>' + inf+ '</p>');
}

var getChoose = function(inf1,inf2)
{
	$('#information').attr('style','opacity:1;')
	$('#information').empty();
	$('#information').append('<p>' + inf1+ '</p>');
	$('#information').append('<p>' + inf2+ '</p>');
	$('#information').find('p:eq(0)').attr('class','information1');
}

var changeinformation = function()
{
	redinfomation = $('#information').find('.information1');
	redinfomation.removeAttr('class'); 
	redinfomation.siblings().attr('class','information1');
	redinfomation.attr('class','information2');
}


var submitPassword = function()
{
	var inPass = document.getElementById("password").value;
	return inPass;
}

var checkForm = function()
{
	if((event.keyCode >= 48)&&(event.keyCode <= 57)&&(document.getElementById("password").value.length <= 3))
	{
		event.returnValue = true;
	}
	else{
		event.returnValue = false;
	}
}

var showPassDiv = function()
{
	$('#inputPassword').attr('style','opacity:1;');
	gameStaus = 6;
}

var getPassWord = function()
{
	gameStaus = 2;
	$('#inputPassword').attr('style','opacity:0;');
	return submitPassword();
}


var investigate = {
	map:[
		//地图0: 地下一层-仓库
		{
			mapevent:[
			{
				name: "瓶子",
				flag: 0,
				Staus: 0,
				check: function(){
						if(this.flag == 0){
							if(this.Staus == 0){
								showInformation("地板上摆放着一些空瓶子，要拿走一个吗？");
								this.Staus = 1;
							}
							else if(this.Staus == 1){
								getChoose("带走一个吧","算了")
							}
							else if(this.Staus == 2){
								this.Staus = 0;
								clearinfomation();
								this.flag ++;
								getItem([[0,1]]);
							}
							else{
								this.Staus = 0;
								clearinfomation()
							}
						}
						else{
							if(this.Staus == 0) {
								this.Staus = 1;
								showInformation("地上摆着几个空瓶子。");
							}
							else{
								this.Staus = 0;
								clearinfomation();
							}
						}
					}
			},
			{
				name: "碎片",
				flag: 0,
				Staus: 0,
				check: function(){
						if(this.flag == 0){
							if(this.Staus == 0){
								showInformation("地上散落着一些碎片，看样子是玻璃的碎片。嗯，还是不要管了，扎伤手就不好了。");
								this.Staus = 1
							}
							else{	
							    clearinfomation();
								this.flag = 1;
								this.Staus = 0;
							}
						}
						else if(this.flag == 1){
							if(this.Staus == 0){
								showInformation("地上散落着一些碎片，应该是玻璃的碎片吧。嗯？这一块看起来好奇怪。似乎是镜子的碎片……..");
								this.Staus = 1
							}
							else{	
							    clearinfomation();
								this.flag = 2;
								this.Staus = 0;
								getItem([[2,1]]);
							}
						}
						else{
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("地上散落着一些碎片，嗯，现在应该都是玻璃碎片了，没什么奇怪的。");
							}
							else{
								clearinfomation();
								this.Staus = 0;
							}
						}
					}
			},
			{
				name: "盆",
				flag: 0,
				Staus: 0,
				check: function(){
						if(this.flag == 0){
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("盆里的水看起来很清澈，应该可以饮用.");
							}
							else{
								clearinfomation();
								this.Staus = 0;
							}
						}
						else{
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("盆里的水看起来很清澈.");
							}
							else{
								clearinfomation();
								this.Staus = 0;
							}
						}
					}
			},
			{
				name: "墙上的纸片",
				flag: 0,
				Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;
						showInformation("仓库");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "小熊",
				flag: 0,
				Staus: 0,
				check: function(){
						if(this.flag == 0){
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("渴，渴。我好渴.....");
							}
							else{
								clearinfomation();
								this.Staus = 0;
								}
						}
						else if(this.flag == 1){
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("对了，差点忘记说谢谢了。给，你的瓶子，还给你。");
							}
							else if(this.Staus == 1){
								showInformation("说完，小熊就变得一动不动….刚才它真的和我说话了吗？");
								getItem([[0,1],[3,1]]);
								this.Staus++;
							}
							else {
								clearinfomation();
								this.Staus = 0;
								this.flag= 2;
							}
						}
						else{
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("小熊保持着沉默….");
							}
							else {
								clearinfomation();
								this.Staus = 0;
							}
						}
					}
			},
			{
				name: "门",
				flag: 0,
				Staus: 0,
				check: function(){
						if(this.flag == 0){
							if(ItemList[3].number > 0){
								if(this.Staus == 0){
									this.Staus = 1;
									showInformation("看起来很古老的一扇门…用这把钥匙应该能打开…好的，门开了。");
								}
								else{
									clearinfomation();
									this.Staus = 0;
									this.flag = 1;
									map1.mapMatrix[4][4] = 2;
								}
							}
							else{
								if(this.Staus == 0){
									this.Staus = 1;
									showInformation("看起来很古旧的一扇门…..虽然上锁了，但是好像可以撞开，要试试看吗？");
								}
								else if(this.Staus == 1){
									getChoose("是","否")}
								else if(this.Staus == 2){
									this.flag = 1;
									map1.mapMatrix[4][4] = 2;
									investigate.map[0].mapevent[1].flag = 2;
									investigate.map[0].mapevent[4].flag = 2;
									clearinfomation();
									this.Staus = 0;
								}
								else{
									clearinfomation();
									this.Staus = 0;
								}
							}
						}
					}
			},
			{
				name: "隐藏的箱子",
				flag: 0,
				Staus: 0,
				check: function(){
						if(this.flag == 0){
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("这里摆放着一个箱子，似乎可以打开。要打开看看么？");
							}
							else if(this.Staus == 1){
								getChoose("打开看看吧","还是算了");
							}
							else if(this.Staus == 2){
								showInformation("里面是空的。");
								this.Staus =4;
							}
							else if(this.Staus == 3){
								clearinfomation();
								this.Staus = 0;
							}
							else
							{
								this.flag = 1;
								this.Staus =0;
								clearinfomation();
							}
						}
						else{
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("这里放着一个箱子，里面空空如也");
							}
							else{
								clearinfomation();
								this.Staus = 0;
							}
						}
					}
			},
			{
				name: "地上的纸片",
				flag: 0,
				Staus: 0,
				check: function(){
						if(this.flag == 0){
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("所谓记忆，即是第二次的体验。");
							}
							else{
								clearinfomation();
								this.Staus = 0;
								this.flag = 1;
							}
						}
						else{
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("璀璨的七子之光于手中闪耀之时，方能开启尘封的回忆。");
							}
							else{
								clearinfomation();
								this.Staus = 0;
								this.flag = 1;
							}
						}
					}
			},
			{
				name: "抽屉柜",
				flag: 0,Staus: 0,
				check: function(){
						if(this.flag == 0){
							if(ItemList[4].number == 7){
								if(this.Staus == 0){
									this.Staus = 1;
									showInformation("抽屉上的灰尘都不见了！那么….打开了！……这，这是……");
								}
								else{
									clearinfomation();
									this.Staus = 0;
									this.flag = 1;
									getItem([[14,1]]);
								}
							}
							else{
								if(this.Staus == 0){
									this.Staus = 1;
									showInformation("这个抽屉似乎很久都没有人用过了，果然，打不开。");
								}
								else{
									clearinfomation();
									this.Staus = 0;
								}
							}
						}
						else{
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("抽屉里现在是空的了。");
							}
							else{
									clearinfomation();
									this.Staus = 0;
							}
						}
					}
			}
			]
		},
		//地图1：地下一层-闲置的房间
		{
			mapevent:[
			{
				name: "墙上的纸片",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;
						showInformation("闲置的房间");
						}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "书架",
				flag: 0,Staus: 0,
				check: function(){
						if(this.flag == 0){
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("书架上摆满了书，我看看….《javascript入门》，《AJAX应用实例》….这都什么乱七八糟的，我还是别看了。这里似乎有什么在发光?");
							}
							else{
								clearinfomation();
								this.Staus = 0;
								this.flag ++;
								getItem([[4,1]]);
							}
						}
						else{
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("书架上摆满了书….算了，我还是别看了，免得头疼。");
							}
							else{
								clearinfomation();
								this.Staus = 0;
							}
						}
					}
			},
			{
				name: "地上的酒瓶",
				flag: 0,Staus: 0,
				check: function(){
						if(this.flag == 0){
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("地上有一个被打翻的酒瓶….看起来是喝醉了之后打翻的吧，不过力道好像不大，瓶子都没有碎….嗯？这是什么….");
							}
							else{
								clearinfomation();
								this.Staus = 0;
								this.flag = 1;
								getItem([[5,1]]);
							}
						}
						else{
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("地上有一个打翻的酒瓶…");
							}
							else{
								clearinfomation();
								this.Staus = 0;
							}
						}
					}
			},
			{
				name: "空酒坛",
				flag: 0,Staus: 0,
				check: function(){
						if(this.flag < 2){
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("一个被打开的酒坛，里面好像有什么东西在发光…….差一点….够不着…..");
							}
							else{
								clearinfomation();
								this.Staus = 0;
							}
						}
						else{
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("一个被打开的酒坛….");
							}
							else{
								clearinfomation();
								this.Staus = 0;
							}
						}
					}
			},
			{
				name: "箱子",
				flag: 0,Staus: 0,
				check: function(){
						if(this.flag == 0){
							if(ItemList[6].number){
								if(this.Staus == 0){
									this.Staus = 1;
									showInformation("似乎用这把黄色的钥匙可以打开，嗯，打开了，这个是…");
								}
								else{
									clearinfomation();
									this.Staus = 0;
									this.flag = 1;
									getItem([[2,1]]);
								}
							}
							else{
								if(this.Staus == 0){
									this.Staus = 1;
									showInformation("这个箱子上锁了。");
								}
								else{
									clearinfomation();
									this.Staus = 0;
								}
							}
						}
						else{
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("箱子里面是空的。");
							}
							else{
								clearinfomation();
								this.Staus = 0;
							}
						}
					}
			},
			{
				name: "地上的纸片",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;
						showInformation("乌鸦亦能饮水，况乎人哉？");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "床",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;
						showInformation("一张床….看起来很舒服的样子，真想在这里睡一觉…..不，不行，我还有事情要去做。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			}
			]
		},
		//地图2：地下一层-走廊
		{
			mapevent:[
			{
				name: "画",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;
						showInformation("画上的女人看起来好眼熟….到底是谁呢？……不行，想不起来。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "墙上的纸条",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;
						showInformation("地下一层");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			}
			]
		},
		//地图3：一层-右侧走廊
		{
			mapevent:[
			{
				name: "墙上的画",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;
						showInformation("画着一个男人，看起来很幸福的样子。不过不知道为什么，看起来似乎也很眼熟。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "门1",
				flag: 0,Staus: 0,
				check: function(){
						if(this.flag == 0){
							if(this.Staus == 0){
							this.Staus = 1;
							showInformation("好像从里面反锁了，打不开…");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
				}
			},
			{
				name: "门2",
				flag: 0,Staus: 0,
				check: function(){
						if(this.flag == 0){
							if(ItemList[7].number > 0){
								if(this.Staus == 0){
									this.Staus = 1;
									showInformation("这个门用这把铜色的钥匙应该可以打开...好的，门开了。");
									map4.mapMatrix[3][11] = 2;
								}
								else{
									clearinfomation();
									this.Staus = 0;
									this.flag = 1;
								}
							}
							else{
								if(this.Staus == 0){
									this.Staus = 1;
									showInformation("这个门上锁了，打不开….");
								}
								else{
									clearinfomation();
								this.Staus = 0;
								}
							}
						}
					}
			}
			]
		},
		//地图4：一层-客房
		{
			mapevent:[
			{
				name: "床",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;
						showInformation("看起来很温馨的双人床");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}	
				}
			},
			{
				name: "梳妆台",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0){
						if(this.Staus == 0){
							showInformation("看起来是一个梳妆台。这里有一颗珍珠，要拿走吗？");
							this.Staus = 1;
						}
						else if(this.Staus == 1){
							getChoose("拿走吧","随便拿别人的东西不太好")
						}
						else if(this.Staus == 2){
							this.Staus = 0;
							clearinfomation();
							this.flag = 1;
							getItem([[4,1]]);
						}
						else{
							this.Staus = 0;
							clearinfomation()
						}
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;
							showInformation("看起来是一个梳妆台。");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}	
					}
				}
			},
			{
				name: "书架",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;
						showInformation("书架上有好多书….有《爆米花制作教程》！可惜，现在可没功夫看…");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "墙上的纸片",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;
						showInformation("一层-客房");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "地上的纸片",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;
						showInformation("言双实单，盖因.....");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "箱子",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0)
					{
						if(this.Staus == 0){
							this.Staus = 1;
							showInformation("这个箱子上锁了，需要密码才能打开…密码是多少来着？");
						}
						else if(this.Staus == 1)
						{
							showPassDiv()
							this.Staus++;
						}
						else if(this.Staus == 2)
						{
							if(mypassword == "404")
							{
								showInformation("打开了！里面有什么东西");
								this.Staus++;
								mypassword='';
							}
							else{
								showInformation("这个密码好像不对");
								this.Staus = 4;
							}
						}
						else if(this.Staus == 3)
						{
							this.flag = 1;
							this.Staus = 0;
							clearinfomation();
							getItem([[2,1]]);
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;
							showInformation("这个箱子现在是空的了");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
				}
			},
			{
				name: "抽屉柜",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0)
					{
						if(this.Staus == 0){
							this.Staus = 1;
							showInformation("这个抽屉柜没上锁，里面有一把螺丝刀");
						}
						else{
							clearinfomation();
							this.Staus = 0;
							this.flag  = 1;
							getItem([[10,1]]);
						}
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;
							showInformation("这个抽屉现在是空的了。");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
				}
			},
			{
				name: "衣柜",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;
						showInformation("这是一个衣柜，不过里面是空的");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			}
			]
		},
		//地图5：一层-书房
		{
			mapevent: [
			{
				name: "墙上的纸条",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("书房");	
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}		
			},
			{
				name: "桌椅",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("看起来很舒适的桌椅，坐在这里读书一定很惬意。等等，这个桌子上有一枚珍珠");
						}
						else{
							clearinfomation();
							this.Staus = 0;
							this.flag = 1;
							getItem([[4,1]]);
						}
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;	
					    	showInformation("看起来很舒适的桌椅，坐在这里读书一定很惬意。");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
				}
			},
			{
				name: "墙上的书",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("我看看，《程序设计基础》《21天掌握C语言》，天哪，我还是别看了。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}			
				}
			},
			{
				name: "双格书柜",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("我看看，《程序设计基础》《21天掌握C语言》，天哪，我还是别看了。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "上方单格书柜",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("这里也有很多书的样子，要挑一本看看吗？")
					}
					else if(this.Staus == 1){
						getChoose("就这本了","还是算了吧");
					}
					else if(this.Staus == 2){
						showInformation('很久很久以前，在一个美丽的春天，森林里的动物准备举办一次联谊晚会。“夜莺先生，夜莺先生，你的演奏什么时候开始啊？”可爱的小兔子问道。');
						this.Staus = 4;
					}
					else if(this.Staus == 4){
						showInformation('“别急别急，这个节目完了，再表演完两个节目，就是我来演奏了”，夜莺先生回答道。“那还得等很久啊，我都等不及了”，小兔子又问道。');
						this.Staus ++;
					}
					else if(this.Staus == 5){
						showInformation('“别急嘛，小兔子，这个节目都表演到一半了，每个节目才四分钟而已”，夜莺先生回答道。“嗯，我会耐心等的”，小兔子说完又开始和夜莺先生一起欣赏起节目了。');
						this.Staus ++;
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "下方单格书柜",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("这里也有很多书的样子，要挑一本看看吗？")
					}
					else if(this.Staus == 1){
						getChoose("就这本了","还是算了吧");
					}
					else if(this.Staus == 2){
						showInformation('在网页语言中，我们经常用一些数字，来表示指定的状态。');
						this.Staus = 4;
					}
					else if(this.Staus == 4){
						showInformation('常见的有： 200，正确返回；404，找不到对象；407，要求身份验证；500，服务器内部错误；502，网关错误等。记住这些常出现的现象，有助于快速解决面临的问题。');
						this.Staus ++;
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "地上的书",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("这里也有很多书的样子，要挑一本看看吗？")
					}
					else if(this.Staus == 1){
						getChoose("读读看吧","还是算了吧")
					}
					else if(this.Staus == 2){
						showInformation('有关灵魂现象的研究：一般而言，当一个人离开这个世界之后，他的灵魂依然会在现世驻留一段时间，默默观察着他身边的人事。');
						this.Staus = 4 ;
						}
					else if(this.Staus == 4){
						showInformation('如果能有足够强烈的能量刺激到他，那么这个灵魂可能在现世以某种方式呈现。当然，这个出现是需要引导和媒介的。');
						this.Staus ++ ;
						}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			}
			]
		},
		//地图6：一层-玄关
		{
			mapevent:[
			{
				name: "墙上的纸条",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("若就此离去，则永远无法回头");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}	
				}
			},
			{
				name: "大门",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("这里就是整个房子的大门了吧….不过没有钥匙的话，似乎出不去….");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			}
			]
		},
		//地图7：一层-客厅
		{
			mapevent:[
			{
				name: "钢琴",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("看起来很高雅的钢琴…要试着弹一下么？");
						}
						else if(this.Staus == 1)
						{
							getChoose("是","否");
						}
						else if(this.Staus == 2)
						{
							showInformation("好奇怪，按了键却没有声音…..这架钢琴的发条不见了吗？");
							this.Staus = 3;
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
					else if(this.flag == 1){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("看起来很高雅的钢琴…要试着弹一下么？");
						}
						else if(this.Staus == 1)
						{
							getChoose("是","否");
						}
						else if(this.Staus == 2)
						{
							showInformation("随着演奏，钢琴传出悠扬的旋律");
							this.Staus = 4;
						}
						else if(this.Staus == 4)
						{
							this.flag = 2;
							investigate.map[7].mapevent[7].flag = 2;
							clearinfomation();
							this.Staus = 0;
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}							
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("看起来很高雅的钢琴…");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
				}
			},
			{
				name: "壁炉",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("没有生火，壁炉里面黑漆漆的一片。要进去看看吗？");
						}
						else if(this.Staus == 1)
						{
							getChoose("是","否");
						}
						else if(this.Staus == 2)
						{
							showInformation("好像有什么在发光");
							this.Staus = 4; 
						}
						else if(this.Staus == 4)
						{
							this.flag = 1;
							clearinfomation();
							this.Staus = 0;
							getItem([[4,1]]);
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("壁炉里面黑漆漆的一片。");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
				}
			},
			{
				name: "时钟",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("墙上挂着一个老式时钟….我看看时间，嗯，现在是10点40.");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "桌子",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("看起来是用来聚会谈话的桌子…..桌子下面有什么吗？嗯…没有。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "地上的纸片",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("童话即是秘密所在");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "墙上的纸片",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("客厅");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "小熊",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0){
						if(this.Staus == 0){
							this.Staus = 1;
							showInformation(" 嘿，我们又见面了！你不记得我了吗？上次我还找你借了一瓶水来着，明明是第一次见面，还要麻烦你，真是不好意思啊。");	
						}
						else if(this.Staus == 2){
							this.Staus = 2;
							showInformation(" 对了，作为报答，你想和我一起去听音乐会吗？什么？你说今天的钢琴演奏会是你在上面演奏！…..啊，没事，那我就期待你的演奏了！");	
						}
						else{
							clearinfomation();
							this.Staus = 0;
							this.flag = 1;
						}
					}
					else if(this.flag == 1){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("很期待你稍后的演奏呢。加油哦！");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}	
					}
					else if(this.flag == 2){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("太动人了，我从来都没听过如此美妙的音乐。天色不早了，我要回家了。")
						}
						else if(this.Staus == 1){
							this.Staus ++;	
							showInformation("没事，不用你送的，我家就在这里，什么？你说你家也在这里，太巧了，那么有缘再会啦~");
						}
						else if(this.Staus == 1){
							this.Staus ++;	
							showInformation("小熊身旁掉下了一枚钥匙");
						}
						else{
							clearinfomation();
							this.Staus = 0;
							this.flag = 1;
							getItem([[9,1]]);
						}
						
					}
				}
			},
			{
				name: "门",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0){
						if(ItemList[9].number > 0)
						{
							if(this.Staus == 0){
								this.Staus = 1;
								showInformation("这个门用这把钥匙应该可以打开...好的，门开了。");
								map8.mapMatrix[2][2] = 2;
							}
							else{
								clearinfomation();
								this.Staus = 0;
								this.flag = 1;
							}
						}
						else{
							if(this.Staus == 0){
								this.Staus = 1;	
								showInformation("上锁了，打不开");
							}
							else{
								clearinfomation();
								this.Staus = 0;
							}
						}
					}	
				}
			},
			{
				name: "箱子",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0)
					{
						if(this.Staus == 0){
							this.Staus = 1;
							showInformation("这个箱子上锁了，需要密码才能打开…密码是多少来着？");
						}
						else if(this.Staus == 1)
						{
							showPassDiv();
							this.Staus ++;
							
						}
						else if(this.Staus == 2)
						{
							if(mypassword == "1050")
							{
								showInformation("打开了！这个好像是什么东西的配件");
								this.Staus++;
								this.flag = 1;
								getItem([[8,1]]);
							}
							else{
								showInformation("这个密码好像不对");
								this.Staus=4;
							}
						}
						else if(this.Staus == 3)
						{
							this.flag = 1;
							clearinfomation();
							this.Staus = 0;
							getItem([[8,1]]);
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;
							showInformation("这个箱子现在是空的了");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
				}
			}
			]
		},
		//地图8：一层-餐厅
		{
			mapevent:[
			{
				name: "桌子",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("似乎是吃饭用的桌子，没什么特别的。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "地上的纸片",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("此方之深蓝，下方之赤红，右方之花卉，门前之明灯");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "柜子",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("装满餐具的柜子，没什么特别的.");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}					
				}
			},
			{
				name: "墙上的纸片",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("餐厅");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			}
			]
		},
		//地图9：一层-厨房
		{
			mapevent:[
			{
				name: "柜子",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("装满餐具的柜子，盘子地下似乎有一颗珍珠。");
						}
						else{
							clearinfomation();
							this.flag = 1;
							this.Staus = 0;
							getItem([[4,1]]);
						}
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("装满餐具的柜子.");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
				}
			},
			{
				name: "墙上的纸条",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("厨房");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "灶台",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("这是一个灶台….火点不着…..");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "砧板",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("砧板上有切到一半的萝卜…看起来放了很久了，不过在旁边的水池里面洗一下应该就好了。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "水池",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("一个水池….拧了一下水龙头，没有反应，会不会是被卡住了?….");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}	
					}
					else if(this.flag == 1){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("水龙头被拧下来了….");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("拧了一下水龙头，水可以正常流出来了。");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}						
					}
				}
			},
			{
				name: "窗户",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("一扇小窗户，从这里出去似乎不太现实，不过，看起来外面是一个晴天。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "箱子",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0)
					{
						if(this.Staus == 0){
							this.Staus = 1;
							showInformation("这个箱子上锁了，需要密码才能打开…密码是多少来着？");
						}
						else if(this.Staus == 1)
						{
							showPassDiv()
							this.Staus++;
						}
						else if(this.Staus == 2){
							if(mypassword == "6444"){
								showInformation("打开了！里面有一把钥匙");
								this.flag = 1;
								getItem([[7,1]]);
								this.Staus ++;
							}
							else{
								showInformation("这个密码好像不对");
								this.Staus = 4;
							}
						}
						else if(this.Staus == 3)
						{
							this.flag = 1;
							clearinfomation();
							this.Staus = 0;
							getItem([[7,1]]);
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;
							showInformation("这个箱子现在是空的了");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
				}
			},
			{
				name: "门",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("门被东西挡住了，把它移开吧");
						
					}
					else{
						clearinfomation();
						this.Staus = 0;
						map10.mapMatrix[11][12] = 2;
						map4.mapMatrix[3][4] = 2;
					}
				}
			},
			]
		},
		//地图10： 一层-尘封的房间	
		{
			mapevent:[
			{
				name: "箱子",
				flag: 0,Staus: 0,
				check: function(){
					if(investigate.map[10].mapevent[0].flag == 0){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("一个尘封的箱子，要打开吗?");
						}
						else if(this.Staus == 1){
							getChoose("打开看看吧","还是算了")
						}
						else if(this.Staus == 2){
							showInformation("里面有一块镜子的碎片");
							this.Staus = 4;
						}
						else if(this.Staus == 4){
							this.flag = 1;
							clearinfomation();
							this.Staus = 0;
							getItem([[2,1]]);
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("箱子里面空了.");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}						
					}
				}
			},
			{
				name: "柜子",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("沾满灰尘的柜子，看起来很久没人用了.");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "床",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("很简陋的床，而且沾满了灰尘，应该也是很久没人用了吧。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "小熊",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation(" 我们还真是有缘呢….这么快又见面了，能再拜托一次吗？我的手镯好像不见了，你能帮我找找吗？");
						}
						else{
							clearinfomation();
							this.Staus = 0;
							this.flag = 1;
						}
					}
					else if(this.flag == 1){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("如果你找到了我的手镯，请一定要告诉我。");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}	
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("小熊又沉默了…..");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
				}
			},
			{
				name: "地上的纸片",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("明镜能唤回逝去的灵魂。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			}
			]
		},
		//地图11： 一层-外侧走廊
		{
			mapevent:[
			{
				name: "地上的纸片",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("遗忘未尝不是一种美好。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "墙上的纸片",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("外侧走廊");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			}
			]
		},
		//地图12： 二层-走廊
		{
			mapevent:[
			{
				name: "墙上的纸片",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("二楼");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "左侧的画",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("一幅颇具艺术气息的画…..似乎是飞舞的音符….");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "右侧的画",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("画上是一个带着头巾的女人….似乎和地下一层的女人是同一个人。到底是谁呢？");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},
			{
				name: "地上的纸条",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("     会夺走你最珍视的东西!");
						}
						else{
							clearinfomation();
							this.Staus = 0;
							this.flag = 1;
						}
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("纸条上一片空白");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
				}
			},
			{
				name: "小熊",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("我们又见面了呢…..这是第多少次了，真是记不清了呢。每次见面都会麻烦你，真是太不好意思了。");
						}
						else if(this.Staus == 2){
							this.Staus = 3;	
							showInformation("不过你也是一个非常可以依靠的人呢。我想，如果能这样一直依靠着你就好了。");
						}
						else{
							clearinfomation();
							this.Staus = 0;
							this.flag =1 ;
						}
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("小熊又变得沉默了…..");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
				}
			},
			{
				name: "???",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag ==0){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("嘘，别说话。我知道你想要什么？这个房间大门的钥匙，是吧？");
						}
						else if(this.Staus == 1){
							this.Staus = 2;	
							showInformation("那么我们来做一个交易吧，如果你把你手上的镜子碎片都给我，那么我就给你这个房间的钥匙如何？");
						}
						else if(this.Staus == 3){
							getChoose("好","不用了")
						}
						else if(this.Staus == 4){
							showInformation("我就知道你会的….哼哼哼，多谢了。");
							this.Staus = 6;
						}
						else if(this.Staus == 5)
						{
							showInformation("你再好好想想吧。");
							this.Staus = 7;
						}
						else if(this.Staus == 6){
							this.flag = 1 ;
							clearinfomation();
							this.Staus = 0;
							getItem([[2,0]])
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("不用再来找我了，我很忙....");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
				}
			}
			]
		},
		//地图13： 二层-主卧室
		{
			mapevent:[
			{
				name: "水晶球",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("看起来是做什么的水晶球…..总觉得和这个房间的格调不太般配。嗯？这里有一枚珍珠");
						}
						else{
							clearinfomation();
							this.Staus = 0;
							this.flag = 1;
							getItem([[4,1]]);
						}
					}
					else{
						if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("不知道是用于什么的水晶球，看起来怪怪的。");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
				}
			},
			{
				name: "纸条1",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("3月12日  今天在找灵感的时候遇到了一个女孩子，她说口渴，想要一瓶水喝。于是我就把随身带的水瓶给了她。");
					}
					if(this.Staus == 1){
						this.Staus = 2;	
						showInformation("。虽然第一印象觉得她有点冒冒失失的，但是随后的交谈发现，她其实是一个不错的人。希望有机会再见到她。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},	
			{
				name: "纸条2",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("3月27日  今天是我在这个城市举办演奏会的日子。说来也巧，下午出去散步的时候，又遇到上次的那个女孩子了，她给我的感觉依旧和上次一样温暖。");
					}
					if(this.Staus == 1){
						this.Staus = 2;	
						showInformation("交谈之后才发现，原来她今晚要来听我的演奏会，那我晚上一定要全力以赴，为她演奏最美的乐章~");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},	
			{
				name: "纸条3",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("3月28日    看来昨天的演奏会非常成功。另外昨天晚上演奏会结束的时候，又遇见她了。");
					}
					if(this.Staus == 1){
						this.Staus = 2;	
						showInformation("原来她和我住的这么近，看来我们还是非常有缘的。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}					
				}
			},	
			{
				name: "纸条4",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("4月2日   今天在附近的公园又遇见她了，还是和以前一样冒冒失失的呢。");
					}
					if(this.Staus == 1){
						this.Staus = 2;	
						showInformation("这次她把自己的手镯给弄丢了，害的我们一起找了好久。一路上的交谈发现，她对我的印象还不错，看起来我还是很有希望的嘛.");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},	
			{
				name: "纸条5",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("5月14日    她居然对我表白了！真是出乎我的意料，没想到她也一直喜欢着我。这是我人生中的第一份爱情，我一定会好好珍惜的。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},	
			{
				name: "钢琴",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("一架看起来非常奢华的钢琴….看起来很眼熟。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},	
			{
				name: "墙上的纸条",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("主卧室");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},	
			{
				name: "柜子",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("放衣服的柜子，里面没有什么奇怪的东西。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},	
			{
				name: "书柜",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("堆满了琴谱的书柜，没有什么特别的东西。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},	
			{
				name: "地上的书",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("有一本书掉在地上了，要读读看吗？")
					}
					else if(this.Staus == 1)
					{
						getChoose("读读看吧","还是算了吧")
					}
					else if(this.Staus == 2)
					{
						showInformation('有关灵魂现象的研究2：虽然我们可以召唤出离世的人的灵魂，但是这是有代价的。');
						this.Staus = 4;
					}
					else if(this.Staus == 4)
					{
						showInformation('最明显的就是施术时，施术者会失去他最珍视的东西，除此之外，这个法术也是不一定会成功的。即便施术成功，也还需要后续的动作，才能实现召唤灵魂的目的。');
						this.Staus = 5;
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			}
			]
		},
		//地图14： ？？？的房间
		{
			mapevent:[
			{
				name: "墙上的纸片",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("纸片被撕碎了…..看不出来原本写的是什么。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},	
			{
				name: "柜子",
				flag: 0,Staus: 0,
				check: function(){
					if(this.Staus == 0){
						this.Staus = 1;	
						showInformation("一个普通的柜子，没有什么奇怪的。");
					}
					else{
						clearinfomation();
						this.Staus = 0;
					}
				}
			},	
			{
				name: "首饰盒",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("一个首饰盒，里面有一些首饰，还有……这个珍珠为什么看起来这么…..");
						}
						else{
							clearinfomation();
							this.Staus = 0;
							this.flag = 1 ;
							getItem([[4,1]]);
						}
					}
					else{
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("一个首饰盒，里面有一些首饰.");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
				}
			},	
			{
				name: "镜子",
				flag: 0,Staus: 0,
				check: function(){
					if(this.flag == 0){
						if(this.Staus == 0){
							this.Staus = 1;	
							showInformation("墙上挂着的是一面镜子…..不过很遗憾，只有镜框，镜片不见了");
						}
						else{
							clearinfomation();
							this.Staus = 0;
						}
					}
					else{
						if(ItemList[15].number){
							ending(3);
						}
						else{
							if(this.Staus == 0){
								this.Staus = 1;	
								showInformation("这是刚刚拼好的镜子，不过好奇怪，为什么镜子里，看不见自己呢？");
							}
							else{
								clearinfomation();
								this.Staus = 0;
							}
						}
					}
				}
			}
		]}
	]}
		