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
          {{ $t("all.tip4") }}
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
      </el-row>
      <el-row class="center-Row">
        <el-col :span="3" class="label-g">
          {{ $t("all.tip445") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ teamList.competition }}
        </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip51") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ teamList.status }}
        </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip52") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ teamList.area }}
        </el-col>
        <el-col :span="3" class="label-g">
          {{ $t("all.tip21") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ teamList.area }}
        </el-col>
      </el-row>
    </div>

    <div class="search">
      <el-row>
        <el-col class="label-g" :span="1">
          {{ $t("all.tip368") }}
        </el-col>
        <el-col :span="2">
          <el-select v-model="ResultMgmtVO.StatusValue" :placeholder="$t('placeholder.select')">
            <el-option value="1" :label="$t('all.tip0')"></el-option>
            <el-option value="2" :label="$t('all.tip27')"></el-option>
            <el-option value="3" :label="$t('all.tip26')"></el-option>
            <el-option value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip226") }}
        </el-col>
        <el-col :span="2">
          <el-select v-model="ResultMgmtVO.StatusValue" :placeholder="$t('placeholder.select')">
            <el-option value="1" :label="$t('all.tip0')"></el-option>
            <el-option value="2" :label="$t('all.tip27')"></el-option>
            <el-option value="3" :label="$t('all.tip26')"></el-option>
            <el-option value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="1">
          {{ $t("all.tip213") }}
        </el-col>
        <el-col :span="2">
          <el-select v-model="ResultMgmtVO.StatusValue" :placeholder="$t('placeholder.select')">
            <el-option value="1" :label="$t('all.tip0')"></el-option>
            <el-option value="2" :label="$t('all.tip27')"></el-option>
            <el-option value="3" :label="$t('all.tip26')"></el-option>
            <el-option value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip367") }}
        </el-col>
        <el-col :span="2">
          <el-select v-model="ResultMgmtVO.StatusValue" :placeholder="$t('placeholder.select')">
            <el-option value="1" :label="$t('all.tip0')"></el-option>
            <el-option value="2" :label="$t('all.tip27')"></el-option>
            <el-option value="3" :label="$t('all.tip26')"></el-option>
            <el-option value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="1">
          {{ $t("all.tip321") }}
        </el-col>
        <el-col :span="6">
          <el-col :span="11">
            <el-date-picker v-model="ResultMgmtVO.competitionStartPeriod" type="datetime" format="yyyy-MM-dd" :placeholder="$t('placeholder.datePicker')" default-time="00:00:00" @change="dateChange">
            </el-date-picker>
          </el-col>
          <el-col :span="1" class="lineClass">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="ResultMgmtVO.competitionEndPeriod"
              type="datetime"
              format="yyyy-MM-dd"
              :placeholder="$t('placeholder.datePicker')"
              default-time="23:59:59"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-col>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("form.SearchButton") }}</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" :label="$t('all.tip321')" min-width="7%"> </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip53')" min-width="7%"> </el-table-column>
        <el-table-column prop="name" :label="$t('all.tip54')" min-width="7%"> </el-table-column>
        <el-table-column prop="name" :label="$t('all.tip226')" min-width="6%"> </el-table-column>
        <el-table-column prop="name" :label="$t('all.tip213')" min-width="8%"> </el-table-column>
        <el-table-column prop="address" :label="$t('all.tip374')" min-width="5%"> </el-table-column>
        <el-table-column prop="address" :label="$t('all.tip368')" min-width="5%">
          <template slot-scope="scope">
            <div class="tableLink" @click="show">{{ scope.row.city }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="address" :label="$t('all.tip33')" min-width="5%">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="view(scope.row.id)">{{ $t("all.tip33") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="$t('all.tip540')" :visible.sync="dialogTableVisible">
      <el-table :data="dialogData">
        <el-table-column prop="date" :label="$t('all.tip321')" min-width="10%"></el-table-column>
        <el-table-column prop="name" :label="$t('all.tip541')" min-width="10%"></el-table-column>
        <el-table-column prop="name" :label="$t('all.tip445')" min-width="10%"></el-table-column>
        <el-table-column prop="name" :label="$t('all.tip368')" min-width="10%"></el-table-column>
        <el-table-column prop="name" :label="$t('all.tip225')" min-width="10%"></el-table-column>
        <el-table-column prop="name" :label="$t('all.tip233')" min-width="10%"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "playerMatch",
  components: {},
  data() {
    const vm = this;
    return {
      pickerOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.judgementVO.StartTime);
          return time.getTime() < date1;
        }
      },
      dialogTableVisible: false,
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
      ],
      dialogData: []
    };
  },
  methods: {
    dateChange(data) {
      if (this.ResultMgmtVO.EndTime && this.ResultMgmtVO.EndTime < data) {
        this.ResultMgmtVO.EndTime = "";
      }
    },
    search() {},
    view(data) {
      this.$router.push({
        name: "playerGameRecord",
        query: {
          id: data
        }
      });
    },
    show() {
      this.dialogTableVisible = true;
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
