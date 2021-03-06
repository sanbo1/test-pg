#!/bin/sh

DEVID="28-021563e37cff"

NOW=$(echo $(date +%Y/%m/%d-%H:%M:%S) | sed -e "s/[\r\n]\+//g")

cat /sys/bus/w1/devices/$DEVID/w1_slave | while read line
do
if [ $(echo "$line" | grep -c "t=") -eq 1 ]; then
	TEMP=$(echo "$line" | grep -e "t=" | sed -e 's/^.*t=\([0-9]*\).*$/\1/')
	echo "[${NOW}] temp=`expr ${TEMP} / 1000`"
fi
done

### crontab -e
# #save temp (every 1 hour)
# 00 * * * * /home/pi/test-pg/thermometer_ds18b20/get_temp.sh >> /home/pi/test-pg/thermometer_ds18b20/temp.log


