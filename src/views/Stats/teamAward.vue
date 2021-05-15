<template>
  <div class="content">
    <el-row class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip537") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="teamVO.competitionType" :placeholder="$t('placeholder.select')">
            <el-option :value="0" :label="$t('all.tip0')"></el-option>
            <el-option :value="1" :label="$t('all.tip42')"></el-option>
            <el-option :value="2" :label="$t('all.tip43')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip539") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="teamVO.competitionName" clearable :placeholder="$t('placeholder.select')">
            <el-option v-for="(item, index) in competitionNameList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="1">
          {{ $t("all.tip436") }}
        </el-col>
        <el-col :span="7">
          <el-col :span="11">
            <el-date-picker v-model="teamVO.startPeriod" type="datetime" default-time="00:00:00" :placeholder="$t('placeholder.datePicker')" @change="dateChange" clearable> </el-date-picker>
          </el-col>
          <el-col :span="1" class="lineClass">-</el-col>
          <el-col :span="11">
            <el-date-picker v-model="teamVO.endPeriod" type="datetime" default-time="23:59:59" :placeholder="$t('placeholder.datePicker')" :picker-options="pickerOptions" clearable> </el-date-picker>
          </el-col>
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("form.SearchButton") }}</el-button>
          <!-- <el-button type="primary" size="mini" @click="search">{{ $t("all.tip11") }}</el-button> -->
        </el-col>
      </el-row>
    </el-row>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" :label="$t('all.tip214')" width="100"> </el-table-column>
        <el-table-column :label="$t('all.tip361')" min-width="10%">
          <template slot-scope="scope">
            <div>{{ scope.row.teamName }}</div>
            <div>{{ `(${scope.row.teamId})` }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="lowTon" :label="$t('all.tip346')" min-width="8%"> </el-table-column>
        <el-table-column prop="hatTrick" :label="$t('all.tip347')" min-width="8%"> </el-table-column>
        <el-table-column prop="highTon" :label="$t('all.tip348')" min-width="8%"> </el-table-column>
        <el-table-column prop="highTonOut" :label="$t('all.tip349')" min-width="10%"> </el-table-column>
        <el-table-column prop="lowTonOut" :label="$t('all.tip350')" min-width="10%"> </el-table-column>
        <el-table-column prop="threeInABed" :label="$t('all.tip351')" min-width="8%"> </el-table-column>
        <el-table-column prop="ton80" :label="$t('all.tip352')" min-width="6%"> </el-table-column>
        <el-table-column prop="threeInTheBlack" :label="$t('all.tip353')" min-width="10%"> </el-table-column>
        <el-table-column prop="fiveMarks" :label="$t('all.tip354')" min-width="8%"> </el-table-column>
        <el-table-column prop="sixMarks" :label="$t('all.tip355')" min-width="8%"> </el-table-column>
        <el-table-column prop="sevenMarks" :label="$t('all.tip356')" min-width="8%"> </el-table-column>
        <el-table-column prop="eightMarks" :label="$t('all.tip357')" min-width="8%"> </el-table-column>
        <el-table-column prop="nineMarks" :label="$t('all.tip358')" min-width="8%"> </el-table-column>
        <el-table-column prop="whiteHorse" :label="$t('all.tip359')" min-width="10%"> </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination @current-change="currentChange" @size-change="sizeChange" :current-page="1" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
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
      pickerOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.teamVO.startPeriod);
          return time.getTime() < date1;
        }
      },
      total: 1,
      teamVO: {
        competitionType: 0,
        competitionName: "",
        startPeriod: null,
        endPeriod: null,
        pageNum: 1,
        pageSize: 10
      },
      ContinentArr: [],
      CountryArr: [],
      tableData: [],
      competitionNameList: []
    };
  },
  mounted() {
    const creatorId = sessionStorage.getItem("LeagueUserId");
    this.getcountry(creatorId);
    this.search();
    this.getAllCompetitionName();
  },
  methods: {
    dateChange(data) {
      if (this.teamVO.endPeriod && this.teamVO.endPeriod < data) {
        this.teamVO.endPeriod = "";
      }
    },
    search() {
      this.$axios.post("/teamaward", this.teamVO).then(res => {
        if (res.data.errorCode) {
          this.$message(res.data.msg);
        } else {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        }
      });
    },
    getcountry(creatorId) {
      this.$axios.post("/getcountry", this.$qs.stringify({ creatorId })).then(res => {
        this.ContinentArr = res.data.data;
      });
    },
    sizeChange(value) {
      this.teamVO.pageSize = value;
      this.$axios.post("/teamaward", this.teamVO).then(res => {
        this.tableData = res.data.data.list;
      });
    },
    currentChange(value) {
      this.teamVO.pageNum = value;
      this.$axios.post("/teamaward", this.teamVO).then(res => {
        this.tableData = res.data.data.list;
      });
    },
    getAllCompetitionName() {
      this.$axios.get(`/getAllCompetitionName?userId=${sessionStorage.getItem("LeagueUserId")}`).then(res => {
        this.competitionNameList = res.data.data;
      });
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
