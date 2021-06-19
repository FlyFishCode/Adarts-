<template>
  <div>
    <el-row class="center-Row">
      <el-col class="label-g" :span="4">{{ $t("all.tip1") }}</el-col>
      <el-col :span="20" class="textClass">{{ Stage.formList.competition }}</el-col>
    </el-row>
    <el-row class="center-Row">
      <el-col class="label-g" :span="4">{{ $t("all.tip51") }}</el-col>
      <el-col :span="20" class="textClass">{{ Stage.formList.category }}</el-col>
    </el-row>
    <el-row class="center-Row">
      <el-col class="label-g" :span="4">{{ $t("all.tip52") }}</el-col>
      <el-col :span="20" class="textClass">{{ Stage.formList.division }}</el-col>
    </el-row>
    <el-row class="center-Row">
      <el-col class="label-g" :span="4">{{ $t("all.tip21") }}</el-col>
      <el-col :span="20" class="textClass">{{ Stage.formList.stage }}</el-col>
    </el-row>
    <div>
      <el-row class="rowTitle">
        <el-col :span="23">{{ $t("all.tip276") }}</el-col>
        <el-col v-if="hasData" :span="1">
          <el-button size="small" type="danger" @click="deleteMatchtable">{{ $t("all.tip130") }}</el-button>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">{{ $t("all.tip270") }}</el-col>
        <el-col :span="4">
          <el-select v-model="Stage.MatchTableOption.matchTable" :disabled="hasData" :placeholder="$t('all.tip516')">
            <el-option :value="1" :label="$t('all.tip277')"></el-option>
            <!-- <el-option :value="2" :label="$t('all.tip449')"></el-option> -->
            <!-- <el-option :value="3" :label="$t('all.tip490')"></el-option> -->
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model.number="Stage.MatchTableOption.round" :disabled="hasData" clearable :placeholder="$t('all.tip38')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">{{ $t("all.tip278") }}</el-col>
        <el-col :span="4">
          <el-select v-model="cycleType" :placeholder="$t('all.tip516')" :disabled="hasData">
            <el-option :value="1" :label="$t('all.tip484')"></el-option>
            <el-option :value="2" :label="$t('all.tip485')"></el-option>
            <el-option :value="3" :label="$t('all.ti102')"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model.number="cycle" clearable :disabled="hasData" :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col class="label-g" :span="4">{{ $t("all.tip279") }}</el-col>
        <el-col :span="4">
          <el-select v-model="siteType" :disabled="hasData" :placeholder="$t('all.tip516')">
            <el-option :value="1" :label="$t('all.tip519')"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model.number="Stage.MatchTableOption.site" :disabled="hasData" clearable :placeholder="$t('all.tip38')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">{{ $t("all.tip281") }}</el-col>
        <el-col :span="4">
          <el-select v-model="dayType" :placeholder="$t('all.tip516')" :disabled="hasData">
            <el-option :value="1" :label="$t('all.tip487')"></el-option>
            <el-option :value="2" :label="$t('all.tip488')"></el-option>
            <el-option :value="3" :label="$t('all.tip0')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="4">{{ $t("all.tip282") }}</el-col>
        <el-col :span="4">
          <el-select v-model="Stage.MatchTableOption.holiday" :placeholder="$t('all.tip516')" :disabled="hasData">
            <el-option :value="1" :label="$t('all.tip87')"></el-option>
            <el-option :value="2" :label="$t('all.tip86')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">{{ $t("all.tip283") }}</el-col>
        <el-col :span="2" class="lineClass">
          <el-checkbox v-model="Stage.MatchTableOption.isSun" :disabled="hasData">{{ $t("all.tip302") }}</el-checkbox>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-checkbox v-model="Stage.MatchTableOption.isMon" :disabled="hasData">{{ $t("all.tip303") }}</el-checkbox>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-checkbox v-model="Stage.MatchTableOption.isTue" :disabled="hasData">{{ $t("all.tip304") }}</el-checkbox>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-checkbox v-model="Stage.MatchTableOption.isWed" :disabled="hasData">{{ $t("all.tip305") }}</el-checkbox>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-checkbox v-model="Stage.MatchTableOption.isThu" :disabled="hasData">{{ $t("all.tip306") }}</el-checkbox>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-checkbox v-model="Stage.MatchTableOption.isFri" :disabled="hasData">{{ $t("all.tip307") }}</el-checkbox>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-checkbox v-model="Stage.MatchTableOption.isSat" :disabled="hasData">{{ $t("all.tip308") }}</el-checkbox>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">{{ $t("all.tip284") }}</el-col>
        <el-col class="label-g" :span="1">{{ $t("all.tip285") }}</el-col>
        <el-col :span="2">
          <el-select v-model="Stage.MatchTableOption.hour" :placeholder="$t('all.tip516')" :disabled="hasData">
            <el-option v-for="item in HourArr" :key="item.index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="1">{{ $t("all.tip286") }}</el-col>
        <el-col :span="2">
          <el-select v-model="Stage.MatchTableOption.minute" :placeholder="$t('all.tip516')" :disabled="hasData">
            <el-option v-for="item in MinuteArr" :key="item.index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="2">{{ $t("all.tip287") }}</el-col>
        <el-col :span="2">
          <el-input v-model.number="Stage.MatchTableOption.intervalTime" clearable :disabled="hasData" :placeholder="$t('all.tip38')"></el-input>
        </el-col>
        <el-col :span="2" v-if="!hasData" class="lineClass">
          <el-button size="mini" @click="create" type="primary">{{ $t("all.tip516") }}</el-button>
        </el-col>
      </el-row>
    </div>
    <div v-if="hasData" class="box">
      <div class="box">
        <el-row>
          <el-col class="title-g" :span="19">{{ $t("all.tip270") }}</el-col>
          <el-col :span="5" class="buttonBox">
            <!-- <div>
              <el-button size="mini" type="primary" @click="TemplatelViewClick">{{ $t("all.tip291") }}</el-button>
            </div>-->
            <div>
              <el-button size="mini" type="primary" @click="TimeTableClick">{{ $t("all.tip292") }}</el-button>
            </div>
            <div>
              <el-button size="mini" type="primary" @click="MatchTableClick">{{ $t("all.tip270") }}</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="isTimeTable">
          <el-col :span="1" class="tabsTitle Finished">{{ $t("all.tip333") }}</el-col>
          <el-col :span="1" class="tabsTitle InPlay">{{ $t("all.tip288") }}</el-col>
          <el-col :span="1" class="tabsTitle Ready">{{ $t("all.tip334") }}</el-col>
        </el-row>
        <el-row>
          <!--TemplatelView-->
          <div v-show="TemplatelView" class="table" id="tableHearder">
            <el-row>
              <div class="round ready">Round 1</div>
              <el-table :data="TemplatelReadyData" style="width: 100%">
                <el-table-column prop="matchName" :sortable="true" :label="$t('all.tip270')" min-width="5%"></el-table-column>
                <el-table-column :sortable="true" :label="$t('all.tip323')" min-width="5%">
                  <template slot-scope="scope">
                    <div class="tableLink" @click="Ready(scope, scope.$index, scope.row, 'R')">
                      <div>{{ scope.row.homeTeamName }}</div>
                      <div>{{ `(${scope.row.homePlayShopName})` }}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="homeFraction" label min-width="5%"></el-table-column>
                <el-table-column prop="visitingFraction" label min-width="5%"></el-table-column>
                <el-table-column :sortable="true" :label="$t('all.tip326')" min-width="5%">
                  <template slot-scope="scope">
                    <div class="tableLink" @click="Ready(scope, scope.$index, scope.row, 'R')">
                      <div>{{ scope.row.visitingTeamName }}</div>
                      <div>{{ `(${scope.row.visitingPlayShopName})` }}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="leaguePeriod" :sortable="true" :label="$t('all.tip7')" min-width="5%"></el-table-column>
              </el-table>
            </el-row>
            <el-row>
              <div class="round inPlay">Round 2</div>
              <el-table :data="TemplatelInPlayData" style="width: 100%">
                <el-table-column prop="matchName" :sortable="true" :label="$t('all.tip270')" min-width="5%"></el-table-column>
                <el-table-column prop="code" :sortable="true" :label="$t('all.tip323')" min-width="5%">
                  <template slot-scope="scope">
                    <div class="tableLink" @click="InPlay(scope, scope.$index, scope.row, 'I')">
                      <div>{{ scope.row.homeTeamName }}</div>
                      <div>{{ `(${scope.row.homePlayShopName})` }}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="homeFraction" label min-width="5%"></el-table-column>
                <el-table-column prop="visitingFraction" label min-width="5%"></el-table-column>
                <el-table-column :sortable="true" :label="$t('all.tip326')" min-width="5%">
                  <template slot-scope="scope">
                    <div class="tableLink" @click="InPlay(scope, scope.$index, scope.row, 'I')">
                      <div>{{ scope.row.homeTeamName }}</div>
                      <div>{{ `(${scope.row.homePlayShopName})` }}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="leaguePeriod" :sortable="true" :label="$t('all.tip7')" min-width="5%"></el-table-column>
              </el-table>
            </el-row>
            <el-row>
              <div class="round finished">Round 3</div>
              <el-table :data="TemplatelFinishedData" style="width: 100%">
                <el-table-column prop="matchName" :sortable="true" :label="$t('all.tip270')" min-width="5%"></el-table-column>
                <el-table-column :sortable="true" :label="$t('all.tip323')" min-width="5%">
                  <template slot-scope="scope">
                    <div class="tableLink" @click="Finished(scope, scope.$index, scope.row, 'F')">
                      <div>{{ scope.row.homeTeamName }}</div>
                      <div>{{ `(${scope.row.homePlayShopName})` }}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="homeFraction" label min-width="5%"></el-table-column>
                <el-table-column prop="visitingFraction" label min-width="5%"></el-table-column>
                <el-table-column :sortable="true" :label="$t('all.tip326')" min-width="5%">
                  <template slot-scope="scope">
                    <div class="tableLink" @click="Finished(scope, scope.$index, scope.row, 'F')">
                      <div>{{ scope.row.homeTeamName }}</div>
                      <div>{{ `(${scope.row.homePlayShopName})` }}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="leaguePeriod" :sortable="true" :label="$t('all.tip7')" min-width="5%"></el-table-column>
              </el-table>
            </el-row>
          </div>
          <!--TimeTable-->
          <div v-show="TimeTable" class="table">
            <el-table :data="TimeTableData" style="width: 100%">
              <el-table-column prop="time" :sortable="true" :label="$t('all.tip321')" width="100"></el-table-column>
              <el-table-column prop="id" :sortable="true" :label="$t('all.tip322')" min-width="6%"></el-table-column>
              <el-table-column :label="$t('all.tip323')">
                <el-table-column prop="homeMchine" :sortable="true" :label="$t('all.tip295')" min-width="9%"></el-table-column>
                <el-table-column prop="homeCombatShopName" :sortable="true" :label="$t('all.tip215')" min-width="9%"></el-table-column>
                <el-table-column :sortable="true" :label="$t('all.tip324')" min-width="9%">
                  <template slot-scope="scope">
                    <div class="tableLink" @click="showTopBox(scope.row)">{{ scope.row.homeTeamName }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="homeResult" :sortable="true" :label="$t('all.tip229')" min-width="6%">
                  <!-- <template slot-scope="scope">
                    <div v-if="scope.row.homeResult === 0">{{ $t("all.tip109") }}</div>
                    <div v-if="scope.row.homeResult === 1">{{ $t("all.tip107") }}</div>
                  </template> -->
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('all.tip326')">
                <el-table-column prop="visitingResult" :sortable="true" :label="$t('all.tip229')" min-width="6%">
                  <!-- <template slot-scope="scope">
                    <div v-if="scope.row.visitingResult === 0">{{ $t("all.tip109") }}</div>
                    <div v-if="scope.row.visitingResult === 1">{{ $t("all.tip107") }}</div>
                  </template> -->
                </el-table-column>
                <el-table-column :sortable="true" :label="$t('all.tip324')" min-width="9%">
                  <template slot-scope="scope">
                    <div class="tableLink" @click="showTopBox(scope.row)">{{ scope.row.visitingTeamName }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="visitingCombatShopName" :sortable="true" :label="$t('all.tip215')" min-width="9%"></el-table-column>
                <el-table-column prop="visitingMchine" :sortable="true" :label="$t('all.tip295')" min-width="9%"></el-table-column>
              </el-table-column>
              <el-table-column prop="winner" :label="$t('all.tip216')" min-width="6%"></el-table-column>
              <el-table-column :label="$t('all.tip578')" min-width="6%">
                <template slot-scope="scope">
                  {{ scope.row.type === 1 ? $t("all.tip40") : $t("all.tip41") }}
                </template>
              </el-table-column>
              <el-table-column prop="state" :sortable="true" :label="$t('all.tip25')" min-width="8%">
                <template slot-scope="scope">
                  <div v-if="scope.row.state === 1">{{ $t("all.tip289") }}</div>
                  <div v-if="scope.row.state === 2">{{ $t("all.tip288") }}</div>
                  <div v-if="scope.row.state === 3">{{ $t("all.tip333") }}</div>
                </template>
              </el-table-column>
              <el-table-column min-width="15%">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="lineUpViewClick(scope.row)">{{ $t("all.tip294") }}</el-button>
                  <el-button size="mini" type="primary" @click="result(scope.row.competitionId)">{{ $t("all.tip309") }}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- https://www.cnblogs.com/layaling/p/10962858.html 查看循环列表-->
          <!--MatchTableView-->
          <div v-show="MatchTableView" class="matchTableBox">
            <div v-for="(item, itemIndex) in MatchTableData" :key="itemIndex">
              <el-table border :data="item">
                <!-- X 轴展示客队 -->
                <!-- Y 轴展示主队 -->
                <el-table-column v-for="(header, index) in tableHeader" :key="index" :property="String(header.id)" :label="header.teamName" min-width="110px">
                  <template slot-scope="scope">
                    <template v-if="index === 0">
                      <div>{{ scope.row.teamName }}</div>
                    </template>
                    <template v-if="index !== 0">
                      <div>{{ showData(index, scope.$index + 1, itemIndex).confrontationDate.split(" ")[0] }}</div>
                      <div>{{ showData(index, scope.$index + 1, itemIndex).homeTeamName }}</div>
                      <div>{{ showData(index, scope.$index + 1, itemIndex).visitingTeamName }}</div>
                      <div>{{ showData(index, scope.$index + 1, itemIndex).week }}</div>
                      <div>
                        <el-button v-if="showData(index, scope.$index + 1, itemIndex).state === 1" size="mini" @click="showTopBox(showData(index, scope.$index + 1, itemIndex))">{{
                          $t("all.tip334")
                        }}</el-button>
                        <el-button v-if="showData(index, scope.$index + 1, itemIndex).state === 2" size="mini" type="primary" @click="showTopBox(showData(index, scope.$index + 1, itemIndex))">{{
                          $t("all.tip288")
                        }}</el-button>
                        <el-button v-if="showData(index, scope.$index + 1, itemIndex).state === 3" size="mini" type="danger" @click="showTopBox(showData(index, scope.$index + 1, itemIndex))">{{
                          $t("all.tip333")
                        }}</el-button>
                      </div>
                    </template>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-row>
      </div>
    </div>
    <div>
      <el-dialog :title="$t('all.tip234')" :visible.sync="lineUpTopBoxVisible" top="5vh">
        <el-row class="center-Row">
          <el-col class="label-g" :span="2">{{ $t("all.tip235") }}</el-col>
          <el-col :span="4" class="lineClass">{{ this.lineUpTopBoxDetialData.date }}</el-col>
          <el-col class="label-g" :span="3">{{ $t("all.tip622") }}</el-col>
          <el-col :span="4" class="lineClass">{{ this.lineUpTopBoxDetialData.deadlineTime }}</el-col>
          <el-col class="label-g" :span="2">{{ $t("all.tip25") }}</el-col>
          <el-col :span="2" class="lineClass">
            <div v-if="this.lineUpTopBoxDetialData.HomeType === 0">{{ $t("all.tip329") }}</div>
            <div v-if="this.lineUpTopBoxDetialData.HomeType === 1">{{ $t("all.tip330") }}</div>
            <div v-if="this.lineUpTopBoxDetialData.HomeType === 2">{{ $t("all.tip328") }}</div>
          </el-col>
          <el-col :span="7" class="lineClass">
            <div v-if="this.lineUpTopBoxDetialData.AwayType === 0">{{ $t("all.tip329") }}</div>
            <div v-if="this.lineUpTopBoxDetialData.AwayType === 1">{{ $t("all.tip330") }}</div>
            <div v-if="this.lineUpTopBoxDetialData.AwayType === 2">{{ $t("all.tip328") }}</div>
          </el-col>
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
            <el-table-column :label="$t('all.tip323') + ' ' + '【' + this.lineUpTopBoxDetialData.homeTeam + '】'" min-width="8%">
              <template slot-scope="scope">
                <div v-for="(leg, index) in scope.row.legGameList" :key="index" class="legStyle">
                  <div v-for="(item, jndex) in new Array(scope.row.MaxPlayer).fill(scope.row.MaxPlayer)" :key="jndex">
                    <!-- // leg 每一leg -->
                    <div class="tableselectBox">
                      <el-select v-model="leg.playerList[jndex].homePlayerId" @change="HomePlayerSelect($event, scope, index, jndex, 1)" :placeholder="$t('all.tip516')">
                        <el-option
                          v-for="item in homeTeamPlayers"
                          :key="item.jndex"
                          :label="item.playerGender === 1 ? item.playerName + '(' + $t('all.tip209') + ')' : item.playerName + '(' + $t('all.tip210') + ')'"
                          :value="item.playerId"
                        >
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
            <el-table-column :label="$t('all.tip326') + ' ' + '【' + this.lineUpTopBoxDetialData.awayTeam + '】'" min-width="8%">
              <template slot-scope="scope">
                <div v-for="(leg, index) in scope.row.legGameList" :key="index" class="legStyle">
                  <div v-for="(item, jndex) in new Array(scope.row.MaxPlayer).fill(scope.row.MaxPlayer)" :key="jndex">
                    <!-- // leg 每一leg -->
                    <div class="tableselectBox">
                      <el-select v-model="leg.playerList[jndex].visitingPlayerId" @change="HomePlayerSelect($event, scope, index, jndex, 2)" :placeholder="$t('all.tip516')">
                        <el-option
                          v-for="item in awayTeamPlayers"
                          :key="item.jndex"
                          :label="item.playerGender === 1 ? item.playerName + '(' + $t('all.tip209') + ')' : item.playerName + '(' + $t('all.tip210') + ')'"
                          :value="item.playerId"
                        >
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
    <div id="topBox">
      <el-dialog :title="$t('all.tip39')" :visible.sync="ModularVisible">
        <el-row class="center-Row">
          <el-col class="label-g" :span="4">{{ $t("all.tip5") }}</el-col>
          <el-col :span="4">
            <el-select v-model="LeagueMgmtVO.DialogMoudleName" :placeholder="$t('all.tip516')">
              <el-option value="1" :label="$t('all.tip0')"></el-option>
              <el-option value="2" :label="$t('all.tip42')"></el-option>
              <el-option value="3" :label="$t('all.tip43')"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <div id="topBox">
      <el-dialog :title="$t('all.tip273')" :visible.sync="MatchingTableTopBox">
        <div class="dialogTable">
          <el-table :data="MatchingTableList" border style="width: 100%" :span-method="arraySpanMethod">
            <el-table-column prop="photo" :label="$t('all.tip323')" min-width="5%">
              <el-table-column min-width="6%">
                <template slot-scope="scope">
                  <div v-if="scope.row.photo">
                    <div class="formImgBox">
                      <img v-if="scope.row.homeImg" :src="scope.row.homeImg" alt />
                      <img v-else src="../../../assets/img/team.jpg" />
                    </div>
                    <div>{{ scope.row.teamName }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column min-width="6%">
                <template slot-scope="scope">
                  <div v-if="scope.row.homelist">
                    <div v-for="(item, index) in scope.row.homelist" :key="index">{{ item }}</div>
                  </div>
                  <!--  队长名 -->
                  <div v-if="scope.row.homeCaptainName">{{ scope.row.homeCaptainName }}</div>
                  <!--  出席 -->
                  <div v-if="scope.row.button === '1'">
                    <el-button size="mini" type="danger" @click="isAttend(scope.row.id, 1)">{{ $t("all.tip296") }}</el-button>
                  </div>
                  <!--  比赛店铺 -->
                  <div v-if="scope.row.select === '1'" id="divBoxWidth">
                    <el-select v-model="scope.row.homePlayShopId">
                      <el-option v-for="item in ShopList" :key="item.shopId" :label="item.shopName" :value="item.shopId"></el-option>
                    </el-select>
                  </div>
                  <!--  机器 -->
                  <div v-if="scope.row.homeMachine">{{ scope.row.homeMachine }}</div>
                  <!--  强制出席人数 -->
                  <div v-if="scope.row.homeForceAttend || scope.row.homeForceAttend === 0">{{ scope.row.homeForceAttend }}</div>
                  <!--  更改参赛者 -->
                  <div v-if="scope.row.homePlayerChange">{{ scope.row.homePlayerChange }}</div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('all.tip42')" min-width="10%">
              <template slot-scope="scope">
                <div v-if="scope.row.type">
                  {{ `${$t("all.tip578")}：` }}<span>{{ scope.row.type === 1 ? $t("all.tip40") : $t("all.tip41") }}</span>
                </div>
                <div v-if="scope.row.title">
                  <div v-for="item in scope.row.title" :key="item.index">{{ item }}</div>
                </div>
                <div v-else>{{ $t(scope.row.label) }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="description" :label="$t('all.tip326')" min-width="6%">
              <el-table-column min-width="6%">
                <template slot-scope="scope">
                  <div v-if="scope.row.awaylist">
                    <div v-for="(item, index) in scope.row.awaylist" :key="index">{{ item }}</div>
                  </div>
                  <!--  队长名 -->
                  <div v-if="scope.row.awayCaptainName">{{ scope.row.awayCaptainName }}</div>
                  <!--  出席 -->
                  <div v-if="scope.row.button === '1'">
                    <el-button size="mini" type="danger" @click="isAttend(scope.row.id, 2)">{{ $t("all.tip296") }}</el-button>
                  </div>
                  <!--  比赛店铺 -->
                  <div v-if="scope.row.select === '1'" id="divBoxWidth">
                    <el-select v-model="scope.row.awayPlayShopId">
                      <el-option v-for="item in ShopList" :key="item.shopId" :label="item.shopName" :value="item.shopId"></el-option>
                    </el-select>
                  </div>
                  <!--  机器 -->
                  <div v-if="scope.row.awayMachine">{{ scope.row.awayMachine }}</div>
                  <!--  强制出席人数 -->
                  <div v-if="scope.row.awayForceAttend || scope.row.awayForceAttend === 0">{{ scope.row.awayForceAttend }}</div>
                  <!--  更改参赛者 -->
                  <div v-if="scope.row.awayPlayerChange">{{ scope.row.awayPlayerChange }}</div>
                </template>
              </el-table-column>
              <el-table-column min-width="6%">
                <template slot-scope="scope">
                  <div v-if="scope.row.photo">
                    <div class="formImgBox">
                      <img v-if="scope.row.awayImg" :src="scope.row.awayImg" alt />
                      <img v-else src="../../../assets/img/team.jpg" />
                    </div>
                    <div>{{ scope.row.awayName }}</div>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <el-row>
            <el-col class="label-g" :span="4">{{ $t("all.tip299") }}</el-col>
            <el-col :span="6" class="timeStyle">
              <el-date-picker v-model="matchTableTime" type="datetime" :placeholder="$t('all.tip516')" :picker-options="pickerOptions" default-time="00:00:00"></el-date-picker>
            </el-col>
            <el-col :span="4" class="button">
              <el-button size="mini" type="success" @click="save">{{ $t("all.tip136") }}</el-button>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
    </div>
    <!--  弹框查看比赛已开始 -->
    <div id="topBox">
      <el-dialog :title="$t('all.tip273')" :visible.sync="MatchingTable">
        <el-table :data="MatchingTableData" border style="width: 100%" :span-method="arraySpanMethod">
          <el-table-column prop="photo" :label="$t('all.tip323')" min-width="5%">
            <el-table-column min-width="6%">
              <template slot-scope="scope">
                <div v-if="scope.row.photo">
                  <div class="formImgBox">
                    <img v-if="scope.row.homeImg" :src="scope.row.homeImg" alt />
                    <img v-else src="../../../assets/img/team.jpg" />
                  </div>
                  <div>{{ scope.row.teamName }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column min-width="6%">
              <template slot-scope="scope">
                <div v-if="scope.row.homelist">
                  <div v-for="(item, index) in scope.row.homelist" :key="index">{{ item }}</div>
                </div>
                <!--  队长名 -->
                <div v-if="scope.row.homeCaptainName">{{ scope.row.homeCaptainName }}</div>
                <!--  出席 -->
                <div v-if="scope.row.button === '1'">
                  <el-button size="mini" type="danger" disabled>{{ $t("all.tip296") }}</el-button>
                </div>
                <!--  比赛店铺 -->
                <div v-if="scope.row.select === '1'" id="divBoxWidth">
                  <el-select v-model="scope.row.homePlayShopId" disabled>
                    <el-option v-for="item in ShopList" :key="item.shopId" :label="item.shopName" :value="item.shopId"></el-option>
                  </el-select>
                </div>
                <!--  机器 -->
                <div v-if="scope.row.homeMachine">{{ scope.row.homeMachine }}</div>
                <!--  强制出席人数 -->
                <div v-if="scope.row.homeForceAttend || scope.row.homeForceAttend === 0">{{ scope.row.homeForceAttend }}</div>
                <!--  更改参赛者 -->
                <div v-if="scope.row.homePlayerChange">{{ scope.row.homePlayerChange }}</div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column :label="$t('all.tip42')" min-width="10%">
            <template slot-scope="scope">
              <div v-if="scope.row.type">
                {{ `${$t("all.tip578")}：` }}<span>{{ scope.row.type === 1 ? $t("all.tip40") : $t("all.tip41") }}</span>
              </div>
              <div v-if="scope.row.title">
                <div v-for="item in scope.row.title" :key="item.index">{{ item }}</div>
              </div>
              <div v-else>{{ $t(scope.row.label) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="description" :label="$t('all.tip326')" min-width="6%">
            <el-table-column min-width="6%">
              <template slot-scope="scope">
                <div v-if="scope.row.awaylist">
                  <div v-for="(item, index) in scope.row.awaylist" :key="index">{{ item }}</div>
                </div>
                <!--  队长名 -->
                <div v-if="scope.row.awayCaptainName">{{ scope.row.awayCaptainName }}</div>
                <!--  出席 -->
                <div v-if="scope.row.button === '1'">
                  <el-button size="mini" type="danger" disabled>{{ $t("all.tip296") }}</el-button>
                </div>
                <!--  比赛店铺 -->
                <div v-if="scope.row.select === '1'" id="divBoxWidth">
                  <el-select v-model="scope.row.awayPlayShopId" disabled>
                    <el-option v-for="item in ShopList" :key="item.shopId" :label="item.shopName" :value="item.shopId"></el-option>
                  </el-select>
                </div>
                <!--  机器 -->
                <div v-if="scope.row.awayMachine">{{ scope.row.awayMachine }}</div>
                <!--  强制出席人数 -->
                <div v-if="scope.row.awayForceAttend || scope.row.awayForceAttend === 0">{{ scope.row.awayForceAttend }}</div>
                <!--  更改参赛者 -->
                <div v-if="scope.row.awayPlayerChange">{{ scope.row.awayPlayerChange }}</div>
              </template>
            </el-table-column>
            <el-table-column min-width="6%">
              <template slot-scope="scope">
                <div v-if="scope.row.photo">
                  <div class="formImgBox">
                    <img v-if="scope.row.awayImg" :src="scope.row.awayImg" alt />
                    <img v-else src="../../../assets/img/team.jpg" />
                  </div>
                  <div>{{ scope.row.awayName }}</div>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col class="label-g" :span="4">{{ $t("all.tip299") }}</el-col>
          <el-col :span="6" class="timeStyle">
            <el-date-picker v-model="matchTableTime" disabled type="datetime"></el-date-picker>
          </el-col>
          <el-col :span="4" class="button">
            <el-button size="mini" type="success" disabled>{{ $t("all.tip136") }}</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <!-- 错误提示弹框 -->
    <div>
      <el-dialog title="提示" :visible.sync="errorDialogVisible" width="30%" center>
        <span>{{ $t("all.tip628") }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="errorDialogVisible = false">{{ $t("all.tip30") }}</el-button>
          <el-button size="small" type="primary" @click="handleErrorOk">{{ $t("all.tip47") }}</el-button>
        </span>
      </el-dialog>
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
          // 若是取中间段，使用 ||
          const date = new Date(vm.MatchingTableList[0].startTime).getTime();
          return time.getTime() < date;
        }
      },
      TemplatelView: false,
      MatchTableView: false,
      TimeTable: true,
      ModularVisible: false,
      MatchingTableTopBox: false,
      MatchingTable: false,
      lineUpTopBoxVisible: false,
      errorDialogVisible: false,
      hasData: false,
      isTimeTable: true,
      homeAttend: false,
      awayAttend: false,
      matchTableId: "",
      LeagueMgmtVO: {},
      lineUpTopBoxDetialData: {},
      lineUpTopBoxTableList: [],
      matchTableTime: "",
      timeDate: "",
      errorMsg: "",
      MatchingTableList: [],
      MatchingTableData: [],
      lineUpId: 0,
      cycleType: 1,
      cycle: 1,
      siteType: 1,
      dayType: 1,
      Stage: {
        formList: {
          competition: "",
          category: "",
          division: "",
          stage: ""
        },
        MatchTableOption: {
          stageId: "",
          matchTable: 1,
          round: 1,
          cycle: 1,
          site: 1,
          holiday: 1,
          isMon: true,
          isTue: true,
          isWed: true,
          isThu: true,
          isFri: true,
          isSat: "",
          isSun: "",
          hour: 1,
          minute: 0,
          intervalTime: 60
        }
      },
      activeName: "",
      HourArr: [],
      MinuteArr: [],
      tableHeader: [{ index: 0 }],
      allMatchTableData: [],
      TemplatelReadyData: [],
      TemplatelInPlayData: [],
      TemplatelFinishedData: [],
      TimeTableData: [],
      MatchTableData: [],
      homeTeamPlayers: [],
      awayTeamPlayers: [],
      ShopList: [],
      handleData: []
    };
  },
  watch: {
    // eslint-disable-next-line func-names
    dayType: {
      // deep: true,
      handler(newValue) {
        if (newValue === 1) {
          this.Stage.MatchTableOption.isMon = true;
          this.Stage.MatchTableOption.isTue = true;
          this.Stage.MatchTableOption.isWed = true;
          this.Stage.MatchTableOption.isThu = true;
          this.Stage.MatchTableOption.isFri = true;
          this.Stage.MatchTableOption.isSat = false;
          this.Stage.MatchTableOption.isSun = false;
          // this.datType = true;
        }
        if (newValue === 2) {
          this.Stage.MatchTableOption.isMon = false;
          this.Stage.MatchTableOption.isTue = false;
          this.Stage.MatchTableOption.isWed = false;
          this.Stage.MatchTableOption.isThu = false;
          this.Stage.MatchTableOption.isFri = false;
          this.Stage.MatchTableOption.isSat = true;
          this.Stage.MatchTableOption.isSun = true;
          // this.datType = true;
        }
        if (newValue === 3) {
          this.Stage.MatchTableOption.isMon = true;
          this.Stage.MatchTableOption.isTue = true;
          this.Stage.MatchTableOption.isWed = true;
          this.Stage.MatchTableOption.isThu = true;
          this.Stage.MatchTableOption.isFri = true;
          this.Stage.MatchTableOption.isSat = true;
          this.Stage.MatchTableOption.isSun = true;
        }
      }
    }
  },
  mounted() {
    if (this.$route.query.data) {
      const data = JSON.parse(this.$route.query.data);
      this.Stage.formList.competition = data.competitionName;
      this.Stage.formList.category = data.categoryName;
      this.Stage.formList.division = data.divisionName;
      this.Stage.formList.stage = data.stageName;
      this.Stage.MatchTableOption.stageId = data.stageId;
      this.matchTableId = data.matchTableId;
      // 从时间表进来状态是3（结束），从对阵表进来是1（已创建）
      // this.hasData = data.state === 1 || data.state === 3;
      if (this.matchTableId) {
        this.hasData = true;
        this.getTimeTableData(this.matchTableId);
        this.getMatchTableData(this.matchTableId);
        this.getMatchTableOption(this.matchTableId);
        // this.getTemplatelTableData(this.matchTableId);
      }
      this.getShopList();
      this.setDefaultData();
    }
  },
  methods: {
    deleteMatchtable() {
      this.$axios.post(`/deleteagainst?confrontationId=${this.matchTableId}`).then(res => {
        if (res.data.code === 1000) {
          this.getTimeTableData(this.matchTableId);
          // this.getMatchTableData(this.matchTableId);
          this.handleData = [];
          this.MatchTableData = [];
          this.allMatchTableData = [];
          this.tableHeader = [{ index: 0 }];
          this.hasData = false;
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    getMatchTableOption(id) {
      const vm = this;
      this.$axios.post(`/matchTableOption?confrontationId=${id}`).then(res => {
        const data = res.data.data;
        if (data) {
          vm.Stage.MatchTableOption.matchTable = data.selectMatchTable;
          vm.Stage.MatchTableOption.round = data.round;
          vm.Stage.MatchTableOption.cycleType = data.round;
          // vm.Stage.MatchTableOption.cycleType = data.round;
          if (data.site < 7) {
            vm.Stage.MatchTableOption.cycleType = 1;
          }
          if (data.site > 7 && data.site < 30) {
            vm.Stage.MatchTableOption.cycleType = 2;
          }
          vm.Stage.MatchTableOption.site = data.site;
          vm.Stage.MatchTableOption.isFri = Boolean(data.isFri);
          vm.Stage.MatchTableOption.isMon = Boolean(data.isMon);
          vm.Stage.MatchTableOption.isSat = Boolean(data.isSat);
          vm.Stage.MatchTableOption.isSun = Boolean(data.isSun);
          vm.Stage.MatchTableOption.isThu = Boolean(data.isThu);
          vm.Stage.MatchTableOption.isTue = Boolean(data.isTue);
          vm.Stage.MatchTableOption.isWed = Boolean(data.isWed);
          vm.Stage.MatchTableOption.hour = data.hour;
          vm.Stage.MatchTableOption.minute = data.minute;
          vm.Stage.MatchTableOption.intervalTime = data.intervalTime;
        }
      });
    },
    isAttend(matchId, id) {
      if (id === 1) {
        this.homeAttend = !this.homeAttend;
        if (this.homeAttend) {
          this.$message(this.$t("all.tip591"));
        } else {
          this.$message(this.$t("all.tip592"));
        }
      } else {
        this.awayAttend = !this.awayAttend;
        if (this.awayAttend) {
          this.$message(this.$t("all.tip591"));
        } else {
          this.$message(this.$t("all.tip592"));
        }
      }
      const data = {
        confrontationInfoId: matchId,
        homeAttend: Number(this.homeAttend),
        visitingAttend: Number(this.awayAttend)
      };
      this.$axios.post("/updateAttend", this.$qs.stringify(data)).then(res => {
        console.log(res);
      });
    },
    getShopList() {
      const userId = sessionStorage.getItem("LeagueUserId");
      this.$axios.post("/getshop", this.$qs.stringify({ userId })).then(res => {
        this.ShopList = res.data.data.list;
      });
    },
    getMatchTableHerder(data) {
      const arr = [];
      data.forEach(i => {
        arr.push({
          id: i.visitingTeamId,
          label: i.visitingTeamName
        });
      });
      return arr;
    },
    setDefaultData() {
      for (let i = 1; i < 25; i += 1) {
        this.HourArr.push({ label: String(i), value: i });
      }
      for (let i = 0; i < 60; i += 1) {
        this.MinuteArr.push({ label: String(i), value: i });
      }
    },
    returnType(id) {
      let type = "";
      switch (id) {
        case 0:
          type = "all.tip44";
          break;
        case 1:
          type = "all.tip499";
          break;
        case 2:
          type = "all.tip500";
          break;
        case 3:
          type = "all.tip501";
          break;
        case 4:
          type = "all.tip502";
          break;
        case 5:
          type = "all.tip505";
          break;
        case 6:
          type = "all.tip506";
          break;
        case 7:
          type = "all.tip507";
          break;
        case 8:
          type = "all.tip508";
          break;
        case 9:
          type = "all.tip509";
          break;
        case 10:
          type = "all.tip177";
          break;
        case 11:
          type = "all.tip554";
          break;
        case 12:
          type = "all.tip555";
          break;
        case 13:
          type = "all.tip556";
          break;
        case 14:
          type = "all.tip557";
          break;
        case 20:
          type = "all.tip511";
          break;
        case 21:
          type = "all.tip510";
          break;
        case 22:
          type = "all.tip558";
          break;
        default:
          type = "CricketCount-up";
          break;
      }
      return type;
    },
    create() {
      const vm = this;
      let data = 0;
      this.changeType("toNumber");
      if (this.cycleType === 1) {
        data = 7;
      } else if (this.cycleType === 2) {
        data = 30;
      } else {
        data = 1;
      }
      this.Stage.MatchTableOption.cycle = this.cycle * data;
      this.$axios.post("/generateagainst", vm.Stage.MatchTableOption).then(res => {
        if (res.data.code === 1000) {
          vm.matchTableId = res.data.data;
          vm.getTimeTableData(res.data.data);
          vm.getMatchTableOption(res.data.data);
          vm.getMatchTableData(res.data.data);
          vm.hasData = true;
        }
        if (res.data.code === 1061) {
          this.errorMsg = res.data.msg;
          this.errorDialogVisible = true;
        }
        this.$message(res.data.msg);
        this.changeType("toBoolen");
      });
    },
    handleErrorOk() {
      this.errorDialogVisible = false;
      this.$router.push({
        path: "/assignedTeams",
        query: {
          stageId: ""
        }
      });
    },
    getTimeTableData(id) {
      this.$axios.get(`/matchTable/getTimeTableFightInfo?matchTableId=${id}`).then(res => {
        if (res.data.data) {
          this.TimeTableData = res.data.data;
        }
      });
    },
    getTemplatelTableData(id) {
      this.$axios.post(`/templateview?confrontationId=${id}`).then(res => {
        if (res.data.data) {
          this.TemplatelReadyData = res.data.data[0].list;
          this.TemplatelInPlayData = res.data.data[1].list;
          this.TemplatelFinishedData = res.data.data[2].list;
        }
      });
    },
    showData(x, y, index) {
      // 横坐标，纵坐标，第几个数组
      let obj = {};
      obj = this.allMatchTableData[index].find(i => i.x === x && i.y === y);
      if (obj) {
        return obj;
      }
      return {
        confrontationDate: "",
        homeTeamName: "",
        visitingTeamName: "",
        state: "",
        week: "",
        id: ""
      };
    },
    getMatchTableData(id) {
      const vm = this;
      this.$axios.get(`/matchTable/getMatchTableFightInfo?matchTableId=${id}`).then(res => {
        if (res.data.data) {
          // const homeObj = {};
          // const list = [];
          this.tableHeader.push(...res.data.data.positionList);
          res.data.data.loopSurfaceList.forEach(i => {
            const arr = Object.assign(i.matchTableList, []);
            // i.matchTableList.forEach(j => {
            //   if (!homeObj[j.visitingTeamId]) {
            //     homeObj[j.visitingTeamId] = true;
            //     list.push(j);
            //   }
            // });
            vm.MatchTableData.push(res.data.data.positionList);
            vm.allMatchTableData.push(arr);
          });
          // console.log(vm.allMatchTableData);
        }
      });
    },
    changeType(value) {
      if (value === "toNumber") {
        this.Stage.MatchTableOption.isMon = Number(this.Stage.MatchTableOption.isMon);
        this.Stage.MatchTableOption.isTue = Number(this.Stage.MatchTableOption.isTue);
        this.Stage.MatchTableOption.isWed = Number(this.Stage.MatchTableOption.isWed);
        this.Stage.MatchTableOption.isThu = Number(this.Stage.MatchTableOption.isThu);
        this.Stage.MatchTableOption.isFri = Number(this.Stage.MatchTableOption.isFri);
        this.Stage.MatchTableOption.isSat = Number(this.Stage.MatchTableOption.isSat);
        this.Stage.MatchTableOption.isSun = Number(this.Stage.MatchTableOption.isSun);
      }
      if (value === "toBoolen") {
        this.Stage.MatchTableOption.isMon = Boolean(this.Stage.MatchTableOption.isMon);
        this.Stage.MatchTableOption.isTue = Boolean(this.Stage.MatchTableOption.isTue);
        this.Stage.MatchTableOption.isWed = Boolean(this.Stage.MatchTableOption.isWed);
        this.Stage.MatchTableOption.isThu = Boolean(this.Stage.MatchTableOption.isThu);
        this.Stage.MatchTableOption.isFri = Boolean(this.Stage.MatchTableOption.isFri);
        this.Stage.MatchTableOption.isSat = Boolean(this.Stage.MatchTableOption.isSat);
        this.Stage.MatchTableOption.isSun = Boolean(this.Stage.MatchTableOption.isSun);
      }
    },
    TemplatelViewClick() {
      this.TemplatelView = true;
      this.isTimeTable = true;
      this.TimeTable = false;
      this.MatchTableView = false;
    },
    TimeTableClick() {
      this.TimeTable = true;
      this.MatchTableView = false;
      this.TemplatelView = false;
    },
    MatchTableClick() {
      this.MatchTableView = true;
      this.TimeTable = false;
      this.TemplatelView = false;
    },
    Finished(a, b, c, d) {
      console.log(a, b, c, d);
      this.MatchingTableTopBox = true;
    },
    InPlay(a, b, c, d) {
      console.log(a, b, c, d);
      this.MatchingTableTopBox = true;
    },
    Ready(a, b, c, d) {
      console.log(a, b, c, d);
      this.MatchingTableTopBox = true;
    },
    setStyle(value) {
      return {
        height: `${48 * value}px`,
        textAlign: "center",
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
      const LegAllSelect = [];
      const AllSetObj = [];
      const CurrentLegPlayerList = [];
      const allPlayerModeList = [];
      const LegObj = {};
      const vm = this;
      let obj = "homePlayerId";
      let RepeatIndex = -1;
      let fg = -1;
      let GenderNum = 0;
      if (type === 2) {
        obj = "visitingPlayerId";
      }
      vm.lineUpTopBoxTableList[currentSetIndex].legGameList.forEach(i => {
        i.playerList.forEach(e => {
          if (type === 1) {
            LegAllSelect.push(e.homePlayerId);
          } else {
            LegAllSelect.push(e.visitingPlayerId);
          }
        });
      });
      // 当前leg人员重复校验
      vm.lineUpTopBoxTableList[currentSetIndex].legGameList[LegIndex].playerList.forEach(i => {
        CurrentLegPlayerList.push({
          homePlayer: i.homePlayerId,
          awayPlayer: i.visitingPlayerId
        });
      });
      CurrentLegPlayerList.forEach((i, index) => {
        CurrentLegPlayerList.forEach((j, jndex) => {
          if (index !== jndex && ((i.homePlayer && i.homePlayer === j.homePlayer) || (i.awayPlayer && i.awayPlayer === j.awayPlayer))) {
            RepeatIndex = index;
          }
        });
      });
      if (RepeatIndex !== -1) {
        vm.lineUpTopBoxTableList[currentSetIndex].legGameList[LegIndex].playerList[PlayerIndex][obj] = "";
        vm.$message(vm.$t("all.tip584"));
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
            vm.lineUpTopBoxTableList[currentSetIndex].legGameList[LegIndex].playerList[PlayerIndex][obj] = "";
            if (fg === 1) {
              vm.$message(vm.$t("all.tip583") + Num);
            } else if (fg === 0) {
              vm.$message(vm.$t("all.tip579") + Num);
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
            if (key && key !== "null" && value > vm.lineUpTopBoxTableList[currentSetIndex].entryTypeNum) {
              this.$message(this.$t("all.tip581") + vm.lineUpTopBoxTableList[currentSetIndex].entryTypeNum);
              vm.lineUpTopBoxTableList[currentSetIndex].legGameList[LegIndex].playerList[PlayerIndex][obj] = "";
              return;
            }
          }
        }
        // 参加模式的最大数校验，玩家参加同一SET算一次
        if (vm.lineUpTopBoxTableList[currentSetIndex].entryType === 1) {
          let flag = false;
          const finalList = [];
          for (let i = 0; i < AllSetObj.length; i += 1) {
            if (AllSetObj[i][obj]) {
              const temp = {
                setId: AllSetObj[i].setId,
                modeType: AllSetObj[i].mode,
                playerId: AllSetObj[i][obj]
              };
              flag = allPlayerModeList.every(e => e.setId !== AllSetObj[i].setId || e.playerId !== AllSetObj[i][obj]);
              if (flag) {
                allPlayerModeList.push(temp);
              }
            }
          }
          allPlayerModeList.forEach(i => {
            const tempObj = {
              modeType: i.modeType,
              playerId: i.playerId,
              count: 1
            };
            if (finalList.length && finalList.find(f => i.playerId === f.playerId && i.modeType === f.modeType)) {
              finalList.find(f => i.playerId === f.playerId && i.modeType === f.modeType).count += 1;
            } else {
              finalList.push(tempObj);
            }
          });
          finalList.forEach(i => {
            if (i.count > vm.lineUpTopBoxTableList[currentSetIndex].entryTypeNum) {
              this.$message(this.$t("all.tip582") + vm.lineUpTopBoxTableList[currentSetIndex].entryTypeNum);
              vm.lineUpTopBoxTableList[currentSetIndex].legGameList[LegIndex].playerList[PlayerIndex][obj] = "";
              console.log(finalList);
            }
          });
        }
      }
      // 当前set人员不可以和上一set人员相同校验
      if (currentSetIndex && currentSetIndex !== this.lineUpTopBoxTableList.length - 1) {
        // 上一set
        this.lineUpTopBoxTableList[currentSetIndex - 1].legGameList.forEach(i => {
          i.playerList.forEach(j => {
            prePlayerList.push(j[obj]);
          });
        });
        // 当前set
        this.lineUpTopBoxTableList[currentSetIndex].legGameList.forEach(i => {
          i.playerList.forEach(j => {
            currentPlayerList.push(j[obj]);
          });
        });
        // 下一set
        this.lineUpTopBoxTableList[currentSetIndex + 1].legGameList.forEach(i => {
          i.playerList.forEach(j => {
            NextPlayerList.push(j[obj]);
          });
        });
        // 如果当前set 设置了，检查上下set玩家
        if (this.lineUpTopBoxTableList[currentSetIndex].memberLimit === 2) {
          for (let i = 0; i < currentPlayerList.length; i += 1) {
            const preId = prePlayerList.find(j => j === currentPlayerList[i]);
            if (preId) {
              this.$message(this.$t("all.tip580"));
              vm.lineUpTopBoxTableList[currentSetIndex].legGameList[LegIndex].playerList[PlayerIndex][obj] = "";
              break;
            }
            const NextId = NextPlayerList.find(j => j === currentPlayerList[i]);
            if (NextId) {
              this.$message(this.$t("all.tip110"));
              vm.lineUpTopBoxTableList[currentSetIndex].legGameList[LegIndex].playerList[PlayerIndex][obj] = "";
              break;
            }
          }
        }
        // 如果下一set设置了玩家，检查当前set与下一set玩家
        if (this.lineUpTopBoxTableList[currentSetIndex + 1].memberLimit === 2) {
          for (let i = 0; i < currentPlayerList.length; i += 1) {
            const NextId = NextPlayerList.find(j => j === currentPlayerList[i]);
            if (NextId) {
              this.$message(this.$t("all.tip110"));
              vm.lineUpTopBoxTableList[currentSetIndex].legGameList[LegIndex].playerList[PlayerIndex][obj] = "";
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
        deadlineTime: data.manageAbortTime,
        HomeType: data.homeManageStatus,
        AwayType: data.visitingManageStatus,
        homeTeam: data.homeTeamName,
        awayTeam: data.visitingTeamName
      };
      this.lineUpId = data.id;
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
                        homePlayerId: "",
                        visitingPlayerId: ""
                      });
                    }
                  }
                } else {
                  for (let jndex = 0; jndex < MaxPlayer; jndex += 1) {
                    j.playerList.push({
                      homePlayerId: "",
                      visitingPlayerId: ""
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
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (rowIndex > 0) {
        if (columnIndex === 0) {
          return [0, 0];
        }
        if (columnIndex === 1) {
          return [1, 2];
        }
        if (columnIndex === 3) {
          return [1, 2];
        }
        return [1, 1];
      }
      return [1, 1];
    },
    getIntoSet(id, type) {
      // id 状态  是否?提交
      // type 主队/客队
      const data = [];
      for (let i = 0; i < this.lineUpTopBoxTableList.length; i += 1) {
        for (let j = 0; j < this.lineUpTopBoxTableList[i].legGameList.length; j += 1) {
          const obj = {
            confrontationInfoId: "",
            legId: "",
            setId: "",
            status: "",
            playerList: []
          };
          for (let k = 0; k < this.lineUpTopBoxTableList[i].legGameList[j].playerList.length; k += 1) {
            let playerId = "";
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
      this.$axios.post("/matchTable/playerIntoLeg", data).then(res => {
        this.$message(res.data.msg);
        this.getTeamSatus();
      });
    },
    getTeamSatus() {
      this.$axios.get(`/matchTable/getTimeTableFightInfo?matchTableId=${this.matchTableId}`).then(res => {
        if (res.data.data) {
          this.TimeTableData = res.data.data;
          const obj = this.TimeTableData.find(i => i.id === this.lineUpId);
          this.lineUpTopBoxDetialData.HomeType = obj.homeManageStatus;
          this.lineUpTopBoxDetialData.AwayType = obj.visitingManageStatus;
        }
      });
    },
    result(id) {
      this.$router.push({
        name: "resultInformation",
        query: {
          id,
          name: "2"
        }
      });
    },
    showTopBox(data) {
      let type = 0;
      if (data.flag === 1 || data.state === 3) {
        this.MatchingTable = true;
        // 不可修改（已开始，已结束）
      } else {
        this.MatchingTableTopBox = true;
        type = 1;
        // 可以修改（已准备）
      }
      this.getHomeAndVisitingBeginINFo(data.id || data.confrontationInfoId, type);
    },
    save() {
      const data = {
        confInfoId: "",
        homeAttend: "",
        visitingAttend: "",
        homePlayShopId: "",
        visitingPlayShopId: "",
        confrontationDate: new Date(this.matchTableTime)
      };
      this.MatchingTableList.forEach(i => {
        if (i.id) {
          data.confInfoId = i.id;
        }
        if (i.id) {
          data.homeAttend = Number(this.homeAttend);
        }
        if (i.id) {
          data.visitingAttend = Number(this.awayAttend);
        }
        if (i.homePlayShopId) {
          data.homePlayShopId = i.homePlayShopId;
        }
        if (i.awayPlayShopId) {
          data.visitingPlayShopId = i.awayPlayShopId;
        }
      });
      this.$axios.post("/matchTable/updateFightInfo", data).then(res => {
        this.$message(res.data.msg);
        this.getMatchTableData(this.matchTableId);
        this.getTimeTableData(this.matchTableId);
      });
      this.MatchingTableTopBox = false;
    },
    getHomeAndVisitingBeginINFo(id, type) {
      const vm = this;
      let SRT = "";
      this.$axios.get(`/matchTable/getHomeAndVisitingFightINfo?confInfoId=${id}`).then(res => {
        if (res.data.data) {
          if (type) {
            SRT = "MatchingTableList";
            vm[SRT] = [];
          } else {
            SRT = "MatchingTableData";
            vm[SRT] = [];
          }
          for (let j = 0; j < 7; j += 1) {
            const obj = {};
            switch (j) {
              case 0:
                obj.id = id;
                obj.photo = true;
                obj.type = res.data.data[0].type;
                obj.title = ["Set Point", "Winning Point", "Penalty Point"];
                obj.homelist = [res.data.data[0].setPoint, res.data.data[0].winningPoint, res.data.data[0].penaltyPoint];
                obj.awaylist = [res.data.data[1].setPoint, res.data.data[1].winningPoint, res.data.data[1].penaltyPoint];
                obj.teamName = res.data.data[0].teamName;
                obj.awayName = res.data.data[1].teamName;
                obj.homeImg = res.data.data[0].teamImgUrl;
                obj.awayImg = res.data.data[1].teamImgUrl;
                vm.matchTableTime = res.data.data[0].gameDate;
                break;
              case 1:
                obj.label = "all.tip246";
                obj.homeCaptainName = res.data.data[0].captainName;
                obj.awayCaptainName = res.data.data[1].captainName;
                break;
              case 2:
                obj.label = "all.tip296";
                obj.button = "1";
                obj.id = res.data.data[0].id;
                break;
              case 3:
                obj.label = "all.tip215";
                obj.select = "1";
                obj.homePlayShopId = res.data.data[0].playShopId;
                obj.awayPlayShopId = res.data.data[1].playShopId;
                break;
              case 4:
                obj.label = "all.tip295";
                obj.homeMachine = res.data.data[0].machine;
                obj.awayMachine = res.data.data[1].machine;
                break;
              case 5:
                obj.label = "all.tip298";
                obj.homeForceAttend = res.data.data[0].useForceAttend;
                obj.awayForceAttend = res.data.data[1].useForceAttend;
                break;
              default:
                obj.label = "all.tip297";
                obj.homePlayerChange = `${res.data.data[0].playerChange}/${res.data.data[0].forceAttendNumber}`;
                obj.awayPlayerChange = `${res.data.data[1].playerChange}/${res.data.data[1].forceAttendNumber}`;
                break;
            }
            if (Object.keys(obj).length > 0) {
              vm[SRT].push(obj);
            }
          }
        } else {
          this.$message(res.data.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
.textClass {
  height: 40px;
  line-height: 40px;
}
.el-table >>> td,
.el-table >>> th {
  text-align: center;
}
.tabsTitle {
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #eee;
  margin: 0 5px;
}
.Finished {
  background: #f56c6c;
}
.InPlay {
  background: #409eff;
}
.Ready {
  color: black;
  border: 1px solid #000;
}
.buttonBox {
  background: #eee;
  display: flex;
  justify-content: space-around;
  height: 28px;
  line-height: 20px;
}
.rowTitle {
  height: 34px;
  line-height: 30px;
  background: #eee;
}
.tableselectBox {
  margin: 5px 0;
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
.tabelSort {
  display: flex;
  justify-content: space-around;
}
.formImgBox {
  width: 80px;
  margin: 0 auto;
}
#tableHearder .round {
  text-align: center;
  border: 1px solid #000;
}
#tableHearder .ready {
  background: #ffffff;
  color: #000;
}
#tableHearder .inPlay {
  background: #409eff;
  color: #ffffff;
}
#tableHearder .finished {
  background: #f56c6c;
  color: #ffffff;
}
.timeStyle {
  height: 40px;
  line-height: 40px;
}
.button {
  height: 40px;
  line-height: 40px;
}
.legStyle {
  margin: 14px 0;
}
</style>
