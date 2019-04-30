
// main dataset
var data = [
 [{
   "group": "public_importance",
   "axis": "living condition",
   "value": 5.99,
   "description": "Living conditions in the residence halls are comfortable"
 },
 {
   "group": "public_importance",
   "axis": "food in the cafeteria",
   "value": 5.99,
   "description": "There is an adequate selection of food available in the cafeteria"
 },
 {
   "group": "public_importance",
   "axis": "concern for the individual",
   "value": 6.09,
   "description": "Faculty care about me as an induvidual"
 },
 {
   "group": "public_importance",
   "axis": "variety of courses",
   "value": 6.38,
   "description": "There is a good variety of courses provided on this campus"
 },
 {
   "group": "public_importance",
   "axis": "financial aid",
   "value": 6.33,
   "description": "Adequate financial aid is available for most students"
 },
 {
   "group": "public_importance",
   "axis": "safety and security",
   "value": 6.46,
   "description": "The campus is safe and secure for all students"
 }],
 [{
   "group": "public_satisfaction",
   "axis": "living condition",
   "value": 4.82,
   "description": "Living conditions in the residence halls are comfortable"
 },
 {
   "group": "public_satisfaction",
   "axis": "food in the cafeteria",
   "value": 4.46,
   "description": "There is an adequate selection of food available in the cafeteria"
 },
 {
   "group": "public_satisfaction",
   "axis": "concern for the individual",
   "value": 5.12,
   "description": "Faculty care about me as an induvidual"
 },
 {
   "group": "public_satisfaction",
   "axis": "variety of courses",
   "value": 5.54,
   "description": "There is a good variety of courses provided on this campus"
 },
 {
   "group": "public_satisfaction",
   "axis": "financial aid",
   "value": 4.9,
   "description": "Adequate financial aid is available for most students"
 },
 {
   "group": "public_satisfaction",
   "axis": "safety and security",
   "value": 5.52,
   "description": "The campus is safe and secure for all students"
 }],
 [{
   "group": "private_importance",
   "axis": "living condition",
   "value": 6.15,
   "description": "Living conditions in the residence halls are comfortable"
 },
 {
   "group": "private_importance",
   "axis": "food in the cafeteria",
   "value": 6.08,
   "description": "There is an adequate selection of food available in the cafeteria"
 },
 {
   "group": "private_importance",
   "axis": "concern for the individual",
   "value": 6.25,
   "description": "Faculty care about me as an induvidual"
 },
 {
   "group": "private_importance",
   "axis": "variety of courses",
   "value": 6.64,
   "description": "There is a good variety of courses provided on this campus"
 },
 {
   "group": "private_importance",
   "axis": "financial aid",
   "value": 6.38,
   "description": "Adequate financial aid is available for most students"
 },
 {
   "group": "private_importance",
   "axis": "safety and security",
   "value": 6.47,
   "description": "The campus is safe and secure for all students"
 }],
 [{
   "group": "private_satisfaction",
   "axis": "living condition",
   "value": 4.75,
   "description": "Living conditions in the residence halls are comfortable"
 },
 {
   "group": "private_satisfaction",
   "axis": "food in the cafeteria",
   "value": 4.26,
   "description": "There is an adequate selection of food available in the cafeteria"
 },
 {
   "group": "private_satisfaction",
   "axis": "concern for the individual",
   "value": 5.54,
   "description": "Faculty care about me as an induvidual"
 },
 {
   "group": "private_satisfaction",
   "axis": "variety of courses",
   "value": 5.51,
   "description": "There is a good variety of courses provided on this campus"
 },
 {
   "group": "private_satisfaction",
   "axis": "financial aid",
   "value": 5.01,
   "description": "Adequate financial aid is available for most students"
 },
 {
   "group": "private_satisfaction",
   "axis": "safety and security",
   "value": 5.73,
   "description": "The campus is safe and secure for all students"
 }]
];

var w = 500,
	  h = 500;

// options
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 10,
  ExtraWidthX: 300
}

var RadarChart = {
     draw: function(id, data, options){
     var cfg = {
     radius: 3,
     w: 500,
     h: 500,
     factor: 1,
     factorLegend: .85,
     levels: 3,
     maxValue: 0,
     radians: 2 * Math.PI,
     opacityArea: 0.2,
     ToRight: 5,
     TranslateX: 80,
     TranslateY: 30,
     ExtraWidthX: 100,
     ExtraWidthY: 100,
     color: d3.scaleOrdinal().range(["red", "green","orange","blue"])
    };

    if('undefined' !== typeof options){
      for(var i in options){
      if('undefined' !== typeof options[i]){
        cfg[i] = options[i];
      }
      }
    }

    cfg.maxValue = 7;

    var allAxis = (data[0].map(function(i, j){return i.axis}));
    var total = allAxis.length;
    var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
    d3.select(id).select("svg").remove();

    var g = d3.select(id)
        .append("svg")
        .attr("width", cfg.w+cfg.ExtraWidthX)
        .attr("height", cfg.h+cfg.ExtraWidthY)
        .append("g")
        .attr("transform", "translate(125,40)");


    //Circular segments
    for(var j=0; j<cfg.levels; j++){
      var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
      g.selectAll(".levels")
       .data(allAxis)
       .enter()
       .append("svg:line")
       .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
       .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
       .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
       .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
       .attr("class", "line")
       .style("stroke", "grey")
       .style("stroke-opacity", "0.75")
       .style("stroke-width", "0.3px")
       .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
    }

    //Text indicating at what % each level is
    for(var j=0; j<cfg.levels; j++){
      var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
      g.selectAll(".levels")
       .data([0])
       .enter()
       .append("svg:text")
       .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
       .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
       .attr("class", "legend")
       .style("font-family", "sans-serif")
       .style("font-size", "10px")
       .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
       .attr("fill", "#737373")
       .text((j+1)*7/cfg.levels);
    }

    series = 0;

    var axis = g.selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("line")
      .attr("x1", cfg.w/2)
      .attr("y1", cfg.h/2)
      .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
      .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
      .attr("class", "line")
      .style("stroke", "grey")
      .style("stroke-width", "1px");

    axis.append("text")
      .attr("class", "legend")
      .text(function(d){return d})
      .style("font-family", "sans-serif")
      .style("font-size", "14px")
      .attr("text-anchor", "middle")
      .attr("dy", "2em")
      .attr("transform", function(d, i){return "translate(0, -10)"})
      .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*1.29*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
      .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total)*1.05)-20*Math.cos(i*cfg.radians/total);});


    data.forEach(function(y, x){
      dataValues = [];
      g.selectAll(".nodes")
      .data(y, function(j, i){
        dataValues.push([
        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
        ]);
      });
      dataValues.push(dataValues[0]);
      g.selectAll(".area")
             .data([dataValues])
             .enter()
             .append("polygon")
             .attr("class", "radar-chart-serie"+series)
             .style("stroke-width", "2px")
             .style("stroke", cfg.color(series))
             .attr("points",function(d) {
               var str="";
               for(var pti=0;pti<d.length;pti++){
                 str=str+d[pti][0]+","+d[pti][1]+" ";
               }
               return str;
              })
             .style("fill", function(j, i){return cfg.color(series)})
             .style("fill-opacity", cfg.opacityArea)
             .on('mouseover', function (d){
                      z = "polygon."+d3.select(this).attr("class");
                      g.selectAll("polygon")
                       .transition(200)
                       .style("fill-opacity", 0.1);
                      g.selectAll(z)
                       .transition(200)
                       .style("fill-opacity", 0.7);
                      })
             .on('mouseout', function(){
                      g.selectAll("polygon")
                       .transition(200)
                       .style("fill-opacity", cfg.opacityArea);
             });
      series++;
    });
    series=0;

    data.forEach(function(y, x){
      g.selectAll(".nodes")
      .data(y)
      .enter()
      .append("svg:circle")
      .attr("class", "radar-chart-serie"+series)
      .attr('r', cfg.radius)
      .attr("alt", function(j){return Math.max(j.value, 0)})
      .attr("cx", function(j, i){
        dataValues.push([
        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
      ]);
      return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
      })
      .attr("cy", function(j, i){
        return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
      })
      .attr("data-id", function(j){return j.area})
      .style("fill", "#fff")
      .style("stroke-width", "2px")
      .style("stroke", cfg.color(series)).style("fill-opacity", .9)
      .on('mouseover', function (d){
            newX =  parseFloat(d3.select(this).attr('cx')) - 10;
            newY =  parseFloat(d3.select(this).attr('cy')) - 5;

            tooltip
              .attr('x', newX)
              .attr('y', newY)
              .text(d.value)
              .transition(200)
              .style('opacity', 1);

            z = "polygon."+d3.select(this).attr("class");
            g.selectAll("polygon")
              .transition(200)
              .style("fill-opacity", 0.1);
            g.selectAll(z)
              .transition(200)
              .style("fill-opacity", .7);
            })
      .on('mouseout', function(){
            tooltip
              .transition(200)
              .style('opacity', 0);
            g.selectAll("polygon")
              .transition(200)
              .style("fill-opacity", cfg.opacityArea);
            })
      .append("svg:title")
      .text(function(j){return Math.max(j.value, 0)});

      series++;
    });


    //Tooltip
    tooltip = g.append('text')
           .style('opacity', 0)
           .style('font-family', 'sans-serif')
           .style('font-size', '13px');
   var color= ["red", "green","orange","blue"];
   var legend = g.append("g")
       legend.selectAll("polygon")
                .data(color)
                .enter()
                .append("rect")
                .classed("legend-tiles", true)
                .attr("x", cfg.w - 30 / 2 + 50)
                .attr("y", function(d, i) { return i * 2 * 15 - 18; })
                .attr("width", 11)
                .attr("height", 11)
                .attr("fill", function(d) { return d });
              //create text
      legend.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .attr("class", function(d){ return d[0].group})
                .attr("x", cfg.w - 30 / 2 + 78)
                .attr("y", function(d, i) { return i * 2 * 15 + 9 - 18; })
                .attr("font-size", 13 + "px")
                .text(function(d) {
                  return d[0].group})
                .on("mouseover",function(d){
                      console.log(d[0].group)
                      if (d[0].group = "public_importance"){
                    d3.select(".radar-chart-serie0")
                      .transition(200)
                      .style("fill-opacity", 0.7);}
                    else if (d[0].group = "public_satisfaction"){
                    d3.select(".radar-chart-serie1")
                      .transition(200)
                      .style("fill-opacity", 0.7);}
                    else if (d[0].group = "private_importance"){
                    d3.select(".radar-chart-serie2")
                      .transition(200)
                      .style("fill-opacity", 0.7);}
                    else //(d[0].group = "private_satisfaction")//
                    {
                    d3.select(".radar-chart-serie3")
                      .transition(200)
                      .style("fill-opacity", 0.7);}
                    })
                .on("mouseout",function(d){
                  if (d[0].group = "public_importance"){
                    d3.select(".radar-chart-serie0")
                      .transition(200)
                      .style("fill-opacity", cfg.opacityArea);}
                  else if (d[0].group = "public_satisfaction"){
                    d3.select(".radar-chart-serie1")
                      .transition(200)
                      .style("fill-opacity", cfg.opacityArea);}
                else  if (d[0].group = "private_importance"){
                    d3.select(".radar-chart-serie2")
                      .transition(200)
                      .style("fill-opacity", cfg.opacityArea);}
                 else //(d[0].group = "private_satisfaction")
                 {
                    d3.select(".radar-chart-serie3")
                      .transition(200)
                      .style("fill-opacity", cfg.opacityArea);}
                    })

    }
};

RadarChart.draw(".radarChart", data, mycfg);
