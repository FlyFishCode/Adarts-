<template>
  <div class="content">
    <el-row class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip4") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="EntryMgmt.countryId" clearable :placeholder="$t('placeholder.select')" @change="change">
            <el-option v-for="item in ContinentArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="EntryMgmt.areaId" clearable :placeholder="$t('placeholder.select')" @change="areaIdChange">
            <el-option v-for="item in CountryArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip6") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="EntryMgmt.status" :placeholder="$t('placeholder.select')">
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
          <el-select v-model="EntryMgmt.creator" clearable :placeholder="$t('placeholder.select')">
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
            <el-date-picker v-model="EntryMgmt.competitionStartPeriod" type="datetime" :placeholder="$t('placeholder.datePicker')" default-time="00:00:00" @change="competitionChange">
            </el-date-picker>
          </el-col>
          <el-col :span="12">
            <el-date-picker
              v-model="EntryMgmt.competitionEndPeriod"
              type="datetime"
              :placeholder="$t('placeholder.datePicker')"
              default-time="23:59:59"
              :picker-options="competitionOptions"
            ></el-date-picker>
          </el-col>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip5") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="EntryMgmt.type" :placeholder="$t('placeholder.select')">
            <el-option :value="0" :label="$t('all.tip0')"></el-option>
            <el-option :value="1" :label="$t('all.tip42')"></el-option>
            <el-option :value="2" :label="$t('all.tip43')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip9") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="EntryMgmt.operator" clearable :placeholder="$t('placeholder.select')">
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
            <el-date-picker v-model="EntryMgmt.entryStartPeriod" type="datetime" :placeholder="$t('placeholder.datePicker')" default-time="00:00:00" @change="entryChange"> </el-date-picker>
          </el-col>
          <el-col :span="12">
            <el-date-picker v-model="EntryMgmt.entryEndPeriod" type="datetime" :placeholder="$t('placeholder.datePicker')" default-time="23:59:59" :picker-options="entryOptions"> </el-date-picker>
          </el-col>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip8") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="EntryMgmt.competitionName" clearable :placeholder="$t('placeholder.select')">
            <el-option v-for="(item, index) in competitionNameList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("form.SearchButton") }}</el-button>
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
        <el-table-column :label="$t('all.tip3')" min-width="10%">
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
            <el-button size="mini" type="primary" @click="assign(scope.row)">{{ $t("all.tip264") }}</el-button>
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
      userId: "",
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
      ContinentArr: [],
      CountryArr: [],
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
        userId: sessionStorage.getItem("userId"),
        pageNum: 1,
        pageSize: 10
      },
      tableData: []
    };
  },
  mounted() {
    const vm = this;
    this.userId = sessionStorage.getItem("userId");
    this.$axios.post("/getcountry", vm.$qs.stringify({ creatorId: vm.userId })).then(res => {
      vm.ContinentArr = res.data.data;
    });
    this.search();
    this.getOperationdata();
    this.getCretetionData();
    this.getAllCompetitionName();
  },
  methods: {
    getOperationdata() {
      // 获取操作者
      this.$axios.post("/operation/getoperationlist", this.$qs.stringify({ userId: this.userId })).then(res => {
        this.operList = res.data.data.list;
      });
    },
    getAllCompetitionName() {
      this.$axios.get(`/getAllCompetitionName?userId=${sessionStorage.getItem("userId")}`).then(res => {
        this.competitionNameList = res.data.data;
      });
    },
    getCretetionData() {
      this.$axios.post("/operation/getcreatorlist", this.$qs.stringify({ userId: this.userId })).then(res => {
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
          this.CountryArr = res.data.data;
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
      const vm = this;
      this.$axios.post("/getCompetitionList", this.EntryMgmt).then(res => {
        vm.tableData = res.data.data.list;
        vm.total = res.data.data.total;
      });
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
    },
    sizeChange(value) {
      const vm = this;
      this.EntryMgmt.pageSize = value;
      this.$axios.post("/getCompetitionList", this.EntryMgmt).then(res => {
        vm.tableData = res.data.data.list;
        vm.total = res.data.data.total;
      });
    },
    currentChange(value) {
      const vm = this;
      this.EntryMgmt.pageNum = value;
      this.$axios.post("/getCompetitionList", this.EntryMgmt).then(res => {
        vm.tableData = res.data.data.list;
        vm.total = res.data.data.total;
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
