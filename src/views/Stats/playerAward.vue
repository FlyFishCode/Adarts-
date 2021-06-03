<template>
  <div class="content">
    <el-row class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip5") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="EntryMgmt.type" :placeholder="$t('all.tip516')">
            <el-option :value="0" :label="$t('all.tip0')"></el-option>
            <el-option :value="1" :label="$t('all.tip42')"></el-option>
            <el-option :value="2" :label="$t('all.tip43')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip8") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="EntryMgmt.name" clearable :placeholder="$t('all.tip516')">
            <el-option v-for="(item, index) in competitionNameList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip436") }}
        </el-col>
        <el-col :span="3">
          <el-date-picker v-model="EntryMgmt.startPeriod" type="date" default-time="00:00:00" :placeholder="$t('all.tip516')" @change="dateChange" clearable> </el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-date-picker v-model="EntryMgmt.endPeriod" type="date" default-time="23:59:59" :placeholder="$t('all.tip516')" :picker-options="pickerOptions" clearable> </el-date-picker>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("all.tip10") }}</el-button>
          <!-- <el-button type="primary" size="mini" @click="search">{{ $t("all.tip11") }}</el-button> -->
        </el-col>
      </el-row>
    </el-row>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" :label="$t('all.tip257')" width="50"> </el-table-column>
        <el-table-column :label="$t('all.tip340')" min-width="10%">
          <template slot-scope="scope">
            <div>{{ scope.row.playerName }}</div>
            <div>{{ `(${scope.row.playerId})` }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="gender" :label="$t('all.tip208')" min-width="7%"> </el-table-column>
        <el-table-column prop="sideBull" :label="$t('all.tip344')" min-width="8%"> </el-table-column>
        <el-table-column prop="doubleBull" :label="$t('all.tip345')" min-width="10%"> </el-table-column>
        <el-table-column prop="lowTon" :label="$t('all.tip346')" min-width="8%"> </el-table-column>
        <el-table-column prop="hatTrick" :label="$t('all.tip347')" min-width="8%"> </el-table-column>
        <el-table-column prop="highTon" :label="$t('all.tip348')" min-width="8%"> </el-table-column>
        <el-table-column prop="highTonOut" :label="$t('all.tip349')" min-width="8%"> </el-table-column>
        <el-table-column prop="lowTonOut" :label="$t('all.tip350')" min-width="8%"> </el-table-column>
        <el-table-column prop="threeInABed" :label="$t('all.tip351')" min-width="8%"> </el-table-column>
        <el-table-column prop="ton80" :label="$t('all.tip352')" min-width="6%"> </el-table-column>
        <el-table-column prop="threeInTheBlack" :label="$t('all.tip353')" min-width="10%"> </el-table-column>
        <el-table-column prop="fiveMarks" :label="$t('all.tip354')" min-width="8%"> </el-table-column>
        <el-table-column prop="sixMarks" :label="$t('all.tip355')" min-width="8%"> </el-table-column>
        <el-table-column prop="sevenMarks" :label="$t('all.tip356')" min-width="8%"> </el-table-column>
        <el-table-column prop="eightMarks" :label="$t('all.tip357')" min-width="8%"> </el-table-column>
        <el-table-column prop="nineMarks" :label="$t('all.tip358')" min-width="8%"> </el-table-column>
        <el-table-column prop="whiteHorse" :label="$t('all.tip359')" min-width="8%"> </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="1"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
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
          const date1 = new Date(vm.EntryMgmt.startPeriod);
          return time.getTime() < date1;
        }
      },
      ContinentArr: [],
      CountryArr: [],
      total: 1,
      EntryMgmt: {
        type: 0,
        name: "",
        startPeriod: "",
        endPeriod: "",
        pageNum: 1,
        pageSize: 10
      },
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
      if (this.EntryMgmt.endPeriod && this.EntryMgmt.endPeriod < data) {
        this.EntryMgmt.endPeriod = "";
      }
    },
    getcountry(creatorId) {
      this.$axios.post("/getcountry", this.$qs.stringify({ creatorId })).then(res => {
        this.ContinentArr = res.data.data;
      });
    },
    search() {
      this.$axios.post("/playeraward", this.EntryMgmt).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    sizeChange(value) {
      const vm = this;
      this.$axios.post("/playeraward", { pageSize: value }).then(res => {
        vm.tableData = res.data.data.list;
        vm.total = res.data.data.total;
      });
    },
    currentChange(value) {
      const vm = this;
      this.$axios.post("/playeraward", { pageNum: value }).then(res => {
        vm.tableData = res.data.data.list;
        vm.total = res.data.data.total;
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
