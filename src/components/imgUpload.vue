<template lang="html">
  <div class="form-container">
    <el-form ref="form" label-width="160px">
      <el-alert
        v-if="errorShow"
        :title="errorMsg"
        type="error">
      </el-alert>
      <el-form-item label="阿里云bucket">
        <el-input v-model="keySet.bucket"></el-input>
      </el-form-item>
      <el-form-item label="阿里云key">
        <el-input v-model="keySet.key"></el-input>
      </el-form-item>
      <el-form-item label="阿里云secret">
        <el-input v-model="keySet.secret"></el-input>
      </el-form-item>
      <el-form-item label="所在区域">
        <el-select v-model="keySet.region" placeholder="请选择所在区域">
          <el-option label="上海数据中心" value="shanghai"></el-option>
          <el-option label="杭州数据中心" value="hangzhou"></el-option>
          <el-option label="青岛数据中心" value="qingdao"></el-option>
          <el-option label="北京数据中心" value="beijing"></el-option>
          <el-option label="香港数据中心" value="hongkong"></el-option>
          <el-option label="深圳数据中心" value="shenzhen"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="path"></el-input>
      </el-form-item>
      <el-form-item label="命名规则">
        <el-select v-model="nameMode" placeholder="请选择命名规则">
          <el-option label="随机名称" :value="1"></el-option>
          <el-option label="默认名称" :value="2"></el-option>
          <el-option label="自定义名称" :value="3"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item v-if="nameMode == 3" label="自定义名称">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="点击上传">
        <vueOssUploader :path="path" :debug="true" :name-mode="nameMode" :keySet="keySet" :name="name" v-on:success="uploaded" @error="showError"></vueOssUploader>
      </el-form-item>
      <el-form-item label="上传后文件路径">
        <p>{{ossPath}}</p>
      </el-form-item>
      <el-form-item label="上传后文件链接">
        <p>{{ossUrl}}</p>
      </el-form-item>
    </el-form>
    
    
  </div>
</template>

<script>
  export default {
    data () {
      return {
        path: 'test/',
        name: 'img1',
        nameMode: 1,
        errorShow: false,
        errorMsg: '',
        keySet: {
          bucket: '',
          key: '',
          region: 'shanghai',
          secret: ''
        },
        ossPath: '',
        ossUrl: ''
      }
    },
    methods: {
      uploaded ({ossPath, ossUrl}) {
        this.ossPath = ossPath
        this.ossUrl = ossUrl
      },
      showError (e) {
        this.errorShow = true
        console.log(e)
        this.errorMsg = e.msg || JSON.stringify(e)
      }
    }
  }
</script>

<style lang="less" scoped>
  .form-container{
    width: 60vw;
    margin-left: 20vw;
  }
</style>


