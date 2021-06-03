<template>
  <div class="content">
    <div class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip316") }}
        </el-col>
        <el-col :title="MemberVO.teamName" :span="3" class="overFlowStyle lineClass">
          {{ MemberVO.teamName }}
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip455") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle lineClass">
          {{ MemberVO.homeShopName }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip246") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ MemberVO.captainName }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip255") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ MemberVO.entryMembers }}
        </el-col>
      </el-row>
    </div>
    <el-row class="center-Row">
      <el-col :span="2" class="lineClass">
        <el-button type="primary" size="mini" @click="addMember">{{ $t("all.tip256") }}</el-button>
      </el-col>
    </el-row>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" :label="$t('all.tip257')" width="50"> </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip258')" min-width="8%">
          <template slot-scope="scope">
            <div class="formImgBox">
              <img :src="scope.row.imgUrl" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="userName" :label="$t('all.tip259')" min-width="7%"> </el-table-column>
        <el-table-column :label="$t('all.tip208')" min-width="6%">
          <template slot-scope="scope">
            {{ scope.row.gender === 1 ? $t("all.tip209") : $t("all.tip210") }}
          </template>
        </el-table-column>
        <el-table-column prop="cardNumber" sortable :label="$t('all.tip260')" min-width="15%">
          <template slot-scope="scope">
            <div v-for="(card, index) in scope.row.cardList" :key="card.cardId" class="leagueImgBox">
              <el-radio v-model="card.selectValue" :label="index" @change="handleRadioChange(scope.$index, index, card.selectValue)">
                {{ card.cardNumber }}
                <img class="leagueImg" :src="card.cardType === 5 ? staticObj.leagueImg : staticObj.adartsImg" alt="" />
              </el-radio>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="homeShopName" :label="$t('all.tip247')" min-width="8%"> </el-table-column>
        <el-table-column label="Adarts">
          <el-table-column prop="adartsRating" :label="$t('all.tip154')" min-width="6%"> </el-table-column>
          <el-table-column prop="adartsPPd" :label="$t('all.tip155')" min-width="5%"> </el-table-column>
          <el-table-column prop="adartsMpr" :label="$t('all.tip156')" min-width="5%"> </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('all.tip1')">
          <el-table-column prop="leagueRating" :label="$t('all.tip154')" min-width="6%"> </el-table-column>
          <el-table-column prop="leaguePPd" :label="$t('all.tip155')" min-width="5%"> </el-table-column>
          <el-table-column prop="leagueMpr" :label="$t('all.tip156')" min-width="5%"> </el-table-column>
        </el-table-column>
        <el-table-column label="User Define">
          <el-table-column :label="$t('all.tip154')" min-width="8%">
            <template slot-scope="scope">
              <el-input v-model="scope.row.defineRating" @change="handleChange('Rating', scope.$index, scope.row.defineRating)" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('all.tip155')" min-width="8%">
            <template slot-scope="scope">
              <el-input v-model="scope.row.definePpd" @change="handleChange('PPD', scope.$index, scope.row.definePpd)" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('all.tip156')" min-width="8%">
            <template slot-scope="scope">
              <el-input v-model="scope.row.defineMpr" @change="handleChange('MPR', scope.$index, scope.row.defineMpr)" clearable></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="status" :label="$t('all.tip25')" min-width="8%">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 1">{{ $t("all.tip242") }}</div>
            <div v-if="scope.row.status === 2">{{ $t("all.tip27") }}</div>
            <div v-if="scope.row.status === 3">{{ $t("all.tip253") }}</div>
          </template>
        </el-table-column>
        <el-table-column min-width="10%">
          <template slot-scope="scope">
            <div style="display:flex">
              <el-button type="primary" size="mini" @click="save(scope.row)">{{ $t("all.tip136") }}</el-button>
              <el-button type="danger" size="mini" @click="Remove(scope.row.competitionPlayerId)">{{ $t("all.tip134") }}</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="topBox">
      <el-dialog :title="$t('all.tip256')" width="70%" :visible.sync="dialogTableVisible" top="30px">
        <el-row class="center-Row">
          <el-col :span="3" class="label-g">
            {{ $t("all.tip268") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="TopBox.playerId" clearable :placeholder="$t('all.tip38')"></el-input>
          </el-col>
          <el-col :span="3" class="label-g">
            {{ $t("all.tip324") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="TopBox.playerName" clearable :placeholder="$t('all.tip38')"></el-input>
          </el-col>
          <el-col :span="3" class="label-g">
            {{ $t("all.tip426") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="TopBox.cardNumber" clearable :placeholder="$t('all.tip38')"></el-input>
          </el-col>
        </el-row>
        <el-row class="center-Row">
          <el-col :span="3" class="label-g">
            {{ $t("all.tip208") }}
          </el-col>
          <el-col :span="4">
            <el-select v-model="TopBox.gender" clearable :placeholder="$t('all.tip516')">
              <el-option value="1" :label="$t('all.tip209')"></el-option>
              <el-option value="2" :label="$t('all.tip210')"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3" class="label-g">
            {{ $t("all.tip455") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="TopBox.homeShopName" clearable :placeholder="$t('all.tip38')"></el-input>
          </el-col>
          <el-col :span="3" class="lineClass">
            <el-button type="primary" size="mini" @click="topBoxSearch">{{ $t("all.tip10") }}</el-button>
          </el-col>
        </el-row>
        <div>
          <el-table :data="topBoxTableData" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column property="userName" :label="$t('all.tip259')" min-width="6%"></el-table-column>
            <el-table-column :label="$t('all.tip208')" min-width="6%">
              <template slot-scope="scope">
                <span>{{ scope.row.gender === 1 ? $t("all.tip209") : $t("all.tip210") }}</span>
              </template>
            </el-table-column>
            <el-table-column property="cardNumber" :label="$t('all.tip260')" min-width="10%">
              <template slot-scope="scope">
                <div v-for="card in scope.row.cardList" :key="card.cardId" class="leagueImgBox">
                  {{ card.cardNumber }}
                  <img class="leagueImg" :src="card.cardType === 5 ? staticObj.leagueImg : staticObj.adartsImg" alt="" />
                </div>
              </template>
            </el-table-column>
            <el-table-column property="homeShopName" :label="$t('all.tip455')" min-width="6%"></el-table-column>
            <el-table-column property="teamName" :label="$t('all.tip316')" min-width="6%"></el-table-column>
            <el-table-column sortable label="Adarts">
              <el-table-column prop="adartsRating" sortable :label="$t('all.tip154')" min-width="6%"> </el-table-column>
              <el-table-column prop="adartsPPd" sortable :label="$t('all.tip155')" min-width="5%"> </el-table-column>
              <el-table-column prop="adartsMpr" sortable :label="$t('all.tip156')" min-width="5%"> </el-table-column>
            </el-table-column>
            <el-table-column sortable :label="$t('all.tip1')">
              <el-table-column prop="leagueRating" sortable :label="$t('all.tip154')" min-width="6%"> </el-table-column>
              <el-table-column prop="leaguePPd" sortable :label="$t('all.tip155')" min-width="5%"> </el-table-column>
              <el-table-column prop="leagueMpr" sortable :label="$t('all.tip156')" min-width="5%"> </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <el-row class="DialogButton">
          <el-col :span="2">
            <el-button type="primary" size="mini" @click="add">{{ $t("all.tip132") }}</el-button>
          </el-col>
        </el-row>
        <div class="page">
          <el-pagination
            @size-change="topBoxSizeChange"
            @current-change="topBoxcurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="topBoxTotal"
          >
          </el-pagination>
        </div>
      </el-dialog>
    </div>
    <div class="page">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="1" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="tableTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { staticObj } from "@/components/common/Utils";
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      staticObj,
      dialogTableVisible: false,
      multipleSelection: [],
      topBoxTotal: 1,
      tableTotal: 1,
      selectValue: 1,
      MemberVO: {
        teamName: "",
        homeShopName: "",
        captainName: "",
        entryMembers: ""
      },
      playerListVO: {
        competitionId: "",
        competitionTeamId: "",
        pageNum: 1,
        pageSize: 10
      },
      TopBox: {
        competitionId: "",
        competitionTeamId: "",
        teamId: "",
        playerId: "",
        playerName: "",
        cardNumber: "",
        gender: "",
        homeShopName: "",
        pageNum: 1,
        pageSize: 10
      },
      topBoxTableData: [],
      tableData: []
    };
  },
  mounted() {
    if (this.$route.query.data) {
      this.MemberVO = JSON.parse(this.$route.query.data);
    }
    this.TopBox.teamId = this.MemberVO.teamId;
    this.TopBox.competitionId = this.MemberVO.competitionId;
    this.TopBox.competitionTeamId = this.MemberVO.competitionTeamId;
    this.playerListVO.competitionId = this.MemberVO.competitionId;
    this.playerListVO.competitionTeamId = this.MemberVO.competitionTeamId;
    this.getPlayerList();
  },
  methods: {
    getPlayerList() {
      const vm = this;
      this.$axios.post("/getCompPlayerTeamList", this.$qs.stringify(this.playerListVO)).then(res => {
        vm.tableTotal = res.data.data.total;
        res.data.data.list.forEach(i => {
          i.cardList.forEach((j, index) => {
            if (j.isEntryCard) {
              Object.assign(j, { selectValue: index });
              // eslint-disable-next-line no-param-reassign
              // i.leagueMpr = j.leagueMpr;
              // eslint-disable-next-line no-param-reassign
              // i.leaguePPd = j.leaguePPd;
              // eslint-disable-next-line no-param-reassign
              // i.leagueRating = j.leagueRating;
            } else {
              Object.assign(j, { selectValue: "" });
            }
          });
        });
        vm.tableData = res.data.data.list;
      });
    },
    sizeChange(value) {
      this.playerListVO.pageSize = value;
      this.getPlayerList();
    },
    currentChange(value) {
      this.playerListVO.pageNum = value;
      this.getPlayerList();
    },
    topBoxSearch() {
      const vm = this;
      this.$axios.post("/getCompNoPlayTeamList", this.TopBox).then(res => {
        this.$message(res.data.msg);
        vm.topBoxTotal = res.data.data.total;
        vm.topBoxTableData = res.data.data.list;
      });
    },
    addMember() {
      this.topBoxSearch();
      this.dialogTableVisible = true;
    },
    save(row) {
      const cardId = row.cardList.find(i => typeof i.selectValue === "number").selectValue;
      const obj = {
        competitionPlayerId: row.competitionPlayerId,
        defineRating: row.defineRating,
        definePpd: row.definePpd,
        defineMpr: row.defineMpr,
        userCardId: row.cardList[cardId].cardId
      };
      this.$axios.post("/updateDefineRating", [obj]).then(res => {
        this.$message(res.data.msg);
      });
    },
    handleChange(type, rowIndex, value) {
      if (value) {
        const defaultObj = this.tableData[rowIndex];
        const RatingList = [
          "1.00",
          "2.00",
          "3.00",
          "4.00",
          "5.00",
          "6.00",
          "7.00",
          "8.00",
          "9.00",
          "10.00",
          "11.00",
          "12.00",
          "13.00",
          "14.00",
          "15.00",
          "16.00",
          "17.00",
          "18.00",
          "19.00",
          "20.00",
          "21.00",
          "22.00",
          "23.00",
          "24.00",
          "25.00",
          "26.00",
          "27.00",
          "28.00",
          "29.00",
          "30.00"
        ];
        const PPDList = [
          "0",
          "10.65",
          "11.90",
          "13.15",
          "14.40",
          "15.65",
          "16.90",
          "18.15",
          "19.45",
          "20.75",
          "22.05",
          "23.35",
          "24.65",
          "25.95",
          "27.30",
          "28.65",
          "30.00",
          "31.35",
          "32.70",
          "34.05",
          "35.40",
          "36.80",
          "38.20",
          "39.60",
          "41.00",
          "42.40",
          "43.80",
          "45.20",
          "46.60",
          "48.00"
        ];
        const MPRList = [
          "0",
          "1.10",
          "1.20",
          "1.31",
          "1.46",
          "1.61",
          "1.76",
          "1.91",
          "2.06",
          "2.21",
          "2.36",
          "2.51",
          "2.66",
          "2.81",
          "2.96",
          "3.11",
          "3.26",
          "3.41",
          "3.56",
          "3.71",
          "3.86",
          "4.07",
          "4.28",
          "4.49",
          "4.70",
          "4.96",
          "5.22",
          "5.48",
          "5.74",
          "6.00"
        ];
        const getLevel = (typeStr, num, typeList, list) => {
          let flag = false;
          let level = 0;
          if (typeStr === "Rating") {
            if (num >= 30) {
              flag = true;
            }
          }
          if (typeStr === "PPD") {
            if (num >= 48) {
              flag = true;
            }
          }
          if (typeStr === "MPR") {
            if (num >= 6) {
              flag = true;
            }
          }
          if (flag) {
            return list[list.length - 1];
          }
          for (let index = 0; index < typeList.length; index += 1) {
            if (Number(num) >= Number(typeList[index]) && index !== typeList.length - 1) {
              const temp = Number((num - typeList[index]) / (typeList[index + 1] - typeList[index])).toFixed(4);
              level = (Number(list[index]) + temp * (list[index + 1] - list[index]).toFixed(4)).toFixed(2);
            }
          }
          return Number(level);
        };
        switch (type) {
          case "Rating":
            defaultObj.defineRating = getLevel("Rating", value, RatingList, RatingList);
            defaultObj.definePpd = getLevel("Rating", value, RatingList, PPDList);
            defaultObj.defineMpr = getLevel("Rating", value, RatingList, MPRList);
            break;
          case "PPD":
            defaultObj.definePpd = getLevel("PPD", value, PPDList, PPDList);
            if (value && defaultObj.defineMpr) {
              defaultObj.defineRating = ((getLevel("PPD", value, PPDList, RatingList) + Number(getLevel("MPR", defaultObj.defineMpr, MPRList, RatingList))) / 2).toFixed(2);
            }
            if ((value && !defaultObj.defineMpr) || (!value && defaultObj.defineMpr)) {
              defaultObj.defineRating = getLevel("PPD", value, PPDList, RatingList);
            }
            break;
          default:
            defaultObj.defineMpr = getLevel("MPR", value, MPRList, MPRList);
            if (defaultObj.definePpd && value) {
              defaultObj.defineRating = ((Number(getLevel("PPD", defaultObj.definePpd, PPDList, RatingList)) + Number(getLevel("MPR", value, MPRList, RatingList))) / 2).toFixed(2);
            }
            if ((!value && defaultObj.definePpd) || (value && !defaultObj.definePpd)) {
              defaultObj.defineRating = getLevel("MPR", value, MPRList, RatingList);
            }
            break;
        }
      }
    },
    handleRadioChange(rowIndex, index, value) {
      this.tableData[rowIndex].cardList.forEach((j, jndex) => {
        if (jndex !== index) {
          Object.assign(j, { selectValue: value });
        } else {
          this.tableData[rowIndex].adartsRating = j.adartsRating;
          this.tableData[rowIndex].adartsPPd = j.adartsPPd;
          this.tableData[rowIndex].adartsMpr = j.adartsMpr;
          this.tableData[rowIndex].leagueRating = j.leagueRating;
          this.tableData[rowIndex].leaguePPd = j.leaguePPd;
          this.tableData[rowIndex].leagueMpr = j.leagueMpr;
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    add() {
      const data = {
        competitionTeamId: this.MemberVO.competitionTeamId,
        playerIdList: [...this.multipleSelection.map(i => i.userId)]
      };
      this.$axios.post("/compPlayerIntoTeam", data).then(() => {
        this.getPlayerList();
      });
      this.dialogTableVisible = false;
    },
    Remove(id) {
      const vm = this;
      this.$axios.get(`/compTeamRemovePlayer?competitionPlayerId=${id}`).then(res => {
        if (res.data) {
          vm.getPlayerList();
        }
      });
    },
    topBoxSizeChange(val) {
      const vm = this;
      vm.TopBox.pageSize = val;
      this.$axios.post("/getCompNoPlayTeamList", this.TopBox).then(res => {
        vm.topBoxTotal = res.data.data.total;
        vm.topBoxTableData = res.data.data.list;
      });
    },
    topBoxcurrentChange(val) {
      const vm = this;
      vm.TopBox.pageNum = val;
      this.$axios.post("/getCompNoPlayTeamList", this.TopBox).then(res => {
        vm.topBoxTotal = res.data.data.total;
        vm.topBoxTableData = res.data.data.list;
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
  margin-bottom: 15px;
}
#topBox >>> .el-radio__label {
  display: none;
}
.formImgBox {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}
.formImgBox img {
  width: 100%;
  height: 100%;
}
.dialogTable {
  height: 600px;
  overflow-y: auto;
}
</style>
