<template>
  <div class="content">
    <div class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip3") }}
        </el-col>
        <el-col :title="detail.name" :span="3" class="overFlowStyle lineClass">
          {{ detail.name }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip6") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ $t(detail.status) }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip4") }}
        </el-col>
        <el-col :span="9" class="overFlowStyle lineClass">
          {{ detail.area }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip5") }}
        </el-col>
        <el-col :span="3" class="overFlowStyle lineClass">
          {{ $t(detail.type) }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip7") }}
        </el-col>
        <el-col :span="5" class="overFlowStyle lineClass">
          {{ detail.date }}
        </el-col>
      </el-row>
    </div>
    <div class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip51") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="ResultMgmtVO.SerchList.Category" :placeholder="$t('placeholder.select')" clearable @change="categoryChange">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip52") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="ResultMgmtVO.SerchList.Division" :placeholder="$t('placeholder.select')" clearable @change="divisionChange">
            <el-option v-for="item in divisionList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip21") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="ResultMgmtVO.SerchList.Stage" :placeholder="$t('placeholder.select')" clearable @change="change">
            <el-option v-for="item in stageList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip315") }}
        </el-col>
        <el-col :span="3">
          <el-input v-model="ResultMgmtVO.SerchList.TeamID" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip316") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="ResultMgmtVO.SerchList.TeamName" :placeholder="$t('placeholder.select')">
            <el-option v-for="item in teamList" :key="item.teamId" :label="item.teamName" :value="item.teamId"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("form.SearchButton") }}</el-button>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip317") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-checkbox v-model="ResultMgmtVO.SerchList.ResultGame">{{ $t("all.tip318") }}</el-checkbox>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip319") }}
        </el-col>
        <el-col :span="3" class="lineClass">
          <el-checkbox v-model="ResultMgmtVO.SerchList.Line_upGame">{{ $t("all.tip320") }}</el-checkbox>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width:100%">
        <el-table-column prop="time" :label="$t('all.tip321')" min-width="10%"> </el-table-column>
        <el-table-column prop="id" :label="$t('all.tip322')" min-width="8%"> </el-table-column>
        <el-table-column :label="$t('all.tip323')">
          <el-table-column prop="homeTeamName" :label="$t('all.tip324')" min-width="8%"> </el-table-column>
          <el-table-column prop="homeResult" :label="$t('all.tip309')" min-width="5%"> </el-table-column>
          <el-table-column :label="$t('all.tip327')" min-width="5%">
            <template slot-scope="scope">
              <div v-if="scope.row.homeManageStatus === 0">{{ $t('all.tip329') }}</div>
              <div v-if="scope.row.homeManageStatus === 1">{{ $t('all.tip330') }}</div>
              <div v-if="scope.row.homeManageStatus === 2">{{ $t('all.tip328') }}</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('all.tip326')">
          <el-table-column :label="$t('all.tip327')" min-width="5%">
            <template slot-scope="scope">
              <div v-if="scope.row.visitingManageStatus === 0">{{ $t('all.tip329') }}</div>
              <div v-if="scope.row.visitingManageStatus === 1">{{ $t('all.tip330') }}</div>
              <div v-if="scope.row.visitingManageStatus === 2">{{ $t('all.tip328') }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="visitingResult" :label="$t('all.tip309')" min-width="5%"> </el-table-column>
          <el-table-column prop="visitingTeamName" :label="$t('all.tip324')" min-width="8%"> </el-table-column>
        </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip331')" min-width="10%">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="lineUpViewClick(scope.row)">{{ $t("all.tip33") }}</el-button>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip332')" min-width="10%">
          <template slot-scope="scope">
            <div v-if="scope.row.state === 1">{{ $t("all.tip289") }}</div>
            <div v-if="scope.row.state === 2">{{ $t("all.tip288") }}</div>
            <div v-if="scope.row.state === 3">{{ $t("all.tip333") }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip336')" min-width="12%">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="down(scope.row)">{{ $t("form.DownloadButton") }}</el-button>
            <el-button size="mini" type="primary" @click="upload(scope.row)">{{ $t("all.tip338") }}</el-button>
          </template>
        </el-table-column>
        <el-table-column :label="$t('all.tip339')" min-width="10%">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="result(scope.row)">{{ $t("form.showButton") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="1" :page-sizes="[10, 50, 100, 200]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <div>
      <el-dialog :title="$t('all.tip234')" :visible.sync="lineUpTopBoxVisible" top="5vh">
        <el-row class="center-Row">
          <el-col class="label-g" :span="4">{{ $t("all.tip235") }}</el-col>
          <el-col :span="6" class="lineClass">{{ this.lineUpTopBoxDetialData.date }}</el-col>
          <el-col class="label-g" :span="4">{{ $t("all.tip25") }}</el-col>
          <el-col :span="5" class="lineClass">{{ this.lineUpTopBoxDetialData.HomeType === 1?$t('all.tip330'):$t('all.tip328') }}</el-col>
          <el-col :span="5" class="lineClass">{{ this.lineUpTopBoxDetialData.AwayType === 1?$t('all.tip330'):$t('all.tip328') }}</el-col>
        </el-row>
        <div class="dialogTable">
          <el-table :data="lineUpTopBoxTableList" border style="width: 100%">
            <el-table-column type="index" :label="$t('all.tip53')" min-width="6%"></el-table-column>
            <el-table-column :label="$t('all.tip54')" min-width="6%">
              <template slot-scope="scope">
                <div v-for="(item, index) in scope.row.legGameList" :key="index" :style="setStyle(scope.row.MaxPlayer)">{{ (index += 1) }}</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('all.tip236')" min-width="6%">
              <template slot-scope="scope">
                <div v-for="(item, index) in scope.row.legGameList" :key="index" :style="setStyle(scope.row.MaxPlayer)">
                  <!-- {{ item.gameNameStr }} -->
                  {{ $t(returnType(item.gameName)) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="mode" :label="$t('all.tip226')" min-width="6%">
              <template slot-scope="scope">
                <div v-if="scope.row.mode === 1">{{ $t("all.tip200") }}</div>
                <div v-if="scope.row.mode === 2">{{ $t("all.tip201") }}</div>
                <div v-if="scope.row.mode === 3">{{ $t("all.tip202") }}</div>
                <div v-if="scope.row.mode === 4">{{ $t("all.tip203") }}</div>
                <div v-if="scope.row.mode === 5">{{ $t("all.tip204") }}</div>
                <div v-if="scope.row.mode === 6">{{ $t("all.tip205") }}</div>
                <div v-if="scope.row.gender === 1">
                  <span class="iconfont el-icon-nanren"></span>
                  <span>{{ $t("all.tip577") + "       " + scope.row.genderNum }}</span>
                </div>
                <div v-if="scope.row.gender === 2">
                  <span class="iconfont el-icon-nvren"></span>
                  <span>{{ $t("all.tip577") + "       " + scope.row.genderNum }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('all.tip323') + ' ' + '【' + this.lineUpTopBoxDetialData.homeTeam + '】'" min-width="6%">
              <template slot-scope="scope">
                <div v-for="(leg, index) in scope.row.legGameList" :key="index" class="legStyle">
                  <div v-for="(item, jndex) in new Array(scope.row.MaxPlayer).fill(scope.row.MaxPlayer)" :key="jndex">
                    <!-- // leg 每一leg -->
                    <div class="tableselectBox">
                      <el-select v-model="leg.playerList[jndex].homePlayerId" @change="HomePlayerSelect($event,scope,index,jndex,1)" :placeholder="$t('placeholder.select')">
                        <el-option v-for="item in homeTeamPlayers" :key="item.jndex" :label="item.playerGender === 1 ? item.playerName + '(' + $t('all.tip209') + ')' : item.playerName + '(' + $t('all.tip210') + ')'" :value="item.playerId">
                          <span style="float: left">{{ item.playerName }}</span>
                          <span v-if="item.playerGender === 1" style="float: right; color: #8492a6; font-size: 13px;line-height:34px">{{ $t("all.tip209") }}</span>
                          <span v-else style="float: right; color: #8492a6; font-size: 13px;line-height:34px">{{ $t("all.tip210") }}</span>
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('all.tip326') + ' ' + '【' + this.lineUpTopBoxDetialData.awayTeam + '】'" min-width="6%">
              <template slot-scope="scope">
                <div v-for="(leg, index) in scope.row.legGameList" :key="index" class="legStyle">
                  <div v-for="(item, jndex) in new Array(scope.row.MaxPlayer).fill(scope.row.MaxPlayer)" :key="jndex">
                    <!-- // leg 每一leg -->
                    <div class="tableselectBox">
                      <el-select v-model="leg.playerList[jndex].visitingPlayerId" @change="HomePlayerSelect($event,scope,index,jndex,2)" :placeholder="$t('placeholder.select')">
                        <el-option v-for="item in awayTeamPlayers" :key="item.jndex" :label="item.playerGender === 1 ? item.playerName + '(' + $t('all.tip209') + ')' : item.playerName + '(' + $t('all.tip210') + ')'" :value="item.playerId">
                          <span style="float: left">{{ item.playerName }}</span>
                          <span v-if="item.playerGender === 1" style="float: right; color: #8492a6; font-size: 13px;line-height:34px">{{ $t("all.tip209") }}</span>
                          <span v-else style="float: right; color: #8492a6; font-size: 13px;line-height:34px">{{ $t("all.tip210") }}</span>
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-row class="center-Row lineUpBoxFotter">
          <el-col :span="8" class="buttonStyleBox">
            <el-button size="mini" type="primary" @click="getIntoSet(1, 1)">{{ $t("all.tip136") }}</el-button>
            <el-button size="mini" type="primary" @click="getIntoSet(1, 2)">{{ $t("all.tip136") }}</el-button>
          </el-col>
        </el-row>
        <el-row class="center-Row lineUpBoxFotter">
          <el-col :span="8" class="buttonStyleBox">
            <el-button size="mini" type="primary" @click="getIntoSet(2, 1)">{{ $t("all.tip237") }}</el-button>
            <el-button size="mini" type="primary" @click="getIntoSet(2, 2)">{{ $t("all.tip237") }}</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'detail',
  components: {},
  data() {
    return {
      lineUpTopBoxVisible: false,
      categoryList: [],
      divisionList: [],
      stageList: [],
      teamList: [],
      total: 1,
      detail: {
        name: '',
        status: '',
        area: '',
        type: '',
        date: ''
      },
      ResultMgmtVO: {
        SerchList: {
          Competition: '',
          CompetitionStatus: '',
          CompetitionArea: '',
          CompetitionType: '',
          EntryNumber: '',
          Category: '',
          Division: '',
          Stage: '',
          TeamID: '',
          TeamName: '',
          ResultGame: '',
          Line_upGame: ''
        },
        topBox: {
          MatchDate: '1',
          Submitted: '1',
          Saved: '1'
        }
      },
      lineUpTopBoxDetialData: [],
      lineUpTopBoxTableList: [],
      homeTeamPlayers: [],
      awayTeamPlayers: [],
      tableData: [],
      matchTeam: {
        homeTeam: '',
        awayTeam: ''
      }
    };
  },
  mounted() {
    const id = this.$route.query.id;
    this.init(this.$route.query);
    this.getTableData(id);
    this.getSelectList(id);
  },
  methods: {
    init(data) {
      this.detail.name = data.name;
      this.detail.date = data.date;
      if (data.type === '1') {
        this.detail.type = 'all.tip40';
      } else {
        this.detail.type = 'all.tip41';
      }
      if (data.status === '1') {
        this.detail.status = 'all.tip26';
      } else if (data.status === '2') {
        this.detail.status = 'all.tip27';
      } else {
        this.detail.status = 'all.tip28';
      }
      if (data.Area.length > 0) {
        JSON.parse(data.Area).forEach(i => {
          let str = '';
          if (i.areaName) {
            str = `,${i.areaName}`;
          }
          this.detail.area += `${i.countryName}${str};`;
        });
      }
    },
    returnType(id) {
      let type = '';
      switch (id) {
      case 1:
        type = 'all.tip499';
        break;
      case 2:
        type = 'all.tip500';
        break;
      case 3:
        type = 'all.tip501';
        break;
      case 4:
        type = 'all.tip502';
        break;
      case 5:
        type = 'all.tip505';
        break;
      case 6:
        type = 'all.tip506';
        break;
      case 7:
        type = 'all.tip507';
        break;
      case 8:
        type = 'all.tip508';
        break;
      case 9:
        type = 'all.tip509';
        break;
      case 10:
        type = 'all.tip177';
        break;
      case 11:
        type = 'all.tip554';
        break;
      case 12:
        type = 'all.tip555';
        break;
      case 13:
        type = 'all.tip556';
        break;
      case 14:
        type = 'all.tip557';
        break;
      case 20:
        type = 'all.tip511';
        break;
      case 21:
        type = 'all.tip510';
        break;
      case 22:
        type = 'all.tip558';
        break;
      default:
        type = 'CricketCount-up';
        break;
      }
      return type;
    },
    getTableData(id) {
      const vm = this;
      this.$axios.post(`/getconfrontationresult?competitionId=${id}`).then(res => {
        if (!res.data.errorCode) {
          vm.tableData = res.data.data.list;
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    getIntoSet(id, type) {
      console.log(id, type);
      // id 状态  是否?提交
      // type 主队/客队
      const data = [];
      for (let i = 0; i < this.lineUpTopBoxTableList.length; i += 1) {
        for (let j = 0; j < this.lineUpTopBoxTableList[i].legGameList.length; j += 1) {
          const obj = {
            confrontationInfoId: '',
            legId: '',
            setId: '',
            status: '',
            playerList: []
          };
          for (let k = 0; k < this.lineUpTopBoxTableList[i].legGameList[j].playerList.length; k += 1) {
            let playerId = '';
            if (type === 1) {
              playerId = this.lineUpTopBoxTableList[i].legGameList[j].playerList[k].homePlayerId;
            } else {
              playerId = this.lineUpTopBoxTableList[i].legGameList[j].playerList[k].visitingPlayerId;
            }
            const legPlayer = {
              isHome: type,
              playerId,
              setModeNumber: k + 1
            };
            obj.playerList.push(legPlayer);
          }
          obj.confrontationInfoId = this.lineUpTopBoxTableList[i].confrontationInfoId;
          obj.legId = this.lineUpTopBoxTableList[i].legGameList[j].legId;
          obj.setId = this.lineUpTopBoxTableList[i].setId;
          obj.status = id;
          data.push(obj);
        }
      }
      this.$axios.post('/matchTable/playerIntoLeg', data).then(res => {
        this.$message(res.data.msg);
        this.lineUpTopBoxVisible = false;
      });
    },
    categoryChange() {
      this.ResultMgmtVO.SerchList.Division = '';
      this.ResultMgmtVO.SerchList.Stage = '';
    },
    divisionChange() {
      this.ResultMgmtVO.SerchList.Stage = '';
    },
    change(value) {
      console.log(value);
    },
    SubmittedChange(a) {
      console.log(a.Submitted);
      console.log(this.ResultMgmtVO.topBox.Submitted);
    },
    SavedChange(a) {
      console.log(a.Saved);
      console.log(this.ResultMgmtVO.topBox.Saved);
    },
    SubmittedSave(res) {
      console.log(res);
    },
    SubmittedSubmit(res) {
      console.log(res);
    },
    SavedSave(res) {
      console.log(res);
    },
    SavedSubmit(res) {
      console.log(res);
    },
    search() {
      console.log(this.select);
    },
    setStyle(value) {
      return {
        height: `${48 * value}px`,
        textAlign: 'center',
        lineHeight: `${48 * value}px`
      };
    },
    HomePlayerSelect(id, row, LegIndex, PlayerIndex, type) {
      // type 1主队 2客队
      // 校验人员规则
      // 1.校验性别玩家数量。2.校验当前leg人员不能相同。3.校验玩家是否可以与上一Set相同。4.玩家参加set的最大数/参加游戏类型的最大数
      // 不满足以上规则需要清理当前选中数据给出相应提示
      const currentSetIndex = row.$index;
      const prePlayerList = [];
      const currentPlayerList = [];
      const NextPlayerList = [];
      const isAllSelect = [];
      const LegAllSelect = [];
      const AllSetObj = [];
      const CurrentLegPlayerList = [];
      let obj = 'homePlayerId';
      let RepeatIndex = -1;
      let fg = -1;
      let GenderNum = 0;
      const LegObj = {};
      const vm = this;
      if (type === 2) {
        obj = 'visitingPlayerId';
      }
      vm.lineUpTopBoxTableList[currentSetIndex].legGameList.forEach(i => {
        i.playerList.forEach(e => {
          if (type === 1) {
            isAllSelect.push(e.homePlayerId);
          } else {
            isAllSelect.push(e.visitingPlayerId);
          }
        });
      });
      // 当前leg人员重复校验
      vm.lineUpTopBoxTableList[currentSetIndex].legGameList[LegIndex].playerList.forEach(i => {
        CurrentLegPlayerList.push(
          {
            homePlayer: i.homePlayerId,
            awayPlayer: i.visitingPlayerId
          }
        );
        if (type === 1) {
          LegAllSelect.push(i.homePlayerId);
        } else {
          LegAllSelect.push(i.visitingPlayerId);
        }
      });
      CurrentLegPlayerList.forEach((i, index) => {
        CurrentLegPlayerList.forEach((j, jndex) => {
          if (index !== jndex && ((i.homePlayer && i.homePlayer === j.homePlayer) || (i.awayPlayer && i.awayPlayer === j.awayPlayer))) {
            RepeatIndex = index;
          }
        });
      });
      if (RepeatIndex !== -1) {
        vm.lineUpTopBoxTableList[currentSetIndex].legGameList[LegIndex].playerList[PlayerIndex][obj] = '';
        vm.$message(vm.$t('all.tip584'));
        return;
      }
      // 性别要求校验
      if (vm.lineUpTopBoxTableList[currentSetIndex].gender !== 3) {
        const flag = LegAllSelect.every(i => i);
        if (flag) {
          const Num = vm.lineUpTopBoxTableList[currentSetIndex].genderNum;
          const GenderList = [];
          let data = null;
          LegAllSelect.forEach(e => {
            if (type === 1) {
              data = vm.homeTeamPlayers.find(f => f.playerId === e).playerGender;
              GenderList.push(data);
            } else {
              data = vm.awayTeamPlayers.find(f => f.playerId === e).playerGender;
              GenderList.push(data);
            }
          });
          // fg 0:女 1：男
          if (vm.lineUpTopBoxTableList[currentSetIndex].gender === 1) {
            fg = 1;
          } else if (vm.lineUpTopBoxTableList[currentSetIndex].gender === 2) {
            fg = 0;
          }
          GenderList.forEach(i => {
            if (fg === 1) {
              if (i === 1) {
                GenderNum += 1;
              }
            } else if (i === 0) {
              GenderNum += 1;
            }
          });
          if (GenderNum < Num) {
            vm.lineUpTopBoxTableList[currentSetIndex].legGameList[LegIndex].playerList[PlayerIndex][obj] = '';
            if (fg === 1) {
              vm.$message(vm.$t('all.tip583') + Num);
            } else if (fg === 0) {
              vm.$message(vm.$t('all.tip579') + Num);
            }
            return;
          }
        }
      }
      vm.lineUpTopBoxTableList.forEach(i => {
        i.legGameList.forEach(j => {
          j.playerList.forEach(k => {
            AllSetObj.push({
              setId: i.setId,
              mode: i.mode,
              gameName: j.gameName,
              homePlayerId: k.homePlayerId,
              visitingPlayerId: k.visitingPlayerId
            });
          });
        });
      });
      // entryTypeNum：0 则不校验mode/leg 最大数
      if (vm.lineUpTopBoxTableList[currentSetIndex].entryTypeNum) {
        // 参加leg的最大数校验
        if (vm.lineUpTopBoxTableList[currentSetIndex].entryType === 2) {
          AllSetObj.forEach(i => {
            if (type === 1) {
              if (!LegObj[i.homePlayerId]) {
                LegObj[i.homePlayerId] = 1;
              } else {
                LegObj[i.homePlayerId] += 1;
              }
            } else if (!LegObj[i.visitingPlayerId]) {
              LegObj[i.visitingPlayerId] = 1;
            } else {
              LegObj[i.visitingPlayerId] += 1;
            }
          });
          for (const [key, value] of Object.entries(LegObj)) {
            if (key && value > vm.lineUpTopBoxTableList[currentSetIndex].entryTypeNum) {
              this.$message(this.$t('all.tip581') + vm.lineUpTopBoxTableList[currentSetIndex].entryTypeNum);
              vm.lineUpTopBoxTableList[currentSetIndex].legGameList[LegIndex].playerList[PlayerIndex][obj] = '';
              return;
            }
          }
        }
        // 参加模式的最大数校验，玩家参加同一SET算一次
        if (vm.lineUpTopBoxTableList[currentSetIndex].entryType === 1) {
          let currentList = [];
          for (let i = 0; i < AllSetObj.length; i += 1) {
            if (AllSetObj[i][obj]) {
              currentList = AllSetObj.filter(j => AllSetObj[i][obj] === j[obj] && AllSetObj[i].mode === j.mode && AllSetObj[i].setId !== j.setId);
              if (currentList.length > vm.lineUpTopBoxTableList[currentSetIndex].entryTypeNum - 1) {
                this.$message(this.$t('all.tip582') + vm.lineUpTopBoxTableList[currentSetIndex].entryTypeNum);
                vm.lineUpTopBoxTableList[currentSetIndex].legGameList[LegIndex].playerList[PlayerIndex][obj] = '';
                break;
              }
            }
          }
        }
      }
      // 当前set人员不可以和上一set人员相同校验
      if (this.lineUpTopBoxTableList[currentSetIndex].memberLimit === 2) {
        if (currentSetIndex) {
          this.lineUpTopBoxTableList[currentSetIndex - 1].legGameList.forEach(i => {
            i.playerList.forEach(j => {
              prePlayerList.push(j[obj]);
            });
          });
        }
        this.lineUpTopBoxTableList[currentSetIndex].legGameList.forEach(i => {
          i.playerList.forEach(j => {
            currentPlayerList.push(j[obj]);
          });
        });
        for (let i = 0; i < currentPlayerList.length; i += 1) {
          const repeatId = prePlayerList.find(j => j === currentPlayerList[i]);
          if (repeatId) {
            this.$message(this.$t('all.tip580'));
            vm.lineUpTopBoxTableList[currentSetIndex].legGameList[LegIndex].playerList[PlayerIndex][obj] = '';
            break;
          }
        }
        // 下一set有設置
        if (currentSetIndex !== this.lineUpTopBoxTableList.length - 1 && this.lineUpTopBoxTableList[currentSetIndex + 1].memberLimit === 2) {
          this.lineUpTopBoxTableList[currentSetIndex + 1].legGameList.forEach(i => {
            i.playerList.forEach(j => {
              NextPlayerList.push(j[obj]);
            });
          });
          for (let i = 0; i < currentPlayerList.length; i += 1) {
            const repeatId = NextPlayerList.find(j => j === currentPlayerList[i]);
            if (repeatId) {
              this.$message(this.$t('all.tip110'));
              vm.lineUpTopBoxTableList[currentSetIndex].legGameList[LegIndex].playerList[PlayerIndex][obj] = '';
              break;
            }
          }
        }
      }
    },
    lineUpViewClick(data) {
      const vm = this;
      this.lineUpTopBoxDetialData = {
        date: data.time,
        HomeType: data.HomeType,
        AwayType: data.AwayType,
        homeTeam: data.homeTeamName,
        awayTeam: data.visitingTeamName
      };
      const TeamLinePromise = new Promise((resovle, reject) => {
        this.$axios.get(`/matchTable/getTeamLineU?id=${data.id}`).then(res => {
          if (res.data.data) {
            res.data.data.forEach(i => {
              let MaxPlayer = 0;
              switch (i.mode) {
              case 1:
                MaxPlayer = 1;
                break;
              case 2:
                MaxPlayer = 2;
                break;
              case 3:
                MaxPlayer = 3;
                break;
              case 4:
                MaxPlayer = 4;
                break;
              case 5:
                MaxPlayer = 2;
                break;
              default:
                MaxPlayer = 4;
                break;
              }
              Object.assign(i, { MaxPlayer });
              i.legGameList.forEach(j => {
                if (j.playerList.length) {
                  if (j.playerList.length < MaxPlayer) {
                    for (let item = j.playerList.length; item < MaxPlayer; item += 1) {
                      j.playerList.push({
                        homePlayerId: '',
                        visitingPlayerId: ''
                      });
                    }
                  }
                } else {
                  for (let jndex = 0; jndex < MaxPlayer; jndex += 1) {
                    j.playerList.push({
                      homePlayerId: '',
                      visitingPlayerId: ''
                    });
                  }
                }
              });
            });
            resovle(res.data.data);
          } else {
            reject(res);
          }
        });
      });
      // 主队所有可选择人员
      const teamNameListPromise = new Promise((resovle, reject) => {
        this.$axios.get(`/matchTable/getTeamCompetitionPlayer?competitionId=${data.competitionId}&teamId=${data.homeTeamId}`).then(res => {
          if (res.data.data) {
            resovle(res.data.data);
          } else {
            reject(res);
          }
        });
      });
      // 客队所有可选择人员
      const awayNameListPromise = new Promise((resovle, reject) => {
        this.$axios.get(`/matchTable/getTeamCompetitionPlayer?competitionId=${data.competitionId}&teamId=${data.visitingTeamId}`).then(res => {
          if (res.data.data) {
            resovle(res.data.data);
          } else {
            reject(res);
          }
        });
      });
      const resultList = Promise.all([teamNameListPromise, awayNameListPromise, TeamLinePromise]);
      resultList.then(res => {
        [vm.homeTeamPlayers, vm.awayTeamPlayers, vm.lineUpTopBoxTableList] = res;
      });
      resultList.catch(err => {
        console.log(err);
      });
      this.lineUpTopBoxVisible = true;
    },
    getSelectList(id) {
      this.$axios.post(`/allsubset?competitionId=${id}`).then(res => {
        if (res.data.data.length) {
          this.findObj(res.data.data);
        }
      });
    },
    findObj(list) {
      const vm = this;
      list.forEach(i => {
        const Cobj = {
          label: '',
          id: ''
        };
        if (i.url === 'category') {
          Cobj.label = i.label;
          Cobj.id = i.id;
          vm.categoryList.push(Cobj);
          i.children.forEach(j => {
            const Dobj = {
              label: '',
              id: ''
            };
            if (j.url === 'division') {
              Dobj.label = j.label;
              Dobj.id = j.id;
              vm.divisionList.push(Dobj);
              j.children.forEach(k => {
                const Sobj = {
                  label: '',
                  id: ''
                };
                if (k.url === 'stage') {
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
    down() { },
    upload() { },
    result(data) {
      this.$router.push({
        name: 'resultInformation',
        query: {
          id: String(data.competitionId),
          competition: data.competitionName,
          status: data.status,
          area: JSON.stringify(data.countryList),
          type: String(data.type),
          start: data.competitionStartPeriod,
          end: data.competitionEndPeriod,
          number: data.matchTableCount,
          name: '2'
        }
      });
    },
    sizeChange(a) {
      console.log(a);
    },
    currentChange(a) {
      console.log(a);
    }
  }
};
</script>
<style scoped>
.content {
  padding: 10px;
}
.el-table >>> td,
.el-table >>> th {
  text-align: center;
}
.page {
  display: flex;
  justify-content: flex-end;
}
.topBoxButton {
  margin: 5px 0;
  display: flex;
  justify-content: flex-end;
}
.buttonBox {
  display: flex;
  justify-content: space-around;
}
.tableButtonBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tableButtonBox button {
  margin: 3px auto;
}
.lineUpBoxFotter {
  display: flex;
  justify-content: flex-end;
}
.buttonStyleBox {
  display: flex;
  justify-content: space-around;
}
.buttonStyleBox button {
  width: 80px;
}
.tableselectBox {
  margin: 5px 0;
}
.legStyle {
  margin: 14px 0;
}
</style>
