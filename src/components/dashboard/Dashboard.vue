<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>仪表盘</el-breadcrumb-item>
            <el-breadcrumb-item>Dashboard</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 主体部分 -->
        <el-card class="box-card">
            <div class="block">
                <el-timeline>
                    <el-timeline-item :timestamp="new Date() | dateFormat" placement="top">
                        <el-card>
                            <div class="icon-front"><i class="el-icon-edit-outline"></i><h4>文章总数</h4></div>
                            <p>共发表了 {{ article }} 篇文章</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item :timestamp="new Date() | dateFormat" placement="top">
                        <el-card>
                            <div class="icon-front"><i class="el-icon-user"/><h4>用户总数</h4></div>
                            <p>共创建了 {{ user }} 个用户</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item :timestamp="new Date() | dateFormat" placement="top">
                        <el-card>
                            <div class="icon-front"><i class="el-icon-chat-dot-square"/><h4>评论总数</h4></div>
                            <p>共收到了 0 条评论</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item :timestamp="new Date() | dateFormat" placement="top">
                        <el-card>
                            <div class="icon-front"><i class="el-icon-collection"/><h4>分类总数</h4></div>
                            <p>共创建了 {{ category }} 个分类</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'Dashboard',
        data() {
            return {
                user: 0,
                article: 0,
                comment: 0,
                category: 0
            }
        },
        async created() {
            const {data: user} = await this.$http.get('commonAdmin/userCount')
            this.user = user.data
            const {data: article} = await this.$http.get('commonAdmin/articleCount')
            this.article = article.data
            const {data: category} = await this.$http.get('commonAdmin/categoryCount')
            this.category = category.data
           /* const {data: comment} = await this.$http.get('commonAdmin/commentCount')
            this.comment = comment.data*/
        }

    }
</script>

<style scoped>
    .box-card {
        margin-top: 25px;
        width: 100%;
    }

    .block {
        width: 80%;
    }

    .icon-front {
        display: flex;
        width: 100%;
    }

    .icon-front i {
        margin-top: 22px;
    }

    .icon-front h4 {
        flex: 1;
        margin-left: 8px;
    }
</style>