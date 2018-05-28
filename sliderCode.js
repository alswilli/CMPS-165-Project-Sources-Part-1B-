let newWidth=document.getElementById('holder1').getBoundingClientRect().width
window.addEventListener('resize', resize);
function resize(){
	newWidth=document.getElementById('holder1').getBoundingClientRect().width
	slideholder7.call(slider7.width(newWidth));
	slideholder8.call(slider8.width(newWidth));
}
const slider1 = sliderFactory()
const slider2 = sliderFactory()
const slider3 = sliderFactory()
const slider4 = sliderFactory()
const slider5 = sliderFactory()
const slider6 = sliderFactory()
const slider7 = sliderFactory()
const slider8 = sliderFactory()
		
let slideholder1 = d3.select('#holder1').call(slider1);
let slideholder2 = d3.select('#holder2').call(slider2
	.ticks(30)
	.scale(true)
	.range([0,30])
	);
let slideholder3 = d3.select('#holder3').call(slider3
	.ticks(1)
	.scale(true)
	.range([0,4])
	.step(0.1)
	);
let slideholder4 = d3.select('#holder4').call(slider4
	.height(70)
	.margin({top: 35, right: 15, bottom: 15, left: 15  })
	.value(2)
	.ticks(1)
	.scale(true)
	.range([0,4])
	.step(0.1)
	.label(true)
	);
let slideholder5 = d3.select('#holder5').call(slider5
	.width(80)
	.margin({top: 40, right: 15, bottom: 15, left: 15  })
	.height(300)
	.scale(true)
	.ticks(20)
	.label(true)
	.value(10)
	.range([0,80])
	.orient("vertical")
	);
let slideholder6 = d3.select('#holder6').call(slider6
	.scale(true)
	.step(1)
	.dragHandler(function(d) {getValue(d);})
	);
let slideholder7 = d3.select('#holder7').call(slider7
	.width(newWidth)
	.scale(true)
	.value(20)
	.step(1)
    .range([1976,2018])                                          
	);
let slideholder8 = d3.select('#holder8').call(slider8
	.width(newWidth)
	.margin({top: 40, right: 15, bottom: 15, left: 15  })
	.height(300)
	.scale(true)
	.ticks(20)
	.label(true)
	.value(50)
	.range([0,100])
	.orient("vertical")
	);
function getValue(d) {
	var parseNum = d3.format(".0f");
	console.log (d.value)
	d3.select("#slideValue").text("Slider value "+parseNum(d.value()))
}