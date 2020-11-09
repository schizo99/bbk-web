const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require("path")
const http = require("http")
var fs = require('fs');
const port = 8000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//render home page
app.get('/:days?', function(req, res) {
    var days = req.params["days"]
    if (days == undefined) days = 30
    var host = "localhost"
    http.get("http://"+host+":8086/query?db=bbk&q=select+download,upload+from+bbk+WHERE+time+>=+now()+-+"+days+"d", (resp) => {
      let data = ''
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        var measurement = JSON.parse(data);
        ejs.renderFile('./index.ejs', {measurement: measurement, days: days}, {}, function(err, template) {
          if (err)
            throw err;
          else
            res.end(template);
        });
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
    // }
});

app.listen(port, function(error) {
    if (error)
      throw error;
    else
      console.log("Server is running");
});

