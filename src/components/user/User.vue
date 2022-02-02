<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础功能</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!--主体部分-->
        <el-card style="margin-top: 15px">
            <el-row :gutter="5">
                <el-col :span="3">
                    <!-- 搜索 -->
                    <el-input
                            placeholder="请输入id"
                            v-model="queryInfo.id"
                            clearable

                    >
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <!-- 搜索 -->
                    <el-input
                            placeholder="请输入真实姓名"
                            v-model="queryInfo.personName"
                            clearable

                    >
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <el-input
                            placeholder="请输入用户名"
                            v-model="queryInfo.username"
                            clearable

                    >
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <el-input
                            placeholder="请输入电话"
                            v-model="queryInfo.mobile"
                            clearable

                    >
                    </el-input>
                </el-col>

                <el-col :span="1">
                    <el-button
                            icon="el-icon-search"
                            circle
                            @click="getUserList"
                    ></el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary"
                    >添加用户
                    </el-button
                    >
                </el-col>
                <el-col :span="2">
                    <a id="linkUrl"  title="下载">
                        <el-button type="primary">导出表格</el-button>
                    </a>
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table :data="userList" border stripe style="margin-top: 15px">
                <el-table-column
                        label="#"
                        prop="id"
                        min-width="70"
                        show-overflow-tooltip
                        header-align="center"
                        align="center"
                ></el-table-column>
                <el-table-column
                        header-align="center"
                        label="用户名"
                        prop="username"
                        min-width="70"
                        align="center"
                ></el-table-column>
                <el-table-column
                        header-align="center"
                        label="真实姓名"
                        prop="personName"
                        min-width="70"
                        align="center"
                ></el-table-column>
                <el-table-column
                        header-align="center"
                        label="邮箱"
                        prop="email"
                        min-width="150"
                        align="center"
                ></el-table-column>
                <el-table-column
                        header-align="center"
                        label="电话"
                        prop="mobile"
                        min-width="100"
                        align="center"
                ></el-table-column>
                <el-table-column
                        label="角色"
                        prop="roleList"
                        show-overflow-tooltip
                        header-align="center"
                        min-width="250"
                        align="center"
                        :filters="roles"
                        :filter-method="filterTag"
                >
                    <template slot-scope="scope">
                        <el-tag
                                type="primary"
                                v-for="item in scope.row.roleList"
                                :key="item.id"
                                size="mini"
                        >{{ item }}
                        </el-tag
                        >
                    </template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        prop="status"
                        header-align="center"
                        align="center"
                        width="80"
                >
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.status"
                                inactive-color="#ff4949"
                                active-color="#13ce66"

                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        label="创建日期"
                        prop="createTime"
                        header-align="center"
                        align="center"
                        min-width="145"
                >
                    <template v-slot="scope">
                        {{ scope.row.createTime | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                        label="最后登录日期"
                        prop="lastLoginTime"
                        header-align="center"
                        align="center"
                        width="145"
                >
                    <template v-slot="scope">
                        {{ scope.row.lastLoginTime | dateFormat }}
                    </template>
                </el-table-column>

                <el-table-column
                        label="操作"
                        min-width="180px"
                        header-align="center"
                        align="center"
                >
                    <template slot-scope="scope">
                        <el-tooltip
                                class="item"
                                effect="dark"
                                content="修改"
                                placement="top-start"
                                :enterable="false"
                        >
                            <el-button
                                    type="primary"
                                    icon="el-icon-edit"
                                    size="mini"

                            ></el-button>
                        </el-tooltip>
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"

                        ></el-button>
                        <el-tooltip
                                class="item"
                                effect="dark"
                                content="分配角色"
                                placement="top-start"
                                :enterable="false"
                        >
                            <el-button
                                    type="warning"
                                    icon="el-icon-setting"
                                    size="mini"

                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区 -->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pageNum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="queryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    style="margin-top: 15px"
            ></el-pagination>
        </el-card>

    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        name: "User",
        data() {
            var checkEmail = (rule, value, cb) => {
                const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
                if (regEmail.test(value)) {
                    return cb()
                }
                cb(new Error('请输入合法邮箱'))
            }
            var checkMobile = (rule, value, cb) => {
                const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/
                if (regMobile.test(value)) {
                    return cb()
                }
                cb(new Error('请输入正确手机号'))
            }
            return {
                queryInfo: {
                    pageNum: 1,
                    pageSize: 5,
                    selectedRoleId: []
                },
                status: true,
                selectedRoleId: [],
                roleList: [],
                userInfo: {},
                userList: [],
                total: 0,
                addDialogVisible: false,
                addForm: {
                    personName: '',
                    email: '',
                    mobile: '',
                    roleList: ''
                },
                roles: [],
                setRoleDialogVisible: false,
                addFormRules: {
                    personName: [
                        {required: true, message: '请输入真实姓名', trigger: 'blur'},
                        {min: 3, max: 10, message: '真实姓名在3-10之间', trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '用户名在3-10之间', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 16, message: '密码在6-16之间', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: checkEmail, trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'}
                    ]
                },
                editDialogVisible: false,
                editForm: {}
            }
        },
        created() {
            // 初始化获取全局权限列表
            this.selectRoleList()
            // 获取用户信息
            this.getUserList()
        },
        methods: {
            ...mapActions(['selectRoleList']),
            ...mapState(["RoleList"]),

            filterTag (value, row) {
                return row.roleList.indexOf(value) !== -1
            },

            async getUserList() {
                const {data: res} = await this.$http.get('/user/findUserList', {
                    params: this.queryInfo
                })
                if (res.code !== 200) {
                    return this.$message.error('获取失败')
                }
                this.userList = res.data.list
                this.total = res.data.total
                this.roleList = this.$store.getters.showRoleList
                this.roles = []
                this.roleList.forEach(item => {
                    this.t = {text: item.roleName, value: item.roleName}
                    this.roles.push(this.t)
                })
            },
            handleSizeChange(newSize) {
                this.queryInfo.pageSize = newSize
                this.getUserList()
            },
            handleCurrentChange(newPage) {
                this.queryInfo.pageNum = newPage
                this.getUserList()
                console.log(newPage)
            },
        },
    }
</script>

<style scoped>

</style>