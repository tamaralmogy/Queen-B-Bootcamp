#!/bin/sh

# Check if the dist folder exists, if not create it
if [ ! -d "dist" ]; then
  mkdir dist
fi

# Copy the src folder and its content to the dist folder
cp -r src dist/

# Copy the client folder and its content to the dist folder
cp -r client/build dist/

# Copy the package.json to the dist folder
cp -r package.json package-lock.json dist/