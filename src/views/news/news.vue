<template>
  <div class="content">
    <el-row class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip17") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="infoVO.countryId" :placeholder="$t('all.tip516')">
            <el-option v-for="item in countryList" :key="item.id" :value="item.id" :label="item.label"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip51") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="infoVO.category" :placeholder="$t('all.tip516')" clearable>
            <el-option v-for="item in categoryList" :key="item.value" :value="item.value" :label="$t(item.label)"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip436") }}
        </el-col>
        <el-col :span="3">
          <el-date-picker v-model="infoVO.registerStartDate" type="date" default-time="00:00:00" :placeholder="$t('all.tip516')" @change="dateChange" clearable> </el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-date-picker v-model="infoVO.registerEndDate" type="date" default-time="23:59:59" :placeholder="$t('all.tip516')" :picker-options="pickerOptions" clearable> </el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip9") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="infoVO.opeatorIdName" filterable remote :remote-method="remoteMethod" :placeholder="$t('all.tip38')" clearable>
            <el-option v-for="item in playerList" :key="item.operationId" :label="item.operationName" :value="item.operationId"> </el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip597") }}
        </el-col>
        <el-col :span="3">
          <el-input v-model="infoVO.title"></el-input>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip600") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="infoVO.display" :placeholder="$t('all.tip516')">
            <el-option :value="1" :label="$t('all.tip600')"></el-option>
            <el-option :value="0" :label="$t('all.tip601')"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("all.tip10") }}</el-button>
        </el-col>
      </el-row>
    </el-row>
    <el-row class="searchBox">
      <el-col :span="1">
        <el-button type="primary" size="mini" @click="create">{{ $t("all.tip16") }}</el-button>
      </el-col>
    </el-row>
    <div class="table">
      <el-table :data="tableData" border>
        <el-table-column type="index" :label="$t('all.tip257')" width="50"> </el-table-column>
        <el-table-column prop="countryName" :label="$t('all.tip17')" min-width="10%"></el-table-column>
        <el-table-column prop="sideBull" :label="$t('all.tip51')" min-width="5%">
          <template slot-scope="scope">
            <div>{{ $t(getCategoryType(scope.row.category)) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="title" :label="$t('all.tip596')" min-width="10%">
          <template slot-scope="scope">
            <div class="imgBox"><img :src="scope.row.thumbnail" alt="" /></div>
          </template>
        </el-table-column>
        <el-table-column prop="title" :label="$t('all.tip597')" min-width="20%">
          <template slot-scope="scope">
            <div class="link" @click="entryPage(scope.row.id)">{{ scope.row.title }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="opeatorName" :label="$t('all.tip9')" min-width="10%"> </el-table-column>
        <el-table-column prop="registerDate" :label="$t('all.tip598')" min-width="10%">
          <template slot-scope="scope">
            <div>{{ scope.row.registerDate }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="visitCount" :label="$t('all.tip599')" min-width="10%"> </el-table-column>
        <el-table-column prop="display" :label="$t('all.tip600')" min-width="5%">
          <template slot-scope="scope">
            <div class="tableClass">
              <el-checkbox v-model="scope.row.display" @change="checkboxChange(scope.row)"></el-checkbox>
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
          const date1 = new Date(vm.infoVO.registerStartDate);
          return time.getTime() < date1;
        }
      },
      userId: sessionStorage.getItem("LeagueUserId"),
      total: 0,
      tableData: [],
      countryList: [],
      operatorList: [],
      categoryList: [{ value: 1, label: "all.tip603" }, { value: 2, label: "all.tip604" }, { value: 3, label: "all.tip605" }, { value: 4, label: "all.tip606" }, { value: 5, label: "all.tip1" }],
      infoVO: {
        countryId: "",
        category: 1,
        registerStartDate: "",
        registerEndDate: "",
        opeatorIdName: "",
        title: "",
        display: 1,
        pageNum: 1,
        pageSize: 10
      },
      dialogInfo: {},
      playerList: []
    };
  },
  mounted() {
    this.getCountryList();
    // this.getOoperatorList();
  },
  methods: {
    create() {
      this.$router.push("/createNews");
    },
    entryPage(id) {
      this.$router.push({
        path: "/createNews",
        query: {
          newsId: id
        }
      });
    },
    search() {
      this.$axios.post("/getLeagueNewsList", this.infoVO).then(res => {
        if (res.data.code === 1000) {
          res.data.data.list.forEach(i => {
            // eslint-disable-next-line no-param-reassign
            i.display = Boolean(i.display);
          });
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        }
      });
    },
    sizeChange(value) {
      this.infoVO.pageSize = value;
      this.search();
    },
    currentChange(value) {
      this.infoVO.pageNum = value;
      this.search();
    },
    deleteNews(id) {
      this.$axios.post("/delleaguenewsbyid", this.$qs.stringify({ id })).then(res => {
        if (res.data.code === 1000) {
          this.search();
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    getCategoryType(type) {
      let str = "";
      switch (type) {
        case 1:
          str = "all.tip603";
          break;
        case 2:
          str = "all.tip604";
          break;
        case 3:
          str = "all.tip605";
          break;
        case 4:
          str = "all.tip606";
          break;
        default:
          str = "all.tip1";
          break;
      }
      return str;
    },
    checkboxChange(item) {
      this.$axios.post("/updatedisplay", this.$qs.stringify({ id: item.id, display: Number(item.display) })).then(res => {
        this.$message(res.data.msg);
      });
    },
    dateChange(data) {
      if (this.infoVO.registerEndDate && this.infoVO.registerEndDate < data) {
        this.infoVO.registerEndDate = "";
      }
    },
    getOoperatorList() {
      this.$axios.post("/operation/getcreatorlist", this.$qs.stringify({ userId: this.userId })).then(res => {
        this.operatorList = res.data.data;
      });
    },
    getCountryList() {
      this.$axios.post("/getcountry", this.$qs.stringify({ creatorId: this.userId })).then(res => {
        if (res.data.data) {
          this.countryList = res.data.data;
          this.infoVO.countryId = res.data.data[0].id;
          this.search();
        }
      });
    },
    remoteMethod(value) {
      if (value) {
        const obj = {
          opeatorIdName: value,
          userId: this.userId
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
  width: 60px;
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
