<template>
  <div class="content">
    <el-row class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip4") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="scheduleVO.countryId" clearable :placeholder="$t('placeholder.select')" @change="change">
            <el-option v-for="item in ContinentArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="scheduleVO.areaId" clearable :placeholder="$t('placeholder.select')">
            <el-option v-for="item in CountryArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip8") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="scheduleVO.leagueName" clearable filterable :placeholder="$t('placeholder.select')">
            <el-option v-for="(item, index) in competitionNameList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip6") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="scheduleVO.status" clearable :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip0')"></el-option>
            <el-option :value="2" :label="$t('all.tip27')"></el-option>
            <el-option :value="3" :label="$t('all.tip26')"></el-option>
            <el-option :value="3" :label="$t('all.tip28')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip5") }}
        </el-col>
        <el-col :span="6">
          <el-col :span="12" id="divBoxWidth">
            <el-select v-model="scheduleVO.leagueType" clearable :placeholder="$t('placeholder.select')">
              <el-option :value="0" :label="$t('all.tip0')"></el-option>
              <el-option :value="1" :label="$t('all.tip42')"></el-option>
              <el-option :value="2" :label="$t('all.tip43')"></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip457") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="scheduleVO.agentUserId" clearable :placeholder="$t('placeholder.select')">
            <el-option v-for="item in creteList" :key="item.creatorId" :label="item.creatorName" :value="item.creatorId"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip9") }}
        </el-col>
        <el-col :span="3" id="divBoxWidth">
          <el-select v-model="scheduleVO.operUserId" clearable :placeholder="$t('placeholder.select')">
            <el-option v-for="item in operList" :key="item.id" :label="item.operName" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("form.SearchButton") }}</el-button>
        </el-col>
      </el-row>
    </el-row>
    <el-row>
      <el-col :span="14" class="timeBox">
        <el-col :span="8">
          <el-date-picker v-model="time" type="month" value-format="yyyy-M" :placeholder="$t('placeholder.datePicker')" @change="timeChange"> </el-date-picker>
        </el-col>
      </el-col>
      <el-col :span="10" class="timeBox">
        <el-col :span="3">
          <div class="Fsample">{{ $t("all.tip333") }}</div>
        </el-col>
        <el-col :span="3">
          <div class="Rsample">{{ $t("all.tip334") }}</div>
        </el-col>
      </el-col>
    </el-row>
    <el-calendar v-model="value" class="dataBox">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ data }" :data="matchArr">
        <p :class="data.isSelected ? 'is-selected' : '' + 'dataStyle'">{{ data.day }}{{ data.isSelected ? "✔️" : "" }}</p>
        <div class="detailBox" @scroll="scrollDiv($event, data.day)">
          <div class="dataStyle">
            <div v-for="item in matchArr" :key="item.index">
              <div v-if="item.confrontationDate && item.confrontationDate.split(' ')[0] === data.day">
                <div :title="`${item.stageName}/${item.homeTeamName},${item.visitTeamName}`" :class="item.state === 1 ? 'ready' : 'finished'" @click="showDetails(item)">
                  {{ `${item.stageName}/${item.homeTeamName},${item.visitTeamName}` }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      time: "",
      value: new Date(),
      creteList: [],
      operList: [],
      day: "",
      lastTime: null,
      timer: null,
      scheduleVO: {
        countryId: "",
        areaId: "",
        leagueName: "",
        status: "",
        leagueType: "",
        agentUserId: "",
        operUserId: "",
        userId: sessionStorage.getItem("LeagueUserId"),
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
      },
      ContinentArr: [],
      CountryArr: [],
      matchArr: [],
      competitionNameList: [],
      historyObj: []
    };
  },
  mounted() {
    const userId = sessionStorage.getItem("LeagueUserId");
    this.getOperationdata(userId);
    this.getCretetionData(userId);
    this.search();
    this.getCounarr(userId);
    this.getAllCompetitionName();
  },
  methods: {
    getCounarr(userId) {
      this.$axios.post("/getcountry", this.$qs.stringify({ creatorId: userId })).then(res => {
        this.ContinentArr = res.data.data;
      });
    },
    change(value) {
      const vm = this;
      this.$axios.post("/getareabycountryid", vm.$qs.stringify({ countryId: value })).then(res => {
        vm.CountryArr = res.data.data;
      });
      this.scheduleVO.areaId = null;
    },
    getAllCompetitionName() {
      this.$axios.get(`/getAllCompetitionName?userId=${sessionStorage.getItem("LeagueUserId")}`).then(res => {
        this.competitionNameList = res.data.data;
      });
    },
    timeChange(value) {
      const [year, month] = value.split("-");
      this.scheduleVO.year = year;
      this.scheduleVO.month = month;
      this.value = new Date(value);
      this.search();
    },
    showDetails(data) {
      this.$router.push({
        path: "/matchTableStage",
        query: {
          data: JSON.stringify(data)
        }
      });
    },
    search() {
      this.$axios.post("/getSchedule", this.scheduleVO).then(res => {
        if (res.data.data) {
          this.matchArr = res.data.data;
        }
      });
    },
    getOperationdata(userId) {
      this.$axios.post("/operation/getoperationlist", this.$qs.stringify({ userId })).then(res => {
        this.operList = res.data.data.list;
      });
    },
    getCretetionData(userId) {
      this.$axios.post("/operation/getcreatorlist", this.$qs.stringify({ userId })).then(res => {
        this.creteList = res.data.data;
      });
    },
    mgmt() {
      this.$router.push({
        name: "entryList"
      });
    },
    assign() {
      this.$router.push({
        name: "assign"
      });
    },
    push(msg) {
      this.$router.push({
        name: "resultInformation",
        params: {
          name: msg.row.city
        }
      });
    },
    scrollDiv($event, day) {
      this.throttle($event, day)();
    },
    throttle($event, day) {
      // 下滚动加载数据（historyObj 保存每次加载页码）
      const vm = this;
      const time = 500;
      let flag = false; // 是否加载请求
      return () => {
        // 记录当前函数触发的时间
        const nowTime = Date.now();
        if (vm.lastTime && nowTime - vm.lastTime < time) {
          clearTimeout(vm.timer);
          vm.timer = setTimeout(() => {
            const obj = {};
            let data = {};
            const isHas = vm.historyObj.find(i => i.day === day);
            if (isHas) {
              if ($event.srcElement.scrollTop > isHas.currentTop) {
                flag = true;
                isHas.day = day;
                isHas.num += 1;
                data.pageNum = isHas.num;
              } else {
                flag = false;
              }
              isHas.currentTop = $event.srcElement.scrollTop;
            } else {
              flag = true;
              obj.day = day;
              obj.num = 1;
              obj.currentTop = 0;
              data.pageNum = obj.num;
              vm.historyObj.push(obj);
            }
            data.pageSize = 7;
            data.day = day.substr(8);
            if (flag) {
              data = Object.assign(vm.scheduleVO, data);
              // 记录上一次函数触发的时间
              vm.lastTime = nowTime;
              vm.$axios.post("/getScheduleDay", data).then(res => {
                if (res.data.data.list.length) {
                  vm.matchArr.push(...res.data.data.list);
                }
              });
            }
          }, time);
        } else {
          vm.lastTime = nowTime;
        }
      };
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
.dataStyle {
  text-align: center;
}
.dataBox >>> .current {
  height: 180px;
}
.dataBox >>> .el-calendar-day {
  height: 100%;
}
.finished {
  background: red;
  color: #fff;
  border-radius: 5px;
  margin: 2px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.finished:hover {
  font-weight: bold;
}
.ready {
  border: 1px solid #111;
  border-radius: 5px;
  margin: 2px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: black;
}
.ready:hover {
  font-weight: bold;
}
.Fsample {
  border: 1px solid red;
  border-radius: 5px;
  background: red;
  text-align: center;
  color: #fff;
}
.Rsample {
  border: 1px solid #111;
  border-radius: 5px;
  text-align: center;
}
.timeBox {
  display: flex;
  justify-content: flex-end;
}
.detailBox {
  height: 150px;
  overflow-y: auto;
  position: relative;
}
</style>
