import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import VueStarRating from "vue-star-rating";
import VueAwesomePaginate from "vue-awesome-paginate";
import "@/css/main.css";

import "vue3-toastify/dist/index.css";
import "vue-awesome-paginate/dist/style.css";

const app = createApp(App);
const pinia = createPinia();
library.add(fas);
app.component("star-rating", VueStarRating);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("vue-awesome-paginate", VueAwesomePaginate);

app.use(pinia);
app.use(router);
app.mount("#app");

const defaultDocumentTitle = "Admin";

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});
