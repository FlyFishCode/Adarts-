<template>
  <div class="menuBar">
    <el-row>
      <Header></Header>
    </el-row>
    <el-row class="tac">
      <el-col :span="menuSpan" class="menuBox">
        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#fff" text-color="#000" active-text-color="#ffd04b" :router="isRouter" :unique-opened="onlyOne">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ $t("all.tip1") }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="league">{{ $t("all.tip1") }}</el-menu-item>
              <el-menu-item index="entry">{{ $t("all.tip239") }}</el-menu-item>
              <el-menu-item index="matchTable">{{ $t("all.tip270") }}</el-menu-item>
              <el-menu-item index="result">{{ $t("all.tip309") }}</el-menu-item>
              <el-menu-item index="schedule">{{ $t("all.tip300") }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ $t("all.tip362") }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="judgement">{{ $t("all.tip362") }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ $t("all.tip244") }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="teamMgmt">{{ $t("all.tip244") }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ $t("all.tip445") }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="playerMgmt">{{ $t("all.tip445") }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ $t("all.tip444") }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="template">{{ $t("all.tip14") }}</el-menu-item>
              <el-menu-item index="holiday">{{ $t("all.tip434") }}</el-menu-item>
              <el-menu-item index="operAtor">{{ $t("all.tip9") }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ $t("all.tip439") }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="competitionStats">{{ $t("all.tip440") }}</el-menu-item>
              <el-menu-item index="playerAward">{{ $t("all.tip343") }}</el-menu-item>
              <el-menu-item index="teamAward">{{ $t("all.tip360") }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ $t("all.tip595") }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="news">{{ $t("all.tip595") }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="cententSpan">
        <BreadCrumb></BreadCrumb>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Header from '@/views/index/header';
import BreadCrumb from '@/views/index/breadCrumb';

export default {
  components: {
    Header,
    BreadCrumb
  },
  data() {
    return {
      isRouter: true,
      onlyOne: true,
      isCollapse: false,
      menuSpan: 3,
      cententSpan: 21
    };
  },
  watch: {
    // isCollapse(a) {
    //   if (a) {
    //     this.$refs.show.$el.style.display = 'block';
    //     this.$refs.false.$el.style.display = 'none';
    //     this.menuSpan = 1;
    //     this.cententSpan = 23;
    //   } else {
    //     this.$refs.false.$el.style.display = 'block';
    //     this.$refs.show.$el.style.display = 'none';
    //     this.menuSpan = 3;
    //     this.cententSpan = 21;
    //   }
    // }
  },
  mounted() {
    // this.$refs.show.$el.style.display = 'none';
  },
  methods: {}
};
</script>
<style scoped>
.menuBox {
  height: 100%;
}
.el-menu {
  height: 100%;
}
.el-submenu .el-menu-item {
  min-width: 157.58px;
}
.tac >>> .el-radio-button__inner {
  border: 1px solid #fff;
}
</style>
