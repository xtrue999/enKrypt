import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import * as filters from "./utils/filters";
import Vue3Lottie from "vue3-lottie";
import "@/libs/utils/selective-wasm";
import { createPinia } from "pinia";

const app = createApp(App);

const pinia = createPinia();
app.use(router).use(pinia).use(Vue3Lottie, { name: "vue3lottie" });

app.config.globalProperties.$filters = filters;

app.mount("#app");
