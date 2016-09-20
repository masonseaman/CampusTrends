"use strict";
var trends = [
				{name: "trend1", coordinates: "40.7127837,-74.00594130000002"},
				{name: "trend2", coordinates: "40.7127837,-74.00594130000002"},
				{name: "trend3", coordinates: "40.7127837,-74.00594130000002"},
				{name: "trend4", coordinates: "40.7127837,-74.00594130000002"},
				{name: "trend5", coordinates: "40.7127837,-74.00594130000002"}
			];
			
index.getElementById('trends').addEventListener("click", show);

function show()
{
	for(var trend of trends)
	{
		$('#trend_table').append('<tr> <td> Trend: ' + trend.name + '</td> <td> Coordinates: ' + trend.coordinates + '</td> </tr> ');
	}
}
