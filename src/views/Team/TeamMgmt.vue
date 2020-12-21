<template>
  <div class="content">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane :label="$t('all.tip448')" name="first">
        <el-row class="search">
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip315") }}
            </el-col>
            <el-col :span="3">
              <el-input v-model="Competition.teamId" clearable :placeholder="$t('placeholder.input')"></el-input>
            </el-col>
            <el-col class="label-g" :span="2">
              {{ $t("all.tip316") }}
            </el-col>
            <el-col :span="3">
              <el-input v-model="Competition.teamName" clearable :placeholder="$t('placeholder.input')"></el-input>
            </el-col>
            <el-col class="label-g" :span="2">
              {{ $t("all.tip246") }}
            </el-col>
            <el-col :span="3">
              <el-input v-model="Competition.captain" clearable :placeholder="$t('placeholder.input')"></el-input>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip442") }}
            </el-col>
            <el-col :span="3" id="divBoxWidth">
              <el-select v-model="Competition.countryId" clearable :placeholder="$t('placeholder.select')" @change="areaChange">
                <el-option v-for="item in ContinentArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3" id="divBoxWidth">
              <el-select v-model="Competition.areaId" clearable :placeholder="$t('placeholder.select')">
                <el-option v-for="item in CountryArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="2">
              {{ $t("all.tip455") }}
            </el-col>
            <el-col :span="3">
              <el-input v-model="Competition.homeShopName" clearable :placeholder="$t('placeholder.input')"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip154") }}
            </el-col>
            <el-col :span="3" id="divBoxWidth">
              <el-select v-model="ratingType" :placeholder="$t('placeholder.select')">
                <el-option :label="$t('all.tip468')" :value="1"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3" id="divBoxWidth">
              <el-select v-model="Competition.timeSlot" :placeholder="$t('placeholder.select')">
                <el-option :label="$t('all.tip378')" :value="0"></el-option>
                <el-option :label="$t('all.tip379')" :value="1"></el-option>
                <el-option :label="$t('all.tip380')" :value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3" id="divBoxWidth">
              <el-select v-model="Competition.pmr" :placeholder="$t('placeholder.select')">
                <el-option :label="$t('all.tip155')" :value="1"></el-option>
                <el-option :label="$t('all.tip156')" :value="2"></el-option>
                <el-option :label="$t('all.tip154')" :value="3"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4" class="lineInputClass"> <el-input v-model.number="Competition.min" clearable :placeholder="$t('placeholder.input')"></el-input> _ <el-input v-model.number="Competition.max" clearable :placeholder="$t('placeholder.input')"></el-input> </el-col>
            <el-col :span="5" class="lineClass">
              <el-button type="primary" size="mini" @click="search">{{ $t("form.SearchButton") }}</el-button>
              <el-button type="primary" size="mini" @click="download">{{ $t("form.DownloadButton") }}</el-button>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-col :span="2" class="lineClass">
            <el-button type="primary" size="mini" @click="create">{{ $t("all.tip16") }}</el-button>
          </el-col>
        </el-row>

        <div class="table">
          <el-table :data="SearchTeamTableData" border style="width: 100%">
            <el-table-column :sortable="true" :label="$t('all.tip458')" min-width="3%">
              <template slot-scope="scope">
                <div class="formImgBox">
                  <img v-if="scope.row.imgUrl" :src="scope.row.imgUrl" alt="" />
                  <img v-else :src="team" alt="" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="teamId" :sortable="true" :label="$t('all.tip315')" min-width="3%"> </el-table-column>
            <el-table-column :sortable="true" :label="$t('all.tip492')" min-width="5%">
              <template slot-scope="scope">
                <div class="tableLink" @click="detali(scope.row.teamId)">{{ scope.row.teamName + "(" + scope.row.players + ")" }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="captainName" :sortable="true" :label="$t('all.tip246')" min-width="5%"> </el-table-column>
            <el-table-column :sortable="true" :label="$t('all.tip247')" min-width="5%">
              <template slot-scope="scope">
                <div>{{ `${scope.row.homeShopName}[${scope.row.machineCount}]` }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="creatorName" :sortable="true" :label="$t('all.tip382')" min-width="3%"> </el-table-column>
            <el-table-column :label="$t('all.tip461')">
              <el-table-column prop="topPlayerRating" :sortable="true" :label="$t('all.tip154')" min-width="3%"> </el-table-column>
              <el-table-column prop="topPlayerPPd" :sortable="true" :label="$t('all.tip155')" min-width="3%"> </el-table-column>
              <el-table-column prop="topPlayerMpr" :sortable="true" :label="$t('all.tip156')" min-width="3%"> </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('all.tip1')">
              <el-table-column prop="address" :label="$t('all.tip76')" min-width="3%">
                <el-table-column prop="leagueRating" :sortable="true" :label="$t('all.tip154')" min-width="3%"> </el-table-column>
                <el-table-column prop="leaguePPd" :sortable="true" :label="$t('all.tip155')" min-width="3%"> </el-table-column>
                <el-table-column prop="leagueMpr" :sortable="true" :label="$t('all.tip156')" min-width="3%"> </el-table-column>
              </el-table-column>
              <el-table-column prop="address" :label="$t('all.tip420')" min-width="3%">
                <el-table-column prop="totalRating" :sortable="true" :label="$t('all.tip154')" min-width="3%"> </el-table-column>
                <el-table-column prop="totalPPd" :sortable="true" :label="$t('all.tip155')" min-width="3%"> </el-table-column>
                <el-table-column prop="totalMpr" :sortable="true" :label="$t('all.tip156')" min-width="3%"> </el-table-column>
              </el-table-column>
              <el-table-column prop="address" :label="$t('all.tip128')" min-width="3%">
                <el-table-column prop="participationLg" :sortable="true" :label="$t('all.tip385')" min-width="3%"> </el-table-column>
                <el-table-column prop="participationSum" :sortable="true" :label="$t('all.tip386')" min-width="3%"> </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination @size-change="SearchTeamSizeChange" @current-change="SearchTeamCurrentChange" :current-page="1" :page-sizes="[10, 50, 100, 200]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="SearchTeamPageTotal"> </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('all.tip447')" name="two">
        <div class="search">
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip4") }}
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="TeamMgmt.countryId" clearable :placeholder="$t('placeholder.select')" @change="areaIdChange">
                <el-option v-for="item in ContinentArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="TeamMgmt.areaId" clearable :placeholder="$t('placeholder.select')">
                <el-option v-for="item in CountryArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip6") }}
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="TeamMgmt.status" clearable :placeholder="$t('placeholder.select')">
                <el-option :value="0" :label="$t('all.tip0')"></el-option>
                <el-option :value="1" :label="$t('all.tip26')"></el-option>
                <el-option :value="2" :label="$t('all.tip27')"></el-option>
                <el-option :value="3" :label="$t('all.tip28')"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip5") }}
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="TeamMgmt.type" clearable :placeholder="$t('placeholder.select')">
                <el-option value="1" :label="$t('all.tip40')"></el-option>
                <el-option value="2" :label="$t('all.tip41')"></el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip7") }}
            </el-col>
            <el-col :span="3">
              <el-date-picker v-model="TeamMgmt.competitionStartPeriod" type="datetime" default-time="00:00:00" clearable :placeholder="$t('placeholder.datePicker')"> </el-date-picker>
            </el-col>
            <el-col :span="0.5" class="lineClass">-</el-col>
            <el-col :span="3">
              <el-date-picker v-model="TeamMgmt.competitionEndPeriod" type="datetime" default-time="23:59:59" clearable :placeholder="$t('placeholder.datePicker')"> </el-date-picker>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip8") }}
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="TeamMgmt.name" clearable :placeholder="$t('placeholder.select')">
                <el-option v-for="(item, index) in competitionNameList" :key="index" :label="item" :value="item"> </el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip382") }}
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="TeamMgmt.creatorId" clearable :placeholder="$t('placeholder.select')">
                <el-option v-for="item in creteList" :key="item.creatorId" :label="item.creatorName" :value="item.creatorId"></el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip9") }}
            </el-col>
            <el-col :span="3">
              <el-select v-model="TeamMgmt.operatorId" clearable :placeholder="$t('placeholder.select')">
                <el-option v-for="item in operList" :key="item.id" :label="item.operName" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="lineClass">
              <el-button size="mini" type="primary" @click="leagueSearch">{{ $t("all.tip10") }}</el-button>
              <!-- <el-button size="mini" type="primary" @click="download">{{ $t("all.tip11") }}</el-button> -->
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" :sortable="true" :label="$t('all.tip458')" min-width="3%">
              <template  slot-scope="scope">
                <div class="formImgBox">
                  <img v-if="scope.row.imgUrl" :src="scope.row.imgUrl" alt="" />
                  <img v-else :src="team" alt="" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="teamId" :sortable="true" :label="$t('all.tip315')" min-width="3%"> </el-table-column>
            <el-table-column prop="name" :sortable="true" :label="$t('all.tip316') + '(' + $t('all.tip464') + ')'" min-width="5%">
              <template slot-scope="scope">
                <div class="tableLink" @click="detali(scope.row.teamId)">{{ scope.row.teamName + "(" + scope.row.players + ")" }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="captainName" :sortable="true" :label="$t('all.tip246')" min-width="5%"></el-table-column>
            <el-table-column :sortable="true" :label="$t('all.tip247')" min-width="5%">
              <template slot-scope="scope">
                <div>{{ `${scope.row.homeShopName}[${scope.row.machineCount}]` }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="creatorName" :sortable="true" :label="$t('all.tip382')" min-width="3%"> </el-table-column>
            <el-table-column :label="$t('all.tip461')">
              <el-table-column prop="topPlayerRating" :sortable="true" :label="$t('all.tip154')" min-width="3%"> </el-table-column>
              <el-table-column prop="topPlayerPPd" :sortable="true" :label="$t('all.tip155')" min-width="3%"> </el-table-column>
              <el-table-column prop="topPlayerMpr" :sortable="true" :label="$t('all.tip156')" min-width="3%"> </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('all.tip384')">
              <el-table-column :label="$t('all.tip76')" min-width="3%">
                <el-table-column prop="leagueRating" :sortable="true" :label="$t('all.tip154')" min-width="3%"> </el-table-column>
                <el-table-column prop="leaguePPd" :sortable="true" :label="$t('all.tip155')" min-width="3%"> </el-table-column>
                <el-table-column prop="leagueMpr" :sortable="true" :label="$t('all.tip156')" min-width="3%"> </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('all.tip420')" min-width="3%">
                <el-table-column prop="totalRating" :sortable="true" :label="$t('all.tip154')" min-width="3%"> </el-table-column>
                <el-table-column prop="totalPPd" :sortable="true" :label="$t('all.tip155')" min-width="3%"> </el-table-column>
                <el-table-column prop="totalMpr" :sortable="true" :label="$t('all.tip156')" min-width="3%"> </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('all.tip128')" min-width="3%">
                <el-table-column prop="participationLg" :sortable="true" :label="$t('all.tip385')" min-width="3%"> </el-table-column>
                <el-table-column prop="participationSum" :sortable="true" :label="$t('all.tip386')" min-width="3%"> </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination @size-change="TeamSizeChange" @current-change="TeamCurrentChange" :current-page="1" :page-sizes="[10, 50, 100, 200]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="TeamPageTotal"> </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="$t('all.tip416')" :visible.sync="dialogVisible">
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip316") }}
        </el-col>
        <el-col :span="8">
          <el-input v-model="Dialog.teamName" clearable maxlength="20" show-word-limit :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip246") }}
        </el-col>
        <el-col :span="8" id="divBoxWidth">
          <el-select v-model="Dialog.captainId" filterable remote :remote-method="remoteMethod" :placeholder="$t('placeholder.input')">
            <el-option v-for="item in playerList" :key="item.id" :label="item.label" :value="item.id"> </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip455") }}
        </el-col>
        <el-col :span="8" id="divBoxWidth">
          <el-select v-model="Dialog.shopId" :placeholder="$t('placeholder.select')">
            <el-option v-for="item in shopList" :key="item.shopId" :label="item.shopName" :value="item.shopId"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip389") }}
        </el-col>
        <el-col :span="8" id="divBoxWidth">
          <el-date-picker v-model="Dialog.regDate" type="date" format="yyyy-MM-dd" :placeholder="$t('placeholder.datePicker')"> </el-date-picker>
        </el-col>
      </el-row>
      <el-row class="DialogButton">
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="save">{{ $t("all.tip136") }}</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {},
  data() {
    return {
      team: require('../../assets/team.jpg'),
      dialogVisible: false,
      SearchTeamPageTotal: 0,
      TeamPageTotal: 1,
      SearchTeamTableData: [],
      name: '',
      activeName: 'first',
      StartTime: '',
      EndTime: '',
      WomenNums: '',
      TeamMgmt: {
        areaId: '',
        countryId: '',
        status: '',
        type: '',
        competitionStartPeriod: null,
        competitionEndPeriod: null,
        name: '',
        creatorId: '',
        operatorId: '',
        pageNum: 1,
        pageSize: 10
      },
      competitionNameList: [],
      creteList: [],
      operList: [],
      shopList: [],
      playerList: [],
      ContinentArr: [],
      CountryArr: [],
      Dialog: {
        teamName: '',
        captainId: '',
        shopId: '',
        regDate: new Date(),
        createId: ''
      },
      ratingType: 1,
      Competition: {
        teamId: '',
        teamName: '',
        captain: '',
        areaId: '',
        countryId: '',
        homeShopName: '',
        timeSlot: 0,
        pmr: 3,
        min: '',
        max: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: []
    };
  },
  mounted() {
    const userId = sessionStorage.getItem('userId');
    this.Dialog.createId = userId;
    this.name = this.$route.params.name;
    this.search();
    this.leagueSearch();
    this.getShopList();
    this.getAreaList(userId);
    this.getCretetionData(userId);
    this.getOperationdata(userId);
    this.getAllCompetitionName();
  },
  methods: {
    remoteMethod(value) {
      if (value) {
        this.$axios.post('/getplayerlist', this.$qs.stringify({ label: value })).then(res => {
          this.playerList = res.data.data;
        });
      } else {
        this.playerList = [];
      }
    },
    getAllCompetitionName() {
      this.$axios.post('/getAllCompetitionName').then(res => {
        this.competitionNameList = res.data.data;
      });
    },
    getCretetionData(userId) {
      this.$axios.post('/getcreatorlist', this.$qs.stringify({ userId })).then(res => {
        this.creteList = res.data.data;
      });
    },
    getOperationdata(userId) {
      this.$axios.post('/getoperationlist', this.$qs.stringify({ userId })).then(res => {
        this.operList = res.data.data.list;
      });
    },
    getAreaList(userId) {
      this.$axios.post('/getcountry', this.$qs.stringify({ creatorId: userId })).then(res => {
        this.ContinentArr = res.data.data;
      });
    },
    areaChange(value) {
      this.$axios.post('/getareabycountryid', this.$qs.stringify({ countryId: value })).then(res => {
        this.CountryArr = res.data.data;
      });
      this.Competition.areaId = '';
    },
    areaIdChange(value) {
      this.$axios.post('/getareabycountryid', this.$qs.stringify({ countryId: value })).then(res => {
        this.CountryArr = res.data.data;
      });
      this.TeamMgmt.areaId = '';
    },
    getShopList() {
      const userId = sessionStorage.getItem('userId');
      this.$axios.post('/getshop', this.$qs.stringify({ userId })).then(res => {
        this.shopList = res.data.data.list;
      });
    },
    search() {
      this.$axios.post('/getTeamList', this.Competition).then(res => {
        this.SearchTeamPageTotal = res.data.data.total;
        this.SearchTeamTableData = res.data.data.list;
      });
    },
    SearchTeamSizeChange(val) {
      this.Competition.pageSize = val;
      this.$axios.post('/getTeamList', this.Competition).then(res => {
        this.SearchTeamTableData = res.data.data.list;
      });
    },
    SearchTeamCurrentChange(val) {
      this.Competition.pageNum = val;
      this.$axios.post('/getTeamList', this.Competition).then(res => {
        this.SearchTeamTableData = res.data.data.list;
      });
    },
    leagueSearch() {
      this.$axios.post('/getTeamListComp', this.TeamMgmt).then(res => {
        if (res.data.errorCode) {
          this.$message(res.data.msg);
        } else {
          this.tableData = res.data.data.list;
          this.TeamPageTotal = res.data.data.total;
        }
      });
    },
    TeamSizeChange(val) {
      this.TeamMgmt.pageSize = val;
      this.$axios.post('/getTeamListComp', this.TeamMgmt).then(res => {
        this.tableData = res.data.data.list;
      });
    },
    TeamCurrentChange(val) {
      this.TeamMgmt.pageNum = val;
      this.$axios.post('/getTeamListComp', this.TeamMgmt).then(res => {
        this.tableData = res.data.data.list;
      });
    },
    save() {
      const vm = this;
      vm.Dialog.regDate = new Date(vm.Dialog.regDate);
      this.$axios.post('/addTeam', vm.Dialog).then(res => {
        this.$message(res.data.msg);
        this.Dialog.teamName = '';
        this.Dialog.captainId = '';
        this.Dialog.shopId = '';
        this.Dialog.regDate = '';
        this.search();
      });
      this.dialogVisible = false;
    },
    download() {},
    create() {
      this.dialogVisible = true;
    },
    mgmt() {
      this.$router.push({
        name: 'entryList'
      });
    },
    detali(id) {
      this.$router.push({
        path: 'teamInformation',
        query: {
          id
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
.tableLink {
  color: #1890ff;
  cursor: pointer;
}
.lineInputClass {
  display: flex;
}
</style>
