import displayImg from "./component/index";
import Vue from "vue";
import App from "./App.vue";
Vue.use(displayImg);

new Vue({
  el: "#app",
  components: {
    App,
  },
  template: "<App/>"
});
