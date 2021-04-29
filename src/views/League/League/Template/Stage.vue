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
          {{ $t("all.tip184") }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip185") }}
        </el-col>
        <el-col :span="20">
          <el-input v-model="stage.name" :show-word-limit="showLimit" clearable maxlength="100" :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip186") }}
        </el-col>
        <el-col :span="20">
          <el-input
            v-model="stage.description"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4 }"
            :show-word-limit="showLimit"
            clearable
            maxlength="100"
            :placeholder="$t('placeholder.input')"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip187") }}
        </el-col>
        <el-col :span="8">
          <el-col :span="11">
            <el-date-picker
              v-model="stage.startTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              default-time="00:00:00"
              :clearable="false"
              :placeholder="$t('placeholder.datePicker')"
            ></el-date-picker>
          </el-col>
          <el-col :span="1" class="lineClass">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="stage.endTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              default-time="23:59:59"
              :clearable="false"
              :placeholder="$t('placeholder.datePicker')"
              :picker-options="pickerOptions"
              @change="dateChange"
            ></el-date-picker>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-row>
        <el-col class="title-g">
          {{ $t("all.tip188") }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip236") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="gameList.gameType" :placeholder="$t('placeholder.select')" @change="gameTypeChange">
            <el-option v-for="item in gameTypeList" :key="item.value" :label="$t(item.label)" :value="item.value"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="gameList.gameName" :placeholder="$t('placeholder.select')" @change="gameSubtypeChange">
            <el-option v-for="item in gameNameList" :key="item.value" :label="$t(item.label)" :value="item.value"> </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <div v-if="showTimming">
          <el-col class="label-g" :span="4">
            {{ $t("all.tip508") }}
          </el-col>
          <el-col :span="4" class="lineClass">
            <el-input v-model="gameList.timming" clearable maxlength="100" :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
        </div>
        <div v-else>
          <el-col class="label-g" :span="4">
            {{ $t("all.tip189") }}
          </el-col>
          <el-col :span="4" class="lineClass">
            <el-select v-model="gameList.round" :placeholder="$t('placeholder.select')">
              <el-option v-for="item in roundList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-col>
        </div>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip190") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="gameList.credits" :placeholder="$t('placeholder.select')">
            <el-option v-for="item in creditsList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip191") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="gameList.parityPlay" :placeholder="$t('placeholder.select')">
            <el-option v-for="item in parityPlayList" :key="item.value" :label="$t(item.label)" :value="item.value"> </el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip192") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="gameList.choice" :placeholder="$t('placeholder.select')">
            <el-option v-for="item in choiceList" :key="item.value" :label="$t(item.label)" :value="item.value"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-button size="mini" type="primary" @click="Create">{{ $t("all.tip16") }}</el-button>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip193") }}
        </el-col>
        <div class="table">
          <el-table :data="stageGameData" border style="width: 100%">
            <el-table-column prop="gameType" :label="$t('all.tip236')" min-width="9%"> </el-table-column>
            <el-table-column prop="gameName" :label="$t('all.tip194')" min-width="9%"> </el-table-column>
            <el-table-column prop="round" :label="$t('all.tip189')" min-width="9%"> </el-table-column>
            <el-table-column prop="credits" :label="$t('all.tip190')" min-width="9%"> </el-table-column>
            <el-table-column prop="parityPlay" :label="$t('all.tip191')" min-width="9%"> </el-table-column>
            <el-table-column prop="choice" :label="$t('all.tip192')" min-width="9%"> </el-table-column>
            <el-table-column min-width="6%">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="Delete(scope.$index, scope.row.stageGameId)">{{ $t("all.tip130") }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
          <el-select v-model="stageGameOption.gameIn" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
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
          <el-select v-model="stageGameOption.gameOut" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip31')"></el-option>
            <el-option :value="3" :label="$t('all.tip165')"></el-option>
            <el-option :value="2" :label="$t('all.tip167')"></el-option>
            <el-option :value="4" :label="$t('all.tip169')"></el-option>
            <el-option :value="5" :label="$t('all.tip168')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip170") }}
        </el-col>
      </el-row> -->
      <el-row>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip172") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="stageGameOption.freezeOption" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip175')"></el-option>
            <el-option :value="2" :label="$t('all.tip176')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip171") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="stageGameOption.bull" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
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
          <el-select v-model="stageGameOption.outTips" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
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
          <el-select v-model="stageGameOption.inCriteria" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip179')"></el-option>
            <el-option :value="2" :label="$t('all.tip180')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip181") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-select v-model="stageGameOption.overkill" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
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
          <el-select v-model="stageGameOption.outCriteria" :disabled="idDisabled" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip179')"></el-option>
            <el-option :value="2" :label="$t('all.tip180')"></el-option>
          </el-select>
        </el-col>
        <div v-show="stageGameOption.overkill === 1">
          <el-col class="label-g" :span="4">
            {{ $t("all.tip182") }}
          </el-col>
          <el-col :span="4" class="lineClass">
            <el-input v-model.number="stageGameOption.scoreGap" :disabled="idDisabled" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
        </div>
      </el-row>
    </div>
    <div class="box">
      <el-row>
        <el-col class="title-g">
          {{ $t("all.tip195") }}
        </el-col>
      </el-row>
      <div class="table">
        <el-table :data="setList" border style="width: 100%">
          <el-table-column prop="number" :label="$t('all.tip196')" min-width="10%"> </el-table-column>
          <el-table-column :label="$t('all.tip199')" min-width="10%">
            <template slot-scope="scope">
              <div>{{ $t(findGameMode(scope.row.mode)) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="point" :label="$t('all.tip73')" min-width="10%"> </el-table-column>
          <el-table-column prop="bullStartFirst" :label="$t('all.tip524')" min-width="10%">
            <template slot-scope="scope">
              <div>{{ scope.row.bullStartFirst === 1 ? $t("all.tip323") : $t("all.tip526") }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="legNumber" :label="$t('all.tip54')" min-width="10%"> </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="$t('all.tip144')" :visible.sync="copyBox" top="5vh">
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
              <el-radio v-model="copyRadio" :label="scope.row.stageId"><span></span></el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="category" :label="$t('all.tip51')" min-width="5%"> </el-table-column>
          <el-table-column prop="division" :label="$t('all.tip52')" min-width="5%"> </el-table-column>
          <el-table-column prop="stage" :label="$t('all.tip21')" min-width="5%"> </el-table-column>
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
  </div>
</template>
<script>
import { changeMenus, changeCurrentObj, changeHash } from "@/components/common/Utils";

export default {
  name: "Stage",
  data() {
    const vm = this;
    return {
      id: "",
      list: [],
      pickerOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.stage.startTime);
          return time.getTime() < date1;
        }
      },
      copyName: "",
      copyBox: false,
      copyBoxData: [],
      showLimit: true,
      radio: true,
      checked: true,
      showTimming: false,
      isCurrentSave: "",
      copyRadio: 0,
      roundList: [
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
        { label: "11", value: 11 },
        { label: "12", value: 12 },
        { label: "13", value: 13 },
        { label: "14", value: 14 },
        { label: "15", value: 15 },
        { label: "16", value: 16 },
        { label: "17", value: 17 },
        { label: "18", value: 18 },
        { label: "19", value: 19 },
        { label: "20", value: 20 },
        { label: "21", value: 21 },
        { label: "22", value: 22 },
        { label: "23", value: 23 },
        { label: "24", value: 24 },
        { label: "25", value: 25 },
        { label: "26", value: 26 },
        { label: "27", value: 27 },
        { label: "28", value: 28 },
        { label: "29", value: 29 },
        { label: "30", value: 30 },
        { label: "31", value: 31 },
        { label: "32", value: 32 },
        { label: "33", value: 33 },
        { label: "34", value: 34 },
        { label: "35", value: 35 },
        { label: "36", value: 36 },
        { label: "37", value: 37 },
        { label: "38", value: 38 },
        { label: "39", value: 39 },
        { label: "40", value: 40 },
        { label: "41", value: 41 },
        { label: "42", value: 42 },
        { label: "43", value: 43 },
        { label: "44", value: 44 },
        { label: "45", value: 45 },
        { label: "46", value: 46 },
        { label: "47", value: 47 },
        { label: "48", value: 48 },
        { label: "49", value: 49 },
        { label: "50", value: 50 },
        { label: "51", value: 51 },
        { label: "52", value: 52 },
        { label: "53", value: 53 },
        { label: "54", value: 54 },
        { label: "55", value: 55 },
        { label: "56", value: 56 },
        { label: "57", value: 57 },
        { label: "58", value: 58 },
        { label: "59", value: 59 },
        { label: "60", value: 60 },
        { label: "61", value: 61 },
        { label: "62", value: 62 },
        { label: "63", value: 63 },
        { label: "64", value: 64 },
        { label: "65", value: 65 },
        { label: "66", value: 66 },
        { label: "67", value: 67 },
        { label: "68", value: 68 },
        { label: "69", value: 69 },
        { label: "70", value: 70 },
        { label: "71", value: 71 },
        { label: "72", value: 72 },
        { label: "73", value: 73 },
        { label: "74", value: 74 },
        { label: "75", value: 75 },
        { label: "76", value: 76 },
        { label: "77", value: 77 },
        { label: "78", value: 78 },
        { label: "79", value: 79 },
        { label: "80", value: 80 }
      ],
      creditsList: [
        { label: "0", value: 0 },
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
        { label: "11", value: 11 },
        { label: "12", value: 12 },
        { label: "13", value: 13 },
        { label: "14", value: 14 },
        { label: "15", value: 15 },
        { label: "16", value: 16 },
        { label: "17", value: 17 },
        { label: "18", value: 18 },
        { label: "19", value: 19 },
        { label: "20", value: 20 }
      ],
      parityPlayList: [{ value: 1, label: "all.tip87" }, { value: 2, label: "all.tip86" }],
      choiceList: [{ value: 1, label: "all.tip87" }, { value: 2, label: "all.tip86" }],
      gameList: {
        gameType: 1,
        gameName: 1,
        round: 10,
        timming: 60,
        credits: 1,
        parityPlay: 2,
        choice: 2
      },
      idDisabled: true,
      oldValue: {},
      // 因为后端返回null 所以下拉框组件选择时候有问题。所以创建此对象
      stageGameOption: {
        gameIn: 1,
        gameOut: 1,
        freezeOption: 1,
        bull: 1,
        outTips: 1,
        inCriteria: 2,
        outCriteria: 2,
        overkill: 1,
        scoreGap: 200
      },
      stage: {
        divisionId: "",
        name: "",
        description: "",
        startTime: "",
        endTime: "",
        isDefaultdivision: 1,
        gameList: [],
        stageId: ""
      },
      gameTypeList: [{ value: 1, label: "all.tip395" }, { value: 2, label: "all.tip494" }, { value: 3, label: "all.tip495" }, { value: 4, label: "all.tip496" }],
      gameNameList: [
        { value: 1, label: "all.tip499" },
        { value: 2, label: "all.tip500" },
        { value: 3, label: "all.tip501" },
        { value: 4, label: "all.tip502" },
        { value: 5, label: "all.tip503" },
        { value: 6, label: "all.tip504" }
      ],
      stageGameData: [],
      saveGameList: [],
      setList: [],
      allGameNameList: [
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
      numFight: 0
    };
  },
  watch: {
    idDisabled(newValue) {
      debugger;
      if (newValue) {
        this.setUpStageData(this.$route.query.parentId);
      } else {
        debugger;
        if (this.oldValue.gameIn) {
          this.stageGameOption = this.oldValue;
        } else {
          this.stageGameOption = {
            gameIn: 1,
            gameOut: 1,
            freezeOption: 1,
            bull: 1,
            outTips: 1,
            inCriteria: 2,
            outCriteria: 2,
            overkill: 1,
            scoreGap: 200
          };
        }
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.setData(to.query.id);
    next();
  },
  beforeRouteLeave(to, from, next) {
    // const id = this.$route.query.id;
    // changeCurrentObj(id, 'stage', window.treeList, this.stage);
    next();
  },
  mounted() {
    const id = this.$route.query.id;
    this.stage.divisionId = this.$route.query.parentId;
    this.getSetList();
    if (id) {
      this.setData(id);
    }
    if (this.$route.query.parentId) {
      this.setUpStageData(this.$route.query.parentId);
    }
    this.getCopyList();
  },
  methods: {
    getCopyList() {
      const id = sessionStorage.getItem("competitionId");
      const data = {
        competitionId: id,
        stageName: this.copyName
      };
      this.$axios.post("/getcompetitionstage", this.$qs.stringify(data)).then(res => {
        if (res.data.data) {
          this.copyBoxData = res.data.data.map(i => ({ ...i, number: "" }));
        }
      });
    },
    findGameMode(value) {
      let label = "";
      switch (value) {
        case 1:
          label = "all.tip200";
          break;
        case 2:
          label = "all.tip201";
          break;
        case 3:
          label = "all.tip202";
          break;
        case 4:
          label = "all.tip203";
          break;
        case 5:
          label = "all.tip204";
          break;
        default:
          label = "all.tip205";
          break;
      }
      return label;
    },
    setUpStageData(id) {
      const vm = this;
      this.$axios.post(`/getdivisionbyid?id=${id}`).then(res => {
        debugger;
        if (res.data.data) {
          vm.stageGameOption = res.data.data;
        }
      });
    },
    findName(nameList, value) {
      let label = "";
      nameList.forEach(i => {
        if (i.value === value) {
          label = i.label;
        }
      });
      return label;
    },
    setData(id) {
      const vm = this;
      this.$axios.post(`/getstage?id=${id}`).then(res => {
        if (res.data.data) {
          vm.stage = res.data.data.stage;
          vm.numFight = res.data.data.numFight;
          vm.idDisabled = res.data.data.stage.isDefaultdivision === 1;
          vm.saveGameList = res.data.data.gameList;
          vm.stageGameData = [];
          if (sessionStorage.getItem("time")) {
            const { begin, end } = JSON.parse(sessionStorage.getItem("time"));
            vm.stage.startTime = vm.stage.startTime ? vm.stage.startTime : begin;
            vm.stage.endTime = vm.stage.endTime ? vm.stage.endTime : end;
          }
          res.data.data.gameList.forEach(i => {
            const obj = {};
            for (const [key, value] of Object.entries(i)) {
              if (key === "gameType") {
                obj[key] = vm.$t(vm.findName(vm.gameTypeList, value));
              } else if (key === "gameName") {
                obj[key] = vm.$t(vm.findName(vm.allGameNameList, value));
              } else if (key === "round") {
                obj[key] = vm.$t(vm.findName(vm.roundList, value));
              } else if (key === "credits") {
                obj[key] = vm.$t(vm.findName(vm.creditsList, value));
              } else if (key === "parityPlay") {
                obj[key] = vm.$t(vm.findName(vm.parityPlayList, value));
              } else if (key === "stageGameId") {
                obj[key] = value;
              } else {
                obj[key] = vm.$t(vm.findName(vm.choiceList, value));
              }
            }
            vm.stageGameData.push(obj);
          });
          // 保存当前阶段的数据
          vm.oldValue = res.data.data.stageGameOption;
          if (!res.data.data.stageGameOption.gameIn) {
            vm.stageGameOption = {
              gameIn: 1,
              gameOut: 1,
              freezeOption: 1,
              bull: 1,
              outTips: 1,
              inCriteria: 2,
              outCriteria: 2,
              overkill: 1,
              scoreGap: 200
            };
          } else {
            vm.stageGameOption = res.data.data.stageGameOption;
          }
          changeCurrentObj(id, "stage", this.$store.state.menuList, this.stage);
        }
      });
    },
    getSetList() {
      const vm = this;
      const stageId = this.$route.query.id;
      this.$axios.post("/setList", vm.$qs.stringify({ stageId })).then(res => {
        vm.setList = res.data.data;
      });
    },
    dateChange(data) {
      const { begin, end } = JSON.parse(sessionStorage.getItem("time"));
      if (data && data > new Date(end)) {
        console.log(begin);
        this.$message(this.$t("all.tip569"));
        this.stage.endTime = "";
      }
    },
    Save() {
      const vm = this;
      let href = "";
      const id = this.$route.query.id;
      // if (!vm.stage.gameList) {
      // vm.stage.gameList = [];
      vm.stage.gameList = this.saveGameList;
      // }
      if (id || this.isCurrentSave) {
        href = "updatestage";
        this.stage.stageId = id || this.isCurrentSave;
      } else {
        href = "addstage";
      }
      // eslint-disable-next-line no-unused-expressions
      vm.idDisabled ? (vm.stage.isDefaultdivision = 1) : (vm.stage.isDefaultdivision = 2);
      this.stage.stageGameOption = this.stageGameOption;
      const saveMethods = () => {
        this.$axios.post(`/${href}`, vm.stage).then(res => {
          if (res.data.data) {
            const url = "stage";
            let item = {};
            let type = "";
            vm.$message({
              message: res.data.msg
            });
            if (res.data.data && !res.data.errorCode) {
              for (const value of Object.values(res.data.data)) {
                type = `${value}`;
              }
              vm.isCurrentSave = type;
              item = {
                label: vm.stage.name,
                id: type,
                url
              };
            }
            vm.isCurrentSave = type;
            debugger;
            this.$store.commit("changeMenuList", changeMenus(vm.$store.state.menuList, id, item));
            // changeMenus(this.$store.state.menuList, id, item, vm);
            // 修改stage之后把此stage下的set删除;
            // vm.getList();
            if (type) {
              changeHash(window.location.hash, "stage", type);
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
      if (href === "updatestage" && vm.numFight) {
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
    gameTypeChange(value) {
      switch (value) {
        case 1:
          this.gameNameList = [
            { value: 1, label: "all.tip499" },
            { value: 2, label: "all.tip500" },
            { value: 3, label: "all.tip501" },
            { value: 4, label: "all.tip502" }
            // { value: 5, label: 'all.tip503' },
            // { value: 6, label: 'all.tip504' }
          ];
          this.gameList.gameName = 1;
          this.gameList.round = 10;
          break;
        case 2:
          this.gameNameList = [{ value: 5, label: "all.tip505" }, { value: 6, label: "all.tip506" }];
          this.gameList.gameName = 5;
          this.gameList.round = 20;
          break;
        case 3:
          this.gameNameList = [{ value: 7, label: "all.tip507" }, { value: 8, label: "all.tip508" }];
          this.gameList.gameName = 7;
          this.gameList.round = 8;
          break;
        default:
          this.gameNameList = [{ value: 9, label: "all.tip509" }, { value: 10, label: "all.tip177" }, { value: 11, label: "all.tip554" }, { value: 12, label: "all.tip555" }];
          this.gameList.gameName = 9;
          this.gameList.round = 9;
          break;
      }
    },
    gameSubtypeChange(value) {
      switch (value) {
        case 1:
          this.gameList.round = 10;
          this.showTimming = false;
          break;
        case 2:
        case 3:
          this.gameList.round = 15;
          this.showTimming = false;
          break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
          this.gameList.round = 20;
          this.showTimming = false;
          break;
        case 9:
        case 12:
        case 13:
        case 14:
          this.gameList.round = 8;
          this.showTimming = false;
          break;
        case 10:
          this.showTimming = true;
          break;
        default:
          this.gameList.round = 9;
          this.showTimming = false;
          break;
      }
    },
    findLabel(obj, type, ContrastList) {
      let label = "";
      for (const [key, value] of Object.entries(obj)) {
        // eslint-disable-next-line no-loop-func
        ContrastList.forEach(j => {
          if (key === type && value === j.value) {
            label = j.label;
          }
        });
      }
      return label;
    },
    Create() {
      const obj = {
        gameType: this.$t(this.findLabel(this.gameList, "gameType", this.gameTypeList)),
        gameName: this.$t(this.findLabel(this.gameList, "gameName", this.gameNameList)),
        round: this.$t(this.findLabel(this.gameList, "round", this.roundList)),
        credits: this.$t(this.findLabel(this.gameList, "credits", this.creditsList)),
        parityPlay: this.$t(this.findLabel(this.gameList, "parityPlay", this.parityPlayList)),
        choice: this.$t(this.findLabel(this.gameList, "choice", this.choiceList)),
        stageGameId: ""
      };
      const saveObj = {
        gameType: this.gameList.gameType,
        gameName: this.gameList.gameName,
        round: this.gameList.round,
        credits: this.gameList.credits,
        parityPlay: this.gameList.parityPlay,
        choice: this.gameList.choice
      };
      const Dobj = {
        gameType: this.gameList.gameType,
        gameName: this.gameList.gameName,
        round: this.gameList.round,
        credits: this.gameList.credits,
        parityPlay: this.gameList.parityPlay,
        choice: this.gameList.choice,
        stageId: this.$route.query.id
      };
      if (this.showTimming) {
        obj.round = `${this.gameList.timming}S`;
      }
      this.$axios.post("/addstagegame", Dobj).then(res => {
        if (!res.data.errorCode) {
          const flag = this.saveGameList.every(i => i.gameName !== saveObj.gameName);
          if (flag) {
            obj.stageGameId = res.data.data;
            this.saveGameList.push(saveObj);
            this.stageGameData.push(obj);
            this.stage.gameList = this.saveGameList;
          }
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    Delete(index, id) {
      this.$axios.post(`/deletegame?stageGameId=${id}`).then(res => {
        if (res.data.errorCode) {
          this.$message(res.data.msg);
        } else {
          this.stageGameData.splice(index, 1);
          this.saveGameList.splice(index, 1);
        }
      });
    },
    CopyFrom() {
      this.copyBox = true;
    },
    Search() {
      this.getCopyList();
    },
    Add() {
      const copyNumber = this.copyBoxData.find(i => i.stageId === this.copyRadio).number;
      const data = {
        divisionId: this.$route.query.parentId,
        stageId: this.copyRadio,
        number: Number(copyNumber)
      };
      this.$axios.post("/copystage", this.$qs.stringify(data)).then(res => {
        this.$message(res.data.msg);
        // this.getList();
      });
      this.copyBox = false;
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
</style>
