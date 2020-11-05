#!/bin/sh

# by binacs

if [ $1 == "go" ]; then
    pwd=$(pwd)
    for((i=$2;i<=$3;i++));  
    do
        v1=`expr $i / 1000 % 10`
        v2=`expr $i / 100 % 10`
        v3=`expr $i / 10 % 10`
        v4=`expr $i / 1 % 10`
        target_dir="$pwd/$v1$v2$v3$v4"
        if [ ! -d $target_dir ]; then
            cp -r $pwd/Template $target_dir
            echo "cp -r $pwd/Template to ${target_dir} done"
        fi
    done  
fi


