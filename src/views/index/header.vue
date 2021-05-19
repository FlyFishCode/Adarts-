<template>
  <div>
    <el-row class="header">
      <el-col :span="19">Adarts飞镖联赛后台管理系统</el-col>
      <!-- <el-col :span="1">
        <div class="imgBox">
          <img src="../../assets/1.jpg" />
        </div>
      </el-col> -->
      <el-col :span="3">
        <!-- <el-form-item :label="$t('message.language')"> -->
        <span class="languageClass">{{ $t("all.tip460") }}</span>
        <el-select v-model="language" :placeholder="$t('placeholder.select')" size="mini" @change="selectLanguage" class="selectClass">
          <el-option value="jtzh" label="简体中文"></el-option>
          <el-option value="ftzh" label="繁體中文"></el-option>
          <el-option value="en" label="English"></el-option>
        </el-select>
        <!-- </el-form-item> -->
      </el-col>
      <el-col :span="2">
        <div @click="loginOut" class="loginOut">
          {{ $t("message.loginOut") }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      language: ""
    };
  },
  mounted() {
    if (this.$i18n.locale === "jtzh") {
      this.language = "jtzh";
      this.$i18n.locale = "jtzh";
    } else {
      this.language = "en";
      this.$i18n.locale = "en";
    }
  },
  methods: {
    selectLanguage(value) {
      this.$i18n.locale = value;
      sessionStorage.setItem("lang", value);
      this.bus.$emit("change", window.treeList);
    },
    loginOut() {
      const vm = this;
      this.$confirm(this.$t("all.tip593"), {
        confirmButtonText: this.$t("all.tip47"),
        cancelButtonText: this.$t("all.tip30"),
        type: "warning"
      })
        .then(() => {
          sessionStorage.removeItem("LeagueToken");
          sessionStorage.removeItem("LeagueUserId");
          sessionStorage.removeItem("LeagueUserType");
          vm.$router.push({ path: "/" });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除',
          // });
        });
    }
  }
};
</script>
<style scoped>
.header {
  height: 50px;
  line-height: 50px;
  background: rgb(70, 76, 91);
  color: rgb(26, 188, 156);
  font-size: 18px;
  padding-left: 10px;
  font-weight: 800;
}
/* .imgBox {
  width: 40px;
  height: 40px;
  margin-top: 5px;
  box-sizing: border-box;
  border-radius: 50%;
  overflow: hidden;
} */
/* .imgBox img {
  width: 100%;
  height: 100%;
} */
.loginOut:hover {
  cursor: pointer;
}
.languageClass {
  position: relative;
  top: 2px;
  width: 45%;
  display: inline-block;
}
.selectClass {
  width: 50%;
}
.loginOut:hover {
  opacity: 0.5;
}
</style>
