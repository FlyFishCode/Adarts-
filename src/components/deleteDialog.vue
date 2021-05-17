<template>
  <div>
    <el-dialog :title="$t('all.tip130')" :visible.sync="visible" @close="handleCancel" width="30%" center>
      <span>{{ $t("all.tip629") }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCancel">{{ $t("all.tip30") }}</el-button>
        <el-button size="small" type="primary" @click="handleOk">{{ $t("all.tip47") }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "deleteDialog",
  props: ["deleteVisible"],
  components: {},
  data() {
    return {
      visible: this.deleteVisible
    };
  },
  watch: {
    deleteVisible(value) {
      this.visible = value;
    }
  },
  methods: {
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleOk() {
      this.$emit("handleOk", true);
    }
  }
};
</script>
<style scoped></style>
