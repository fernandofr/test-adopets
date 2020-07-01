# Index

* [Resource](#resource)
* [Installation](#installation)
* [Starting](#starting)

# Resource

* Api to register users and products with category.

# Installation

*You must have [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) installed first, then to clone the project, run command below:*

```git clone https://github.com/fernandofr/test-adopets```

**Install Dependencies**

After cloning the project, navigate into the cloned folder and run the command to download and install all dependencies.

```yarn```

Create your environment variables based on the sample ```.env.example```

```cp .env.example .env```

After copying the examples, be sure to fill in the variables with new values.

**Configuring Database**

Install [Postgres](https://www.postgresql.org/) to create a database.
If you have [Docker](https://www.docker.com/) on your machine, fill in the environment values related to the database settings and run the following commands to create a postgres container.

```docker-compose up```

> [Click here to see the database model](https://dbdiagram.io/d/5efca7f50425da461f041f04)

# Starting

After having the bank created and configured the `.env` file. Run the command below to create the migrations.

```yarn typeorm migration:run```

After creating the migrations, run the command below to start the application in the development environment.

```yarn dev:server```

to run the tests, run the command below:

```yarn test```

### Application Routes

With the API running it is possible to consult the routes.

#### Users
- **`POST /users`**: The route must receive `name`,` email` and `password` within the body of the request. When registering a new user, it must be stored within your database, with the fields `id`,` name`, `email`,` password`, `created_at`,` updated_at`.

```json
{
  "id": "uuid",
  "name": "teste",
  "email": "teste@teste.com.br",
  "password": "123456",
  "created_at": "2020-06-31T04:05:36.367Z",
  "updated_at": "2020-06-31T04:05:36.367Z"
}
```

#### sessions
- **`POST /session`**: The route must receive `email` and` password` within the body of the request. When requesting the access token to be able to register the products and categories, an `user` object will be returned, which is also an object containing the user ` id`, `name` and` email`, and the field with the token `.

```json
{
  "user": {
    "id": "uuid",
    "name": "teste",
    "email": "teste@teste.com.br"
  },
  "token": "JWT"
}
```

#### Categorys
To use the `categorys` route, you must be authenticated in the application. For this, it is necessary with the created user to request the `token` using the` session` route. And inform the `token` in the request header.

- **`POST /categorys`**: The route must receive a title within the body of the request. When registering a new category, it must be stored within your database, with the fields `id`,` title`, `created_at`,` updated_at`.

```json
{
  "id": "uuid",
  "title": "dog food",
  "created_at": "2020-06-31T04:05:36.367Z",
  "updated_at": "2020-06-31T04:05:36.367Z"
}
```

- **`GET /categorys`**: This route must return a listing with all registered categories. This route must return an array with the following format:

```json
[
  {
    "id": "uuid",
    "title": "dog food"
  },
  {
    "id": "uuid",
    "title": "cat food"
  }
]
```

#### Products

To use the route of `products` you must be authenticated in the application. For this, it is necessary with the created user to request the `token` using the` session` route. And inform the `token` in the request header.

- **`POST /products`**: The route must receive `name`,` description`, `price`,` stock`, and `category` within the body of the request. When registering a new product, it must be stored within your database, with the fields `id`,` name`, `description`,` price`, `stock`,` category_id`, `created_at`,` updated_at `.

```json
{
  "id": "uuid",
  "name": "Product Test",
  "description": "Product Test",
  "price": 100,
  "stock": 10,
  "category_id": "uuid",
  "created_at": "2020-06-31T04:06:55.922Z",
  "updated_at": "2020-06-31T04:06:55.922Z"
}
```

- **`GET /products`**: This route must return a listing with all registered products. This route has pagination and it is necessary to inform `page` and` limit` as query params. It is also possible to use filters informing query params `name`,` description` and `category`.

Example:

```http://localhost:3333/products?name=Product%20Test```

This route must return an array with the following format:

```json
[
  {
    "id": "uuid",
    "name": "Product Test",
    "description": "Product Test",
    "price": 100,
    "stock": 10,
    "category_id": "uuid",
    "created_at": "2020-06-31T04:06:55.922Z",
    "updated_at": "2020-06-31T04:06:55.922Z"
  }
]
```

- **`PUT /products/:id`**: The route must receive the `id` of the product you want to change by parameter and `name`, `description`, `price`, `stock` and `category` within the body of the request. When changing the product, it must be updated in its database, and return the object with the fields `id`,` name`, `description`,` price`, `stock`,` category_id`, `created_at`,` updated_at `..

```json
{
  "id": "uuid",
  "name": "Product Test",
  "description": "Product Test",
  "price": 100,
  "stock": 10,
  "category_id": "uuid",
  "created_at": "2020-06-31T04:06:55.922Z",
  "updated_at": "2020-06-31T04:06:55.922Z"
}
```

- **`DELETE /products/:id`**: The route must delete a product with the `id` present in the route parameters;

### Testing API

To test the API I recommend using [Insomnia](https://insomnia.rest/) which is an http client that allows us to make requests in the `Get`,` Post`, `Delete`,` Put` api. And it is very simple to use. If you use a 32-bit system, I recommend using [Postman](https://www.postman.com/).

After downloading insomnia, import the `insomnia.json` file that is at the root of the project. This file has the registered routes to facilitate testing in the api.
If you are unsure of how to do it, please see https://support.insomnia.rest/article/52-importing-and-exporting-data.

The heroku api was deployed. To use access:

```https://test-fernando-adopets.herokuapp.com```.

The API writes all request and error logs to the logs folder.
