<template>
  <div class="content">
    <div class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip51") }}
        </el-col>
        <el-col :title="AddMemberVO.categoryName" :span="4" class="overFlowStyle">
          {{ AddMemberVO.categoryName }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip52") }}
        </el-col>
        <el-col :title="AddMemberVO.divisionName" :span="4" class="overFlowStyle">
          {{ AddMemberVO.divisionName }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip21") }}
        </el-col>
        <el-col :title="AddMemberVO.stageName" :span="4" class="overFlowStyle">
          {{ AddMemberVO.stageName }}
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="mainId" :label="$t('all.tip257')" min-width="5%"> </el-table-column>
        <el-table-column prop="teamName" :label="$t('all.tip244')" min-width="8%"> </el-table-column>
        <el-table-column prop="homeShopName" :label="$t('all.tip455')" min-width="6%"></el-table-column>
        <el-table-column prop="captainName" :label="$t('all.tip246')" min-width="5%"></el-table-column>
        <el-table-column label="Adarts" min-width="5%">
          <el-table-column prop="adartsRating" :label="$t('all.tip154')" min-width="6%"> </el-table-column>
          <el-table-column prop="adartsPPd" :label="$t('all.tip155')" min-width="5%"> </el-table-column>
          <el-table-column prop="adartsMpr" :label="$t('all.tip156')" min-width="5%"> </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('all.tip1')" min-width="5%">
          <el-table-column prop="leagueRating" :label="$t('all.tip154')" min-width="6%"> </el-table-column>
          <el-table-column prop="leaguePPd" :label="$t('all.tip155')" min-width="5%"> </el-table-column>
          <el-table-column prop="leagueMpr" :label="$t('all.tip156')" min-width="5%"> </el-table-column>
        </el-table-column>
        <el-table-column prop="seedNumber" :label="$t('all.tip594')" min-width="5%">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.seedNumber" @blur="changeSeedNo(scope.row)" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column min-width="5%">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="Delete(scope.row.mainId)">{{ $t("all.tip130") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="1" :page-sizes="[10, 50, 100, 200]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="1"> </el-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {},
  data() {
    return {
      multipleSelection: [],
      AddMemberVO: {
        categoryName: '',
        divisionName: '',
        stageName: ''
      },
      tableData: [],
      data: '',
      type: '',
      Findex: '',
      index: '',
      mineIndex: '',
      showSeedNo: this.$route.query.type === '3'
    };
  },
  mounted() {
    if (this.$route.query) {
      this.data = JSON.parse(this.$route.query.data);
      this.type = this.$route.query.type;
      this.index = this.$route.query.index;
      this.Findex = this.$route.query.Findex;
      this.mineIndex = this.$route.query.mineIndex;
      this.search(this.data, this.type, this.Findex, this.index, this.mineIndex);
    }
  },
  methods: {
    search(data, type, Findex, index, mineIndex) {
      let id = '';
      let param = '';
      let url = '';
      switch (type) {
      case '1':
        this.AddMemberVO.categoryName = data.categoryName;
        id = data.categoryId;
        param = 'categoryId';
        url = 'getTeamIntoCategoryList';
        break;
      case '2':
        this.AddMemberVO.categoryName = data.categoryName;
        this.AddMemberVO.divisionName = data.competitionDivisionList[mineIndex].divisionName;
        id = data.competitionDivisionList[mineIndex].divisionId;
        param = 'divisionId';
        url = 'getTeamIntoDivisionList';
        break;
      default:
        this.AddMemberVO.categoryName = data.categoryName;
        this.AddMemberVO.divisionName = data.competitionDivisionList[Findex].divisionName;
        this.AddMemberVO.stageName = data.competitionDivisionList[Findex].competitionStageList[mineIndex].stageName;
        id = data.competitionDivisionList[Findex].competitionStageList[mineIndex].stageId;
        param = 'stageId';
        url = 'getTeamIntoStageList';
        break;
      }
      this.$axios.get(`/${url}?${param}=${id}`).then(res => {
        this.tableData = res.data.data;
      });
    },
    changeSeedNo(row) {
      const data = {
        competitionTeamId: row.mainId,
        seedNumber: row.seedNumber
      };
      this.$axios.post('/updateSeedNumber', this.$qs.stringify(data)).then(res => {
        this.$message(res.data.msg);
      });
    },
    add() {
      this.dialogTableVisible = true;
    },
    SelectionChange(val) {
      this.multipleSelection = val;
    },
    addTopbox() {
      this.dialogTableVisible = false;
    },
    Delete(id) {
      let url = '';
      switch (this.$route.query.type) {
      case '1':
        url = 'teamRemoveCategory';
        break;
      case '2':
        url = 'teamRemoveDivision';
        break;
      default:
        url = 'teamRemoveStage';
        break;
      }
      this.$axios.get(`/${url}?mainId=${id}`).then(res => {
        this.$message(res.data.msg);
        this.search(this.data, this.type, this.Findex, this.index, this.mineIndex);
      });
    },
    remove() {},
    sizeChange(a) {
      console.log(a);
    },
    currentChange(a) {
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
.page {
  display: flex;
  justify-content: flex-end;
}
.btnClass {
  height: 40px;
  line-height: 35px;
  padding-left: 10px;
}
.topBox {
  display: flex;
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
</style>
