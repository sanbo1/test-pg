#!/bin/sh

### このファイルの置かれている場所を取得
MYPATH=$(cd $(dirname $(readlink -f $0)); pwd);

# startup file
FILE_NM="start_my_prg2"

### startup 用フォルダ
TARGET="/etc/init.d/${FILE_NM}"

### startup 用ファイル作成
if [ ! -e ${TARGET} ]; then
cat << EOS > ./tmp.sh
#!/bin/sh
### DEGIN INIT INFO
# Provides:			${FILE_NM}
# Required-Start:	$local_fs
# Required-Stop:	$local_fs
# Default-Start:	2 3 4 5
# Default-Stop:		0 1 6
# Short-Description:	${FILE_NM}
### END INIT INFO

cd ${MYPATH}

${MYPATH}/node_modules/forever/bin/forever start index.js

EOS
fi

### 作成した一時ファイルをスタートアップ用フォルダに移動
sudo mv ./tmp.sh ${TARGET}

### 実行権限付与
sudo chmod 755 ${TARGET}

### スタートアップ設定
sudo insserv -d ${TARGET}

### スタートアップ解除
#sudo insserv -r ${TARGET}

