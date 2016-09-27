### 音声解析手順
参考サイト
=====
http://www.neko.ne.jp/~freewing/raspberry_pi/raspberry_pi_3_julius/
-----
http://qiita.com/t_oginogin/items/f0ba9d2eb622c05558f4
=====

###############################
### julius 標準インストール
###############################
## マイクの認識
# USBマイク接続前
sudo cat /proc/asound/modules
-----
0 snd_bcm2835
-----

# USBマイク接続後
sudo cat /proc/asound/modules
-----
0 snd_bcm2835
1 snd_usb_audio
-----

## USBマイクのカード番号とデバイス番号を調べる
arecord -l
=====
**** List of CAPTURE Hardware Devices ****
card 1: Device [USB PnP Audio Device], device 0: USB Audio [USB Audio]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
=====
# 上記の場合だと「card 1」と「device 0」

## USBマイクの音量を確認する(card 1 なので -c 1 オプションを指定)
amixer sget Mic -c 1
=====
Simple mixer control 'Mic',0
  Capabilities: cvolume cvolume-joined cswitch cswitch-joined
  Capture channels: Mono
  Limits: Capture 0 - 62
  Mono: Capture 46 [74%] [14.62dB] [on]
=====
# 上記の場合だと現在は「46」の設定(最大62)

## USBマイクの音量を最大設定する
amixer sset Mic 62 -c 1
=====
Simple mixer control 'Mic',0
  Capabilities: cvolume cvolume-joined cswitch cswitch-joined
  Capture channels: Mono
  Limits: Capture 0 - 62
  Mono: Capture 62 [100%] [22.50dB] [on]
=====


## 音声解析ソフトインストール

$ cd
$ wget https://github.com/julius-speech/julius/archive/master.zip
$ mv master.zip julius-master.zip
$ unzip julius-master.zip
$ cd julius-master
$ ./configure --with-mictype=alsa
$ make

configure: error: no ALSA header!
configure: error: ./configure failed for libsent
　のエラーの場合は下記のコマンドでライブラリをインストールする。
$ sudo aptitude install libasound2-dev


## 　ディクテーションデータ（音声認識辞書）
$ cd
$ wget https://github.com/julius-speech/dictation-kit/archive/master.zip
$ mv master.zip dictation-kit-master.zip
$ unzip dictation-kit-master.zip
$ cd ./dictation-kit-master
$ ~/julius-master/julius/julius -C main.jconf -C am-gmm.jconf -nostrip


-----
参考サイト
=====
https://github.com/hecomi/node-julius
-----
[boost]
http://llamerad-jp.hatenablog.com/entry/2016/03/29/000957
-----
[clang]
http://llamerad-jp.hatenablog.com/entry/2016/03/28/233644
-----
[MeCab]
http://www.neko.ne.jp/~freewing/raspberry_pi/raspberry_pi_3_mecab_morphological_analysis/
=====
###############################
### node-julius インストール
###############################
$ sudo apt-get update
$ sudo apt-get upgrade
を行う
node-julius の動作に必要なもののインストール
## gcc -> 初めから入っている
## boost -> 上記サイトを参照
# まずは cmake のインストール
$ sudo apt-get install pkg-config automake libtool libffi-dev libatomic1 gcc-4.8 g++-4.8 minizip
$ mkdir <作業ディレクトリ>
$ cd <作業ディレクトリ>
$ wget https://cmake.org/files/v3.5/cmake-3.5.0.tar.gz		# https://cmake.org を参照し、最新バージョンを調べておく
$ tar vzxf cmake-3.5.0.tar.gz
$ cd cmake-3.5.0
$ ./configure --prefix=<インストール先>			# /usr/local
$ make -j2
$ sudo make install

# clang のインストール
$ cd <作業ディレクトリ>
$ wget http://llvm.org/releases/3.8.0/llvm-3.8.0.src.tar.xz  http://llvm.org/releases/3.8.0/cfe-3.8.0.src.tar.xz http://llvm.org/releases/3.8.0/compiler-rt-3.8.0.src.tar.xz http://llvm.org/releases/3.8.0/libcxx-3.8.0.src.tar.xz http://llvm.org/releases/3.8.0/openmp-3.8.0.src.tar.xz
$ tar -Jxvf llvm-3.8.0.src.tar.xz
$ tar -Jxvf cfe-3.8.0.src.tar.xz
$ tar -Jxvf compiler-rt-3.8.0.src.tar.xz
$ tar -Jxvf libcxx-3.8.0.src.tar.xz
$ tar -Jxvf openmp-3.8.0.src.tar.xz
$ $ mv cfe-3.8.0.src llvm-3.8.0.src/tools/clang
$ mv compiler-rt-3.8.0.src llvm-3.8.0.src/projects/compiler-rt
$ mv libcxx-3.8.0.src llvm-3.8.0.src/projects/libcxx
$ mv openmp-3.8.0.src llvm-3.8.0.src/projects/openmp
$ cd llvm-3.8.0.src/
$ mkdir build
$ cd build
$ <インストール先>/cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX=<インストール先> -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_COMPILER=gcc-4.8 -DCMAKE_CXX_COMPILER=g++-4.8 -DLIBCXX_CXX_ABI=libstdc++ -DLLVM_TARGETS_TO_BUILD="ARM;X86;AArch64" ..
$ make -j2
$ sudo make install

## MeCab -> 上記サイトを参照

## node-julisu
$ cd YOUR_NODE_PROJECT_DIR
$ git clone https://github.com/hecomi/node-julius
$ mkdir node_modules
$ mv node-julius node_modules/julius
$ cd node_modules/julius
$ make



