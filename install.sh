#!/bin/bash

if ! [ -x "$(command -v docker)" ] || ! [ -x "$(command -v docker-compose)" ]; then
  echo "Error: docker and/or docker-compose is not installed"
  echo "Please run the installation script from the backend first"
  exit
fi

if [ "$EUID" -ne 0 ]; then
  echo "Please run as root, either by logging in as root or by using sudo"
  exit
fi

# run the project's container
systemctl enable --now docker
docker-compose build
docker-compose up -d

status=$?

if test $status -eq 0
then
  echo "the website is running on http://$(ifconfig | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p'):4200"
fi
