<template>
    <div class="login-container" style="background-color: #141a48;margin: 0px;overflow: hidden;">
        <div id="canvascontainer" ref='can'></div>

        <Form ref="loginForm" autoComplete="on" :model="loginForm" :rules="loginRules" class="card-box login-form">
            <Form-item prop="username">
                <Input type="text" v-model="loginForm.username" placeholder="Username" autoComplete="on">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="password">
                <Input type="password" v-model="loginForm.password" placeholder="Password"
                       @keyup.enter.native="handleLogin">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleLogin('loginForm')" long>登录</Button>
            </Form-item>
            <!--<div class='tips'>admin账号为:admin@wz.com 密码123456</div>-->
            <!--<div class='tips'>editor账号:editor@wz.com 密码123456</div>-->
        </Form>

    </div>
</template>
<script>
    /* eslint-disable */
    // import { isWscnEmail } from 'utils/validate';
    import { getToken, setToken, removeToken } from '@/utils/auth'

    export default {
        name: 'login',
        data() {
            const validateUser = (rule, value, callback) => {
                if (value.length < 2) {
                    callback(new Error('用户名不能小于2位'));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位'));
                } else {
                    callback();
                }
            };
            return {
                loginForm: {
                    username: 'admin', //admin@wz.com
                    password: ''
                },
                loginRules: {
                    username: [
                        {required: true, trigger: 'blur', validator: validateUser}
                    ],
                    password: [
                        {required: true, trigger: 'blur', validator: validatePass}
                    ]
                },
                loading: false,
                showDialog: false
            }
        },
        mounted() {
            console.log(this.$store.state.ACCESS_TOKEN);
            //js效果
            //js效果over
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    console.log(valid);
                    if (valid) {
                        this.loading = true;
                                                this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
                                                    // this.$Message.success('登录成功');
                                                    this.loading = false;
                                                    this.$router.push({ path: '/' });
                                                    this.showDialog = true
                                                }).catch(() => {
                                                    console.log("error1:"+err);
                                                    this.$message.error('用户名或密码不正确!');
                                                    this.loading = false;
                                                })

            /*            var params = new URLSearchParams();
                        params.append('username', this.loginForm.username);
                        params.append('password', this.loginForm.password);
                        this.$http.post(this.$store.state.APIURL + "authentication/form", params, {
                            headers: {
                                Authorization: 'Basic Y2hvbWUzNjA6Y2hvbWUzNjBzZWNyZXQ='
                            }
                        }).then(res => {
                            let re = res.data;
                            if (re.success === true) {
                                this.$store.state.ACCESS_TOKEN = re.data.access_token;
                                setToken(re.data.access_token);

                                this.$Message.success('登录成功');
                                this.loading = false;
                                this.$router.push({path: '/'});
                            } else {
                                console.log(res);
                                console.log(err);
                                this.$Message.error(res.message);
                                this.loading = false;
                            }
                        }).catch(err => {
                            console.log("error1:" + err);
                            this.$message.error('用户名或密码不正确!');
                            this.loading = false;
                        });*/

                    } else {
                        console.log('error submit!!');
                        console.log(res.data.message);
                        this.$Message.error('登录失败,请重新输入!');
                        return false;
                    }
                });
            },

        },
        init() {

        },
        destroyed() {
            // window.removeEventListener('hashchange', this.afterQRScan);
        }
    }

</script>
<style>
    .login-container a {
        color: #0078de;
    }

    #canvascontainer {
        position: absolute;
        top: 0px;
    }

    .wz-input-group-prepend {
        background-color: #141a48;
        border: 1px solid #2d8cf0;
        border-right: none;
        color: #2d8cf0;
    }

</style>

<style rel="stylesheet/scss" lang="scss">
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 5px;
    }

    .login-container {
        height: 100vh;
        background-color: #2d3a4b;

        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        input {
            background: transparent;
            border: 1px solid #2d8cf0;
            -webkit-appearance: none;
            border-radius: 3px;
            padding: 12px 5px 12px 15px;
            color: #eeeeee;
            height: 47px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: #889aa4;
        }

        .title {
            font-size: 26px;
            font-weight: 400;
            color: #eeeeee;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }

        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 400px;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }

        .forget-pwd {
            color: #fff;
        }
    }

</style>
