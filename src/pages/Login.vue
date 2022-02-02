<template>
    <div class="login_container">
        <el-form
                :model="loginForm"
                status-icon
                :rules="rules"
                ref="loginForm"
                class="login_form"
        >
            <h3 class="login_title">后台登录</h3>
            <el-form-item prop="username">
                <el-input
                        v-model="loginForm.username"
                        autocomplete="off"
                        placeholder="请输入用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                        type="password"
                        v-model="loginForm.password"
                        autocomplete="off"
                        placeholder="请输入密码"
                ></el-input>
            </el-form-item>
            <!--      <el-form-item prop="code">-->
            <!--        <el-input-->
            <!--          type="text"-->
            <!--          auto-complete="false"-->
            <!--          v-model="loginForm.code"-->
            <!--          placeholder="点击图片更换验证码"-->
            <!--          style="width: 250px; margin-right: 5px"-->
            <!--        ></el-input>-->
            <!--        <img src="" />-->
            <!--      </el-form-item>-->
            <el-form-item>
                <el-button
                        type="primary"
                        style="width: 100%"
                        @click="submitForm('loginForm')"
                >提交
                </el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import {mapMutations} from "vuex";

    export default {

        name: 'Login',
        data() {
            return {
                loginForm: {
                    username: 'admin',
                    password: 'admin',
                },
                rules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                    ],
                    password: [{required: true, message: "请输入密码", trigger: "blur"}],
                }
            };
        },
        methods: {
            ...mapMutations(['setToken']),
            submitForm() {
                const qs = require('qs')
                const data = qs.stringify({
                    username: this.loginForm.username,
                    password: this.loginForm.password
                })
                this.$refs.loginForm.validate(async valid => {
                    if (!valid) {
                        return false
                    }
                    const {data: result} = await this.$http.post('login', data)
                    if (result.code !== 200) {
                        this.$message.error(result.msg)
                        return false
                    } else {
                        window.localStorage.setItem('token', JSON.stringify(result.token))
                        this.setToken(result.token)
                        this.$router.replace('/home')
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login_container {
        background: linear-gradient(-200deg, #aac2ee, #fac0e7);
        height: 100%;
    }

    .login_title {
        font-size: 20px;
        margin: 0px auto 20px auto;
        text-align: center;
    }

    .login_form {
        position: relative;
        top: 30%;
        border-radius: 15px;
        background-clip: padding-box;
        margin: 0 auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: white;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .el-form-item__content {
        display: flex;
        align-items: center;
    }
</style>