<template>
  <div class="home-container">
    <el-container>
      <el-header class="home-header">
        <div class="home-header-title">博客系统</div>

        <el-dropdown>
          <span class="el-dropdown-link">
            <div>管理员</div>
            <i><img src="../assets/avatar.jpg"/></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="230px">
          <el-menu
            unique-opened

            text-color="black"
            active-text-color="#4facfe"
            :router="true"
            :default-active="activePath"
          >

           <!-- 仪表盘一级菜单 -->
            <el-submenu index="1">
              <template slot="title"
                ><i class="el-icon-user"></i>仪表盘</template
              >
              <!-- 二级菜单 -->
                <el-menu-item index="/dashboard">Dashboard</el-menu-item>
            </el-submenu>

             <!-- 文章功能一级菜单 -->
            <el-submenu index="2">
              <template slot="title"
                ><i class="el-icon-menu"></i>文章功能</template
              >
               <!-- 二级菜单 -->
              <el-menu-item-group>
                <el-menu-item index="/article">文章管理</el-menu-item>
                <el-menu-item index="/addArticle">添加文章</el-menu-item>
                <el-menu-item index="/comment">评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <!-- 基础功能一级菜单 -->
            <el-submenu index="3">
              <template slot="title"
              ><i class="el-icon-box"></i>基础功能</template
              >
              <!-- 二级菜单 -->
              <el-menu-item-group>
                <el-menu-item index="/category">分类管理</el-menu-item>
                <el-menu-item index="/online">线上管理</el-menu-item>
                <el-menu-item index="/permission">权限管理</el-menu-item>
                <el-menu-item index="/role">角色管理</el-menu-item>
                <el-menu-item index="/user">用户管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      // 激活地址
      activePath: ''
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
}

.el-container {
  height: 100%;
}

.home-header {
  background: #4facfe 0%;
  background:-webkit-linear-gradient(left,#4facfe 0%, #00f2fe 100%);
  background:-o-linear-gradient(right,#4facfe 0%, #00f2fe 100%);
  background:-moz-linear-gradient(right,#4facfe 0%, #00f2fe 100%);
  background:linear-gradient(to right,#4facfe 0%, #00f2fe 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-menu-item {
  /*background-color: #409EFF !important;*/
}

.el-menu-item-group {
  /*background-color: #409EFF !important;*/
}

.el-menu {
  height: 100%;
  overflow-x: hidden;
}

.el-icon-menu {
  color: #4facfe;
}

.el-icon-user {
  color: #4facfe;
}

.el-icon-box{
  color: #4facfe;
}

.home-header-title {
  color: white;
  font-family: "楷体";
  font-size: 25px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-dropdown-link img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 15px;
}

.el-dropdown-link div {
  margin: 0 10px;
  margin-top: 15px;
  font-size: 13px;
  font-family: "宋体";
}

.el-main {
  height: 100%;
  background: #eeeeee;
}
</style>