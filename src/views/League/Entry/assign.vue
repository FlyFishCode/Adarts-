<template>
  <div class="content">
    <div class="search">
      <el-row class="center-Row">
        <el-col :span="2" class="label-g">
          {{ $t("all.tip3") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle lineClass">
          {{ AssignVO.Detial.competitionName }}
        </el-col>
        <el-col :span="2" class="label-g">
          {{ $t("all.tip6") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle lineClass">
          <div v-if="AssignVO.Detial.status === 1">{{ $t("all.tip26") }}</div>
          <div v-if="AssignVO.Detial.status === 2">{{ $t("all.tip27") }}</div>
          <div v-if="AssignVO.Detial.status === 3">{{ $t("all.tip28") }}</div>
        </el-col>
        <el-col :span="2" class="label-g">
          {{ $t("all.tip4") }}
        </el-col>
        <el-col :span="9" class="overFlowStyle lineClass">
          {{ AssignVO.Detial.area }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col :span="2" class="label-g">
          {{ $t("all.tip5") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle lineClass">
          {{ AssignVO.Detial.type === 1 ? $t("all.tip40") : $t("all.tip41") }}
        </el-col>
        <el-col :span="2" class="label-g">
          {{ $t("all.tip7") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle lineClass"> {{ AssignVO.Detial.competitionStartPeriod }}-{{ AssignVO.Detial.competitionEndPeriod }} </el-col>
        <el-col :span="2" class="label-g">
          {{ $t("all.tip56") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle lineClass"> {{ AssignVO.Detial.entryStartPeriod }}-{{ AssignVO.Detial.entryEndPeriod }} </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="2" class="label-g lineClass">
        {{ $t("all.tip51") }}
      </el-col>
      <el-col :span="2" class="lineClass">
        {{ detial.categoryCount }}
      </el-col>
      <el-col :span="2" class="label-g lineClass">
        {{ $t("all.tip52") }}
      </el-col>
      <el-col :span="2" class="lineClass">
        {{ detial.divisionCount }}
      </el-col>
      <el-col :span="2" class="label-g lineClass">
        {{ $t("all.tip21") }}
      </el-col>
      <el-col :span="2" class="lineClass">
        {{ detial.stageCount }}
      </el-col>
      <el-col :span="2" class="lineClass">
        <el-button type="primary" size="mini" @click="stageAssign">{{ $t("all.tip265") }}</el-button>
      </el-col>
    </el-row>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column :label="$t('all.tip51')" min-width="5%">
          <div slot-scope="scope" class="tableStyle">
            <div class="tableLink" @click="divClick(scope.row, '1', scope.$index)">{{ `${scope.row.categoryName}(${scope.row.categoryTeamCount})` }}</div>
            <el-button size="mini" type="primary" @click="TableAssign(scope.row, '1')">{{ $t("all.tip264") }}</el-button>
          </div>
        </el-table-column>
        <el-table-column :label="$t('all.tip52')" min-width="5%">
          <div slot-scope="scope">
            <div class="tableStyle" v-for="(item, index) in scope.row.competitionDivisionList" :key="item.index" :style="setHeight(item.competitionStageList.length)">
              <div class="tableLink" @click="divClick(scope.row, '2', '', '', index)">{{ `${item.divisionName}(${item.divisionTeamCount})` }}</div>
              <el-button size="mini" type="primary" @click="TableAssign(scope.row, '2', index)">{{ $t("all.tip264") }}</el-button>
            </div>
          </div>
        </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip21')" min-width="5%">
          <div slot-scope="scope">
            <div v-for="(item, index) in scope.row.competitionDivisionList" :key="item.index">
              <div class="tableStyle" v-for="(child, mineIndex) in item.competitionStageList" :key="child.index">
                <div class="tableLink" @click="divClick(scope.row, '3', scope.$index, index, mineIndex)">{{ `${child.stageName}(${child.stageTeamCount})` }}</div>
                <el-button size="mini" type="primary" @click="TableAssign(scope.row, '3', index, mineIndex)">{{ $t("all.tip264") }}</el-button>
              </div>
            </div>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog :title="$t('all.tip266')" :visible.sync="AssignDiologVisible" top="5vh">
        <div class="table">
          <el-table :data="AssignDiologData" border>
            <el-table-column property="categoryName" :label="$t('all.tip51')" min-width="10%"> </el-table-column>
            <el-table-column property="divisionName" :label="$t('all.tip52')" min-width="10%"> </el-table-column>
            <el-table-column property="stageName" :label="$t('all.tip21')" min-width="10%"></el-table-column>
          </el-table>
        </div>
        <el-row class="center-Row">
          <el-col class="label-g" :span="4">
            {{ $t("all.tip315") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="AssignVO.AssignDialog.teamId" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col class="label-g" :span="4">
            {{ $t("all.tip316") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="AssignVO.AssignDialog.teamName" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col class="label-g" :span="4">
            {{ $t("all.tip455") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="AssignVO.AssignDialog.homeShopName" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
        </el-row>
        <el-row class="center-Row">
          <el-col class="label-g" :span="2">
            {{ $t("all.tip154") }}
          </el-col>
          <el-col :span="2">
            <el-input v-model="AssignVO.AssignDialog.rating1" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col :span="0.5" class="lineClass">-</el-col>
          <el-col :span="2">
            <el-input v-model="AssignVO.AssignDialog.rating2" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col class="label-g" :span="2">
            {{ $t("all.tip155") }}
          </el-col>
          <el-col :span="2">
            <el-input v-model="AssignVO.AssignDialog.ppd1" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col :span="0.5" class="lineClass">-</el-col>
          <el-col :span="2">
            <el-input v-model="AssignVO.AssignDialog.ppd2" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col class="label-g" :span="2">
            {{ $t("all.tip156") }}
          </el-col>
          <el-col :span="2">
            <el-input v-model="AssignVO.AssignDialog.mpr1" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col :span="0.5" class="lineClass">-</el-col>
          <el-col :span="2">
            <el-input v-model="AssignVO.AssignDialog.mpr2" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col :span="4" class="lineClass">
            <el-button type="primary" size="mini" @click="AssignDiologSearch">{{ $t("all.tip10") }}</el-button>
          </el-col>
        </el-row>
        <div class="assignDialogTable">
          <el-table :data="AssignDialogTableData" @selection-change="AssignDialogTableDataSelection">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column property="teamName" :label="$t('all.tip244')" min-width="15%"></el-table-column>
            <el-table-column property="homeShopName" :label="$t('all.tip455')" min-width="15%"></el-table-column>
            <el-table-column label="Adarts">
              <el-table-column property="adartsRating" :label="$t('all.tip154')" min-width="10%"></el-table-column>
              <el-table-column property="adartsPPd" :label="$t('all.tip155')" min-width="10%"></el-table-column>
              <el-table-column property="adartsMpr" :label="$t('all.tip156')" min-width="10%"></el-table-column>
            </el-table-column>
            <el-table-column property="address" :label="$t('all.tip1')">
              <el-table-column property="leagueRating" :label="$t('all.tip154')" min-width="10%"></el-table-column>
              <el-table-column property="leaguePPd" :label="$t('all.tip155')" min-width="10%"></el-table-column>
              <el-table-column property="leagueMpr" :label="$t('all.tip156')" min-width="10%"></el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <el-row style="display:flex;justify-content:center">
          <el-col :span="2">
            <el-button type="primary" size="mini" @click="Assign">{{ $t("all.tip264") }}</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="$t('all.tip266')" width="70%" :visible.sync="StageAssignDialog" top="30px">
        <el-row class="center-Row">
          <el-col class="label-g" :span="4">
            {{ $t("all.tip315") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model.number="AssignVO.StageAssignDialog.teamId" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col class="label-g" :span="4">
            {{ $t("all.tip316") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="AssignVO.StageAssignDialog.teamName" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col class="label-g" :span="4">
            {{ $t("all.tip455") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="AssignVO.StageAssignDialog.homeShopName" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
        </el-row>
        <el-row class="center-Row">
          <el-col class="label-g" :span="1">
            {{ $t("all.tip154") }}
          </el-col>
          <el-col :span="3">
            <el-input v-model="AssignVO.StageAssignDialog.rating1" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col :span="0.5" class="lineClass">-</el-col>
          <el-col :span="3">
            <el-input v-model="AssignVO.StageAssignDialog.rating2" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col class="label-g" :span="1">
            {{ $t("all.tip155") }}
          </el-col>
          <el-col :span="3">
            <el-input v-model="AssignVO.StageAssignDialog.ppd1" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col :span="0.5" class="lineClass">-</el-col>
          <el-col :span="3">
            <el-input v-model="AssignVO.StageAssignDialog.ppd2" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col class="label-g" :span="2">
            {{ $t("all.tip156") }}
          </el-col>
          <el-col :span="3">
            <el-input v-model="AssignVO.StageAssignDialog.mpr1" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col :span="0.5" class="lineClass">-</el-col>
          <el-col :span="3">
            <el-input v-model="AssignVO.StageAssignDialog.mpr2" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col :span="1" class="lineClass">
            <el-button type="primary" size="mini" @click="DialogSearch">{{ $t("all.tip10") }}</el-button>
          </el-col>
        </el-row>
        <el-row>
          <hr />
        </el-row>
        <el-row class="center-Row">
          <el-col class="label-g" :span="4">
            {{ $t("all.tip51") }}
          </el-col>
          <el-col :span="4">
            <el-select v-model="AssignVO.StageAssignDialog.categoryId" :placeholder="$t('placeholder.select')" clearable @change="competitionIdChange">
              <el-option v-for="item in categoryList" :key="item.categoryId" :label="item.categoryName" :value="item.categoryId"> </el-option>
            </el-select>
          </el-col>
          <el-col class="label-g" :span="4">
            {{ $t("all.tip52") }}
          </el-col>
          <el-col :span="4">
            <el-select v-model="AssignVO.StageAssignDialog.divisionId" :placeholder="$t('placeholder.select')" clearable @change="categoryIdChange">
              <el-option v-for="item in divisionList" :key="item.divisionId" :label="item.divisionName" :value="item.divisionId"> </el-option>
            </el-select>
          </el-col>
          <el-col class="label-g" :span="4">
            {{ $t("all.tip21") }}
          </el-col>
          <el-col :span="4">
            <el-select v-model="AssignVO.StageAssignDialog.stageId" :placeholder="$t('placeholder.select')" clearable @change="stageIdChange">
              <el-option v-for="item in stageList" :key="item.stageId" :label="item.stageName" :value="item.stageId"> </el-option>
            </el-select>
          </el-col>
        </el-row>
        <div>
          <el-table :data="StageAssignTableData" @selection-change="StageAssignTableSelection">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column property="teamName" :label="$t('all.tip244')" min-width="16%"></el-table-column>
            <el-table-column property="homeShopName" :label="$t('all.tip455')" min-width="16%"></el-table-column>
            <el-table-column property="assignPath" :label="$t('all.tip269')" min-width="15%"></el-table-column>
            <el-table-column label="Adarts">
              <el-table-column property="adartsRating" :label="$t('all.tip154')" min-width="10%"></el-table-column>
              <el-table-column property="adartsPPd" :label="$t('all.tip155')" min-width="10%"></el-table-column>
              <el-table-column property="adartsMpr" :label="$t('all.tip156')" min-width="10%"></el-table-column>
            </el-table-column>
            <el-table-column :label="$t('all.tip1')">
              <el-table-column property="leagueRating" :label="$t('all.tip154')" min-width="10%"></el-table-column>
              <el-table-column property="leaguePPd" :label="$t('all.tip155')" min-width="10%"></el-table-column>
              <el-table-column property="leagueMpr" :label="$t('all.tip156')" min-width="10%"></el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            @size-change="assignDialogSizeChange"
            @current-change="assignDialogCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="assignDialogTotal"
          >
          </el-pagination>
        </div>
        <el-row style="display:flex;justify-content:center">
          <el-col :span="2">
            <el-button type="primary" size="mini" @click="DialogAssign">{{ $t("all.tip264") }}</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { returnType } from "@/components/common/Utils";

export default {
  name: "home",
  components: {},
  data() {
    return {
      AssignDiologVisible: false,
      StageAssignDialog: false,
      SelectionArr: [],
      StageAssignTableSelectionList: [],
      AssignSelectionArr: [],
      categoryList: [],
      divisionList: [],
      stageList: [],
      detial: {
        categoryCount: "",
        divisionCount: "",
        stageCount: ""
      },
      AssignVO: {
        Detial: {
          competitionName: "",
          status: "",
          area: "",
          type: "",
          competitionStartPeriod: "",
          competitionEndPeriod: "",
          entryStartPeriod: "",
          entryEndPeriod: ""
        },
        AssignDialog: {
          teamId: "",
          teamName: "",
          homeShopName: "",
          rating1: "",
          rating2: "",
          ppd1: "",
          ppd2: "",
          mpr1: "",
          mpr2: ""
        },
        StageAssignDialog: {
          competitionId: "",
          categoryId: null,
          divisionId: null,
          stageId: null,
          homeShopName: "",
          mpr1: "",
          mpr2: "",
          ppd1: "",
          ppd2: "",
          rating1: "",
          rating2: "",
          teamId: "",
          teamName: ""
        }
      },
      categoryId: "",
      divisionId: "",
      stageId: "",
      StageAssignTableData: [],
      AssignDiologData: [],
      AssignDialogTableData: [],
      assignDialogTotal: 1,
      tableData: []
    };
  },
  mounted() {
    const vm = this;
    try {
      this.AssignVO.Detial = JSON.parse(this.$route.query.data);
    } catch {
      this.AssignVO.Detial = this.$route.query.data;
    }
    this.AssignVO.StageAssignDialog.competitionId = this.AssignVO.Detial.id;
    vm.AssignVO.Detial.area = "";
    this.AssignVO.Detial.countryList.forEach(i => {
      let str = "";
      if (i.areaName) {
        str = `,${i.areaName}`;
      }
      vm.AssignVO.Detial.area += `${i.countryName}${str};`;
    });
    this.init();
  },
  methods: {
    init() {
      const vm = this;
      this.$axios.get(`/getCompetitionCategoryList?competitionId=${vm.AssignVO.Detial.id}`).then(res => {
        vm.tableData = res.data.data;
        this.detial.categoryCount = res.data.data.length;
        this.detial.divisionCount = res.data.data[0].competitionDivisionList.length;
        this.detial.stageCount = res.data.data[0].competitionDivisionList[0].competitionStageList.length;
      });
      this.DialogSearch();
    },
    stageAssign() {
      const vm = this;
      this.StageAssignDialog = true;
      this.$axios.get(`/competitionBelowCategoryIdName?competitionId=${vm.AssignVO.Detial.id}`).then(res => {
        vm.categoryList = res.data.data;
      });
    },
    competitionIdChange(value) {
      if (value) {
        this.$axios.get(`/categoryBelowDivisionIdName?categoryId=${value}`).then(res => {
          this.divisionList = res.data.data;
        });
      } else {
        this.AssignVO.StageAssignDialog.categoryId = null;
      }
      this.AssignVO.StageAssignDialog.divisionId = null;
      this.AssignVO.StageAssignDialog.stageId = null;
      this.DialogSearch();
    },
    categoryIdChange(value) {
      if (value) {
        this.$axios.get(`/divisionBelowStageIdName?divisionId=${value}`).then(res => {
          this.stageList = res.data.data;
        });
      } else {
        this.AssignVO.StageAssignDialog.divisionId = null;
      }
      this.AssignVO.StageAssignDialog.stageId = null;
      this.DialogSearch();
    },
    stageIdChange(value) {
      console.log(value);
      this.DialogSearch();
    },
    divClick(value, type, index, Findex, mineIndex) {
      this.$router.push({
        name: "assignedTeams",
        query: {
          data: JSON.stringify(value),
          type,
          index,
          Findex,
          mineIndex
        }
      });
    },
    TableAssign(data, type, Findex, MindIndex) {
      this.AssignDiologVisible = true;
      this.AssignDialogTableData = [];
      const list = [];
      const Listdata = {
        categoryName: "",
        categoryId: "",
        divisionName: "",
        divisionId: "",
        stageName: "",
        stageId: ""
      };

      switch (type) {
        case "1":
          Listdata.categoryName = data.categoryName;
          Listdata.categoryId = data.categoryId;
          break;
        case "2":
          Listdata.categoryName = data.categoryName;
          Listdata.categoryId = data.categoryId;
          Listdata.divisionName = data.competitionDivisionList[Findex].divisionName;
          Listdata.divisionId = data.competitionDivisionList[Findex].divisionId;
          break;
        default:
          Listdata.categoryName = data.categoryName;
          Listdata.categoryId = data.categoryId;
          Listdata.divisionName = data.competitionDivisionList[Findex].divisionName;
          Listdata.divisionId = data.competitionDivisionList[Findex].divisionId;
          Listdata.stageName = data.competitionDivisionList[Findex].competitionStageList[MindIndex].stageName;
          Listdata.stageId = data.competitionDivisionList[Findex].competitionStageList[MindIndex].stageId;
          break;
      }
      list.push(Listdata);
      this.AssignDiologData = list;
      this.AssignDiologSearch();
    },
    AssignDiologSearch() {
      const data = this.AssignDiologData[0];
      let flag = true;
      let url = "";
      if (data.stageName && flag) {
        url = "getStageTeamList";
        flag = false;
        this.AssignVO.AssignDialog.divisionId = data.divisionId;
      }
      if (data.divisionId && flag) {
        url = "getDivisionTeamList";
        flag = false;
        this.AssignVO.AssignDialog.categoryId = data.categoryId;
      }
      if (data.categoryId && flag) {
        url = "getCategoryTeamList";
        this.AssignVO.AssignDialog.competitionId = this.AssignVO.Detial.id;
      }
      this.$axios.post(`/${url}`, this.AssignVO.AssignDialog).then(res => {
        if (res.data.data) {
          this.AssignDialogTableData = res.data.data;
        }
      });
    },
    DialogSearch() {
      const vm = this;
      this.$axios.post("/getShortcutTeamList", vm.AssignVO.StageAssignDialog).then(res => {
        if (!res.data.errorCode) {
          vm.StageAssignTableData = res.data.data;
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    DialogAssign() {
      const vm = this;
      const data = {
        categoryId: this.AssignVO.StageAssignDialog.categoryId,
        divisionId: this.AssignVO.StageAssignDialog.divisionId,
        stageId: this.AssignVO.StageAssignDialog.stageId,
        mainId: returnType(this.StageAssignTableSelectionList, "teamId")
      };
      this.$axios.post("/shortcutTeam", data).then(res => {
        if (res.data.errorCode) {
          this.$message(res.data.msg);
          return;
        }
        if (res.data.data) {
          vm.StageAssignTableData = res.data.data.data;
          vm.StageAssignDialog = false;
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    StageAssignTableSelection(val) {
      this.StageAssignTableSelectionList = val;
    },
    search() {},
    Assign() {
      const data = this.AssignDiologData[0];
      let flag = true;
      let url = "";
      const params = {
        categoryId: "",
        divisionId: "",
        stageId: "",
        mainId: returnType(this.AssignSelectionArr, "mainId")
      };
      if (data.stageId && flag) {
        url = "teamIntoStage";
        flag = false;
        params.stageId = data.stageId;
      }
      if (data.divisionId && flag) {
        url = "teamIntoDivision";
        flag = false;
        params.divisionId = data.divisionId;
      }
      if (data.categoryId && flag) {
        url = "teamIntoCategory";
        params.categoryId = data.categoryId;
      }
      this.$axios.post(`/${url}`, params).then(res => {
        if (res.data.data && res.data.data.length) {
          this.AssignDialogTableData = res.data.data;
        }
        this.init();
      });
      this.AssignDiologVisible = false;
    },
    AssignDialogTableDataSelection(val) {
      this.AssignSelectionArr = val;
    },
    SelectionChange(val) {
      this.SelectionArr = val;
    },
    assignDialogSizeChange(val) {
      console.log(val);
    },
    assignDialogCurrentChange(val) {
      console.log(val);
    },
    setHeight(value) {
      return {
        height: `${30 * value}px`,
        display: "flex",
        alignItems: "center"
      };
    }
    // arraySpanMethod({ rowIndex, columnIndex }) {
    //   if (columnIndex === 0) {
    //     if (rowIndex % 2 === 0) {
    //       return {
    //         rowspan: 2,
    //         colspan: 1
    //       };
    //     }
    //     return {
    //       rowspan: 0,
    //       colspan: 0
    //     };
    //   }
    //   return ' ';
    // }
  }
};
</script>
<style scoped>
.content {
  border: 1px solid #eeeeee;
}
.search {
  background: #eeeeee;
  margin: 8px;
  padding: 8px;
  box-sizing: border-box;
}
.el-table >>> td,
.el-table >>> th {
  text-align: center;
}
.page {
  display: flex;
  justify-content: flex-end;
}
.tableStyle {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
}
.table >>> .el-table__body-wrapper td {
  height: 100%;
}
.tableLink {
  color: #1890ff;
  cursor: pointer;
  margin: 0 15px;
}
.tableLink:hover {
  font-weight: bold;
}
.assignDialogTable {
  height: 500px;
  overflow-y: auto;
}
.el-table::before {
  height: 0;
}
.table >>> .el-table__body td {
  padding: 0 !important;
  border: 1px solid #666;
}
.el-table {
  border: none;
}
.el-table--border::after {
  width: 0px;
}
.table >>> .el-table__body .cell {
  padding: 0 !important;
}
</style>
