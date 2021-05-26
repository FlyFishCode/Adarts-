<template>
  <div>
    <div class="box">
      <el-row class="buttonClass">
        <el-col :span="2">
          <el-button size="mini" type="primary" @click="CopyFrom">{{ $t("all.tip144") }}</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" type="primary" @click="Save">{{ $t("all.tip136") }}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="title-g">
          {{ $t("all.tip159") }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip158") }}
        </el-col>
        <el-col :span="20">
          <el-input v-model="division.name" :show-word-limit="showLimit" clearable maxlength="100" :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip160") }}
        </el-col>
        <el-col :span="20">
          <el-input
            v-model="division.description"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4 }"
            :show-word-limit="showLimit"
            clearable
            maxlength="100"
            :placeholder="$t('placeholder.input')"
          ></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-row>
        <el-col class="title-g">
          {{ $t("all.tip161") }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip163") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="division.gameIn" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip31')"></el-option>
            <el-option :value="2" :label="$t('all.tip165')"></el-option>
            <el-option :value="3" :label="$t('all.tip167')"></el-option>
            <el-option :value="4" :label="$t('all.tip169')"></el-option>
            <el-option :value="5" :label="$t('all.tip168')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip164") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="division.gameOut" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip31')"></el-option>
            <el-option :value="3" :label="$t('all.tip165')"></el-option>
            <el-option :value="2" :label="$t('all.tip167')"></el-option>
            <el-option :value="4" :label="$t('all.tip169')"></el-option>
            <el-option :value="5" :label="$t('all.tip168')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip172") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="division.freezeOption" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip175')"></el-option>
            <el-option :value="2" :label="$t('all.tip176')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip171") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="division.bull" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip479')"></el-option>
            <el-option :value="2" :label="$t('all.tip478')"></el-option>
            <!-- <el-option :value=3 :label="$t('all.tip480')"></el-option> -->
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip477") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="division.outTips" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip87')"></el-option>
            <el-option :value="2" :label="$t('all.tip86')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-row class="center-Row">
          <el-col>
            {{ $t("all.tip177") }}
          </el-col>
        </el-row>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip481") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="division.inCriteria" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip179')"></el-option>
            <el-option :value="2" :label="$t('all.tip180')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip181") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="division.overkill" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip87')"></el-option>
            <el-option :value="2" :label="$t('all.tip86')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip482") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="division.outCriteria" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip179')"></el-option>
            <el-option :value="2" :label="$t('all.tip180')"></el-option>
          </el-select>
        </el-col>
        <div v-show="division.overkill === 1">
          <el-col class="label-g" :span="4">
            {{ $t("all.tip182") }}
          </el-col>
          <el-col :span="4" class="lineClass">
            <el-input v-model.number="division.scoreGap" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
        </div>
      </el-row>
    </div>
    <div class="box">
      <el-row>
        <el-col class="title-g">
          {{ $t("all.tip157") }}
        </el-col>
      </el-row>
      <div class="table">
        <el-table :data="stageList" border style="width: 100%">
          <el-table-column prop="name" :label="$t('all.tip185')" min-width="9%"> </el-table-column>
          <el-table-column prop="setNumber" :label="$t('all.tip53')" min-width="9%"> </el-table-column>
          <el-table-column min-width="6%">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleStageDelete(scope.row.stageId)">{{ $t("all.tip130") }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="$t('all.tip144')" :visible.sync="copyBox">
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip158") }}
        </el-col>
        <el-col :span="4">
          <el-input v-model="copyName" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-button size="mini" type="primary" @click="Search">{{ $t("all.tip10") }}</el-button>
        </el-col>
      </el-row>
      <div class="dialogTable">
        <el-table :data="copyBoxData" border style="width: 100%">
          <el-table-column :label="$t('all.tip44')" min-width="5%">
            <template slot-scope="scope">
              <el-radio v-model="copyRadio" :label="scope.row.divisionId" @change="change(scope.row.divisionId)"><span></span></el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="categoryName" :label="$t('all.tip51')" min-width="5%"> </el-table-column>
          <el-table-column prop="divisionName" :label="$t('all.tip52')" min-width="5%"> </el-table-column>
          <el-table-column :label="$t('all.tip497')" min-width="5%">
            <template slot-scope="scope">
              <el-input v-model="scope.row.number" clearable></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="DialogButton">
        <el-button size="mini" @click="handleCopyClick" type="primary">{{ $t("all.tip132") }}</el-button>
      </div>
    </el-dialog>
    <DeleteDialog :deleteVisible="deleteVisible" @handleCancel="handleCancel" @handleOk="handleOk" />
  </div>
</template>
<script>
import { changeMenus, changeCurrentObj, changeHash } from "@/components/common/Utils";
import DeleteDialog from "@/components/deleteDialog";

export default {
  name: "Division",
  components: {
    DeleteDialog
  },
  data() {
    return {
      id: "",
      list: [],
      showLimit: true,
      deleteVisible: false,
      copyBox: false,
      copyName: "",
      copyRadio: 0,
      deleteStageId: 0,
      copyBoxInput: "",
      isCurrentSave: "",
      division: {
        categoryId: "",
        bull: 1,
        description: "",
        freezeOption: 1,
        gameIn: 1,
        gameOut: 1,
        inCriteria: 2,
        name: "",
        outCriteria: 2,
        outTips: 1,
        overkill: 1,
        scoreGap: 200
      },
      stageList: [],
      copyBoxData: [],
      copyBoxDataRadio: 0
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.setData(to.query.id);
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  mounted() {
    const id = this.$route.query.id;
    this.division.categoryId = this.$route.query.parentId;
    this.getStageList();
    if (id) {
      this.setData(id);
    }
    this.getCopyList();
  },
  methods: {
    setData(id) {
      this.$axios.post(`/getdivisionbyid?id=${id}`).then(res => {
        if (res.data.data) {
          this.division = res.data.data;
          changeCurrentObj(id, "division", this.$store.state.menuList, this.division);
        }
      });
    },
    getCopyList() {
      const id = localStorage.getItem("competitionId");
      const data = {
        competitionId: id,
        divisionName: this.copyName
      };
      this.$axios.post("/alldivision", this.$qs.stringify(data)).then(res => {
        if (res.data.data) {
          this.copyBoxData = res.data.data.map(i => ({ ...i, number: "" }));
        }
      });
    },
    getStageList() {
      const vm = this;
      const divisionId = this.$route.query.id;
      this.$axios.post("/getstageList", vm.$qs.stringify({ divisionId })).then(res => {
        vm.stageList = res.data.data;
      });
    },
    Save() {
      const vm = this;
      const id = this.$route.query.id;
      let href = "";
      if (id || this.isCurrentSave) {
        href = "updatedivision";
        this.division.divisionId = id || this.isCurrentSave;
      } else {
        href = "adddivision";
      }
      const saveMethods = () => {
        this.$axios.post(`/${href}`, vm.division).then(res => {
          if (res.data) {
            const url = "division";
            let type = "";
            let item = {};
            vm.$message({
              message: res.data.msg,
              type: "success",
              duration: 2000
            });
            if (res.data.data) {
              for (const value of Object.values(res.data.data)) {
                // stage = `${key}`;
                type = `${value}`;
              }
              vm.isCurrentSave = type;
              item = {
                label: vm.division.name,
                id: type,
                url
              };
            } else {
              item = {
                label: vm.division.name,
                url
              };
            }
            this.$store.commit("changeMenuList", changeMenus(this.$store.state.menuList, id, item));
            // changeMEenuList(window.treeList, id, item, vm);
            // vm.getList();
            if (type) {
              changeHash(window.location.hash, "division", type);
            }
          } else {
            vm.$message({
              message: res.data.msg,
              type: "warning",
              duration: 2000
            });
          }
          // vm.getCopyList();
        });
      };
      // 如果比賽已經開打，需確認是否修改
      if (href === "updatedivision" && vm.division.numFight) {
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
    Search() {
      this.getCopyList();
    },
    change(value) {
      console.log(value);
    },
    CopyFrom() {
      this.copyBox = true;
    },
    handleCopyClick() {
      if (this.copyRadio) {
        const copyNumber = this.copyBoxData.find(i => i.divisionId === this.copyRadio).number;
        const data = {
          categoryId: this.$route.query.parentId,
          divisionId: this.copyRadio,
          number: Number(copyNumber)
        };
        this.$axios.post("/copydivision", this.$qs.stringify(data)).then(res => {
          if (res.data.code === 1000) {
            this.bus.$emit("setNode", this.$route.query.id);
          } else {
            this.$message(res.data.msg);
          }
        });
        this.copyBox = false;
      }
    },
    handleCancel() {
      this.deleteVisible = false;
    },
    handleStageDelete(id) {
      this.deleteVisible = true;
      this.deleteStageId = id;
    },
    handleOk(type) {
      if (type) {
        this.$axios.post(`/delestage?id=${this.deleteStageId}`).then(res => {
          if (res.data.code === 1000) {
            this.getStageList();
            this.getMenuList();
          }
          this.$message(res.data.msg);
          this.deleteVisible = false;
        });
      }
    },
    getMenuList() {
      this.$axios.post(`/allsubset?competitionId=${localStorage.getItem("competitionId")}`).then(res => {
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
.el-table >>> td,
.el-table >>> th {
  text-align: center;
}
#topBox >>> .el-radio__label {
  display: none;
}
</style>
