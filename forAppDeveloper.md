# starC3 Oauth2 Authentication Flow Instruction

***

## Before You Begin

这里是租户应用的调用认证主站 OAuth2 的认证服务的认证流程。这个文档给租户应用的开发者参考。

作为应用的开发者,你首先需要针对应用的不同类型，对需要采用的认证流程进行选择

B/S应用需要参考 Authorization Code Grant Flow

C/S应用需要参考 Resource Owner Password Credentials Grant Flow。

>认证流程结束后,租户应用需要根据自己的应用是否已上线并存在用户群体，继续创建新用户或绑定已有账户的登录流程。

***

#### 1.租户为B/S应用

需要参考 Authorization Code Grant Flow,用户在认证站点登录并跳转至您的应用后，应提示用户绑定已有账户或直接创建新用户后进入登录状态。

#### 2.租户为C/S应用

需要参考 Resource Owner Password Credentials Grant Flow,用户登录至您的应用后,应提示用户绑定已有账户或直接创建新用户,后进入登录状态。

## 1 租户为B/S应用(C/S应用请忽略): 使用 Authorization Code Grant Flow 认证

PS: JS应用站点是可参考与C/S应用相同的 Resource Owner Password Credentials Grant，但强烈不建议你这样做。

#### 使用先决条件

1. 你的用户需要现在starC3上注册为用户。

2. 你需要将你的应用申请成为starC3认证服务的租户, 请向管理员询问并申请。

申请成为starC3认证服务的租户时，租户应用需要为认证站点管理员提供的信息包括
```
应用名: "youAppId"
应用密码: "youAppPassword"
应用主页: "http://your.home.domain/"
回调地址: "http://your.home.domain/oauth2/starc3/callback"
租户应用名: "应用名"
认证类型: "B/S"
```

申请成功后, 在OAuth2认证业务中将用到的参数是

```
应用名
应用密码
回调地址
```
除此之外,你还需要知道的信息

认证地址

```
http://oa.starc.com.cn/api/oauth2/authorize
```

TokenAPI
```
http://oa.starc.com.cn/api/oauth2/token
```

#### 认证流程

1 用户点击租户应用网页上的“使用starC3账户登录”时, 携带租户注册参数包括Redirect URL 应用名,认证类型等）跳转到starC3用户认证页面。

2.1 用户登录后,认证页面呈现你的应用信息及用户个人信息，用户授权租户应用之后携带code跳转回你的应用的回调页面。

2.2 租户应用回调页面的服务端处理程序中携带code及租户的信息，包括回调地址、租户应用Id、租户应用密码认证类型及申请访问的服务域(暂为全域)等,调用认证站点的token服务，得到用户的AccessToken。

3 租户应用通过AccessToken调用认证站点的服务得到用户的认证信息认证流程结束。

此时租户应用已经知道调用认证站点starC3登录的用户的基本信息，可以继续租户应用自己的业务:绑定已存在的本地用户或者根据登录信息创建用户等等。

## 2 租户为C/S应用: 使用 Resource Owner Password Credentials Grant Flow 认证

#### 使用先决条件

1. 你的用户需要现在starC3上注册为用户。

2. 你需要将你的应用申请成为starC3认证服务的租户。

申请成为starC3认证服务的租户时,租户应用需要为认证站点管理员提供的信息包括:

```
应用名: "youAppId"
应用密码: "youAppPassword"
应用主页: "http://your.home.domain/"
租户应用名: "应用名"
认证类型: "C/S"
```  	

申请成功后, 在OAuth2认证业务中将用到的参数是

```
应用名: "youAppId"
应用密码: "youAppPassword"
```  	

认证地址

TokenAPI
```
http://oa.starc.com.cn/api/oauth2/cs/token
```
#### 认证流程

1 用户点击客户端的“使用starC3账户登录”时, 输入在认证站点上注册的用户名与密码。

2 客户端在后台携带用户输入的用户名与密码及租户的信息（包括回调地址,租户应用Id, 租户应用密码, 认证类型, 及申请访问的服务域(暂为全域)等, 调用认证站点的token服务，得到用户的AccessToken。

3 租户应用通过AccessToken调用认证站点的服务得到用户的认证信息认证流程结束。

此时租户应用已经知道登录用户的基本信息, 可以继续租户应用自己的业务: 绑定已存在的本地用户或者根据登录信息创建用户等等。

## 参考

Authorization Code Grant
https://tools.ietf.org/html/rfc6749#section-4.1

Resource Owner Password Credentials Grant
https://tools.ietf.org/html/rfc6749#section-4.3
