var commentMin;
var commentMax;

var c_json;

if(localStorage.commentMin){
    commentMin = Number(localStorage.commentMin);
	commentMax = commentMin + 5;
}
else{
    commentMin = 0;
	commentMax = commentMin + 5;
	localStorage.commentMin = Number(localStorage.commentMin);
}

function resetComment(){
    var v;
    if(window.XMLHttpRequest){
	    v = new XMLHttpRequest();
	}
	else{
	    v = new ActiveXObject("Microsoft.XMLHTTP");
	}
	v.onreadystatechange = function(){
	    if(v.readyState == 4 && v.status == 200){
		    c_json = eval("("+v.response+")");
		    if(commentMin >= c_json.comment.length){
		        commentMin -= 5;
		    }
		    if(commentMin < 0){
		        commentMin = 0;
		    }
		    commentMax = commentMin + 5;
			localStorage.commentMin = commentMin;
		    for(var i = commentMin; i < commentMax; i++){
		        if(i < c_json.comment.length){
			        $('[class=leftColumn]')[i-commentMin].innerHTML = c_json.comment[i].name;
				    $('[class=rightColumn]')[i-commentMin].innerHTML = c_json.comment[i].content;
			    }
			    else{
			        $('[class=leftColumn]')[i-commentMin].innerHTML = "";
				    $('[class=rightColumn]')[i-commentMin].innerHTML = "";
			    }
		    }
		}
	}
	v.open("GET","data/comment.json",true);
	v.send();
	//异步获取信息
}

function C_goToNextPage(){
    commentMin += 5;
	resetComment();
}

function C_goToFrontPage(){
    commentMin -= 5;
	resetComment();
}

function C_goToFirstPage(){
    commentMin = 0;
	resetComment();
}

function C_goToLastPage(){
   var v;
    if(window.XMLHttpRequest){
	    v = new XMLHttpRequest();
	}
	else{
	    v = new ActiveXObject("Microsoft.XMLHTTP");
	}
	v.onreadystatechange = function(){
	    if(v.readyState == 4 && v.status == 200){
		    c_json = eval("("+v.response+")");
		    commentMin = Math.ceil((c_json.comment.length - 1) / 5) * 5;
			commentMax = commentMin + 5;
			localStorage.commentMin = commentMin;
		    for(var i = commentMin; i < commentMax; i++){
		        if(i < c_json.comment.length){
			        $('[class=leftColumn]')[i-commentMin].innerHTML = c_json.comment[i].name;
				    $('[class=rightColumn]')[i-commentMin].innerHTML = c_json.comment[i].content;
			    }
			    else{
			        $('[class=leftColumn]')[i-commentMin].innerHTML = "";
				    $('[class=rightColumn]')[i-commentMin].innerHTML = "";
			    }
		    }
		}
	}
	v.open("GET","data/comment.json",true);
	v.send();
	//异步获取信息
}