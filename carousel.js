var index = 0;
var numOfImages=0;
var imgs =[];
var lis=[];

function initial() {
	var dots=[];
	var dotstring ="";
	imgs = document.getElementById("mainCarousel").getElementsByClassName("slide")[0].getElementsByTagName("img");
	numOfImages = imgs.length;
	
	for (i = 0; i < numOfImages; i++) {
		dots[i]="<li onclick=\"updateImg("+(i).toString()+")\"></li>"
	}
	
	dotstring="";
	
	for (i = 0; i < numOfImages; i++) {
		dotstring=dotstring+dots[i];
	}
	document.getElementById("mainCarousel").getElementsByClassName("carousel-indicators")[0].innerHTML=dotstring;
	
	lis = document.getElementById("mainCarousel").getElementsByClassName("carousel-indicators")[0].getElementsByTagName("li");
	
	document.getElementById("mainCarousel").getElementsByClassName("right")[0].onclick = function() {showNext();}
	document.getElementById("mainCarousel").getElementsByClassName("left")[0].onclick = function() {showPrev();}

	updateImg(0);
}

function updateImg(request){
	if (request!==undefined) {index=request}
	
	for (var i=0; i<numOfImages; i++) {
		lis[i].className = "";
	}

	for (i = 0; i < numOfImages; i++) {
		imgs[i].style.opacity = "0";
		imgs[i].style.zIndex = "-1";
	}
	imgs[index].style.opacity = "1";
	imgs[index].style.zIndex = "1";
	lis[index].className = "active";
	
	imgs[index].onmouseover = function (){checkLink()}
	imgs[index].onclick = function (){openLink()}

	if (document.getElementById("count")) {
		document.getElementById("count").innerHTML=(index+1).toString()+"/"+numOfImages.toString()+": ";
	}
	document.getElementById("mainCarousel").getElementsByClassName("carousel-caption")[0].innerHTML=imgs[index].getAttribute("alt");

}

function openLink() {
	var link = imgs[index].getAttribute("ext");
	if (link) {
		window.open(link);
	}
}

function checkLink() {
	var link = imgs[index].getAttribute("ext");
	if (link) {
		imgs[index].style.cursor="pointer";
	} else {
	imgs[index].style.cursor="default";
	}
}

function showNext(){	
	if(index < numOfImages-1)
		index++;
	else
		index=0;
	updateImg();
}

function showPrev(){
	if(index > 0)
		index--;
	else
		index=numOfImages-1;
	updateImg();
}