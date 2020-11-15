# egg-tcb

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-tcb.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-tcb
[travis-image]: https://img.shields.io/travis/eggjs/egg-tcb.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-tcb
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-tcb.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-tcb?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-tcb.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-tcb
[snyk-image]: https://snyk.io/test/npm/egg-tcb/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-tcb
[download-image]: https://img.shields.io/npm/dm/egg-tcb.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-tcb


## 开启插件

```js
// config/plugin.js
exports.tcb = {
  enable: true,
  package: 'egg-tcb',
};
```


## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

### 示例配置：
```js
// config/config.default.js
module.exports = {
  tcb: {
    client: {
      enable: true,
      secretId: 'xxxxx',
      secretKey: 'xxxxx',
      envId: 'xxxxx',
    },
  },
};
```

## 使用说明

### 单实例
在配置文件中声明 tcb 的配置。
```js
// config/config.default.js
module.exports = {
  tcb: {
    client: {
      enable: true,
      secretId: 'xxxxx',
      secretKey: 'xxxxx',
      envId: 'xxxxx',
    },
  },
};
```
直接通过 app.tcb 访问数据库。
```js
// app/controller/post.js
class PostController extends Controller {
  async list() {
    const posts = await this.app.tcb.env.listEnvs();
  },
}
```
<blockquote>
返回的是 <font face="黑体" color="red" size="5">promise</font> 要用 then 接收或者await async
</blockquote>
### 多实例
#### 同样需要在配置文件中声明 tcb 的配置，不过和单实例时不同，配置项中需要有一个 clients 字段，分别申明不同实例的配置，同时可以通过 default 字段来配置多个实例中共享的配置（如 secretId 和 secretKey）。需要注意的是在这种情况下要用 get 方法指定相应的实例。（例如：使用 app.tcb.get('d1').env.listEnvs()，而不是直接使用 app.tcb.env.listEnvs() 得到一个 undefined）。
```js
// config/config.default.js
exports.mysql = {
  clients: {
    d1: {
      envId: 'e1',
    },
    d2: {
      envId: 'e2', 
    },
  },
  // default configuration
  default: {
    secretId: 'xxxxx',
    secretKey: 'xxxxx',
  },
};
```
通过 app.tcb.get('d1') 来获取对应的实例并使用。
```js
// app/controller/post.js
class PostController extends Controller {
  async list() {
    const posts = await this.app.tcb.get('d1').env.listEnvs();
  },
}
```
### 动态创建实例
我们可以不需要将配置提前申明在配置文件中，而是在应用运行时动态的初始化一个实例。
```js
// app.js
module.exports = app => {
  app.beforeStart(async () => {
    const tcbConfig = await app.configCenter.fetch('tcb');
    // 动态创建 cloudbase 实例
    app.cloudbase = await app.tcb.createInstanceAsync(tcbConfig);
  });
};
```
通过 app.cloudbase 来使用这个实例。
```js
// app/controller/post.js
class PostController extends Controller {
  async list() {
    const posts = await this.app.cloudbase.env.listEnvs();
  },
}
```
注意，在动态创建实例的时候，框架也会读取配置中 default 字段内的配置项作为默认配置。

## 详细接口请访问[cloudbase Node SDK](https://docs.cloudbase.net/api-reference/manager/node/initialization.html)
## 提问交流

请到 [egg issues](https://github.com/juukee/egg-tcb/issues) 异步交流。

## License

[MIT](LICENSE)

