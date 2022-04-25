# SIMPLE GAMES RESTAPI
Simple **RESTful API** of CRUD of games. 
Addicionally have JWT Auth and Swagger auto documentation.
Default port: 3000

## *Authorization*
Simple JWT needed to access all routes expect /auth
### POST /auth
#### Body parameters
* email = A valid user e-mail (required)
* password = User password (required)

**Example:**
```
{
    "email" : "ewerton@eweti.com.br",
    "password" : "123456"
}
```
#### Reponses:
##### OK | 200
Sucess response from a valid email/password:
**Example:**
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJld2VydG9uQGV3ZXRpLmNvbS5iciIsImlhdCI6MTY1MDg0Njg3OCwiZXhwIjoxNjUxMDE5Njc4fQ.ZwJUMgCA_rnOODP6inI9eVMMu1XgxVUohZ9KivfT1A8"
}
```
##### ERROR | 400
Rejection response when email or password is not provided:
**Example:**
```
{
    "err": "email/password are required"
}
```
##### ERROR | 401
Rejection response when email is ok but password is invalid:
**Example:**
```
{
    "err": "invalid password"
}
```
##### ERROR | 404
Rejection response when user not found by email:
**Example:**
```
{
    "err": "user not found"
}
```
##### ERROR | 500
Any server side error
**Example:**
```
{
    "err": "Description from a server side error"
}
```
## *Games*
### GET /games
This endpoint returns a list of all games
#### Header parameters
Bearer token Authorization needed
**Example:**
```
{
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJld2VydG9uQGV3ZXRpLmNvbS5iciIsImlhdCI6MTY1MDg0Njg3OCwiZXhwIjoxNjUxMDE5Njc4fQ.ZwJUMgCA_rnOODP6inI9eVMMu1XgxVUohZ9KivfT1A8'
}
```
#### Reponses:
##### OK | 200
When request is sucess, returns a list of all games
**Example:**
```
[
    {
        "id": 1,
        "title": "Tibia",
        "year": 1998,
        "price": 1233,
        "createdAt": "2022-04-21T22:51:18.000Z",
        "updatedAt": "2022-04-23T02:41:51.000Z"
    },
    {
        "id": 4,
        "title": "Doom 2 for Windows",
        "year": 1992,
        "price": 300,
        "createdAt": "2022-04-21T23:08:07.000Z",
        "updatedAt": "2022-04-24T22:21:32.000Z"
    },
    {
        "id": 9,
        "title": "Call Of Duty",
        "year": 2010,
        "price": 159.9,
        "createdAt": "2022-04-23T01:24:44.000Z",
        "updatedAt": "2022-04-23T02:30:37.000Z"
    }
]
```
##### ERROR | 400
Rejection response when authorization token is not provided:
**Example:**
```
{
    "err": "authorization token is required"
}
```
##### ERROR | 403
Rejection response when authorization token is invalid or expires:
**Example:**
```
{
    "err": "invalid token"
}
```
##### ERROR | 500
Any server side error
**Example:**
```
{
    "err": "Description from a server side error"
}
```
### GET /games/id
This endpoint returns a single game by id
#### Header parameters
Bearer token Authorization needed
**Example:**
```
{
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJld2VydG9uQGV3ZXRpLmNvbS5iciIsImlhdCI6MTY1MDg0Njg3OCwiZXhwIjoxNjUxMDE5Njc4fQ.ZwJUMgCA_rnOODP6inI9eVMMu1XgxVUohZ9KivfT1A8'
}
```
#### Query parameters
* id = Id of game (required)
#### Reponses:
##### OK | 200
When request is sucess, returns a single game
**Example:**
```
{
    "id": 1,
    "title": "Tibia",
    "year": 1998,
    "price": 1233,
    "createdAt": "2022-04-21T22:51:18.000Z",
    "updatedAt": "2022-04-23T02:41:51.000Z"
}
```
##### ERROR | 400
Rejection response when authorization token is not provided:
**Example:**
```
{
    "err": "authorization token is required"
}
```
Another possible response 400 occurs when query parameter id is not provided:
**Example:**
```
{
    "err": "parameter id is required"
}
```
##### ERROR | 403
Rejection response when authorization token is invalid or expires:
**Example:**
```
{
    "err": "invalid password"
}
```
##### ERROR | 404
Rejection response when game not found:
**Example:**
```
{
    "err": "game not found"
}
```
##### ERROR | 500
Any server side error
**Example:**
```
{
    "err": "Description from a server side error"
}
```
### POST /game
This endpoint creates a new game
#### Header parameters
Bearer token Authorization needed
**Example:**
```
{
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJld2VydG9uQGV3ZXRpLmNvbS5iciIsImlhdCI6MTY1MDg0Njg3OCwiZXhwIjoxNjUxMDE5Njc4fQ.ZwJUMgCA_rnOODP6inI9eVMMu1XgxVUohZ9KivfT1A8'
}
```
#### Body parameters
* title = Title of game (required)
* year = Release year (required)
* price = Price of game (required) 

**Example:**
```
{
    "title":"Tibia",
    "year":1998,
    "price":1233
}
```
#### Reponses:
##### OK | 200
When request is sucess, returns a created game
**Example:**
```
{
    "id": 18,
    "title": "Tibia",
    "year": 1998,
    "price": 1233,
    "updatedAt": "2022-04-25T01:14:35.167Z",
    "createdAt": "2022-04-25T01:14:35.167Z"
}
```
##### ERROR | 400
Rejection response when authorization token is not provided:
**Example:**
```
{
    "err": "authorization token is required"
}
```
Another possible response 400 occurs when required parameters are not provided:
**Example:**
```
{
    "err": "notNull Violation: games.price cannot be null"
}
```
##### ERROR | 500
Any server side error
**Example:**
```
{
    "err": "Description from a server side error"
}
```
### PUT /game/id
This endpoint updates a existing game
#### Header parameters
Bearer token Authorization needed
**Example:**
```
{
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJld2VydG9uQGV3ZXRpLmNvbS5iciIsImlhdCI6MTY1MDg0Njg3OCwiZXhwIjoxNjUxMDE5Njc4fQ.ZwJUMgCA_rnOODP6inI9eVMMu1XgxVUohZ9KivfT1A8'
}
```
#### Query parameters
* id = Id of game (required)
#### Body parameters
* title = Title of game (required)
* year = Release year (required)
* price = Price of game (required) 

**Example:**
```
{
    "title":"Tibia",
    "year":1999,
    "price":1233
}
```
#### Reponses:
##### OK | 200
When request is sucess, returns a updated game
**Example:**
```
{
    "id": 18,
    "title": "Tibia",
    "year": 199,
    "price": 1233,
    "updatedAt": "2022-04-25T01:14:35.167Z",
    "createdAt": "2022-04-25T01:14:35.167Z"
}
```
##### ERROR | 400
Rejection response when authorization token is not provided:
**Example:**
```
{
    "err": "authorization token is required"
}
```
Another possible response 400 occurs when required query parameter id is not provided:
**Example:**
```
{
    "err": "parameter id is required"
}
```
Another possible response 400 occurs when required parameters are not provided:
**Example:**
```
{
    "err": "notNull Violation: games.price cannot be null"
}
```
##### ERROR | 404
Rejection response when game not found:
**Example:**
```
{
    "err": "game not found"
}
```
##### ERROR | 500
Any server side error
**Example:**
```
{
    "err": "Description from a server side error"
}
```
### DELETE /game/id
This endpoint delete a existing game
#### Header parameters
Bearer token Authorization needed
**Example:**
```
{
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJld2VydG9uQGV3ZXRpLmNvbS5iciIsImlhdCI6MTY1MDg0Njg3OCwiZXhwIjoxNjUxMDE5Njc4fQ.ZwJUMgCA_rnOODP6inI9eVMMu1XgxVUohZ9KivfT1A8'
}
```
#### Query parameters
* id = Id of game (required)
#### Reponses:
##### OK | 200
When request is sucess, returns count rows affected
**Example:**
```
{
    "deleteCount" : 1
}
```
##### ERROR | 400
Rejection response when authorization token is not provided:
**Example:**
```
{
    "err": "authorization token is required"
}
```
Another possible response 400 occurs when required query parameter id is not provided:
**Example:**
```
{
    "err": "parameter id is required"
}
```
##### ERROR | 404
Rejection response when game not found:
**Example:**
```
{
    "err": "game not found"
}
```
##### ERROR | 500
Any server side error
**Example:**
```
{
    "err": "Description from a server side error"
}
```