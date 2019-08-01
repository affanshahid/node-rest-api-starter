# REST API Starter

This project provides a solid base for building a robust enterprise level REST API using Node.js with Nest.js and TypeORM.

This starter provides swagger documentation and integration with Postgres through TypeORM out of the box along with some sensible defaults. Feel free to add/remove integrations according your project

## Usage

```sh
git clone ssh://git@code.afiniti.com:7999/in/rest-api-starter.git
cd rest-api-starter
npm i

# for dev
npm run dev

# for production
npm run build && npm start

# using docker
docker-compose up -d

# testing
npm run test
npm run test:watch
npm run test:e2e

# coverage report
npm run test:coverage
```

Visit http://localhost:3000/api to view swagger documentation

#### TODO
- Achieve 100% coverage
