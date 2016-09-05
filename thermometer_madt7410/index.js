/////////////////////////////////
// thermometer_madt7410 index
/////////////////////////////////
////////////
// define
////////////
var port = 3000;
var LOG_DIR = "./logs";

////////////
// require
////////////
require('date-utils');
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
app.get('/get-csv-list', function(req, res) {
	//console.log("call (get-csv-list)");

	// logs以下のcsvファイル名リストを取得
	// 送信
	fs.readdir(LOG_DIR, function(err, files){
	    if (err) throw err;
	    var fileList = [];
	    files.filter(function(file){
	        return fs.statSync(LOG_DIR + "/" + file).isFile() && /.*\.csv$/.test(file); //絞り込み
	    }).forEach(function (file) {
	        fileList.push(file);
	    });
	    //console.log(fileList);

		res.send(fileList);
	});
});


// http get 設定
app.get('/get-csv', function(req, res) {
	var target = req.query.date;
	var range = req.query.range;

	//console.log("target [" + target + "]");
	//console.log("range [" + range + "]");

	var dateStr = target.substr(0, 4) + '-' + target.substr(4, 2) + '-' + target.substr(6,2);
	var target_day = new Date(dateStr);
	//console.log(target_day);

	var ret = "";
	for (var i = 0; i < range; i++) {
		target_day = new Date(target_day.setDate(target_day.getDate() - i));
		target = target_day.toFormat("YYYYMMDD");
		var target_file = "./logs/" + target + ".csv";
		if (isExistFile(target_file) == false) {
			console.log("No such file [" + target_file + "]");
			res.send(null);
			continue;
		}

		//var test = fs.readFileSync("./logs/" + nowDay + ".csv");
		//var test = fs.readFileSync("./logs/20160829.csv");
		var tmp = fs.readFileSync(target_file, 'utf8');
		//ret = ret + tmp.replace(/\r?\n/g, '') + '\n';
		//ret += tmp;
		//ret += target + "," + tmp;
		//console.log(tmp.toString);
		//console.log(tmp);
		ret += target + "," + tmp.replace(/\r?\n/g, '') + '\n';
	}

	//console.log("---------ret---------");
	//console.log(ret);

	res.send(ret);
});

app.listen(port, function(){
	console.log("Express サーバがポート%dで起動しました。モード:%s"
		, port, app.settings.env);
});

