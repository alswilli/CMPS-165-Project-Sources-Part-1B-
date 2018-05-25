// Width and height of both svgs
var w = 600;
var h = 400;

// Defines map projection (how the U.S. appears dimensionally on screen)
var projection = d3.geoMercator()
        .translate([2.1 * w, 1.5 * h])                                           // x and y position for the mercator scale to find the U.S.
        .scale([w * 0.96]);                                             // Zoom factor on the mercator scale to display the U.S. clearly and within the defined translation/svg parameters

//Define path generator
var path = d3.geoPath()
        .projection(projection);

//Define quantize scale to sort data values into buckets of color for both sets of .csv data
var colorBeeData = d3.scaleQuantize()
                    .range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);
                    //Colors derived from ColorBrewer, by Cynthia Brewer, and included in
                    //https://github.com/d3/d3-scale-chromatic

//Create SVG element for Bee Population Graph
var svgBee = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("id", "beeSvg");

//Create SVG element for Temperature Change Graph
var svgTemp = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("transform", "translate(50, 0)")
        .attr("id", "tempSvg");


// Load Population .csv data by state
d3.csv("data/beepopulation.csv", function(data) {
    
    //Set input domain for pop. density color scale
    colorBeeData.domain([
        d3.min(data, function(d) {return (d.numColonies); }), // Population divided by area gives you population density for the region
        d3.max(data, function(d) {return (d.numColonies); })  
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
                    json.features[j].properties.Population = dataBeePopulation;

                    //Stop looking through the JSON
                    break;

                }
            }		
        }
        
        // Displays by default upon loading the page the population density data
//        if(firstTime) {
            svgBee.selectAll("path")
               .data(json.features)
               .enter()
               .append("path")
               .attr("d", path)
                .attr('stroke-width', function(d) { return 0.2; })
                .attr('stroke', function(d) { return 'white'; })
//               .style("fill", function(d) {
//                    //Get data value
//                    var value = d.properties.PopulationDensity;
//
//                    if (value) {
//                        //If value exists…
//                        return colorPDdata(value);
//                    } else {
//                        //If value is undefined…
//                        return "#ccc";
//                    }
//               })
                .attr("id", "beeGraph");
//        }
            svgBee.selectAll("text")
                .data(json.features)
                .enter()
                .append("svg:text")
                .text(function(d){
                    return d.properties.name;
                })
                .attr("x", function(d){
                    return path.centroid(d)[0];
                })
                .attr("y", function(d){
                    return  path.centroid(d)[1];
                })
                .attr("text-anchor","middle")
                .attr('font-size','6pt')
                .style('fill', 'white');
        
    });
});

// Load Population and Temperature .csv data by state
d3.csv("data/temperature.csv", function(data) {    
    
    //Load in GeoJSON data for U.S. (lv1 GeoJSON attributes -> 48 states of U.S.)
    d3.json("data/usanew.json", function(json) {

        //Merge the population/fertility rate data with respective svg and U.S. GeoJSON data
        //Loop through once for each state to get bee population and temperature data
//        for (var i = 0; i < data.length; i++) {
//
//            //Grab state name
//            var dataState = data[i].state;
//
//            //Grab bee population
//            var dataBeePopulation = +data[i].beePopulation;
//            
//            //Grab state temperature
//            var dataTemperature = parseFloat(+data[i].temperature;);
//
//            //Find the corresponding region inside the GeoJSON
//            for (var j = 0; j < json.features.length; j++) {
//
//                var jsonRegion = json.features[j].properties.Name; // References name property in GeoJSON data
//
//                // If the name on the GeoJSON matches the name for the region, assign current pop. density anf fertility rate data to GeoJSON feature
//                if (dataRegion == jsonRegion) {
//
//                    //Copy the data value into the JSON for Population density and fertility rate
//                    json.features[j].properties.PopulationDensity = dataPopDensity;
//                    json.features[j].properties.FertilityRate = dataFertilityRate;
//
//                    //Stop looking through the JSON
//                    break;
//
//                }
//            }		
//        }
        
        // Displays by default upon loading the page the population density data
//        if(firstTime) {
            svgTemp.selectAll("path")
               .data(json.features)
               .enter()
               .append("path")
               .attr("d", path)
                .attr('stroke-width', function(d) { return 0.2; })
                .attr('stroke', function(d) { return 'white'; })
//               .style("fill", function(d) {
//                    //Get data value
//                    var value = d.properties.PopulationDensity;
//
//                    if (value) {
//                        //If value exists…
//                        return colorPDdata(value);
//                    } else {
//                        //If value is undefined…
//                        return "#ccc";
//                    }
//               })
                .attr("id", "tempGraph");
//        }
            svgTemp.selectAll("text")
                .data(json.features)
                .enter()
                .append("svg:text")
                .text(function(d){
                    return d.properties.name;
                })
                .attr("x", function(d){
                    return path.centroid(d)[0];
                })
                .attr("y", function(d){
                    return  path.centroid(d)[1];
                })
                .attr("text-anchor","middle")
                .attr('font-size','6pt')
                .style('fill', 'white');
        
    });
});