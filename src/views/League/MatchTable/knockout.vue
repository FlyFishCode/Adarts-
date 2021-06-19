<template>
  <div class="content">
    <el-row class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">{{ $t("all.tip1") }}</el-col>
        <el-col :span="21" class="overFlowStyle">{{ competition }}</el-col>
      </el-row>
    </el-row>
    <el-row>
      <el-col class="title-g">{{ $t("all.tip276") }}</el-col>
    </el-row>
    <div class="box">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">{{ $t("all.tip270") }}</el-col>
        <el-col :span="4" id="divBoxWidth">
          <el-select v-model="knockoutVO.Agent" :placeholder="$t('all.tip516')">
            <el-option :value="1" :label="$t('all.tip449')"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="knockoutVO.Competition" clearable :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col class="label-g" :span="2">{{ $t("all.tip226") }}</el-col>
        <el-col :span="2">
          <el-input v-model="knockoutVO.Competition" clearable :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col class="label-g" :span="1">{{ $t("all.tip541") }}</el-col>
        <el-col :span="2">
          <el-input v-model="knockoutVO.Competition" clearable :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col class="label-g" :span="1">{{ $t("all.tip107") }}</el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">{{ $t("all.tip243") }}</el-col>
        <el-col :span="4" id="divBoxWidth" class="lineClass">
          <el-button type="primary" size="mini" @click="AddCompetitior">{{ $t("all.tip483") }}</el-button>
        </el-col>
        <el-col :span="4" class="lineClass">
          <div class="showTopBox" @click="showCompetitiorList">{{ `Compertitor(${compertitorList.length})` }}</div>
        </el-col>
      </el-row>
      <el-row class="center-Row" v-if="isKnockout === 1">
        <el-col class="label-g" :span="3">{{ $t("all.tip566") }}</el-col>
        <el-col class="label-g" :span="2">{{ $t("all.tip51") }}</el-col>
        <el-col :span="4" id="divBoxWidth">
          <el-select v-model="knockoutVO.Agent" :placeholder="$t('all.tip516')">
            <el-option value="1" :label="$t('all.tip484')"></el-option>
            <el-option value="2" :label="$t('all.tip485')"></el-option>
            <el-option value="3" :label="$t('all.ti102')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="2">{{ $t("all.tip52") }}</el-col>
        <el-col :span="4" id="divBoxWidth">
          <el-select v-model="knockoutVO.Agent" :placeholder="$t('all.tip516')">
            <el-option value="1" :label="$t('all.tip484')"></el-option>
            <el-option value="2" :label="$t('all.tip485')"></el-option>
            <el-option value="3" :label="$t('all.ti102')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="2">{{ $t("all.tip21") }}</el-col>
        <el-col :span="4" id="divBoxWidth">
          <el-select v-model="knockoutVO.Agent" :placeholder="$t('all.tip516')">
            <el-option value="1" :label="$t('all.tip484')"></el-option>
            <el-option value="2" :label="$t('all.tip485')"></el-option>
            <el-option value="3" :label="$t('all.ti102')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">{{ $t("all.tip278") }}</el-col>
        <el-col :span="4" id="divBoxWidth">
          <el-select v-model="knockoutVO.Agent" :placeholder="$t('all.tip516')">
            <el-option value="1" :label="$t('all.tip484')"></el-option>
            <el-option value="2" :label="$t('all.tip485')"></el-option>
            <el-option value="3" :label="$t('all.ti102')"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="knockoutVO.Competition" clearable :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col class="label-g" :span="3">{{ $t("all.tip279") }}</el-col>
        <el-col :span="4" id="divBoxWidth">
          <el-select v-model="knockoutVO.type" :placeholder="$t('all.tip516')">
            <el-option :value="1" :label="$t('all.tip519')"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="knockoutVO.Competition" clearable :placeholder="$t('all.tip38')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">{{ $t("all.tip281") }}</el-col>
        <el-col :span="4" id="divBoxWidth">
          <el-select v-model="knockoutVO.DayType" :placeholder="$t('all.tip516')" @change="DayTypeChange">
            <el-option :value="1" :label="$t('all.tip487')"></el-option>
            <el-option :value="2" :label="$t('all.tip488')"></el-option>
            <el-option :value="3" :label="$t('all.tip0')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">{{ $t("all.tip282") }}</el-col>
        <el-col :span="4" id="divBoxWidth">
          <el-select v-model="knockoutVO.Agent" :placeholder="$t('all.tip516')">
            <el-option value="1" :label="$t('all.tip87')"></el-option>
            <el-option value="2" :label="$t('all.tip86')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">{{ $t("all.tip283") }}</el-col>
        <el-col :span="2" class="lineClass">
          <el-checkbox v-model="knockoutVO.isSun">{{ $t("all.tip302") }}</el-checkbox>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-checkbox v-model="knockoutVO.isMon">{{ $t("all.tip303") }}</el-checkbox>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-checkbox v-model="knockoutVO.isTue">{{ $t("all.tip304") }}</el-checkbox>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-checkbox v-model="knockoutVO.isWed">{{ $t("all.tip305") }}</el-checkbox>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-checkbox v-model="knockoutVO.isThu">{{ $t("all.tip306") }}</el-checkbox>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-checkbox v-model="knockoutVO.isFri">{{ $t("all.tip307") }}</el-checkbox>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-checkbox v-model="knockoutVO.isSat">{{ $t("all.tip308") }}</el-checkbox>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="2">{{ $t("all.tip284") }}</el-col>
        <el-col class="label-g" :span="1">{{ $t("all.tip285") }}</el-col>
        <el-col :span="2">
          <el-select v-model="knockoutVO.hour" :placeholder="$t('all.tip516')">
            <el-option v-for="item in HourArr" :key="item.index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="1">{{ $t("all.tip286") }}</el-col>
        <el-col :span="2">
          <el-select v-model="knockoutVO.minute" :placeholder="$t('all.tip516')">
            <el-option v-for="item in MinuteArr" :key="item.index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">{{ $t("all.tip287") }}</el-col>
        <el-col :span="4">
          <el-input v-model="knockoutVO.Competition" clearable :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col :span="4" id="divBoxWidth" class="lineClass">
          <el-button type="primary" size="mini" @click="createAgainstPlan">{{ $t("all.tip16") }}</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="AgainstPlan">
      <!-- <el-row>
        <el-col :span="1" class="tabsTitle Finished">{{ $t("all.tip333") }}</el-col>
        <el-col :span="1" class="tabsTitle InPlay">{{ $t("all.tip288") }}</el-col>
        <el-col :span="1" class="tabsTitle Ready">{{ $t("all.tip334") }}</el-col>
      </el-row>-->
      <el-col v-if="showLeftBox" id="leftBox">
        <!-- <el-col :span="3" v-for="item in this.leftDivNums" :key="item.index">
          <div :class="`divBox AgainstPlanLeft${item}`"></div>
        </el-col>-->
      </el-col>
      <el-col v-if="showLeftBox && showRightBox" :span="2" style="width:100px">
        <div class="winer">
          <div class="winer">{{ "冠军" }}</div>
          <div class="winerBox"></div>
        </div>
      </el-col>
      <el-col v-if="showRightBox" id="rightBox">
        <!-- <el-col :span="3" v-for="item in this.rightDivNums" :key="item.index">
          <div :class="`divBox AgainstPlanright${item}`"></div>
        </el-col>-->
      </el-col>
    </el-row>
    <el-dialog :title="$t('all.tip483')" :visible.sync="AddCompetitiorTopBox" top="10vh">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">{{ $t("all.tip315") }}</el-col>
        <el-col :span="4">
          <el-input v-model="knockoutVO.Competition" clearable :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col class="label-g" :span="3">{{ $t("all.tip316") }}</el-col>
        <el-col :span="4">
          <el-input v-model="knockoutVO.Competition" clearable :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col class="label-g" :span="3">{{ $t("all.tip455") }}</el-col>
        <el-col :span="4">
          <el-input v-model="knockoutVO.Competition" clearable :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col :span="3" class="lineClass">
          <el-button size="mini" @click="AddCompetitiorTopBoxSearch" type="primary">{{ $t("all.tip10") }}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <hr />
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">{{ $t("all.tip51") }}</el-col>
        <el-col :span="4">
          <el-select v-model="TopBox.categoryId" :placeholder="$t('all.tip516')" clearable @change="categoryChange">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">{{ $t("all.tip52") }}</el-col>
        <el-col :span="4">
          <el-select v-model="TopBox.divisionId" :placeholder="$t('all.tip516')" clearable @change="divisionChange">
            <el-option v-for="item in divisionList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">{{ $t("all.tip21") }}</el-col>
        <el-col :span="4">
          <el-select v-model="TopBox.stageId" :placeholder="$t('all.tip516')" clearable>
            <el-option v-for="item in stageList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <div class="dialogTable">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="Continent" :label="$t('all.tip214')" min-width="5%"></el-table-column>
          <el-table-column prop="Continent" :label="$t('all.tip567')" min-width="5%"></el-table-column>
          <el-table-column prop="Continent" :label="$t('all.tip244')" min-width="5%"></el-table-column>
          <el-table-column prop="Continent" :label="$t('all.tip455')" min-width="5%"></el-table-column>
          <el-table-column prop="Country" :label="$t('all.tip269')" min-width="5%"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="DialogButton">
        <el-button size="mini" @click="Assign" type="primary">{{ $t("all.tip64") }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('all.tip570')" :visible.sync="CompetitiorListTopBox">
      <div class="dialogTable">
        <el-table :data="compertitorList" border style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="Continent" :label="$t('all.tip214')" min-width="5%"></el-table-column>
          <el-table-column prop="Continent" :label="$t('all.tip567')" min-width="5%"></el-table-column>
          <el-table-column prop="Continent" :label="$t('all.tip316')" min-width="5%"></el-table-column>
          <el-table-column prop="Continent" :label="$t('all.tip455')" min-width="5%"></el-table-column>
          <el-table-column prop="Continent" :label="$t('all.tip269')" min-width="5%"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="DialogButton">
        <el-button size="mini" @click="remove" type="primary">{{ $t("all.tip134") }}</el-button>
      </div>
    </el-dialog>
    <!--  点击查看比赛详情 -->
    <div id="topBox">
      <el-dialog :title="$t('all.tip384')" :visible.sync="MatchingTableTopBox">
        <div class="dialogTable">
          <el-table :data="MatchingTableList" border style="width: 100%" :span-method="arraySpanMethod">
            <el-table-column prop="photo" :label="$t('all.tip323')" min-width="5%">
              <el-table-column min-width="6%">
                <template slot-scope="scope">
                  <div v-if="scope.row.photo">
                    <div class="formImgBox">
                      <img src="../../../assets/img/team.jpg" alt />
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column min-width="6%">
                <template slot-scope="scope">
                  <div>{{ scope.row.homePlace }}</div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="name" :label="$t('all.tip42')" min-width="6%">
              <template slot-scope="scope">
                <div v-if="scope.row.title">
                  <div v-for="item in scope.row.title" :key="item.index">{{ item }}</div>
                </div>
                <div v-else>{{ $t(scope.row.label) }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="description" :label="$t('all.tip326')" min-width="6%">
              <el-table-column min-width="6%">
                <template slot-scope="scope">
                  <div>{{ scope.row.awayPlace }}</div>
                </template>
              </el-table-column>
              <el-table-column min-width="6%">
                <template slot-scope="scope">
                  <div v-if="scope.row.photo">
                    <div class="formImgBox">
                      <img src="../../../assets/img/team.jpg" alt />
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <el-row>
          <el-col class="label-g" :span="3">{{ $t("all.tip299") }}</el-col>
          <el-col :span="20" class="timeStyle">{{ timeDate }}</el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  data() {
    return {
      AddCompetitiorTopBox: false,
      CompetitiorListTopBox: false,
      MatchingTableTopBox: false,
      MatchingTableList: [],
      timeDate: "",
      isKnockout: 1,
      matchNum: 0,
      leftDivNums: [],
      rightDivNums: [],
      isOddNumber: false,
      showLeftBox: false,
      showRightBox: false,
      competition: "",
      TopBox: {
        categoryId: "",
        divisionId: "",
        stageId: ""
      },
      knockoutVO: {
        type: 1,
        Agent: 1,
        DayType: 1,
        isMon: true,
        isTue: true,
        isWed: true,
        isThu: true,
        isFri: true,
        isSat: "",
        isSun: "",
        hour: 1,
        minute: 1
      },
      HourArr: [
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
        { label: "20", value: 20 },
        { label: "21", value: 21 },
        { label: "22", value: 22 },
        { label: "23", value: 23 },
        { label: "24", value: 24 }
      ],
      MinuteArr: [
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
        { label: "59", value: 59 }
      ],
      compertitorList: [],
      tableData: [],
      categoryList: [],
      divisionList: [],
      stageList: [],
      leftData: []
    };
  },
  mounted() {
    if (this.$route.query.data) {
      const data = JSON.parse(this.$route.query.data);
      this.competition = data.competitionName;
      this.isKnockout = data.isKnockout;
      this.getSelectList(data.id);
    }
    this.getData();
  },
  methods: {
    DayTypeChange(value) {
      switch (value) {
        case 1:
          this.knockoutVO.isMon = true;
          this.knockoutVO.isTue = true;
          this.knockoutVO.isWed = true;
          this.knockoutVO.isThu = true;
          this.knockoutVO.isFri = true;
          this.knockoutVO.isSat = false;
          this.knockoutVO.isSun = false;
          break;
        case 2:
          this.knockoutVO.isMon = false;
          this.knockoutVO.isTue = false;
          this.knockoutVO.isWed = false;
          this.knockoutVO.isThu = false;
          this.knockoutVO.isFri = false;
          this.knockoutVO.isSat = true;
          this.knockoutVO.isSun = true;
          break;
        default:
          break;
      }
    },
    AddCompetitior() {
      this.AddCompetitiorTopBox = true;
    },
    AddCompetitiorTopBoxSearch() {},
    Assign() {
      // 分配玩家
      this.AddCompetitiorTopBox = false;
    },
    remove() {
      // 删除玩家
      this.CompetitiorListTopBox = false;
    },
    showCompetitiorList() {
      this.CompetitiorListTopBox = true;
    },
    getData() {
      this.leftData = {
        name: "2020-7-31",
        value: 14,
        state: 1,
        children: [
          {
            name: "2020-7-31",
            value: 12,
            state: 2,
            children: [
              {
                name: "2020-7-31",
                value: 8,
                children: [
                  {
                    name: "2020-7-31",
                    value: 1,
                    state: 3
                  },
                  {
                    name: "2020-7-32",
                    value: 2,
                    state: 1
                  }
                ]
              },
              {
                name: "2020-7-31",
                value: 9,
                children: [
                  {
                    name: "2020-7-33",
                    value: 3,
                    state: 1
                  },
                  {
                    name: "2020-7-34",
                    value: 4,
                    state: 2
                  }
                ]
              }
            ]
          },
          {
            name: "2020-7-31",
            value: 13,
            children: [
              {
                name: "2020-7-31",
                value: 10,
                children: [
                  {
                    name: "2020-7-35",
                    value: 5,
                    state: 1
                  },
                  {
                    name: "2020-7-36",
                    value: 6,
                    state: 2
                  }
                ]
              },
              {
                name: "2020-7-31",
                value: 11,
                children: [
                  {
                    name: "2020-7-37",
                    value: 7,
                    state: 3
                  },
                  {
                    name: "Bye",
                    value: 17,
                    state: null
                  }
                ]
              }
            ]
          }
        ]
      };
    },
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (rowIndex > 0) {
        if (columnIndex === 0) {
          return [0, 0];
        }
        if (columnIndex === 1) {
          return [1, 2];
        }
        if (columnIndex === 3) {
          return [1, 2];
        }
        return [1, 1];
      }
      return [1, 1];
    },
    createAgainstPlan() {
      this.showLeftBox = true;
      this.showRightBox = true;
      this.$nextTick(() => {
        const leftDiv = document.getElementById("leftBox");
        const rightDiv = document.getElementById("rightBox");
        const leftEchars = echarts.init(leftDiv);
        const rightEchars = echarts.init(rightDiv);
        leftEchars.setOption({
          series: [
            {
              type: "tree",
              data: [this.leftData],
              top: "0%",
              right: "20%",
              bottom: "0%",
              edgeShape: "polyline",
              edgeForkPosition: "50%",
              label: {
                position: "inside",
                show: true,
                normal: {
                  formatter: params => `{seedNo|${params.value}}${params.data.name}\n{hr|}{matchNum|${params.data.value}}\n{seedNo|${params.value}}`,
                  backgroundColor: "#eee",
                  rich: {
                    hr: {
                      borderColor: "#aaa",
                      width: 98,
                      borderWidth: 1,
                      height: 1
                    },
                    matchNum: {
                      fontWeight: "bold",
                      color: "blue"
                    },
                    seedNo: {
                      color: "#fff",
                      backgroundColor: "#000",
                      height: 14,
                      width: 14,
                      borderRadius: 14,
                      padding: [4, 4]
                    }
                  }
                }
              },
              symbol: "rect",
              orient: "RL",
              width: "50%",
              symbolSize: [90, 50],
              lineStyle: {
                curveness: 0
              },
              initialTreeDepth: undefined,
              expandAndCollapse: false
            }
          ],
          tooltip: {
            trigger: "item",
            triggerOn: "click",
            formatter: params => {
              console.log(params.data.value);
              this.MatchingTableTopBox = true;
              // this.$axios.post('/').then(res => {
              //   console.log(res);
              // });
            }
          }
        });
        rightEchars.setOption({
          series: [
            {
              type: "tree",
              data: [this.leftData],
              top: "0%",
              left: "20%",
              bottom: "0%",
              edgeShape: "polyline",
              edgeForkPosition: "50%",
              label: {
                position: "inside",
                show: true,
                normal: {
                  formatter: params => `{seedNo|${params.value}}${params.data.name}\n{hr|}{matchNum|${params.data.value}}\n{seedNo|${params.value}}`,
                  backgroundColor: "#eee",
                  rich: {
                    hr: {
                      borderColor: "#aaa",
                      width: 98,
                      borderWidth: 1,
                      height: 1
                    },
                    matchNum: {
                      fontWeight: "bold",
                      color: "blue"
                    },
                    seedNo: {
                      color: "#fff",
                      backgroundColor: "#000",
                      height: 14,
                      width: 14,
                      borderRadius: 14,
                      padding: [4, 4]
                    }
                  }
                }
              },
              symbol: "rect",
              orient: "LR",
              width: "50%",
              symbolSize: [90, 50],
              initialTreeDepth: undefined,
              expandAndCollapse: false
            }
          ],
          tooltip: {
            trigger: "item",
            triggerOn: "click",
            formatter: params => {
              console.log(params.data.value);
              this.MatchingTableTopBox = true;
              this.$axios.get(`/matchTable/getHomeAndVisitingFightINfo?confInfoId=${params.data.value}`).then(() => {
                // if (res.data.data) {
                this.MatchingTableList = [];
                for (let j = 0; j < 7; j += 1) {
                  const obj = {};
                  switch (j) {
                    case 0:
                      obj.id = params.data.value;
                      obj.photo = true;
                      obj.title = ["Set Point", "Winning Point", "Penalty Point"];
                      obj.homelist = "";
                      obj.awaylist = "";
                      obj.teamName = "";
                      obj.awayName = "";
                      break;
                    case 1:
                      obj.label = "all.tip316";
                      obj.homeCaptainName = "";
                      obj.awayCaptainName = "";
                      break;
                    case 2:
                      obj.label = "all.tip246";
                      obj.button = "1";
                      break;
                    case 3:
                      obj.label = "all.tip215";
                      obj.select = "1";
                      obj.homePlayShopId = "";
                      obj.awayPlayShopId = "";
                      break;
                    case 4:
                      obj.label = "all.tip574";
                      obj.homeMachine = "";
                      obj.awayMachine = "";
                      break;
                    case 5:
                      obj.label = "all.tip25";
                      obj.homeForceAttend = "";
                      obj.awayForceAttend = "";
                      break;
                    default:
                      obj.label = "all.tip573";
                      obj.homePlayerChange = "";
                      obj.awayPlayerChange = "";
                      break;
                  }
                  console.log(obj);
                  if (Object.keys(obj).length > 0) {
                    this.MatchingTableList.push(obj);
                  }
                }
              });
            }
          }
        });
        this.changeSize(leftDiv, leftEchars);
        this.changeSize(rightDiv, rightEchars);
      });
    },
    changeSize(div, myChart) {
      let allNode = 0;
      const box = div;
      // eslint-disable-next-line no-underscore-dangle
      const nodes = myChart._chartsViews[0]._data._graphicEls;
      for (let i = 0, count = nodes.length; i < count; i += 1) {
        const node = nodes[i];
        // eslint-disable-next-line no-continue
        if (node === undefined) continue;
        allNode += 1;
      }
      const height = window.innerHeight;
      const currentHeight = 50 * allNode;
      const newWidth = Math.max(currentHeight, height);
      box.style.width = `${window.innerWidth / 2.5}px`;
      box.style.height = `${newWidth}px`;
      myChart.resize();
    },
    getSelectList(id) {
      this.$axios.post(`/allsubset?competitionId=${id}`).then(res => {
        this.findObj(res.data.data);
      });
    },
    findObj(list) {
      const vm = this;
      list.forEach(i => {
        const Cobj = {
          label: "",
          id: ""
        };
        if (i.url === "category") {
          Cobj.label = i.label;
          Cobj.id = i.id;
          vm.categoryList.push(Cobj);
          i.children.forEach(j => {
            const Dobj = {
              label: "",
              id: ""
            };
            if (j.url === "division") {
              Dobj.label = j.label;
              Dobj.id = j.id;
              vm.divisionList.push(Dobj);
              j.children.forEach(k => {
                const Sobj = {
                  label: "",
                  id: ""
                };
                if (k.url === "stage") {
                  Sobj.label = k.label;
                  Sobj.id = k.id;
                  vm.stageList.push(Sobj);
                }
              });
            }
          });
        } else {
          // eslint-disable-next-line no-unused-expressions
          i.children && this.findObj(i.children);
        }
      });
    },
    categoryChange() {
      this.TopBox.divisionId = "";
      this.TopBox.stageId = "";
    },
    divisionChange() {
      this.TopBox.stageId = "";
    }
  }
};
</script>
<style scoped>
.content {
  border: 1px solid #eeeeee;
}
.showTopBox {
  color: #1890ff;
  cursor: pointer;
}
.el-table >>> td,
.el-table >>> th {
  text-align: center;
}
.AgainstPlan {
  border: 1px solid red;
  padding: 5px;
}
.tabsTitle {
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #eee;
  margin: 0 5px;
}
.Finished {
  background: #f56c6c;
}
.InPlay {
  background: #409eff;
}
.Ready {
  color: black;
  border: 1px solid #000;
}
.winer {
  text-align: center;
}
.dialogTable {
  height: 500px;
  overflow-y: auto;
}
.formImgBox {
  width: 80px;
  margin: 0 auto;
}
.winerBox {
  height: 50px;
  border: 1px solid #666;
}
</style>
