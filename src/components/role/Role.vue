<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础功能</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!--主体部分-->
        <el-card style="margin-top: 15px">
            <el-row :gutter="10">
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true"
                    >添加角色
                    </el-button
                    >
                </el-col>
            </el-row>
            <el-table :data="rolePermissionList" border stripe style="margin-top: 15px">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <div
                                v-for="item in scope.row.permissionList"
                                :key="item.id"
                                class="permission"
                        >
                            <el-tag type="warning">{{ item.id }}</el-tag>
                            <el-tag>{{ item.permissionName }}</el-tag>
                            <el-tag type="success">{{ item.permissionPath }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="#"
                        prop="id"
                        min-width="70"
                        show-overflow-tooltip
                        header-align="center"
                        align="center"
                ></el-table-column>
                <el-table-column
                        label="角色名"
                        prop="name"
                        min-width="70"
                        show-overflow-tooltip
                        header-align="center"
                        align="center"
                ></el-table-column>
                <el-table-column
                        label="角色标记"
                        prop="keyword"
                        min-width="75"
                        show-overflow-tooltip
                        header-align="center"
                        align="center"
                ></el-table-column>
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
                                @change="roleStateChange(scope.row)"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        label="创建人"
                        prop="creator"
                        min-width="70"
                        show-overflow-tooltip
                        header-align="center"
                        align="center"
                ></el-table-column>
                <el-table-column
                        label="修改人"
                        prop="modifier"
                        min-width="70"
                        show-overflow-tooltip
                        header-align="center"
                        align="center"
                ></el-table-column>
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
                        label="修改时间"
                        prop="modifyTime"
                        header-align="center"
                        align="center"
                        width="145"
                >
                    <template v-slot="scope">
                        {{ scope.row.updateTime | dateFormat }}
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
                                    @click="showEditDialog(scope.row)"
                            ></el-button>
                        </el-tooltip>
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeRoleById(scope.row.id)"
                        ></el-button>
                        <el-tooltip
                                class="item"
                                effect="dark"
                                content="分配权限"
                                placement="top-start"
                                :enterable="false"
                        >
                            <el-button
                                    type="warning"
                                    icon="el-icon-setting"
                                    size="mini"
                                    @click="setPermission(scope.row)"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区 -->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="selectQuery.pageNum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="selectQuery.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    style="margin-top: 15px"
            ></el-pagination>
        </el-card>
        <!-- 添加角色模态框 -->
        <el-dialog
                title="添加角色"
                :visible.sync="addDialogVisible"
                width="50%"
                @close="resAddForm()"
        >
            <!-- 内容主题区域 -->
            <el-form
                    :model="addForm"
                    :rules="addFormRules"
                    ref="addFormRef"
                    label-width="90px"
            >
                <el-form-item label="角色名" prop="name">
                    <el-input
                            v-model="addForm.name"
                            placeholder="如(普通用户)"
                    ></el-input>
                </el-form-item>
                <el-form-item label="角色标记" prop="keyword">
                    <el-input
                            v-model="addForm.keyword"
                            placeholder="如(ROLE_USER)"
                    ></el-input>
                </el-form-item>
                <el-form-item label="权限分配">
                    <el-transfer
                            :titles="['权限列表', '选中权限']"
                            v-model="addForm.permissionIdList"
                            :data="permissionData"
                    ></el-transfer>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
        </el-dialog>
        <!-- 修改角色模态框 -->
        <el-dialog title="修改角色" :visible.sync="editDialogVisible" width="50%">
            <!-- 内容主题区域 -->
            <el-form
                    :model="editForm"
                    :rules="addFormRules"
                    ref="editFormRef"
                    label-width="90px"
            >
                <el-form-item label="角色名" prop="name">
                    <el-input
                            v-model="editForm.name"
                            placeholder="如(普通用户)"
                    ></el-input>
                </el-form-item>
                <el-form-item label="角色标记" prop="keyword">
                    <el-input
                            v-model="editForm.keyword"
                            placeholder="如(ROLE_USER)"
                    ></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
        </el-dialog>
        <!-- 分配权限模态框 -->
        <el-dialog
                title="分配权限"
                :visible.sync="permissionDialogVisible"
                width="50%"
        >
            <!-- 内容主题区域 -->
            <el-form
                    :model="permissionForm"
                    :rules="addFormRules"
                    ref="permissionFormRef"
                    label-width="90px"
            >
                <el-form-item label="权限分配">
                    <el-transfer
                            :titles="['权限列表', '选中权限']"
                            v-model="permissionForm.permissionIdList"
                            :data="permissionData"
                    ></el-transfer>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
        <el-button @click="permissionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRolePermission">确 定</el-button>
      </span>
        </el-dialog>


    </div>
</template>

<script>
    export default {
        name: "Role",
        data() {
            return {
                addDialogVisible: false,
                editDialogVisible: false,
                permissionDialogVisible: false,
                selectQuery: {
                    pageSize: 5,
                    pageNum: 1
                },
                permissionData: [],
                addForm: {},
                editForm: {},
                permissionForm: {
                    permissionIdList: []
                },
                addFormRules: {
                    name: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'},
                        {min: 2, max: 10, message: '角色名称在2-10之间', trigger: 'blur'}
                    ],
                    keyword: [
                        {required: true, message: '请输入角色标记', trigger: 'blur'},
                        {min: 5, max: 30, message: '角色标记在5-30之间', trigger: 'blur'}
                    ]
                },
                rolePermissionList: [],
                total: 0
            }
        },

        methods: {
            // 获取角色信息
            async getData () {
                const { data: res } = await this.$http.get('/role/selectRolePermission', {
                    params: this.selectQuery
                })
                if (res.code !== 200) {
                    return this.$message.error(res.msg)
                }
                this.rolePermissionList = res.data.list
                this.total = res.data.total
                if (res.code !== 200) {
                    return this.$message.error(res.msg)
                }
            },
            // 查询权限列表
            async getPermissionData () {
                const { data: res } = await this.$http.get('/role/selectPermission')
                if (res.code !== 200) {
                    return this.$message.error(res.msg)
                }
                res.data.permissionList.list.forEach(item => {
                    this.permissionData.push({ key: item.id, label: item.name })
                })
            },
            // 分页
            handleSizeChange(newSize) {
                this.selectQuery.pageSize = newSize
                this.getData()
            },
            handleCurrentChange(newPage) {
                this.selectQuery.pageNum = newPage
                this.getData()
            },
        },

        created() {
            this.getData()
            this.getPermissionData()
        },
    }
</script>

<style scoped>

</style>