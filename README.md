# Egg-Webpack-Starter

[![hits][hits-image]][hits-url]

本项目的主要目的是展示如何使用 Egg + Webpack 搭建一套前后端统一的开发环境，主要包括：

- 后端 Node.js 使用 Egg 框架
- 前端使用基于 webpack 的工作流，与具体框架无关（本项目使用 react 做演示）
- 开发过程中无需分别启动前端与后端应用（基于 egg-webpack）

## 1. 快速使用

1. clone 本项目

```shell
git clone https://github.com/keenwon/Egg-Webpack-Starter.git
```

2. 本地开发

```shell
npm run dev
```

3. 执行测试 & lint

```shell
npm test
```

4. 应用部署

```shell
# 构建前端静态资源
npm run build

# 启动应用
npm start

# 停止应用
npm stop
```

## 2. 目录结构

```shell
.
├── app                 # 服务端代码
│   ├── controller      # egg controller
│   ├── public          # 静态资源目录
│   │   └── static      # 前端 build 输出
│   └── view            # egg view
├── client              # 客户端代码
│   ├── build           # webpack config
│   └── src             # 客户端源码
│       └── views
├── config              # egg config
```

## 3. Egg + Webpack

> 本节详细讲述整个搭建过程，如果你只是想简单使用，请参考前面的“快速使用”

### 3.1. Egg

首先，你得有个一 egg 应用，具体可以查看[官方文档](https://eggjs.org)，此处不再赘述。

### 3.2. 添加 Webpack

我们使用 [egg-webpack](https://github.com/easy-team/egg-webpack) 实现基于 egg 的 webpack 编译和热更新。关于 egg-webpack 的更多内容可以看[这里](http://hubcarl.github.io/blog/2017/04/15/egg-webpack/)。

#### 3.2.1. 安装和配置 egg-webpack

```shell
npm install egg-webpack --save-dev
```

#### 3.2.2. 配置 egg

启用 plugin：

```js
// 仅需 local 环境
// {root}/config/plugin.local.js

exports.webpack = {
  enable: true,
  package: "egg-webpack"
}
```

配置端口和 webpack config file：

```js
// {root}/config/config.local.js

exports.webpack = {
  port: 9000,
  webpackConfigList: [require("../webpack.config")]
}
```

这里指定 `9000` 端口，后面会用到。

#### 3.2.3. 配置热更新

安装 `webpack-hot-middleware`：

```shell
npm i webpack-hot-middleware --save-dev
```

配置 `webpack.dev.js`：

```js
module.exports = {
  // ...
  entry: {
    app: [
      // 注意端口和前面设置的一致
      "webpack-hot-middleware/client?path=http://127.0.0.1:9000/__webpack_hmr&reload=true",
      "../src/index.js"
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
  // ...
}
```

添加 `react-hot-loader`（其他框架同理）:

```js
// babel.config.js
module.exports = {
  // ...
  plugins: ["react-hot-loader/babel"]
  // ...
}
```

修改入口组件，使用 `react-hot-loader` 提供的 hoc：

```jsx
import React from "react"
import {hot} from "react-hot-loader/root"

const App = () => <div>App</div>

export default hot(App)
```

#### 3.2.4. 前后端对接

这里使用 handlebar 模板，开发模式写死就好了， 生产环境读取 `manifest`：

```handlebars
{{#if isDev}}
<script type='text/javascript' src="/public/static/app.js"></script>
{{else}}
<script type='text/javascript' src="{{manifest.[runtime.js]}}"></script>
<script type='text/javascript' src="{{manifest.[vendors.js]}}"></script>
<script type='text/javascript' src="{{manifest.[app.js]}}"></script>
{{/if}}
```

## 4. 说明

### 4.1. 为什么 `package.json` 会有 acorn 相关的依赖？

eslint 和其他包都可能依赖 acorn，会造成冲突，具体查看 https://github.com/eslint/espree/issues/393

## 5. 参考

- [Egg](https://eggjs.org/)
- [Webpack](https://webpack.js.org)
- [egg-webpack](https://github.com/easy-team/egg-webpack)
- [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware)

## 6. LICENSE

MIT.

[hits-image]: http://hits.dwyl.io/keenwon/Egg-Webpack-Starter.svg
[hits-url]: https://github.com/keenwon/Egg-Webpack-Starter
