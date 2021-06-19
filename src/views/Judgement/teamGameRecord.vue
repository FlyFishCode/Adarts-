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
          <el-select v-model="gameRecordVO.setId" :placeholder="$t('all.tip516')" clearable>
            <el-option v-for="item in setList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip54") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="gameRecordVO.legId" :placeholder="$t('all.tip516')" clearable>
            <el-option v-for="item in legList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="getData">{{ $t("all.tip10") }}</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="setNumber" :label="$t('all.tip53')" min-width="10%"> </el-table-column>
        <el-table-column prop="setFirst" :label="$t('all.tip466')" min-width="10%"> </el-table-column>
        <el-table-column prop="legNumber" :label="$t('all.tip54')" min-width="10%"> </el-table-column>
        <el-table-column prop="legFirst" :label="$t('all.tip473')" min-width="10%"> </el-table-column>
        <el-table-column :label="$t('all.tip226')" min-width="10%">
          <template slot-scope="scope">
            <div v-if="scope.row.gameMode === 1">
              {{ "Single" }}
            </div>
            <div v-if="scope.row.gameMode === 2">
              {{ "Double" }}
            </div>
            <div v-if="scope.row.gameMode === 3">
              {{ "Trios" }}
            </div>
            <div v-if="scope.row.gameMode === 4">
              {{ "Gallon" }}
            </div>
            <div v-if="scope.row.gameMode === 5">
              {{ "Team" }}
            </div>
            <div v-if="scope.row.gameMode === 6">
              {{ "Team2" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="game" :label="$t('all.tip213')" min-width="10%"> </el-table-column>
      </el-table>
    </div>

    <div class="search">
      <el-row>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip445") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="updata.playerResultId" :placeholder="$t('all.tip516')">
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
          <el-select v-model="updata.judge" :placeholder="$t('all.tip516')">
            <el-option value="1" :label="$t('all.tip551')"></el-option>
            <el-option value="2" :label="$t('all.tip376')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip370") }}
        </el-col>
        <el-col :span="7" id="divBoxWidth">
          <el-input v-model="updata.judgement" clearable :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="save">{{ $t("all.tip136") }}</el-button>
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
  name: "teamGameRecord",
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
      updata: {
        playerResultId: "",
        judgeUserId: "",
        judge: "",
        judgement: ""
      },
      gameRecordVO: {
        confrontationId: "",
        teamId: "",
        setId: "",
        legId: ""
      },
      setList: [],
      legList: [],
      tableData: [],
      teamData: []
    };
  },
  mounted() {
    this.gameRecordVO.confrontationId = this.$route.query.confrontationId;
    this.gameRecordVO.teamId = this.$route.query.teamId;
    this.gameRecordVO.setId = this.$route.query.setId;
    this.gameRecordVO.legId = this.$route.query.legId;
    this.updata.judgeUserId = sessionStorage.getItem("LeagueUserId");
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.post("/judgement/getlegGameRecord", this.$qs.stringify(this.gameRecordVO)).then(res => {
        if (res.data.errCode) {
          this.$message(res.data.msg);
        } else {
          this.tableData = [res.data.data];
          for (let i = 0; i < 4; i += 1) {
            const obj = {};
            switch (i) {
              case 0:
                obj.home = res.data.data.teamList[0].teamName;
                obj.value = "all.tip215";
                obj.away = res.data.data.teamList[1].teamName;
                this.teamData.push(obj);
                break;
              case 1:
                obj.home = res.data.data.teamList[0].ppd || res.data.data.teamList[0].mpr;
                obj.value = "all.tip228";
                obj.away = res.data.data.teamList[1].ppd || res.data.data.teamList[1].mpr;
                this.teamData.push(obj);
                break;
              case 2:
                obj.home = res.data.data.teamList[0].cdateInt;
                obj.value = "all.tip321";
                obj.away = res.data.data.teamList[1].cdateInt;
                this.teamData.push(obj);
                break;
              default:
                obj.photo = true;
                obj.homeName = res.data.data.teamList[0].playerResultId;
                obj.value = "all.tip371";
                obj.photo = true;
                obj.awayName = res.data.data.teamList[1].playerResultId;
                this.teamData.push(obj);
                break;
            }
          }
        }
      });
    },
    dateChange(data) {
      if (this.gameRecordVO.EndTime && this.gameRecordVO.EndTime < data) {
        this.gameRecordVO.EndTime = "";
      }
    },
    save() {
      this.$axios.post("/judgement/updateJudge", this.$qs.stringify(this.updata)).then(res => {
        if (res.data.code === 1000) {
          this.$message(res.data.msg);
        }
      });
    },
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
  width: 80px;
}
.playerStyle {
  text-align: center;
  margin: 10px 0;
}
</style>
