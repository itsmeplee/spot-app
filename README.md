# SpotSwap

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Cloud Deployment](#cloud-deployment)
    1. [Tasks](#roadmap)
1. [Team](#team)
1. [Contributing](#contributing)
1. [Style Guide](#style-guide)
1. [Press Release](#press-release)

| Name             | Service | Container | Tech                 |
|------------------|---------|-----------|----------------------|
| Web              | Web     | web       | React, React-Router  |
| Server           | Server  | server    | Node, Express GQL    |
| DB               | DB      | db        | Prisma / Postgres    |


## Usage

> Some usage instructions


## Requirements

- Node 0.10.x
- GraphQL
- Postgres 

### Installing Dependencies

From within the server directory:

```
npm install
npm start

```

From within the worker directory:

```
npm install
npm start

```

From within the web directory:

```
npm install
npm start

```
From within the prisma directory:

```
Start Prisma with Postgres DB:
- docker-compose up -d 
- prisma deploy
- prisma token
- Use generated token to authenicate in playground (http://localhost:4466/spotswap-prisma/dev)
- HTTP Header : {
  "Authorization": "Bearer [token]"
  }
  
```

### Cloud Deployment


Prisma

For Digital Ocean [here](https://www.prisma.io/docs/1.14/tutorials/deploy-prisma-servers/digital-ocean-(docker-machine)-texoo9aemu)

### Roadmap

View the project roadmap [here](https://github.com/spot-swap/spot-app/issues)

## Team

  - __Product Owner__: Milton
  - __Scrum Master__: Milton
  - __Development Team Members__: Sarah, Trent, Milton

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.


## Style Guide

See [STYLE-GUIDE.md](STYLE-GUIDE.md) for style guidelines.

## Press Release

See [PRESS-RELEASE.md](PRESS-RELEASE.md).
