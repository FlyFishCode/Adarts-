<template>
  <div class="content">
    <el-row class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip4") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="MatchTableMgmtVO.countryId" clearable :placeholder="$t('all.tip516')" @change="change">
            <el-option v-for="item in ContinentArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="MatchTableMgmtVO.areaId" clearable :placeholder="$t('all.tip516')">
            <el-option v-for="item in CountryArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip6") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="MatchTableMgmtVO.status" :placeholder="$t('all.tip516')">
            <el-option :value="0" :label="$t('all.tip0')"></el-option>
            <el-option :value="1" :label="$t('all.tip26')"></el-option>
            <el-option :value="2" :label="$t('all.tip27')"></el-option>
            <el-option :value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip8") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="MatchTableMgmtVO.competitionName" clearable filterable :placeholder="$t('all.tip516')">
            <el-option v-for="(item, index) in competitionNameList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip7") }}
        </el-col>
        <el-col :span="6">
          <el-col :span="12">
            <el-date-picker v-model="MatchTableMgmtVO.competitionStartPeriod" type="date" :placeholder="$t('all.tip516')" default-time="00:00:00" @change="dateChange"> </el-date-picker>
          </el-col>
          <el-col :span="12">
            <el-date-picker v-model="MatchTableMgmtVO.competitionEndPeriod" type="date" :placeholder="$t('all.tip516')" default-time="23:59:59" :picker-options="pickerOptions"> </el-date-picker>
          </el-col>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip5") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="MatchTableMgmtVO.type" :placeholder="$t('all.tip516')">
            <el-option :value="0" :label="$t('all.tip0')"></el-option>
            <el-option :value="1" :label="$t('all.tip42')"></el-option>
            <el-option :value="2" :label="$t('all.tip43')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip382") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="MatchTableMgmtVO.createId" filterable :default-first-option="true" clearable :placeholder="$t('all.tip516')">
            <el-option v-for="item in creteList" :key="item.creatorId" :label="item.creatorName" :value="item.creatorId"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip9") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="MatchTableMgmtVO.operId" filterable clearable :default-first-option="true" :placeholder="$t('all.tip516')">
            <el-option v-for="item in operList" :key="item.id" :label="item.operName" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("all.tip10") }}</el-button>
        </el-col>
      </el-row>
    </el-row>

    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="type" :label="$t('all.tip5')" min-width="7%">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 1">
              {{ $t("all.tip40") }}
            </div>
            <div v-else>
              {{ $t("all.tip41") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip1')" min-width="10%">
          <template slot-scope="scope">
            <div class="tableLink" @click="push(scope.row)">{{ scope.row.competitionName }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip17')" min-width="7%">
          <template slot-scope="scope">
            <div v-for="item in scope.row.countryList" :key="item.index">
              {{ item.countryName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip442')" min-width="10%">
          <template slot-scope="scope">
            <div v-for="item in scope.row.countryList" :key="item.index">
              {{ item.areaName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip7')" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.competitionStartPeriod | showDate }}/{{ scope.row.competitionEndPeriod | showDate }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip9')" min-width="8%">
          <template slot-scope="scope">
            <div v-if="scope.row.operator">
              <div v-for="item in scope.row.operator.split(';')" :key="item.index">
                <div>{{ item }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createName" :label="$t('all.tip382')" min-width="5%"> </el-table-column>
        <el-table-column prop="status" :label="$t('all.tip25')" min-width="5%">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 1">
              {{ $t("all.tip26") }}
            </div>
            <div v-if="scope.row.status === 2">
              {{ $t("all.tip27") }}
            </div>
            <div v-if="scope.row.status === 3">
              {{ $t("all.tip28") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="categoryCount" :label="$t('all.tip51')" min-width="5%"> </el-table-column>
        <el-table-column prop="divisionCount" :label="$t('all.tip52')" min-width="5%"> </el-table-column>
        <el-table-column prop="stageCount" :label="$t('all.tip21')" min-width="5%"> </el-table-column>
        <el-table-column prop="matchTableCount" :label="$t('all.tip270')" min-width="5%"> </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="1" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { saveQuery } from "@/components/common/Utils";

export default {
  name: "home",
  components: {},
  data() {
    const vm = this;
    return {
      pickerOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.MatchTableMgmtVO.competitionStartPeriod);
          return time.getTime() < date1;
        }
      },
      ContinentArr: [],
      CountryArr: [],
      total: 1,
      MatchTableMgmtVO: {
        areaId: "",
        countryId: "",
        status: 0,
        type: 0,
        competitionStartPeriod: null,
        competitionEndPeriod: null,
        competitionName: "",
        userId: sessionStorage.getItem("LeagueUserId"),
        operId: "",
        createId: "",
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      operList: [],
      creteList: [],
      competitionNameList: []
    };
  },
  mounted() {
    const creatorId = sessionStorage.getItem("LeagueUserId");
    this.search();
    this.getCounarr(creatorId);
    this.getOperationdata(creatorId);
    this.getCretetionData(creatorId);
    this.getAllCompetitionName();
  },
  methods: {
    getCounarr(creatorId) {
      this.$axios.post("/getcountry", this.$qs.stringify({ creatorId })).then(res => {
        this.ContinentArr = res.data.data;
      });
    },
    getOperationdata(userId) {
      // 获取操作者
      this.$axios.post("/operation/getoperationlist", this.$qs.stringify({ userId })).then(res => {
        this.operList = res.data.data.list;
      });
    },
    getAllCompetitionName() {
      this.$axios.get(`/getAllCompetitionName?userId=${sessionStorage.getItem("LeagueUserId")}`).then(res => {
        this.competitionNameList = res.data.data;
      });
    },
    getCretetionData(userId) {
      this.$axios.post("/operation/getcreatorlist", this.$qs.stringify({ userId })).then(res => {
        this.creteList = res.data.data;
      });
    },
    dateChange(data) {
      if (this.MatchTableMgmtVO.competitionEndPeriod && this.MatchTableMgmtVO.competitionEndPeriod < data) {
        this.MatchTableMgmtVO.competitionEndPeriod = "";
      }
    },
    search() {
      this.$axios.post("/matchTable/getMatchTableCompetitionList", this.MatchTableMgmtVO).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    change(value) {
      this.$axios.post("/getareabycountryid", this.$qs.stringify({ countryId: value })).then(res => {
        this.CountryArr = res.data.data;
      });
      this.MatchTableMgmtVO.areaId = "";
    },
    push(data) {
      saveQuery("matchTableList", data);
      this.$router.push({
        name: "matchTableList",
        query: { data: JSON.stringify(data) }
      });
    },
    sizeChange(value) {
      this.MatchTableMgmtVO.pageSize = value;
      this.$axios.post("/matchTable/getMatchTableCompetitionList", this.MatchTableMgmtVO).then(res => {
        this.tableData = res.data.data.list;
      });
    },
    currentChange(value) {
      this.MatchTableMgmtVO.pageNum = value;
      this.$axios.post("/matchTable/getMatchTableCompetitionList", this.MatchTableMgmtVO).then(res => {
        this.tableData = res.data.data.list;
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
