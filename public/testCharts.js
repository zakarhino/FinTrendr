var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

var testVals = makeTestVals();
var testVals2 = makeTestVals();
var testLabels = generateDateLabels(3,2016);

function makeTestVals() {
  var output = [];
  for ( var i = 0; i < 24; i++ ) {
    output.push(randomScalingFactor());
  }
  return output;
}

function generateDateLabels(startMonth,startYear) {
  var output = [];
  var curMonth = startMonth;

  var months = {
    1 : "Jan",
    2 : "Feb",
    3 : "Mar",
    4 : "Apr",
    5 : "May",
    6 : "June",
    7 : "July",
    8 : "Aug",
    9 : "Sept",
    10 : "Oct",
    11 : "Nov",
    12 : "Dec"
  }

  for ( var i = 0; i < 24; i ++ ) {
    output.unshift(months[curMonth] + " " + startYear);
    if ( curMonth > 1 ) {
      curMonth--;
    } else {
      curMonth = 12;
      startYear -= 1;
    }
  }

  return output;
}

function newBarChart (labels, setOne, setTwo){
  var chartData = barChartData = {
  labels : labels,
  datasets : [
    {
      fillColor : "rgba(220,220,220,0.5)",
      strokeColor : "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data : setOne
    },
    {
      fillColor : "rgba(151,187,205,0.5)",
      strokeColor : "rgba(151,187,205,0.8)",
      highlightFill : "rgba(151,187,205,0.75)",
      highlightStroke : "rgba(151,187,205,1)",
      data : setTwo
    }
  ]
  };
  return chartData;
}
/*
// Bar Chart Properties
//Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
  scaleBeginAtZero : true,
//Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines : true,
//String - Colour of the grid lines
  scaleGridLineColor : "rgba(0,0,0,.05)",
//Number - Width of the grid lines
  scaleGridLineWidth : 1,
//Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,
//Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: true,
//Boolean - If there is a stroke on each bar
barShowStroke : true,
//Number - Pixel width of the bar stroke
  barStrokeWidth : 2,
//Number - Spacing between each of the X value sets
  barValueSpacing : 5,
//Number - Spacing between data sets within X values
  barDatasetSpacing : 1,
//String - A legend template
  legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
*/

var barChartData = newBarChart(testLabels, testVals,testVals2);

window.onload = function(){
  var ctx_bar = document.getElementById("barChartOne").getContext("2d");
  window.myBar = new Chart(ctx_bar).Bar(barChartData, {
    responsive : true
  });
}