<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章功能</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 主体部分 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button style="float: left" type="primary" size="medium" @click="insertArticle">添加文章</el-button>
            </div>
            <div class="text item">
                <template>
                    <el-table :data="articles" border style="width: 100%">
                        <el-table-column
                                label="文章id"
                                prop="id"
                                min-width="70"
                                show-overflow-tooltip
                                header-align="center"
                                align="center"></el-table-column>
                        <el-table-column
                                header-align="center"
                                label="作者"
                                prop="authName"
                                min-width="70"
                                align="center"></el-table-column>
                        <el-table-column
                                header-align="center"
                                label="标题"
                                prop="title"
                                min-width="100"
                                align="center"></el-table-column>
                        <el-table-column
                                header-align="center"
                                label="分类"
                                prop="categoryName"
                                min-width="100"
                                align="center"></el-table-column>
                        <el-table-column
                                header-align="center"
                                label="概述"
                                prop="summary"
                                min-width="150"
                                align="center"></el-table-column>
                        <el-table-column
                                header-align="center"
                                label="封面"
                                min-width="150"
                                prop="imageUrl"
                                align="center">
                            <template scope="scope">
                                <el-image
                                        style="width: 100px;"
                                        :src="scope.row.banner"
                                        :preview-src-list="[scope.row.banner]">
                                </el-image>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="状态"
                                prop="state"
                                min-width="100"
                                align="center">
                            <template slot-scope="scope">
                                <el-switch
                                        v-model="scope.row.state"
                                        active-color="#13ce66"
                                        @change="articleStateChange(scope.row)"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="置顶"
                                prop="top"
                                min-width="100"
                                align="center">
                            <template slot-scope="scope">
                                <el-switch
                                        v-model="scope.row.top"
                                        active-color="#13ce66"
                                        @change="articleTopChange(scope.row)"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="火热"
                                prop="hot"
                                show-overflow-tooltip
                                header-align="center"
                                min-width="100"
                                align="center">
                            <template slot-scope="scope">
                                <el-switch
                                        v-model="scope.row.hot"
                                        active-color="#13ce66"
                                        @change="articleHotChange(scope.row)"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="创建日期"
                                prop="createTime"
                                header-align="center"
                                align="center"
                                min-width="145">
                            <template v-slot="scope">
                                {{ scope.row.pubTime | dateFormat }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="最后更新日期"
                                prop="modifyTime"
                                header-align="center"
                                align="center"
                                width="145">
                            <template v-slot="scope">
                                {{ scope.row.updateTime | dateFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="操作"
                                min-width="180px"
                                header-align="center"
                                align="center">
                            <template slot-scope="scope">
                                <el-tooltip
                                        class="item"
                                        effect="dark"
                                        content="更新封面"
                                        placement="top-start"
                                        :enterable="false">
                                    <el-button
                                            size="mini"
                                            type="warning"
                                            icon="el-icon-picture-outline"
                                            @click="showEditDialog(scope.row.id)"></el-button>
                                </el-tooltip>
                                <el-tooltip
                                        class="item"
                                        effect="dark"
                                        content="修改"
                                        placement="top-start"
                                        :enterable="false">
                                    <el-button
                                            size="mini"
                                            type="primary"
                                            icon="el-icon-edit"
                                            @click="editArticle(scope.row.id)"></el-button>
                                </el-tooltip>
                                <el-tooltip
                                        class="item"
                                        effect="dark"
                                        content="删除"
                                        placement="top-start"
                                        :enterable="false">
                                    <el-button
                                            size="mini"
                                            type="danger"
                                            icon="el-icon-delete"
                                            @click="deleteArticle(scope.row.id)"></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <!--分页模块-->
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="queryInfo.pageNum"
                        :page-sizes="[1, 2, 5, 10]"
                        :page-size="queryInfo.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-card>

        <!-- 修改封面模态框 -->
        <el-dialog
                title="修改封面"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="resEditDialogVisible"
        >
            <el-upload
                    class="upload-demo"
                    list-type="picture"
                    action=""
                    :limit="1"
                    :show-file-list="true"
                    :auto-upload="false"
                    ref="upload"
                    :on-change="uploadChange"
                    :on-remove="uploadRemove"
                    accept="image/png, image/jpeg"
            >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip">只能上传jpg/png文件</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editImage">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'Article',
        data() {
            return {
                articles: [],
                queryInfo: {
                    pageSize: 5,
                    pageNum: 1
                },
                imgArticle: {
                    id: '',
                    file: {}
                },
                total: 0,
                editDialogVisible: false,
            }
        },
        methods: {
            // 分页查询
            handleSizeChange(newSize) {
                this.queryInfo.pageSize = newSize
                this.getData()
            },
            handleCurrentChange(newPage) {
                this.queryInfo.pageNum = newPage
                this.getData()
            },
            // 文章置顶修改
            async articleTopChange(row) {
                const {data: res} = await this.$http.put('/article/updateArticle', {
                    id: row.id,
                    top: row.top
                })
                if (res.code !== 200) {
                    row.status = !row.status
                    return this.$message.error(res.msg)
                }
                this.$message.success('更新成功')
            },
            // 文章热度修改
            async articleHotChange(row) {
                const {data: res} = await this.$http.put('/article/updateArticle', {
                    id: row.id,
                    hot: row.hot
                })
                if (res.code !== 200) {
                    row.status = !row.status
                    return this.$message.error(res.msg)
                }
                this.$message.success('更新成功')
            },

            // 更新图片对话框
            async showEditDialog(id) {
                this.imgArticle.id = id
                this.editDialogVisible = true
            },
            // 移除上传照片时清空图片
            uploadRemove() {
                this.imgArticle.file = {}
            },
            // 关闭更新图片弹窗操作
            resEditDialogVisible() {
                location.reload()
                this.imgArticle = {}
                this.editDialogVisible = false
                console.log(this.imgArticle)
            },
            // 修改提交的图片时的操作
            uploadChange(file, fileList) {
                this.imgArticle.file = file.raw
            },
            // 更新图片
            async editImage() {
                if (!this.imgArticle.file.__ob__) {
                    const config = {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }
                    const formData = new window.FormData()
                    formData.append('file', this.imgArticle.file)
                    const {data: res} = await this.$http.post(
                        '/article/updateImageArticle/' + this.imgArticle.id,
                        formData,
                        config
                    )
                    if (res.code !== 200) {
                        return this.$message.error(res.msg)
                    }
                    this.$message.success('更新成功')
                    this.editDialogVisible = false
                    await this.getData()
                } else {
                    this.$message.info('请上传图片')
                }
            },

            // 删除文章
            async deleteArticle(id){
                const { data: res } = await this.$http.delete(
                    '/article/deleteArticle/' + id
                )
                if (res.code !== 200) {
                    return this.$message.error(res.msg)
                }
                this.$message.success('删除成功')
                await this.getData()
            },

            // 添加新文章
            async insertArticle(){
                window.localStorage.setItem('active', JSON.stringify('/sendArticle'))
                await this.$router.push('/addArticle')
            },
            // 编辑文章，传参id
            editArticle (id) {
                this.$router.push({
                    path: '/addArticle',
                    query: {
                        id: id
                    }
                })
            },

            // 获取文章信息
            async getData() {
                const {data: res} = await this.$http.get('/article/selectArticles', {
                    params: this.queryInfo
                })
                if (res.code !== 200) {
                    return this.$message.error(res.msg)
                }
                this.articles = res.data.list
                this.total = res.data.total
                if (res.code !== 200) {
                    return this.$message.error(res.msg)
                }
            },

        },
        created() {
            // 获取文章信息
            this.getData();
        },

    }
</script>

<style>
    .box-card {
        margin-top: 25px;
        width: 100%;
    }

    .clearfix {
        height: 30px;
    }

    .block {
        margin-top: 15px;
    }
</style>