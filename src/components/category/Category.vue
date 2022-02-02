<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础功能</el-breadcrumb-item>
            <el-breadcrumb-item>分类管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!--主体部分-->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-input v-model="input" placeholder="请输入分类名" style="width: 300px"></el-input>
                <el-input-number v-model="num" @change="handleChange" :min="1" :max="10"
                                 style="margin-left: 15px;"></el-input-number>
                <el-button type="primary" class="button-add">添加分类</el-button>
            </div>

            <el-table :data="categories" border stripe>
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
                        label="分类名"
                        prop="title"
                        min-width="70"
                        align="center"
                ></el-table-column>
                <el-table-column
                        header-align="center"
                        label="排序"
                        prop="sort"
                        min-width="55"
                        align="center"
                ></el-table-column>
                <el-table-column
                        label="创建日期"
                        prop="createTime"
                        header-align="center"
                        align="center"
                >
                    <template v-slot="scope">
                        {{ scope.row.createTime | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                        label="更新时间"
                        prop="modifyTime"
                        header-align="center"
                        align="center"
                >
                    <template v-slot="scope">
                        {{ scope.row.updateTime | dateFormat }}
                    </template>
                </el-table-column>

                <el-table-column label="操作" header-align="center" align="center">
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
                                    @click="showEditDialog(scope.row.id)"
                            ></el-button>
                        </el-tooltip>
                        <el-tooltip
                                class="item"
                                effect="dark"
                                content="删除"
                                placement="top-start"
                                :enterable="false"
                        >
                            <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="deleteCategory(scope.row.id)"
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
                    style="margin-top: 10px"
            ></el-pagination>
        </el-card>
        <!-- 修改分类模态框 -->
        <el-dialog
                title="修改分类"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="resEditDialogVisible"
        >
            <el-form :model="editForm" ref="editFormRef" label-width="70px">
                <el-form-item label="分类名">
                    <el-input v-model="editForm.title"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number
                            v-model="editForm.sort"
                            :min="1"
                            :max="10"
                            label="排序"
                    ></el-input-number>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCategory">确 定</el-button>
      </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "Category",
        data() {
            return {
                num: 1,
                article: {},
                queryInfo: {
                    pageSize: 5,
                    pageNum: 1
                },
                insertFrom: {
                    sort: 1,
                    title: ''
                },
                editForm: {},
                categories: [],
                total: 0,
                editDialogVisible: false
            };
        },
        methods: {
            handleChange(value) {
                console.log(value);
            }
        }
    }
</script>

<style scoped>
    .clearfix {
        display: flex;
        height: 50px;
    }

    .button-add {
        height: 40px;
        margin-left: 15px;
    }
</style>