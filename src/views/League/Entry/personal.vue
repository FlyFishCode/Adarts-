<template>
  <div class="content">
    <div class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip1") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle">
          {{ detial.competitionName }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip6") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle">
          {{ detial.status }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip4") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle">
          {{ detial.area }}
        </el-col>
      </el-row>
      <el-row>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip5") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle">
          {{ detial.type }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip7") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle"> {{ detial.competitionStartPeriod }}-{{ detial.competitionEndPeriod }} </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip56") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle"> {{ detial.entryStartPeriod }}-{{ detial.entryEndPeriod }} </el-col>
      </el-row>
    </div>

    <el-row class="center-Row">
      <el-col class="label-g" :span="2">
        {{ $t("all.tip261") }}
      </el-col>
      <el-col :span="2">
        <el-input v-model="EntryList.teamName" clearable :placeholder="$t('all.tip38')"></el-input>
      </el-col>
      <el-col class="label-g" :span="2">
        {{ $t("all.tip262") }}
      </el-col>
      <el-col :span="2">
        <el-input v-model="EntryList.teamId" clearable :placeholder="$t('all.tip38')"></el-input>
      </el-col>
      <el-col class="label-g" :span="2">
        {{ $t("all.tip260") }}
      </el-col>
      <el-col :span="2">
        <el-input v-model="EntryList.captainName" clearable :placeholder="$t('all.tip38')"></el-input>
      </el-col>
      <el-col class="label-g" :span="2">
        {{ $t("all.tip208") }}
      </el-col>
      <el-col :span="2">
        <el-input v-model="EntryList.homeShopName" clearable :placeholder="$t('all.tip38')"></el-input>
      </el-col>
      <el-col class="label-g" :span="1">
        {{ $t("all.tip25") }}
      </el-col>
      <el-col :span="2">
        <el-select v-model="EntryList.status" :placeholder="$t('all.tip516')">
          <el-option :value="0" :label="$t('all.tip0')"></el-option>
          <el-option :value="1" :label="$t('all.tip26')"></el-option>
          <el-option :value="2" :label="$t('all.tip27')"></el-option>
          <el-option :value="3" :label="$t('all.tip28')"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="btnClass">
        <el-button type="primary" size="mini" @click="search">{{ $t("all.tip10") }}</el-button>
        <el-button type="primary" size="mini" @click="upload">{{ $t("all.tip338") }}</el-button>
        <!-- <el-button type="primary" size="mini" @click="download">{{ $t("all.tip521") }}</el-button> -->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="btnClass">
        <el-button type="primary" size="mini" @click="agree">{{ $t("all.tip24") }}</el-button>
        <el-button type="primary" size="mini" @click="reject">{{ $t("all.tip251") }}</el-button>
        <el-button type="primary" size="mini" @click="addTeam">{{ $t("all.tip263") }}</el-button>
      </el-col>
    </el-row>
    <div>
      <el-dialog :title="$t('all.tip263')" :visible.sync="dialogTableVisible">
        <el-row class="center-Row">
          <el-col class="label-g" :span="4">
            {{ $t("all.tip259") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="topBoxData.userName" clearable :placeholder="$t('all.tip38')"></el-input>
          </el-col>
          <el-col class="label-g" :span="4">
            {{ $t("all.tip456") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="topBoxData.userId" clearable :placeholder="$t('all.tip38')"></el-input>
          </el-col>
          <el-col class="label-g" :span="4">
            {{ $t("all.tip260") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="topBoxData.cardNumber" clearable :placeholder="$t('all.tip38')"></el-input>
          </el-col>
        </el-row>
        <el-row class="center-Row">
          <el-col class="label-g" :span="4">
            {{ $t("all.tip208") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="topBoxData.gender" clearable :placeholder="$t('all.tip38')"></el-input>
          </el-col>
          <el-col class="label-g" :span="4">
            {{ $t("all.tip455") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="topBoxData.homeShop" clearable :placeholder="$t('all.tip38')"></el-input>
          </el-col>
          <el-col :span="3" class="lineClass">
            <el-button type="primary" size="mini" @click="TopboxSearch">{{ $t("all.tip10") }}</el-button>
          </el-col>
        </el-row>
        <div class="dialogTable">
          <el-table :data="topBoxTableData" @selection-change="SelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column property="teamName" :label="$t('all.tip259')" min-width="14%"> </el-table-column>
            <el-table-column property="captainName" :label="$t('all.tip208')" min-width="10%"></el-table-column>
            <el-table-column property="homeShopName" :label="$t('all.tip260')" min-width="14%"></el-table-column>
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
        <el-row style="display:flex;justify-content:center">
          <el-col :span="2">
            <el-button type="primary" size="mini" @click="add">{{ $t("all.tip132") }}</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" @selection-change="tableDataSelection">
        <el-table-column width="55" type="selection" :selectable="isShowSelect">
          <!-- <template slot-scope="scope">
            <el-table-column v-if="scope.row.status !== 2" type="selection"></el-table-column>
          </template> -->
        </el-table-column>
        <el-table-column :label="$t('all.tip445')" min-width="5%">
          <template slot-scope="scope">
            <div class="tableLink" @click="push(scope)">{{ scope.row.teamName }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip208')" min-width="8%">
          <template slot-scope="scope">
            <span>{{ scope.row.onMember || 1 }}</span
            >/
            <span>{{ scope.row.sumMember }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="homeShopName" :label="$t('all.tip527')" min-width="15%"> </el-table-column>
        <el-table-column prop="cardNumber" :label="$t('all.tip260')" min-width="15%"> </el-table-column>
        <el-table-column label="Adarts">
          <el-table-column prop="adartsRating" :label="$t('all.tip154')" min-width="5%"> </el-table-column>
          <el-table-column prop="adartsPPd" :label="$t('all.tip155')" min-width="5%"> </el-table-column>
          <el-table-column prop="adartsMpr" :label="$t('all.tip156')" min-width="5%"> </el-table-column>c
        </el-table-column>
        <el-table-column :label="$t('all.tip1')">
          <el-table-column prop="leagueRating" :label="$t('all.tip154')" min-width="5%"> </el-table-column>
          <el-table-column prop="leaguePPd" :label="$t('all.tip155')" min-width="5%"> </el-table-column>
          <el-table-column prop="leagueMpr" :label="$t('all.tip156')" min-width="5%"> </el-table-column>
        </el-table-column>
        <el-table-column prop="applicationDate" :label="$t('all.tip249')" min-width="6%"> </el-table-column>
        <el-table-column prop="approveDate" :label="$t('all.tip250')" min-width="6%"> </el-table-column>
        <el-table-column prop="status" :label="$t('all.tip25')" min-width="6%">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">{{ $t("all.tip242") }}</span>
            <span v-if="scope.row.status === 2">{{ $t("all.tip27") }}</span>
            <span v-if="scope.row.status === 3">{{ $t("all.tip253") }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="10%">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 2">
              <el-button type="primary" size="mini" @click="cancel(scope.row)">{{ $t("all.tip252") }}</el-button>
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
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { downloadFile, returnType } from "@/components/common/Utils";

export default {
  name: "home",
  components: {},
  data() {
    return {
      total: 1,
      dialogTableVisible: false,
      multipleSelection: [],
      tableSelection: [],
      topBox: {
        a: "",
        radio: false
      },
      detial: {
        status: 0,
        competitionName: "",
        type: "",
        competitionStartPeriod: "",
        competitionEndPeriod: "",
        entryStartPeriod: "",
        entryEndPeriod: "",
        area: ""
      },
      EntryList: {
        competitionId: "",
        teamName: "",
        teamId: "",
        captainName: "",
        homeShopName: "",
        status: "",
        pageNum: 1,
        pageSize: 10
      },
      topBoxData: {
        teamName: "",
        teamId: "",
        captainName: "",
        homeShopName: "",
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      topBoxTableData: []
    };
  },
  mounted() {
    if (this.$route.query.data) {
      this.detial = JSON.parse(this.$route.query.data);
      this.EntryList.competitionId = this.detial.id;
    }
    this.search();
    this.TopboxSearch();
  },
  methods: {
    isShowSelect(row) {
      return row.status === 1;
    },
    search() {
      const vm = this;
      this.$axios.post("/getCompetitionTeamList", vm.EntryList).then(res => {
        vm.tableData = res.data.data.list;
        vm.EntryList.pageNum = res.data.data.pageNum;
        vm.total = res.data.data.total;
      });
    },
    upload() {
      console.log("upload");
    },
    download() {
      const vm = this;
      this.$axios.post("/download", vm.EntryList).then(res => {
        downloadFile(res);
      });
    },
    create() {
      console.log("Create");
    },
    push(a) {
      this.$router.push({
        name: "member",
        query: {
          msg: JSON.stringify(a.row)
        }
      });
    },
    sizeChange(value) {
      const vm = this;
      vm.EntryList.pageSize = value;
      this.$axios.post("/getCompetitionTeamList", vm.EntryList).then(res => {
        vm.tableData = res.data.data.list;
        vm.EntryList.pageNum = res.data.data.pageNum;
        vm.total = res.data.data.total;
      });
    },
    currentChange(value) {
      const vm = this;
      vm.EntryList.pageNum = value;
      this.$axios.post("/getCompetitionTeamList", vm.EntryList).then(res => {
        vm.tableData = res.data.data.list;
        vm.EntryList.pageSize = res.data.data.pageSize;
        vm.total = res.data.data.total;
      });
    },
    agree() {
      const ids = returnType(this.tableSelection, "id");
      this.$axios.post("/approve", { ids, status: 2 }).then(res => {
        this.search();
        if (res.data) {
          console.log(res.data);
        }
      });
    },
    reject() {
      const ids = returnType(this.tableSelection, "id");
      this.$axios.post("/approve", { ids, status: 3 }).then(res => {
        this.search();
        if (res.data) {
          console.log(res.data);
        }
      });
    },
    cancel(data) {
      // const ids = returnType(this.tableSelection, 'id');
      const ids = data.id;
      console.log(data);
      this.$axios.post("/approve", { ids, status: 1 }).then(res => {
        this.search();
        if (res.data) {
          console.log(res.data);
        }
      });
    },
    add() {
      const vm = this;
      const teamIDS = returnType(this.multipleSelection, "teamId");
      this.$axios.post("/teamIntoCompetition", { teamIds: teamIDS, competitionId: vm.detial.id }).then(res => {
        console.log(res.data.statusText);
        this.search();
      });
      this.dialogTableVisible = false;
    },
    TopboxSearch() {
      const vm = this;
      this.topBoxData.competitionId = this.detial.id;
      this.$axios.post("/getNoEntryTeamList", vm.topBoxData).then(res => {
        vm.topBoxTableData = res.data;
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
  display: flex;
}
</style>
