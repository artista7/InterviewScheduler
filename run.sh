#!/bin/bash
cd ui
echo "Installing ..."
rm -rf node_modules && npm install
echo "Building ..."
npm run build
npm start  > allout.txt 2>&1 &
cd ..
pip install -r requirements.txt
python application.py
