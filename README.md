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

# API

The server is running an API which has the following routes :

### User related requests

| Method | Route | Parameters | Description |
| - | - | - | - |
| POST | /users/register | email, password, firstName, lastName | Create a new user |
| POST | /users/authenticate | email, password | Authenticate a user and returns an access **token** |
| GET | /users/me | Authorization Token | Get personal details of a user |

### Metrics related requests

| Method | Route | Parameters | Description |
| - | - | - | - |
| GET | /metrics | Authorization Token | Returns all metric names of that user |
| GET | /metrics/:id | Authorization Token | Retrieve a metric by its id |
| GET | /metrics/collection/:name | Authorization Token | Retrieve all metrics in a specific metric collection |
| POST | /metrics | Authorization Token, name, value | Create a metric |
| PUT | /metrics/:id | Authorization Token, name, value | Update a metric |
| DELETE | /metrics/:id | Authorization Token | Delete a metric |

# [Contributors](https://github.com/EloiAncellin/FinalProjectNode/blob/master/CONTRIBUTORS.md)
