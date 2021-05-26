/*
 * @Author: your name
 * @Date: 2020-06-09 14:30:48
 * @LastEditTime: 2020-08-08 18:08:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_adarts_league\src\main.js
 */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable arrow-parens */
/* eslint-disable quotes */
import Vue from "vue";
import ElementUI from "element-ui"; // element-ui的全部组件
import Axiso from "axios";
import qs from "qs";
import NProgress from "nprogress"; // 引入nprogress插件(进度条)
import "nprogress/nprogress.css"; // 这个nprogress样式必须引入
// eslint-disable-next-line import/extensions
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import i18n from "./i18n/i18n";
import "./assets/fonts/iconfont.css";
import { getQuery } from "@/components/common/Utils";

Vue.use(ElementUI);
const http = Axiso.create({
    baseURL: "/aps/", // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 20000 // request timeout
});
Vue.prototype.$axios = http;

http.interceptors.request.use(
    config => {
        NProgress.start();
        const token = localStorage.getItem("LeagueToken");
        if (!config.headers.token) {
            // eslint-disable-next-line no-param-reassign
            config.headers.token = token;
        }
        // else {
        //     console.log("未登录");
        //     window.location.href = window.location.href.split("#")[0];
        // }
        return config;
    },
    err => Promise.reject(err)
);

http.interceptors.response.use(
    response => {
        if (response.data.errorCode === "100406") {
            const that = new Vue();
            that.$message(response.data.msg);
            window.location.href = window.location.href.split("#")[0];
        }
        NProgress.done();
        return response;
    },
    error => Promise.reject(error)
);

Vue.prototype.bus = new Vue();
Vue.config.productionTip = false;

Vue.prototype.$qs = qs;

// router.beforeEach((to, from, next) => {
//     const identity = localStorage.getItem('identity');
//     if (identity === 9527) {
//         let flag = false;
//         // 代理商无法访问的页面
//         const list = ['operator'];
//         flag = list.find(i => i === to.name);
//         if (flag) {
//             return;
//         }
//     }
//     console.log(to, from);
//     next();
// });
router.afterEach(to => {
    const data = to.query.data || getQuery(to.name);
    if (data) {
        // eslint-disable-next-line no-param-reassign
        to.query.data = data;
    }
    NProgress.done();
});
// 时间过滤器
Vue.filter("showDate", value => {
    if (!value) return "";
    return value.split("T")[0];
});

// eslint-disable-next-line func-names
window.onunload = function() {
    // localStorage.removeItem("LeagueToken");
    // localStorage.removeItem("LeagueUserId");
    // localStorage.removeItem("LeagueUserType");
};
new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount("#app");