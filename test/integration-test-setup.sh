#!/bin/bash

start_container() {
  check_container_status
  docker build -t test/lra-coordinator test/lra-coordinator
  docker run --cidfile=lra-coordinator.cid --rm -d -p 8080:8080 test/lra-coordinator
  wait_for_cid
  echo "Container $(cat lra-coordinator.cid) started."
}

check_container_status() {
  if [ -f lra-coordinator.cid ] ; then
    CID=$(cat lra-coordinator.cid)
    STATUS=$(docker container inspect $CID --format {{.State.Status}})

    if [ "${STATUS}" != 'running' ] ; then
      echo "Container is not running. Removing .cid file and restarting."
      rm lra-coordinator.cid
    else
      echo "Container ${CID} is already running."
      exit 0
    fi
  else
    echo "No lra-coordinator.cid file. Starting container."
  fi
}

wait_for_cid() {
  local max_tries=10
  local sleep_time=1
  local try=1
  while [ $try -le $max_tries ] ; do
    [ -f lra-coordinator.cid ] && [ -s lra-coordinator.cid ] && break
    echo "Waiting for container start..."
    try=$(( $try + 1 ))
    sleep $sleep_time
  done
  [ -f lra-coordinator.cid ] && [ -s lra-coordinator.cid ] || (echo "There was a problem. Bailing." && exit 1)
  CID=$(cat lra-coordinator.cid)
  try=1
  sleep_time=5
  while [ $try -le $max_tries ] ; do
    docker container logs $CID | grep "Ready"
    if [ $? -eq 0 ] ; then
      break
    fi
    echo "Waiting for coordinator start..."
    try=$(( $try + 1 ))
    sleep $sleep_time
  done
}

start_container