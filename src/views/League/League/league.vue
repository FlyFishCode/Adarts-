<template>
  <div class="content">
    <div class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">{{ $t("all.tip4") }}</el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="LeagueMgmtVO.countryId" @change="AreaOneChange" clearable :placeholder="$t('all.tip516')">
            <el-option v-for="item in ContinentArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="LeagueMgmtVO.areaId" clearable :placeholder="$t('all.tip516')">
            <el-option v-for="item in CountryArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">{{ $t("all.tip6") }}</el-col>
        <el-col :span="3">
          <el-select v-model="LeagueMgmtVO.status" :placeholder="$t('all.tip516')">
            <el-option :value="null" :label="$t('all.tip0')"></el-option>
            <el-option :value="1" :label="$t('all.tip26')"></el-option>
            <el-option :value="2" :label="$t('all.tip27')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">{{ $t("all.tip9") }}</el-col>
        <el-col :span="3">
          <el-select v-model="LeagueMgmtVO.operatorId" clearable :placeholder="$t('all.tip516')">
            <el-option v-for="item in operList" :key="item.id" :label="item.operName" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">{{ $t("all.tip7") }}</el-col>
        <el-col :span="3">
          <el-date-picker v-model="LeagueMgmtVO.competitionStartPeriod" type="date" :placeholder="$t('all.tip516')" default-time="00:00:00" @change="dateChange"></el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-date-picker v-model="LeagueMgmtVO.competitionEndPeriod" type="date" :placeholder="$t('all.tip516')" default-time="23:59:59" :picker-options="pickerOptions"> </el-date-picker>
        </el-col>
        <el-col class="label-g" :span="3">{{ $t("all.tip5") }}</el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="LeagueMgmtVO.type" :placeholder="$t('all.tip516')">
            <el-option :value="0" :label="$t('all.tip0')"></el-option>
            <el-option :value="1" :label="$t('all.tip42')"></el-option>
            <el-option :value="2" :label="$t('all.tip43')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">{{ $t("all.tip382") }}</el-col>
        <el-col :span="3">
          <el-select v-model="LeagueMgmtVO.creatorId" clearable :placeholder="$t('all.tip516')">
            <el-option v-for="item in creteList" :key="item.creatorId" :label="item.creatorName" :value="item.creatorId"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip8") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="LeagueMgmtVO.competitionName" clearable filterable :placeholder="$t('all.tip516')">
            <el-option v-for="(item, index) in competitionNameList" :key="index" :label="item" :value="item"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("all.tip10") }}</el-button>
          <!-- <el-button type="primary" size="mini" @click="download">{{ $t("all.tip521") }}</el-button> -->
        </el-col>
      </el-row>
    </div>

    <el-row class="center-Row">
      <el-col class="label-g" :span="2">{{ $t("all.tip12") }}</el-col>
      <el-col :span="2">
        <el-select v-model="createValue" :placeholder="$t('all.tip516')">
          <el-option value="1" :label="$t('all.tip13')"></el-option>
          <el-option value="2" :label="$t('all.tip14')"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="lineClass">
        <el-button type="primary" size="mini" @click="create">{{ $t("all.tip16") }}</el-button>
      </el-col>
    </el-row>

    <div class="table">
      <el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'competitionId', order: 'descending' }">
        <el-table-column :label="$t('all.tip5')" min-width="8%">
          <template slot-scope="scope">
            <div>{{ scope.row.type === 1 ? $t("all.tip40") : $t("all.tip41") }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip1')" min-width="15%">
          <template slot-scope="scope">
            <div class="tableLink" @click="entryLeagueInfo(scope.row.competitionId)">{{ scope.row.competitionName }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip17')" min-width="8%">
          <template slot-scope="scope">
            <div v-for="item in scope.row.countryList" :key="item.index">{{ item.countryName }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip442')" min-width="8%">
          <template slot-scope="scope">
            <div v-for="item in scope.row.countryList" :key="item.index">{{ item.areaName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="stage" :sortable="true" :label="$t('all.tip21')" min-width="7%"></el-table-column>
        <el-table-column :label="$t('all.tip520')">
          <el-table-column prop="application" :label="$t('all.tip23')" min-width="10%"> </el-table-column>
          <el-table-column prop="approve" :label="$t('all.tip24')" min-width="9%"></el-table-column>
        </el-table-column>
        <el-table-column :label="$t('all.tip7')" min-width="14%">
          <template slot-scope="scope">
            <div>{{ scope.row.competitionStartPeriod }}-{{ scope.row.competitionEndPeriod }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="userName" :sortable="true" :label="$t('all.tip382')" min-width="8%"></el-table-column>
        <el-table-column :label="$t('all.tip9')" min-width="10%">
          <template slot-scope="scope">
            <div v-for="item in scope.row.operatorList" :key="item.index">{{ item }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip25')" min-width="7%">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 1">{{ $t("all.tip26") }}</div>
            <div v-if="scope.row.status === 2">{{ $t("all.tip27") }}</div>
            <div v-if="scope.row.status === 3">{{ $t("all.tip28") }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip2')" min-width="17%">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 1">
              <el-button size="mini" @click="close(scope.row.competitionId)">{{ $t("all.tip264") }}</el-button>
              <el-button size="mini" type="primary" @click="cancel(scope.row.competitionId)">{{ $t("all.tip468") }}</el-button>
              <el-button size="mini" type="danger" @click="deleteLeague(scope.row.competitionId)">{{ $t("all.tip130") }}</el-button>
            </div>
            <div v-else>
              <el-button size="mini" @click="open(scope.row.competitionId)">{{ $t("all.tip31") }}</el-button>
              <el-button size="mini" type="danger" @click="deleteLeague(scope.row.competitionId)">{{ $t("all.tip130") }}</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip32')" min-width="11%">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleView(scope.row)">{{ $t("all.tip33") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- type = 模块  Modular -->
    <div id="topBox">
      <el-dialog :title="$t('all.tip39')" :visible.sync="ModularVisible">
        <el-row class="center-Row">
          <el-col class="label-g" :span="4">{{ $t("all.tip5") }}</el-col>
          <el-col :span="4">
            <el-select v-model="dialog.DialogMoudleName" :placeholder="$t('all.tip516')">
              <el-option value="1" :label="$t('all.tip0')"></el-option>
              <el-option value="2" :label="$t('all.tip42')"></el-option>
              <el-option value="3" :label="$t('all.tip43')"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3" class="lineClass">
            <el-button type="primary" size="mini" @click="create">{{ $t("all.tip10") }}</el-button>
          </el-col>
        </el-row>
        <el-table :data="moudleTopBoxData" border>
          <el-table-column :label="$t('all.tip44')" min-width="10%">
            <template slot-scope="scope">
              <el-radio v-model="dialog.DialogMoudleRadio" :label="scope.row.radio" @change="change(scope.row)"> </el-radio>
            </template>
          </el-table-column>
          <el-table-column property="type" :label="$t('all.tip45')" min-width="10%"></el-table-column>
          <el-table-column property="name" :label="$t('all.tip48')" min-width="10%"></el-table-column>
        </el-table>
        <el-row class="DialogButton">
          <el-col :span="3">
            <el-button type="primary" size="mini" @click="ModularConfirm">{{ $t("all.tip47") }}</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <!-- type = 模板 Template -->
    <div id="topBox">
      <el-dialog :title="$t('all.tip39')" :visible.sync="TemplateVisible">
        <el-row class="center-Row">
          <el-col class="label-g" :span="4">{{ $t("all.tip48") }}</el-col>
          <el-col :span="4">
            <el-input v-model="template.TemplateName" clearable :placeholder="$t('all.tip38')"></el-input>
          </el-col>
          <el-col class="label-g" :span="4">{{ $t("all.tip5") }}</el-col>
          <el-col :span="4">
            <el-select v-model="template.TemplateType" :placeholder="$t('all.tip516')">
              <el-option :value="1" :label="$t('all.tip42')"></el-option>
              <el-option :value="2" :label="$t('all.tip43')"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4" class="lineClass">
            <el-button type="primary" size="mini" @click="create">{{ $t("all.tip10") }}</el-button>
          </el-col>
        </el-row>
        <el-table :data="TemplateTopBoxData" border>
          <el-table-column :label="$t('all.tip44')" min-width="5%">
            <template slot-scope="scope">
              <el-radio v-model="template.TemplateRadio" :label="scope.row.competitionId"> </el-radio>
            </template>
          </el-table-column>
          <el-table-column :label="$t('all.tip45')" min-width="5%">
            <template slot-scope="scope">
              <div>{{ $t(scope.row.type) }}</div>
            </template>
          </el-table-column>
          <el-table-column property="name" :label="$t('all.tip48')" min-width="10%"></el-table-column>
          <el-table-column property="description" :label="$t('all.tip49')" min-width="10%"></el-table-column>
        </el-table>
        <el-row class="DialogButton">
          <el-button type="primary" size="mini" @click="TemplateConfirm">{{ $t("all.tip47") }}</el-button>
        </el-row>
        <div class="page">
          <el-pagination
            @size-change="templateSizeChange"
            @current-change="templateCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="templateTotal"
          ></el-pagination>
        </div>
      </el-dialog>
    </div>
    <div class="page">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="1"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// import city from '../../../components/common/region';
// import findCity from '../../../components/common/Utils';
// @ is an alias to /src
export default {
  name: "home",
  components: {},
  data() {
    const vm = this;
    return {
      pickerOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.LeagueMgmtVO.competitionStartPeriod);
          return time.getTime() < date1;
        }
      },
      total: 1,
      city: "",
      templateTotal: 1,
      ModularVisible: false,
      TemplateVisible: false,
      ContinentArr: [],
      CountryArr: [],
      competitionNameList: [],
      createValue: "1",
      LeagueMgmtVO: {
        areaId: "",
        countryId: "",
        status: null,
        type: 0,
        competitionStartPeriod: "",
        competitionEndPeriod: "",
        competitionName: "",
        operatorId: "",
        creatorId: "",
        userId: sessionStorage.getItem("LeagueUserId"),
        pageNum: 1,
        pageSize: 10
      },
      template: {
        TemplateName: "",
        TemplateType: 1,
        TemplateRadio: ""
      },
      dialog: {
        DialogMoudleName: "1",
        DialogMoudleRadio: 1,
        DialogTemplateRadio: "1"
      },
      moudleTopBoxData: [
        {
          radio: 1,
          type: "Local",
          name: "Local League"
        },
        {
          radio: 2,
          type: "Online",
          name: "Online League"
        }
      ],
      TemplateTopBoxData: [],
      tableData: [],
      operList: [],
      creteList: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.LeagueMgmtVO.userId = sessionStorage.getItem("LeagueUserId");
      this.search();
      this.getCountry(this.LeagueMgmtVO.userId);
      this.getOperationdata(this.LeagueMgmtVO.userId);
      this.getCretetionData(this.LeagueMgmtVO.userId);
      this.getAllCompetitionName(this.LeagueMgmtVO.userId);
    },
    search() {
      this.$axios.post("/getcompetitionList", this.LeagueMgmtVO).then(res => {
        if (res.data.code === 1000) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    sizeChange(value) {
      this.LeagueMgmtVO.pageSize = value;
      this.search();
    },
    currentChange(value) {
      this.LeagueMgmtVO.pageNum = value;
      this.search();
    },
    getCountry(creatorId) {
      this.$axios.post("/getcountry", this.$qs.stringify({ creatorId })).then(res => {
        this.ContinentArr = res.data.data;
      });
    },
    getAllCompetitionName(userId) {
      this.$axios.get(`/getAllCompetitionName?userId=${userId}`).then(res => {
        this.competitionNameList = res.data.data;
      });
    },
    getOperationdata(userId) {
      this.$axios.post("/operation/getoperationlist", this.$qs.stringify({ userId })).then(res => {
        if (res.data.code === 1000) {
          this.operList = res.data.data.list;
        }
      });
    },
    getCretetionData(userId) {
      this.$axios.post("/operation/getcreatorlist", this.$qs.stringify({ userId })).then(res => {
        if (res.data.code === 1000) {
          this.creteList = res.data.data;
        }
      });
    },
    dateChange(data) {
      if (this.LeagueMgmtVO.competitionEndPeriod && this.LeagueMgmtVO.competitionEndPeriod < data) {
        this.LeagueMgmtVO.competitionEndPeriod = "";
      }
    },
    AreaOneChange(value) {
      const vm = this;
      this.$axios.post("/getareabycountryid", vm.$qs.stringify({ countryId: value })).then(res => {
        vm.CountryArr = res.data.data;
      });
      this.LeagueMgmtVO.areaId = "";
    },
    download() {
      console.log("Download");
    },
    create() {
      if (this.createValue === "1") {
        this.ModularVisible = true;
      } else {
        this.getTemplateTopBoxData();
        this.TemplateVisible = true;
      }
    },
    close(competitionId) {
      this.$axios.post("/close", this.$qs.stringify({ competitionId })).then(() => {
        this.search();
      });
    },
    cancel(competitionId) {
      this.$axios.post("/cancel", this.$qs.stringify({ competitionId })).then(() => {
        this.search();
      });
    },
    open(competitionId) {
      this.$axios.post("/open", this.$qs.stringify({ competitionId })).then(res => {
        this.$message(res.data.msg);
        this.search();
      });
    },
    deleteLeague(id) {
      this.$axios.post("/delcompetitionbyid", this.$qs.stringify({ id })).then(res => {
        this.$message(res.data.msg);
        this.search();
      });
    },
    entryLeagueInfo(id) {
      this.$router.push({
        path: "competition",
        query: {
          id,
          showData: true
        }
      });
    },
    ModularConfirm() {
      this.ModularVisible = false;
      this.$store.commit("changeMenuList", [
        {
          id: "1",
          label: "League",
          url: "competition",
          parentId: ""
        }
      ]);
      this.$router.push({
        path: "/competition",
        query: {
          id: 1,
          first: true,
          type: `${this.dialog.DialogMoudleRadio}`
        }
      });
    },
    TemplateConfirm() {
      if (this.template.TemplateRadio) {
        let id = "";
        this.TemplateVisible = false;
        this.$store.commit("changeMenuList", [
          {
            id: "1",
            label: "League",
            url: "competition",
            parentId: ""
          }
        ]);
        this.$axios.post(`/template/foundCompByTemp?competitionId=${this.template.TemplateRadio}`).then(res => {
          if (res.data.data) {
            id = res.data.data;
            this.$router.push({
              name: "/competition",
              query: {
                id,
                showData: true
              }
            });
          }
        });
      } else {
        this.$message(this.$t("all.tip627"));
      }
    },
    handleView(data) {
      this.$router.push({
        name: "resultMgmt",
        query: {
          id: data.competitionId,
          name: data.competitionName,
          status: String(data.status),
          Area: JSON.stringify(data.countryList),
          type: String(data.type),
          date: `${data.competitionStartPeriod}-${data.competitionEndPeriod}`
        }
      });
    },
    getTemplateTopBoxData(pageNum = 1, pageSize = 10) {
      const data = {
        userId: this.LeagueMgmtVO.userId,
        name: this.template.TemplateName,
        leagueType: this.template.TemplateType,
        pageNum,
        pageSize
      };
      this.$axios.post("/template/gettemplatelist", this.$qs.stringify(data)).then(res => {
        this.TemplateTopBoxData = res.data.data.list;
        this.templateTotal = res.data.data.total;
      });
    },
    templateSizeChange(value) {
      this.getTemplateTopBoxData(undefined, value);
    },
    templateCurrentChange(value) {
      this.getTemplateTopBoxData(value);
    },
    change(a) {
      console.log(a);
    }
  }
};
</script>
<style scoped>
.content {
  border: 1px solid #eeeeee;
}
.center {
  padding-left: 16px;
}
.el-table >>> td,
.el-table >>> th {
  text-align: center;
}
.topBox {
  margin-bottom: 15px;
}
#topBox >>> .el-radio__label {
  display: none;
}
</style>
