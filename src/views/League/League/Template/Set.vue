<template>
  <div>
    <div class="box">
      <el-row class="buttonClass">
        <!-- <el-col :span="2">
          <el-button size="mini" type="info" @click="stageDelete(id, list)">{{ $t("all.tip130") }}</el-button>
        </el-col> -->
        <el-col :span="2">
          <el-button size="mini" type="primary" @click="CopyFrom">{{ $t("all.tip144") }}</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" type="primary" @click="Save">{{ $t("all.tip136") }}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="title-g">
          {{ $t("all.tip197") }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip199") }}
        </el-col>
        <el-col :span="4" id="divBoxWidth">
          <el-select v-model="set.mode" :placeholder="$t('placeholder.select')" @change="modeChange">
            <el-option v-for="item in modeList" :key="item.id" :label="$t(item.label)" :value="item.id"> </el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip206") }}
        </el-col>
        <el-col :span="4">
          <el-input v-model.number="maxPlayer" disabled :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip73") }}
        </el-col>
        <el-col :span="4">
          <el-input v-model.number="set.point" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip524") }}
        </el-col>
        <el-col :span="4" id="divBoxWidth">
          <el-select v-model="set.bullStartFirst" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip323')"></el-option>
            <el-option :value="2" :label="$t('all.tip526')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip208") }}
        </el-col>
        <el-col :span="4" id="divBoxWidth">
          <el-select v-model="set.gender" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip209')"></el-option>
            <el-option :value="2" :label="$t('all.tip210')"></el-option>
            <el-option :value="3" :label="$t('all.tip81')"></el-option>
          </el-select>
        </el-col>
        <el-col v-show="set.gender !== 3" :span="4">
          <el-input v-model.number="set.genderNum" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip525") }}
        </el-col>
        <el-col :span="4" id="divBoxWidth">
          <el-select v-model="set.memberLimit" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip86')"></el-option>
            <el-option :value="2" :label="$t('all.tip87')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip585") }}
        </el-col>
        <el-col :span="4" id="divBoxWidth">
          <el-select v-model="maxRating" :placeholder="$t('placeholder.select')" @change="maxRatingChange">
            <el-option :value="0" :label="$t('all.tip86')"></el-option>
            <el-option :value="1" :label="$t('all.tip87')"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" v-if="maxRating === 1" id="divBoxWidth">
          <el-input v-model.number="set.ratingMaximum" clearable></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-row>
        <el-col class="title-g">
          {{ $t("all.tip576") }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="6">
          {{ $t("all.tip162") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-checkbox v-model="idDisabled"></el-checkbox>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip163") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="set.setGameOption.gameIn" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
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
          <el-select v-model="set.setGameOption.gameOut" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip31')"></el-option>
            <el-option :value="3" :label="$t('all.tip165')"></el-option>
            <el-option :value="2" :label="$t('all.tip167')"></el-option>
            <el-option :value="4" :label="$t('all.tip169')"></el-option>
            <el-option :value="5" :label="$t('all.tip168')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip172") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="set.setGameOption.freezeOption" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip175')"></el-option>
            <el-option :value="2" :label="$t('all.tip176')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip171") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="set.setGameOption.bull" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip479')"></el-option>
            <el-option :value="2" :label="$t('all.tip478')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip477") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="set.setGameOption.outTips" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip87')"></el-option>
            <el-option :value="2" :label="$t('all.tip86')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip177") }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip481") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="set.setGameOption.inCriteria" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip179')"></el-option>
            <el-option :value="2" :label="$t('all.tip180')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip181") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="set.setGameOption.overkill" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
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
          <el-select v-model="set.setGameOption.outCriteria" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip179')"></el-option>
            <el-option :value="2" :label="$t('all.tip180')"></el-option>
          </el-select>
        </el-col>
        <div v-show="set.setGameOption.overkill === 1">
          <el-col class="label-g" :span="4">
            {{ $t("all.tip182") }}
          </el-col>
          <el-col :span="4" class="lineClass">
            <el-input v-model.number="set.setGameOption.scoreGap" :disabled="idDisabled" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
        </div>
      </el-row>
    </div>
    <div class="box">
      <el-row>
        <el-col class="title-g">
          {{ $t("all.tip212") }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip198") }}
        </el-col>
        <el-col :span="4">
          <el-input v-model="order" disabled></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip54") }}
        </el-col>
        <el-col :span="4">
          <el-input v-model.number="howMany" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-button size="mini" type="primary" @click="create">{{ $t("all.tip16") }}</el-button>
        </el-col>
      </el-row>
      <div class="table">
        <el-table :data="legList" border style="width: 100%">
          <el-table-column type="index" :label="$t('all.tip54')" min-width="9%"> </el-table-column>
          <el-table-column :label="$t('all.tip213')" min-width="9%">
            <template slot-scope="scope">
              <el-select v-model="scope.row.stageGameId" :placeholder="$t('placeholder.select')" @change="stageGameChange($event, scope.row)">
                <el-option v-for="item in stageGameIdList" :key="item.stageGameId" :label="$t(item.label)" :value="item.value"> </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column min-width="9%">
            <template slot-scope="scope" v-if="scope.row.stageGameId === 0">
              <el-select v-model="scope.row.choices" :placeholder="$t('placeholder.select')">
                <el-option v-for="item in choicesList" :key="item.id" :label="$t(item.label)" :value="item.id"> </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="date" min-width="6%">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleLegDelete(scope.$index, scope.row.legId)">{{ $t("all.tip130") }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="$t('all.tip144')" :visible.sync="copyBox">
      <div>
        <el-table :data="copyBoxData" border style="width: 100%">
          <el-table-column :label="$t('all.tip44')" min-width="5%">
            <template slot-scope="scope">
              <el-radio v-model="copyRadio" :label="scope.row.setId"><span></span></el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="category" :label="$t('all.tip51')" min-width="5%"> </el-table-column>
          <el-table-column prop="division" :label="$t('all.tip52')" min-width="5%"> </el-table-column>
          <el-table-column prop="stage" :label="$t('all.tip21')" min-width="5%"> </el-table-column>
          <el-table-column prop="set" :label="$t('all.tip53')" min-width="5%"> </el-table-column>
          <el-table-column :label="$t('all.tip497')" min-width="5%">
            <template slot-scope="scope">
              <el-input v-model="scope.row.number" clearable></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="DialogButton">
        <el-button size="mini" @click="Add" type="primary">{{ $t("all.tip132") }}</el-button>
      </div>
    </el-dialog>
    <DeleteDialog :deleteVisible="deleteVisible" @handleCancel="handleCancel" @handleOk="handleOk" />
    <div>
      <el-dialog :title="$t('all.tip631')" :visible.sync="modeVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="30%" center>
        <span>{{ $t("all.tip630") }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="handleModeCancel">{{ $t("all.tip30") }}</el-button>
          <el-button size="small" type="danger" @click="handleModeOk">{{ $t("all.tip47") }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { deleteStage, changeCurrentObj } from "@/components/common/Utils";
import DeleteDialog from "@/components/deleteDialog";

export default {
  name: "Set",
  components: {
    DeleteDialog
  },
  data() {
    return {
      id: "",
      list: [],
      howMany: 0,
      maxRating: 0,
      modeList: [
        { id: 1, label: "all.tip200" },
        { id: 2, label: "all.tip201" },
        { id: 3, label: "all.tip202" },
        { id: 4, label: "all.tip203" },
        { id: 5, label: "all.tip204" },
        { id: 6, label: "all.tip205" }
      ],
      contrastData: [
        { id: 1, label: "all.tip499" },
        { id: 2, label: "all.tip500" },
        { id: 3, label: "all.tip501" },
        { id: 4, label: "all.tip502" },
        { id: 5, label: "all.tip503" },
        { id: 6, label: "all.tip504" },
        { id: 7, label: "all.tip505" },
        { id: 8, label: "all.tip506" },
        { id: 9, label: "all.tip507" },
        { id: 10, label: "all.tip508" },
        { id: 11, label: "all.tip509" },
        { id: 12, label: "all.tip510" },
        { id: 13, label: "all.tip511" },
        { id: 14, label: "all.tip512" }
      ],
      stageGameIdList: [{ value: 0, label: this.$t("all.tip521") }],
      choicesList: [{ id: 2, label: "all.tip513" }, { id: 3, label: "all.tip514" }],
      copyRadio: 0,
      deleteLegId: 0,
      deleteLegIndex: 0,
      oldModeValue: null,
      copyBox: false,
      idDisabled: false,
      deleteVisible: false,
      modeVisible: false,
      copyBoxData: [],
      choicesData: [],
      maxPlayer: 1,
      set: {
        setId: "",
        stageId: "",
        nub: "",
        mode: 1,
        point: 1,
        number: 1,
        bullStartFirst: 1,
        gender: 3,
        genderNum: 1,
        memberLimit: 1,
        ratingMaximum: 0,
        setGameOption: {
          gameIn: 1,
          gameOut: 1,
          freezeOption: 1,
          bull: 1,
          outTips: 1,
          inCriteria: 2,
          outCriteria: 2,
          overkill: 1,
          scoreGap: 200
        }
      },
      legList: [],
      order: 0,
      value: 0,
      setId: "set",
      allGameList: [
        { value: 1, label: "all.tip499" },
        { value: 2, label: "all.tip500" },
        { value: 3, label: "all.tip501" },
        { value: 4, label: "all.tip502" },
        // { value: 5, label: 'all.tip503' },
        // { value: 6, label: 'all.tip504' },
        { value: 5, label: "all.tip505" },
        { value: 6, label: "all.tip506" },
        { value: 7, label: "all.tip507" },
        { value: 8, label: "all.tip508" },
        { value: 9, label: "all.tip509" },
        { value: 10, label: "all.tip177" },
        { value: 11, label: "all.tip554" },
        { value: 12, label: "all.tip555" },
        { value: 13, label: "all.tip556" },
        { value: 14, label: "all.tip557" },
        { value: 20, label: "all.tip511" },
        { value: 21, label: "all.tip510" },
        { value: 22, label: "all.tip558" }
      ],
      legId: 0,
      setGameList: {}
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.legId = Number(to.query.legId);
    this.setData(to.query.id, false, this.legId);
    this.setOrderIndex(this.$store.state.menuList, to.query.legId);
    // changeCurrentObj(from.query.id, 'category', this.$store.state.menuList, this.set);
    next();
  },
  mounted() {
    const id = this.$route.query.legId;
    if (id) {
      this.setData(this.$route.query.id, false, 1);
    } else {
      this.setData(this.$route.query.id, false, 0);
    }
    this.setOrderIndex(this.$store.state.menuList, this.$route.query.legId);
    this.getCopyList();
  },
  watch: {
    idDisabled(newValue) {
      // leg勾应用上阶段数据
      if (newValue && this.$route.query.legId) {
        this.LegUpSetData(this.$route.query.id, false, 1);
        return;
      }
      // leg不应用上阶段数据
      if (!newValue && this.$route.query.legId) {
        this.setData(this.$route.query.id, false, 1);
        return;
      }
      // set勾选上阶段数据
      if (newValue) {
        this.setUpStageData(this.$route.query.parentId);
      } else {
        // set不勾选上阶段游戏
        this.setData(this.$route.query.id, newValue);
      }
    },
    modeValue(newValue, oldValue) {
      this.oldModeValue = oldValue;
    }
  },
  computed: {
    modeValue() {
      return this.set.mode;
    }
  },
  methods: {
    setData(id, newValue = true, num = 0) {
      const vm = this;
      this.$axios.post(`/getset?id=${id}`).then(res => {
        if (res.data.data) {
          vm.set = res.data.data;
          if (num) {
            const resLeg = res.data.data.legList.find(i => i.legId === Number(vm.$route.query.legId));
            if (resLeg && resLeg.legGameOption) {
              vm.idDisabled = false;
              // 在leg页面保存setGameList
              Object.assign(vm.setGameList, res.data.data.setGameOption);
              // 在leg页面设置页面数据
              Object.assign(vm.set.setGameOption, resLeg.legGameOption);
            }
          } else {
            Object.assign(vm.setGameList, res.data.data.setGameOption);
          }
          vm.legList = res.data.data.legList;
          if (res.data.data.ratingMaximum) {
            vm.maxRating = 1;
            vm.set.ratingMaximum = res.data.data.ratingMaximum;
          }
          vm.set.stageId = vm.$route.query.parentId || "";
          if (newValue) {
            vm.idDisabled = res.data.data.isDefaultStage === 1;
          }
          res.data.data.legList.forEach(i => {
            const flag = vm.stageGameIdList.every(j => i.stageGameId !== j.value);
            if (flag) {
              const label = vm.allGameList.find(k => k.value === i.gameName);
              vm.stageGameIdList.push({ value: i.stageGameId, label: label.label });
            }
          });
          switch (vm.set.mode) {
            case 1:
              this.maxPlayer = 1;
              break;
            case 2:
              this.maxPlayer = 2;
              break;
            case 3:
              this.maxPlayer = 3;
              break;
            case 4:
              this.maxPlayer = 4;
              break;
            case 5:
              this.maxPlayer = 2;
              break;
            default:
              this.maxPlayer = 4;
              break;
          }
          // this.getLegGameList();
          changeCurrentObj(id, "set", this.$store.state.menuList, vm.set);
        }
      });
    },
    stageGameChange(value, row) {
      console.log(value);
      if (!value) {
        Object.assign(row, { choices: 2 });
      } else {
        Object.assign(row, { choices: 1 });
      }
    },
    LegUpSetData(id) {
      this.$axios.post(`/getsetgameoption?setId=${id}`).then(res => {
        if (res.data.data) {
          this.set.setGameOption = res.data.data;
        }
      });
    },
    setUpStageData(id) {
      this.$axios.post(`/getstagegameoption?stageId=${id}`).then(res => {
        if (res.data.data) {
          this.set.setGameOption = res.data.data;
        }
      });
    },
    setOrderIndex(list, id) {
      if (!list) return;
      const vm = this;
      list.forEach(i => {
        if (i.id === id) {
          vm.order = list.findIndex(j => j.id === id) + 1;
        } else {
          this.setOrderIndex(i.children, id);
        }
      });
    },
    stageDelete(id, list) {
      deleteStage(id, list);
    },
    findIndex(list, id) {
      let arr = [];
      list.forEach(i => {
        if (i.id === id) {
          arr = i.children;
        } else {
          this.findIndex(i.children, id);
        }
      });
      return arr;
    },
    Save() {
      const vm = this;
      let setIndex = 0;
      let name = "";
      let url = "";
      const id = this.$route.query.id;
      const saveMethods = () => {
        this.modeList.forEach(i => {
          if (i.id === vm.set.mode) {
            name = vm.$t(i.label);
          }
        });
        if (id) {
          url = "updateSet";
          this.set.setId = id;
        } else {
          url = "addset";
        }
        this.set.nub = `${vm.setId}${(setIndex += 1)}(${vm.legList.length})[${name}]`;
        this.setOrderIndex(this.$store.state.menuList, this.$route.query.legId);
        // vm.set.number = vm.order;
        // eslint-disable-next-line no-unused-expressions
        this.idDisabled ? (this.set.isDefaultStage = 1) : (this.set.isDefaultStage = 2);
        if (this.legId) {
          // 保存此leg的gameoptions选项
          const currentLeg = vm.legList.find(i => i.legId === Number(vm.$route.query.legId));
          const obj = {
            isDefaultSet: this.idDisabled ? 1 : 2,
            legGameOption: {
              gameIn: this.set.setGameOption.gameIn,
              gameOut: this.set.setGameOption.gameOut,
              freezeOption: this.set.setGameOption.freezeOption,
              bull: this.set.setGameOption.bull,
              outTips: this.set.setGameOption.outTips,
              inCriteria: this.set.setGameOption.inCriteria,
              overkill: this.set.setGameOption.overkill,
              outCriteria: this.set.setGameOption.outCriteria,
              scoreGap: this.set.setGameOption.scoreGap
            }
          };
          if (currentLeg) {
            Object.assign(currentLeg, obj);
          }
          // 如果是leg页面保存，则set option用旧得数据
          this.set.setGameOption = this.setGameList;
        }
        this.$axios.post(`/${url}`, vm.set).then(res => {
          if (res.data.code === 1000) {
            vm.$message({
              message: res.data.msg
            });
          } else {
            vm.$message({
              message: res.data.msg,
              type: "warning",
              duration: 2000
            });
          }
          vm.getCopyList();
        });
        this.$axios.post("/updateLeg", vm.legList).then(res => {
          res.data.data.forEach((i, index) => {
            vm.legList[index].legId = i;
          });
          vm.setData(vm.$route.query.id, false, 1);
          // 添加leg之后更新原始数据
          this.bus.$emit("setNode", this.$route.query.id);
        });
      };
      // 如果比賽已經開打，需確認是否修改
      if (url === "updateSet" && vm.set.numFight) {
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
    maxRatingChange(value) {
      if (!value) {
        this.set.ratingMaximum = 0;
      }
    },
    getCopyList() {
      const id = sessionStorage.getItem("competitionId");
      this.$axios.post("/getcompetitionallset", this.$qs.stringify({ competitionId: id })).then(res => {
        if (res.data.data) {
          this.copyBoxData = res.data.data.map(i => ({ ...i, number: "" }));
        }
      });
    },
    modeChange(value) {
      // // 301 501 701 901  标准米老鼠 标准高分赛 计时高分赛 减半
      // const singlesGameList = [
      //   { value: 1, label: "all.tip499" },
      //   { value: 2, label: "all.tip500" },
      //   { value: 3, label: "all.tip501" },
      //   { value: 4, label: "all.tip502" },
      //   { value: 5, label: "all.tip505" },
      //   { value: 7, label: "all.tip507" },
      //   { value: 8, label: "all.tip508" },
      //   { value: 9, label: "all.tip509" }
      // ];
      // // 雪分 队际米老鼠
      // const manyGameList = [
      //   { value: 10, label: "all.tip177" },
      //   { value: 11, label: "all.tip554" },
      //   { value: 12, label: "all.tip555" },
      //   { value: 13, label: "all.tip556" },
      //   { value: 14, label: "all.tip557" }
      // ];
      switch (value) {
        case 1:
          this.maxPlayer = 1;
          break;
        case 2:
          this.maxPlayer = 2;
          break;
        case 3:
          this.maxPlayer = 3;
          break;
        case 4:
          this.maxPlayer = 4;
          break;
        case 5:
          this.maxPlayer = 2;
          break;
        default:
          this.maxPlayer = 4;
          break;
      }
      this.modeVisible = true;
    },
    handleModeCancel() {
      this.set.mode = this.oldModeValue;
      this.modeVisible = false;
    },
    handleModeOk() {
      this.getLegGameList();
      this.modeVisible = false;
    },
    handleCancel() {
      this.deleteVisible = false;
    },
    handleLegDelete(index, id) {
      this.deleteVisible = true;
      this.deleteLegIndex = index;
      this.deleteLegId = id;
    },
    handleOk() {
      if (this.deleteLegId) {
        this.$axios.post(`/deleteLeg?legId=${this.deleteLegId}`).then(res => {
          if (res.data.code === 1000) {
            this.legList.splice(this.deleteLegIndex, 1);
            this.bus.$emit("setNode", this.$route.query.id);
          }
          this.$message(res.data.msg);
        });
      } else {
        this.legList.splice(this.deleteLegIndex, 1);
      }
      this.deleteVisible = false;
    },
    // deleteLeg(index, id) {
    //   if (id) {
    //     this.$axios.post(`/deleteLeg?legId=${id}`).then(res => {
    //       console.log(res.data.msg);
    //     });
    //   }
    //   this.legList.splice(index, 1);
    //   // this.getList();
    //   this.bus.$emit("setNode", this.$route.query.id);
    // },
    CopyFrom() {
      this.copyBox = true;
    },
    Add() {
      const copyNumber = this.copyBoxData.find(i => i.setId === this.copyRadio).number;
      const data = {
        stageId: this.$route.query.parentId,
        setId: this.copyRadio,
        number: Number(copyNumber)
      };
      this.$axios.post("/copyset", this.$qs.stringify(data)).then(res => {
        this.$message(res.data.msg);
        // this.getList();
      });
      this.copyBox = false;
    },
    create() {
      this.set.stageId = this.$route.query.parentId;
      if (!this.set.stageId) {
        return;
      }
      for (let index = 0; index < this.howMany; index += 1) {
        this.value += 1;
        this.legList.push({
          number: this.value,
          stageGameId: "",
          setId: this.$route.query.id,
          legId: 0,
          choices: 1,
          isDefaultSet: this.idDisabled ? 1 : 2,
          legGameOption: {
            gameIn: this.set.setGameOption.gameIn,
            gameOut: this.set.setGameOption.gameOut,
            freezeOption: this.set.setGameOption.freezeOption,
            bull: this.set.setGameOption.bull,
            outTips: this.set.setGameOption.outTips,
            inCriteria: this.set.setGameOption.inCriteria,
            overkill: this.set.setGameOption.overkill,
            outCriteria: this.set.setGameOption.outCriteria,
            scoreGap: this.set.setGameOption.scoreGap
          }
        });
      }
      this.getLegGameList();
    },
    getLegGameList() {
      const vm = this;
      const obj = {
        stageId: this.set.stageId,
        mode: this.set.mode
      };
      const pro = new Promise((resolve, reject) => {
        this.$axios.post("/getgamelist", vm.$qs.stringify(obj)).then(res => {
          if (res.data.data) {
            resolve(res.data.data);
          }
          reject(res);
        });
      });
      pro.then(res => {
        this.stageGameIdList = [{ value: 0, label: this.$t("all.tip521") }];
        res.forEach(i => {
          vm.allGameList.forEach(j => {
            if (i.gameName === j.value) {
              const flag = vm.stageGameIdList.every(k => i.id !== k.value);
              if (flag) {
                vm.stageGameIdList.push({ value: i.id, label: j.label });
              }
            }
          });
        });
      });
      pro.catch(err => {
        console.log(err);
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
</style>
