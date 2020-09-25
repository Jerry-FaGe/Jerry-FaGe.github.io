title: Sign in with Apple（苹果授权登陆）python服务端code验证
author: Jerry_FaGe
comments: true
tags:
  - Sign in with Apple
  - Python
  - 后端
  - 第三方登录
categories:
  - 教程
date: 2020-08-26 05:56:30
updated:
permalink:
---
废话不多说相信很多人都是因为苹果的坑爹政策才被要求了解苹果登录的流程，本文不涉及前端操作（因为我不会），只介绍后端是如何验证的。
## 你会从前端得到什么
这里是通过 RESTful API 接口来获取数据，所以我不会管前端是咋获取的，我只管接收和处理数据

	---->> User Id - 000592.729afa20xxxxxxx9929f3958f03c6c9e.0948
    
	---->> User Name - givenName: Lu familyName: Xs 
    
	---->> User Email - 494xxx875@qq.com
    
	---->> Real User Status - 1
    
	---->> Identity Token eyJraWQiOiJxxxxxxxxxxxxxxxnIjoiUlMyNTYifQ.eyJpc3M
    
	---->> authorizationCode ca57c019ae48c4a42xxxxxxxxxxe9e80b.0.nvzs.HTxxxxxxxxxxxE64NZpbWEeALQ
<!--more-->
* `User Id` 坑爹的来了，这个ID其实和你费老大劲后面绕了一大大大圈解析出来的那个sub是一样的，但你还是得搞，为了所谓的安全性
* `User Name` 顾名思义用户名，不过这个用户名是可以由用户自由指定的（甚至可以为空），不一定是用户在苹果的真实用户名
* `User Email` 这个邮箱也可以是伪造的，如果用户登录时拒绝提供真实的邮箱账号，苹果会生成虚拟的邮箱账号（固定后缀 @privaterelay.appleid.com）
* `Identity Token` 用于传给开发者后台服务器，然后开发者服务器再向苹果的身份验证服务端验证，本次授权登录请求数据的有效性和真实性。是一个经过签名的 [JSON Web Token(JWT)](https://en.wikipedia.org/wiki/JSON_Web_Token) ，详见 [Sign In with Apple REST API](https://developer.apple.com/documentation/signinwithapplerestapi)
* `authorizationCode` code验证方式的主要参数，后面会用到

现在我们已经从前端获取到了一些关键信息，注意 `User Name`，`User Email`只有在用户第一次授权的时候才能拿到，所以如果用得上的话要及时储存起来。
## 服务端向苹果请求验证
接下来我们需要拼接从前端获取的参数，用POST方法访问苹果提供的 <https://appleid.apple.com/auth/token> 接口，接口相关信息苹果有提供 [Generate and validate tokens](https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens) 。

下面着重介绍几个参数及其获取方法。首先先看下该接口需要的参数，如下

	client_id： string (必要) 您的应用程序的标识符（应用程序ID或服务ID）。该标识符不得包含您的团队ID，以帮助减轻敏感数据对最终用户的影响。授权代码和刷新令牌验证请求均需要此参数。
    
	client_secret： string (必要) 开发人员生成的秘密JSON Web令牌，使用与您的开发人员帐户关联的“使用Apple登录”私钥。授权代码和刷新令牌验证请求均需要此参数。
    
	code： string 授权响应中收到的授权代码已发送到您的应用。该代码仅供一次性使用，有效期为五分钟。授权参数验证请求需要此参数。
    
	grant_type： string (Required) 授予类型确定客户端应用程序如何与验证服务器交互。授权代码和刷新令牌验证请求均需要此参数。要进行授权码验证，请使用。对于刷新令牌验证请求，请使用 authorization_coderefresh_token。
    
	refresh_token： string 授权请求期间从验证服务器收到的刷新令牌。刷新令牌验证请求需要此参数。
    
	redirect_uri： string 在授权用户使用您的应用程序（如果适用）时，授权请求中提供的目标URI。URI必须使用HTTPS协议，包括域名，并且不能包含IP地址或localhost。授权参数验证请求需要此参数。
其中 `client_id` 为app的 `bundle identifier` ， `code` 即为手机端获取到的 `authorizationCode` 信息， `grant_type` 传入固定字符串 `authorization_code`  即可。还剩下一个必要参数 `client_secret` 那么这个参数相对麻烦点，需要我们自己生成。client_secret参数是一个JWT，singature部分使用非对称加密 RSASSA【RSA签名算法】 和 ECDSA【椭圆曲线数据签名算法】。

**生成 client_secret 之前，我们需要做如下工作**

* 获取 APP 的 `bundleID`
* 获取开发者账号的 `TeamID`
![upload successful](/images/pasted-1.png)
* 创建 privateKey，获取到 `Key ID` 和 `私钥`
![upload successful](/images/pasted-2.png)

![upload successful](/images/pasted-3.png)

创建完之后把私钥下载下来，并保存好，**注意，私钥只能下载一次。**

拿到上面所有信息之后，可以通过如下代码生成 `client_secret` ，代码为 Ruby 代码，确保已安装ruby环境。

```Ruby
require "jwt"

key_file = "/Your/path/to/AuthKey_XXXXX.p8" # 私钥文件地址
team_id = "KXXXXXGBU" # Team ID
client_id = "XXXXXXX" # App Bundle ID
key_id = "KXXXXXXZ8" # 私钥的Key ID
validity_period = 180 # In days. Max 180 (6 months) according to Apple docs.

private_key = OpenSSL::PKey::EC.new IO.read key_file

token = JWT.encode(
	{
		iss: team_id,
		iat: Time.now.to_i,
		exp: Time.now.to_i + 86400 * validity_period,
		aud: "https://appleid.apple.com",
		sub: client_id
	},
	private_key,
	"ES256",
	header_fields=
	{
		kid: key_id 
	}
)
puts token
```

创建文件 `secret_gen.rb` ，把上面代码粘贴进去，执行 `ruby secret_gen.rb` 即可生成 `client_secret`

代码中这个 `key_file` 需要指定刚才下载的文件的地址

到这里， `https://appleid.apple.com/auth/token`  的三个必需参数已经全部获得，用这些参数构造一个 post data ，类似下面这样
```JSON
{
	'client_id': 上面的Bundle ID,
	'client_secret': 上面的client_secret,
	'code': 前端传的authorizationCode,
	'grant_type': "authorization_code"
}
```
带上这个 post data 用 POST 方法访问 `https://appleid.apple.com/auth/token` ，你会得到类似下面的返回数据
```JSON
{
	"access_token": "一个token，此处省略",
	"token_type": "Bearer",
	"expires_in": 3600,
	"refresh_token": "一个token，此处省略",
	"id_token": "结果是JWT，字符串形式，此处省略"
}
```
参数解释看这个[文档](https://developer.apple.com/documentation/sign_in_with_apple/tokenresponse)

其中 `id_token` 里面就是我们需要的数据了，这也是 `JWT` 数据，需要进行解密，TM的这其实就是前端能获取到的token醉了。

原理讲完了上代码：
```Python
import requests

APPLE_CODE_URL = 'https://appleid.apple.com/auth/token'
BUNDLE_ID = "上面的Bundle ID"
client_sec = "上面的client_secret"
GRAND_TYPE = 'authorization_code'
code = "前端传的authorizationCode"

post_data = {
        'client_id': BUNDLE_ID,
        'client_secret': client_sec,
        'code': code,
		'grant_type': GRAND_TYPE,
        'scope': 'name'
		}

login_req = requests.post(url=APPLE_CODE_URL, data=post_data).json()
id_token = login_req['id_token']
print(id_token)
```
## 解密 JWT
为什么标题要叫解密JWT而不是解密id_token呢，因为这个方法同样也适用于token验证方式中的 `Identity Token` 解密，TMD这俩就是一个东西不能解密都出鬼了

JWT格式（以.点号分隔）：
* header: 包括了key id 与加密算法
* payload:
	* iss: 签发机构，苹果
    * aud: 接收者，目标app
	* exp: 过期时间
	* iat: 签发时间
	* sub: 用户id
	* c_hash: 一个哈希数列
	* auth_time: 签名时间
* signature: 用于验证JWT的签名

header（解码后）:
```JSON
{
	"kid":"AIDOPK1", //密钥id标识
	"alg":"RS256" //RS256算法对JWT进行的签名。（RSA 256 + SHA 256）
}
```
payload（解码后）:
```JSON
{
	"iss":"https://appleid.apple.com",//签发者
	"aud":"com.fun.AppleLogin",//目标受众
	"exp":1568721769,//过期时间
	"iat":1568721169,//The issued at registered claim key 签发时间
    "sub":"000580.087c554dce35466fa85c5a5d594d528a.0801", //苹果 userid
	"c_hash":"z_JcDlpW3B2p7q1GCgkRZQ", //一个哈希数列，作用未知
	"auth_time":1568721169 //签名时间
}
```
首先我们要用GET方法访问苹果的固定接口 <https://appleid.apple.com/auth/keys>获取 `Public Key` 公钥，[文档点这儿](https://developer.apple.com/documentation/sign_in_with_apple/fetch_apple_s_public_key_for_verifying_token_signature)
```JSON
{
	"keys": [
		{
			"kty": "RSA",
			"kid": "AIDOPK1",
			"use": "sig",
			"alg": "RS256",
			"n": "lxrwmuYSAsTfn-lUu4goZSXBD9ackM9OJuwUVQHmbZo6GW4Fu_auUdN5zI7Y1dEDfgt7m7QXWbHuMD01HLnD4eRtY-RNwCWdjNfEaY_esUPY3OVMrNDI15Ns13xspWS3q-13kdGv9jHI28P87RvMpjz_JCpQ5IM44oSyRnYtVJO-320SB8E2Bw92pmrenbp67KRUzTEVfGU4-obP5RZ09OxvCr1io4KJvEOjDJuuoClF66AT72WymtoMdwzUmhINjR0XSqK6H0MdWsjw7ysyd_JhmqX5CAaT9Pgi0J8lU_pcl215oANqjy7Ob-VMhug9eGyxAWVfu_1u6QJKePlE-w",
			"e": "AQAB"
		}
	]
}
```
我们可以通过这个 `Public Key` 去对 `id_token` 或者手机端获取到的 `identityToken` (JWT 信息)进行解码，以获取 `header` 及 `payload`

注意这个 `Public Key` 不只有一个，应该先通过token中的 `header` 中的 `kid` ，然后结合苹果公钥中的 `kid` ，拿到相应的 `Public Key`

上代码：

没有 `PyJWT` 包的先装一个
```bash
$ pip install PyJWT
```
代码
```Python
from jwt.algorithms import RSAAlgorithm

TOKEN_URL = 'https://appleid.apple.com/auth/keys'

def decode_jwt(token):
    # 从苹果那里拿公钥
    key_req = requests.get(TOKEN_URL).json()
	# 从data那里拿到token的加密方式
	head = jwt.get_unverified_header(token)
    token_key = head['kid']
    # 找到相对应的公钥，一般会发布多个公钥
    for pub_key in key_req['keys']:
        if pub_key['kid'] == token_key:
            key_core = simplejson.dumps(pub_key)
            # 打包公钥
            key = RSAAlgorithm.from_jwk(key_core)
            alg = pub_key['alg']
            break
    else:
        print('Unable to find public key')
        return None
    # 使用公钥来解密
    claims = jwt.decode(token, key=key, verify=True, algorithms=[alg], audience=BUNDLE_ID)
    return claims
```
解码后的信息如下
```JSON
{
	"iss": "https://appleid.apple.com",
	"aud": "这个对应app的bundleid",
	"exp": 1598335182,
	"iat": 1598334582,
	"sub": "这个字段和手机端获取的user信息相同",
	"at_hash": "_DsVyGBEMQx5HIi3uyf-UQ",
	"email": "XXXXXXXX@qq.com",
	"email_verified": "true",
	"auth_time": 1598334492,
	"nonce_supported": True
}
```
里面的 `sub` 就是用户apple账号登录在该程序中的唯一标识了（类似 `openid` ），我们可以把它存到程序的数据库中与用户信息做映射，用于标识用户身份。
## 参考链接
[Sign In With Apple 从登陆到服务器验证](https://www.yuque.com/zhanglong/bb0s5d/cxbh7n)

[Sign in with Apple 登录详解](https://ihtcboy.com/2019/09/16/2019-09-16_Sign-in-with-Apple/)

[Python后端实现苹果ID登陆](https://blog.csdn.net/Tommey_Chang/article/details/106770207?utm_medium=distribute.pc_relevant.none-task-blog-title-1&spm=1001.2101.3001.4242)

[Sign in with Apple（苹果授权登陆）](https://blog.csdn.net/wpf199402076118/article/details/99677412)

[Sign in with Apple NODE，web端接入苹果第三方登录](https://segmentfault.com/a/1190000020786994?utm_source=tag-newest)