# vue 阿里云上传组件

##### [测试项目git地址](https://github.com/LazyNeo/vue-oss-uploader)
##### [本测试项目启动方法](./startup.md)
##### [示例链接](https://lazyneo.github.io/oss/#/)
##### [组件配置项](config.md)

## 实践解释
本文主要介绍如何  
1. 在vue项目中使用web
2. 直传方式上传阿里云oss图片  

默认读者对vue框架和阿里云oss有一定的了解
整体的流程是加载好阿里云sdk -> 初始化上传客户端client -> 等待文件选择 -> 文件选择进行上传 -> 分发上传结果  
可以直接复制代码使用,也可以npm [组件地址](https://github.com/LazyNeo/vue-oss-uploader/blob/master/src/components/uploader.vue)
> npm 使用

```
$ npm i vue-oss-uploader
```

vue中引用
```javascript
// main.js 安装插件
import vueOssUploader from 'vue-oss-uploader'
import 'vue-oss-uploader/npm/static/css/vue-oss-uploader.min.css'
Vue.use(vueOssUploader)
```
具体的配置项请查看[组件配置项](config.md)
```html
<!-- html中使用 -->
<vueOssUploader :path="path" :debug="true" :name-mode="nameMode" :keySet="keySet" :name="name" v-on:success="uploaded" @error="showError"></vueOssUploader>
```

使用过程中我碰到以下的坑：
#### 1. 本文使用的是js引入形式的阿里云sdk，用npm形式的sdk会需要一些后端的node功能，不能用于web直传。
可以直接在html里面加上script标签
```html
<script src="https://gosspublic.alicdn.com/aliyun-oss-sdk-4.3.0.min.js"></script> 
```
> 组件里我包装了一个异步获取sdk的方法LoadJS，感兴趣的可以看一下
#### 2. 使用js引入形式的sdk会有一个异步的问题，就是client初始化的时候sdk可能还没加载好，我是在vue的mouted钩子函数内设置了一个定时器，当SDK加载的完成之后再来初始化client

```JavaScript
let timer = setInterval(() => {
  if (window.OSS) {
    this.init()
    clearInterval(timer)
    timer = null
    this.debug && window.console.log('阿里云oss初始化完成')
  } else {
    this.debug && window.console.log('阿里云oss初始化中...')
  }
}, 500)
```
#### 3. 如果你的项目是https环境下的，需要保证初始化client的时候配置secure为true，不然无法上传文件
#### 4. 在默认情况下，保存的图片名会取一个随机的字符串，但是同一张图片多次上传就会保存多个相同图片，这边我做了一个优化，将图片的大小和高宽拼接成一个字符串，再对这个字符串进行md5 hash化处理，这样同一张图片上传多次也只会保存一张

有什么问题或者疑问，请在下方评论或者在[github](https://github.com/LazyNeo/vue-oss-uploader)上提issue都可以
#### 参考链接
1. [阿里云oss文档](http://imgs-storage.cdn.aliyuncs.com/help/oss/oss%20api%2020140828.pdf)
2. [vue官网](https://vuefe.cn/v2/guide/installation.html)

