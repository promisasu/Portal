'use strict'

function PlotDoughNut(data)
{
var canvas  = document.getElementById("trialChart");
var chart = canvas.getContext("2d");
var i = 0;

chart.lineWidth = 50;
chart.strokeStyle = "#fff";
chart.lineWidth = 50;
chart.strokeStyle = "#fff";
var colors = ["red", "orange", "green"];
var StrokeBegin = 0;
var total = 0;
for(i = 0; i<3; i++)
{
  total = total + data[i];
}

for(i = 0; i<3; i++)
  {
     chart.beginPath();
     chart.strokeStyle = colors[i];
     chart.arc(canvas.width/3, canvas.height/2, 50, StrokeBegin, StrokeBegin + (Math.PI * 2) * (data[i] / total));
     chart.stroke();
     StrokeBegin += (Math.PI * 2) * (data[i] / total);
  }
}



(function trial () {
    'use strict';

    var ctx = document.getElementById('trialChart').getContext('2d');
	PlotDoughNut(window.data.datasets);
    /*new Chart(ctx, {
        type: 'doughnut',
        data: window.data
    });*/
}());
