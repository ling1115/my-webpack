[toc]

# 大纲

微前端最早于2016年在[Miciro-Frontents被提出](https://swearer23.github.io/micro-frontends/)，并建立了早期的微前端模型。

微前端的命名与能力和微服务有类似之处，都是希望==将某个单一的单体应用，转化为多个可以独立运行、独立开发、独立部署、独立维护的服务或应用的聚合==，从而==满足业务快速变化及分布式多团队并行开发的需求。==

如康威定律所言：设计系统的组织，其产生的设计和架构等价于组织间的沟通结构。

==微前端和微服务不仅是技术架构的变化，还包含了组织方式、沟通方式的变化。==
微前端和微服务和软件工程、面向对象设计中的==原理==同样相同：都是==遵循单一职业、关注分离、模块化与分而治之等基本原则。==

两个问题：
* 微前端如何解决业务问题和如何实现微前端。
* 微前端的核心实现原理。

# 前景
## 1. 微前端是什么
一种类似于微服务的架构，是一种由独立交付的多个前端应用组成整体的架构风格，将前端应用分解成一些更小、更简单的能够独立开发、测试、部署的应用，而在用户看来仍然是内聚的单个产品。
==微前端是一种架构风格，它允许可独立交付的前端应用程序被组合成一个更大的整体。==
<img alt='微前端' src="https://img-blog.csdnimg.cn/5ae9f3b0b7024aa2aad02fd0e6a21b0f.png" width="60%"/>

## 2. 现代web应用面临的问题
* DX(developer experience,开发者经验)
    * 多个系统在一个仓库应用中，不同子应用独立SPA(==单页面应用==)模式。SPA存在问题：
        * 随着事件的推移以及应用功能的丰富，单页面应用变得不再单一，而是越来越庞大也越来越难维护，往往是改一处而动全身，因此带来的发版成本越来越高
    * 系统分为多个仓库，独立上线部署，采用MPA(==多页面应用==)模式。MPA存在问题：
        * 应用之间的通信只能依赖URL、cookie或者localstorage，实现麻烦
        * 页面之间的跳转是从一个页面到另一个页面，通过HTTP请求实现，
        * 跳转后公共资源会重新加载
        * 导致切换加载慢，不流畅，用户体验差，尤其在移动端
* UX(user experience, 使用者经验)
    * 性能体验
    * 页面跳转和用户体验问题
    

## 3. 解决方案-微前端

![微前端](https://img-blog.csdnimg.cn/aebc7639f9dd457782bebb7eb6c17fef.png#pic_center)

## 4. 微前端的意义
### 1. 微前端的主要特点
* ==低耦合==：当下前端领域，单页面应用(SPA)是非常流行的项目形态之一，而随着事件的推移以及应用功能的丰富，单页面应用变得不再单一，而是越来越庞大也越来越难维护，往往是改一处而动全身，因此带来的发版成本越来越高。==微前端的意义就是将这些庞大应用进行拆分，并随之解耦，每个部分可以单独进行维护和部署，提升效率。==
* ==不限技术栈==：在不少业务章，或多或少会存在一些历史项目，这些项目大多以采用老框架类似的B端管理系统为主，介于日常运营，这些系统需要结合到新框架中来使用还不能抛弃，对此我们也没有理由浪费时间和精力重写旧的逻辑。==而微前端可以将这些老系统进行整合，在基本不修改原理逻辑的同时来兼容新老两套系统并行运行。==

### 2. 微前端解决的问题
* 业务领域的代码库独立和高度可重用
* 相同的产品功能有多个团队开发/产品功能保持统一
* 新的产品理念在不同的应用中快速复用/实现
* 快速迭代新子业务/干净移除将被淘汰的子业务
* 提升构建效率
* 改善交付效率
* 架构渐进升级
* 子团队的独立性
* ....

微前端的价值：
工程：==提升构建效率，独立开发/部署/交付，平滑升级==
商业：==产品动态化，业务颗粒化，团队自治==

## 5. 微前端的方案
### 1. 微前端应该具备的能力
1. JS沙箱：子应用直接互不影响，包括全局变量、事件等处理
2. CSS隔离：子应用之间样式互不影响，切换时装载和卸载
3. HTML Entry：Config Entry 的进阶版，简化开发者使用，但把解析消耗留给了用户
4. Config Etry: 配置每个子应用的JS和CSS，包括内联的那些
5. 按需加载：切换到页面时才加载相应的HTML、CSS、JS
6. 公共依赖加载：大部分子应用都用到的资源怎么处理
7. 预加载：空闲时加载子应用资源，用户行为数据支持
8. 父子应用通讯：子应用如何调用父应用方法，父应用如何下发状态
9. 子应用嵌套：微前端如何嵌套微前端-进阶用法：a->b, b->c
10. 子应用并行：多个微前端如何同时存在-进阶用法: main->a,b,c

### 2. 一些可以实现微前端的方案
* 使用 HTTP 服务器的路由来重定向多个应用(MPA)
* ==在不同框架之上设计通讯、加载机制，如：[single-spa](https://github.com/single-spa/single-spa),  [qiankun](https://github.com/umijs/qiankun), [icestark](https://micro-frontends.ice.work)==
* ==通过组合多个独立应用、组件来构建一个单体应用==
    * 微前端之构建时方案(Module Federation [EMP](https://github.com/efoxTeam/emp))
* iFrame: 使用 iFrame及自定义消息传递机制
* 使用传 web components 构建应用: [stencil](https://github.com/ionic-team/stencil)


### 3. 业界主流的微前端框架
* [single-spa](https://github.com/single-spa/single-spa): 社区公认的主流方案，可以基于它做二次开发
* [qiankun](https://github.com/umijs/qiankun): 基于 single-spa 封装，增加 umi 特色，增加沙箱机制(JS, ShadowDOM等)
* [icestark](https://micro-frontends.ice.work): 类似于 single-spa 实现，react 技术栈友好，阿里的另一个轮子




# 1. 使用qiankun实现微前端
## 1. 创建主应用基座

==基座主要实现微应用框架的初始化和注册等，通常没有具体的应用业务逻辑在里边。==



### 1.1 创建主应用

==使用 [vue-cli](https://cli.vuejs.org/zh/guide/) 生成一个vue项目，初始化主应用==
1. 创建一个文件夹：`mkdir main-test`, 模仿实现qiankun的功能
2. 创建一个react项目作为主应用：`create-react-app main`
    * 主应用不限技术栈，只需要提供一个容器 DOM，然后注册微应用并 start 即可。
    * 安装qiankun: `npm i qiankun -S / yarn add qiankun`
4. 创建vue微应用：`vue create sub1`  `vue create sub2`
5. 在主应用注册微应用并启动

### 1.2 创建微应用容器
==在主应用中创建微应用的承载容器，这个容器规定了微应用的显示区域，微应用将在改容器内渲染并显示。==
* main/src/App.js

```html
import { BrowserRouter as Router, Link } from 'react-router-dom'
import './reset.css'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="router">
        
      </div>

      <div id="micro-container" />
    </div>
  )
}

export default App
```

### 1.3 注册微应用
==构建好了主框架后，需要使用 [registerMicroApps](https://qiankun.umijs.org/zh/api#registermicroappsapps-lifecycles) 方法注册微应用。==
* main/src/index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { registerMicroApps, start } from 'qiankun';
// 注册微应用
registerMicroApps([
  {
    name: 'sub1', // app name registered
    entry: '//localhost:8080',
    container: '#micro-container',
    activeRule: '/sub1',
  },
  {
    name: 'sub2',
    entry: '//localhost:8081/',
    // entry: {scripts:['//localhost:8081/dist.js']}, // 可以是打包后的js文件
    container: '#micro-container',
    activeRule: '/sub2',
  },
]);

start();

ReactDOM.render(
  // ...
);

reportWebVitals();
```

### 1.4 启动主应用
`yarn start / npm run start`


## 2. 接入微应用
==qiankun 内部通过 import-entry-html 加载微应用，要求微应用需要 [导出声明周期构造函数](https://qiankun.umijs.org/zh/guide/getting-started#1-导出相应的生命周期钩子)。==

微应用需要在自己的入口 js (通常就是你配置的 webpack 的 entry js) 导出 bootstrap、mount、unmount 三个生命周期钩子，以供主应用在适当的时机调用。
* sub1/src/main.js | sub2/src/main.js

```js
if(!window.__QIANKUN_DEVELOPMENT__){ // 非乾坤环境下 执行渲染
  render();
}
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  /* ... */
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
 /* ... */
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props);
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props);
}
```

### 2.1. 接入vue微应用
* main/src/App.js

```html
<div className="router">
    <Router>
      <div>
        <nav>
          <ul>
            <li className="sub-meanu">
              <Link to="/">首页</Link>
            </li>
            <li className="sub-meanu">
              <Link to="/sub1">子应用1</Link>
            </li>
            <li className="sub-meanu">
              <Link to="/sub2">子应用2</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
</div>
```

# 2. 模拟qiankun实现简易版微前端框架
* 初始化ts项目
    * 在main-test: `npm init -y`
    * 创建一个src文件夹，并在src文件夹下面添加index.ts
        * `mkdir src`
        * `touch src/index.ts`
    * 安装需要的依赖：
        * `npm install typescript @types/requestidlecallback eslint eslint-plugin-prettier lint-staged prettier --save-dev`
        * `npm i import-html-entry path-to-regexp qiankun`
    * 创建ts配置文件tsconfig.json:

```js
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "outDir": "./dist",
    "lib": [
      "dom",
      "esnext",
      "scripthost",
      "es2015.promise"
    ]
  }
}
```

* 执行：`yarn`: 监听文件变化: `Watching for file changes.`

## 1. 注册子应用功能`registerMicroApps,start`

* main-test/src/index.ts

```js
import { registerMicroApps, start } from './start';
```

* main-test/src/start.ts

```js
import {IAppInfo, IlifeCycle} from './type';
import {setAppList} from './appList';
import {setLifeCycle} from './lifeCycle';
// 1. 注册微应用
// 接受两个参数：
// apps - Array<RegistrableApp> - 必选，微应用的一些注册信息
// lifeCycles - LifeCycles - 可选，全局的微应用生命周期钩子
// appList:IAppInfo[] -> appList是一个数组，且数组里的每一个是IAppInfo类型的对象
export const registerMicroApps = (appList:IAppInfo[], lifeCycle?:ILifeCycle)=>{
    setAppList(appList);
    lifeCycle && setLifeCycle(lifeCycle);
}
// 2. 启动主应用，监听路由变化
// 接受参数 opts - Options 可选
export const start = (opts?)=>{
    
}
```
### 应用生命周期的处理
主应用：
* beforeLoad: 挂载子应用前
* mounted: 挂载子应用后
* unmounted: 卸载子应用

子应用：
* bootstrap: 首次加载应用时触发，常用于配置子应用全局变量，只执行一次
* mount: 应用挂载时触发，常用于渲染子应用，可执行多次
* unmounted: 应用卸载时触发，常用于销毁应用，可执行多次

* main-test/src/appList/index.ts

```js
import {IAppInfo} from "../types";
let appList: IAppInfo[] = [];
export const setAppList = (list:IAppInfo[])=>{
    appList = list;
}
export const getAppList = ()=>{
    return appList;
}
// 应用生命周期的处理
/*
    主应用：
        1. beforeLoad: 挂载子应用前
        2. mounted: 挂载子应用后
        3. unmounted: 卸载子应用
    子应用：
        1. bootstrap: 首次加载应用时触发，常用于配置子应用全局变量，只执行一次
        2. mount: 应用挂载时触发，常用于渲染子应用，可执行多次
        3. unmounted: 应用卸载时触发，常用于销毁应用，可执行多次
*/
```

* 全局生命周期的处理: main-test/src/lifeCycle/index.ts

```js
import {ILifeCycle} from "../types";
let lifeCycle: ILifeCycle = {};
export const setLifeCycle = (obj:ILifeCycle)=>{
    lifeCycle = obj;
}
export const getLifeCycle = ()=>{
    return lifeCycle;
}
// 全局生命周期的处理
```
## 2. 启动主应用，监听路由变化
==监听路由变化：==
* history
* hashHistory

==路由劫持：==
* 路由变化时匹配子应用
* 执行子应用生命周期
* 加载子应用

* main-test/src/route/index.ts

### 0. 劫持并监听pushState，replaceState方法
### 0. 获取子应用列表，不同应用状态的app执行相应生命周期
* ==劫持history和hashHistory相关的事件==
    * 劫持并监听pushState，replaceState方法
    * 不干扰原本hashchange,popstate事件的相关逻辑，即做hashchange,popstate事件的事件代理
* ==在劫持后做子应用相关的逻辑处理==
    * ==获取子应用列表后，不同应用状态的app执行相应生命周期==
        * 不是当前应用时处理: 拿到主应用的生命周期，执行渲染对应的子应用
        * 获取渲染、卸载的应用列表：
            * 先卸载需要卸载的应用，并执行卸载的子应用生命周期和全局微应用的卸载生命周期(`lifeCycles`) --- 在生命周期`lifeCycle/index.ts`中处理
                * 执行子应用卸载`unmounted`函数
                * 执行全局微应用的卸载`unmounted`函数
            * 再注册需要注册的应用，并执行对应子应用的生命周期和全局微应用的挂载生命周期(`lifeCycles`) --- 在生命周期`lifeCycle/index.ts`中处理
                * 执行`beforeLoad`函数，在其中==加载子应用资源==
                * 执行子应用`bootstrap`生命周期函数
                * 执行子应用挂载`mounted`函数
                * 执行全局微应用的挂载`mounted`函数
            * 然后执行路由相关事件的所有`callback`。

```js
import {EventType} from '../types';
// 1. 劫持history和hashHistory相关的事件
// 2. 在劫持后做子应用相关的逻辑处理

// 0. 保存浏览器原本的路由方法
const originPush = window.history.pushState;
const originReplace = window.history.replaceState;

// 存储原本路由相关事件的逻辑
const capturedListener: Record<EventType, Function[]> = {
    // hashchange 的 callback
    hashchange: [],
    // popstate 的 callback
    popstate: []
}
let lastUrl: string | null = null; // 记录当前url


// 1. 监听路由变化：即劫持并监听pushState，replaceState方法
export const hijackRoute = ()=>{
    // 1. 重写pushState，replaceState方法
    window.history.pushState = (...args: any)=>{
        originPush.apply(window.history, args);
        reroute(args[2]);
    }
    window.history.replaceState = (...args: any)=>{
        originReplace.apply(window.history, args);
        reroute(args[2]);
    }
    // 2. 监听pushState，replaceState事件
    window.addEventListener("hashchange", ()=>{
        
    })
    window.addEventListener("popstate", ()=>{
        
    })
    // 3. 不干扰原本hashchange,popstate事件的相关逻辑
    window.addEventListener = hijackEventListener(window.addEventListener);
    window.removeEventListener = hijackEventListener(window.removeEventListener);
}
// 相当于事件代理
const hijackEventListener = (func: Function): any =>{
    return function(name:string, fn: Function){
        if(name === 'hashchange' || name === 'popstate'){
            if(!hasListener(name, fn)){
                capturedListener[name].push(fn);
                return;
            }else{
                // 有就重新覆盖赋值callback
                capturedListener[name] = capturedListener[name].filter(item=>item!==fn);
            }
        }
        return func.apply(window,arguments);
    }
}
// 判断是否已存储该callback
const hasListener = (name: EventType, fn:Function)=>{
    return capturedListener[name].filter(item=>item===fn).length;
}

// 2. 然后重写路由处理的方法：做子应用相关的逻辑处理
// 获取子应用列表后，不同应用状态的app执行相应生命周期
export const reroute = (url?:string|null)=>{
  // 获取渲染、卸载的应用列表
  const {actives, unmounts} = getAppListStatus();
  // 不是当前应用时处理: 拿到主应用的生命周期，执行渲染对应的子应用
   /*
    * 获取渲染、卸载的应用列表：
      * 先卸载需要卸载的应用，并执行卸载的子应用生命周期和全局微应用的卸载生命周期(`lifeCycles`) --- 在生命周期`lifeCycle/index.ts`中处理
            * 执行子应用卸载`unmounted`函数
            * 执行全局微应用的卸载`unmounted`函数
        * 再注册需要注册的应用，并执行对应子应用的生命周期和全局微应用的挂载生命周期(`lifeCycles`) --- 在生命周期`lifeCycle/index.ts`中处理
            * 执行`beforeLoad`函数，在其中==加载子应用资源==
            * 执行子应用`bootstrap`生命周期函数
            * 执行子应用挂载`mounted`函数
            * 执行全局微应用的挂载`mounted`函数
        * 然后执行路由相关事件的所有`callback`。
  */
  if(url !== lastUrl){
    //  先卸载需要卸载的应用并执行卸载的生命周期，然后注册需要注册的应用并执行对应的生命周期
    Promise.all(
      unmounts.map(async (app)=>{
        await runUnMounted(app);
      }).concat(
        actives.map(async (app)=>{
          // 执行对应的生命周期函数
          await runBeforeLoad(app);
          await runBootstrap(app);
          await runMounted(app);
        })
      )
    ).then(()=>{
        
    })
  }
  lastUrl = url || location.href; // 默认原始路径
}
```
### 1. 获取应用状态：通过匹配路由获取应用
==根据应用的不同状态，获取子应用。==
==path-to-regexp: 匹配路由的插件==
* main-test/src/utils.ts

```js
import {IInternalAppInfo} from './types';
import {getAppList} from './appList';
import {AppStatus} from './enum';
import {match} from 'path-to-regexp';

export const getAppListStatus = ()=>{
    // 根据注册阶段传入的 applist，匹配当前的路由，返回app对于状态
    
    // 1. 需要渲染的应用列表
    const actives: IInternalAppInfo[] = [];
    // 2. 需要卸载的应用列表
    const unmounts: IInternalAppInfo[] = [];
    // 3. 需要注册的应用列表
    const list = getAppList() as IInternalAppInfo[];
    // 4. 路由匹配，返回状态
    // 遍历注册子应用，路由如果和当前路由一支，则放入渲染列表
    list.forEach((app)=>{
        const isActive = match(app.activeRule, {end: false})(location.pathname);
        // 根据app状态处理对应逻辑
        switch (app.status) {
          case AppStatus.NOT_LOADED:
          case AppStatus.LOADING:
          case AppStatus.LOADED:
          case AppStatus.BOOTSTRAPPING:
          case AppStatus.NOT_MOUNTED:
            isActive && actives.push(app)
            break
          case AppStatus.MOUNTED:
            !isActive && unmounts.push(app)
            break
        }
    })
    return { actives, unmounts };
}
```

* ==定义应用状态常量==: main-test/src/enum.ts

```js
export enum Apptatus {
    NOT_FOUND = "NOT_FOUND",
    LOADING = "LOADING",
    LOADED = "LOADED",
    BOOTSTRAPPING = "BOOTSTRAPPING",
    NOT_MOUNTED = "NOT_MOUNTED",
    MOUNTING = "MOUNTING",
    UNMOUNTING = "UNMOUNTING"
}
```

### 2. 处理应用生命周期
* main/src/lifeCycle/index.ts
* 卸载需要卸载的应用，并执行卸载的子应用生命周期和全局微应用的卸载生命周期(`lifeCycles`) --- 在生命周期lifeCycle/index.ts中处理
    * 执行子应用卸载unmounted函数
    * 执行全局微应用的卸载unmounted函数
* 注册需要注册的应用，并执行对应子应用的生命周期和全局微应用的挂载生命周期(`lifeCycles`) --- 在生命周期lifeCycle/index.ts中处理
    * 执行`beforeLoad`函数加载子应用资源
    * 执行子应用bootstrap生命周期函数
    * 执行子应用挂载mounted函数
    * 执行全局微应用的挂载mounted函数

```js
/* 应用生命周期的处理 */
/*
    主应用：
        1. beforeLoad: 挂载子应用前
        2. mounted: 挂载子应用后
        3. unmounted: 卸载子应用
    子应用：
        1. bootstrap: 首次加载应用时触发，常用于配置子应用全局变量，只执行一次
        2. mount: 应用挂载时触发，常用于渲染子应用，可执行多次
        3. unmounted: 应用卸载时触发，常用于销毁应用，可执行多次
*/
import {ILifeCycle, IInternalAppInfo, IAppInfo} from "../types";
import {AppStatus} from '../enum';

let lifeCycle: ILifeCycle = {};
export const setLifeCycle = (list:ILifeCycle)=>{
  lifeCycle = list;
}
export const getLifeCycle = ()=>{
  return lifeCycle;
}

// ·1. 挂载子应用前
export const runBeforeLoad =async (app:IInternalAppInfo)=>{
  // 1. 设置子应用状态为 加载中
  app.status = AppStatus.LOADING;
  // 2. 执行主应用 beforeLoad 周期函数
  // await runLifeCycle("beforeLoad", app);
  // 3. 加载子应用资源
  // app = await loadHtml(app);
  // 4. 设置子应用状态为 已加载
  app.status = AppStatus.LOADED;
}
// 2. 挂载子应用后
export const runMounted = async (app:IInternalAppInfo)=>{
  // 1. 设置应用状态为 挂载中 mounting
  app.status = AppStatus.MOUNTING;
  // 2. 执行应用的卸载声明周期函数 mount()
  await app.mount?.(app)
  // 3. 执行完 unmount() 生命周期后，修改应用状态为 mounted
  app.status = AppStatus.MOUNTED;
  // 4. 执行全局生命周期函数
  await runLifeCycle('mounted', app);
}
// 3. 卸载子应用时
export const runUnMounted = async (app: IInternalAppInfo)=>{
  // 1. 设置应用状态为 unmounted
  app.status = AppStatus.UNMOUNTING;
  // 2. 执行应用的卸载声明周期函数 unmount()
  await app.unmount?.(app)
  // 3. 执行完 unmount() 生命周期后，修改应用状态为 not_mounted
  app.status = AppStatus.NOT_MOUNTED;
  // 4. 执行全局生命周期函数
  await runLifeCycle('unmounted', app);
}

// 子应用初次加载时：首次加载应用时触发，常用与配置子应用全局变量，只执行以此
export const runBootstrap = async (app:IInternalAppInfo)=>{
  // 因为bootstrap只执行一次，所以需要判断
  // 如果应用状态不处于 已加载 状态，返回应用
  if(app.status !== AppStatus.LOADED){
    return app;
  }
  // 1. 设置状态为 bootstrapping
  app.status = AppStatus.BOOTSTRAPPING;
  // 2. 执行 bootstrap 生命周期
  await app.bootstrap?.(app)
  // 3. 设置状态为 卸载
  app.status = AppStatus.NOT_MOUNTED;
}
// 执行全局的生命周期函数
const runLifeCycle = async (name: keyof ILifeCycle, app: IAppInfo)=>{
  const fn = lifeCycle[name];
  if(fn instanceof Array){
    await Promise.all( fn.map(item=>item(app)) );
  }else{
    await fn?.(app);
  }
}
```

### 3. 通过fetch请求子应用资源进行解析并渲染
==资源加载==
1. 加载样式表
2. 提取js代码
3. 执行js渲染

* 因为都是spa的页面应用，所以可以通过提取标签，加载对应的资源

* main/src/loader/index.ts

```js
// 通过 fetch 请求获取子应用资源
// 解析子应用资源，进行渲染
// 因为都是spa的页面应用，所以可以通过提取标签，加载对应的资源

/** 资源加载
 * 1. 加载样式表
 * 2. 提取js代码
 * 3. 执行js渲染
 */
import {IInternalAppInfo} from '../types';
import { importEntry } from 'import-html-entry';
import {ProxySandbox} from './sanbox';

export const loadHtml = async (app: IInternalAppInfo)=>{
  const {container, entry} = app;
  const { template, getExternalScripts, getExternalStyleSheets } = await importEntry(entry);
  const dom = document.querySelector(container);

  if(!dom){
    throw new Error("容器不存在");
  }

  dom.innerHTML = template;
  await getExternalStyleSheets();
  const jsCode = await getExternalScripts();

  jsCode.forEach((script)=>{
    const lifeCycle = runJS(script, app);
    if(lifeCycle){
      app.bootstrap = lifeCycle.bootstrap;
      app.mount = lifeCycle.mount;
      app.unmount = lifeCycle.unmount;
    }
  })
  return app;
}

const runJS = (value: string, app: IInternalAppInfo)=>{
  if(!app.proxy){
    app.proxy = new ProxySandbox();
    // @ts-ignore
    window.__CURRENT_PROXY__ = app.proxy.proxy;
  }

  app.proxy.active();
  const code = `
    return (window=>{
      ${value}
      return window['${app.name}']
    })(window.__CURRENT_PROXY__)
  `

  return new Function(code)();
}
```


### 5. 启动应用，获取子应用并加载其资源
* 获取子应用列表，若无则提示：请先注册应用
* 劫持并监听路由变化
* 执行子应用对应的生命周期函数
* 遍历子应用列表，若子应用状态为未加载，则通过fetch请求子应用资源解析并渲染

* main-test/src/start.ts

```js
// ...

export const start = ()=>{
  const list = getAppList();
  if(!list.length){
    throw new Error("请先注册应用");
  }

  hijackRoute();
  reroute(window.location.href);

  list.forEach(app=>{
    if (!(app as IInternalAppInfo).status || (app as IInternalAppInfo).status === AppStatus.NOT_LOADED) {
      prefetch(app as IInternalAppInfo)
    }
  })
}
```


# 运行方式
- 根目录执行 `yarn build或者 npm build` 构建微前端框架
- 分别启动主应用和两个子应用，并确保访问端口和在主应用中配置的一致
- 进入 example 文件夹，分别启动每个子应用
- src下为微前端框架简单版本，会被编译到dist目录中
