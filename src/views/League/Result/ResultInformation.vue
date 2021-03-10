<template>
  <div>
    <div class="search">
      <el-row class="center-Row">
        <el-col :span="3" class="label-g">{{ $t("all.tip3") }}</el-col>
        <el-col :span="3" :title="detail.competitionName" class="overFlowStyle lineClass">{{ detail.competitionName }}</el-col>
        <el-col :span="3" class="label-g">{{ $t("all.tip6") }}</el-col>
        <el-col :span="3" class="overFlowStyle lineClass">{{ detail.status === '1'?$t('all.tip26'):$t('all.tip27') }}</el-col>
        <el-col :span="3" class="label-g">{{ $t("all.tip4") }}</el-col>
        <el-col :span="9" class="overFlowStyle lineClass">{{ detail.area }}</el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col :span="3" class="label-g">{{ $t("all.tip5") }}</el-col>
        <el-col :span="3" class="overFlowStyle lineClass">{{ detail.type === 1?$t('all.tip40'):$t('all.tip41') }}</el-col>
        <el-col :span="3" class="label-g">{{ $t("all.tip7") }}</el-col>
        <el-col :span="3" class="overFlowStyle lineClass">{{ detail.competitionStartPeriod.split(' ')[0] }}-{{ detail.competitionEndPeriod.split(' ')[0] }}</el-col>
        <el-col :span="3" class="label-g">{{ $t("all.tip310") }}</el-col>
        <el-col :span="3" class="overFlowStyle lineClass">{{ detail.entryCount }}</el-col>
      </el-row>
    </div>

    <el-tabs v-model="activeName" type="card" :stretch="stretch" @tab-click="tabClick">
      <el-tab-pane :label="$t('all.tip214')" name="first">
        <el-row>
          <el-form label-width="145px">
            <el-col :span="8">
              <el-form-item :label="$t('all.tip51')">
                <el-select v-model="rankingVO.categoryId" :placeholder="$t('placeholder.select')" clearable @change="rankingCategoryChange">
                  <el-option v-for="item in categoryList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('all.tip52')">
                <el-select v-model="rankingVO.divisionId" :placeholder="$t('placeholder.select')" clearable @change="rankingDivisionChange">
                  <el-option v-for="item in divisionList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('all.tip21')">
                <el-select v-model="rankingVO.stageId" :placeholder="$t('placeholder.select')" clearable>
                  <el-option v-for="item in stageList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('all.tip71')">{{ rankingValue.rankingDecision === 1 ? $t("all.tip73") : $t("all.tip72") + $t("all.tip73") }}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('all.tip72')"
                >{{ this.$t("all.tip107") }}{{ rankingValue.winningPointWin + "," }}{{ this.$t("all.tip108") }}{{ rankingValue.winningPointDrawn + "," }}{{ this.$t("all.tip109")
                }}{{ rankingValue.winningPointLose + "," }}</el-form-item
              >
            </el-col>
            <el-col :span="8" class="lineClass">
              <el-button type="primary" size="mini" @click="getRankingList">{{ $t("form.SearchButton") }}</el-button>
            </el-col>
          </el-form>
        </el-row>
        <el-row>
          <div class="table">
            <el-table :data="rankingList" style="width: 100%">
              <el-table-column type="index" :label="$t('all.tip214')" width="80"></el-table-column>
              <el-table-column prop="teamName" :label="$t('all.tip534')" min-width="7%"></el-table-column>
              <el-table-column prop="rating" :label="$t('all.tip154')" min-width="7%"></el-table-column>
              <el-table-column prop="ppd" :label="$t('all.tip155')" min-width="6%"></el-table-column>
              <el-table-column prop="mpr" :label="$t('all.tip156')" min-width="6%"></el-table-column>
              <el-table-column :label="$t('all.tip365')">
                <el-table-column prop="matchTotal" :label="$t('all.tip34')" min-width="6%"></el-table-column>
                <el-table-column prop="matchWin" :label="$t('all.tip107')" min-width="6%"></el-table-column>
                <el-table-column prop="matchDrawn" :label="$t('all.tip108')" min-width="8%"></el-table-column>
                <el-table-column prop="matchLose" :label="$t('all.tip109')" min-width="6%"></el-table-column>
                <el-table-column prop="matchRatio" :label="$t('all.tip533')" min-width="6%"></el-table-column>
              </el-table-column>
              <el-table-column :label="$t('all.tip53')">
                <el-table-column prop="setTotal" :label="$t('all.tip34')" min-width="6%"></el-table-column>
                <el-table-column prop="setWin" :label="$t('all.tip107')" min-width="6%"></el-table-column>
                <el-table-column prop="setDrawn" :label="$t('all.tip108')" min-width="7%"></el-table-column>
                <el-table-column prop="setLose" :label="$t('all.tip109')" min-width="6%"></el-table-column>
                <el-table-column prop="setRatio" :label="$t('all.tip533')" min-width="6%"></el-table-column>
              </el-table-column>
              <el-table-column :label="$t('all.tip54')">
                <el-table-column prop="legTotal" :label="$t('all.tip34')" min-width="6%"></el-table-column>
                <el-table-column prop="legWin" :label="$t('all.tip107')" min-width="6%"></el-table-column>
                <el-table-column prop="legDrawn" :label="$t('all.tip108')" min-width="7%"></el-table-column>
                <el-table-column prop="legLose" :label="$t('all.tip109')" min-width="6%"></el-table-column>
                <el-table-column prop="legRatio" :label="$t('all.tip533')" min-width="6%"></el-table-column>
              </el-table-column>
              <el-table-column prop="setPoint" :label="$t('all.tip73')" min-width="9%"></el-table-column>
              <el-table-column prop="winningPoint" :label="$t('all.tip72')" min-width="9%"></el-table-column>
              <el-table-column prop="penaltyPoint" :label="$t('all.tip223')" min-width="8%"></el-table-column>
              <el-table-column prop="finalPoint" :label="$t('all.tip314')" min-width="6%"></el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              @size-change="rankingsizeChange"
              @current-change="rankingcurrentChange"
              :current-page="1"
              :page-sizes="[10, 20, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="rankingtotal"
            ></el-pagination>
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane :label="$t('all.tip309')" name="second">
        <el-row>
          <el-form label-width="160px">
            <el-col>
              <el-form-item :label="$t('all.tip317')">
                <el-checkbox v-model="result.state">{{ $t("all.tip318") }}</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('all.tip51')">
                <el-select v-model="result.categoryId" :placeholder="$t('placeholder.select')" clearable @change="resultCategoryIdCG">
                  <el-option v-for="item in categoryList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('all.tip52')">
                <el-select v-model="result.divisionId" :placeholder="$t('placeholder.select')" clearable @change="resultDivisionIdCG">
                  <el-option v-for="item in divisionList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('all.tip21')">
                <el-select v-model="result.stageId" :placeholder="$t('placeholder.select')" clearable>
                  <el-option v-for="item in stageList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="lineClass">
              <el-button type="primary" size="mini" @click="getResultList">{{ $t("form.SearchButton") }}</el-button>
            </el-col>
          </el-form>
        </el-row>
        <div class="table">
          <el-table :data="resultList" style="width: 100%">
            <el-table-column prop="confrontationDate" :label="$t('all.tip321')" min-width="7%">
              <template slot-scope="scope">
                <div>{{ scope.row.time }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="id" :label="$t('all.tip322')" min-width="7%"></el-table-column>
            <el-table-column :label="$t('all.tip323')">
              <el-table-column prop="homeCombatShopName" :label="$t('all.tip215')" min-width="6%"></el-table-column>
              <el-table-column :label="$t('all.tip244')" min-width="6%">
                <template slot-scope="scope">
                  <div class="tableLink" @click="info(scope.row.id, 1)">{{ scope.row.homeTeamName }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="homeResult" :label="$t('all.tip325')" min-width="10%">
                <template slot-scope="scope">
                  <div class="result">
                    <div style="width:60%">
                      <div class="resultDetail">
                        <div>{{ "Set Win" }}</div>
                        <div>{{ scope.row.homeSetWin }}</div>
                      </div>
                      <div class="resultDetail">
                        <div>{{ "Set Point" }}</div>
                        <div>{{ scope.row.homeSetPoint }}</div>
                      </div>
                      <div class="resultDetail">
                        <div>{{ "Penalty Point" }}</div>
                        <div>{{ scope.row.homePenaltyPoint }}</div>
                      </div>
                      <div class="resultDetail">
                        <div>{{ "WinningPoint" }}</div>
                        <div>{{ scope.row.homeWinningPoint }}</div>
                      </div>
                    </div>
                    <div>{{ scope.row.homeResult }}</div>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('all.tip326')">
              <el-table-column prop="awayResult" :label="$t('all.tip325')" min-width="10%">
                <template slot-scope="scope">
                  <div class="result">
                    <div>{{ scope.row.visitingResult }}</div>
                    <div style="width:60%">
                      <div class="resultDetail">
                        <div>{{ scope.row.visitingSetWin }}</div>
                        <div>{{ "Set Win" }}</div>
                      </div>
                      <div class="resultDetail">
                        <div>{{ scope.row.visitingSetPoint }}</div>
                        <div>{{ "Set Point" }}</div>
                      </div>
                      <div class="resultDetail">
                        <div>{{ scope.row.visitingPenaltyPoint }}</div>
                        <div>{{ "Penalty Point" }}</div>
                      </div>
                      <div class="resultDetail">
                        <div>{{ scope.row.visitingWinningPoint }}</div>
                        <div>{{ "WinningPoint" }}</div>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('all.tip244')" min-width="6%">
                <template slot-scope="scope">
                  <div class="tableLink" @click="info(scope.row.id, 2)">{{ scope.row.visitingTeamName }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="visitingCombatShopName" :label="$t('all.tip215')" min-width="7%"></el-table-column>
            </el-table-column>
            <el-table-column prop="winner" :label="$t('all.tip216')" min-width="8%"></el-table-column>
            <el-table-column prop="state" :label="$t('all.tip25')" min-width="6%">
              <template slot-scope="scope">
                <div v-if="scope.row.state === 1">{{ $t("all.tip289") }}</div>
                <div v-if="scope.row.state === 2">{{ $t("all.tip288") }}</div>
                <div v-if="scope.row.state === 3">{{ $t("all.tip333") }}</div>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination
              @size-change="sizeChange"
              @current-change="currentChange"
              :current-page="1"
              :page-sizes="[10, 20, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
        <div v-show="showDetail" class="showDetailStyle">
          <el-row class="title">
            <el-col :span="11">{{ $t("all.tip217") }}</el-col>
            <el-col :span="13" class="ButtonBox">
              <el-button type="primary" size="mini" @click="showResultsHistory">{{ $t("all.tip220") }}</el-button>
              <el-button type="primary" size="mini" @click="saveScore">{{ $t("all.tip136") }}</el-button>
            </el-col>
          </el-row>

          <el-row>
            <div class="label">{{ $t("all.tip218") + "：" }}{{ this.allScore }}</div>
            <div class="table">
              <el-table :data="allResultMgmt" border style="width: 100%">
                <el-table-column prop="teamName" :label="$t('all.tip324')" min-width="5%"></el-table-column>
                <el-table-column :label="$t('all.tip309')" min-width="5%">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.num" :placeholder="$t('placeholder.select')" @change="homeChange">
                      <el-option v-for="item in gameScoreList" :key="item.index" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="value" :label="$t('all.tip219')" min-width="20%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value" clearable></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-row>

          <el-row class="title">
            <el-col :span="12">{{ $t("all.tip222") }}</el-col>
            <el-col :span="12" class="endButtonBox">
              <el-button type="primary" size="mini" @click="penaltyScore">{{ $t("all.tip136") }}</el-button>
            </el-col>
          </el-row>

          <el-row style="border:1px solid #eee;">
            <div class="table">
              <el-table :data="penaltyMgmt" border style="width: 100%">
                <el-table-column prop="teamName" :label="$t('all.tip324')" min-width="5%"></el-table-column>
                <el-table-column :label="$t('all.tip223')" min-width="5%">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.num" :placeholder="$t('placeholder.select')" @change="awayChange">
                      <el-option v-for="item in penaltyScoreList" :key="item.index" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="value" :label="$t('all.tip224')" min-width="20%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value" clearable></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-row class="allBox">
              <el-col :span="6">
                <el-col :span="2">{{ "Set" }}</el-col>
                <el-col :span="10">
                  <el-select v-model="defaultSet" :placeholder="$t('placeholder.select')" @change="setChange">
                    <el-option v-for="item in setList" :key="item.setResultId" :label="item.setName" :value="item.setResultId"></el-option>
                  </el-select>
                </el-col>
              </el-col>
              <el-col :span="2">{{ $t("all.tip225") }}</el-col>
              <el-col :span="15">
                <el-input v-model="gameResultTextarea" clearable></el-input>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" size="mini" @click="showBox">{{ $t("all.tip136") }}</el-button>
              </el-col>
            </el-row>
            <el-row style="border:1px solid #eee;">
              <div class="table">
                <el-table :data="setDataList" style="width: 100%">
                  <el-table-column prop="legName" :label="$t('all.tip53')" min-width="7%"></el-table-column>
                  <el-table-column prop="gameName" :label="$t('all.tip213')" min-width="7%"></el-table-column>
                  <el-table-column :label="$t('all.tip226')" min-width="6%">
                    <template slot-scope="scope">
                      <div v-if="scope.row.gameMode === 1">{{ "Single" }}</div>
                      <div v-if="scope.row.gameMode === 2">{{ "Double" }}</div>
                      <div v-if="scope.row.gameMode === 3">{{ "Trios" }}</div>
                      <div v-if="scope.row.gameMode === 4">{{ "Gallon" }}</div>
                      <div v-if="scope.row.gameMode === 5">{{ "Team" }}</div>
                      <div v-if="scope.row.gameMode === 6">{{ "Team2" }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip227')" min-width="6%">
                    <template slot-scope="scope">
                      <div v-for="(item, index) in scope.row.playerList" :key="index">
                        <div v-if="item.drawFirst === 1">{{ $t("all.tip323") }}</div>
                        <div v-else>{{ $t("all.tip326") }}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip111')" min-width="10%">
                    <el-table-column :label="$t('all.tip445')" min-width="7%">
                      <template slot-scope="scope">
                        <div v-for="(item, index) in scope.row.playerList" :key="index">
                          <el-select v-model="item.homePlayerId" :placeholder="$t('placeholder.select')">
                            <el-option v-for="item in scope.row.playerList" :key="item.homePlayerId" :label="item.homePlayerName" :value="item.homePlayerId"></el-option>
                          </el-select>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('all.tip228')" min-width="7%">
                      <template slot-scope="scope">
                        <div v-for="(item, index) in scope.row.playerList" :key="index">
                          <el-input v-model="item.homePpdMpr" clearable></el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('all.tip229')" min-width="7%">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.score" clearable></el-input>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip309')" min-width="7%">
                    <el-table-column label="1" min-width="7%">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.homeIsWin" :placeholder="$t('placeholder.select')">
                          <el-option v-for="item in gameResultList" :key="item.id" :label="$t(item.label)" :value="item.id"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column label="0" min-width="7%">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.visitingIsWin" :placeholder="$t('placeholder.select')">
                          <el-option v-for="item in gameResultList" :key="item.id" :label="$t(item.label)" :value="item.id"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip326')" min-width="10%">
                    <el-table-column :label="$t('all.tip229')" min-width="7%">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.score" clearable></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('all.tip228')" min-width="7%">
                      <template slot-scope="scope">
                        <div v-for="(item, index) in scope.row.playerList" :key="index">
                          <el-input v-model="item.visitingPpdMpr" clearable></el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('all.tip445')" min-width="7%">
                      <template slot-scope="scope">
                        <div v-for="(item, index) in scope.row.playerList" :key="index">
                          <el-select v-model="item.visitingPlayerId" :placeholder="$t('placeholder.select')">
                            <el-option v-for="item in scope.row.playerList" :key="item.visitingPlayerId" :label="item.visitingPlayerName" :value="item.visitingPlayerId"></el-option>
                          </el-select>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </div>
              <div class="allBox">
                <el-col :span="1">{{ "Leg" }}</el-col>
                <el-col :span="2">
                  <el-select v-model="defaultLeg" :placeholder="$t('placeholder.select')" @change="legChange">
                    <el-option v-for="item in legList" :key="item.legId" :label="item.legName" :value="item.legId"></el-option>
                  </el-select>
                </el-col>
              </div>
            </el-row>
            <el-row style="border:1px solid #eee;">
              <el-row class="allBox">
                <el-col :span="6" :title="homeTeamName" class="overFlowStyle">{{ $t("all.tip323") + "：" }}{{ homeTeamName }}</el-col>
                <el-col :span="2">{{ $t("all.tip225") }}</el-col>
                <el-col :span="15">
                  <el-input v-model="gameResultTextarea" clearable></el-input>
                </el-col>
                <el-col :span="1">
                  <el-button type="primary" size="mini" @click="showBox">{{ $t("all.tip136") }}</el-button>
                </el-col>
              </el-row>
              <div class="table">
                <el-table :data="homeTeam" border style="width: 100%">
                  <el-table-column prop="id" :label="$t('all.tip257')" min-width="2%"></el-table-column>
                  <el-table-column :label="$t('all.tip340')" min-width="4%">
                    <template slot-scope="scope">
                      <div>{{ `${scope.row.playerName}(${scope.row.playerId})` }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip344')" min-width="3%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.sideBu"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip345')" min-width="3%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.doubleBull"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip346')" min-width="3%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.lowTon"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip347')" min-width="3%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.hatTrick"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip348')" min-width="3%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.highTon"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip349')" min-width="5%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.highTonOut"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip350')" min-width="5%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.lowTonOut"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip351')" min-width="4%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.threeInABed"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip352')" min-width="3%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.ton80"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip353')" min-width="5%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.threeInTheBlack"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip354')" min-width="3%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.fiveMarks"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip355')" min-width="3%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.sixMarks"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip356')" min-width="3%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.sevenMarks"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip357')" min-width="3%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.eightMarks"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip358')" min-width="3%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.nineMarks"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('all.tip359')" min-width="3%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.whiteHorse"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-row>
          </el-row>
          <!-- Away Team -->
          <el-row style="border:1px solid #eee;">
            <el-row class="allBox">
              <el-col :span="6" :title="awayTeamName" class="overFlowStyle">{{ $t("all.tip326") + "：" }}{{ awayTeamName }}</el-col>
              <el-col :span="2">{{ $t("all.tip225") }}</el-col>
              <el-col :span="15">
                <el-input v-model="gameResultTextarea" clearable></el-input>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" size="mini" @click="showBox">{{ $t("all.tip136") }}</el-button>
              </el-col>
            </el-row>
            <div class="table">
              <el-table :data="awayTeam" border style="width: 100%">
                <el-table-column prop="id" :label="$t('all.tip257')" min-width="2%"></el-table-column>
                <el-table-column :label="$t('all.tip340')" min-width="4%">
                  <template slot-scope="scope">
                    <div>{{ `${scope.row.playerName}(${scope.row.playerId})` }}</div>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip344')" min-width="3%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.sideBu"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip345')" min-width="3%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.doubleBull"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip346')" min-width="3%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.lowTon"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip347')" min-width="3%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.hatTrick"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip348')" min-width="3%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.highTon"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip349')" min-width="5%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.highTonOut"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip350')" min-width="5%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.lowTonOut"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip351')" min-width="4%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.threeInABed"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip352')" min-width="3%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.ton80"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip353')" min-width="5%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.threeInTheBlack"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip354')" min-width="3%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.fiveMarks"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip355')" min-width="3%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.sixMarks"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip356')" min-width="3%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.sevenMarks"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip357')" min-width="3%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.eightMarks"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip358')" min-width="3%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.nineMarks"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip359')" min-width="3%">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.whiteHorse"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('all.tip445')" name="third">
        <el-row>
          <el-form label-width="110px">
            <el-col :span="6">
              <el-form-item :label="$t('all.tip51')">
                <el-select v-model="PlayerVO.categoryId" :placeholder="$t('placeholder.select')" clearable @change="categoryChange">
                  <el-option v-for="item in categoryList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('all.tip52')">
                <el-select v-model="PlayerVO.divisionId" :placeholder="$t('placeholder.select')" clearable @change="divisionChange">
                  <el-option v-for="item in divisionList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('all.tip21')">
                <el-select v-model="PlayerVO.stageId" :placeholder="$t('placeholder.select')" clearable>
                  <el-option v-for="item in stageList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row>
          <el-form label-width="110px">
            <el-col :span="6">
              <el-form-item :label="$t('all.tip445')">
                <el-input v-model="PlayerVO.playerName" clearable :placeholder="$t('placeholder.input')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('all.tip316')">
                <el-input v-model="PlayerVO.teamName" clearable :placeholder="$t('placeholder.input')"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row>
          <el-form label-width="110px">
            <el-col :span="6" class="towInput">
              <el-form-item :label="$t('all.tip154')">
                <el-input v-model="PlayerVO.minRating" clearable :placeholder="$t('placeholder.input')"></el-input>-
                <el-input v-model="PlayerVO.maxRating" clearable :placeholder="$t('placeholder.input')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="towInput">
              <el-form-item :label="$t('all.tip155')">
                <el-input v-model="PlayerVO.minPpd" clearable :placeholder="$t('placeholder.input')"></el-input>-
                <el-input v-model="PlayerVO.maxPpd" clearable :placeholder="$t('placeholder.input')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="towInput">
              <el-form-item :label="$t('all.tip156')">
                <el-input v-model="PlayerVO.minMpr" clearable :placeholder="$t('placeholder.input')"></el-input>-
                <el-input v-model="PlayerVO.maxMpr" clearable :placeholder="$t('placeholder.input')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="lineClass">
              <el-button type="primary" size="mini" @click="playerSearch">{{ $t("form.SearchButton") }}</el-button>
            </el-col>
          </el-form>
          <div class="table">
            <el-table :data="playerList" style="width: 100%">
              <el-table-column type="index" :label="$t('all.tip257')" width="50"></el-table-column>
              <el-table-column :label="$t('all.tip80')" min-width="7%">
                <template slot-scope="scope">
                  <div class="formImgBox">
                    <div v-if="scope.row.photo">
                      <img :src="scope.row.photo" />
                    </div>
                    <div v-else>
                      <img :src="defaultImg" />
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('all.tip340')" min-width="10%">
                <template slot-scope="scope">
                  <div>{{ `${scope.row.playerName}(${scope.row.playerId})` }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="teamName" :label="$t('all.tip316')" min-width="10%"></el-table-column>
              <el-table-column prop="rating" :label="$t('all.tip154')" min-width="6%"></el-table-column>
              <el-table-column prop="ppd" :label="$t('all.tip155')" min-width="5%"></el-table-column>
              <el-table-column prop="mpr" :label="$t('all.tip156')" min-width="5%"></el-table-column>
              <el-table-column :label="$t('all.tip53')">
                <el-table-column prop="setTotal" :label="$t('all.tip34')" min-width="6%"></el-table-column>
                <el-table-column prop="setWin" :label="$t('all.tip107')" min-width="6%"></el-table-column>
                <el-table-column prop="setDrawn" :label="$t('all.tip108')" min-width="7%"></el-table-column>
                <el-table-column prop="setLose" :label="$t('all.tip109')" min-width="7%"></el-table-column>
                <el-table-column prop="setRatio" :label="$t('all.tip533')" min-width="7%"></el-table-column>
              </el-table-column>
              <el-table-column :label="$t('all.tip54')">
                <el-table-column prop="legTotal" :label="$t('all.tip34')" min-width="6%"></el-table-column>
                <el-table-column prop="legWin" :label="$t('all.tip107')" min-width="6%"></el-table-column>
                <el-table-column prop="legDrawn" :label="$t('all.tip108')" min-width="7%"></el-table-column>
                <el-table-column prop="legLose" :label="$t('all.tip109')" min-width="7%"></el-table-column>
                <el-table-column prop="legRatio" :label="$t('all.tip533')" min-width="7%"></el-table-column>
              </el-table-column>
              <el-table-column :label="$t('all.tip341')" min-width="10%">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="requset(scope.row.playerId)">{{ $t("all.tip342") }}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-row>
        <div class="page">
          <el-pagination
            @size-change="playerSizeChange"
            @current-change="playerCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="PlayerTotal"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('all.tip343')" name="fourth">
        <el-row>
          <el-form label-width="110px">
            <el-col :span="6">
              <el-form-item :label="$t('all.tip51')">
                <el-select v-model="PlayerAwardVO.categoryId" :placeholder="$t('placeholder.select')" clearable @change="change">
                  <el-option v-for="item in categoryList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('all.tip52')">
                <el-select v-model="PlayerAwardVO.divisionId" :placeholder="$t('placeholder.select')" clearable @change="change">
                  <el-option v-for="item in divisionList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('all.tip21')">
                <el-select v-model="PlayerAwardVO.stageId" :placeholder="$t('placeholder.select')" clearable @change="change">
                  <el-option v-for="item in stageList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row>
          <el-form label-width="110px">
            <el-col :span="6">
              <el-form-item :label="$t('all.tip445')">
                <el-input v-model="PlayerAwardVO.playerName" clearable :placeholder="$t('placeholder.input')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('all.tip316')">
                <el-input v-model="PlayerAwardVO.teamName" clearable :placeholder="$t('placeholder.input')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('all.tip208')">
                <el-select v-model="PlayerAwardVO.gender" clearable :placeholder="$t('placeholder.select')">
                  <el-option :value="1" :label="$t('all.tip209')"></el-option>
                  <el-option :value="0" :label="$t('all.tip210')"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="lineClass">
              <el-button type="primary" size="mini" @click="getPlayerAwardList">{{ $t("form.SearchButton") }}</el-button>
            </el-col>
          </el-form>
        </el-row>
        <div class="table">
          <el-table :data="playerAwardList" border style="width: 100%">
            <el-table-column type="index" :label="$t('all.tip257')" width="50"></el-table-column>
            <el-table-column :label="$t('all.tip340')" min-width="10%">
              <template slot-scope="scope">
                <div>{{ `${scope.row.playerName}` }}</div>
                <div>{{ `(${scope.row.playerId})` }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="gender" :label="$t('all.tip208')" min-width="6%"></el-table-column>
            <el-table-column prop="teamName" :label="$t('all.tip244')" min-width="6%"></el-table-column>
            <el-table-column prop="sideBull" :label="$t('all.tip344')" min-width="5%"></el-table-column>
            <el-table-column prop="doubleBull" :label="$t('all.tip345')" min-width="6%"></el-table-column>
            <el-table-column prop="lowTon" :label="$t('all.tip346')" min-width="6%"></el-table-column>
            <el-table-column prop="hatTrick" :label="$t('all.tip347')" min-width="6%"></el-table-column>
            <el-table-column prop="highTon" :label="$t('all.tip348')" min-width="7%"></el-table-column>
            <el-table-column prop="highTonOut" :label="$t('all.tip349')" min-width="7%"></el-table-column>
            <el-table-column prop="lowTonOut" :label="$t('all.tip350')" min-width="7%"></el-table-column>
            <el-table-column prop="threeInABed" :label="$t('all.tip351')" min-width="7%"></el-table-column>
            <el-table-column prop="ton80" :label="$t('all.tip352')" min-width="7%"></el-table-column>
            <el-table-column prop="threeInTheBlack" :label="$t('all.tip353')" min-width="7%"></el-table-column>
            <el-table-column prop="fiveMarks" :label="$t('all.tip354')" min-width="7%"></el-table-column>
            <el-table-column prop="sixMarks" :label="$t('all.tip355')" min-width="7%"></el-table-column>
            <el-table-column prop="sevenMarks" :label="$t('all.tip356')" min-width="7%"></el-table-column>
            <el-table-column prop="eightMarks" :label="$t('all.tip357')" min-width="7%"></el-table-column>
            <el-table-column prop="nineMarks" :label="$t('all.tip358')" min-width="7%"></el-table-column>
            <el-table-column prop="whiteHorse" :label="$t('all.tip359')" min-width="7%"></el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            @size-change="playerAwardSizeChange"
            @current-change="playerAwardCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="playerAwardTotal"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('all.tip360')" name="five">
        <el-row>
          <el-form label-width="110px">
            <el-col :span="5">
              <el-form-item :label="$t('all.tip51')">
                <el-select v-model="TeamAwardVO.categoryId" :placeholder="$t('placeholder.select')" clearable @change="TeamAwardCategoryChange">
                  <el-option v-for="item in categoryList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item :label="$t('all.tip52')">
                <el-select v-model="TeamAwardVO.divisionId" :placeholder="$t('placeholder.select')" clearable @change="TeamAwardDivisionChange">
                  <el-option v-for="item in divisionList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item :label="$t('all.tip21')">
                <el-select v-model="TeamAwardVO.stageId" :placeholder="$t('placeholder.select')" clearable>
                  <el-option v-for="item in stageList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item :label="$t('all.tip316')">
                <el-input v-model="TeamAwardVO.teamName" clearable :placeholder="$t('placeholder.input')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="lineClass">
              <el-button type="primary" size="mini" @click="getTeamAwardList">{{ $t("form.SearchButton") }}</el-button>
            </el-col>
          </el-form>
        </el-row>
        <div class="table">
          <el-table :data="teamAwardList" border style="width: 100%">
            <el-table-column type="index" :label="$t('all.tip214')" width="80"></el-table-column>
            <el-table-column :label="$t('all.tip361')" min-width="10%">
              <template slot-scope="scope">
                <div>{{ scope.row.teamName }}</div>
                <div>({{ scope.row.teamId }})</div>
              </template>
            </el-table-column>
            <el-table-column prop="lowTon" :label="$t('all.tip346')" min-width="6%"></el-table-column>
            <el-table-column prop="hatTrick" :label="$t('all.tip347')" min-width="6%"></el-table-column>
            <el-table-column prop="highTon" :label="$t('all.tip348')" min-width="5%"></el-table-column>
            <el-table-column prop="highTonOut" :label="$t('all.tip349')" min-width="5%"></el-table-column>
            <el-table-column prop="lowTonOut" :label="$t('all.tip350')" min-width="5%"></el-table-column>
            <el-table-column prop="threeInABed" :label="$t('all.tip351')" min-width="5%"></el-table-column>
            <el-table-column prop="ton80" :label="$t('all.tip352')" min-width="5%"></el-table-column>
            <el-table-column prop="threeInTheBlack" :label="$t('all.tip353')" min-width="5%"></el-table-column>
            <el-table-column prop="fiveMarks" :label="$t('all.tip354')" min-width="5%"></el-table-column>
            <el-table-column prop="sixMarks" :label="$t('all.tip355')" min-width="5%"></el-table-column>
            <el-table-column prop="sevenMarks" :label="$t('all.tip356')" min-width="5%"></el-table-column>
            <el-table-column prop="eightMarks" :label="$t('all.tip357')" min-width="5%"></el-table-column>
            <el-table-column prop="nineMarks" :label="$t('all.tip358')" min-width="5%"></el-table-column>
            <el-table-column prop="whiteHorse" :label="$t('all.tip359')" min-width="10%"></el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            @size-change="teamAwardSizeChange"
            @current-change="teamAwardCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="teamAwardTotal"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div>
      <el-dialog :title="$t('all.tip220')" border :visible.sync="LeagueResultsDialog" width="60%">
        <el-table :data="ResultsHiotory" border>
          <el-table-column :label="$t('all.tip321')" min-width="10%">
            <template slot-scope="scope">
              <div>{{ scope.row.cdateInt | showDate }}</div>
            </template>
          </el-table-column>
          <el-table-column property="teamName" :label="$t('all.tip244')" min-width="10%"></el-table-column>
          <el-table-column :label="$t('all.tip230')" min-width="10%">
            <template slot-scope="scope">
              <div v-if="scope.row.afterModification === 1">{{ $t("all.tip309") }}</div>
              <div v-if="scope.row.afterModification === 2">{{ $t("all.tip223") }}</div>
            </template>
          </el-table-column>
          <el-table-column property="original" :label="$t('all.tip231')" min-width="10%"></el-table-column>
          <el-table-column property="fraction" :label="$t('all.tip232')" min-width="10%"></el-table-column>
          <el-table-column property="reason" :label="$t('all.tip225')" min-width="20%"></el-table-column>
          <el-table-column property="userName" :label="$t('all.tip233')" min-width="10%"></el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            @size-change="diaLogSizeChange"
            @current-change="diaLogCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="diaLogTotal"
          ></el-pagination>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ResultInformation',
  components: {},
  data() {
    return {
      stretch: true,
      showDetail: false,
      LeagueResultsDialog: false,
      activeName: 'first',
      diaLogTotal: 0,
      defaultImg: require('@/assets/person.jpg'),
      allScore: '',
      matchId: '',
      gameResultList: [{ id: 1, label: 'all.tip107' }, { id: 2, label: 'all.tip108' }, { id: 3, label: 'all.tip109' }],
      gameScoreList: [],
      penaltyScoreList: [],
      ResultsHiotory: [],
      homeResultId: '',
      awayResultId: '',
      gameResultTextarea: '',
      detail: {
        competitionStartPeriod: '',
        competitionEndPeriod: ''
      },
      rankingVO: {
        competitionId: '',
        categoryId: '',
        divisionId: '',
        stageId: '',
        pageNum: 1,
        pageSize: 10
      },
      allResultMgmt: [],
      penaltyMgmt: [],
      categoryList: [],
      divisionList: [],
      stageList: [],
      rankingValue: {
        rankingDecision: '',
        winningPointWin: '',
        winningPointDrawn: '',
        winningPointLose: ''
      },
      result: {
        state: false,
        ategoryId: '',
        divisionId: '',
        stageId: '',
        pageNum: 1,
        pageSize: 10,
        competitionId: this.$route.query.id
      },
      PlayerVO: {
        competitionId: '',
        categoryId: '',
        divisionId: '',
        stageId: '',
        playerName: '',
        teamName: '',
        minRating: '',
        maxRating: '',
        minPpd: '',
        maxPpd: '',
        minMpr: '',
        maxMpr: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 1,
      rankingtotal: 1,
      PlayerTotal: 1,
      teamAwardTotal: 1,
      playerAwardTotal: 1,
      PlayerAwardVO: {
        competitionId: '',
        categoryId: '',
        divisionId: '',
        stageId: '',
        playerName: '',
        teamName: '',
        gender: '',
        pageNum: 1,
        pageSize: 10
      },
      TeamAwardVO: {
        competitionId: '',
        categoryId: '',
        divisionId: '',
        stageId: '',
        teamName: '',
        pageNum: 1,
        pageSize: 10
      },
      resultList: [],
      setList: [],
      legList: [],
      setDataList: [],
      homeTeamName: '',
      awayTeamName: '',
      defaultSet: '',
      defaultLeg: '',
      isHomeTeam: '',
      homeTeam: [],
      awayTeam: [],
      tableData: [],
      rankingList: [],
      playerList: [],
      playerAwardList: [],
      teamAwardList: [],
      homePlayerList: [],
      awayPlayerList: []
    };
  },
  filters: {
    filterDate(data) {
      let day = '';
      const [first, last] = data.split(' ');
      day = last.split('.')[0];
      return `${first}-${day}`;
    }
  },
  mounted() {
    if (this.$route.query.id) {
      const id = this.$route.query.id;
      this.rankingVO.competitionId = id;
      this.PlayerVO.competitionId = id;
      this.PlayerAwardVO.competitionId = id;
      this.TeamAwardVO.competitionId = id;
      this.init(id);
    }
  },
  methods: {
    init(id) {
      this.getSelectList(id);
      this.getRankingList();
      this.playerSearch();
      this.getPlayerAwardList();
      this.getTeamAwardList();
      this.getResultList();
      this.showDetails(id);
    },
    showDetails(id) {
      const vm = this;
      this.$axios.post(`/fixedBarInfo?competitionId=${id}`).then(res => {
        if (!res.data.errorCode) {
          this.detail = res.data.data;
          this.detail.area = '';
          vm.detail.countryList.forEach(i => {
            let str = '';
            if (i.areaName) {
              str = `,${i.areaName}`;
            }
            vm.detail.area += `${i.countryName}${str};`;
          });
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    getRankingList() {
      this.$axios.post('/ranking', this.$qs.stringify(this.rankingVO)).then(res => {
        if (!res.data.errorCode) {
          this.rankingValue = res.data.data;
          this.rankingList = res.data.data.teamList;
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    rankingsizeChange(value) {
      this.rankingVO.pageNum = value;
      this.getRankingList();
    },
    rankingcurrentChange(value) {
      this.rankingVO.pageSize = value;
      this.getRankingList();
    },
    getResultList() {
      this.result.state = this.result.state ? 1 : 0;
      this.$axios.post('/getconfrontationresult', this.$qs.stringify(this.result)).then(res => {
        if (!res.data.errorCode) {
          this.resultList = res.data.data.list;
        } else {
          this.$message(res.data.msg);
        }
        this.result.state = !!this.result.state;
      });
    },
    sizeChange(value) {
      this.result.pageNum = value;
      this.getResultList();
    },
    currentChange(value) {
      this.result.pageSize = value;
      this.getResultList();
    },
    getTeamAwardList() {
      this.$axios.post('/teamawardresult', this.$qs.stringify(this.TeamAwardVO)).then(res => {
        this.teamAwardList = res.data.data;
        this.teamAwardTotal = res.data.data.total;
      });
    },
    teamAwardSizeChange(value) {
      this.TeamAwardVO.pageSize = value;
      this.getTeamAwardList();
    },
    teamAwardCurrentChange(value) {
      this.TeamAwardVO.pageNum = value;
      this.getTeamAwardList();
    },
    getPlayerAwardList() {
      this.$axios.post('/playerawardresult', this.$qs.stringify(this.PlayerAwardVO)).then(res => {
        this.playerAwardList = res.data.data;
        this.playerAwardTotal = res.data.data.total;
      });
    },
    playerAwardSizeChange(value) {
      this.PlayerAwardVO.pageSize = value;
      this.getPlayerAwardList();
    },
    playerAwardCurrentChange(value) {
      this.PlayerAwardVO.pageNum = value;
      this.getPlayerAwardList();
    },
    playerSearch() {
      this.$axios.post('/playerresult', this.$qs.stringify(this.PlayerVO)).then(res => {
        if (!res.data.errorCode) {
          this.playerList = res.data.data.list;
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    playerSizeChange(val) {
      this.PlayerVO.pageSize = val;
      this.playerSearch();
    },
    playerCurrentChange(val) {
      this.PlayerVO.pageNum = val;
      this.playerSearch();
    },
    diaLogCurrentChange() {},
    diaLogSizeChange() {},
    getSelectList(id) {
      this.$axios.post(`/allsubset?competitionId=${id}`).then(res => {
        this.findObj(res.data.data);
      });
    },
    homeChange(value) {
      console.log(value, this.allResultMgmt);
    },
    awayChange() {
      console.log(this.penaltyMgmt);
    },
    change(value) {
      console.log(value);
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
    info(id, type) {
      this.isHomeTeam = type;
      const vm = this;
      // 获取比赛队伍
      this.$axios.post(`/getconfrontationresult?confrontationInfoId=${id}`).then(res => {
        // 展示队伍名称
        if (res.data.data.list.length) {
          const data = res.data.data.list[0];
          this.allResultMgmt = [];
          this.penaltyMgmt = [];
          this.gameScoreList = [];
          this.penaltyScoreList = [];
          this.resultList = res.data.data.list;
          this.matchId = data.id;
          this.homeTeamName = data.homeTeamName;
          this.awayTeamName = data.visitingTeamName;
          this.allScore = data.homeResult + data.visitingResult;
          this.homeResultId = data.homeConfrontationResultId;
          this.awayResultId = data.visitingConfrontationResultId;
          for (let index = -1; index < data.homeSetPoint + data.visitingSetPoint; index += 1) {
            this.gameScoreList.push({ id: index + 1, label: index + 1 });
          }
          for (let i = -1; i < 99; i += 1) {
            this.penaltyScoreList.push({ id: i + 1, label: i + 1 });
          }
          // 联赛结果管理 添加数据
          this.allResultMgmt.push({ teamName: this.homeTeamName, num: 0, value: '' });
          this.allResultMgmt.push({ teamName: this.awayTeamName, num: 0, value: '' });
          // 联赛处罚管理 添加数据
          this.penaltyMgmt.push({ teamName: this.homeTeamName, num: 0, value: '' });
          this.penaltyMgmt.push({ teamName: this.awayTeamName, num: 0, value: '' });
        }
      });
      // 获取set/setData
      this.$axios.post(`/setResult?confrontationInfoId=${id}`).then(res => {
        if (res.data.errorCode) {
          this.$message(res.data.msg);
          return;
        }
        if (res.data.data.setResultList.length) {
          vm.setList = res.data.data.setResultList;
          vm.setDataList = vm.setList[0].legResultList;
          vm.setList.forEach(i => {
            i.legResultList.forEach(j => {
              Object.assign(j, { gameMode: i.gameMode });
            });
          });
          vm.defaultSet = vm.setList[0].setResultId;
          vm.legList = vm.setList[0].legResultList;
          vm.defaultLeg = vm.setList[0].legResultList[0].legId;
          vm.getLegData(vm.defaultLeg, 1);
          vm.getLegData(vm.defaultLeg, 2);
        }
      });
      this.showDetail = true;
    },
    saveScore() {
      for (let i = 0; i < 2; i += 1) {
        const data = {};
        if (i === 0) {
          data.confrontationResultId = this.homeResultId;
          data.reason = this.allResultMgmt[i].value;
          data.result = this.allResultMgmt[i].num;
        } else {
          data.confrontationResultId = this.awayResultId;
          data.reason = this.allResultMgmt[i].value;
          data.result = this.allResultMgmt[i].num;
        }
        this.$axios.post('/updateresult', this.$qs.stringify(data)).then(res => {
          this.$message(res.data.msg);
        });
      }
    },
    penaltyScore() {
      console.log(this.penaltyMgmt);
      for (let i = 0; i < 2; i += 1) {
        const data = {};
        if (i === 0) {
          data.confrontationResultId = this.homeResultId;
          data.reason = this.penaltyMgmt[i].value;
          data.penaltyPoint = this.penaltyMgmt[i].num;
        } else {
          data.confrontationResultId = this.awayResultId;
          data.reason = this.penaltyMgmt[i].value;
          data.penaltyPoint = this.penaltyMgmt[i].num;
        }
        this.$axios.post('/updatepenaltypoint', this.$qs.stringify(data)).then(res => {
          this.$message(res.data.msg);
        });
      }
    },
    setChange(value) {
      this.setList.forEach(i => {
        if (i.setResultId === value) {
          this.legList = i.legResultList;
          this.defaultLeg = this.legList[0].legId;
          this.getLegData(this.defaultLeg, 1);
          this.getLegData(this.defaultLeg, 2);
          this.setDataList = i.legResultList;
        }
      });
      console.log(this.setDataList);
    },
    legChange(value) {
      this.getLegData(value, 1);
      this.getLegData(value, 2);
    },
    getLegData(id, type) {
      const data = {
        // setResultId: this.defaultSet,
        legResultId: id,
        isHomeTeam: type
      };
      this.$axios.post('/legplayerdata', this.$qs.stringify(data)).then(res => {
        if (type === 1) {
          this.homeTeam = res.data.data;
        } else {
          this.awayTeam = res.data.data;
        }
      });
    },
    showResultsHistory() {
      this.$axios.post(`/getmodifyrecord?confrontationInfoId=${this.matchId}`).then(res => {
        if (res.data.data) {
          this.ResultsHiotory = res.data.data;
        }
        this.LeagueResultsDialog = true;
      });
    },
    showBox() {},
    tabClick(value) {
      if (value.index === '2') {
        this.getResultList();
      }
      this.showDetail = false;
    },
    requset(id) {
      console.log(id);
      this.$message('id');
    },
    resultCategoryIdCG() {
      this.result.divisionId = '';
      this.result.stageId = '';
    },
    resultDivisionIdCG() {
      this.result.stageId = '';
    },
    rankingCategoryChange() {
      this.rankingVO.divisionId = '';
      this.rankingVO.stageId = '';
    },
    rankingDivisionChange() {
      this.rankingVO.stageId = '';
    },
    categoryChange() {
      this.PlayerVO.divisionId = '';
      this.PlayerVO.stageId = '';
    },
    divisionChange() {
      this.PlayerVO.stageId = '';
    },
    TeamAwardCategoryChange() {
      this.TeamAwardVO.divisionId = '';
      this.TeamAwardVO.stageId = '';
    },
    TeamAwardDivisionChange() {
      this.TeamAwardVO.stageId = '';
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
/*修改tabs点击之后样式*/
.el-tabs >>> .is-active {
  color: #ffffff !important;
  background-color: #1890ff !important;
}
.towInput >>> .el-input {
  width: 48%;
}
.showDetailStyle {
  padding: 10px;
  border: 1px solid #eeeeee;
}
.title {
  background: #eeeeee;
}
.ButtonBox {
  display: flex;
  justify-content: space-between;
}
.endButtonBox {
  display: flex;
  justify-content: flex-end;
}
.label {
  padding: 5px;
}
.allBox {
  height: 40px;
  line-height: 40px;
}
.result {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.resultDetail {
  display: flex;
  justify-content: space-between;
}
.el-form-item__content div {
  width: 100%;
}
</style>
