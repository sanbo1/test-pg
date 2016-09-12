
/////////////////////
sudo apt-get update

sudo apt-get install ssmtp

sudo vi /etc/ssmtp/ssmtp.conf
=====
	root=my_gmail_addr@gmail.com
	mailhub=smtp.gmail.com:587

	AuthUser=my_gmail_addr@gmail.com
	AuthPass=may_gmail_password
	UseSTARTTLS=YES
=====

gmail setting
=====
１．PCブラウザでgmailでログイン
２．右上の「s」マークをクリック
３．アカウント情報の中から「ログインとセキュリティ」を選択
４．ページ下方の「安全性の低いアプリの許可」を有効化
=====

sudo apt-get install mailutils

=====
・コマンド例１
-----
mail target_addr@i.softbank.jp
Cc:
Subject:This is test
this is test mail from raspi
(本文を書き終えたら"Ctrl+d"でしばらく待つと入力終了＆送信)
=====
=====
・コマンド例２
-----
mail -s "test" target_addr@i.softbank.jp << EOT
> 引数でいろいろ指定したうえでメールを送ってみる。
> 複数行もいけるのだろうか？
> EOT
=====

sudo apt-get install mutt

vi ~/.muttrc
=====
	set sendmail="/usr/sbin/ssmtp"	# ssmtpのある場所
	set realname="test mailer"		# メールの差出人名
	set from="raspi@host.jp"		# 受信者のメールクライアントで「From」に表示させるメールアドレス
=====

=====
・コマンド例１
-----
mutt -s "Subject" "送信先アドレス" -c "CCアドレス" -a "添付ファイルのフルパス" < "本文のtxtファイルのパス"
=====
=====
・コマンド例２
-----
mutt -s "Subject" "送信先アドレス" -c "CCアドレス" -a "添付ファイルのフルパス" << EOF
"本文"
EOF
=====


