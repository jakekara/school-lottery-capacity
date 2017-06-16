/* Illustrate school lottery capacity versus enrollment (empty seats) */
/* by Jake Kara jake@jakekara.com / CTMirror.org */
/* June 2017 */

/* depedencies */

const d3 = require("d3");
const DATA_FILE = "data/capacity.csv";

var empty_seat_count = function(r)
{
    return Number(r["Capacity"]) - Number(r["Total Students"]);
}

var empty_seat_range = function(r)
{

    var empties = empty_seat_count(r);
    var ret =  d3.range(empties);

    return ret;
}

var has_empties = function(r){
    return empty_seat_count(r) > 0;
}

var below_state_cap = function(r){
    return (r["2016 Caps"] - r["Total Students"]) > 0;
}

var empties_summary = function(r){
    var ret = "";
    if (!has_empties(r)){
	ret += "No empty seats; ";
    }
    else {
	ret += empty_seat_count(r) + " empty seats; ";
    }

    ret += "School capacity: " + r["Capacity"] + "; ";
    ret += "Enrollment: " + r["Total Students"] + "; ";
    ret += "State reimbursement cap: " + r["2016 Caps"];

    return ret;
}


/* go with data */
var go = function(d)
{
    console.log("Going with data", d);

    // TODO - filter data, remove schools where there are no empty seats
    // d = d.filter(function(a){ return empty_seat_count(a) > 25 ; });
    d = d.filter(function(a){ return Number(a["Capacity"]) > 0;});
        
    var div = d3.select("#container");

    var school_boxes = div.selectAll(".school_box")
	.data(d)
	.enter()
	.append("div")
	.classed("school_box", true)

    var school_name = school_boxes
	.append("h5")
	.classed("school_name", true)
    
    var summary = school_name.append("span")
	.classed("summary", true);
    

    school_name.append("span")
	.text(function(d){
	    var ret =  d["School"]
	    return ret;
	});

    school_boxes.append("div").classed("clear-both", true);

    var details = school_boxes.append("div").classed("details", true);
    
    var empty_seats_container = details
	.append("div")
	.classed("empty_seat_container", true)

    var empty_seats = empty_seats_container
	.selectAll(".empty_seat")
	.data(empty_seat_range)
	.enter()
	.append("div")
	.classed("box", true)
	.classed("empty_seat", true);


    summary.append("div").classed("box", true).classed("has_empties", has_empties)
    summary.append("div").classed("box", true).classed("below_state_cap", below_state_cap)
    
    var subhed = details.append("div")
	.classed("school_subhed", true)
	.text(empties_summary);

    empty_seats_container.append("div").classed("clear-both", true);

    school_name.on("click",function(a){
	console.log("clicked",this.parentNode);
	var showing = (d3.select(this.parentNode).select(".details").style("display") != "none")
	d3.selectAll(".details").style("display","none");

	if (!showing)
	    d3.select(this.parentNode).select(".details").style("display",null);
    });
    d3.selectAll(".details").style("display","none");
}

/* get data and go */
d3.csv(DATA_FILE, go);
