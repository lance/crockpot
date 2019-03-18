# Crockpot

A Node.js module for [Microprofile Long Running Actions](https://microprofile.io/project/eclipse/microprofile-lra).

A work in progress.

## Running the tests

You need to have docker installed. And some kind of shell at `#!/bin/bash`.

All test are currently integration tests where we are testing against an actual
Narayana server running the Microprofile API and exposing it via REST.

```
npm test
```

This command will ensure that a Narayana server is running as a local Docker
container with port 8080 exposed.

## Generating the API Client

The Narayana server API may be used to generate an OpenAPI `.json` file. The current
spec is in the `openapi` directory.
