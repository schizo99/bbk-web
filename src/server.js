const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require("path")
var fs = require('fs');
const port = 8000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//render home page
app.get('/:days?', function(req, res) {
    var days = req.params["days"]
    if (days == undefined) days = 30
    console.log(days)
    ejs.renderFile('./src/index.ejs', {days: days}, {}, function(err, template) {
      if (err)
        throw err;
      else
        res.end(template);
    });
    // }
});

app.listen(port, function(error) {
    if (error)
      throw error;
    else
      console.log("Server is running");
});

