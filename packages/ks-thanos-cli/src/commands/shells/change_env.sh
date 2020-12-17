#!/usr/bin/env bash

Usage(){
  echo "$0 [get|set] NgPort [Dev|Test|Gamma]"
}
action=$1
ngPort=$2
ngEnv=$3
# 检测action是否合法
validAction=("get" "set")
actionIsValid="no"
for ac in ${validAction[@]}; do
   if [ "$action" == "$ac" ]; then
    actionIsValid="yes"
    break
  fi
done
if [ "$actionIsValid" == "no" ]; then
  echo "params 'action' is invalid"
  Usage
  exit 1
fi

# 配置路径
confPath="/usr/local/etc/nginx/conf/kms.conf"
# confPath="/Users/aron/Downloads/long_text_2020-12-16-10-45-53.txt"
# nginx命令路径
nginx="/usr/local/bin/nginx"

if [ "$action" == "get" ]; then
  sed -n "/^ *listen $ngPort/,/^ *set \$kmsenv/p" $confPath | tail -1 |awk '{print $NF}'
else
  # 如果action是set的时候需要检测传递的env是否合法
  validEnv=("Dev" "Test" "Gamma")
  envIsvalid="no"
  for env in ${validEnv[@]}; do
     if [ "$env" == "$ngEnv" ]; then
      envIsvalid="yes"
      break
    fi
  done
  if [ "$envIsvalid" == "no" ]; then
    echo "params 'env' is invalid"
    Usage
    exit 1
  fi
    sed -i"_bak" "/^ *listen $ngPort/,/^ *set \$kmsenv/s/\(set \$kmsenv\) .*/\1 $ngEnv;/" $confPath
     # 配置检测
    $nginx -t
    # ng重启
    $nginx -s reload
fi
