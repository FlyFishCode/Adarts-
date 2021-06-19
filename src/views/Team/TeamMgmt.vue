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
              <el-input v-model="Competition.teamId" clearable :placeholder="$t('all.tip38')"></el-input>
            </el-col>
            <el-col class="label-g" :span="2">
              {{ $t("all.tip316") }}
            </el-col>
            <el-col :span="3">
              <el-input v-model="Competition.teamName" clearable :placeholder="$t('all.tip38')"></el-input>
            </el-col>
            <el-col class="label-g" :span="2">
              {{ $t("all.tip246") }}
            </el-col>
            <el-col :span="3">
              <el-input v-model="Competition.captain" clearable :placeholder="$t('all.tip38')"></el-input>
            </el-col>
            <el-col class="label-g" :span="2">
              {{ $t("all.tip455") }}
            </el-col>
            <el-col :span="3">
              <el-input v-model="Competition.homeShopName" clearable :placeholder="$t('all.tip38')"></el-input>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip442") }}
            </el-col>
            <el-col :span="3" id="divBoxWidth">
              <el-select v-model="Competition.countryId" clearable :placeholder="$t('all.tip516')" @change="countryChange">
                <el-option v-for="item in countryList" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3" id="divBoxWidth">
              <el-select v-model="Competition.areaId" clearable :placeholder="$t('all.tip516')">
                <el-option v-for="item in areaList" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip154") }}
            </el-col>
            <el-col :span="3" id="divBoxWidth">
              <el-select v-model="ratingType" :placeholder="$t('all.tip516')">
                <el-option :label="$t('all.tip76')" :value="1"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3" id="divBoxWidth">
              <el-select v-model="Competition.timeSlot" :placeholder="$t('all.tip516')">
                <el-option :label="$t('all.tip378')" :value="0"></el-option>
                <el-option :label="$t('all.tip379')" :value="1"></el-option>
                <el-option :label="$t('all.tip380')" :value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3" id="divBoxWidth">
              <el-select v-model="Competition.pmr" :placeholder="$t('all.tip516')">
                <el-option :label="$t('all.tip155')" :value="1"></el-option>
                <el-option :label="$t('all.tip156')" :value="2"></el-option>
                <el-option :label="$t('all.tip154')" :value="3"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4" class="lineInputClass">
              <el-input v-model.number="Competition.min" clearable :placeholder="$t('all.tip38')"></el-input> _
              <el-input v-model.number="Competition.max" clearable :placeholder="$t('all.tip38')"></el-input>
            </el-col>
            <el-col :span="2" class="lineClass">
              <el-button type="primary" size="mini" @click="search">{{ $t("all.tip10") }}</el-button>
              <!-- <el-button type="primary" size="mini" @click="download">{{ $t("all.tip521") }}</el-button> -->
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-col :span="1" class="lineClass">
            <el-button type="primary" size="mini" @click="() => (this.dialogVisible = true)">{{ $t("all.tip16") }}</el-button>
          </el-col>
        </el-row>

        <div class="table">
          <el-table :data="SearchTeamTableData" border style="width: 100%">
            <el-table-column :label="$t('all.tip458')" min-width="3%">
              <template slot-scope="scope">
                <div class="formImgBox">
                  <img v-if="scope.row.imgUrl" :src="scope.row.imgUrl" alt="" />
                  <img v-else :src="team" alt="" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="teamId" :label="$t('all.tip315')" min-width="3%"> </el-table-column>
            <el-table-column :label="$t('all.tip492')" min-width="5%">
              <template slot-scope="scope">
                <div class="tableLink" @click="detali(scope.row.teamId)">{{ scope.row.teamName + "(" + scope.row.players + ")" }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="captainAccount" :label="$t('all.tip632')" min-width="5%"></el-table-column>
            <el-table-column prop="captainName" :label="$t('all.tip246')" min-width="5%"> </el-table-column>
            <el-table-column :label="$t('all.tip247')" min-width="5%">
              <template slot-scope="scope">
                <div>{{ `${scope.row.homeShopName}[${scope.row.machineCount}]` }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="creatorName" :label="$t('all.tip382')" min-width="3%"> </el-table-column>
            <el-table-column :label="$t('all.tip461')">
              <el-table-column prop="topPlayerRating" :label="$t('all.tip154')" min-width="3%"> </el-table-column>
              <el-table-column prop="topPlayerPPd" :sortable="true" :label="$t('all.tip155')" min-width="3%"> </el-table-column>
              <el-table-column prop="topPlayerMpr" :sortable="true" :label="$t('all.tip156')" min-width="3%"> </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('all.tip1')">
              <el-table-column prop="address" :label="$t('all.tip76')" min-width="3%">
                <el-table-column prop="leagueRating" :label="$t('all.tip154')" min-width="3%"> </el-table-column>
                <el-table-column prop="leaguePPd" :sortable="true" :label="$t('all.tip155')" min-width="3%"> </el-table-column>
                <el-table-column prop="leagueMpr" :sortable="true" :label="$t('all.tip156')" min-width="3%"> </el-table-column>
              </el-table-column>
              <el-table-column prop="address" :label="$t('all.tip420')" min-width="3%">
                <el-table-column prop="totalRating" :label="$t('all.tip154')" min-width="3%"> </el-table-column>
                <el-table-column prop="totalPPd" :sortable="true" :label="$t('all.tip155')" min-width="3%"> </el-table-column>
                <el-table-column prop="totalMpr" :sortable="true" :label="$t('all.tip156')" min-width="3%"> </el-table-column>
              </el-table-column>
              <el-table-column prop="address" :label="$t('all.tip128')" min-width="3%">
                <el-table-column prop="participationLg" :sortable="true" :label="$t('all.tip1')" min-width="3%"> </el-table-column>
                <el-table-column prop="participationSum" :sortable="true" :label="$t('all.tip386')" min-width="3%"> </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            @size-change="SearchTeamSizeChange"
            @current-change="SearchTeamCurrentChange"
            :current-page="1"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="SearchTeamPageTotal"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('all.tip447')" name="two">
        <div class="search">
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip4") }}
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="TeamMgmt.countryId" clearable :placeholder="$t('all.tip516')" @change="areaIdChange">
                <el-option v-for="item in countryList" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="TeamMgmt.areaId" clearable :placeholder="$t('all.tip516')">
                <el-option v-for="item in areaList" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip6") }}
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="TeamMgmt.status" :placeholder="$t('all.tip516')">
                <el-option :value="0" :label="$t('all.tip0')"></el-option>
                <el-option :value="1" :label="$t('all.tip26')"></el-option>
                <el-option :value="2" :label="$t('all.tip27')"></el-option>
                <el-option :value="3" :label="$t('all.tip28')"></el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip9") }}
            </el-col>
            <el-col :span="3">
              <el-select v-model="TeamMgmt.operatorId" clearable :placeholder="$t('all.tip516')">
                <el-option v-for="item in operList" :key="item.id" :label="item.operName" :value="item.id"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip7") }}
            </el-col>
            <el-col :span="6">
              <el-col :span="12">
                <el-date-picker v-model="TeamMgmt.competitionStartPeriod" type="datetime" default-time="00:00:00" clearable :placeholder="$t('all.tip516')"> </el-date-picker>
              </el-col>
              <el-col :span="12">
                <el-date-picker v-model="TeamMgmt.competitionEndPeriod" type="datetime" default-time="23:59:59" clearable :placeholder="$t('all.tip516')"> </el-date-picker>
              </el-col>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip5") }}
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="TeamMgmt.type" :placeholder="$t('all.tip516')">
                <el-option :value="0" :label="$t('all.tip0')"></el-option>
                <el-option :value="1" :label="$t('all.tip42')"></el-option>
                <el-option :value="2" :label="$t('all.tip43')"></el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip382") }}
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="TeamMgmt.creatorId" clearable :placeholder="$t('all.tip516')">
                <el-option v-for="item in creteList" :key="item.creatorId" :label="item.creatorName" :value="item.creatorId"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip8") }}
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="TeamMgmt.name" clearable filterable :placeholder="$t('all.tip516')">
                <el-option v-for="(item, index) in competitionNameList" :key="index" :label="item" :value="item"> </el-option>
              </el-select>
            </el-col>
            <el-col :span="2" class="lineClass">
              <el-button size="mini" type="primary" @click="leagueSearch">{{ $t("all.tip10") }}</el-button>
              <!-- <el-button size="mini" type="primary" @click="download">{{ $t("all.tip11") }}</el-button> -->
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" :sortable="true" :label="$t('all.tip458')" min-width="3%">
              <template slot-scope="scope">
                <div class="formImgBox">
                  <img v-if="scope.row.imgUrl" :src="scope.row.imgUrl" alt="" />
                  <img v-else :src="team" alt="" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="teamId" :label="$t('all.tip315')" min-width="3%"> </el-table-column>
            <el-table-column :label="$t('all.tip316') + '(' + $t('all.tip464') + ')'" min-width="5%">
              <template slot-scope="scope">
                <div class="tableLink" @click="detali(scope.row.teamId)">{{ scope.row.teamName + "(" + scope.row.players + ")" }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="captainName" :label="$t('all.tip246')" min-width="5%"></el-table-column>
            <el-table-column :sortable="true" :label="$t('all.tip247')" min-width="5%">
              <template slot-scope="scope">
                <div>{{ `${scope.row.homeShopName}[${scope.row.machineCount}]` }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="creatorName" :label="$t('all.tip382')" min-width="3%"> </el-table-column>
            <el-table-column :label="$t('all.tip461')">
              <el-table-column prop="topPlayerRating" :label="$t('all.tip154')" min-width="3%"> </el-table-column>
              <el-table-column prop="topPlayerPPd" :sortable="true" :label="$t('all.tip155')" min-width="3%"> </el-table-column>
              <el-table-column prop="topPlayerMpr" :sortable="true" :label="$t('all.tip156')" min-width="3%"> </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('all.tip384')">
              <el-table-column :label="$t('all.tip76')" min-width="3%">
                <el-table-column prop="leagueRating" :label="$t('all.tip154')" min-width="3%"> </el-table-column>
                <el-table-column prop="leaguePPd" :sortable="true" :label="$t('all.tip155')" min-width="3%"> </el-table-column>
                <el-table-column prop="leagueMpr" :sortable="true" :label="$t('all.tip156')" min-width="3%"> </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('all.tip420')" min-width="3%">
                <el-table-column prop="totalRating" :label="$t('all.tip154')" min-width="3%"> </el-table-column>
                <el-table-column prop="totalPPd" :sortable="true" :label="$t('all.tip155')" min-width="3%"> </el-table-column>
                <el-table-column prop="totalMpr" :sortable="true" :label="$t('all.tip156')" min-width="3%"> </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('all.tip128')" min-width="3%">
                <el-table-column prop="participationLg" :sortable="true" :label="$t('all.tip1')" min-width="3%"> </el-table-column>
                <el-table-column prop="participationSum" :sortable="true" :label="$t('all.tip386')" min-width="3%"> </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            @size-change="TeamSizeChange"
            @current-change="TeamCurrentChange"
            :current-page="1"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="TeamPageTotal"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="$t('all.tip416')" :visible.sync="dialogVisible">
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip316") }}
        </el-col>
        <el-col :span="8">
          <el-input v-model="Dialog.teamName" clearable maxlength="20" show-word-limit :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip632") }}
        </el-col>
        <el-col :span="8" id="divBoxWidth">
          <el-select v-model="Dialog.captainId" filterable remote :remote-method="remoteMethod" :placeholder="$t('all.tip38')">
            <el-option v-for="item in playerList" :key="item.id" :label="item.account" :value="item.id"> </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip455") }}
        </el-col>
        <el-col :span="8" id="divBoxWidth">
          <el-select v-model="Dialog.shopId" :placeholder="$t('all.tip516')">
            <el-option v-for="item in shopList" :key="item.shopId" :label="item.shopName" :value="item.shopId"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip389") }}
        </el-col>
        <el-col :span="8" id="divBoxWidth">
          <el-date-picker v-model="Dialog.regDate" type="date" format="yyyy-MM-dd" :placeholder="$t('all.tip516')"> </el-date-picker>
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
  name: "home",
  components: {},
  data() {
    return {
      team: require("../../assets/img/team.jpg"),
      dialogVisible: false,
      SearchTeamPageTotal: 0,
      TeamPageTotal: 1,
      SearchTeamTableData: [],
      name: "",
      activeName: "first",
      StartTime: "",
      EndTime: "",
      WomenNums: "",
      TeamMgmt: {
        areaId: "",
        countryId: "",
        status: 0,
        type: 0,
        competitionStartPeriod: null,
        competitionEndPeriod: null,
        name: "",
        creatorId: "",
        operatorId: "",
        pageNum: 1,
        pageSize: 10
      },
      competitionNameList: [],
      creteList: [],
      operList: [],
      shopList: [],
      playerList: [],
      countryList: [],
      areaList: [],
      Dialog: {
        teamName: "",
        captainId: "",
        shopId: "",
        regDate: new Date(),
        createId: ""
      },
      ratingType: 1,
      Competition: {
        teamId: "",
        teamName: "",
        captain: "",
        areaId: "",
        countryId: "",
        homeShopName: "",
        timeSlot: 0,
        pmr: 3,
        min: "",
        max: "",
        userId: sessionStorage.getItem("LeagueUserId"),
        pageNum: 1,
        pageSize: 10
      },
      tableData: []
    };
  },
  mounted() {
    const userId = sessionStorage.getItem("LeagueUserId");
    this.Dialog.createId = userId;
    this.name = this.$route.params.name;
    this.search();
    this.leagueSearch();
    this.getShopList(userId);
    this.getAreaList(userId);
    this.getCretetionData(userId);
    this.getOperationdata(userId);
    this.getAllCompetitionName();
  },
  methods: {
    remoteMethod(value) {
      if (value) {
        this.$axios.post("/accountplayerlist", this.$qs.stringify({ account: value })).then(res => {
          this.playerList = res.data.data;
        });
      } else {
        this.playerList = [];
      }
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
    getOperationdata(userId) {
      this.$axios.post("/operation/getoperationlist", this.$qs.stringify({ userId })).then(res => {
        this.operList = res.data.data.list;
      });
    },
    getAreaList(userId) {
      this.$axios.post("/getcountry", this.$qs.stringify({ creatorId: userId })).then(res => {
        this.countryList = res.data.data;
      });
    },
    countryChange(value) {
      this.$axios.post("/getareabycountryid", this.$qs.stringify({ countryId: value })).then(res => {
        this.areaList = res.data.data;
      });
      this.Competition.areaId = "";
    },
    areaIdChange(value) {
      this.$axios.post("/getareabycountryid", this.$qs.stringify({ countryId: value })).then(res => {
        this.areaList = res.data.data;
      });
      this.TeamMgmt.areaId = "";
    },
    getShopList(userId) {
      this.$axios.post("/getshop", this.$qs.stringify({ userId })).then(res => {
        this.shopList = res.data.data.list;
      });
    },
    search() {
      this.$axios.post("/getTeamList", this.Competition).then(res => {
        if (res.data.code === 1000) {
          this.SearchTeamPageTotal = res.data.data.total;
          this.SearchTeamTableData = res.data.data.list;
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    SearchTeamSizeChange(val) {
      this.Competition.pageSize = val;
      this.search();
    },
    SearchTeamCurrentChange(val) {
      this.Competition.pageNum = val;
      this.search();
    },
    leagueSearch() {
      this.$axios.post("/getTeamListComp", this.TeamMgmt).then(res => {
        if (res.data.code === 1000) {
          this.tableData = res.data.data.list;
          this.TeamPageTotal = res.data.data.total;
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    TeamSizeChange(val) {
      this.TeamMgmt.pageSize = val;
      this.leagueSearch();
    },
    TeamCurrentChange(val) {
      this.TeamMgmt.pageNum = val;
      this.leagueSearch();
    },
    save() {
      this.Dialog.regDate = new Date(this.Dialog.regDate);
      this.$axios.post("/addTeam", this.Dialog).then(res => {
        if (res.data.code === 1000) {
          this.Dialog.teamName = "";
          this.Dialog.captainId = "";
          this.Dialog.shopId = "";
          this.Dialog.regDate = "";
          this.dialogVisible = false;
          this.search();
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    download() {},
    mgmt() {
      this.$router.push({
        name: "entryList"
      });
    },
    detali(id) {
      this.$router.push({
        path: "teamInformation",
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
