# 原画册

### API



#### Auth

```js
POST /auth
REQ: 
{
  username: string,
  password: string
}
RES: 
{
  token: string
}
```
#### Photos

```js
GET /photos/list
REQ: 
{}
RES: 
{
  payload:[],
  code:0
}
```
```js
POST /photos/:tags/:times
REQ: 
{
  body: new Photo()
}
RES: 
{
  payload: {message: 'success'},
  code:0
}
```
```js
PUT /photos/:id 
REQ: 
{
  body:{
    tags: string,
    times: string,
    photo: Photo.Find(:id)
  }
}
RES: 
{
  payload: {message:'updated'},
  code: 0
}

```