<template>
  <div class="content">
    <el-row class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip17") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="infoVO.countryId" :placeholder="$t('placeholder.select')">
            <el-option v-for="item in countryList" :key="item.id" :value="item.id" :label="item.label"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip9") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="infoVO.operationId" filterable remote :remote-method="remoteMethod" :placeholder="$t('placeholder.input')" clearable>
            <el-option v-for="item in playerList" :key="item.operationId" :label="item.operationName" :value="item.operationId"> </el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip436") }}
        </el-col>
        <el-col :span="3">
          <el-date-picker v-model="infoVO.startDate" type="date" default-time="00:00:00" :placeholder="$t('placeholder.datePicker')" @change="dateChange" clearable> </el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-date-picker v-model="infoVO.endDate" type="date" default-time="23:59:59" :placeholder="$t('placeholder.datePicker')" :picker-options="pickerOptions" clearable> </el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip609") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="infoVO.useType" :placeholder="$t('placeholder.select')" clearable>
            <el-option :value="1" :label="$t('all.tip610')"></el-option>
            <el-option :value="2" :label="$t('all.tip611')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip597") }}
        </el-col>
        <el-col :span="3">
          <el-input v-model="infoVO.name" clearable></el-input>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip600") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="infoVO.status" :placeholder="$t('placeholder.select')">
            <el-option :value="0" :label="$t('all.tip601')"></el-option>
            <el-option :value="1" :label="$t('all.tip600')"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("form.SearchButton") }}</el-button>
        </el-col>
      </el-row>
    </el-row>
    <el-row class="searchBox">
      <el-col :span="1">
        <el-button type="primary" size="mini" @click="create">{{ $t("form.Createbutton") }}</el-button>
      </el-col>
    </el-row>
    <div class="table">
      <el-table :data="tableData" border>
        <el-table-column type="index" :label="$t('all.tip257')" width="50"> </el-table-column>
        <el-table-column prop="countryName" :label="$t('all.tip17')" min-width="5%"></el-table-column>
        <el-table-column prop="sideBull" :label="$t('all.tip609')" min-width="5%">
          <template slot-scope="scope">
            <div>{{ scope.row.useType === 1 ? $t("all.tip610") : $t("all.tip611") }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="title" :label="$t('all.tip596')" min-width="10%">
          <template slot-scope="scope">
            <div class="imgBox"><img :src="scope.row.image" alt="" /></div>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('all.tip597')" min-width="20%">
          <template slot-scope="scope">
            <div class="link" @click="entryPage(scope.row.id)">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="userName" :label="$t('all.tip9')" min-width="10%"></el-table-column>
        <el-table-column prop="registerDate" :label="$t('all.tip612')" min-width="10%">
          <template slot-scope="scope">
            <div>{{ `${scope.row.startDate || "-"} ~ ${scope.row.endDate || "-"}` }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="cdateInt" :label="$t('all.tip613')" min-width="10%"> </el-table-column>
        <el-table-column :label="$t('all.tip594')" min-width="8%">
          <template slot-scope="scope">
            <div>{{ scope.row.useType === 1 ? scope.row.mainOrderNo : scope.row.viceOrderNo }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('all.tip600')" min-width="5%">
          <template slot-scope="scope">
            <div class="tableClass">
              <el-checkbox v-model="scope.row.status" @change="checkboxChange(scope.row)"></el-checkbox>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="5%">
          <template slot-scope="scope">
            <el-button size="mini" @click="deleteNews(scope.row.id)">{{ $t("all.tip130") }}</el-button>
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
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const vm = this;
    return {
      pickerOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.infoVO.startDate);
          return time.getTime() < date1;
        }
      },
      total: 0,
      tableData: [],
      countryList: [],
      operatorList: [],
      infoVO: {
        countryId: "",
        userId: localStorage.getItem("LeagueUserId"),
        operationId: "",
        useType: null,
        startDate: "",
        endDate: "",
        name: "",
        status: null,
        pageNum: 1,
        pageSize: 10
      },
      dialogInfo: {},
      playerList: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getCountryList();
      this.getOoperatorList();
    },
    create() {
      this.$router.push("/createBanner");
    },
    entryPage(id) {
      this.$router.push({
        path: "/createBanner",
        query: {
          bannerId: id
        }
      });
    },
    search() {
      this.$axios.post("/getBannerList", this.infoVO).then(res => {
        res.data.data.list.forEach(i => {
          // eslint-disable-next-line no-param-reassign
          i.status = Boolean(i.status);
        });
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    deleteNews(id) {
      this.$axios.post("/delbannerbyid", this.$qs.stringify({ id })).then(res => {
        if (res.data.msg) {
          this.$message(res.data.msg);
          this.search();
        }
      });
    },
    checkboxChange(item) {
      const obj = Object.assign({}, item, { status: Number(item.status) });
      this.$axios.post("/operationbanner", obj).then(res => {
        this.$message(res.data.msg);
      });
    },
    dateChange(data) {
      if (this.infoVO.endDate && this.infoVO.endDate < data) {
        this.infoVO.endDate = "";
      }
    },
    sizeChange(value) {
      this.infoVO.pageSize = value;
      this.search();
    },
    currentChange(value) {
      this.infoVO.pageNum = value;
      this.search();
    },
    getOoperatorList() {
      this.$axios.post("/operation/getcreatorlist", this.$qs.stringify({ userId: this.infoVO.userId })).then(res => {
        this.operatorList = res.data.data;
      });
    },
    getCountryList() {
      this.$axios.post("/getcountry", this.$qs.stringify({ creatorId: this.infoVO.userId })).then(res => {
        this.countryList = res.data.data;
        this.infoVO.countryId = res.data.data[0].id;
        this.search();
      });
    },
    remoteMethod(value) {
      if (value) {
        const obj = {
          opeatorIdName: value,
          userId: this.infoVO.userId
        };
        this.$axios.post("/searchOperation", this.$qs.stringify(obj)).then(res => {
          this.playerList = res.data.data;
        });
      } else {
        this.playerList = [];
      }
    }
  }
};
</script>
<style scoped>
.searchBox {
  padding-left: 10px;
}
.imgBox {
  height: 60px;
}
.imgBox img {
  height: 100%;
}
.tableClass {
  text-align: center;
}
.link {
  color: #1890ff;
  cursor: pointer;
}
</style>
