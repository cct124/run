import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Print from "@/scripts/utils/print";
import "normalize.css";
import "@/styles/index.scss";

const print = new Print();

window.log = print.log;

createApp(App).use(store).use(router).mount("#app");
