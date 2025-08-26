import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";
import BaseView from "../views/BaseView.vue";
import CadastroView from "../views/CadastroView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import VotarView from "../views/VotarView.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: NotFoundView,
    },
    {
        path: "/",
        name: "base",
        component: BaseView,
    },
    {
        path: "/cadastro",
        name: "cadastro",
        component: CadastroView,
    },
    {
        path: "/votar",
        name: "votar",
        component: VotarView,
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
