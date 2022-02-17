# Postcode Search API

- An example API integration using **Typescript, ExpressJS and MongoDB with Mongoose** based on [UK Postcode format](https://www.kaggle.com/danwinchester/open-postcode-geo).
- /api/import accepts `csv` files and imports data to MongoDB
- /api/search endpoint accepts `lat, long, radius (in meters)` parameters and returns matching results

## Usage
Rename `.env.example` file to `.env` 

Running docker compose will create API and MongoDB instances
```basah
docker-compose up
```

You can test it at [http://localhost:3000](http://localhost:3000)

## List of Routes

```sh
# API Routes:

+--------+-------------------------+
  Method | URI
+--------+-------------------------+
  GET    | /api/healthcheck
  GET    | /api/search
  POST   | /api/import
+--------+-------------------------+
```

## Testing
This command will start docker containers and run tests
```bash
npm run test
```

## TODO
- Add rate limiter
- API versioning