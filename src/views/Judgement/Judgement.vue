<template>
  <div class="content">
    <el-row class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip535") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="judgementVO.countryId" :placeholder="$t('placeholder.select')" @change="AreaChange" clearable>
            <el-option v-for="item in ContinentArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="judgementVO.areaId" :placeholder="$t('placeholder.select')" clearable>
            <el-option v-for="item in CountryArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip536") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="judgementVO.status" :placeholder="$t('placeholder.select')">
            <el-option :value="0" :label="$t('all.tip0')"></el-option>
            <el-option :value="1" :label="$t('all.tip26')"></el-option>
            <el-option :value="2" :label="$t('all.tip27')"></el-option>
            <el-option :value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip539") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="judgementVO.name" clearable :placeholder="$t('placeholder.select')">
            <el-option v-for="(item, index) in competitionNameList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip538") }}
        </el-col>
        <el-col :span="6">
          <el-col :span="12" id="divBoxWidth">
            <el-date-picker v-model="judgementVO.StartTime" type="datetime" default-time="00:00:00" :placeholder="$t('placeholder.datePicker')" @change="dateChange" clearable> </el-date-picker>
          </el-col>
          <el-col :span="12" id="divBoxWidth">
            <el-date-picker v-model="judgementVO.EndTime" type="datetime" default-time="23:59:59" :placeholder="$t('placeholder.datePicker')" :picker-options="pickerOptions" clearable>
            </el-date-picker>
          </el-col>
        </el-col>

        <el-col class="label-g" :span="3">
          {{ $t("all.tip537") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="judgementVO.type" :placeholder="$t('placeholder.select')">
            <el-option :value="0" :label="$t('all.tip0')"></el-option>
            <el-option :value="1" :label="$t('all.tip42')"></el-option>
            <el-option :value="2" :label="$t('all.tip43')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip9") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="judgementVO.operatorId" :placeholder="$t('placeholder.select')" clearable>
            <el-option v-for="item in operList" :key="item.id" :label="item.operName" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip382") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="judgementVO.creatorId" :placeholder="$t('placeholder.select')" clearable>
            <el-option v-for="item in creteList" :key="item.creatorId" :label="item.creatorName" :value="item.creatorId"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("form.SearchButton") }}</el-button>
        </el-col>
      </el-row>
    </el-row>

    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" :label="$t('all.tip537')" min-width="7%">
          <template slot-scope="scope">
            <div>{{ scope.row.type === 1 ? $t("all.tip40") : $t("all.tip41") }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip1')" min-width="7%">
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
        <el-table-column prop="name" :label="$t('all.tip442')" min-width="6%">
          <template slot-scope="scope">
            <div v-for="item in scope.row.countryList" :key="item.index">
              {{ item.areaName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('all.tip538')" min-width="8%">
          <template slot-scope="scope">
            {{ scope.row.competitionStartPeriod | showDate }}-{{ scope.row.competitionEndPeriod | showDate }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip9')" min-width="5%">
          <template slot-scope="scope">
            <div v-if="scope.row.operator">
              <div v-for="item in scope.row.operator.split(';')" :key="item.index">
                <div>{{ item }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="categoryCount" :label="$t('all.tip51')" min-width="5%"> </el-table-column>
        <el-table-column prop="divisionCount" :label="$t('all.tip52')" min-width="5%"> </el-table-column>
        <el-table-column prop="stageCount" :label="$t('all.tip21')" min-width="5%"> </el-table-column>
        <el-table-column prop="entryCount" :label="$t('all.tip310')" min-width="5%"> </el-table-column>
        <el-table-column :label="$t('all.tip25')" min-width="5%">
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
  name: "Judgement",
  components: {},
  data() {
    const vm = this;
    return {
      userId: "",
      pickerOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.judgementVO.StartTime);
          return time.getTime() < date1;
        }
      },
      ContinentArr: [],
      CountryArr: [],
      operList: [],
      creteList: [],
      judgementVO: {
        areaId: "",
        countryId: "",
        status: 0,
        type: 0,
        name: "",
        operatorId: "",
        creatorId: "",
        StartTime: "",
        EndTime: "",
        userId: localStorage.getItem("LeagueUserId"),
        pageNum: 1,
        pageSize: 10
      },
      total: 1,
      tableData: [],
      competitionNameList: []
    };
  },
  mounted() {
    this.userId = localStorage.getItem("LeagueUserId");
    this.$axios.post("/getcountry", this.$qs.stringify({ creatorId: this.userId })).then(res => {
      this.ContinentArr = res.data.data;
    });
    this.getOperationdata(this.userId);
    this.getCretetionData(this.userId);
    this.search();
    this.getAllCompetitionName();
  },
  methods: {
    search() {
      this.$axios.post("/matchTable/getMatchTableCompetitionList", this.judgementVO).then(res => {
        if (res.data.data) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        }
      });
    },
    currentChange(value) {
      this.judgementVO.pageNum = value;
      this.search();
    },
    getAllCompetitionName() {
      this.$axios.get(`/getAllCompetitionName?userId=${localStorage.getItem("LeagueUserId")}`).then(res => {
        this.competitionNameList = res.data.data;
      });
    },
    sizeChange(value) {
      this.judgementVO.pageSize = value;
      this.search();
    },
    dateChange(data) {
      if (this.judgementVO.EndTime && this.judgementVO.EndTime < data) {
        this.judgementVO.EndTime = "";
      }
    },
    AreaChange(value) {
      this.$axios.post("/getareabycountryid", this.$qs.stringify({ countryId: value })).then(res => {
        this.CountryArr = res.data.data;
      });
      this.judgementVO.AreaTwo = "";
    },
    getOperationdata(userId) {
      this.$axios.post("/operation/getoperationlist", this.$qs.stringify({ userId })).then(res => {
        this.operList = res.data.data.list;
      });
    },
    getCretetionData(userId) {
      this.$axios.post("/operation/getcreatorlist", this.$qs.stringify({ userId })).then(res => {
        this.creteList = res.data.data;
      });
    },
    push(data) {
      saveQuery("teamList", data);
      this.$router.push({
        name: "teamList",
        query: { data: JSON.stringify(data) }
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
