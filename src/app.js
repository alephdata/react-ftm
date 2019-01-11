import * as d3 from "d3";
import _ from 'lodash'

var colorScale = d3.schemeCategory10

var color = d3.scaleOrdinal(colorScale).domain(['Am',
    'An',
    'Ar',
    'As',
    'Ba',
    'Br',
    'Ch',
    'Cn',
    'Cy',
    'Gl',
    'Gy',
    'Li',
    'Os',
    'Pr',
    'Vi',
    'Zy']);



var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var graph = {
    nodes: [
        {"T":["Ba","Ar"],"Q":["sp","sp"],"id":0},
        {"T":["As","Zy","Gy"],"Q":["sp","fu","la"],"id":1},
        {"T":["Ch"],"Q":["nu","ni","tr"],"id":2},{"T":["An","Gy"],"Q":["fu","va","ec","cl","la","pl"],"id":3},{"T":["As","Gl","An"],"Q":["sp","fu","va","cl","la"],"id":4},{"T":["Ba","Ar"],"Q":["me","fu","ec","sp","sp"],"id":5},{"T":["As","Li","Br","An","Gy"],"Q":["sp","fu","va","sp","la"],"id":6},{"T":["Pr","Cy","Ch"],"Q":["nu","sp","fu","va","pl"],"id":7},{"T":["Ba","Ar"],"Q":["sp","fu","va","di","ge"],"id":8},{"T":["Ar","Os","Am"],"Q":["sp","va","ec","ec","cl","tr","la"],"id":9},{"T":["Vi","Cn"],"Q":["sp","fu","di","sp","ge"],"id":10},{"T":["An"],"Q":["sp","ni","fu","va","cl","di","tr"],"id":11},{"T":["Ar","Ch"],"Q":["me","nu","sp","va","sp"],"id":12},{"T":["Vi","Ar","Pr"],"Q":["sp","fu","sp"],"id":13},{"T":["An","Gy"],"Q":["sp","ni","va","cl","tr","la","sp","na"],"id":14},{"T":["Ba","Am"],"Q":["sp","fu","sp","di","ge"],"id":15},{"T":["Vi","Ar","Ba","Cy","Ch","Ch"],"Q":["nu","sp","fu","va","di"],"id":16},{"T":["An","Gy"],"Q":["sp","di"],"id":17},{"T":["An","Ar"],"Q":["sp","sp","tr","ad"],"id":18},{"T":["Ch","Ar"],"Q":["ni","fu","va","cl","sp","la"],"id":19}

    ],
    links : [
        {"source":0.0,"target":5.0,"T":"Ba"},{"source":8.0,"target":15.0,"T":"Ba"},{"source":8.0,"target":16.0,"T":"Ba"},{"source":15.0,"target":5.0,"T":"Ba"},{"source":1.0,"target":3.0,"T":"Gy"},{"source":1.0,"target":6.0,"T":"Gy"},{"source":1.0,"target":14.0,"T":"Gy"},{"source":1.0,"target":17.0,"T":"Gy"},{"source":3.0,"target":6.0,"T":"Gy"},{"source":3.0,"target":14.0,"T":"Gy"},{"source":3.0,"target":17.0,"T":"Gy"},{"source":6.0,"target":14.0,"T":"Gy"},{"source":6.0,"target":17.0,"T":"Gy"},{"source":14.0,"target":17.0,"T":"Gy"},{"source":7.0,"target":13.0,"T":"Pr"},{"source":0,"target":5.0,"T":"Ch"},{"source":2.0,"target":12.0,"T":"Ch"},{"source":2.0,"target":12.0,"T":"Br"},
        {"source":0.0,"target":5.0,"T":"Ba"},{"source":0.0,"target":5.0,"T":"Gy"},{"source":0.0,"target":5.0,"T":"Br"}
    ]
}



var currNodes = graph.nodes
var currLinks = graph.links

// Generate Statitics on links
_.each(currLinks, function(link) {

    // find other links with same target+source or source+target
    var same = currLinks.filter((i)=> {
        return i['source'] === link.source &&
        i['target']=== link.target
    });
    var sameAlt = currLinks.filter((i)=> {
        return i['source'] === link.target &&
            i['target']=== link.source
    });
    var sameAll = same.concat(sameAlt);

    _.each(sameAll, function(s, i) {
        s.sameIndex = (i + 1);
        s.sameTotal = sameAll.length;
        s.sameTotalHalf = (s.sameTotal / 2);
        s.sameUneven = ((s.sameTotal % 2) !== 0);
        s.sameMiddleLink = ((s.sameUneven === true) &&
            (Math.ceil(s.sameTotalHalf) === s.sameIndex));
        s.sameLowerHalf = (s.sameIndex <= s.sameTotalHalf);
        s.sameArcDirection = s.sameLowerHalf ? 0 : 1;
        s.sameIndexCorrected = s.sameLowerHalf ? s.sameIndex : (s.sameIndex - Math.ceil(s.sameTotalHalf));
    });
});

var maxSame = _.chain(currLinks)
    .sortBy(function(x) {
        return x.sameTotal;
    })
    .last()
    .value().sameTotal;

_.each(currLinks, function(link) {
    link.maxSameHalf = Math.round(maxSame / 2);
});


const svg = d3.select('svg'),
    width = +svg.attr('width'),
    height = +svg.attr('height');



//  const width = 960;
//   const height = 700;

var simulation = d3.forceSimulation(currNodes)
//.force('link', d3.forceLink().id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-1000))
    .force("link", d3.forceLink(currLinks).distance(200))
    .force('center', d3.forceCenter(width / 2, height / 2))
    //.force('collide', d3.forceCollide(25))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .alphaTarget(1)
    .on('tick', ticked);

var R = 8;

var g = svg.append("g"),
//.attr("transform", "translate(" + width / 2 + "," + height/ 2 + ")")
link = g.append("g").selectAll(".link"),
    node = g.append("g").selectAll(".node");

//simulation.force('link')
//.links(currLinks);
restart();

//Draw links colored by T
//   link = g.selectAll('.link')
link.data(currLinks)
    .enter().append('path')
    .attr('stroke', function(d){return color(d.T);});

//Add mouseover events to links
link.attr('class', 'link')
    .on('mouseover.fade', linkFade(0.1))
    .on('mouseover.tooltip', function(d) {
        tooltip.transition()
            .duration(300)
            .style("opacity", .8);
        tooltip.html("Source:"+ d.source.id +
            "<p/>Target:" + d.target.id +
            "<p/>T:"  + d.T)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY + 10) + "px");
    })
    .on("mouseout.tooltip", function() {
        tooltip.transition()
            .duration(100)
            .style("opacity", 0);
    })
    .on('mouseout.fade', linkFade(1))
    .on("mousemove", function() {
        tooltip.style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY + 10) + "px");
    });

// Add Dragging Behavior to nodes
var node = g.selectAll('.node')
    .data(currNodes)
    .enter().append('g')
    .attr('class', 'node')
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));;

// Draw nodes
node.append('circle')
    .attr('r', R)
    .attr("fill", function(d) { return "#CCC";})
    .on('mouseover.tooltip', function(d) {
        tooltip.transition()
            .duration(300)
            .style("opacity", .8);
        tooltip.html("Project:" + d.id + "<p/>T:" + d.T + "<p/>Q:" + d.Q)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY + 10) + "px");
    })
    .on('mouseover.fade', fade(0.1))
    .on("mouseout.tooltip", function() {
        tooltip.transition()
            .duration(100)
            .style("opacity", 0);
    })
    .on('mouseout.fade', fade(1))
    .on("mousemove", function() {
        tooltip.style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY + 10) + "px");
    })
    .on('dblclick',releasenode)

console.log(currLinks.length)

//   d3.interval(function (){
//   	updateData();
//     restart();
//     console.log(currLinks.length)
//   }, 4000, d3.now());

//   d3.interval(function() {
//     resetData();
//     restart();
//   }, 4000, d3.now()+2000);

var temp;
function updateData(){
    //temp = currNodes.pop();
    currNodes.push({"id": 30})
    currLinks.push({"source":0.0,"target":30,"T":"Gl"})
    restart()
}

function resetData(){
    currNodes = graph.nodes
    currLinks = graph.links
    //currLinks = graph.links
    //currLinks.push(temp)
    restart()
}

function restart(){
    // Generate Statitics on links
    _.each(currLinks, function(link) {

        // find other links with same target+source or source+target
        var same = currLinks.filter((i)=> {
            return i['source'] === link.source &&
                i['target']=== link.target
        });
        var sameAlt = currLinks.filter((i)=> {
            return i['source'] === link.target &&
                i['target']=== link.source
        });
        var sameAll = same.concat(sameAlt);

        _.each(sameAll, function(s, i) {
            s.sameIndex = (i + 1);
            s.sameTotal = sameAll.length;
            s.sameTotalHalf = (s.sameTotal / 2);
            s.sameUneven = ((s.sameTotal % 2) !== 0);
            s.sameMiddleLink = ((s.sameUneven === true) &&
                (Math.ceil(s.sameTotalHalf) === s.sameIndex));
            s.sameLowerHalf = (s.sameIndex <= s.sameTotalHalf);
            s.sameArcDirection = s.sameLowerHalf ? 0 : 1;
            s.sameIndexCorrected = s.sameLowerHalf ? s.sameIndex : (s.sameIndex - Math.ceil(s.sameTotalHalf));
        });
    });

    maxSame = _.chain(currLinks)
        .sortBy(function(x) {
            return x.sameTotal;
        })
        .last()
        .value().sameTotal;

    _.each(currLinks, function(link) {
        link.maxSameHalf = Math.round(maxSame / 2);
    });

    node = node.data(currNodes, function(d) {return d.id});

    node.exit().transition()
        .attr("r",0)
        .remove();

    node.enter().append("circle")
        .call(function(node) { node.transition().attr("r", R);})
        .merge(node);

    link = link.data(currLinks, function(d) {return d.source.id + "-" + d.target.id;});

    link.exit().transition()
        .attr("stroke-opacity", 0)
        //.attrTween("d", linkArc)
        .remove();


//     	.attrTween("x1", function(d) { return function() { return d.source.x; }; })
//       .attrTween("x2", function(d) { return function() { return d.target.x; }; })
//       .attrTween("y1", function(d) { return function() { return d.source.y; }; })
//       .attrTween("y2", function(d) { return function() { return d.target.y; }; })

    link = link.enter().append('path')
        .call(function(link) {link.transition().attr("stroke-opacity", 1);})
        .call(function(link) {link.transition().attr("d", linkArc)})
        .call(function(link) {link.transition().attr('stroke', function(d){return color(d.T);})})
        .merge(link);

    // copied to here from "Modifying a Force Layout with buttons"

    simulation.nodes(currNodes);
    simulation.force("link").links(currLinks);
    simulation.alpha(1).restart();

}


function ticked() {
//     link
//       .attr('x1', d => d.source.x)
//       .attr('y1', d => d.source.y)
//       .attr('x2', d => d.target.x)
//       .attr('y2', d => d.target.y);
    link.attr("d", linkArc)
    node.attr('transform', d => `translate(${d.x},${d.y})`);
    //node.attr("cx", function(d) { return d.x; })
    //.attr("cy", function(d) { return d.y; })
}

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    //d.fx = null;
    //d.fy = null;
}
function releasenode(d) {
    d.fx = null;
    d.fy = null;
}

function linkArc(d) {
    var dx = (d.target.x - d.source.x),
        dy = (d.target.y - d.source.y),
        dr = Math.sqrt(dx * dx + dy * dy),
        unevenCorrection = (d.sameUneven ? 0 : 0.5);
    // curvature term defines how tight the arcs are (lower number = tigher curve)
    var curvature = 2,
        arc = (1.0/curvature)*((dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection));

    //console.log(d.maxSameHalf)
    //d.maxSameHalf always showing zero...
    if (d.sameMiddleLink) {
        arc = 0;
    }

    return "M" + d.source.x + "," + d.source.y + "A" + arc + "," + arc + " 0 0," + d.sameArcDirection + " " + d.target.x + "," + d.target.y;
}

const linkedByIndex = {};
currLinks.forEach(d => {
    linkedByIndex[`${d.source.index},${d.target.index}`] = 1;
});

function isConnected(a, b) {
    return linkedByIndex[`${a.index},${b.index}`] || linkedByIndex[`${b.index},${a.index}`] || a.index === b.index;
}

//Fade rules for hovering over nodes
function fade(opacity) {
    return d => {
        node.style('stroke-opacity', function (o) {
            const thisOpacity = isConnected(d, o) ? 1 : opacity;
            this.setAttribute('fill-opacity', thisOpacity);
            return thisOpacity;
        });

        link.style('stroke-opacity', o => (o.source === d || o.target === d ? 1 : opacity));

    };
}

//Specific Fade Rules for Link Hover Instances
function linkFade(opacity) {
    return d => {
        node.style('stroke-opacity', function(o){
            const thisOpacity = isConnected(d.source, o) && isConnected(d.target, o)? 1 : opacity;
            this.setAttribute('fill-opacity', thisOpacity);
            return thisOpacity;
        });

        link.style('stroke-opacity', o => (o.source === d.source && o.target === d.target ? 1 : opacity));
    }
}


//Legend Details
var sequentialScale = d3.scaleOrdinal(colorScale)
    .domain(['Am',
        'An',
        'Ar',
        'As',
        'Ba',
        'Br',
        'Ch',
        'Cn',
        'Cy',
        'Gl',
        'Gy',
        'Li',
        'Os',
        'Pr',
        'Vi',
        'Zy']);


svg.append("g")
    .attr("class", "legendSequential")
    .attr("transform", "translate("+(width-140)+","+(height-400)+")");

var legendSequential = d3.legendColor()
    .shapeWidth(30)
    .cells(11)
    .orient("vertical")
    .title("Link legend:")
    .titleWidth(100)
    .scale(sequentialScale)

svg.select(".legendSequential")
    .call(legendSequential);



export default 'myyyy'