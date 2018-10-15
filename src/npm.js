import uploader from './components/uploader.vue'
const vueOssUploader = {
  install: function (Vue, config) {
    console.log('vueOssUploader, install', config)
    window._VueOssUploader = config
    Vue.component('vueOssUploader', uploader)
  }
};
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueOssUploader)
}
export default vueOssUploader