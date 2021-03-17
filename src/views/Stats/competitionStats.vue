<template>
  <div class="content">
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="year" :label="$t('all.tip544')" min-width="7%"> </el-table-column>
        <el-table-column :label="$t('all.tip537')" min-width="7%">
          <template slot-scope="scope">
            <div>
              {{scope.row.leagueType === 1?$t('all.tip40'):$t('all.tip41')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="league" :label="$t('all.tip1')" min-width="7%"> </el-table-column>
        <el-table-column prop="category" :label="$t('all.tip51')" min-width="7%"> </el-table-column>
        <el-table-column prop="division" :label="$t('all.tip52')" min-width="7%"> </el-table-column>
        <el-table-column prop="stage" :label="$t('all.tip21')" min-width="7%"> </el-table-column>
        <el-table-column prop="match" :label="$t('all.tip365')" min-width="7%"> </el-table-column>
        <el-table-column prop="team" :label="$t('all.tip244')" min-width="7%"> </el-table-column>
        <el-table-column prop="player" :label="$t('all.tip445')" min-width="7%"> </el-table-column>
        <el-table-column prop="rating" :label="$t('all.tip154')" min-width="7%"> </el-table-column>
        <el-table-column prop="ppd" :label="$t('all.tip155')" min-width="7%"> </el-table-column>
        <el-table-column prop="mpr" :label="$t('all.tip156')" min-width="7%"> </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page='1' :page-sizes="[10, 50, 100, 200]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
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
      total: 1,
      info: {
        pageNum: 1,
        pageSize: 10
      },
      tableData: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.post('/leaguestats', this.info).then(res => {
        if (res.data.errorCode) {
          this.$message(res.data.msg);
        } else {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        }
      });
    },
    sizeChange(value) {
      this.info.pageSize = value;
      this.getData();
    },
    currentChange(value) {
      this.info.pageNum = value;
      this.getData();
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
