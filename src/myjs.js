import Chart from "chart.js";
import ChartAnnotation from 'chartjs-plugin-annotation';
function updateContainer(err){
    var container = document.getElementById('container')
    var tag = document.createElement("p");
    var text = document.createTextNode("Failed to fetch datapoints, unable to render chart");
    tag.appendChild(text);
    container.appendChild(tag)
}
var days = document.currentScript.getAttribute('days');

function renderChart() {
    console.log("render")
    fetch("http://influxdb:8086/query?db=bbk&q=select+download,upload+from+bbk+WHERE+time+>=+now()+-+"+days+"d")
    .catch(err => updateContainer(err))
    .then(response => response.json())
    .then(data => {
        console.log(data);
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
                    value: '100',
                    borderColor: 'red',
                    borderWidth: 2
                }]
            }
        
            },
        });
    });

}

renderChart();
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  days = this.value;
}

slider.onchange = function() {
    renderChart();
}
