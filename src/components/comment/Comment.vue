<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章功能</el-breadcrumb-item>
            <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!--主体部分-->
        <el-card class="box-card">
            <el-table class="table-style"
                    :data="tableData"
                    height="600px"
                    border
                    style="width: 100%">
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
                        label="文章标题"
                        prop="articleTitle"
                        min-width="70"
                        align="center"
                ></el-table-column>
                <el-table-column
                        header-align="center"
                        label="父评论"
                        prop="pcomment"
                        min-width="70"
                        show-overflow-tooltip
                        align="center"
                >
                    <template scope="scope">
                        <p v-html="scope.row.pcomment"></p>
                    </template>
                </el-table-column>
                <el-table-column
                        header-align="center"
                        label="评论人"
                        prop="fromUserName"
                        min-width="150"
                        align="center"
                ></el-table-column>
                <el-table-column
                        header-align="center"
                        label="被评论人"
                        prop="toUserName"
                        min-width="100"
                        align="center"
                ></el-table-column>
                <el-table-column
                        header-align="center"
                        label="内容"
                        prop="content"
                        min-width="100"
                        show-overflow-tooltip
                        align="center"
                >
                    <template scope="scope">
                        <p v-html="scope.row.content"></p>
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
                        label="操作"
                        min-width="180px"
                        header-align="center"
                        align="center"
                >
                    <template slot-scope="scope">
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
                                    size="mini"
                                    @click="removeComment(scope.row.id)"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区 -->
            <el-pagination class="page-helper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pageNum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="queryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
            ></el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Comment",
        data() {
            return {
                queryInfo: {
                    pageSize: 5,
                    pageNum: 1
                },
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                total: 0,
            }
        },


    }
</script>

<style scoped>
    .box-card {
        margin-top: 25px;
        width: 100%;
    }
    .table-style{
        margin-top: 15px;
    }

    .page-helper{
        margin-top: 15px;
    }
</style>