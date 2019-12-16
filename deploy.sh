#!/bin/bash

echo 'compressing build into tar file...'
tar czf pm_board_server.tar.gz src yarn.lock package.json

echo 'copying tarball into remote server...'
scp pm_board_server.tar.gz danielmooncloud.com:~

echo 'removing tarball'
rm pm_board_server.tar.gz

echo 'entering remote server...'
ssh danielmooncloud.com << 'ENDSSH'
pm2 stop pm_board_server
rm -rf pm_board_server
mkdir pm_board_server
tar xf pm_board_server.tar.gz -C pm_board_server
cd pm_board_server
yarn install
pm2 start pm_board_server
ENDSSH
