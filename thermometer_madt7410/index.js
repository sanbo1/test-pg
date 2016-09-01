/////////////////////////////////
// thermometer_madt7410 index
/////////////////////////////////
////////////
// define
////////////
var port = 3000;

////////////
// require
////////////
var express = require('express');
var app = express();
var fs = require('fs');

////////////
// main
////////////
// file exist check
function isExistFile(file) {
	try {
		fs.statSync(file);
		return true
	} catch(err) {
		// ENOENT は「No such file or directory」のエラーコード
		if(err.code === 'ENOENT') return false
	}
}

// 静的ファイル設定
app.use(express.static('htdocs'));

// http get 設定
app.get('/get-csv', function(req, res) {
	var target = req.query.date;
	var range = req.query.range;

	console.log("target [" + target + "]");
	console.log("range [" + range + "]");

	var ret = "";
	for (var i = 0; i < range; i++) {
		var target_file = "./logs/" + target + ".csv";
		if (isExistFile(target_file) == false) {
			console.log("No such file [" + target_file + "]");
			res.send(null);
			continue;
		}

		//var test = fs.readFileSync("./logs/" + nowDay + ".csv");
		//var test = fs.readFileSync("./logs/20160829.csv");
		var tmp = fs.readFileSync(target_file);
		//ret = ret + tmp.replace(/\r?\n/g, '') + '\n';
		ret += tmp;
	}

	//console.log("---------ret---------");
	//console.log(ret);

	res.send(ret);
});

app.listen(port, function(){
	console.log("Express サーバがポート%dで起動しました。モード:%s"
		, port, app.settings.env);
});

