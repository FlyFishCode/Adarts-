<template>
  <div class="content">
    <div class="search">
      <el-row class="center-Row">
        <el-col :span="3" class="label-g">
          {{ $t("all.tip8") }}
        </el-col>
        <el-col :span="3" :title="teamList.competitionName" class="overFlowStyle lineClass">
          {{ teamList.competitionName }}
        </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip6") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          <div v-if="teamList.status === 1">{{ this.$t("all.tip26") }}</div>
          <div v-if="teamList.status === 2">{{ this.$t("all.tip27") }}</div>
          <div v-if="teamList.status === 3">{{ this.$t("all.tip28") }}</div>
        </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip4") }}
        </el-col>
        <el-col :span="9" class="overFlowStyle lineClass">
          {{ teamList.area }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col :span="3" class="label-g">
          {{ $t("all.tip5") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ teamList.leagueType === 1 ? $t("all.tip42") : $t("all.tip43") }}
        </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip7") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass"> {{ teamList.competitionStartPeriod | showDate }}~{{ teamList.competitionEndPeriod | showDate }} </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip310") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ teamList.entryCount }}
        </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip364") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ getRatingType(teamList.rankingType) }}
        </el-col>
      </el-row>
    </div>

    <div class="search">
      <el-row>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip214") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="teamListVO.ranking" clearable :placeholder="$t('all.tip516')">
            <el-option v-for="item in rankingList" :key="item.id" :label="$t(item.label)" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip51") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="teamListVO.categoryId" clearable :placeholder="$t('all.tip516')" @change="categoryChange">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip52") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="teamListVO.divisionId" clearable :placeholder="$t('all.tip516')" @change="divisionChange">
            <el-option v-for="item in divisionList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip21") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="teamListVO.stageId" clearable :placeholder="$t('all.tip516')">
            <el-option v-for="item in stageList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("all.tip10") }}</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" :label="$t('all.tip214')" width="100"> </el-table-column>
        <el-table-column :label="$t('all.tip244')" min-width="7%">
          <template slot-scope="scope">
            <div class="tableLink" @click="entryPage(scope.row)">{{ scope.row.teamName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="homeShop" :label="$t('all.tip455')" min-width="7%"> </el-table-column>
        <el-table-column prop="numOfGame" :label="$t('all.tip366')" min-width="6%"> </el-table-column>
        <el-table-column prop="rating" :label="$t('all.tip154')" min-width="8%"> </el-table-column>
        <el-table-column prop="ppd" :label="$t('all.tip155')" min-width="5%"> </el-table-column>
        <el-table-column prop="mpr" :label="$t('all.tip156')" min-width="5%"> </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="1" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { saveQuery } from "@/components/common/Utils";

export default {
  name: "teamList",
  components: {},
  data() {
    return {
      teamList: {
        competitionName: "",
        status: "",
        area: "",
        leagueType: "",
        competitionStartPeriod: "",
        competitionEndPeriod: "",
        number: "",
        rankingType: ""
      },
      teamListVO: {
        competitionId: "",
        ranking: "",
        categoryId: "",
        divisionId: "",
        stageId: "",
        pageNum: 1,
        pageSize: 10
      },
      rankingList: [
        { id: 0, label: "all.tip0" },
        { id: 1, label: "all.tip559" },
        { id: 2, label: "all.tip560" },
        { id: 3, label: "all.tip561" },
        { id: 4, label: "all.tip562" },
        { id: 5, label: "all.tip563" }
      ],
      queryData: {},
      total: 1,
      categoryList: [],
      divisionList: [],
      stageList: [],
      tableData: []
    };
  },
  mounted() {
    let data = "";
    try {
      data = JSON.parse(this.$route.query.data);
    } catch {
      data = this.$route.query.data;
    }
    this.init(data);
    this.search();
    this.getSelectList(data.id || data.competitionId);
  },
  methods: {
    init(data) {
      this.teamList = data;
      this.teamListVO.competitionId = data.id || data.competitionId;
      this.teamList.area = "";
      data.countryList.forEach(i => {
        let str = "";
        if (i.areaName) {
          str = `,${i.areaName}`;
        }
        this.teamList.area += `${i.countryName}${str};`;
      });
    },
    search() {
      this.$axios.post("/judgement/teamList", this.$qs.stringify(this.teamListVO)).then(res => {
        if (res.data.data) {
          res.data.data.teamList.list.forEach(i => {
            // eslint-disable-next-line no-param-reassign
            i.competitionId = this.teamListVO.competitionId;
          });
          this.queryData.type = res.data.data.type;
          this.queryData.status = res.data.data.status;
          this.queryData.entryCount = res.data.data.entryCount;
          this.queryData.countryList = res.data.data.countryList;
          this.queryData.competitionId = res.data.data.competitionId;
          this.queryData.competitionName = res.data.data.competitionName;
          this.queryData.competitionStartPeriod = res.data.data.competitionStartPeriod;
          this.queryData.competitionEndPeriod = res.data.data.competitionEndPeriod;
          this.tableData = res.data.data.teamList.list;
          this.total = res.data.data.teamList.total;
        }
      });
    },
    sizeChange(value) {
      this.teamListVO.pageSize = value;
      this.search();
    },
    currentChange(value) {
      this.teamListVO.pageNum = value;
      this.search();
    },
    getRatingType(type) {
      let str = "";
      switch (type) {
        case 1:
          str = "按比赛排";
          break;
        case 2:
          str = "按段位排";
          break;
        case 3:
          str = "分组Division";
          break;
        default:
          str = "阶段stage";
          break;
      }
      return str;
    },
    getSelectList(id) {
      this.$axios.post(`/allsubset?competitionId=${id}`).then(res => {
        this.findObj(res.data.data);
      });
    },
    findObj(list) {
      const vm = this;
      list.forEach(i => {
        const Cobj = {
          label: "",
          id: ""
        };
        if (i.url === "category") {
          Cobj.label = i.label;
          Cobj.id = i.id;
          vm.categoryList.push(Cobj);
          i.children.forEach(j => {
            const Dobj = {
              label: "",
              id: ""
            };
            if (j.url === "division") {
              Dobj.label = j.label;
              Dobj.id = j.id;
              vm.divisionList.push(Dobj);
              j.children.forEach(k => {
                const Sobj = {
                  label: "",
                  id: ""
                };
                if (k.url === "stage") {
                  Sobj.label = k.label;
                  Sobj.id = k.id;
                  vm.stageList.push(Sobj);
                }
              });
            }
          });
        } else {
          // eslint-disable-next-line no-unused-expressions
          i.children && this.findObj(i.children);
        }
      });
    },
    entryPage(data) {
      saveQuery("teamList", Object.assign(this.queryData, data));
      this.$router.push({
        name: "teamMatch",
        query: { data: JSON.stringify(Object.assign(this.queryData, data)) }
      });
    },
    categoryChange() {
      this.teamListVO.divisionId = "";
      this.teamListVO.stageId = "";
    },
    divisionChange() {
      this.teamListVO.stageId = "";
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
</style>
