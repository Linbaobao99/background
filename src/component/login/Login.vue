<template>
  <div id="login">
    <section>
      <el-form :model="ruleForm2" status-icon label-position="top" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="uname">
          <el-input type="text" v-model="ruleForm2.uname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upwd">
          <el-input type="password" v-model="ruleForm2.upwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm2: {
        uname: "admin",
        upwd: "123456"
      },
      rules2: {
        uname: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        upwd: [
          {
            min: 3,
            max: 10,
            required: true,
            message: "长度最小是3,最大10",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$axios.post(this.$api.login, this.ruleForm2).then(res => {
        if (res.data.status == 0) {
          this.$alert("登录成功", "提示", {
            callback: () => {
              this.$router.push({ path: this.$route.query.next || "/admin" });
              localStorage.setItem("name", JSON.stringify(res.data.message));
            }
          });
        } else {
          this.$alert(res.data.message);
        }
      });
    },
    //登录按钮方法
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          this.$alert("登录失败");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="less">
/* scoped出了这个组件就不会生效 */
#login {
  background-color: aqua;
  height: 100%;
  section {
    padding: 15px;
    width: 400px;
    height: 280px;
    margin: 0 auto;
    border: 3px solid #fff;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 5px;
    .el-button--primary {
      background-color: #7e14c4;
      border-color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>