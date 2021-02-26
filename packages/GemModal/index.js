import GemModal from './src/index.vue';

GemModal.install = function (Vue) {
    Vue.component(GemModal.name, GemModal)
}

export default GemModal