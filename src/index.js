// 导入组件
import App from './App.vue'; 

let plugin = {};
plugin.install = function( Vue ){
    Vue.component(App.name, App); // 注册组件
}

// 当使用Vue.use(plugin)安装插件时，
// 实际上就是在调用这里暴露出的对象的
// install方法，因此务必确保这里带有install方法
export default plugin;
