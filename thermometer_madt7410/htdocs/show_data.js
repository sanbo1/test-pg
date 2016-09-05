/////////////////////////////////
// thermometer_madt7410 index
/////////////////////////////////
////////////
// define
////////////
var dt = new Date();
var nowDay = dt.getFullYear() + ('0' + (dt.getMonth() + 1)).slice(-2) + ('0' + dt.getDate()).slice(-2);

var LOG_DIR = "../logs";
var LOG_FILE = LOG_DIR + "/" + nowDay + ".log";
var LOG_CSV_FILE = LOG_DIR + "/" + nowDay + ".csv";

var timeFormat =
[
	"00:00","00:10","00:20","00:30","00:40","00:50",
	"01:00","01:10","01:20","01:30","01:40","01:50",
	"02:00","02:10","02:20","02:30","02:40","02:50",
	"03:00","03:10","03:20","03:30","03:40","03:50",
	"04:00","04:10","04:20","04:30","04:40","04:50",
	"05:00","05:10","05:20","05:30","05:40","05:50",
	"06:00","06:10","06:20","06:30","06:40","06:50",
	"07:00","07:10","07:20","07:30","07:40","07:50",
	"08:00","08:10","08:20","08:30","08:40","08:50",
	"09:00","09:10","09:20","09:30","09:40","09:50",
	"10:00","10:10","10:20","10:30","10:40","10:50",
	"11:00","11:10","11:20","11:30","11:40","11:50",
	"12:00","12:10","12:20","12:30","12:40","12:50",
	"13:00","13:10","13:20","13:30","13:40","13:50",
	"14:00","14:10","14:20","14:30","14:40","14:50",
	"15:00","15:10","15:20","15:30","15:40","15:50",
	"16:00","16:10","16:20","16:30","16:40","16:50",
	"17:00","17:10","17:20","17:30","17:40","17:50",
	"18:00","18:10","18:20","18:30","18:40","18:50",
	"19:00","19:10","19:20","19:30","19:40","19:50",
	"20:00","20:10","20:20","20:30","20:40","20:50",
	"21:00","21:10","21:20","21:30","21:40","21:50",
	"22:00","22:10","22:20","22:30","22:40","22:50",
	"23:00","23:10","23:20","23:30","23:40","23:50",
];

ccchart.base('', {config : {
	"type" : "line", //チャート種類
	"useVal" : "no", //値を表示

	"xScaleFont" : "100 16px 'meiryo'", //水平軸目盛フォント
	"xScaleRotate" : "45", //水平軸目盛傾き
	"xScaleSkip" : "18", //水平軸目盛スキップ数
	"yScaleFont" : "100 16px 'meiryo'", //垂直軸目盛フォント

	"useHanrei" : "yes", //凡例の使用有無
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
		"colorSet" : ["red", "blue","yellow","#FF9114","#3CB000","#00A8A2","#0036C0","#C328FF","#FF34C0"], //データ列の色
		"minY" : 20, //Y軸最小値
		"maxY" : 40, //Y軸最大値
		"axisXLen" : 10, //水平目盛線の本数
		"roundDigit":0, // 軸目盛値の端数処理
		"unit":"度", // 単位
	},
	"data" : [
		["時間"],
		//[nowDay],
	 ]
};

////////////
// main
////////////
///////////////////////////////////////////
//CSVファイルを読み込む関数getCSV()の定義
///////////////////////////////////////////
function showTargetDate() {
	//console.log("call showTargetDate()");

    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成

    req.open("get", "get-csv-list", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行

    // レスポンスが返ってきたらプルダウンリストに設定
    req.onload = function(){
		console.log(req.responseText); // 渡されるのは読み込んだCSVデータ

		var file_list = JSON.parse(req.responseText);
		var target_date = document.forms.targetDate.target_date;
		target_date.options.length = 0;
		for (var i=0; i < file_list.length; i++) {
			target_date.options[i] = new Option(file_list[i]);
		}
    }

	var target_range = document.forms.targetDate.target_range;
	target_range.options.length = 0;
	for (var i=0; i < 10; i++) {
		target_range.options[i] = new Option(i+1);
	}
}


function showGraph(target_date, target_range) {
	var t_date = document.targetDate.target_date;
	var t_range = document.targetDate.target_range;

	var target_date = t_date.options[t_date.selectedIndex].text;
	var target_range = t_range.options[t_range.selectedIndex].text;

	console.log("call showGraph(" + target_date + ", " + target_range + ")");

	getCSV(null);
}

function getCSV(t_d){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成

	console.log(t_d);

	var target_date = "20160828";
	var target_range = "2";

	if (t_d == undefined) {
		target_date = nowDay;
	}

	console.log(target_date);

    req.open("get", "get-csv?date=" + target_date + "&range=" + target_range, true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行

    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
    req.onload = function(){
		convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
}


// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
	//console.log("---------str---------");
	//console.log(str);

    var result = []; // 最終的な二次元配列を入れるための配列
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
		//console.log(result[i]); // 渡されるのは読み込んだCSVデータ
    }

    //alert(result[1][2]); // 300yen
	console.log(result); // 渡されるのは読み込んだCSVデータ
	//console.log(result.length); // 渡されるのは読み込んだCSVデータ

	//var csvData = [22, 23, 24, 25];
	//var csvData = req.responseText;
	//var csvData = result[0];
	var i = 0;
	for (key in timeFormat){
		i++;
		show_chart["data"][0][i] = timeFormat[key];
		//show_chart["data"][1][i] = csvData[key];
	}
	for(i=0; i < result.length - 1; i++) {
		/*
		//show_chart["data"][i+1] = "20160831-" + i;
		var label = "20160831-" + i;
		//target_day = new Date(target_day.setDate(target_day.getDate() - i));
		show_chart["data"][i+1] = [];
		show_chart["data"][i+1][0] = label;
		for(var j=0; j < result[i].length - 1; j++) {
			show_chart["data"][i+1][j+1] = result[i][j];
		}
		*/
		/*
		show_chart["data"][i+1] = [];
		for(var j=0; j < result[i].length - 1; j++) {
			show_chart["data"][i+1][j] = result[i][j];
		}
		*/
		show_chart["data"][i+1] = [];
		for(var j=0; j < timeFormat.length; j++) {
			if (j < result[i].length - 1/* 最後の１文字は改行 */) {
				show_chart["data"][i+1][j] = result[i][j];
			} else {
				show_chart["data"][i+1][j] = null;
			}
		}
	}
	console.log(show_chart);

	// 第一引数：canvasのID、第二引数：設定とデータが入ったハッシュ
	ccchart.init("show_chart", show_chart);

}


