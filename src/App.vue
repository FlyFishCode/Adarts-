<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 3px;
  box-sizing: border-box;
}
#app {
  height: 100%;
}
.menuBar,
.tac {
  height: 100%;
}
.el-input__inner:focus {
  border-color: #1abc9c !important;
}
.search {
  background: #eeeeee;
  margin: 8px;
  padding: 8px;
  box-sizing: border-box;
}
.box {
  box-sizing: border-box;
  padding: 5px;
  border: 1px solid #eee;
  margin: 5px 0;
}
.title-g {
  padding-left: 10px;
  height: 28px;
  background: #eee;
}
.title-g::after {
  content: "";
  width: 3px;
  height: 17px;
  background: #1890ff;
  position: absolute;
  display: block;
  top: 3px;
  left: 0px;
}
.label-g {
  height: 40px;
  line-height: 40px;
  background: #eee;
  padding-left: 10px;
}
.center-Row {
  margin: 5px 0;
}
.lineClass {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.buttonBox {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.overFlowStyle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #fff;
  height: 40px;
  line-height: 40px;
}
.tableLink {
  color: #1890ff;
  cursor: pointer;
}
.DialogButton {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
/*使用calss类型写在全局的样式不生效，设置为id。*/
#divBoxWidth div {
  width: 100%;
}
.formImgBox {
  height: 80px;
}
.formImgBox img {
  width: 100%;
  height: 100%;
}
/*分页组件*/
.page {
  display: flex;
  justify-content: flex-end;
}
#nprogress .bar {
  background: #1890ff !important;
}
.btnClass {
  height: 40px;
  line-height: 40px;
}
@media all and (min-width: 1000px) {
  .selectBox .el-select {
    width: 50%;
  }
  .el-date-editor {
    width: 100% !important;
  }
  .threeBox .el-select {
    width: 33%;
  }
  .btnClass {
    min-width: 260px;
  }
  /* .label-g{
    min-width: 190px;
  } */
}
/* .serchBox{ */
/* background: #ddd */
/* } */
/* .el-breadcrumb__inner.is-link{
  color: #1890ff!important;
} */
.dialogTable {
  height: 600px;
  overflow-y: auto;
}
</style>
