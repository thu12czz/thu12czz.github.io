var currentPictureMin = 0;
var currentPictureMax = 5;
//定义以及初始化小图片框的显示范围

var currentPicture = 0;
//定义以及初始化当前大图片的序号

var allPicture = {
    "length": 0,
	"pictures":[]
};
//获取服务器信息的对象

var content;
var firstflag = true;

function resetPage(){
    clearInterval(again);
	if(!firstflag){
		$("#bigImg-box").fadeTo(500,0.05);
	}
	content = '<img alt="'+allPicture.pictures[currentPicture].alt+'" src="'+allPicture.pictures[currentPicture].src+'" width=800px height=600px>';
	setTimeout(function(){
	    $("#bigImg-use")[0].innerHTML = content;
		$("#bigImg-use")[0].href = allPicture.pictures[currentPicture].src;
		$("#bigImg-use")[0].target = "_blank"
		$("#describe")[0].innerHTML = "<p>"+allPicture.pictures[currentPicture].content+"</p>";
		},500);
	if(!firstflag){
		$("#bigImg-box").fadeTo(500,1);
	}
	else{
	    firstflag = false;
	}
	//修改大图
		
	for(var i = currentPictureMin; i < currentPictureMax; i++){
		if(i < allPicture.length){
			$("[class=smallImg_0]")[i-currentPictureMin].innerHTML = '<a herf="'+allPicture.pictures[i].src+'"><img alt="'+allPicture.pictures[i].alt+'" src="'+allPicture.pictures[i].src+'" width=120px height=90px></a>';
		    }
		    else{
				$("[class=smallImg_0]")[i-currentPictureMin].innerHTML = '';
		    }
	}
	//修改小图
	
	localStorage.currentPicture = currentPicture;
	localStorage.currentPictureMin = currentPictureMin;
	
	again = setInterval("slideToRight()",5000)
}

function P_goToFrontPage(){
    var v, content;
    if(window.XMLHttpRequest){
	    v = new XMLHttpRequest();
	}
	else{
	    v = new ActiveXObject("Microsoft.XMLHTTP");
	}
	v.onreadystatechange = function(){
	    if(v.readyState == 4 && v.status == 200){
		    allPicture = eval("("+v.response+")");

			//异步获取信息
	
	        if(currentPictureMin == 0){
	            currentPictureMin = Math.ceil((allPicture.length-1) / 6) * 6;
				currentPicture = currentPictureMin;
				currentPictureMax = currentPictureMin + 6;
	            //重设参数
		        resetPage();
	        }
	        //情形1：这是第一页，完毕
	
	        else{
	            currentPictureMin -= 6;
				currentPicture = currentPictureMin;
				currentPictureMax = currentPictureMin + 6;
	            //重设参数
		        resetPage();
	        }
	        //情形2：一般情况，无特殊处理，完毕
		}
	}
	v.open("GET","data/picture.json",true);
	v.send();
	//异步获取信息
}

function P_goToNextPage(){
    var v, content;
    if(window.XMLHttpRequest){
	    v = new XMLHttpRequest();
	}
	else{
	    v = new ActiveXObject("Microsoft.XMLHTTP");
	}
	v.onreadystatechange = function(){
	    if(v.readyState == 4 && v.status == 200){
		    allPicture = eval("("+v.response+")");
			currentPictureMin += 6 ;
	        if(currentPictureMin > allPicture.length){
	            currentPictureMin = 0;
				currentPicture = currentPictureMin;
				currentPictureMax = currentPictureMin + 6;
	            //重设参数
		        resetPage();
	        }
	        //情形1：这是最后一页，完毕
	
	        else{
			    currentPicture = currentPictureMin;
				currentPictureMax = currentPictureMin + 6;
	            //重设参数
		        resetPage();
	        }
	        //情形2：一般情况，无特殊处理，完毕
	    }
	}
	v.open("GET","data/picture.json",true);
	v.send();
	//异步获取信息
	
}

function initialize(){
	var v, content;
    if(window.XMLHttpRequest){
	    v = new XMLHttpRequest();
	}
	else{
	    v = new ActiveXObject("Microsoft.XMLHTTP");
	}
	v.onreadystatechange = function(){
	    if(v.readyState == 4 && v.status == 200){
		    allPicture = eval("("+v.response+")");
			if(localStorage.currentPictureMin){
                currentPicture = Number(localStorage.currentPicture);
	            currentPictureMin = Number(localStorage.currentPictureMin);
				currentPictureMax = currentPictureMin + 6;
			}
			else{
				localStorage.currentPicture = Number(localStorage.currentPicture);
				localStorage.currentPictureMin = Number(localStorage.currentPictureMin);
				currentPicture = 0;
				currentPictureMin = 0;
				currentPictureMax = currentPictureMin + 6;
			}
	        //重设参数
			resetPage();
		}
	}
	v.open("GET","data/picture.json",true);
	v.send();
	//异步获取信息
}

function bigImgChange(i){
    if(i >= 6){
	    return;
	}
	currentPicture = currentPictureMin + i;
	currentPictureMax = currentPictureMin + 6;
	//重设参数
	resetPage();
}

function slideToRight(){
    var v, content;
    if(window.XMLHttpRequest){
	    v = new XMLHttpRequest();
	}
	else{
	    v = new ActiveXObject("Microsoft.XMLHTTP");
	}
	v.onreadystatechange = function(){
	    if(v.readyState == 4 && v.status == 200){
		    allPicture = eval("("+v.response+")");
			
			currentPicture++;
	        if(currentPicture >= currentPictureMax || currentPicture >= allPicture.length){
	            if(currentPicture >= allPicture.length){
		            currentPicture = 0;
		            currentPictureMax = 6;
			        currentPictureMin = 0;
		        }
		        else{
		            currentPictureMax += 6;
			        currentPictureMin += 6;
		        }
	        }
            var cur = currentPicture % 6;
	        bigImgChange(cur);
		}
	}
	v.open("GET","data/picture.json",true);
	v.send();
}

var again = setInterval("slideToRight()",5000);
initialize();

