// Width and height of both svgs
var width = 600;
var height = 400;
var margin = {left: 30, right: 30};
var range = [0, 24];
var step = 2;

var currentSliderValue = 1976;

var init_year = 1976;
var changeBee = true;
var changeTemp = true;

var years = ['1976', '1977'];

// Defines map projection (how the U.S. appears dimensionally on screen)
//var projection = d3.geoMercator()
//        .translate([2.1 * width, 1.5 * height])                                           // x and y position for the mercator scale to find the U.S.
//        .scale([width * 0.96]);                                             // Zoom factor on the mercator scale to display the U.S. clearly and within the defined translation/svg parameters

// D3 Projection
var projection = d3.geoAlbersUsa()
  .translate([width / 2, height / 2]) // translate to center of screen
  .scale([800]); // scale things down so see entire US

//Define path generator
var path = d3.geoPath()
        .projection(projection);

//Define quantize scale to sort data values into buckets of color for both sets of .csv data
var colorBeeData = d3.scaleQuantize()
                    .range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);
                    //Colors derived from ColorBrewer, by Cynthia Brewer, and included in
                    //https://github.com/d3/d3-scale-chromatic

var colorTempData = d3.scaleQuantize()
                    .range(["rgb(242,240,247)","rgb(203,201,226)","rgb(158,154,200)","rgb(117,107,177)","rgb(84,39,143)"]);
                    //Colors derived from ColorBrewer, by Cynthia Brewer, and included in
                    //https://github.com/d3/d3-scale-chromatic

//Create SVG element for Bee Population Graph
var svgBee = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "beeSvg");

//Create SVG element for Temperature Change Graph
var svgTemp = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(50, 0)")
        .attr("id", "tempSvg");
 

// tick formatter
    var formatter = d3.format("");
    var tickFormatter = function(d) {
        if(currentSliderValue != formatter(d)) {
//            console.log(formatter(d));
          currentSliderValue = formatter(d); 
            console.log(currentSliderValue);
            
            var beeCsv = "data/beepop" + currentSliderValue + ".csv";
            var tempCsv = "data/temp" + currentSliderValue + ".csv";
            
            console.log(beeCsv);
            console.log(tempCsv);
            
//            var beeMap = d3.geomap.choropleth()
//                .geofile('data/usenew.json')
//                .projection(d3.geo.albersUsa)
//                .column('2012')
//                .unitId('fips')
//                .scale(1000)
//                .legend(true);
//
//            d3.csv(beeCsv, function(error, data) {
//                d3.select('#beeMap')
//                    .datum(data)
//                    .call(beeMap.draw, beeMap);
//            });
            
            
            // Load Population .csv data by state
//d3.csv("data/beepop1976.csv", function(data) {
            d3.csv(beeCsv, function(data) {
//                d3.selectAll("#beeGraph").remove();
    
    //Set input domain for pop. density color scale
    colorBeeData.domain([
        d3.min(data, function(d) {
//             console.log(d.numColonies)
            return d.numColonies; }), // Population divided by area gives you population density for the region
        
        d3.max(data, function(d) {    //console.log(d.numColonies)
            return (d.numColonies); })  
    ]);
                
    
    //Load in GeoJSON data for U.S. (lv1 GeoJSON attributes -> 48 states of U.S.)
    d3.json("data/usanew.json", function(json) {

        //Merge the bee population data with respective svg and U.S. GeoJSON data
        //Loop through once for each state to get bee population data
        for (var i = 0; i < data.length; i++) {

            //Grab state name
            var dataState = data[i].state;

            //Grab bee population
            var dataBeePopulation = +data[i].numColonies;
            
            //Grab state temperature
//            var dataTemperature = parseFloat(+data[i].temperature;);

            //Find the corresponding region inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {

                var jsonRegion = json.features[j].properties.name; // References name property in GeoJSON data

                // If the name on the GeoJSON matches the name for the region, assign current bee population data to GeoJSON feature
                if (dataState == jsonRegion) {

                    //Copy the data value into the JSON for Population 
                    json.features[j].properties.numColonies = dataBeePopulation;
                    console.log("HELLO")

                    //Stop looking through the JSON
                    break;

                }
            }		
        }
        // fill paths
//  let map =  d3.selectAll("svgBee#beeGraph path").data(json.features);
//        
//  map.exit().remove();
//        
//  map.enter().append("path").merge(map)
//        .attr('stroke-width', function(d) { return 0.2; })
//                .attr('stroke', function(d) { return 'white'; })
//               .attr("fill", function(d) {
//                    //Get data value
//                    var value = d.properties.numColonies;
//                    console.log('POOP')
//
//                    if (value) {
//                        //If value exists…
//                        return colorBeeData(value);
//                    } else {
//                        //If value is undefined…
//                        return "#ccc";
//                    }
//               });
// 
        
//  d3.selectAll("svgBee#beeGraph path")
   svgBee.selectAll("path").remove()    
        
//   svgBee.selectAll("path")
//     .attr("fill", function(d) {  var value = d.properties.numColonies;
//                    console.log('POOP2')
//                                
//                    console.log(value)
//
//                    if (value) {
//                        //If value exists…
//                        return d3.rgb(colorBeeData(value));
//                        console.log("jsjsjsjs")
//                    } else {
//                        //If value is undefined…
//                        return "#ccc";
//                    }
//                               });
        
//        console.log("HERE")
//      
////      return typeof data[d.id] === 'undefined' ? color_na :
////                                              d3.rgb(color(data[d.id])); });
//        if(changeBee) {
//            console.log("WHY")
//        }
        
        // Displays by default upon loading the page the population density data
//        if(changeBee) {
            svgBee.selectAll("path")
               .data(json.features)
               .enter()
               .append("path")
               .attr("d", path)
                .attr('stroke-width', function(d) { return 0.2; })
                .attr('stroke', function(d) { return 'white'; })
               .attr("fill", function(d) {
                    //Get data value
                    var value = d.properties.numColonies;
                    console.log('POOP')

                    if (value) {
                        //If value exists…
                        return d3.rgb(colorBeeData(value));
                    } else {
                        //If value is undefined…
                        return "#ccc";
                    }
               })
                .attr("id", "beeGraph");
            
//            changeBee = false;
//        }
//            svgBee.selectAll("text")
//                .data(json.features)
//                .enter()
//                .append("svg:text")
//                .text(function(d){
//                    return d.properties.name;
//                })
//                .attr("x", function(d){
//                    return path.centroid(d)[0];
//                })
//                .attr("y", function(d){
//                    return  path.centroid(d)[1];
//                })
//                .attr("text-anchor","middle")
//                .attr('font-size','6pt')
//                .style('fill', 'white');
        
    });
});

// Load Population and Temperature .csv data by state
d3.csv(tempCsv, function(data) {
    
//     d3.selectAll("#tempGraph").remove();
    
     //Set input domain for pop. density color scale
    colorTempData.domain([
        d3.min(data, function(d) {return d.avg; }), // Population divided by area gives you population density for the region
        d3.max(data, function(d) { console.log(d.avg);
            return (d.avg); })  
    ]);
    
    //Load in GeoJSON data for U.S. (lv1 GeoJSON attributes -> 48 states of U.S.)
    d3.json("data/usanew.json", function(json) {

        //Merge the population/fertility rate data with respective svg and U.S. GeoJSON data
        //Loop through once for each state to get bee population and temperature data
        for (var i = 0; i < data.length; i++) {
            
            //Grab abbreviation of state name
            var dataAbbrev = data[i].abbrev;
//            console.log(dataAbbrev);

            //Grab state name
            var dataState = data[i].state;
//            console.log(dataState);

            //Grab average population
            var dataAvgTemp = parseFloat(+data[i].avg);
//            console.log(dataAvgTemp);
            
            //Grab min temperature
            var dataMinTemp= parseFloat(+data[i].min);
//            console.log(dataMinTemp);
            
            //Grab max temperature
            var dataMaxTemp= parseFloat(+data[i].max);
//            console.log(dataMaxTemp);

            //Find the corresponding region inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {

                var jsonRegion = json.features[j].properties.name; // References name property in GeoJSON data

                // If the name on the GeoJSON matches the name for the region, assign current pop. density anf fertility rate data to GeoJSON feature
                if (dataState == jsonRegion) {

                    //Copy the data value into the JSON for Population density and fertility rate
                    json.features[j].properties.abbrev = dataAbbrev;
                    json.features[j].properties.avg = dataAvgTemp;
                    json.features[j].properties.min = dataMinTemp;
                    json.features[j].properties.max = dataMaxTemp;

                    //Stop looking through the JSON
                    break;

                }
            }		
        }
        
        svgTemp.selectAll("path").remove();
        
//        svgTemp.selectAll("path")
//     .attr("fill", function(d) {  var value = d.properties.avg;
//                    console.log('POOP3')
//
//                    if (value) {
//                        //If value exists…
//                        return colorTempData(value);
//                    } else {
//                        //If value is undefined…
//                        return "#ccc";
//                    }
//                               });
        
        // Displays by default upon loading the page the population density data
//        if(changeTemp) {
            svgTemp.selectAll("path")
               .data(json.features)
               .enter()
               .append("path")
               .attr("d", path)
                .attr('stroke-width', function(d) { return 0.2; })
                .attr('stroke', function(d) { return 'white'; })
               .style("fill", function(d) {
                    //Get data value
                    var value = d.properties.avg;
//                    console.log(d)
                      console.log("POOP4")

                    if (value) {
                        //If value exists…
                        return d3.rgb(colorTempData(value));
                    } else {
                        //If value is undefined…
                        return "#ccc";
                    }
               })
                .attr("id", "tempGraph");
//             changeTemp = false;
//        }
//            svgTemp.selectAll("text")
//                .data(json.features)
//                .enter()
//                .append("svg:text")
//                .text(function(d){
//                    return d.properties.name;
//                })
//                .attr("x", function(d){
//                    return path.centroid(d)[0];
//                })
//                .attr("y", function(d){
//                    return  path.centroid(d)[1];
//                })
//                .attr("text-anchor","middle")
//                .attr('font-size','6pt')
//                .style('fill', 'white');
        
    });
});
        }
    return formatter(d);
    }    
        
    var slider = d3.slider().min(1976).max(2018).tickValues([1976, 1981, 1986, 1991, 1996, 2001, 2006, 2011, 2016, 2018])
                        .stepValues([1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,
                                    1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018])
                        .tickFormat(tickFormatter)
                        .showRange(true).value(1976);
    d3.select('#slider').call(slider);
        
        d3.select(window).on("resize", function() {
        slider.resize();
    });


 

