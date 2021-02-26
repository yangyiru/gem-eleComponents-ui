import 'element-ui/lib/theme-chalk/index.css'; //引入el的样式
import Button from './Button/index';
import GemModal from './GemModal/index';
const components = [Button, GemModal]; // 存储组件列表

const install = function (Vue) {
    // 判断是否安装过
    if (install.installed) return
    // 全局注册组件
    components.forEach(component => {
        console.log(component, 'component-----')
        Vue.component(component.name, component)
    })
}

// 判断是否直接引入
if (typeof window !== undefined && window.Vue) {
    install(window.Vue)
}

export default {
    install
}