<template>
  <div class="content">
    <div class="search">
      <el-row class="center-Row">
        <el-col :span="3" class="label-g">
          {{ $t("all.tip1") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ teamList.competition }}
        </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip536") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ teamList.status }}
        </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip535") }}
        </el-col>
        <el-col :span="9" class="overFlowStyle lineClass">
          {{ teamList.area }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col :span="3" class="label-g">
          {{ $t("all.tip537") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ teamList.type }}
        </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip538") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass"> {{ teamList.start }}-{{ teamList.end }} </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip310") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ teamList.number }}
        </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip364") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ teamList.area }}
        </el-col>
      </el-row>
    </div>

    <div class="search">
      <el-row>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip214") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="ResultMgmtVO.StatusValue" :placeholder="$t('placeholder.select')">
            <el-option value="1" :label="$t('all.tip0')"></el-option>
            <el-option value="2" :label="$t('all.tip27')"></el-option>
            <el-option value="3" :label="$t('all.tip26')"></el-option>
            <el-option value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip51") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="ResultMgmtVO.StatusValue" :placeholder="$t('placeholder.select')">
            <el-option value="1" :label="$t('all.tip0')"></el-option>
            <el-option value="2" :label="$t('all.tip27')"></el-option>
            <el-option value="3" :label="$t('all.tip26')"></el-option>
            <el-option value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip52") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="ResultMgmtVO.StatusValue" :placeholder="$t('placeholder.select')">
            <el-option value="1" :label="$t('all.tip0')"></el-option>
            <el-option value="2" :label="$t('all.tip27')"></el-option>
            <el-option value="3" :label="$t('all.tip26')"></el-option>
            <el-option value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip21") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="ResultMgmtVO.StatusValue" :placeholder="$t('placeholder.select')">
            <el-option value="1" :label="$t('all.tip0')"></el-option>
            <el-option value="2" :label="$t('all.tip27')"></el-option>
            <el-option value="3" :label="$t('all.tip26')"></el-option>
            <el-option value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("form.SearchButton") }}</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" :label="$t('all.tip214')" min-width="7%"> </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip445')" min-width="7%">
          <template slot-scope="scope">
            <div class="tableLink" @click="push(scope)">{{ scope.row.city }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('all.tip455')" min-width="7%"> </el-table-column>
        <el-table-column prop="name" :label="$t('all.tip366')" min-width="6%"> </el-table-column>
        <el-table-column prop="name" :label="$t('all.tip154')" min-width="8%"> </el-table-column>
        <el-table-column prop="address" :label="$t('all.tip155') + '(' + $t('all.tip213') + ')'" min-width="5%"> </el-table-column>
        <el-table-column prop="address" :label="$t('all.tip156') + '(' + $t('all.tip213') + ')'" min-width="5%"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "playerList",
  components: {},
  data() {
    return {
      teamList: {},
      ResultMgmtVO: {
        AreaOne: "",
        AreaTwo: "",
        AreaThree: "",
        StatusValue: "",
        TypeValue: "",
        PeriodValue: "",
        Name: "",
        Operator: "",
        StartTime: "",
        EndTime: "",
        EntryStartTime: "",
        EntryEndTime: ""
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  methods: {
    search() {},
    push(msg) {
      this.$router.push({
        name: "playerMatch",
        query: {
          name: msg.row.city
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
.el-table >>> td,
.el-table >>> th {
  text-align: center;
}
</style>
