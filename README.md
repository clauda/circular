# Circular Project

This is a "umbrella-like project" (not a monorepo) that still a single application but houses many modules that run together in a single repository. The reason for this is because there is a glue that holds all the modules together: my workstation. The modules built here are related to the day-to-day in the office.

Check the functional [requirements](REQUIREMENTS.md).

This project is build using [Nest](https://github.com/nestjs/nest).


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
