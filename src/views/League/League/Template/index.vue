<template>
  <div>
    <el-row class="tac">
      <el-col :span="menuSpan" class="menuBox">
        <el-row>
          <el-col>
            <el-button size="mini" type="primary" @click="save">{{ $t("all.tip137") }}</el-button>
          </el-col>
        </el-row>
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false" icon="el-icon-edit" ref="show"><i class="el-icon-s-unfold"></i></el-radio-button>
          <el-radio-button :label="true" icon="el-icon-edit" ref="false"><i class="el-icon-s-fold"></i></el-radio-button>
        </el-radio-group> -->
        <div class="treeList">
          <el-tree :data="treeDataList" ref="tree" node-key="id" current-node-key="1" default-expand-all :expand-on-click-node="false" highlight-current @node-click="entryDetail">
            <div class="custom-tree-node" slot-scope="{ node, data }" :data="data.id">
              <div class="labelStyle" :title="data.label">{{ data.label }}</div>
              <div class="button">
                <el-button v-if="data.url !== 'leg' && data.url !== 'set'" icon="el-icon-plus" circle size="mini" @click="() => append(data)"></el-button>
                <el-button v-if="data.url !== 'competition' && data.url !== 'leg'" icon="el-icon-delete" circle size="mini" @click="() => remove(node, data)"></el-button>
              </div>
            </div>
          </el-tree>
        </div>
      </el-col>
      <el-dialog :title="$t('all.tip137')" :visible.sync="dialogTableVisible">
        <el-row class="input-Row">
          <el-col class="label-g" :span="5">
            {{ $t("all.tip48") }}
          </el-col>
          <el-col :span="19">
            <el-input v-model="template.name" maxlength="100" show-word-limit clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
        </el-row>
        <el-row class="input-Row">
          <el-col class="label-g" :span="5">
            {{ $t("all.tip138") }}
          </el-col>
          <el-col :span="19">
            <el-input v-model="template.description" type="textarea" :autosize="{ minRows: 6, maxRows: 6 }" maxlength="100" show-word-limit clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
        </el-row>
        <el-row class="button-Row">
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="SaveTemplate">{{ $t("all.tip136") }}</el-button>
          </el-col>
        </el-row>
      </el-dialog>
      <el-col :span="cententSpan">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { changeMenus } from "@/components/common/Utils";
import i18n from "@/i18n/i18n";

export default {
  name: "competition",
  components: {},
  data() {
    return {
      id: 5,
      // treeDataList: [
      //   {
      //     id: "1",
      //     label: "League",
      //     url: "competition",
      //     stage: "competitionId",
      //     parentId: ""
      //   }
      // ],
      dialogTableVisible: false,
      template: {
        name: "",
        description: ""
      },
      // isCollapse: false,
      competitionId: "",
      menuSpan: 5,
      cententSpan: 19,
      currentNodeId: 0,
      menuList: [],
      legName: [
        {
          value: 0,
          label: "all.tip521"
        },
        {
          value: 1,
          label: "all.tip499"
        },
        {
          value: 2,
          label: "all.tip500"
        },
        {
          value: 3,
          label: "all.tip501"
        },
        {
          value: 4,
          label: "all.tip502"
        },
        {
          value: 5,
          label: "all.tip505"
        },
        {
          value: 6,
          label: "all.tip506"
        },
        {
          value: 7,
          label: "all.tip507"
        },
        {
          value: 8,
          label: "all.tip508"
        },
        {
          value: 9,
          label: "all.tip509"
        },
        {
          value: 10,
          label: "all.tip177"
        },
        {
          value: 11,
          label: "all.tip554"
        },
        {
          value: 12,
          label: "all.tip555"
        },
        {
          value: 13,
          label: "all.tip556"
        },
        {
          value: 14,
          label: "all.tip557"
        },
        {
          value: 20,
          label: "all.tip511"
        },
        {
          value: 21,
          label: "all.tip510"
        },
        {
          value: 22,
          label: "all.tip558"
        }
      ]
    };
  },
  // watch: {
  //   treeDataList: {
  //     handler(newVal) {
  //       if (newVal) {
  //         this.treeDataList = this.treeDataList;
  //       }
  //     },
  //     deep: true
  //   }
  // },
  mounted() {
    // const vm = this;
    // this.treeDataList = this.treeDataList;
    if ((this.$route.query.showData && this.$route.query.id) || this.$route.query.isTemplate) {
      this.$axios.post(`/allsubset?competitionId=${sessionStorage.getItem("competitionId")}`).then(res => {
        this.treeDataList = res.data.data;
        // this.changeLegName(this.treeDataList);
      });
    }
    this.bus.$on("setNode", data => {
      this.$axios.post(`/allsubset?competitionId=${sessionStorage.getItem("competitionId")}`).then(res => {
        this.treeDataList = res.data.data;
        this.currentNodeId = data;
        this.returnFatherNode(this.getNode(res.data.data[0], data));
      });
    });
  },
  computed: {
    treeDataList: {
      get() {
        return this.$store.state.menuList;
      },
      set(newData) {
        this.$store.state.menuList = newData;
      }
    }
  },
  methods: {
    changeLegName(data) {
      const vm = this;
      if (data) {
        data.forEach(i => {
          if (i.url !== "leg") {
            vm.changeLegName(i.children);
          } else {
            vm.legName.forEach(k => {
              if (i.gameNameId === k.value) {
                if (i.label.includes("[")) {
                  const leg = i.label.split("[")[0];
                  // eslint-disable-next-line no-param-reassign
                  i.label = `${leg}[${i18n.t(k.label)}]`;
                }
              }
            });
          }
        });
      }
    },
    append(data) {
      debugger;
      let label = "";
      let url = "";
      let newChild = {
        id: (this.id += 1),
        label: "",
        url: "",
        stage: "",
        completeId: "",
        children: []
      };
      switch (data.url) {
        case "competition":
          label = "category";
          url = "category";
          break;
        case "category":
          label = "division";
          url = "division";
          break;
        case "division":
          label = "stage";
          url = "stage";
          break;
        case "stage":
          label = "set";
          url = "set";
          break;
        default:
          newChild = "";
      }
      if (!data.children) {
        this.$set(data, "children", []);
      }
      if (newChild) {
        let whoUrl = "";
        let key = "";
        let name = "";
        const value = data.id;
        newChild.label = label;
        newChild.url = url;
        switch (data.url) {
          case "competition":
            whoUrl = "addcategory";
            key = "competitionId";
            name = "category";
            break;
          case "category":
            whoUrl = "adddivision";
            key = "categoryId";
            name = "division";
            break;
          case "division":
            whoUrl = "addstage";
            key = "divisionId";
            name = "stage";
            break;
          default:
            whoUrl = "addset";
            key = "stageId";
            name = "set";
            break;
        }
        const resquestData = {
          [key]: value,
          name
        };
        data.children.push(newChild);
        this.$axios.post(`/${whoUrl}`, resquestData).then(res => {
          if (res.data.data) {
            let id = "";
            for (const val of Object.values(res.data.data)) {
              id = `${val}`;
            }
            const item = {
              id,
              url
            };
            if (whoUrl === "addset") {
              item.id = res.data.data.setId;
              item.url = "set";
            }
            this.$store.commit("changeMenuList", changeMenus(this.treeDataList, newChild.id, item));
          }
        });
      }
    },
    remove(node, data) {
      let whoUrl = "";
      const vm = this;
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      switch (data.url) {
        case "category":
          whoUrl = "delcategorybyid";
          break;
        case "division":
          whoUrl = "deldivisionbyid";
          break;
        case "stage":
          whoUrl = "delestage";
          break;
        default:
          whoUrl = "delsetbyid";
          break;
      }
      this.$axios.post(`/${whoUrl}?id=${data.id}`).then(res => {
        if (res) {
          vm.$axios.post(`/allsubset?competitionId=${this.treeDataList[0].id}`).then(msg => {
            vm.treeDataList = msg.data.data;
            vm.changeLegName(msg.data.data);
          });
        }
      });
      this.returnFatherNode(parent.data);
    },
    returnFatherNode(data) {
      if (JSON.stringify(data) !== "{}" && data) {
        setTimeout(() => {
          const el = document.querySelector(`div[data="${data.id}"]`).parentElement.parentElement;
          // 保存删除节点父级元素的id，点击进去其他节点时删除此节点高亮显示
          el.setAttribute("class", `${el.getAttribute("class")} is-current`);
          this.entryDetail(data);
        }, 100);
      }
    },
    findId(list, data) {
      if (!list.children) return;
      let parentId = "";
      // eslint-disable-next-line consistent-return
      list.children.forEach(i => {
        if (i.id === data.id && i.stage === data.stage) {
          parentId = list.id;
          return parentId;
        }
        if (i.children && i.children.length > 0) {
          parentId = this.findId(i, data);
        }
      });
      // eslint-disable-next-line consistent-return
      return parentId;
    },
    getNode(list, id) {
      let father = null;
      for (let i = 0; i < list.children.length; i += 1) {
        if (Number(list.children[i].id) === Number(id)) {
          father = list.children[i];
          return father;
        }
        if (list.children[i].children.length) {
          // eslint-disable-next-line no-return-assign
          father = this.getNode(list.children[i], id);
          if (father) {
            return father;
          }
        }
      }
      return null;
    },
    findFather(list, id) {
      let father = {};
      // eslint-disable-next-line consistent-return
      list.children.forEach(i => {
        if (i.url === "leg") {
          father = list;
          return father;
        }
        if (i.children && i.children.length > 0) {
          father = this.findFather(i, id);
        }
      });
      return father;
    },
    entryDetail(data) {
      this.currentNodeId = data.id;
      this.$nextTick(() => {
        // 先取消其他高亮显示
        const el = document.getElementsByClassName("is-current");
        if (el.length > 1) {
          for (let i = 0; i < el.length; i += 1) {
            if (el[i].children[0].children[1].getAttribute("data") === this.currentNodeId) {
              el[i].setAttribute("class", "el-tree-node is-expanded is-current is-focusable");
            } else {
              el[i].setAttribute("class", "el-tree-node is-expanded is-focusable");
            }
          }
        }
      });
      let parentId = "";
      let url = "";
      let id = "";
      let legId = "";
      if (data.url === "leg") {
        // 点击leg时候获取父级id
        // eslint-disable-next-line no-unused-vars
        url = "set";
        // id = data.id;
        id = data.parentId;
        legId = data.id;
        // parentId = data.parentId;
        parentId = this.findFather(this.treeDataList[0], data.id).parentId;
      } else {
        id = data.id;
        legId = "";
        url = data.url;
        parentId = data.parentId || this.findId(this.treeDataList[0], data);
      }
      // 查看已经创建比赛
      if (this.$route.query.showData) {
        // 查看保存的数据
        // parentId = this.findId(this.treeDataList[0], data.id) || data.id;
        this.$router.push({
          path: url,
          query: {
            id,
            legId,
            parentId,
            showData: true
          }
        });
        return;
      }
      // 通过模板创建比赛
      // 解决 进入下部其他阶段修改数据，返回第一阶段保存的时候不是调用《通过模板创建比赛接口》
      if (this.$route.query.isTemplate) {
        this.$router.push({
          path: url,
          query: {
            id,
            legId,
            parentId,
            isTemplate: true
          }
        });
        return;
      }
      this.$router.push({
        path: url,
        query: {
          id,
          legId,
          parentId
        }
      });
    },
    info(list) {
      this.findChildren(list);
    },
    save() {
      this.dialogTableVisible = true;
    },
    SaveTemplate() {
      const flag = this.$route.query.showData;
      let data = {};
      if (flag) {
        data = {
          competition: { id: this.$route.query.id },
          isHaveComp: 1,
          userId: sessionStorage.getItem("userId"),
          name: this.template.name,
          description: this.template.description
        };
      } else {
        const { competition, competitionBasicOption, competitionOption, countryList, operatorList, shopIdList } = this.treeDataList[0].current;
        const categoryList = [];
        data = {
          userId: sessionStorage.getItem("userId"),
          name: this.template.name,
          description: this.template.description,
          isHaveComp: 2,
          competition,
          competitionBasicOption,
          competitionOption,
          countryList,
          operatorList,
          shopIdList,
          categoryList
        };
        this.treeDataList.forEach(i => {
          if (i.children.length) {
            i.children.forEach(j => {
              // "category"
              debugger;
              // eslint-disable-next-line no-param-reassign
              j.current.divisionList = [];
              // eslint-disable-next-line no-unused-expressions
              j.current && categoryList.push(j.current);
              if (j.children.length) {
                j.children.forEach(k => {
                  // "division"
                  debugger;
                  // eslint-disable-next-line no-param-reassign
                  k.current.stageList = [];
                  // eslint-disable-next-line no-unused-expressions
                  k.current && j.current.divisionList.push(k.current);
                  if (k.children.length) {
                    k.children.forEach(n => {
                      // stage
                      debugger;
                      // eslint-disable-next-line no-param-reassign
                      n.current.setList = [];
                      // eslint-disable-next-line no-unused-expressions
                      n.current && k.current.stageList.push(n.current);
                      if (n.children.length) {
                        n.children.forEach(m => {
                          // set
                          debugger;
                          // eslint-disable-next-line no-unused-expressions
                          m.current && n.current.setList.push(m.current);
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
      this.$axios.post("/template/addcompetitiontemplate", data).then(res => {
        this.$message(res.data.msg);
        this.dialogTableVisible = false;
      });
    }
  }
};
</script>
<style scoped>
.button-Row {
  display: flex;
  justify-content: center;
}
.input-Row {
  margin-bottom: 30px;
}
.tac >>> .el-radio-button__inner {
  border: 1px solid #fff;
}
.centontBox >>> .el-submenu__title {
  display: flex;
  justify-content: space-between;
}
.el-icon-add {
  line-height: 19px;
  font-size: 24px;
  height: 20px;
  width: 20px;
  border: 1px solid #000;
  border-radius: 50%;
  margin-top: 16px;
  background: #000;
  color: #fff;
}
.centontBox >>> .el-icon-arrow-down {
  position: absolute;
  right: 95%;
  font-weight: bold;
  color: #000;
}
.el-icon-add:hover {
  color: black;
  background: #fff;
}
.titleStyle {
  display: inline-block;
  width: 170px;
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.treeList {
  font-size: 20px;
}
.custom-tree-node {
  display: flex;
}
.button {
  margin-left: 10px;
}
.button >>> button {
  width: 20px;
  height: 20px;
}
.button >>> button i {
  position: relative;
  right: 4px;
  bottom: 4px;
}
.labelStyle {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.treeList >>> .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background: #acd7ff;
}
</style>
