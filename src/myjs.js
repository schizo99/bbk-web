import Chart from "chart.js";
import ChartAnnotation from 'chartjs-plugin-annotation';
var measurement = document.currentScript.getAttribute('measurement');
var threshold = document.currentScript.getAttribute('threshold');
console.log(threshold);

let data = JSON.parse(measurement)
data = data.results[0].series[0].values;

var download = data.map(o => {
    return {x: o[0], y: o[1]}
});
var upload = data.map(o => {
    return {x: o[0], y: o[2]}
});
var s1 = {label: "download", fill: false, backgroundColor: "green",borderColor: "green",data: download}
var s2 = {label: "upload", fill: false, backgroundColor: "yellow", borderColor: "yellow",data: upload}
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: { datasets: [s1, s2] },
    plugins: [ChartAnnotation],
    options: {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                type: 'time',
                time: {
                    tooltipFormat:'YYYY-MM-DD HH:mm:ss',
                    unit: 'hour'
                }
            }]
        },
    annotation: {
        annotations: [{
            drawTime: 'afterDraw', // overrides annotation.drawTime if set
            id: 'a-line-1', // optional
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: threshold,
            borderColor: 'red',
            borderWidth: 2
        }]
    }
    },
});


// renderChart();
 var slider = document.getElementById("myRange");
 var output = document.getElementById("demo");
 output.innerHTML = slider.value; // Display the default slider value

// // Update the current slider value (each time you drag the slider handle)
 slider.oninput = function() {
   output.innerHTML = this.value;
 }

 slider.onchange = function() {
    var url = window.location.origin;
    url += "/"+this.value;
    window.location.href = url;
 }
