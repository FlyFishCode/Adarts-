<template>
  <div class="content">
    <div class="search">
      <el-row class="center-Row">
        <el-col :span="3" class="label-g">
          {{ $t("all.tip1") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass" :title="match.competitionName">
          {{ match.competitionName }}
        </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip536") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          <div v-if="match.status === 1">{{ this.$t("all.tip26") }}</div>
          <div v-if="match.status === 2">{{ this.$t("all.tip27") }}</div>
          <div v-if="match.status === 3">{{ this.$t("all.tip28") }}</div>
        </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip4") }}
        </el-col>
        <el-col :span="9" class="overFlowStyle lineClass">
          {{ match.area }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col :span="3" class="label-g">
          {{ $t("all.tip537") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ match.leagueType === 1 ? $t("all.tip42") : $t("all.tip43") }}
        </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip538") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass"> {{ match.start }}~{{ match.end }} </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip244") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ match.teamName }}
        </el-col>
      </el-row>
    </div>

    <div class="search">
      <el-row>
        <el-col class="label-g" :span="1">
          {{ $t("all.tip368") }}
        </el-col>
        <el-col :span="2">
          <el-select v-model="matchVO.judgeStatus" :placeholder="$t('placeholder.select')" clearable>
            <el-option :value="1" :label="$t('all.tip376')"></el-option>
            <el-option :value="2" :label="$t('all.tip551')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip226") }}
        </el-col>
        <el-col :span="2">
          <el-select v-model="matchVO.mode" :placeholder="$t('placeholder.select')" clearable>
            <el-option v-for="item in modeList" :key="item.id" :label="$t(item.label)" :value="item.id"> </el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="1">
          {{ $t("all.tip213") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="matchVO.gameNameNum" :placeholder="$t('placeholder.select')" clearable>
            <el-option v-for="item in gameNameList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-col>
        <!-- <el-col class="label-g" :span="2">
          {{ $t("all.tip367") }}
        </el-col>
        <el-col :span="2">
          <el-select v-model="matchVO.vsTeam" :placeholder="$t('placeholder.select')">
            <el-option value="1" :label="$t('all.tip0')"></el-option>
            <el-option value="2" :label="$t('all.tip27')"></el-option>
            <el-option value="3" :label="$t('all.tip26')"></el-option>
            <el-option value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col> -->
        <el-col class="label-g" :span="1">
          {{ $t("all.tip321") }}
        </el-col>
        <el-col :span="6">
          <el-col :span="11">
            <el-date-picker v-model="matchVO.startPeriod" type="datetime" format="yyyy-MM-dd" :placeholder="$t('placeholder.datePicker')" default-time="00:00:00" @change="dateChange" clearable>
            </el-date-picker>
          </el-col>
          <el-col :span="1" class="lineClass">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="matchVO.endPeriod"
              type="datetime"
              format="yyyy-MM-dd"
              :placeholder="$t('placeholder.datePicker')"
              default-time="23:59:59"
              :picker-options="pickerOptions"
              clearable
            >
            </el-date-picker>
          </el-col>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("form.SearchButton") }}</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" :label="$t('all.tip321')" min-width="10%"></el-table-column>
        <el-table-column prop="setNumber" :label="$t('all.tip53')" min-width="7%"> </el-table-column>
        <el-table-column prop="legId" :label="$t('all.tip54')" min-width="7%"> </el-table-column>
        <el-table-column :label="$t('all.tip226')" min-width="6%">
          <template slot-scope="scope">
            <div v-if="scope.row.gameMode === 1">
              {{ "Single" }}
            </div>
            <div v-if="scope.row.gameMode === 2">
              {{ "Double" }}
            </div>
            <div v-if="scope.row.gameMode === 3">
              {{ "Trios" }}
            </div>
            <div v-if="scope.row.gameMode === 4">
              {{ "Gallon" }}
            </div>
            <div v-if="scope.row.gameMode === 5">
              {{ "Team" }}
            </div>
            <div v-if="scope.row.gameMode === 6">
              {{ "Team2" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="game" :label="$t('all.tip213')" min-width="8%"> </el-table-column>
        <el-table-column prop="vsTeam" :label="$t('all.tip367')" min-width="5%"> </el-table-column>
        <el-table-column prop="judge" :label="$t('all.tip368')" min-width="5%">
          <template slot-scope="scope">
            <!-- <div v-if="scope.row.judge === 1">
              <div class="tableLink" @click="show">{{ $t("all.tip376") }}</div>
            </div>
            <div v-if="scope.row.judge === 2">
              <div class="tableLink" @click="show">{{ $t("all.tip551") }}</div>
            </div> -->
            <div class="tableLink" @click="showResult(scope.row)">{{ $t("all.tip551") }}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="address" :label="$t('all.tip33')" min-width="5%">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="view(scope.row)">{{ $t("all.tip33") }}</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="page">
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="1" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>

    <el-dialog :title="$t('all.tip540')" :visible.sync="dialogTableVisible">
      <el-table :data="dialogData">
        <el-table-column prop="date" :label="$t('all.tip321')" min-width="10%">
          <template slot-scope="scope">
            <div>{{ scope.row.date | showDate }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="value" :label="$t('all.tip541')" min-width="10%"></el-table-column>
        <el-table-column prop="team" :label="$t('all.tip244')" min-width="10%"></el-table-column>
        <el-table-column prop="judge" :label="$t('all.tip368')" min-width="10%">
          <template slot-scope="scope">
            <div>{{ scope.row.judge === 1 ? $t("all.tip376") : $t("all.tip551") }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="judgement" :label="$t('all.tip225')" min-width="10%"></el-table-column>
        <el-table-column prop="editor" :label="$t('all.tip233')" min-width="10%"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    const vm = this;
    return {
      dialogTableVisible: false,
      total: 1,
      modeList: [
        { id: 1, label: "all.tip200" },
        { id: 2, label: "all.tip201" },
        { id: 3, label: "all.tip202" },
        { id: 4, label: "all.tip203" },
        { id: 5, label: "all.tip204" },
        { id: 6, label: "all.tip205" }
      ],
      gameNameList: [
        { value: 1, label: "301 Game" },
        { value: 2, label: "501 Game" },
        { value: 3, label: "701 Game" },
        { value: 4, label: "901 Game" },
        { value: 5, label: "Std.CR" },
        { value: 6, label: "Cut Throw" },
        { value: 7, label: "Std.CUP" },
        { value: 8, label: "Timing" },
        { value: 9, label: "Half It" },
        { value: 10, label: "Team.CR" },
        { value: 11, label: "Snow 301" },
        { value: 12, label: "Snow 501" },
        { value: 13, label: "Snow 701" },
        { value: 20, label: "Eagle's Eye" },
        { value: 21, label: "Big Bull" },
        { value: 22, label: "CR.CUP" }
      ],
      pickerOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.matchVO.startPeriod);
          return time.getTime() < date1;
        }
      },
      match: {
        competitionName: "",
        status: "",
        area: "",
        leagueType: "",
        start: "",
        end: "",
        teamName: "",
        category: "",
        division: "",
        stage: ""
      },
      matchVO: {
        teamId: "",
        userId: "",
        mode: "",
        judgeStatus: null,
        competitionId: "",
        gameNameNum: "",
        startPeriod: "",
        endPeriod: "",
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      dialogData: []
    };
  },
  mounted() {
    let data = "";
    try {
      data = JSON.parse(this.$route.query.data);
    } catch {
      data = this.$route.query.data;
    }
    this.init(data);
    this.search();
  },
  methods: {
    init(data) {
      this.matchVO.competitionId = data.competitionId;
      this.matchVO.teamId = data.teamId;
      this.matchVO.userId = sessionStorage.getItem("userId");
      this.match.competitionName = data.competitionName;
      this.match.status = data.status;
      this.match.start = data.competitionStartPeriod.split(" ")[0];
      this.match.end = data.competitionEndPeriod.split(" ")[0];
      this.match.teamName = data.teamName;
      this.match.competitionId = data.competitionId;
      data.countryList.forEach(i => {
        let str = "";
        if (i.areaName) {
          str = `,${i.areaName}`;
        }
        this.match.area += `${i.countryName}${str};`;
      });
    },
    search() {
      this.$axios.post("/judgement/getMatch", this.matchVO).then(res => {
        if (res.data.errCode) {
          this.$message(res.data.msg);
        } else {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        }
      });
    },
    dateChange(data) {
      if (this.matchVO.endPeriod && this.matchVO.endPeriod < data) {
        this.matchVO.endPeriod = "";
      }
    },
    currentChange(val) {
      this.matchVO.pageNum = val;
      this.$axios.post("/judgement/getMatch", this.matchVO).then(res => {
        if (res.data.data) {
          this.$message(res.data.msg);
        } else {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        }
      });
    },
    sizeChange(val) {
      this.matchVO.pageSize = val;
      this.$axios.post("/judgement/getMatch", this.matchVO).then(res => {
        if (res.data.errCode) {
          this.$message(res.data.msg);
        } else {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        }
      });
    },
    view(data) {
      this.$router.push({
        name: "teamGameRecord",
        query: {
          confrontationId: data.confrontationId,
          teamId: this.$route.query.teamId,
          legId: data.legId,
          setId: data.setId
        }
      });
    },
    showResult(data) {
      this.$axios.post(`/judgement/getJudge?playerResultId=${data.playerResultId}`).then(res => {
        const obj = {
          date: data.date,
          value: `${data.setId}/${data.legId}`,
          team: data.vsTeam,
          judge: res.data.data.judge,
          reson: res.data.data.judgement || "-",
          editor: res.data.data.editor || "-"
        };
        this.dialogData = [obj];
      });
      this.dialogTableVisible = true;
    }
  }
};
</script>
<style scoped>
.content {
  border: 1px solid #eeeeee;
}
.el-table >>> td,
.el-table >>> th {
  text-align: center;
}
</style>
