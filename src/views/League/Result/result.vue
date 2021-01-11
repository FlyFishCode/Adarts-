<template>
  <div class="content">
    <el-row class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip4") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="ResultMgmtVO.countryId" :placeholder="$t('placeholder.select')" clearable @change="change">
            <el-option v-for="item in ContinentArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="ResultMgmtVO.areaId" :placeholder="$t('placeholder.select')" clearable>
            <el-option v-for="item in CountryArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip6") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="ResultMgmtVO.status" :placeholder="$t('placeholder.select')" clearable>
            <el-option :value=0 :label="$t('all.tip0')"></el-option>
            <el-option :value=1 :label="$t('all.tip27')"></el-option>
            <el-option :value=2 :label="$t('all.tip26')"></el-option>
            <el-option :value=3 :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip5") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="ResultMgmtVO.type" :placeholder="$t('placeholder.select')" clearable>
            <el-option :value=0 :label="$t('all.tip0')"></el-option>
            <el-option :value=1 :label="$t('all.tip42')"></el-option>
            <el-option :value=2 :label="$t('all.tip43')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip7") }}
        </el-col>
        <el-col :span="7">
          <el-col :span="11">
            <el-date-picker v-model="ResultMgmtVO.competitionStartPeriod" type="datetime" :placeholder="$t('placeholder.datePicker')" default-time="00:00:00" @change="dateChange" clearable> </el-date-picker>
          </el-col>
          <el-col :span="1" class="lineClass">-</el-col>
          <el-col :span="11">
            <el-date-picker v-model="ResultMgmtVO.competitionEndPeriod" type="datetime" :placeholder="$t('placeholder.datePicker')" default-time="23:59:59" :picker-options="pickerOptions" clearable> </el-date-picker>
          </el-col>
          </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip8") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="ResultMgmtVO.competitionName" clearable :placeholder="$t('placeholder.select')">
            <el-option v-for="(item,index) in competitionNameList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip9") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="ResultMgmtVO.operatorId" :placeholder="$t('placeholder.select')" clearable>
             <el-option v-for="item in operList" :key="item.id" :label="item.operName" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t('all.tip382') }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="ResultMgmtVO.creatorId" :placeholder="$t('placeholder.select')" clearable>
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
        <el-table-column :label="$t('all.tip5')" min-width="7%">
          <template slot-scope="scope">
            <div>
              {{scope.row.type === 1?$t('all.tip40'):$t('all.tip41')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip3')" min-width="7%">
          <template slot-scope="scope">
            <div class="tableLink" @click="push(scope.row)">{{ scope.row.competitionName }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip7')" min-width="7%">
          <template slot-scope="scope">
            {{scope.row.competitionStartPeriod | showDate}}-{{scope.row.competitionEndPeriod | showDate}}
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
        <el-table-column :label="$t('all.tip25')" min-width="8%">
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
        <el-table-column prop="individualNumber" :label="$t('all.tip310')" min-width="5%"> </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page='1' :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {},
  data() {
    const vm = this;
    return {
      pickerOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.ResultMgmtVO.competitionStartPeriod);
          return time.getTime() < date1;
        }
      },
      ContinentArr: [],
      CountryArr: [],
      operList: [],
      creteList: [],
      ResultMgmtVO: {
        areaId: '',
        countryId: '',
        status: 0,
        type: 0,
        creatorId: '',
        competitionName: '',
        operatorId: '',
        competitionStartPeriod: '',
        competitionEndPeriod: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      currentPage: 1,
      competitionNameList: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const userId = sessionStorage.getItem('userId');
      this.$axios.post('/matchTable/getMatchTableCompetitionList', this.ResultMgmtVO).then((res) => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
      this.$axios.post('/getcountry', this.$qs.stringify({ creatorId: userId })).then((res) => {
        this.ContinentArr = res.data.data;
      });
      this.getOperationdata(userId);
      this.getCretetionData(userId);
      this.getAllCompetitionName();
    },
    getOperationdata(userId) {
      this.$axios.post('/getoperationlist', this.$qs.stringify({ userId })).then(res => {
        this.operList = res.data.data.list;
      });
    },
    getAllCompetitionName() {
      this.$axios.post('/getAllCompetitionName').then(res => {
        this.competitionNameList = res.data.data;
      });
    },
    getCretetionData(userId) {
      this.$axios.post('/operation/getcreatorlist', this.$qs.stringify({ userId })).then(res => {
        this.creteList = res.data.data;
      });
    },
    change(value) {
      const vm = this;
      this.$axios.post('/getareabycountryid', vm.$qs.stringify({ countryId: value })).then((res) => {
        vm.CountryArr = res.data.data;
      });
      this.ResultMgmtVO.areaId = null;
    },
    dateChange(data) {
      if (this.ResultMgmtVO.competitionEndPeriod && this.ResultMgmtVO.competitionEndPeriod < data) {
        this.ResultMgmtVO.competitionEndPeriod = '';
      }
    },
    sizeChange(value) {
      const vm = this;
      this.ResultMgmtVO.pageSize = value;
      // eslint-disable-next-line no-unused-expressions
      this.ResultMgmtVO.status === '0' ? this.ResultMgmtVO.status = null : this.ResultMgmtVO.status;
      this.$axios.post('/matchTable/getMatchTableCompetitionList', this.ResultMgmtVO).then((res) => {
        vm.tableData = res.data.data.list;
        vm.total = res.data.data.total;
        // eslint-disable-next-line no-unused-expressions
        this.ResultMgmtVO.status === null ? this.ResultMgmtVO.status = '0' : this.ResultMgmtVO.status;
      });
    },
    currentChange(value) {
      const vm = this;
      this.ResultMgmtVO.pageNum = value;
      // eslint-disable-next-line no-unused-expressions
      this.ResultMgmtVO.status === '0' ? this.ResultMgmtVO.status = null : this.ResultMgmtVO.status;
      this.$axios.post('/matchTable/getMatchTableCompetitionList', this.ResultMgmtVO).then((res) => {
        vm.tableData = res.data.data.list;
        vm.total = res.data.data.total;
        // eslint-disable-next-line no-unused-expressions
        this.ResultMgmtVO.status === null ? this.ResultMgmtVO.status = '0' : this.ResultMgmtVO.status;
      });
    },
    search() {
      this.$axios.post('/matchTable/getMatchTableCompetitionList', this.ResultMgmtVO).then((res) => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    push(data) {
      this.$router.push({
        name: 'resultInformation',
        query: {
          id: String(data.id),
          competition: data.competitionName,
          status: String(data.status),
          area: JSON.stringify(data.countryList),
          type: String(data.type),
          start: data.competitionStartPeriod,
          end: data.competitionEndPeriod,
          number: data.individualNumber
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
