// Set up Leaflet Map

var map = new L.Map("mapContainer", {maxZoom: 16, minZoom: 12});
map.setView([37.7703, -122.4167], 12);

// Add ESRI basemaps
var grayBaseMap = L.esri.basemapLayer('Gray').addTo(map);

var topographicBaseMap = L.esri.basemapLayer('Topographic');

var imageryBaseMap = L.esri.basemapLayer('Imagery', {attribution: "Esri, DigitalGlobe, GeoEye..."});

// Create base map layer array
var basemaps = { 
            "Gray": grayBaseMap,
            "Topographic": topographicBaseMap,
            "Imagery": imageryBaseMap
    };

// Create Layer switcher

var layercontrol = L.control.layers(basemaps, null, {collapsed: false, position: 'bottomleft'}).addTo(map);


// Add Current Bicycle Network

d3.json("mapData/BikeNetwork.json", function(geojson) {

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");
    
var transform = d3.geo.transform({point: projectPoint}),
      path = d3.geo.path().projection(transform);

  var feature = g.selectAll("path")
      .data(geojson.features)
    .enter().append("path");

  map.on("viewreset", reset);
  reset();

  // Reposition the SVG to cover the features.
  function reset() {
    var bounds = path.bounds(geojson),
        topLeft = bounds[0],
        bottomRight = bounds[1];

    svg.attr("width", bottomRight[0] - topLeft[0])
        .attr("height", bottomRight[1] - topLeft[1])
        .style("left", topLeft[0] + "px")
        .style("top", topLeft[1] + "px")
        .attr("class", "CurrentBN");

    g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
													
    feature.attr("d", path)
    	   //add class on each type of bike network (Bike Path, Bike Lane, Bike Route)
    	   .attr("class", function(d) { return "BikeNetwork " + d.properties.FACILITY_T; })
		   .style("fill", "none");
  };
});


// Add both Upgrade and New Bike Network

d3.json("mapData/NewUpgrade.json", function(geojson) {

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");
    
var transform = d3.geo.transform({point: projectPoint}),
      path = d3.geo.path().projection(transform);

  var feature = g.selectAll("path")
      .data(geojson.features)
    .enter().append("path");
    
// Create Array of color range for new and upgrade network
var colorNew = ["rgb(253, 174, 107)","rgb(253, 141, 60)","rgb(241, 105, 19)","rgb(217, 72, 1)","rgb(140, 45, 4)"];  
var colorUpgrade = ["rgb(188, 189, 220)","rgb(158, 154, 200)","rgb(128, 125, 186)","rgb(106, 81, 163)","rgb(74, 20, 134)"];
    
  map.on("viewreset", reset);
  reset();

  // Reposition the SVG to cover the features.
  function reset() {
    var bounds = path.bounds(geojson),
        topLeft = bounds[0],
        bottomRight = bounds[1];

    svg.attr("width", bottomRight[0] - topLeft[0])
        .attr("height", bottomRight[1] - topLeft[1])
        .style("left", topLeft[0] + "px")
        .style("top", topLeft[1] + "px");

    g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

    feature.attr("d", path)
           .attr("class", function(d,i) { 
						if (d.properties.Type == "New") {
							return "New"
						} else { 
							return "Upgrade"
						};})
           .style("fill", "none")
           .style("stroke-width", 3)
           // Assign different colors based on survey count
           .style("stroke", function(d,i) { 
                        if (d.properties.Type == "New" && d.properties.Count <= 40) {
							return colorNew[0]
						} else if (d.properties.Type == "New" && d.properties.Count <= 80) {
							return colorNew[1]
						} else if (d.properties.Type == "New" && d.properties.Count <= 120) {
							return colorNew[2]
						} else if (d.properties.Type == "New" && d.properties.Count <= 160) {
						return colorNew[3]
						} else if (d.properties.Type == "New" && d.properties.Count > 160) {
							return colorNew[4] 
						} else if (d.properties.Type == "Upgrade" && d.properties.Count <= 55) {
							return colorUpgrade[0]
						} else if (d.properties.Type == "Upgrade" && d.properties.Count <= 110) {
							return colorUpgrade[1]
						} else if (d.properties.Type == "Upgrade" && d.properties.Count <= 165) {
							return colorUpgrade[2]
						} else if (d.properties.Type == "Upgrade" && d.properties.Count <= 220) {
							return colorUpgrade[3]
						} else if (d.properties.Type == "Upgrade" && d.properties.Count > 220) {
							return colorUpgrade[4]
						};});
						
		feature.on("mouseover", function(d) {
						self = $(this);
						self.css("stroke-width", "5px");
						var text2 = "<p><strong>" + d.properties.STREET + "</strong><br/><span>Count: " + d.properties.Count + "</span></p>";
						$("#info").show().html(text2);
					})
					.on("mouseout", function(self) {
						self = $(this);
						self.css("stroke-width", "3px");
						$("#info").hide().html("");
					});
						   
  };

});

  // Use Leaflet to implement a D3 geometric transformation.
  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  };
  

// Popup function to move popups near the mouse position



		// position popup
		windowW = $(window).width();
		$("#mapContainer").on("mousemove", function(e) {
			var x = e.pageX + 20;
			var y = e.pageY;
			var windowH = $(window).height();
			if (y > (windowH - 100)) {
				var y = e.pageY - 100;
			} else {
				var y = e.pageY - 20;
			}

			$("#info").css({
				"left": x,
				"top": y
			});
		});







