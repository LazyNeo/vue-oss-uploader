<template lang="html">
  <div class="vue-oss-upload-input" v-bind:style="initSize">
    <i>+</i>
    <input type="file" :id="id" @change="upload"/>
  </div>
</template>

<script>
  import md5 from 'blueimp-md5'
  export default {
    name: 'vueOssUploader',
    data () {
      return {
        id: 'upload-input-file',
        client: null,
        imgReg: /\.(png|jpe?g|gif|svg)(\?.*)?$/
      }
    },
    props: {
      debug: {
        type: Boolean,
        default: false
      },
      path: {
        type: String,
        default: 'o2o/'
      },
      nameMode: {
        type: Number,
        default: 1
      },
      name: {
        type: String,
        default: ''
      },
      fileType: {
        type: String,
        default: 'img'
      },
      fileSuffix: {
        type: String,
        default: ''
      },
      swidth: {
        type: Number,
        default: 70
      },
      sheight: {
        type: Number,
        default: 70
      },
      keySet: {
        type: Object,
        default () {
          return {
            key: '',
            region: '',
            secret: '',
            bucket: ''
          }
        }
      }
    },
    created () {
      this.id = 'upload-input-file' + Math.random()
      this.LoadJS('js_aliyun_oss', 'https://gosspublic.alicdn.com/aliyun-oss-sdk-4.10.0.min.js?time=' + Date.now())
    },
    mounted () {
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
    },
    methods: {
      init () {
        if (!this.keySet.bucket) {
          this.$emit('error', {msg: '请设置bucket'})
          return
        }
        if (!this.keySet.secret) {
          this.$emit('error', {msg: '请设置secret'})
          return
        }
        if (!this.keySet.key) {
          this.$emit('error', {msg: '请设置key'})
          return
        }
        if (!this.keySet.region) {
          this.$emit('error', {msg: '请设置区域'})
          return
        }
        this.client = new OSS.Wrapper({
          endpoint: 'https://oss-cn-' + this.keySet.region + '.aliyuncs.com',
          accessKeyId: this.keySet.key,
          accessKeySecret: this.keySet.secret,
          // https时需要设置为true
          // secure: true,
          bucket: this.keySet.bucket
        })
      },
      upload (e) {
        if (e.target.files.length === 0) {
          return
        }
        if (!this.client) {
          this.$emit('error', {msg: 'oss初始化未完成'})
          return
        }
        let file = e.target.files[0]
        let storeAs = ''
        if (!file) {
          alert('您未选择上传文件')
          return
        }
        // 清空input内容,以便重复触发change
        e.target.value = ''
        if (this.fileType === 'img' && !this.imgReg.test(file.name.toLowerCase())) {
          alert('此功能只支持图片类型上传')
          return
        }
        if (this.fileSuffix !== '' && ('.' + this.fileSuffix) !== this.get_suffix(file.name)) {
          alert('必须选择类型为的' + this.fileSuffix + '文件')
          return
        }
        if (this.nameMode === 2) {
          storeAs = this.path + file.name
        } else if (this.nameMode === 3 && this.name.trim()) {
          storeAs = this.path + this.name + this.get_suffix(file.name)
        } else {
          let token = file.name + file.lastModifiedDate + file.size + file.type
          storeAs = this.path + md5(token) + this.get_suffix(file.name)
        }
        this.debug && console.log(file.name + ' => ' + storeAs)
        this.client.multipartUpload(storeAs, file).then((result) => {
          this.debug && console.log(result)
          this.$emit('success', storeAs)
        }).catch((err) => {
          this.debug && console.log(err)
          this.$emit('error', err)
        })
      },
      LoadJS (sId, fileUrl, callback) {
        let dom = document.querySelector(sId)
        if (!dom) {
          var script = document.createElement('script')
          script.src = fileUrl
          if (callback) {
            script.onload = callback
          }
          script.id = sId
          document.body.appendChild(script)
        }
      },
      get_suffix (filename) {
        var pos = filename.lastIndexOf('.')
        var suffix = ''
        if (pos !== -1) {
          suffix = filename.substring(pos)
        }
        return suffix
      }
    },
    computed: {
      initSize () {
        let style = {
          width: this.swidth + 'px',
          height: this.sheight + 'px',
          lineHeight: this.sheight - 4 + 'px'
        }
        return style
      }
    },
    watch: {
      keySet: {
        handler (val, old) {
          this.init()
        },
        deep: true
      }
    }
  }
</script>

<style lang="less">
  .vue-oss-upload-input {
    position: relative;
    display: inline-block;
    text-align: center;
    width: 70px;
    height: 70px;
    border-radius: 5px;
    border: 2px dashed #aaaaaa;
    line-height: 66px;
    i{
      font-style: normal;
      font-size: 36px;
      color: #aaaaaa;
      display: block;
    }
    input {
      width: 100%;
      height: 100%;
      /* margin-top: -66px; */
      opacity: 0;
      position: absolute;
      padding: 0;
      top: 0;
      left: 0;
    }
  }
</style>
