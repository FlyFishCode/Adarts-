import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        menuList: [{
            id: "1",
            label: "League",
            url: "competition",
            parentId: ""
        }]
    },
    mutations: {
        changeMenuList(state, newList) {
            state.menuList = newList;
        }
    }
});
export default store;