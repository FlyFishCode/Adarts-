/* eslint-disable func-names */
<template>
  <div>
    <div class="box">
      <el-row class="buttonClass">
        <!-- <el-col :span="2">
          <el-button size="mini" type="info" @click="stageDelete(id, list)">{{ $t("all.tip130") }}</el-button>
        </el-col> -->
        <el-col :span="2">
          <el-button size="mini" type="primary" @click="Save">{{ $t("all.tip136") }}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="title-g">
          {{ $t("all.tip145") }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip146") }}
        </el-col>
        <el-col :span="20">
          <el-input v-model="AddCategoryRequest.name" :show-word-limit="showLimit" clearable maxlength="100" :placeholder="$t('all.tip38')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip147") }}
        </el-col>
        <el-col :span="20">
          <el-input
            v-model="AddCategoryRequest.description"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4 }"
            :show-word-limit="showLimit"
            clearable
            maxlength="100"
            :placeholder="$t('all.tip38')"
          ></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-row>
        <el-col class="title-g">
          {{ $t("all.tip148") }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip129") }}
        </el-col>
        <el-col :span="2" class="radioClass">
          <el-radio v-model="AddCategoryRequest.ratingLimit" :label="1">{{ $t("all.tip154") }}</el-radio>
        </el-col>
        <el-col :span="4">
          <el-input v-model="AddCategoryRequest.ratingMin" clearable :disabled="ratingDisabled" :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col :span="1" class="lineClass">-</el-col>
        <el-col :span="4">
          <el-input v-model="AddCategoryRequest.ratingMax" clearable :disabled="ratingDisabled" :placeholder="$t('all.tip38')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="overFlowStyle" :span="4"> </el-col>
        <el-col :span="2" class="radioClass">
          <el-radio v-model="AddCategoryRequest.ppdLimit" :label="1">{{ $t("all.tip155") }}</el-radio>
        </el-col>
        <el-col :span="4">
          <el-input v-model="AddCategoryRequest.ppdMin" clearable :disabled="ppdDisabled" :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col :span="1" class="lineClass">-</el-col>
        <el-col :span="4">
          <el-input v-model="AddCategoryRequest.ppdMax" clearable :disabled="ppdDisabled" :placeholder="$t('all.tip38')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="overFlowStyle" :span="4"> </el-col>
        <el-col :span="2" class="radioClass">
          <el-radio v-model="AddCategoryRequest.mprLimit" :label="1">{{ $t("all.tip156") }}</el-radio>
        </el-col>
        <el-col :span="4">
          <el-input v-model="AddCategoryRequest.mprMin" clearable :disabled="mprDisabled" :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col :span="1" class="lineClass">-</el-col>
        <el-col :span="4">
          <el-input v-model="AddCategoryRequest.mprMax" clearable :disabled="mprDisabled" :placeholder="$t('all.tip38')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="overFlowStyle" :span="4"> </el-col>
        <el-col :span="2" class="radioClass">
          <el-radio v-model="AddCategoryRequest.unlimited" :label="1">{{ $t("all.tip150") }}</el-radio>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-row>
        <el-col class="title-g">
          {{ $t("all.tip157") }}
        </el-col>
      </el-row>
      <div class="table">
        <el-table :data="divisionlist" style="width: 100%">
          <el-table-column prop="name" :label="$t('all.tip158')" min-width="9%"> </el-table-column>
          <el-table-column prop="stageNumber" :label="$t('all.tip21')" min-width="9%"> </el-table-column>
          <el-table-column min-width="6%">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDivisitionDelete(scope.row.divisionId)">{{ $t("all.tip130") }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <DeleteDialog :deleteVisible="deleteVisible" @handleCancel="handleCancel" @handleOk="handleOk" />
  </div>
</template>
<script>
import { changeMenus, changeCurrentObj, changeHash } from "@/components/common/Utils";
import DeleteDialog from "@/components/deleteDialog";

export default {
  name: "Category",
  components: {
    DeleteDialog
  },
  data() {
    return {
      showLimit: true,
      deleteVisible: false,
      radio: true,
      ratingDisabled: true,
      ppdDisabled: true,
      mprDisabled: true,
      id: "",
      Name: "",
      WomenNums: "",
      isCurrentSave: "",
      deleteDivisitionId: 0,
      AddCategoryRequest: {
        competitionId: "",
        name: "",
        description: "",
        ratingLimit: 0,
        mprLimit: 0,
        ppdLimit: 0,
        unlimited: 1,
        ratingMin: 0,
        ratingMax: 0,
        ppdMin: 0,
        ppdMax: 0,
        mprMin: 0,
        mprMax: 0
      },
      divisionlist: []
    };
  },
  watch: {
    // eslint-disable-next-line func-names
    "AddCategoryRequest.ratingLimit": function(newValue) {
      if (newValue === 1) {
        this.ratingDisabled = false;
        this.ppdDisabled = true;
        this.mprDisabled = true;
        this.AddCategoryRequest.mprLimit = 0;
        this.AddCategoryRequest.ppdLimit = 0;
        this.AddCategoryRequest.unlimited = 0;
        // this.setValue(1);
      } else {
        this.AddCategoryRequest.ratingMin = 0;
        this.AddCategoryRequest.ratingMax = 0;
      }
    },
    // eslint-disable-next-line func-names
    "AddCategoryRequest.mprLimit": function(newValue) {
      if (newValue === 1) {
        this.mprDisabled = false;
        this.ratingDisabled = true;
        this.ppdDisabled = true;
        this.AddCategoryRequest.ratingLimit = 0;
        this.AddCategoryRequest.ppdLimit = 0;
        this.AddCategoryRequest.unlimited = 0;
        // this.setValue(2);
      } else {
        this.AddCategoryRequest.mprMin = 0;
        this.AddCategoryRequest.mprMax = 0;
      }
    },
    // eslint-disable-next-line func-names
    "AddCategoryRequest.ppdLimit": function(newValue) {
      if (newValue === 1) {
        this.ppdDisabled = false;
        this.mprDisabled = true;
        this.ratingDisabled = true;
        this.AddCategoryRequest.ratingLimit = 0;
        this.AddCategoryRequest.mprLimit = 0;
        this.AddCategoryRequest.unlimited = 0;
        // this.setValue(3);
      } else {
        this.AddCategoryRequest.ppdMin = 0;
        this.AddCategoryRequest.ppdMax = 0;
      }
    },
    // eslint-disable-next-line func-names
    "AddCategoryRequest.unlimited": function(newValue) {
      if (newValue === 1) {
        this.ratingDisabled = true;
        this.ppdDisabled = true;
        this.mprDisabled = true;
        this.AddCategoryRequest.ratingLimit = 0;
        this.AddCategoryRequest.mprLimit = 0;
        this.AddCategoryRequest.ppdLimit = 0;
        // this.setValue(4);
      } else {
        this.AddCategoryRequest.ratingMin = 0;
        this.AddCategoryRequest.ratingMax = 0;
        this.AddCategoryRequest.mprMin = 0;
        this.AddCategoryRequest.mprMax = 0;
        this.AddCategoryRequest.ppdMin = 0;
        this.AddCategoryRequest.ppdMax = 0;
      }
    },
    // eslint-disable-next-line func-names
    "AddCategoryRequest.ratingMin": function(newValue, oldValue) {
      if (!newValue) {
        return;
      }
      // 解决数字键盘可以输入输入多个小数点问题
      const value = newValue.toString();
      let index = 0;
      for (const key of value) {
        if (key === ".") {
          index += 1;
        }
      }
      if (index > 1) {
        this.AddCategoryRequest.ratingMin = oldValue;
        return;
      }
      // 保留两位小数
      if (newValue) {
        // eslint-disable-next-line no-param-reassign
        const pointIndex = newValue.toString().indexOf(".");
        if (pointIndex > 0 && newValue.length - pointIndex > 3) {
          this.AddCategoryRequest.ratingMin = oldValue;
        }
      }
    },
    // eslint-disable-next-line func-names
    "AddCategoryRequest.ratingMax": function(newValue, oldValue) {
      if (!newValue) {
        return;
      }
      // 解决数字键盘可以输入输入多个小数点问题
      const value = newValue.toString();
      let index = 0;
      for (const key of value) {
        if (key === ".") {
          index += 1;
        }
      }
      if (index > 1) {
        this.AddCategoryRequest.ratingMax = oldValue;
        return;
      }
      // 保留两位小数
      if (newValue) {
        // eslint-disable-next-line no-param-reassign
        const pointIndex = newValue.toString().indexOf(".");
        if (pointIndex > 0 && newValue.length - pointIndex > 3) {
          this.AddCategoryRequest.ratingMax = oldValue;
        }
      }
    },
    // eslint-disable-next-line func-names
    "AddCategoryRequest.ppdMin": function(newValue, oldValue) {
      if (!newValue) {
        return;
      }
      // 解决数字键盘可以输入输入多个小数点问题
      const value = newValue.toString();
      let index = 0;
      for (const key of value) {
        if (key === ".") {
          index += 1;
        }
      }
      if (index > 1) {
        this.AddCategoryRequest.ppdMin = oldValue;
        return;
      }
      // 保留两位小数
      if (newValue) {
        // eslint-disable-next-line no-param-reassign
        const pointIndex = newValue.toString().indexOf(".");
        if (pointIndex > 0 && newValue.length - pointIndex > 3) {
          this.AddCategoryRequest.ppdMin = oldValue;
        }
      }
    },
    // eslint-disable-next-line func-names
    "AddCategoryRequest.ppdMax": function(newValue, oldValue) {
      if (!newValue) {
        return;
      }
      // 解决数字键盘可以输入输入多个小数点问题
      const value = newValue.toString();
      let index = 0;
      for (const key of value) {
        if (key === ".") {
          index += 1;
        }
      }
      if (index > 1) {
        this.AddCategoryRequest.ppdMax = oldValue;
        return;
      }
      // 保留两位小数
      if (newValue) {
        // eslint-disable-next-line no-param-reassign
        const pointIndex = newValue.toString().indexOf(".");
        if (pointIndex > 0 && newValue.length - pointIndex > 3) {
          this.AddCategoryRequest.ppdMax = oldValue;
        }
      }
    },
    // eslint-disable-next-line func-names
    "AddCategoryRequest.mprMin": function(newValue, oldValue) {
      if (!newValue) {
        return;
      }
      // 解决数字键盘可以输入输入多个小数点问题
      const value = newValue.toString();
      let index = 0;
      for (const key of value) {
        if (key === ".") {
          index += 1;
        }
      }
      if (index > 1) {
        this.AddCategoryRequest.mprMin = oldValue;
        return;
      }
      // 保留两位小数
      if (newValue) {
        // eslint-disable-next-line no-param-reassign
        const pointIndex = newValue.toString().indexOf(".");
        if (pointIndex > 0 && newValue.length - pointIndex > 3) {
          this.AddCategoryRequest.mprMin = oldValue;
        }
      }
    },
    // eslint-disable-next-line func-names
    "AddCategoryRequest.mprMax": function(newValue, oldValue) {
      if (!newValue) {
        return;
      }
      // 解决数字键盘可以输入输入多个小数点问题
      const value = newValue.toString();
      let index = 0;
      for (const key of value) {
        if (key === ".") {
          index += 1;
        }
      }
      if (index > 1) {
        this.AddCategoryRequest.mprMax = oldValue;
        return;
      }
      // 保留两位小数
      if (newValue) {
        // eslint-disable-next-line no-param-reassign
        const pointIndex = newValue.toString().indexOf(".");
        if (pointIndex > 0 && newValue.length - pointIndex > 3) {
          this.AddCategoryRequest.mprMax = oldValue;
        }
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.setData(to.query.id);
    next();
  },
  mounted() {
    this.AddCategoryRequest.competitionId = this.$route.query.parentId;
    const id = this.$route.query.id;
    this.getDivisionList();
    if (id) {
      this.setData(id);
    }
  },
  computed: {},
  methods: {
    setData(id) {
      this.$axios.post(`/getcategorybyid?id=${id}`).then(res => {
        if (res.data.data) {
          this.AddCategoryRequest = res.data.data;
          changeCurrentObj(id, "category", this.$store.state.menuList, this.AddCategoryRequest);
        }
      });
    },
    getDivisionList() {
      const vm = this;
      const categoryId = this.$route.query.id;
      this.$axios.post("/divisionlist", vm.$qs.stringify({ categoryId })).then(res => {
        vm.divisionlist = res.data.data;
      });
    },
    Save() {
      const vm = this;
      let href = "";
      const id = this.$route.query.id;
      if (this.$route.query.id || this.isCurrentSave) {
        href = "updatecategory";
        this.AddCategoryRequest.categoryId = id || this.isCurrentSave;
      } else {
        href = "addcategory";
      }
      const saveMethods = () => {
        this.$axios.post(`/${href}`, vm.AddCategoryRequest).then(res => {
          if (res.data) {
            const url = "category";
            let type = "";
            let item = {};
            vm.$message({
              message: res.data.msg
            });
            if (res.data.data) {
              for (const value of Object.values(res.data.data)) {
                type = `${value}`;
              }
              vm.isCurrentSave = type;
              item = {
                label: vm.AddCategoryRequest.name,
                id: type,
                url
              };
            } else {
              item = {
                label: vm.AddCategoryRequest.name,
                url
              };
            }
            this.$store.commit("changeMenuList", changeMenus(this.$store.state.menuList, id, item));
            // changeMEenuList(window.treeList, id, item);
            // vm.getList();
            if (type) {
              changeHash(window.location.hash, "category", type);
            }
          } else {
            vm.$message({
              message: res.data.msg,
              type: "warning",
              duration: 2000
            });
          }
        });
      };
      // 如果比賽已經開打，需確認是否修改
      if (href === "updatecategory" && vm.AddCategoryRequest.numFight) {
        this.$confirm(this.$t("all.tip575"), {
          confirmButtonText: this.$t("all.tip47"),
          cancelButtonText: this.$t("all.tip30"),
          type: "warning"
        })
          .then(() => {
            saveMethods();
          })
          .catch(() => false);
      } else {
        saveMethods();
      }
    },
    handleCancel() {
      this.deleteVisible = false;
    },
    handleOk(type) {
      if (type) {
        this.$axios.post(`/deldivisionbyid?id=${this.deleteDivisitionId}`).then(res => {
          if (res.data.code === 1000) {
            this.getDivisionList();
            this.getMenuList();
          }
          this.$message(res.data.msg);
          this.deleteVisible = false;
        });
      }
    },
    handleDivisitionDelete(id) {
      this.deleteVisible = true;
      this.deleteDivisitionId = id;
    },
    getMenuList() {
      this.$axios.post(`/allsubset?competitionId=${sessionStorage.getItem("competitionId")}`).then(res => {
        if (res.data.data) {
          this.$store.state.menuList = res.data.data;
        }
      });
    }
  }
};
</script>
<style scoped>
.buttonClass {
  display: flex;
  justify-content: flex-end;
}
.overFlowStyle {
  background: #fff;
  height: 40px;
}
.el-table >>> td,
.el-table >>> th {
  text-align: center;
}
.radioClass {
  padding-left: 10px;
  line-height: 40px;
}
</style>
