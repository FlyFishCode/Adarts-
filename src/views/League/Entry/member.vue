<template>
  <div class="content">
    <div class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip316") }}
        </el-col>
        <el-col :title="MemberVO.teamName" :span="3" class="overFlowStyle lineClass">
          {{ MemberVO.teamName }}
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip455") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle lineClass">
          {{ MemberVO.homeShopName }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip246") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ MemberVO.captainName }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip255") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ MemberVO.entryMembers }}
        </el-col>
      </el-row>
    </div>
    <el-row class="center-Row">
      <el-col :span="2" class="lineClass">
        <el-button type="primary" size="mini" @click="addMember">{{ $t("all.tip256") }}</el-button>
      </el-col>
    </el-row>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" :label="$t('all.tip257')" width="50"> </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip258')" min-width="10%">
          <template slot-scope="scope">
            <div class="formImgBox">
              <img :src="scope.row.imgUrl" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="userName" sortable :label="$t('all.tip259')" min-width="9%"> </el-table-column>
        <el-table-column :label="$t('all.tip208')" min-width="6%">
          <template slot-scope="scope">
            {{ scope.row.gender === 1 ? $t("all.tip209") : $t("all.tip210") }}
          </template>
        </el-table-column>
        <el-table-column prop="cardNumber" sortable :label="$t('all.tip260')" min-width="12%"> </el-table-column>
        <el-table-column prop="homeShopName" sortable :label="$t('all.tip247')" min-width="8%"> </el-table-column>
        <el-table-column label="Adarts">
          <el-table-column prop="adartsRating" sortable :label="$t('all.tip154')" min-width="6%"> </el-table-column>
          <el-table-column prop="adartsPPd" sortable :label="$t('all.tip155')" min-width="5%"> </el-table-column>
          <el-table-column prop="adartsMpr" sortable :label="$t('all.tip156')" min-width="5%"> </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('all.tip1')">
          <el-table-column prop="leagueRating" sortable :label="$t('all.tip154')" min-width="6%"> </el-table-column>
          <el-table-column prop="leaguePPd" sortable :label="$t('all.tip155')" min-width="5%"> </el-table-column>
          <el-table-column prop="leagueMpr" sortable :label="$t('all.tip156')" min-width="5%"> </el-table-column>
        </el-table-column>
        <el-table-column label="User Define">
          <el-table-column prop="leagueRating" :label="$t('all.tip154')" min-width="6%">
            <template slot-scope="scope">
              <el-input v-model="scope.row.status" @blur="handleRatingBlur(scope.row.userId, 'rating')"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="leagueRating" :label="$t('all.tip155')" min-width="6%">
            <template slot-scope="scope">
              <el-input v-model="scope.row.status" @blur="handleRatingBlur(scope.row.userId, 'PPD')"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="leagueRating" :label="$t('all.tip156')" min-width="6%">
            <template slot-scope="scope">
              <el-input v-model="scope.row.status" @blur="handleRatingBlur(scope.row.userId, 'MPR')"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="status" :label="$t('all.tip25')" min-width="8%">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 1">{{ $t("all.tip242") }}</div>
            <div v-if="scope.row.status === 2">{{ $t("all.tip27") }}</div>
            <div v-if="scope.row.status === 3">{{ $t("all.tip253") }}</div>
          </template>
        </el-table-column>
        <el-table-column min-width="5%">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="Remove(scope.row.competitionPlayerId)">{{ $t("all.tip134") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="topBox">
      <el-dialog :title="$t('all.tip256')" width="70%" :visible.sync="dialogTableVisible" top="30px">
        <el-row class="center-Row">
          <el-col :span="3" class="label-g">
            {{ $t("all.tip268") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="TopBox.playerId" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col :span="3" class="label-g">
            {{ $t("all.tip324") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="TopBox.playerName" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col :span="3" class="label-g">
            {{ $t("all.tip426") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="TopBox.cardNumber" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
        </el-row>
        <el-row class="center-Row">
          <el-col :span="3" class="label-g">
            {{ $t("all.tip208") }}
          </el-col>
          <el-col :span="4">
            <el-select v-model="TopBox.gender" clearable :placeholder="$t('placeholder.select')">
              <el-option value="1" :label="$t('all.tip209')"></el-option>
              <el-option value="2" :label="$t('all.tip210')"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3" class="label-g">
            {{ $t("all.tip455") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="TopBox.homeShopName" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col :span="3" class="lineClass">
            <el-button type="primary" size="mini" @click="topBoxSearch">{{ $t("form.SearchButton") }}</el-button>
          </el-col>
        </el-row>
        <div>
          <el-table :data="topBoxTableData" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column property="userName" :label="$t('all.tip259')" min-width="6%"></el-table-column>
            <el-table-column :label="$t('all.tip208')" min-width="6%">
              <template slot-scope="scope">
                <span>{{ scope.row.gender === 1 ? $t("all.tip209") : $t("all.tip210") }}</span>
              </template>
            </el-table-column>
            <el-table-column property="cardNumber" :label="$t('all.tip260')" min-width="6%"></el-table-column>
            <el-table-column property="homeShopName" :label="$t('all.tip455')" min-width="6%"></el-table-column>
            <el-table-column property="name" :label="$t('all.tip316')" min-width="6%"></el-table-column>
            <el-table-column sortable label="Adarts">
              <el-table-column prop="adartsRating" sortable :label="$t('all.tip154')" min-width="6%"> </el-table-column>
              <el-table-column prop="adartsPPd" sortable :label="$t('all.tip155')" min-width="5%"> </el-table-column>
              <el-table-column prop="adartsMpr" sortable :label="$t('all.tip156')" min-width="5%"> </el-table-column>
            </el-table-column>
            <el-table-column sortable :label="$t('all.tip1')">
              <el-table-column prop="leagueRating" sortable :label="$t('all.tip154')" min-width="6%"> </el-table-column>
              <el-table-column prop="leaguePPd" sortable :label="$t('all.tip155')" min-width="5%"> </el-table-column>
              <el-table-column prop="leagueMpr" sortable :label="$t('all.tip156')" min-width="5%"> </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <el-row class="DialogButton">
          <el-col :span="2">
            <el-button type="primary" size="mini" @click="add">{{ $t("all.tip132") }}</el-button>
          </el-col>
        </el-row>
        <div class="page">
          <el-pagination
            @size-change="topBoxSizeChange"
            @current-change="topBoxcurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="topBoxTotal"
          >
          </el-pagination>
        </div>
      </el-dialog>
    </div>
    <div class="page">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="1" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="tableTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import { returnType } from '@/components/common/Utils';
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      dialogTableVisible: false,
      multipleSelection: [],
      topBoxTotal: 1,
      tableTotal: 1,
      MemberVO: {
        teamName: "",
        homeShopName: "",
        captainName: "",
        entryMembers: ""
      },
      playerListVO: {
        competitionId: "",
        competitionTeamId: "",
        pageNum: 1,
        pageSize: 10
      },
      TopBox: {
        competitionId: "",
        competitionTeamId: "",
        teamId: "",
        playerId: "",
        playerName: "",
        cardNumber: "",
        gender: "",
        homeShopName: "",
        pageNum: 1,
        pageSize: 10
      },
      topBoxTableData: [],
      tableData: []
    };
  },
  mounted() {
    if (this.$route.query.data) {
      this.MemberVO = JSON.parse(this.$route.query.data);
    }
    this.TopBox.teamId = this.MemberVO.teamId;
    this.TopBox.competitionId = this.MemberVO.competitionId;
    this.TopBox.competitionTeamId = this.MemberVO.competitionTeamId;
    this.playerListVO.competitionId = this.MemberVO.competitionId;
    this.playerListVO.competitionTeamId = this.MemberVO.competitionTeamId;
    this.init();
    this.topBoxSearch();
  },
  methods: {
    init() {
      const vm = this;
      this.$axios.post("/getCompPlayerTeamList", this.$qs.stringify(this.playerListVO)).then(res => {
        vm.tableTotal = res.data.data.total;
        vm.tableData = res.data.data.list;
      });
    },
    topBoxSearch() {
      const vm = this;
      this.$axios.post("/getCompNoPlayTeamList", this.TopBox).then(res => {
        debugger;
        vm.topBoxTotal = res.data.data.total;
        vm.topBoxTableData = res.data.data.list;
      });
    },
    handleRatingBlur(id, type) {
      console.log(id, type);
    },
    addMember() {
      this.topBoxSearch();
      this.dialogTableVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    add() {
      const data = {
        competitionTeamId: this.MemberVO.competitionTeamId,
        playerIdList: [...this.multipleSelection.map(i => i.userId)]
      };
      this.$axios.post("/compPlayerIntoTeam", data).then(() => {
        this.init();
      });
      this.dialogTableVisible = false;
    },
    Remove(id) {
      const vm = this;
      this.$axios.get(`/compTeamRemovePlayer?competitionPlayerId=${id}`).then(res => {
        if (res.data) {
          vm.init();
        }
      });
    },
    topBoxSizeChange(val) {
      const vm = this;
      vm.TopBox.pageSize = val;
      this.$axios.post("/getCompNoPlayTeamList", this.TopBox).then(res => {
        vm.topBoxTotal = res.data.data.total;
        vm.topBoxTableData = res.data.data.list;
      });
    },
    topBoxcurrentChange(val) {
      const vm = this;
      vm.TopBox.pageNum = val;
      this.$axios.post("/getCompNoPlayTeamList", this.TopBox).then(res => {
        vm.topBoxTotal = res.data.data.total;
        vm.topBoxTableData = res.data.data.list;
      });
    },
    sizeChange(value) {
      const vm = this;
      this.playerListVO.pageSize = value;
      this.$axios.post("/getCompPlayerTeamList", this.$qs.stringify(this.playerListVO)).then(res => {
        vm.tableData = res.data.data.list;
      });
    },
    currentChange(value) {
      const vm = this;
      this.playerListVO.pageNum = value;
      this.$axios.post("/getCompPlayerTeamList", this.$qs.stringify(this.playerListVO)).then(res => {
        vm.tableData = res.data.data.list;
      });
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
.page {
  display: flex;
  justify-content: flex-end;
}
.topBox {
  margin-bottom: 15px;
}
#topBox >>> .el-radio__label {
  display: none;
}
.formImgBox {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}
.formImgBox img {
  width: 100%;
  height: 100%;
}
.dialogTable {
  height: 600px;
  overflow-y: auto;
}
</style>
