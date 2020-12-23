<template>
  <div class="content">
    <div class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip3") }}
        </el-col>
        <el-col :title="detial.competitionName" :span="3" class="overFlowStyle lineClass">
          {{ detial.competitionName }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip6") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ $t(detial.status) }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip4") }}
        </el-col>
        <el-col :span="9" class="overFlowStyle lineClass">
          {{ detial.area }}
        </el-col>
      </el-row>
      <el-row>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip5") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ $t(detial.type) }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip7") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass"> {{ detial.competitionStartPeriod }}-{{ detial.competitionEndPeriod }} </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip56") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass"> {{ detial.entryStartPeriod }}-{{ detial.entryEndPeriod }} </el-col>
      </el-row>
    </div>

    <el-row class="center-Row">
      <el-col class="label-g" :span="2">
        {{ $t("all.tip316") }}
      </el-col>
      <el-col :span="2">
        <el-input v-model="EntryList.teamName" clearable :placeholder="$t('placeholder.input')"></el-input>
      </el-col>
      <el-col class="label-g" :span="2">
        {{ $t("all.tip315") }}
      </el-col>
      <el-col :span="2">
        <el-input v-model="EntryList.teamId" clearable :placeholder="$t('placeholder.input')"></el-input>
      </el-col>
      <el-col class="label-g" :span="2">
        {{ $t("all.tip246") }}
      </el-col>
      <el-col :span="2">
        <el-input v-model="EntryList.captainName" clearable :placeholder="$t('placeholder.input')"></el-input>
      </el-col>
      <el-col class="label-g" :span="2">
        {{ $t("all.tip455") }}
      </el-col>
      <el-col :span="2">
        <el-input v-model="EntryList.homeShopName" clearable :placeholder="$t('placeholder.input')"></el-input>
      </el-col>
      <el-col class="label-g" :span="1">
        {{ $t("all.tip25") }}
      </el-col>
      <el-col :span="2">
        <el-select v-model="EntryList.status" :placeholder="$t('placeholder.select')">
          <el-option value=" " :label="$t('all.tip0')"></el-option>
          <el-option :value="1" :label="$t('all.tip242')"></el-option>
          <el-option :value="2" :label="$t('all.tip27')"></el-option>
          <el-option :value="3" :label="$t('all.tip253')"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="btnClass">
        <el-button type="primary" size="mini" @click="search">{{ $t("form.SearchButton") }}</el-button>
        <el-button type="primary" size="mini" @click="upload">{{ $t("all.tip338") }}</el-button>
        <!-- <el-button type="primary" size="mini" @click="download">{{ $t("form.DownloadButton") }}</el-button> -->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="btnClass">
        <el-button type="primary" size="mini" @click="agree">{{ $t("all.tip24") }}</el-button>
        <el-button type="primary" size="mini" @click="reject">{{ $t("all.tip251") }}</el-button>
        <el-button type="primary" size="mini" @click="addTeam">{{ $t("all.tip254") }}</el-button>
      </el-col>
    </el-row>
    <div>
      <el-dialog :title="$t('all.tip254')" :visible.sync="dialogTableVisible" top="20px">
        <el-row class="center-Row">
          <el-col class="label-g" :span="4">
            {{ $t("all.tip316") }}
          </el-col>
          <el-col :span="6">
            <el-input v-model="topBoxData.teamName" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col class="label-g" :span="4">
            {{ $t("all.tip315") }}
          </el-col>
          <el-col :span="6">
            <el-input v-model="topBoxData.teamId" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
        </el-row>
        <el-row class="center-Row">
          <el-col class="label-g" :span="4">
            {{ $t("all.tip246") }}
          </el-col>
          <el-col :span="6">
            <el-input v-model="topBoxData.captainName" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col class="label-g" :span="4">
            {{ $t("all.tip455") }}
          </el-col>
          <el-col :span="6">
            <el-input v-model="topBoxData.homeShopName" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col :span="3" class="lineClass">
            <el-button type="primary" size="mini" @click="TopboxSearch">{{ $t("all.tip10") }}</el-button>
          </el-col>
        </el-row>
        <div class="dialogTable">
          <el-table :data="topBoxTableData" @selection-change="SelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column :label="$t('all.tip607')" min-width="15%">
              <template slot-scope="scope">
                <div>{{ scope.row.teamName }}</div>
                <div>{{ `(${scope.row.teamId})` }}</div>
              </template>
            </el-table-column>
            <el-table-column property="captainName" :label="$t('all.tip246')" min-width="10%"></el-table-column>
            <el-table-column property="homeShopName" :label="$t('all.tip455')" min-width="12%"></el-table-column>
            <el-table-column label="Adarts">
              <el-table-column property="adartsRating" :label="$t('all.tip154')" min-width="10%"></el-table-column>
              <el-table-column property="adartsPPd" :label="$t('all.tip155')" min-width="10%"></el-table-column>
              <el-table-column property="adartsMpr" :label="$t('all.tip156')" min-width="10%"></el-table-column>
            </el-table-column>
            <el-table-column :label="$t('all.tip1')">
              <el-table-column property="leagueRating" :label="$t('all.tip154')" min-width="10%"></el-table-column>
              <el-table-column property="leaguePPd" :label="$t('all.tip155')" min-width="10%"></el-table-column>
              <el-table-column property="leagueMpr" :label="$t('all.tip156')" min-width="10%"></el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            @size-change="topBoxTableDataSizeChange"
            @current-change="topBoxTableDataCurrentChange"
            :current-page="1"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="topBoxTableDataTotal"
          >
          </el-pagination>
        </div>
        <el-row style="display:flex;justify-content:center">
          <el-col :span="2">
            <el-button type="primary" size="mini" @click="add">{{ $t("all.tip132") }}</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" @selection-change="tableDataSelection">
        <el-table-column width="55" type="selection" :selectable="isShowSelect"></el-table-column>
        <el-table-column :label="$t('all.tip607')" min-width="10%">
          <template slot-scope="scope">
            <div class="tableLink" @click="push(scope.row)">
              <div>{{ scope.row.teamName }}</div>
              <div>{{ `(${scope.row.teamId})` }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip245')" min-width="8%">
          <template slot-scope="scope">
            <span>{{ scope.row.entryMembers }}</span
            >/<span>{{ scope.row.teamMembers }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="captainName" :label="$t('all.tip246')" min-width="7%"></el-table-column>
        <el-table-column :label="$t('all.tip527')" min-width="17%">
          <template slot-scope="scope">
            <div>{{ `${scope.row.homeShopName}【${scope.row.homeShopDivisions}】` }}</div>
          </template>
        </el-table-column>
        <el-table-column label="Adarts">
          <el-table-column prop="adartsRating" :label="$t('all.tip154')" min-width="5%"> </el-table-column>
          <el-table-column prop="adartsPPd" :label="$t('all.tip155')" min-width="5%"> </el-table-column>
          <el-table-column prop="adartsMpr" :label="$t('all.tip156')" min-width="5%"> </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('all.tip1')">
          <el-table-column prop="leagueRating" :label="$t('all.tip154')" min-width="5%"> </el-table-column>
          <el-table-column prop="leaguePPd" :label="$t('all.tip155')" min-width="5%"> </el-table-column>
          <el-table-column prop="leagueMpr" :label="$t('all.tip156')" min-width="5%"> </el-table-column>
        </el-table-column>
        <el-table-column prop="applicationDate" :label="$t('all.tip249')" min-width="7%"> </el-table-column>
        <el-table-column prop="approveDate" :label="$t('all.tip250')" min-width="7%"> </el-table-column>
        <el-table-column prop="status" :label="$t('all.tip25')" min-width="6%">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">{{ $t("all.tip242") }}</span>
            <span v-if="scope.row.status === 2">{{ $t("all.tip27") }}</span>
            <span v-if="scope.row.status === 3">{{ $t("all.tip253") }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="6%">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" size="mini" @click="deleteTeam(scope.row.competitionTeamId)">{{ $t("all.tip130") }}</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="10%">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 2 || scope.row.status === 3">
              <el-button type="primary" size="mini" @click="cancel(scope.row.competitionTeamId)">{{ $t("all.tip252") }}</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="1"
        :page-sizes="[10, 50, 100, 200]"
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
import { downloadFile, returnType, handle } from '@/components/common/Utils';

export default {
  name: 'home',
  components: {},
  data() {
    return {
      total: 1,
      dialogTableVisible: false,
      multipleSelection: [],
      tableSelection: [],
      topBoxTableDataTotal: 1,
      detial: {
        status: '',
        competitionName: '',
        type: '',
        competitionStartPeriod: '',
        competitionEndPeriod: '',
        entryStartPeriod: '',
        entryEndPeriod: '',
        area: ''
      },
      EntryList: {
        competitionId: '',
        teamName: '',
        teamId: '',
        captainName: '',
        homeShopName: '',
        status: ' ',
        pageNum: 1,
        pageSize: 10
      },
      topBoxData: {
        competitionId: '',
        teamName: '',
        teamId: '',
        captainName: '',
        homeShopName: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      topBoxTableData: []
    };
  },
  mounted() {
    const data = handle(this.$route.query.data);
    this.init(data);
    this.search();
    this.TopboxSearch();
  },
  methods: {
    init(data) {
      const vm = this;
      this.EntryList.competitionId = data.id;
      this.topBoxData.competitionId = data.id;
      this.detial.competitionName = data.competitionName;
      this.detial.competitionStartPeriod = data.competitionStartPeriod;
      this.detial.competitionEndPeriod = data.competitionEndPeriod;
      this.detial.entryStartPeriod = data.entryStartPeriod;
      this.detial.entryEndPeriod = data.entryEndPeriod;
      if (data.type === '1') {
        this.detial.type = 'all.tip40';
      } else {
        this.detial.type = 'all.tip41';
      }
      if (data.status === '1') {
        this.detial.status = 'all.tip26';
      } else if (data.status === '2') {
        this.detial.status = 'all.tip27';
      } else {
        this.detial.status = 'all.tip28';
      }
      data.countryList.forEach(i => {
        let str = '';
        if (i.areaName) {
          str = `,${i.areaName}`;
        }
        vm.detial.area += `${i.countryName}${str};`;
      });
    },
    isShowSelect(row) {
      return row.status === 1;
    },
    search() {
      this.$axios.post('/getCompetitionTeamList', this.EntryList).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    upload() {
      console.log('upload');
    },
    download() {
      const vm = this;
      this.$axios.post('/download', vm.EntryList).then(res => {
        downloadFile(res);
      });
    },
    create() {
      console.log('Create');
    },
    push(value) {
      this.$router.push({
        name: 'member',
        query: {
          data: JSON.stringify(value)
        }
      });
    },
    topBoxTableDataCurrentChange(value) {
      this.topBoxData.pageNum = value;
      this.$axios.post('/getNoEntryTeamList', this.topBoxData).then(res => {
        this.topBoxTableData = res.data.data.list;
      });
    },
    topBoxTableDataSizeChange(value) {
      this.topBoxData.pageSize = value;
      this.$axios.post('/getNoEntryTeamList', this.topBoxData).then(res => {
        this.topBoxTableData = res.data.data.list;
      });
    },
    sizeChange(value) {
      const vm = this;
      vm.EntryList.pageSize = value;
      this.$axios.post('/getCompetitionTeamList', vm.EntryList).then(res => {
        vm.tableData = res.data.data.list;
        vm.total = res.data.data.total;
      });
    },
    currentChange(value) {
      this.EntryList.pageNum = value;
      this.$axios.post('/getCompetitionTeamList', this.EntryList).then(res => {
        this.tableData = res.data.data.list;
      });
    },
    agree() {
      const ids = returnType(this.tableSelection, 'competitionTeamId');
      if (!ids) {
        this.$message(this.$t('all.tip571'));
        return;
      }
      this.$axios.post('/approve', { ids, status: 2 }).then(res => {
        if (res.data) {
          debugger;
          this.$message(res.data.msg);
          this.search();
        }
      });
    },
    reject() {
      const ids = returnType(this.tableSelection, 'competitionTeamId');
      if (!ids) {
        this.$message(this.$t('all.tip571'));
        return;
      }
      this.$axios.post('/approve', { ids, status: 3 }).then(res => {
        if (res.data) {
          this.$message(res.data.msg);
          this.search();
        }
      });
    },
    cancel(id) {
      this.$axios.post('/approve', { ids: id, status: 1 }).then(res => {
        if (res.data) {
          this.$message(res.data.msg);
          this.search();
        }
      });
    },
    add() {
      // const vm = this;
      const teamIDS = returnType(this.multipleSelection, 'teamId');
      this.$axios.post('/teamIntoCompetition', { teamIds: teamIDS, competitionId: this.EntryList.competitionId }).then(res => {
        if (res.data.errorCode) {
          this.$message(res.data.msg);
        }
        this.search();
      });
      this.dialogTableVisible = false;
    },
    TopboxSearch() {
      this.$axios.post('/getNoEntryTeamList', this.topBoxData).then(res => {
        debugger;
        this.topBoxTableData = res.data.data.list;
        this.topBoxTableDataTotal = res.data.data.total;
      });
    },
    addTeam() {
      this.dialogTableVisible = true;
    },
    tableDataSelection(val) {
      this.tableSelection = val;
    },
    SelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteTeam(id) {
      this.$axios.get(`/teamRemoveCompetition?competitionTeamId=${id}`).then(res => {
        this.$message(res.data.msg);
        this.search();
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
</style>
