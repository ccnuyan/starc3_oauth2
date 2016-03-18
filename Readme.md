# 统一身份认证服务
**Version:0.0.1**

## 需求
### 基础
- 服务状态及版本查询

### 用户
- 注册
- 登陆
- 注销
- 修改密码
- 修改资料
- 用户密码找回
- 用户密码重置
- 用户批量导入
- 用户资料批量更新

### 租户
- 租户录入
- 租户删除
- 租户状态设置［开启／禁用］

### Open Auth2 认证与授权
- 用户通过客户端进行身份认证获取token
- 用户通过token访问服务

```
Authorization: 'Bearer '+ token
```

- C/S客户端授权机制[**open auth2** resource owner flow]

req:
```      
POST http://oa.starc.com.cn/api/oauth2/cs/token HTTP/1.1
Content-Type: application/json
Authorization: basic bXljc2NsaWVudGlkOm15Y3NjbGllbnRpZA==
Host: oa.starc.com.cn
Content-Length: 50

{
  "username":"ccnuyan",
  "password":"h6b8r4l6"
}
```
res:
```
HTTP/1.1 200 OK
Server: nginx/1.8.1
Date: Wed, 24 Feb 2016 07:43:19 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 446
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: http://oa.starc.com.cn
Access-Control-Allow-Methods: GET,PUT,POST,DELETE
Access-Control-Allow-Headers: Content-Type,Authorization
Cache-Control: no-cache
Expires: -1
Pragma: no-cache
ETag: W/"1be-gANYwzyz0FXnNICs+uQdKQ"

{
"payload": {
  "id": "56aa1275699fab2c20439845",
  "username": "ccnuyan",
  "from": "host",
  "to": "mycsclientid",
  "client": {
    "id": "mycsclientid",
    "type": "cs",
    "domain": "*"
    }
  },
  "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU2YWExMjc1Njk5ZmFiMmMyMDQzOTg0NSIsInVzZXJuYW1lIjoiY2NudXlhbiIsImZyb20iOiJob3N0IiwidG8iOiJteWNzY2xpZW50aWQiLCJjbGllbnQiOnsiaWQiOiJteWNzY2xpZW50aWQiLCJ0eXBlIjoiY3MiLCJkb21haW4iOiIqIn19.gW7_mSurCWqIoGi1X1yThpazhZ6h9WalZgEj0jngtM8"
}
```
- B/S客户端授权机制[**open auth2** authorization code flow]
- 认证机制(token颁发、超时、刷新机制)
- 访问控制(权限机制及权限服务mapping)

## 技术方案
- 数据库:Mongodb
- 服务:Express
- OpenAuth2中间件:Passport
- 服务建构:Gulp
- 服务测试方案:mocha + supertest
- 前端:React+Redux+immutable.js
- 前端建构:webpack
- 前端测试:待定
- 邮件服务器:待定
- 服务部署:Docker+Ubuntu

## API
to be updated ...
