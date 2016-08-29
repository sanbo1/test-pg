require('date-utils');
var i2c = require('i2c');
var fs  = require('fs');

var I2C_ADDR = 0x48;

var dt = new Date();
var nowTime = dt.toFormat("YYYY/MM/DD HH24:MI:SS");
var nowDay = dt.toFormat("YYYYMMDD");

var LOG_DIR = "./logs";
var LOG_FILE = LOG_DIR + "/" + nowDay + ".log";
var LOG_CSV_FILE = LOG_DIR + "/" + nowDay + ".csv";

var sensor = new i2c(I2C_ADDR, {device: '/dev/i2c-1'});
readValue = function() {
	sensor.readBytes(0x00, 2, function(err, data) {
		var temp;
		temp = (data[0] << 8 | data[1]) >> 3;
		if (temp >= 4096) {
			temp -= 8192;
		}
		value = temp * 0.0625;
		console.log("[" + nowTime + "] temp=" + value);

		// 小数点第2位で四捨五入
		var value2 = value * 10;
		var value2 = Math.round(value2) / 10;
		console.log("[" + nowTime + "] temp=" + value2);

		// 小数点第2位で切り上げ
		var value3 = value * 10;
		var value3 = Math.ceil(value3) / 10;
		console.log("[" + nowTime + "] temp=" + value3);

		// 小数点第2位で切り捨て
		var value4 = value * 10;
		var value4 = Math.floor(value4) / 10;
		console.log("[" + nowTime + "] temp=" + value4);

		// ファイル書き込み
//		fs.appendFileSync(LOG_FILE, "[" + nowTime + "] temp=" + value + "\n", "utf8");
//		fs.appendFileSync(LOG_CSV_FILE, value + ", ", "utf8");
	});
};

readValue();


