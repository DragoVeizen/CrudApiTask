# CRUD Api using JWT API Documentation
### 📦 How to run your code
-----

```bash
cd your_project
npm install
npm run build
npm start
```
-----


## Overview
This API allows users to manage a list of items. Users can create, read, update and delete items. The API also includes authentication using JSON Web Tokens (JWT).

## Authentication
To use the API, users must first authenticate themselves by sending a JWT token with their requests. The API provides two endpoints for authentication:\
- POST `/register`: Allows users to create a new account by providing their username and password. Returns a JWT token upon successful account creation.\
- POST `/login`: Allows users to login to their account by providing their username and password. Returns a JWT token upon successful login.

### Authentication Example
To authenticate a user, send a POST request to `/login` with the following JSON data in the request body:
```
{
  "username": "example_user",
  "password": "password123"
}
```
If the user credentials are correct, the API will respond with a JWT token:\
```
{
  "user": {
    "id": 1,
    "username": "example_user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYyMjI5NzY5OSwiZXhwIjoxNjIyMjk3ODk5fQ.QJxBX9yvH7eiRJivggyV7-eKTQxHdI60idT41T6hrzc"
}
```
To access protected endpoints, include this token in the `Authorization` header of your request:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYyMjI5NzY5OSwiZXhwIjoxNjIyMjk3ODk5fQ.QJxBX9yvH7eiRJivggyV7-eKTQxHdI60idT41T6hrzc
```

## Endpoints

### Get all items
- Endpoint: `GET /items`
- Authentication: Required
- Returns: An array of all items in the database

### Get item by ID
- Endpoint: `GET /items/:id`
- Authentication: Required
- Parameters:
  - `id` - ID of the item to retrieve
- Returns: The item with the specified ID

### Create item
- Endpoint: `POST /items`
- Authentication: Required
- Request body:
  - `name` - Name of the item (string)
  - `description` - Description of the item (string)
- Returns: The newly created item

### Update item
- Endpoint: `PUT /items/:id`
- Authentication: Required
- Parameters:
  - `id` - ID of the item to update
- Request body:
  - `name` - New name of the item (string)
  - `description` - New description of the item (string)
- Returns: The updated item

### Delete item
- Endpoint: `DELETE /items/:id`
- Authentication: Required
- Parameters:
  - `id` - ID of the item to delete
- Returns: The deleted item

## Error handling
If an error occurs while processing a request, the API will respond with a JSON object containing an `error` field with a description of the error.

## Examples

### Get all items
Request:
```
GET /items
Authorization: Bearer eyJhbGciOiJIUzI
```
Response:

```
 {
 [
  {
    "id": 1,
    "name": "Item 1",
    "description": "This is item 1",
    "price": 10.99
  },
  {
    "id": 2,
    "name": "Item 2",
    "description": "This is item 2",
    "price": 19.99
  },
  {
    "id": 3,
    "name": "Item 3",
    "description": "This is item 3",
    "price": 7.99
  }
]
}
```

Get an item by ID

Request:

```
GET /items/1
Authorization: Bearer eyJhbGciOiJIUzI
```

Response:

```json
{
  "id": 1,
  "name": "Item 1",
  "description": "This is item 1",
  "price": 10.99
}
```

Create a new item

Request:

```
POST /items
Authorization: Bearer eyJhbGciOiJIUzI

{
  "name": "Item 4",
  "description": "This is item 4",
  "price": 14.99\
}
```

Response:

```json
{
  "id": 4,
  "name": "Item 4",
  "description": "This is item 4",
  "price": 14.99
}
```

Update an item

Request:

```
PUT /items/1
Authorization: Bearer eyJhbGciOiJIUzI

{
  "name": "Updated Item 1",
  "description": "This is the updated item 1",
  "price": 12.99Response:

```json
[
  {
    "id": 1,
    "name": "Item 1",
    "description": "This is item 1",
    "price": 10.99
  },
  {
    "id": 2,
    "name": "Item 2",
    "description": "This is item 2",
    "price": 19.99
  },
  {
    "id": 3,
    "name": "Item 3",
    "description": "This is item 3",
    "price": 7.99
  }
]
```

Get an item by ID

Request:

```
GET /items/1
Authorization: Bearer eyJhbGciOiJIUzI
```

Response:

```json
{
  "id": 1,
  "name": "Item 1",
  "description": "This is item 1",
  "price": 10.99
}
```

Create a new item

Request:

```
POST /items
Authorization: Bearer eyJhbGciOiJIUzI

{
  "name": "Item 4",
  "description": "This is item 4",
  "price": 14.99
}
```

Response:

```json
{
  "id": 4,
  "name": "Item 4",
  "description": "This is item 4",
  "price": 14.99\
}
```

Update an item

Request:

```
PUT /items/1
Authorization: Bearer eyJhbGciOiJIUzI

{
  "name": "Updated Item 1",
  "description": "This is the updated item 1",
  "price": 12.99
}
```

Response:

```json
{
  "id": 1,
  "name": "Updated Item 1",
  "description": "This is the updated item 1",
  "price": 12.99
}
```

Delete an item

Request:

```
DELETE /items/1
Authorization: Bearer eyJhbGciOiJIUzI
```

Response:

```json
{
  "1 Item succesfully deleted"
}
```
