<h1 align="center">
  <img src=".github/images/sweetcake.png" alt="SweetCake">
</h1>

<h3 align="center">
  SweetCake API
</h3>

<h4 align="center">
  Your favorite dessert shop next to you
</h4>


<!-- E02041 -->
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/johnfreitasau/sweetcake-api?color=%23FB8F0A">
  <a href="https://www.linkedin.com/in/johnfreitasau/"><img alt="Made by" src="https://img.shields.io/badge/made%20by-John%20Freitas-%23FB8F0A"></a>
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/johnfreitasau/sweetcake-api?color=%23FB8F0A">
  <a href="https://github.com/johnfreitasau/sweetcake-web/commits/master"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/johnfreitasau/sweetcake-api?color=%23FB8F0A"></a>
  <a href="https://github.com/johnfreitasau/sweetcake-web/issues"><img alt="Repository issues" src="https://img.shields.io/github/issues/johnfreitasau/sweetcake-api?color=%23FB8F0A"></a>
  <img alt="GitHub" src="https://img.shields.io/github/license/johnfreitasau/sweetcake-web?color=%23FB8F0A">
</p>

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#construction_worker-installation">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#runner-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#postbox-faq">FAQ</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#bug-issues">Found a bug? Missing a specific feature?</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tada-contributing">Contributing</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#closed_book-license">License</a>
</p>

> [Click here to see the database model](https://dbdiagram.io/d/5fc08b093a78976d7b7d9b10)



# :pushpin: Table of Contents

* [Features](#rocket-features)
* [Installation](#construction_worker-installation)
* [Getting Started](#runner-getting-started)
* [FAQ](#postbox-faq)
* [Found a bug? Missing a specific feature?](#bug-issues)
* [Contributing](#tada-contributing)
* [License](#closed_book-license)


# :rocket: Technologies

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Redis](https://redis.io/)
- [Celebrate](https://github.com/arb/celebrate#readme)
- [Cors](https://github.com/expressjs/cors#readme)
- [Multer](https://github.com/expressjs/multer)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [Date-fns](https://date-fns.org/)
- [Jest](https://jestjs.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)


# :rocket: Features

* User SignIn / SignOut;
* Create / update / soft delete Customers;
* Create / update / delete products;
* Create / update / delete product categories;
* Create delivery / pickup orders;
* Close delivery / pickup orders;
* Delete open orders;
* Edit profile;
* Create new user;

# :construction_worker: Installation

**You need to install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) first, then in order to clone the project via HTTPS, run this command:**

```
git clone https://github.com/johnfreitasau/sweetcake-api.git
```

SSH URLs provide access to a Git repository via SSH, a secure protocol. If you use a SSH key registered in your Github account, clone the project using this command:

```
git clone git@github.com:johnfreitasau/sweetcake-api.git
```

**Install dependencies**

```
yarn install
```

Or

```
npm install
```

Create your environment variables based on the examples of ```.env.example```

```
cp .env.example .env
```

After copying the examples, make sure to fill the variables with new values.

**Setup a database**

You must install [Docker](https://www.docker.com/) in your machine, fill the environment values related to database configurations and then run the following commands in order to create Postgres, Mongo and Redis containers.

```
# Create the postgreSQL instance using docker
$ docker run --name sweekcake-postgres -e POSTGRES_USER=docker \
              -e POSTGRES_DB=sweetcake -e POSTGRES_PASSWORD=docker \
              -p 5432:5432 -d postgres

# Create the mongoDB instance using docker
$ docker run --name gobarber-mongodb -p 27017:27017 -d -t mongo

# Create the Redis instance using docker
$ docker run --name gobarber-redis -p 6379:6379 -d -t redis:alpine
```


# :runner: Getting Started

Run the transactions in order to configure the database schema

```yarn typeorm migration:run```

Run the following command in order to start the application in a development environment:

```yarn dev:server```

# :postbox: Faq

**Question:** What are the technologies used in this project?

**Answer:** The technologies used in this project are [NodeJS](https://nodejs.org/en/) + [Express Framework](http://expressjs.com/en/) to handle the server and [TypeORM](https://typeorm.io/#/) as the Object Relational Mapper

# :bug: Issues

Feel free to **file a new issue** with a respective title and description on the the [SweetCake API](https://github.com/johnfreitasau/sweetcake-api/issues) repository. If you already found a solution to your problem, **I would love to review your pull request**! Have a look at our [contribution guidelines](https://github.com/johnfreitasau/sweetcake-api/blob/master/CONTRIBUTING.md) to find out about the coding standards.

# :tada: Contributing

Check out the [contributing](https://github.com/johnfreitasau/sweetcake-api/CONTRIBUTING.md) page to see the best places to file issues, start discussions and begin contributing.

# :closed_book: License

Released in 2020.
This project is under the [MIT license](https://github.com/johnfreitasau/sweetcake-api/LICENSE).
