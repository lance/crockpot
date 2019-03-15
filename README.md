# Crockpot

A Node.js module for [Microprofile Long Running Actions](https://microprofile.io/project/eclipse/microprofile-lra).

A work in progress.

## Running the tests

You'll need a running Narayana server. This takes some hacking around it seems.

* Clone this project: https://github.com/jboss-dockerfiles/narayana
* Change to the `lra-coordinator` directory: `cd narayana/lra/lra-coordinator`
* Run it: `docker run --rm -it -p 8080:8080 lra-coordinator`