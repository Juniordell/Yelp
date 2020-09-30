<h1 align='center'> 🍖Yelp </h1>

<p align='center'>A simple application using PERN (Postgres, Express, React, Node), and have the same function of Yelp but more simple!</p>

<br>

![Screenshot1](https://github.com/Juniordell/Yelp/blob/master/client/src/assets/yelpHome.png?raw=true)
![Screenshot2](https://github.com/Juniordell/Yelp/blob/master/client/src/assets/yelpReview.png?raw=true)

## How to use?

- Install [PostgreSQL](https://www.postgresql.org/download/)
- Install [Node](https://nodejs.org/en/)
- Create a database called 'yelp' and after create two tables called 'restaurants' and 'reviews':

```
  CREATE DATABASE yelp;
  \c yelp;
  
  CREATE TABLE restaurants (
      id BIGSERIAL NOT NULL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      location VARCHAR(50) NOT NULL,
      price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
  );

  CREATE TABLE reviews (
      id BIGSERIAL NOT NULL PRIMARY KEY,
      restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
      name VARCHAR(50) NOT NULL,
      review TEXT NOT NULL,
      rating INT NOT NULL check(rating >= 1 and rating <= 5)
  );

```

- Create a '.env' file in server folder
- Put this infos in '.env':

```
  PORT='PORT'
  PGUSER='postgres'
  PGHOST='PGHOST'
  PGPASSWORD='PGPASSWORD'
  PGDATABASE='yelp'
  PGPORT='5432'
```

- And then:

```node
$ yarn
$ yarn start
```
