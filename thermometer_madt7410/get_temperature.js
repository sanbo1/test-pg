/////////////////////////////////
// thermometer_madt7410 index
/////////////////////////////////
////////////
// define
////////////
var I2C_ADDR = 0x48;

////////////
// require
////////////
require('date-utils');
var i2c = require('i2c');
var fs  = require('fs');

////////////
// main
////////////
var dt = new Date();
var nowTime = dt.toFormat("YYYY/MM/DD HH24:MI:SS");
var nowDay = dt.toFormat("YYYYMMDD");

var LOG_DIR = "/home/pi/test-pg/thermometer_madt7410/logs";
var LOG_FILE = LOG_DIR + "/" + nowDay + ".log";
var LOG_CSV_FILE = LOG_DIR + "/" + nowDay + ".csv";

var sensor = new i2c(I2C_ADDR, {device: '/dev/i2c-1'});

// 現在の温度データ取得＆対象ファイルへ保存
readValue = function() {
	sensor.readBytes(0x00, 2, function(err, data) {
		var temp;
		temp = (data[0] << 8 | data[1]) >> 3;
		if (temp >= 4096) {
			temp -= 8192;
		}
		value = temp * 0.0625;

		// 小数点第2位で四捨五入
		var value2 = value * 10;
		var value2 = Math.round(value2) / 10;

/*
		// 小数点第2位で切り上げ
		var value3 = value * 10;
		var value3 = Math.ceil(value3) / 10;

		// 小数点第2位で切り捨て
		var value4 = value * 10;
		var value4 = Math.floor(value4) / 10;
*/

		// ファイル書き込み
		fs.appendFileSync(LOG_FILE, "[" + nowTime + "] temp=" + value2 + "\n", "utf8");
		fs.appendFileSync(LOG_CSV_FILE, value2 + ",", "utf8");
	});
};

readValue();


/////////////////
// memo : add corntab (crontab -e)
/////////////////
// #save temp (every 10 min.)
// */10 * * * * /usr/local/bin/node /home/pi/test-pg/thermometer_madt7410/get_temperature.js

