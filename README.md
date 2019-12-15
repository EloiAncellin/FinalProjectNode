# Metrics <a href="https://travis-ci.com/EloiAncellin/FinalProjectNode"><img src="https://travis-ci.com/EloiAncellin/FinalProjectNode.svg?branch=master&kill_cache=1" /></a> <a href="https://coveralls.io/github/EloiAncellin/FinalProjectNode?branch=master"><img src="https://coveralls.io/repos/github/EloiAncellin/FinalProjectNode/badge.svg?branch=master&kill_cache=1" /></a>


Metrics app, using NodeJS, Typescript, MongoDB.

# Docker

The project requires a `MongoDB` database. You probably don't want to mess with your computer, so the easiest option is to start the project inside a docker container.

### Get Started

```
docker-compose up
```

### Development Environment

This is the same as above, except it will start **nodemon** as well.

```
APP_ENV=dev docker-compose up
```

### Run tests and check coverage

```
docker exec -it web npm run coverage
```

### Populate | Clear database

```
docker exec -it web npm run populate
docker exec -it web npm run clear
```

# [Contributors](https://github.com/EloiAncellin/FinalProjectNode/blob/master/CONTRIBUTORS.md)
