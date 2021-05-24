<template>
  <div class="login">
    <div class="confim">
      <p class="font">Adarts</p>
      <el-input :placeholder="$t('placeholder.user')" v-model="user.account" class="input" :clearable="clear">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-input :placeholder="$t('placeholder.password')" v-model="user.password" type="password" class="input" :clearable="clear">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <div v-if="showTips" class="tips">
        <!-- <div class="tips"> -->
        <i class="el-icon-warning"></i>
        <span>{{ tipsText }}</span>
      </div>
      <el-row class="LoginButton" ref="button" @keyup.enter="login">
        <el-button type="primary" size="mini" @click="login">{{ $t("message.login") }}</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      user: {
        account: "",
        password: ""
      },
      showTips: false,
      clear: true,
      tipsText: "",
      flag: true
    };
  },
  // created() {
  //   const vm = this;
  //   document.addEventListener('keydown', vm.login);
  // },
  // destroyed() {
  //   const vm = this;
  //   document.removeEventListener('keydown', vm.login);
  // },
  methods: {
    login() {
      const vm = this;
      if (!this.user.account) {
        this.check(this.$t("message.tips2"));
        return;
      }
      if (!this.user.password) {
        this.check(this.$t("message.tips3"));
        return;
      }
      this.$axios.post("/login/login", vm.user).then(res => {
        if (res.data.errorCode) {
          vm.check(res.data.msg);
        } else {
          localStorage.setItem("LeagueToken", res.data.data.token);
          localStorage.setItem("LeagueUserId", res.data.data.id);
          localStorage.setItem("LeagueUserType", res.data.data.userType);
          vm.$router.push({
            path: "/league"
          });
        }
      });
    },
    check(msg) {
      if (!this.flag) {
        return;
      }
      this.flag = false;
      const vm = this;
      const oldClass = this.$refs.button.$el.className;
      this.showTips = true;
      this.tipsText = msg;
      this.$refs.button.$el.className += " shakeButton";
      setTimeout(() => {
        vm.showTips = false;
        vm.flag = true;
        vm.$refs.button.$el.className = oldClass;
      }, 1000);
    }
  }
};
</script>
<style scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1abc9c;
}
.confim {
  width: 350px;
  height: 420px;
  font-size: 16px;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #ffffff;
  padding: 45px 20px 0 20px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 10px;
}
.font {
  color: #1abc9c;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
}
.input {
  margin-top: 30px;
}
.input >>> .el-input__inner {
  height: 44px;
}
.input button {
  width: 100%;
  background: #1abc9c;
  border-color: #1abc9c;
}
.LoginButton button {
  width: 100%;
  background: #1abc9c;
  border-color: #1abc9c;
  margin-top: 15px;
  height: 50px;
}
.shakeButton {
  animation: shake 0.1s linear infinite;
}
.tips {
  height: 40px;
  line-height: 40px;
  background: #1abc9c;
  margin: 10px 0 0 0;
  border-radius: 5px;
  color: #ffffff;
}
.el-icon-warning {
  margin: 0 5px;
  font-size: 14px;
  padding-left: 10x;
}
@keyframes shake {
  0% {
    margin-top: 10px;
  }
  50% {
    margin-top: 15px;
  }
  100% {
    margin-top: 10px;
  }
}
</style>
