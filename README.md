# Circular Project

This is a "umbrella-like project" (not a monorepo) that still a single application but houses many modules that run together in a single repository. The reason for this is because there is a glue that holds all the modules together: my workstation. The modules built here are related to the day-to-day in the office.

Check the functional [requirements](REQUIREMENTS.md).

This project is build using [Nest](https://github.com/nestjs/nest).


## Installation

```bash
$ npm install
```

## Running the app

This app uses mongodb to store data. When running tests we are using an [in-memory mongodb](https://nodkz.github.io/mongodb-memory-server/docs/guides/known-issues) instance. 

Also uses Docker for container.
Use the docker-compose command to run the application and database:

```bash
$ docker-compose up app mongo
```

Alternatively, you can run just the database container or even install mongodb on your computer to run locally. Be sure to update the MONGODB_URL environment variable.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
