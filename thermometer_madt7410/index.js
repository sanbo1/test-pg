var i2c = require('i2c');
var fs  = require('fs');

var ADDR = 0x48;
//var INTERVAL = 1000;
var INTERVAL = 5000;

var sensor = new i2c(ADDR, {device: '/dev/i2c-1'});
readValue = function() {
	sensor.readBytes(0x00, 2, function(err, data) {
		var temp;
		temp = (data[0] << 8 | data[1]) >> 3;
		if (temp >= 4096) {
			temp -= 8192;
		}
		value = temp * 0.0625;
		console.log(value);
		fs.appendFileSync("test.txt", value + ", ", "utf8");
	});
};

setInterval(function() {
	readValue();
},INTERVAL);

