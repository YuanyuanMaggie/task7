$(document).ready(function(){
	//hover over
	$("#showModal").on('shown.bs.modal',function (e) {
	initialWord(items,'#mybox');
})
	$("#showModal2").on('shown.bs.modal',function (e) {
	magicWord('#mybox2');
})
	//word Cloud
	$("#wordCloud").on('shown.bs.modal',function(e){
		createWordCould(myword);
	})

	//gallery
	$( "#jGalleryBt" ).click(function() {
  $( "#showGallery" ).toggle( "slow" );
});


})

// hover
var items = ["aaaaa","bbbbb","ccccc","ddddd","eeeee","ffffff"];
var animated=["bounceInRight","bounceInDown","bounceInLeft","bounceInRight","bounceInDown","bounceInLeft"];
var hover=["hvr-float-shadow","hvr-curl-top-left","hvr-overline-from-left","hvr-sweep-to-right","hvr-sweep-to-left","hvr-pulse-shrink"];

function initialWord(arrayItem,box){
	$(box).html("");
	for(var i=0;i<arrayItem.length;i++){
		var singleItem = document.createElement("div");
		var myclass = "movingitems animated "+animated[i]+" "+hover[i];
		singleItem.className = myclass;
		singleItem.innerText = arrayItem[i];
		$(box).append(singleItem);
	}

}

var magicAnimated = ["spaceInUp","spaceInRight","spaceInDown","tinUpIn","tinDownIn","vanishIn"];

function magicWord(box){
	var items = $(box).children();
	setTimeout(function(){
		items.each(function(i,value){
		$(this).addClass("magictime");
		$(this).addClass(magicAnimated[i]);
		console.log(magicAnimated[i]);
	})
	}, 3000);
	
}
// word cloud
var myword = ["aaaaa","bbbbb","ccccc","ddddd","eeeee","ffffff","gggggg","hhhhhh","lllll","ooooo"];

var width = 500;
var height = 400;
var fill = d3.scale.category20();
function createWordCould(word){
	
	d3.layout.cloud().size([width,height])
	.words(word.map(function(d){
		return {text:d,size:10 + Math.random()* 90};
	}))
	.padding(5)
	.rotate(function(){
		return Math.random()*2*90;
	})
	.fontSize(function(d){
		return d.size;
	})
	.on("end",draw)
	.start();
}

function draw(words){
	d3.select("#myCloud").append("svg")
	.attr("width",width)
	.attr("height",height)
	.append("g")
	.attr("transform","translate("+width/2+","+height/2+")")
	.selectAll("text")
	.data(words)
	.enter().append("text")
	.style("font-size", function(d){
		return d.size + "px";
	})
	.style("fill",function(d,i){return fill(i);})
	.attr("text-anchor","middle")
	.text(function(d){
		return d.text;
	})
	.transition().duration(1000)
	.attr("transform",function(d){
		return "translate(" + [d.x,d.y] + ")rotate(" + d.rotate + ")";
	});

	d3.selectAll("text")
	.on("mouseover",function(d){
		d3.select(this).style("stroke","#fff");
	})
	.on("mouseout",function(d){
		d3.select(this).style("stroke","none");
	});
}

