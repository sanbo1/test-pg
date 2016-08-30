// Express
var express = require('express');
var app = express();

var fs = require('fs');

var dt = new Date();
var nowDay = dt.getFullYear() + ('0' + (dt.getMonth() + 1)).slice(-2) + ('0' + dt.getDate()).slice(-2);

app.use(express.static('htdocs'));
/*
*/
app.get('/get-csv', function(req, res) {
	//var test = fs.readFileSync("./logs/" + nowDay + ".csv");
	var test = fs.readFileSync("./logs/20160829.csv");
	res.send(test);
});

var port = 3000;

app.listen(port, function(){
	console.log("Express サーバがポート%dで起動しました。モード:%s"
		, port, app.settings.env);
});

