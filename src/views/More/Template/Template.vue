<template>
  <div class="content">
    <div class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip537") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="templateVO.leagueType" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip42')"></el-option>
            <el-option :value="2" :label="$t('all.tip43')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip48") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-input v-model="templateVO.name" :placeholder="$t('placeholder.input')" clearable></el-input>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip9") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="templateVO.operator" :placeholder="$t('placeholder.select')" clearable>
            <el-option v-for="item in operList" :key="item.id" :label="item.operName" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("form.SearchButton") }}</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="type" :label="$t('all.tip537')" min-width="10%"> </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip48')" min-width="10%">
          <div slot-scope="scope" class="tableStyle">
            <div class="tableLink" @click="push(scope.row.competitionId)">{{ scope.row.name }}</div>
          </div>
        </el-table-column>
        <el-table-column prop="description" :label="$t('all.tip138')" min-width="10%"> </el-table-column>
        <el-table-column :label="$t('all.tip433')" min-width="10%">
          <template slot-scope="scope">
            <div>{{ scope.row.cdateInt | showDate }}</div>
          </template>
        </el-table-column>
        <el-table-column min-width="10%">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="del(scope.row.templateId)">{{ $t("all.tip130") }}</el-button>
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
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
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
      operList: [],
      total: 1,
      templateVO: {
        userId: '',
        leagueType: 1,
        name: '',
        operator: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: []
    };
  },
  mounted() {
    this.templateVO.userId = sessionStorage.getItem('userId');
    this.search();
    this.getOperationdata(this.templateVO.userId);
  },
  methods: {
    getOperationdata(userId) {
      this.$axios.post('/getoperationlist', this.$qs.stringify({ userId })).then(res => {
        this.operList = res.data.data.list;
      });
    },
    search() {
      this.$axios.post('/gettemplatelist', this.$qs.stringify(this.templateVO)).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    del(id) {
      this.$axios.post(`/delcompetitiontemplatebyid?id=${id}`).then(res => {
        this.$message(res.data.msg);
        this.search(this.userId);
      });
    },
    sizeChange(size) {
      this.templateVO.pageSize = size;
      this.search();
    },
    currentChange(num) {
      this.templateVO.pageNum = num;
      this.search();
    },
    push(id) {
      this.$router.push({
        path: 'competition',
        query: {
          id,
          isTemplate: true
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
.tableLink {
  color: #1890ff;
  cursor: pointer;
}
</style>
