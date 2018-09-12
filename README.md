# vue 阿里云上传组件

##### [测试项目git地址](https://github.com/LazyNeo/vue-oss-uploader)
##### [本测试项目启动方法](https://github.com/LazyNeo/vue-oss-uploader/blob/master/startup.md)
##### [示例链接](https://lazyneo.github.io/oss/#/)
##### [组件配置项](https://github.com/LazyNeo/vue-oss-uploader/blob/master/config.md)

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
具体的配置项请查看[组件配置项](https://github.com/LazyNeo/vue-oss-uploader/blob/master/config.md)

### 配置项

名称|意义|类型|默认值
---|---|---|---
debug|是否开启debug模式|Boolean|false
path|保存的路径|String|空字符串
nameMode|文件名方式|Number|1（1随机名称，2默认名称，3自定义名称）
name|自定义名称内容，当nameMode为3时生效|String|空字符串
fileType|文件类型|String|默认img（会校验文件的后缀，校验正则为/\.(png|jpe?g|gif|svg)(\?.*)?$/），暂时不支持其他值
fileSuffix|文件后缀|String|空字符串（当本项不为空时表示只支持本后缀的文件上传）
keySet|阿里云配置项|Object|详见配置项解释


#### keySet配置项

名称|意义|类型|默认值
---|---|---|---
key|阿里云的accessKeyId|String|空字符串
secret|阿里云的accessKeySecret|String|空字符串
bucket|阿里云的bucket|String|空字符串
region|阿里云所在区域|String|shanghai

#### 事件

名称|说明|参数
---|---|---
error|错误事件|msg
success|上传成功,返回路径和拼接的url|{ossPath,ossUrl}



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

