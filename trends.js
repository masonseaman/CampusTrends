"use strict";
var trends = [
				{name: "trend1", coordinates: "40.7127837,-74.00594130000002"},
				{name: "trend2", coordinates: "40.7127837,-74.00594130000002"},
				{name: "trend3", coordinates: "40.7127837,-74.00594130000002"},
				{name: "trend4", coordinates: "40.7127837,-74.00594130000002"},
				{name: "trend5", coordinates: "40.7127837,-74.00594130000002"}
			]
			
document.getElementById('trends').addEventListener("click", show);

function show()
{
	for(var trend of trends)
	{
		$('#trendsListDisplay').append('<div> Trend: ' + trend.name + 'Coordinates: ' + trend.coordinates);
	}
}