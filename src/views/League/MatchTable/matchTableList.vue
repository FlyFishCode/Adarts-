<template>
  <div class="content">
    <el-tabs v-model="defaultActive" type="card" @tab-click="handleClick">
      <el-tab-pane :label="$t('all.tip270')" name="first">
        <el-row class="search">
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip3") }}
            </el-col>
            <el-col :span="21" class="overFlowStyle">
              {{ MatchTableListVO.competitionname }}
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip51") }}
            </el-col>
            <el-col :span="5" id="divBoxWidth">
              <el-select v-model="MatchTableListVO.matchTable.categoryId" clearable :placeholder="$t('placeholder.select')" @change="change">
                <el-option v-for="item in categoryList" :key="item.categoryId" :label="item.categoryName" :value="item.categoryId"></el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip52") }}
            </el-col>
            <el-col :span="5" id="divBoxWidth">
              <el-select v-model="MatchTableListVO.matchTable.divisionId" clearable :placeholder="$t('placeholder.select')">
                <el-option v-for="item in divisionList" :key="item.divisionId" :label="item.divisionName" :value="item.divisionId"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip274") }}
            </el-col>
            <el-col :span="5" id="divBoxWidth">
              <el-select v-model="MatchTableListVO.matchTable.matchTableType" clearable :placeholder="$t('placeholder.select')">
                <el-option :label="$t('all.tip277')" :value="1"></el-option>
                <el-option :label="$t('all.tip449')" :value="2"></el-option>
                <el-option :label="$t('all.tip490')" :value="3"></el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip273") }}
            </el-col>
            <el-col :span="5" id="divBoxWidth">
              <el-select v-model="MatchTableListVO.matchTable.status" filterable clearable :placeholder="$t('placeholder.select')">
                <el-option :label="$t('all.tip516')" :value="1"></el-option>
                <el-option :label="$t('all.tip515')" :value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="2" class="lineClass">
              <el-button type="primary" size="mini" @click="search">{{ $t("form.SearchButton") }}</el-button>
            </el-col>
          </el-row>
        </el-row>
        <div class="table">
          <el-table :data="matchTableData" border style="width: 100%">
            <el-table-column prop="categoryName" :label="$t('all.tip51')" min-width="5%"> </el-table-column>
            <el-table-column prop="divisionName" :label="$t('all.tip52')" min-width="5%"> </el-table-column>
            <el-table-column :label="$t('all.tip21')" min-width="5%">
              <template slot-scope="scope">
                <div v-if="scope.row.state === 1" class="tableLink" @click="stageClick(scope.row)">
                  {{ scope.row.stageName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="matchTableType" :label="$t('all.tip274')" min-width="5%">
              <template slot-scope="scope">
                <div v-if="scope.row.matchTableType === 1">
                  {{ $t("all.tip277") }}
                </div>
                <div v-if="scope.row.matchTableType === 2">
                  {{ $t("all.tip449") }}
                </div>
                <div v-if="scope.row.matchTableType === 3">
                  {{ $t("all.tip490") }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="stageId" :label="$t('all.tip25')" min-width="5%">
              <template slot-scope="scope">
                <div v-if="scope.row.state === 1">
                  {{ $t("all.tip532") }}
                </div>
                <div v-else>
                  <el-button type="primary" size="mini" @click="matchTableCreate(scope.row)">{{ $t("all.tip16") }}</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('all.tip275')" min-width="5%">
              <template slot-scope="scope">
                <div v-if="scope.row.matchTableType === 3">
                  <div class="tableLink" @click="nextStage(scope.row)">{{ $t("all.tip449") }}</div>
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
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="matchTabletotal"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('all.tip449')" name="second">
        <el-row class="search">
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip3") }}
            </el-col>
            <el-col :span="21" class="overFlowStyle">
              {{ MatchTableListVO.competitionname }}
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip25") }}
            </el-col>
            <el-col :span="5" id="divBoxWidth">
              <el-select v-model="Knockout.status" :placeholder="$t('placeholder.select')" @change="selectChange">
                <el-option :value="1" :label="$t('all.tip0')"></el-option>
                <el-option :value="2" :label="$t('all.tip532')"></el-option>
                <el-option :value="3" :label="$t('all.tip515')"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-col :span="2" class="lineClass">
            <el-button type="primary" size="mini" @click="create">{{ $t("all.tip16") }}</el-button>
          </el-col>
        </el-row>
        <div class="table">
          <el-table :data="knockoutData" border style="width: 100%">
            <el-table-column prop="date" :label="$t('all.tip449')" min-width="7%">
              <template slot-scope="scope">
                <div class="tableLink" @click="push(scope)">{{ scope.row.city }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="name" :label="$t('all.tip274')" min-width="7%"> </el-table-column>
            <el-table-column prop="name" :label="$t('all.tip25')" min-width="6%"> </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            @size-change="KnockoutSizeChange"
            @current-change="KnockoutCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="KnockoutTotal"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {},
  data() {
    return {
      defaultActive: 'first',
      categoryList: [],
      divisionList: [],
      KnockoutTotal: 1,
      matchTabletotal: 1,
      MatchTableListVO: {
        competitionname: '',
        matchTable: {
          competitionId: '',
          categoryId: '',
          divisionId: '',
          matchTableType: '',
          status: '',
          pageNum: 1,
          pageSize: 10
        }
      },
      Knockout: {
        status: 1,
        pageNum: 1,
        pageSize: 10
      },
      matchTableData: [],
      knockoutData: []
    };
  },
  mounted() {
    if (this.$route.query.data) {
      let data = '';
      try {
        data = JSON.parse(this.$route.query.data);
      } catch {
        data = this.$route.query.data;
      }
      this.MatchTableListVO.matchTable.competitionId = data.id;
      this.MatchTableListVO.competitionname = data.competitionName;
      this.$axios.get(`/competitionBelowCategoryIdName?competitionId=${data.id}`).then(res => {
        this.categoryList = res.data.data;
      });
      this.search();
    }
  },
  methods: {
    search() {
      this.$axios.post('/matchTable/getStageList', this.MatchTableListVO.matchTable).then(res => {
        this.matchTableData = res.data.data.list;
        this.matchTabletotal = res.data.data.total;
      });
    },
    change(value) {
      if (value) {
        this.$axios.get(`/categoryBelowDivisionIdName?categoryId=${value}`).then(res => {
          this.divisionList = res.data.data;
        });
      }
      this.MatchTableListVO.matchTable.divisionId = '';
    },
    matchTableCreate(value) {
      const data = Object.assign(value, { matchTableName: this.MatchTableListVO.competitionname, isKnockout: 1 });
      this.$router.push({
        name: 'matchTableStage',
        query: {
          data: JSON.stringify(data)
        }
      });
    },
    sizeChange(value) {
      this.MatchTableListVO.matchTable.pageSize = value;
      this.$axios.post('/matchTable/getStageList', this.MatchTableListVO.matchTable).then(res => {
        this.matchTableData = res.data.data.list;
      });
    },
    currentChange(value) {
      this.MatchTableListVO.matchTable.pageNum = value;
      this.$axios.post('/matchTable/getStageList', this.MatchTableListVO.matchTable).then(res => {
        this.matchTableData = res.data.data.list;
      });
    },
    knockoutSearch() {
      this.$axios.post('/aaaaaaaa', this.Knockout).then(res => {
        this.knockoutData = res.data.data.list;
        this.KnockoutTotal = res.data.data.total;
      });
    },
    KnockoutSizeChange(value) {
      this.Knockout.pageSize = value;
      this.$axios.post('/matchTable/getStageList', this.Knockout).then(res => {
        this.matchTableData = res.data.data.list;
      });
    },
    KnockoutCurrentChange(value) {
      this.Knockout.pageNum = value;
      this.$axios.post('/matchTable/getStageList', this.Knockout).then(res => {
        this.matchTableData = res.data.data.list;
      });
    },
    stageClick(value) {
      const data = Object.assign(value, { matchTableName: this.MatchTableListVO.competitionname });
      this.$router.push({
        path: '/matchTableStage',
        query: {
          data: JSON.stringify(data)
        }
      });
    },
    nextStage(value) {
      const data = Object.assign(value, { matchTableName: this.MatchTableListVO.competitionname, isKnockout: 2 });
      this.$router.push({
        path: '/knockout',
        query: {
          data: JSON.stringify(data)
        }
      });
    },
    push(msg) {
      this.$router.push({
        path: '/matchTableStage'
      });
      console.log(msg);
    },
    handleClick() {},
    create() {
      this.$router.push({
        path: '/knockout',
        query: {
          data: JSON.stringify(this.$route.query.data)
        }
      });
    },
    selectChange(value) {
      this.$$axios.post(`/getList?id=${value}`).then(res => {
        console.log(res);
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
</style>
