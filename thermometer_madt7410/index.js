// Express
var express = require('express');
var app = express();

app.use(express.static('htdocs'));

var port = 3000;

app.listen(port, function(){
	console.log("Express サーバがポート%dで起動しました。モード:%s"
		, port, app.settings.env);
});

