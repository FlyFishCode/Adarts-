<template>
  <div class="content">
    <el-row class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip4") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="EntryMgmt.countryId" clearable :placeholder="$t('all.tip516')" @change="change">
            <el-option v-for="item in countryList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="EntryMgmt.areaId" clearable :placeholder="$t('all.tip516')" @change="areaIdChange">
            <el-option v-for="item in areaList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip6") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="EntryMgmt.status" :placeholder="$t('all.tip516')">
            <el-option :value="0" :label="$t('all.tip0')"></el-option>
            <el-option :value="1" :label="$t('all.tip26')"></el-option>
            <el-option :value="2" :label="$t('all.tip27')"></el-option>
            <el-option :value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip382") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="EntryMgmt.creator" clearable :placeholder="$t('all.tip516')">
            <el-option v-for="item in creteList" :key="item.creatorId" :label="item.creatorName" :value="item.creatorId"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip7") }}
        </el-col>
        <el-col :span="6">
          <el-col :span="12">
            <el-date-picker v-model="EntryMgmt.competitionStartPeriod" type="date" :placeholder="$t('all.tip516')" default-time="00:00:00" @change="competitionChange"> </el-date-picker>
          </el-col>
          <el-col :span="12">
            <el-date-picker v-model="EntryMgmt.competitionEndPeriod" type="date" :placeholder="$t('all.tip516')" default-time="23:59:59" :picker-options="competitionOptions"></el-date-picker>
          </el-col>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip5") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="EntryMgmt.type" :placeholder="$t('all.tip516')">
            <el-option :value="0" :label="$t('all.tip0')"></el-option>
            <el-option :value="1" :label="$t('all.tip42')"></el-option>
            <el-option :value="2" :label="$t('all.tip43')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip9") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="EntryMgmt.operator" clearable :placeholder="$t('all.tip516')">
            <el-option v-for="item in operList" :key="item.id" :label="item.operName" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip56") }}
        </el-col>
        <el-col :span="6">
          <el-col :span="12">
            <el-date-picker v-model="EntryMgmt.entryStartPeriod" type="date" :placeholder="$t('all.tip516')" default-time="00:00:00" @change="entryChange"> </el-date-picker>
          </el-col>
          <el-col :span="12">
            <el-date-picker v-model="EntryMgmt.entryEndPeriod" type="date" :placeholder="$t('all.tip516')" default-time="23:59:59" :picker-options="entryOptions"> </el-date-picker>
          </el-col>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip8") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="EntryMgmt.competitionName" clearable filterable :placeholder="$t('all.tip516')">
            <el-option v-for="(item, index) in competitionNameList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("all.tip10") }}</el-button>
        </el-col>
      </el-row>
    </el-row>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column :label="$t('all.tip5')" min-width="10%">
          <template slot-scope="scope">
            <div>
              {{ scope.row.type === 1 ? $t("all.tip40") : $t("all.tip41") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip1')" min-width="20%">
          <template slot-scope="scope">
            <div class="tableLink" @click="push(scope.row)">{{ scope.row.competitionName }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip17')" min-width="10%">
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
        <el-table-column :label="$t('all.tip9')" min-width="10%">
          <template slot-scope="scope">
            <div v-if="scope.row.operator">
              <div v-for="item in scope.row.operator.split(';')" :key="item.index">
                <div>{{ item }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="application" :label="$t('all.tip23')" min-width="10%"> </el-table-column>
        <el-table-column prop="approve" :label="$t('all.tip27')" min-width="9%"> </el-table-column>
        <el-table-column prop="standby" :label="$t('all.tip242')" min-width="8%"> </el-table-column>
        <el-table-column :label="$t('all.tip25')" min-width="7%">
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
        <el-table-column min-width="10%">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="mgmt(scope.row)">{{ $t("all.tip241") }}</el-button>
            <el-button size="mini" type="primary" @click="assign(scope.row)">{{ $t("all.tip64") }}</el-button>
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
  name: "home",
  components: {},
  data() {
    const vm = this;
    return {
      competitionOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.EntryMgmt.competitionStartPeriod);
          return time.getTime() < date1;
        }
      },
      entryOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.EntryMgmt.entryStartPeriod);
          return time.getTime() < date1;
        }
      },
      operList: [],
      creteList: [],
      competitionNameList: [],
      countryList: [],
      areaList: [],
      total: 1,
      EntryMgmt: {
        areaId: null,
        countryId: null,
        status: 0,
        type: 0,
        competitionName: null,
        creator: null,
        operator: null,
        competitionStartPeriod: null,
        competitionEndPeriod: null,
        entryStartPeriod: null,
        entryEndPeriod: null,
        userId: "",
        pageNum: 1,
        pageSize: 10
      },
      tableData: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.EntryMgmt.userId = sessionStorage.getItem("LeagueUserId");
      this.search();
      this.getCountry(this.EntryMgmt.userId);
      this.getOperationdata(this.EntryMgmt.userId);
      this.getCretetionData(this.EntryMgmt.userId);
      this.getAllCompetitionName(this.EntryMgmt.userId);
    },
    getCountry(creatorId) {
      this.$axios.post("/getcountry", this.$qs.stringify({ creatorId })).then(res => {
        this.countryList = res.data.data;
      });
    },
    getOperationdata(userId) {
      // 获取操作者
      this.$axios.post("/operation/getoperationlist", this.$qs.stringify({ userId })).then(res => {
        this.operList = res.data.data.list;
      });
    },
    getAllCompetitionName(userId) {
      this.$axios.get(`/getAllCompetitionName?userId=${userId}`).then(res => {
        this.competitionNameList = res.data.data;
      });
    },
    getCretetionData(userId) {
      this.$axios.post("/operation/getcreatorlist", this.$qs.stringify({ userId })).then(res => {
        this.creteList = res.data.data;
      });
    },
    competitionChange(data) {
      if (this.EntryMgmt.competitionEndPeriod && this.EntryMgmt.competitionEndPeriod < data) {
        this.EntryMgmt.competitionEndPeriod = null;
      }
    },
    entryChange(data) {
      if (this.EntryMgmt.entryEndPeriod && this.EntryMgmt.entryEndPeriod < data) {
        this.EntryMgmt.entryEndPeriod = null;
      }
    },
    change(value) {
      if (value) {
        this.$axios.post("/getareabycountryid", this.$qs.stringify({ countryId: value })).then(res => {
          this.areaList = res.data.data;
        });
      } else {
        this.EntryMgmt.countryId = null;
      }
      this.EntryMgmt.areaId = null;
    },
    areaIdChange(value) {
      if (!value) {
        this.EntryMgmt.areaId = null;
      }
    },
    changeDate(value) {
      return new Date(value);
    },
    search() {
      this.$axios.post("/getCompetitionList", this.EntryMgmt).then(res => {
        if (res.data.code === 1000) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    sizeChange(value) {
      this.EntryMgmt.pageSize = value;
      this.search();
    },
    currentChange(value) {
      this.EntryMgmt.pageNum = value;
      this.search();
    },
    push(data) {
      saveQuery("entryList", data);
      this.$router.push({
        path: "entryList",
        query: {
          data: JSON.stringify(data)
        }
      });
    },
    mgmt(value) {
      saveQuery("entryList", value);
      this.$router.push({
        name: "entryList",
        query: {
          data: JSON.stringify(value)
        }
      });
    },
    assign(value) {
      saveQuery("assign", value);
      this.$router.push({
        name: "assign",
        query: {
          data: JSON.stringify(value)
        }
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
