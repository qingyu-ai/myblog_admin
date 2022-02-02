// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router"
//引入组件
import Login from "../pages/Login.vue"
import Home from "../pages/Home.vue"
import Dashboard from "../components/dashboard/Dashboard.vue"
import Article from "../components/article/Article.vue"
import AddArticle from "../components/article/AddArticle";
import Comment from "../components/comment/Comment";
import Category from "../components/category/Category";
import User from "../components/user/User";
import Role from "../components/role/Role";
import Permission from "../components/permission/Permission";

//创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {path: "/", redirect: "/login"},
        {path: "/login", component: Login},
        {
            path: "/home",
            component: Home,
            redirect: "/dashboard",
            children: [
                {path: "/dashboard", component: Dashboard},
                {path: "/article", component: Article},
                {path: '/addArticle', component: AddArticle},
                {path: '/comment', component: Comment},
                {path: '/category', component: Category},
                {path: '/user', component: User},
                {path: '/role', component: Role},
                {path: '/permission', component: Permission},
            ],
        },
    ],
})
