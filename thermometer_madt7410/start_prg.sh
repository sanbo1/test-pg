#!/bin/sh

### このファイルの置かれている場所を取得
MYPATH=$(cd $(dirname $(readlink -f $0)); pwd);

sudo ${MYPATH}/node_modules/forever/bin/forever start index.js
