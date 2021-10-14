#!/bin/bash

cd pfk-app
git pull

sudo pm2 stop pfk-app
sudo npm install
sudo npm run build
sudo pm2 serve build 3000 --name "pfk-app" --spa
