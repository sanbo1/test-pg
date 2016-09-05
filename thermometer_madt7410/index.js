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

	// logs以下のcsvファイル名リストを取得 / 送信
	fs.readdir(LOG_DIR, function(err, files){
	    if (err) throw err;
	    var fileList = [];
	    files.filter(function(file){
	        return fs.statSync(LOG_DIR + "/" + file).isFile() && /.*\.csv$/.test(file); //絞り込み
	    }).forEach(function (file) {
	        fileList.push(file);
	    });
	    //console.log(fileList);

		// 降順ソート
		fileList.sort(function(a,b){
			if( a > b ) return -1;
			if( a < b ) return 1;
			return 0;
		});

		res.send(fileList);
	});
});


// http get 設定
app.get('/get-csv', function(req, res) {
	var target = req.query.date;
	var range = req.query.range;

	// 日付文字列を成形
	var dateStr = target.substr(0, 4) + '-' + target.substr(4, 2) + '-' + target.substr(6,2);
	// 文字列から日付型オブジェクト生成
	var target_day = new Date(dateStr);

	var ret = "";
	for (var i = 0; i < range; i++) {
		target = target_day.toFormat("YYYYMMDD");
		var target_file = "./logs/" + target + ".csv";
		//console.log("target file [" + target_file + "]");
		if (isExistFile(target_file) == false) {
			// 対象日付のデータファイルなし
			//console.log("No such file [" + target_file + "]");
			// 対象日のデータ取得後、次のループ用に対象日を１日前にセットする
			target_day = new Date(target_day.setDate(target_day.getDate() - 1));
			continue;
		}

		// 対象ファイルからデータ読み込み
		var tmp = fs.readFileSync(target_file, 'utf8');
		// １日１行の形でCSVデータを追記していく
		ret += target + "," + tmp.replace(/\r?\n/g, '') + '\n';

		// 対象日のデータ取得後、次のループ用に対象日を１日前にセットする
		target_day = new Date(target_day.setDate(target_day.getDate() - 1));
	}

	res.send(ret);
});

app.listen(port, function(){
	console.log("Express サーバがポート%dで起動しました。モード:%s"
		, port, app.settings.env);
});

