require('date-utils');

var dt = new Date();
var nowTime = dt.toFormat("YYYY/MM/DD HH24:MI:SS");
var nowDay = dt.toFormat("YYYYMMDD");

var LOG_DIR = "../logs";
var LOG_FILE = LOG_DIR + "/" + nowDay + ".log";
var LOG_CSV_FILE = LOG_DIR + "/" + nowDay + ".csv";

ccchart.base('', {config : {
	"type" : "line", //チャート種類
	"useVal" : "yes", //値を表示
	"xScaleFont" : "100 16px 'meiryo'", //水平軸目盛フォント
	"yScaleFont" : "100 16px 'meiryo'", //垂直軸目盛フォント
	"hanreiFont" : "bold 16px 'meiryo'", //凡例フォント
	"valFont" : "bold 16px 'meiryo'", //値フォント
	"paddingTop" : "25", //上パディング
	"paddingRight" : "140", //右パディング
	"colorSet" : ["blue"], //データ列の色
	"useShadow" : "no", //影
	"width" : "900", //チャート幅
	"height" : "600", //チャート高さ
	"useMarker" : "arc", //マーカー種類
	"markerWidth" : "7", //マーカー大きさ
	"valYOffset" : "8", //値オフセット
	"valXOffset" : "-8", //値オフセット
	//"bg" : "#fff", //背景色
	//"textColor" : "#333", //テキスト色
	"lineWidth" : "1", //ラインの太さ
}});



var show_chart = {
	"config" : {
		"colorSet" : ["red"], //データ列の色
		"minY" : 0, //Y軸最小値
		"maxY" : 100, //Y軸最大値
		"axisXLen" : 10, //水平目盛線の本数
		"roundDigit":0, // 軸目盛値の端数処理
	},
	"data" : [
		["日付"],
		["売上A"],
	 ]
};

// チャート用データ設定
var sales1 = {4:10, 5:30, 6:40, 7:30, 8:60, 9:50};
var i = 0;
for (key in sales1){
	i++;
	show_chart["data"][0][i] = key;
	show_chart["data"][1][i] = sales1[key];
}

// 第一引数：canvasのID、第二引数：設定とデータが入ったハッシュ
ccchart.init("show_chart", show_chart);


