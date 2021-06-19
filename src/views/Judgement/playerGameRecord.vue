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
        <el-col class="label-g" :span="3">
          {{ $t("all.tip53") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="ResultMgmtVO.StatusValue" :placeholder="$t('all.tip516')">
            <el-option value="1" :label="$t('all.tip0')"></el-option>
            <el-option value="2" :label="$t('all.tip27')"></el-option>
            <el-option value="3" :label="$t('all.tip26')"></el-option>
            <el-option value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip54") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="ResultMgmtVO.StatusValue" :placeholder="$t('all.tip516')">
            <el-option value="1" :label="$t('all.tip0')"></el-option>
            <el-option value="2" :label="$t('all.tip27')"></el-option>
            <el-option value="3" :label="$t('all.tip26')"></el-option>
            <el-option value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("all.tip10") }}</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" :label="$t('all.tip53')" min-width="7%"> </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip466')" min-width="7%"> </el-table-column>
        <el-table-column prop="name" :label="$t('all.tip54')" min-width="7%"> </el-table-column>
        <el-table-column prop="name" :label="$t('all.tip473')" min-width="6%"> </el-table-column>
        <el-table-column prop="name" :label="$t('all.tip226')" min-width="8%"> </el-table-column>
        <el-table-column prop="address" :label="$t('all.tip213')" min-width="5%"> </el-table-column>
      </el-table>
    </div>

    <div class="search">
      <el-row>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip445") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="ResultMgmtVO.StatusValue" :placeholder="$t('all.tip516')">
            <el-option value="1" :label="$t('all.tip0')"></el-option>
            <el-option value="2" :label="$t('all.tip27')"></el-option>
            <el-option value="3" :label="$t('all.tip26')"></el-option>
            <el-option value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip368") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="ResultMgmtVO.StatusValue" :placeholder="$t('all.tip516')">
            <el-option value="1" :label="$t('all.tip0')"></el-option>
            <el-option value="2" :label="$t('all.tip27')"></el-option>
            <el-option value="3" :label="$t('all.tip26')"></el-option>
            <el-option value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip370") }}
        </el-col>
        <el-col :span="7" id="divBoxWidth">
          <el-input v-model="ResultMgmtVO.name" clearable :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("all.tip10") }}</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="teamData" border style="width: 100%">
        <el-table-column :label="$t('all.tip53')" min-width="7%">
          <template slot-scope="scope">
            <div v-if="scope.row.photo">
              <div class="formImgBox">
                <img src="@/assets/img/2.jpg" alt="" />
              </div>
              <div>{{ scope.row.homeName }}</div>
              <div>
                <el-button type="primary" size="mini" @click="homeClick(scope.row)">{{ $t("all.tip372") }}</el-button>
              </div>
            </div>
            <div v-else>
              <div>{{ scope.row.home }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="value" :label="$t('all.tip445')" min-width="7%">
          <template slot-scope="scope">
            <div>{{ $t(scope.row.value) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="away" :label="$t('all.tip54')" min-width="7%">
          <template slot-scope="scope">
            <div v-if="scope.row.photo">
              <div class="formImgBox">
                <img src="@/assets/img/2.jpg" alt="" />
              </div>
              <div>{{ scope.row.awayName }}</div>
              <div>
                <el-button type="primary" size="mini" @click="awayClick(scope.row)">{{ $t("all.tip372") }}</el-button>
              </div>
            </div>
            <div v-else>
              <div>{{ scope.row.away }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="search">
      <el-row>
        <el-col>{{ $t("all.tip542") }}</el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="12">
        <div class="playerStyle">{{ "张三" }}</div>
        <div class="table">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" :label="$t('all.tip53')" min-width="7%"> </el-table-column>
            <el-table-column prop="date" :label="$t('all.tip466')" min-width="7%"> </el-table-column>
            <el-table-column prop="name" :label="$t('all.tip54')" min-width="7%"> </el-table-column>
            <el-table-column prop="name" :label="$t('all.tip473')" min-width="6%"> </el-table-column>
            <el-table-column prop="name" :label="$t('all.tip226')" min-width="8%"> </el-table-column>
            <el-table-column prop="address" :label="$t('all.tip213')" min-width="5%"> </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="playerStyle">{{ "李四" }}</div>
        <div class="table">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" :label="$t('all.tip53')" min-width="7%"> </el-table-column>
            <el-table-column prop="date" :label="$t('all.tip466')" min-width="7%"> </el-table-column>
            <el-table-column prop="name" :label="$t('all.tip54')" min-width="7%"> </el-table-column>
            <el-table-column prop="name" :label="$t('all.tip473')" min-width="6%"> </el-table-column>
            <el-table-column prop="name" :label="$t('all.tip226')" min-width="8%"> </el-table-column>
            <el-table-column prop="address" :label="$t('all.tip213')" min-width="5%"> </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
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
      teamData: []
    };
  },
  mounted() {
    this.setTeamData();
  },
  methods: {
    dateChange(data) {
      if (this.ResultMgmtVO.EndTime && this.ResultMgmtVO.EndTime < data) {
        this.ResultMgmtVO.EndTime = "";
      }
    },
    setTeamData() {
      for (let i = 0; i < 4; i += 1) {
        const obj = {};
        switch (i) {
          case 0:
            obj.home = "广州体育学院";
            obj.value = "all.tip215";
            obj.away = "深圳体育学院";
            this.teamData.push(obj);
            break;
          case 1:
            obj.home = "1";
            obj.value = "all.tip228";
            obj.away = "2";
            this.teamData.push(obj);
            break;
          case 2:
            obj.home = "2019-10-14 21:34";
            obj.value = "all.tip321";
            obj.away = "2019-1-4 2:14";
            this.teamData.push(obj);
            break;
          default:
            obj.photo = true;
            obj.homeName = "张三";
            obj.value = "all.tip371";
            obj.photo = true;
            obj.awayName = "李四";
            this.teamData.push(obj);
            break;
        }
      }
    },
    search() {},
    show() {
      this.dialogTableVisible = true;
    },
    homeClick(data) {
      console.log(data);
    },
    awayClick(data) {
      console.log(data);
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
.formImgBox {
  margin: 0 auto;
}
.playerStyle {
  text-align: center;
  margin: 10px 0;
}
</style>
