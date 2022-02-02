<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章功能</el-breadcrumb-item>
            <el-breadcrumb-item>添加文章</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 添加文章步骤条 -->
        <el-card class="box-card">

            <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
                <el-step title="文章信息"></el-step>
                <el-step title="编辑文章"></el-step>
                <el-step title="总览"></el-step>
            </el-steps>

            <!--文章信息-->
            <div class="el-form-margin" v-if="active === 0">
                <el-form ref="articleForm" :model="article" label-width="80px" :rules="rules">
                    <el-form-item label="文章标题" prop="title">
                        <el-input v-model="article.title"></el-input>
                    </el-form-item>
                    <el-form-item label="选择分类">
                        <el-select v-model="article.categoryId" placeholder="请选择分类" prop="categoryId">
                            <el-option
                                    v-for="item in categories"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上传封面" v-if="!isUpdate">
                        <el-upload
                                list-type="picture"
                                action=""
                                :limit="1"
                                :auto-upload="false"
                                ref="upload"
                                :on-change="uploadChange"
                                :on-remove="uploadRemove"
                                accept="image/png, image/jpeg"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip">只能上传jpg/png文件</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="文章概述" prop="summary">
                        <el-input
                                v-model="article.summary"
                                type="textarea"
                                placeholder="请输入文章概述"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <!--编辑文章-->
            <div class="el-form-margin" v-if="active === 1">
                <mavon-editor
                        v-model="article.content"
                        style="height: 600px;"
                        :toolbars="toolbars"
                        @imgAdd="handleEditorImgAdd"
                        @imgDel="handleEditorImgDel"
                        fontSize="16px">
                </mavon-editor>

            </div>
            <!--总览-->
            <div class="el-form-margin" v-if="active === 2">
                <el-table :data="[article]" style="width: 100%" border>
                    <el-table-column prop="title" label="标题"></el-table-column>
                    <el-table-column prop="categoryId" label="分类"></el-table-column>
                    <el-table-column prop="summary" label="概述"></el-table-column>
                </el-table>
            </div>

            <div class="el-button-position">
                <el-button v-if="active === 1 || active === 2" style="margin-top: 12px;" type="primary" @click="prev">
                    上一步
                </el-button>
                <el-button v-if="active === 0 || active === 1" style="margin-top: 12px;" type="primary" @click="next">
                    下一步
                </el-button>
                <el-button v-if="active === 2 && !isUpdate" style="margin-top: 12px;" type="primary" @click="submit">
                    提交
                </el-button>
                <el-button v-if="active === 2 && isUpdate" style="margin-top: 12px;" type="primary"
                           @click="updateArticle">更新
                </el-button>

            </div>
        </el-card>

    </div>
</template>

<script>
    import mavonEditor from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import Vue from "vue";

    Vue.use(mavonEditor)

    export default {
        name: "AddArticle",
        data() {
            return {
                active: 0,
                categories: {},
                imgFile: [],
                form: {
                    name: '',
                    region: '',
                    desc: ''
                },
                isUpdate: false,
                tableData: [],
                article: {
                    id: '',
                    title: '',
                    summary: '',
                    file: {},
                    content: '',
                    categoryId: '',
                    category: ''
                },
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true // 预览
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {
                            min: 3,
                            max: 30,
                            message: '长度在 3 到 30 个字符',
                            trigger: 'blur'
                        }
                    ],
                    categoryId: [
                        {required: true, message: '请选择分类', trigger: 'change'}
                    ],
                    summary: [
                        {required: true, message: '请输入文章概述', trigger: 'blur'},
                        {min: 3, max: 70, message: '长度在 3 到 70 个字符', trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            // 上传相关
            uploadChange(file, fileList) {
                this.article.file = file.raw
            },
            uploadRemove() {
                this.article.file = {}
            },
            // 获取更新文章的信息
            async getUpdate() {
                const {data: res} = await this.$http.get(
                    'article/selectArticle/' + this.$route.query.id
                )
                if (res.code !== 200) {
                    return this.$message.error(res.msg)
                }
                this.article = res.data
            },
            // 获取分类
            async getCategory() {
                const {data: res} = await this.$http.get('article/selectCategories')
                if (res.code !== 200) {
                    return this.$message.error(res.msg)
                }
                this.categories = res.data
            },
            // 修改图片
            async handleEditorImgAdd(pos, $file) {
                // 校验图片
                // \d{0,}\.jpg|\d{0,}\.png
                const reg = new RegExp('^([0-9]+).(jpg|png)$')
                if (!reg.test($file.name)) {
                    return this.$message.error('请修改上传图片格式(数字.jpg/png 例：1.jpg)')
                }
                // 上传图片
                const formdata = new FormData()
                formdata.append('file', $file)
                // 添加请求头
                const instance = this.$http.create({
                    withCredentials: true,
                    headers: {
                        Authorization: JSON.parse(window.localStorage.getItem('token')) // 我上传的时候请求头需要带上token 验证，不需要的删除就好
                    }
                })
                const {data: res} = await instance.post('article/uploadImage', formdata)
                // 判断状态码
                if (res.code !== 200) {
                    return this.$message.error(res.msg)
                }
                // 获取数据
                const url = res.data.url // 图片链接
                const name = $file.name // 图片名
                const content = this.article.content // 文章内容
                this.imgFile[pos] = url // 图片
                console.log(content.indexOf(name) !== -1)
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
                if (content.indexOf(name) !== -1) {
                    console.log(pos)
                    const oStr = `(${pos})`
                    const nStr = `(${url})`
                    const index = content.indexOf(oStr)
                    const str = content.replace(oStr, '')
                    const insertStr = (soure, start, newStr) => {
                        return soure.slice(0, start) + newStr + soure.slice(start)
                    }
                    this.article.content = insertStr(str, index, nStr)
                }
            },
            // 删除图片
            async handleEditorImgDel(pos) {
                if (!pos[1]) return
                const instance = this.$http.create({
                    withCredentials: true,
                    headers: {
                        Authorization: JSON.parse(window.localStorage.getItem('token')) // 我上传的时候请求头需要带上token 验证，不需要的删除就好
                    }
                })
                const subOne = this.imgFile[pos[0]].substring(
                    0,
                    this.imgFile[pos[0]].length - 4
                )
                const subTwo = this.imgFile[pos[0]].substring(
                    this.imgFile[pos[0]].length - 3
                )
                console.log(subOne, subTwo)
                const k = {
                    url: encodeURIComponent(subOne),
                    suffix: subTwo
                }
                const {data: res} = await instance.post('article/deleteImage', k)
                if (res.code !== 200) {
                    return this.$message.error(res.msg)
                }
            },
            // 更新文章操作
            async updateArticle() {
                const {data: res} = await this.$http.put(
                    'article/updateSendArticle',
                    this.article
                )
                if (res.code !== 200) {
                    return this.$message.error(res.msg)
                }
                this.$message.success('更新成功')
                await this.$router.push({path: '/article'})
            },

            // 新增文章
            async submit() {
                const formData = new FormData()
                formData.append('title', this.article.title)
                formData.append('summary', this.article.summary)
                formData.append('content', this.article.content)
                formData.append('categoryId', this.article.categoryId)
                formData.append('file', this.article.file)
                const {data: res} = await this.$http.post(
                    'article/insertArticle',
                    formData
                )
                if (res.code !== 200) {
                    return this.$message.error(res.msg)
                }
                this.$message.success('添加成功')
                await this.$router.push({path: '/article'})
            },

            // 步骤条逻辑
            prev() {
                --this.active;
                if (this.active < 0) this.active = 0;
            },
            next() {
                // 判断markdown文本内容，注意执行顺序
                if (
                    this.article.content.length <= 50 &&
                    this.active === 1
                ) {
                    this.active = 1
                    this.$message.info('markdown至少50字符')
                    return false
                }else if (this.article.content.length > 50 &&
                    this.active === 1){
                    if (this.active++ > 2) this.active = 0;
                }
                //校验文章信息
                if (this.active === 0) {
                    this.$refs.articleForm.validate(async valid => {
                        if (!valid) {
                            this.$message.info('请填写对应信息或上传封面')
                            this.active = 0
                            return false
                        } else if (!this.isUpdate && this.article.file.__ob__) {
                            this.$message.info('请填写对应信息或上传封面')
                            this.active = 0
                            return false
                        }else {
                            if (this.active++ > 2) this.active = 0;
                        }

                    })
                }
                // 过滤器
                if (this.article.categoryId) {
                    this.article.category = this.categories.filter(item => {
                        return item.id === this.article.categoryId
                    })[0].name
                }

            },
        },

        created() {
            // 获取分类
            this.getCategory()
            // 判断是否为更新文章模式
            if (this.$route.query.id) {
                this.isUpdate = true
                this.getUpdate()
            } else {
                this.isUpdate = false
            }
        },

    }
</script>

<style scoped>
    .el-button-position {
        width: 100%;
        display: flex;
        justify-content: space-between !important;
    }

    .el-form-margin {
        margin-top: 20px;
    }
</style>