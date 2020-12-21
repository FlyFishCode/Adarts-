<template>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item>首页</el-breadcrumb-item> -->
      <el-breadcrumb-item
      v-for="item in breadcrumb"
      :key="item.index"
      :to="item.url">
      {{ $t(item.name) }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {},
  data() {
    return {
      user: {
        userName: '',
        passWord: ''
      },
      showTips: false,
      clear: true,
      tipsText: ''
    };
  },
  computed: {
    breadcrumb() {
      return this.$route.meta;
    }
  },
  methods: {
  }
};
</script>
<style scoped>
.bread{
  padding:10px;
  box-sizing:border-box;
}
</style>
