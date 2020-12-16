#!/usr/bin/env bash

Usage(){
  echo "$0 NgPort [Dev|Test|Gamma]"
}

if [ $# != 2 ]; then
  Usage
  exit 1
fi
ngPort=$1
ngEnv=$2
# 检测传递的env是否合法
validEnv=("Dev" "Test" "Gamma")
envIsvalid="no"
for env in ${validEnv[@]}; do
   if [ "$env" == "$ngEnv" ]; then
    envIsvalid="yes"
    break
  fi
done
if [ "$envIsvalid" == "no" ]; then
  Usage
  exit 1
fi
# nginx命令路径
nginx="/usr/local/bin/nginx"
# 配置路径
confPath="/usr/local/etc/nginx/conf/kms.conf"
# 替换命令
sed -i"_bak" "/^ *listen $ngPort/,/^ *set \$kmsenv/s/\(set \$kmsenv\) .*/\1 $ngEnv/" $confPath
# 配置检测
$nginx -t
# ng重启
$nginx -s reload
