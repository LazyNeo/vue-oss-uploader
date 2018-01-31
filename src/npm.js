import uploader from './components/uploader.vue'
console.log(uploader)
const vueOssUploader = {
  install: function (Vue) {
    Vue.component('vueOssUploader',uploader)
  }
};
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueOssUploader)
}
export default vueOssUploader