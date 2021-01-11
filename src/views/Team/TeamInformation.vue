<template>
  <div>
    <div class="box">
      <el-row>
        <el-col class="title-g" :span="23">{{ $t("all.tip384") }}</el-col>
        <el-col :span="1">
          <el-button size="mini" type="primary" @click="save">{{ $t("all.tip136") }}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="uploadBox">
          <div class="labelBox">
            <label for="upload" class="label">{{ $t("all.tip338") }}</label>
            <div slot="tip" class="el-upload__tip">{{ $t("all.tip387") }}</div>
            <div slot="tip" class="el-upload__tip">{{ `1：${$t("all.tip3871")}` }}</div>
            <div slot="tip" class="el-upload__tip">{{ `2：${$t("all.tip3872")}` }}</div>
            <div slot="tip" class="el-upload__tip">{{ `3：${$t("all.tip3873")}` }}</div>
          </div>
          <el-upload
            :http-request="uploadImg"
            class="upload-demo"
            action=" "
            ref="upload"
            list-type="picture-card"
            :on-change="fileChange"
            :file-list="fileList"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
          >
            <div>
              <el-button id="upload" size="small" type="primary" style="display:none">{{ $t("all.tip338") }}</el-button>
            </div>
          </el-upload>
        </el-col>
        <el-dialog :visible.sync="dialogVisible">
          <div class="imgBox">
            <img width="90%" :src="dialogImageUrl" alt />
          </div>
        </el-dialog>
        <el-col :span="16" class="borderClass">
          <el-row class="center-Row">
            <el-col class="label-g" :span="6">{{ $t("all.tip315") }}</el-col>
            <el-col :span="6" class="lineClass">
              <el-input v-model="TeamInformationVO.id" disabled></el-input>
            </el-col>
            <el-col class="label-g" :span="6">{{ $t("all.tip389") }}</el-col>
            <el-col :span="6" class="lineClass">
              <el-input v-model="TeamInformationVO.regDate" disabled></el-input>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col>
              <el-col class="label-g" :span="6">{{ $t("all.tip316") }}</el-col>
              <el-col :span="6" class="lineClass">
                <el-input v-model="TeamInformationVO.teamName" clearable :placeholder="$t('placeholder.input')"></el-input>
              </el-col>
              <el-col class="label-g" :span="6">{{ $t("all.tip382") }}</el-col>
              <el-col :span="6" class="lineClass">
                <el-input v-model="TeamInformationVO.creatorName" disabled></el-input>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col>
              <el-col class="label-g" :span="6">{{ $t("all.tip246") }}</el-col>
              <el-col :span="4" class="lineClass">
                <el-input v-model="TeamInformationVO.captainId" disabled></el-input>
              </el-col>
              <el-col :span="2" class="lineClass">
                <el-button size="small" type="primary" @click="showCaptianList">{{ $t("all.tip528") }}</el-button>
              </el-col>
              <el-col class="label-g" :span="6">{{ $t("all.tip464") }}</el-col>
              <el-col :span="6" class="lineClass">
                <el-input v-model="TeamInformationVO.players" disabled></el-input>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col>
              <el-col class="label-g" :span="6">{{ $t("all.tip455") }}</el-col>
              <el-col :span="6" id="divBoxWidth">
                <el-select v-model="TeamInformationVO.shopId" filterable remote :remote-method="getShopList" @change="$forceUpdate()" :placeholder="$t('placeholder.input')">
                  <el-option v-for="item in shopList" :key="item.shopId" :label="item.shopName" :value="item.shopId"> </el-option>
                </el-select>
                <!-- <el-select v-model="TeamInformationVO.shopId" @change="$forceUpdate()" :placeholder="$t('placeholder.select')">
                  <el-option v-for="item in shopList" :key="item.shopId" :label="item.shopName" :value="item.shopId"></el-option>
                </el-select> -->
              </el-col>
              <el-col class="label-g" :span="6">{{ $t("all.tip465") }}</el-col>
              <el-col :span="6" class="lineClass">
                <div class="tipBox">
                  <div>{{ $t("all.tip392") }}</div>
                  <div>{{ $t("all.tip393") }}</div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col>
              <el-col class="label-g" :span="6">{{ $t("all.tip388") }}</el-col>
              <el-col :span="6" class="lineClass">
                <el-input v-model="TeamInformationVO.location" disabled></el-input>
              </el-col>
              <el-col class="label-g" :span="6">{{ "(" + $t("all.tip1") + ")" }}</el-col>
              <el-col :span="6" class="lineClass">
                <div class="tipBox">
                  <div>{{ TeamInformationVO.top4Avg }}</div>
                  <div>{{ TeamInformationVO.allAvg }}</div>
                </div>
              </el-col>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-row>
        <el-col class="title-g">{{ $t("all.tip394") }}</el-col>
        <div class="table">
          <el-table :data="teamRatingList" border style="width: 100%">
            <el-table-column :sortable="true" :label="$t('all.tip5')">
              <template slot-scope="scope">
                <div>{{ scope.row.leagueType === 1 ? $t("all.tip40") : $t("all.tip41") }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="rating" :sortable="true" :label="$t('all.tip154')"></el-table-column>
            <el-table-column prop="ppd" :sortable="true" :label="$t('all.tip155')"></el-table-column>
            <el-table-column prop="game01Count" :sortable="true" :label="$t('all.tip395')"></el-table-column>
            <el-table-column prop="mpr" :sortable="true" :label="$t('all.tip156')"></el-table-column>
            <el-table-column prop="gameCricketCount" :sortable="true" :label="$t('all.tip396')"></el-table-column>
            <el-table-column prop="gameCountUpCount" :sortable="true" :label="$t('all.tip495')"></el-table-column>
            <el-table-column prop="attendLeagueCount" :sortable="true" :label="$t('all.tip397')"></el-table-column>
          </el-table>
        </div>
      </el-row>
    </div>
    <div class="box">
      <el-tabs v-model="defaultName" type="border-card" @tab-click="handleClick">
        <el-tab-pane :label="$t('all.tip154')" name="first" class="tableClass">
          <el-row>
            <el-tabs type="card" @tab-click="tabClick">
              <el-tab-pane :label="$t('all.tip399')">
                <div class="table">
                  <el-table :data="quarterList" border style="width: 100%" :span-method="arraySpanMethod" class="mergeTitleone">
                    <el-table-column prop="name" :label="$t('all.tip52')" min-width="15%">
                      <el-table-column prop="name" min-width="15%"> </el-table-column>
                      <el-table-column prop="headName" min-width="15%"> </el-table-column>
                    </el-table-column>
                    <el-table-column prop="Q1" label="Q1" min-width="15%"></el-table-column>
                    <el-table-column prop="Q2" label="Q2" min-width="15%"></el-table-column>
                    <el-table-column prop="Q3" label="Q3" min-width="15%"></el-table-column>
                    <el-table-column prop="Q4" label="Q4" min-width="15%"></el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('all.tip400')">
                <div class="table">
                  <el-table :data="monthList" border style="width: 100%" :span-method="arraySpanMethod" class="mergeTitletwo">
                    <el-table-column prop="name" :label="$t('all.tip52')" min-width="15%">
                      <el-table-column prop="name" min-width="20%"> </el-table-column>
                      <el-table-column prop="headName" min-width="15%"> </el-table-column>
                    </el-table-column>
                    <el-table-column prop="1" label="1" min-width="15%"> </el-table-column>
                    <el-table-column prop="2" label="2" min-width="15%"> </el-table-column>
                    <el-table-column prop="3" label="3" min-width="15%"> </el-table-column>
                    <el-table-column prop="4" label="4" min-width="15%"> </el-table-column>
                    <el-table-column prop="5" label="5" min-width="15%"> </el-table-column>
                    <el-table-column prop="6" label="6" min-width="15%"> </el-table-column>
                    <el-table-column prop="7" label="7" min-width="15%"> </el-table-column>
                    <el-table-column prop="8" label="8" min-width="15%"> </el-table-column>
                    <el-table-column prop="9" label="9" min-width="15%"> </el-table-column>
                    <el-table-column prop="10" label="10" min-width="15%"> </el-table-column>
                    <el-table-column prop="11" label="11" min-width="15%"> </el-table-column>
                    <el-table-column prop="12" label="12" min-width="15%"> </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-row>
          <div class="SelectClass">
            <el-col :span="10">
              <el-select v-model="rating.type" :placeholder="$t('placeholder.select')" @change="typeChange">
                <el-option :label="$t('all.tip0')" :value="0"></el-option>
                <el-option :label="$t('all.tip42')" :value="1"></el-option>
                <el-option :label="$t('all.tip43')" :value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              <el-select v-model="rating.year" :placeholder="$t('placeholder.select')" @change="yearChange">
                <el-option v-for="item in yearList" :key="item.id" :label="item.year" :value="item.id"></el-option>
              </el-select>
            </el-col>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('all.tip398')" name="second">
          <el-row>
            <el-col :span="4">
              <el-select v-model="entryHistoryVO.leagueType" :placeholder="$t('placeholder.select')" @change="entryHistoryTypeChange">
                <el-option :label="$t('all.tip0')" :value="0"></el-option>
                <el-option :label="$t('all.tip42')" :value="1"></el-option>
                <el-option :label="$t('all.tip43')" :value="2"></el-option>
              </el-select>
            </el-col>
            <div class="table">
              <el-table :data="entryHistoryList" border style="width: 100%">
                <el-table-column prop="date" :label="$t('all.tip5')" min-width="7%">
                  <template slot-scope="scope">
                    <div>{{ scope.row.leagueType === 1 ? $t("all.tip40") : $t("all.tip41") }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="leagueName" :label="$t('all.tip1')" min-width="6%"> </el-table-column>
                <el-table-column :label="$t('all.tip403')" min-width="10%">
                  <template slot-scope="scope">
                    <div>{{ scope.row.leagueStartTime.split(" ")[0] }}</div>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip404')" min-width="10%">
                  <template slot-scope="scope">
                    <div>{{ scope.row.leagueEndTime.split(" ")[0] }}</div>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip25')" min-width="4%">
                  <template slot-scope="scope">
                    <div v-if="scope.row.leagueStatus === 1">
                      {{ $t("all.tip26") }}
                    </div>
                    <div v-if="scope.row.leagueStatus === 2">
                      {{ $t("all.tip27") }}
                    </div>
                    <div v-if="scope.row.leagueStatus === 3">
                      {{ $t("all.tip28") }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="teamName" :label="$t('all.tip405')" min-width="5%"> </el-table-column>
                <el-table-column :label="$t('all.tip406')">
                  <el-table-column prop="divisionName" :label="$t('all.tip52')" min-width="6%"> </el-table-column>
                  <el-table-column prop="stageName" :label="$t('all.tip21')" min-width="6%"> </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('all.tip407')">
                  <el-table-column :label="$t('all.tip53')">
                    <el-table-column prop="winCount" :label="$t('all.tip107')" min-width="5%"> </el-table-column>
                    <el-table-column prop="loseCount" :label="$t('all.tip109')" min-width="5%"> </el-table-column>
                    <el-table-column prop="drawnCount" :label="$t('all.tip108')" min-width="5%"> </el-table-column>
                  </el-table-column>
                  <el-table-column prop="rating" :label="$t('all.tip154')" min-width="4%"> </el-table-column>
                  <el-table-column prop="ppd" :label="$t('all.tip155')" min-width="3%"> </el-table-column>
                  <el-table-column prop="mpr" :label="$t('all.tip156')" min-width="3%"> </el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div class="page">
              <el-pagination
                @size-change="entryHistorySizeChange"
                @current-change="entryHistoryCurrentChange"
                :current-page="1"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="entryHistoryTotal"
              >
              </el-pagination>
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane :label="$t('all.tip408')" name="third">
          <el-row>
            <el-col :span="4">
              <el-select v-model="scheduleResultVO.leagueType" :placeholder="$t('placeholder.select')" @change="leagueTypeChange">
                <el-option :label="$t('all.tip0')" :value="0"></el-option>
                <el-option :label="$t('all.tip42')" :value="1"></el-option>
                <el-option :label="$t('all.tip43')" :value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="scheduleResultVO.year" :placeholder="$t('placeholder.select')" @change="scheduleResultYearChange">
                <el-option v-for="item in yearList" :key="item.id" :label="item.year" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="scheduleResultVO.competitionId" :placeholder="$t('placeholder.select')" @change="competitionIdChange">
                <el-option v-for="item in competitionList" :key="item.competitionId" :label="item.competitionName" :value="item.competitionId"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="scheduleResultVO.matchStatus" :placeholder="$t('placeholder.select')" @change="matchStatusChange">
                <el-option :label="$t('all.tip0')" :value="0"></el-option>
                <el-option :label="$t('all.tip289')" :value="1"></el-option>
                <el-option :label="$t('all.tip333')" :value="2"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <div class="table">
            <el-table :data="scheduleResultList" border style="width: 100%">
              <el-table-column :label="$t('all.tip321')" min-width="10%">
                <template slot-scope="scope">
                  <div>{{ scope.row.confrontationDate.split(" ")[0] }}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('all.tip409')" min-width="10%">
                <template slot-scope="scope">
                  <div>{{ scope.row.confrontationDate.split(" ")[1] }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="homeTeamName" :label="$t('all.tip323')" min-width="10%"></el-table-column>
              <el-table-column prop="matchState" :label="$t('all.tip410')" min-width="10%">
                <template slot-scope="scope">
                  <div v-if="scope.row.matchState === 1">
                    {{ $t("all.tip289") }}
                  </div>
                  <div v-if="scope.row.matchState === 2">
                    {{ $t("all.tip288") }}
                  </div>
                  <div v-if="scope.row.matchState === 3">
                    {{ scope.row.matchResult }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="visitTeamName" :label="$t('all.tip326')" min-width="10%"></el-table-column>
            </el-table>
            <div class="page">
              <el-pagination
                @size-change="scheduleResultListSizeChange"
                @current-change="scheduleResultListCurrentChange"
                :current-page="1"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="scheduleResultListTotal"
              >
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('all.tip411')" name="fourth">
          <el-row class="buttonBox">
            <el-col :span="2">
              <el-button type="primary" size="mini" @click="addMember">{{ $t("all.tip256") }}</el-button>
            </el-col>
          </el-row>
          <div class="table">
            <el-table :data="playerList" border style="width: 100%">
              <el-table-column prop="date" :sortable="true" :label="$t('all.tip80')" min-width="3%">
                <template slot-scope="scope">
                  <div class="formImgBox">
                    <img v-if="scope.row.imgUrl" :src="scope.row.imgUrl" />
                    <img v-else :src="personImg" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="account" :sortable="true" :label="$t('all.tip456')" min-width="3%"></el-table-column>
              <el-table-column prop="userName" :sortable="true" :label="$t('all.tip412')" min-width="5%"></el-table-column>
              <el-table-column prop="homeShopName" :sortable="true" :label="$t('all.tip455')" min-width="5%"></el-table-column>
              <el-table-column prop="cardNumber" :sortable="true" :label="$t('all.tip260')" min-width="5%"></el-table-column>
              <el-table-column :sortable="true" label="Adarts" min-width="3%">
                <el-table-column prop="adartsRating" :sortable="true" :label="$t('all.tip154')" min-width="3%"></el-table-column>
                <el-table-column prop="adartsPPd" :sortable="true" :label="$t('all.tip155')" min-width="3%"></el-table-column>
                <el-table-column prop="adartsMpr" :sortable="true" :label="$t('all.tip156')" min-width="3%"></el-table-column>
              </el-table-column>
              <el-table-column :label="$t('all.tip1')">
                <el-table-column prop="leagueRating" :sortable="true" :label="$t('all.tip154')" min-width="3%"></el-table-column>
                <el-table-column prop="leaguePPd" :sortable="true" :label="$t('all.tip155')" min-width="3%"></el-table-column>
                <el-table-column prop="leagueMpr" :sortable="true" :label="$t('all.tip156')" min-width="3%"></el-table-column>
              </el-table-column>
              <el-table-column :sortable="true" min-width="5%">
                <template slot-scope="scope">
                  <div v-if="scope.row.isViceCaptain === 2">{{ $t("all.tip246") }}</div>
                  <div v-else>
                    <div v-if="scope.row.isViceCaptain === 1">
                      <div class="tableButtonBox">
                        <el-button size="mini" @click="cacelViceCaptain(scope.row.userId)">{{ $t("all.tip549") }}</el-button>
                      </div>
                    </div>
                    <div v-else>
                      <div class="tableButtonBox">
                        <el-button type="primary" size="mini" @click="setViceCaptain(scope.row.userId)">{{ $t("all.tip548") }}</el-button>
                      </div>
                    </div>
                    <div class="tableButtonBox">
                      <el-button type="primary" size="mini" @click="deletePlayer(scope.row.id)">{{ $t("all.tip130") }}</el-button>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              @size-change="playerListSizeChange"
              @current-change="playerListCurrentChange"
              :current-page="1"
              :page-sizes="[10, 20, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="playerListTotal"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div>
        <el-dialog :title="$t('all.tip529')" width="50%" :visible.sync="changeCaptain" top="25px">
          <el-row class="center-Row">
            <el-col :span="3" class="label-g">
              {{ $t("all.tip268") }}
            </el-col>
            <el-col :span="8">
              <el-input v-model="captainDialogData.id" clearable :placeholder="$t('placeholder.input')"></el-input>
            </el-col>
            <el-col :span="3" class="label-g">
              {{ $t("all.tip324") }}
            </el-col>
            <el-col :span="8">
              <el-input v-model="captainDialogData.name" clearable :placeholder="$t('placeholder.input')"></el-input>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col :span="3" class="label-g">
              {{ $t("all.tip426") }}
            </el-col>
            <el-col :span="8">
              <el-input v-model="captainDialogData.cardNo" clearable :placeholder="$t('placeholder.input')"></el-input>
            </el-col>
            <el-col :span="3" class="label-g">
              {{ $t("all.tip208") }}
            </el-col>
            <el-col :span="8" id="divBoxWidth">
              <el-select v-model="captainDialogData.gender" clearable :placeholder="$t('placeholder.select')">
                <el-option value="0" :label="$t('all.tip210')"></el-option>
                <el-option value="1" :label="$t('all.tip209')"></el-option>
              </el-select>
            </el-col>
            <el-col :span="2" class="lineClass">
              <el-button type="primary" size="mini" @click="captainSearch">{{ $t("form.SearchButton") }}</el-button>
            </el-col>
          </el-row>
          <div class="dialogtable">
            <el-table :data="captainList" border>
              <el-table-column width="55">
                <template slot-scope="scope">
                  <el-radio :label="scope.row.id" v-model="radioId" @change.native="radioChange(scope.row)"><span></span></el-radio>
                </template>
              </el-table-column>
              <el-table-column property="account" :label="$t('all.tip456')" min-width="6%"></el-table-column>
              <el-table-column property="userName" :label="$t('all.tip412')" min-width="10%"></el-table-column>
              <el-table-column property="cardNumber" :label="$t('all.tip426')" min-width="6%"></el-table-column>
              <el-table-column :sortable="true" label="Adarts">
                <el-table-column prop="adartsRating" :sortable="true" :label="$t('all.tip154')" min-width="6%"> </el-table-column>
                <el-table-column prop="adartsPPd" :sortable="true" :label="$t('all.tip155')" min-width="5%"> </el-table-column>
                <el-table-column prop="adartsMpr" :sortable="true" :label="$t('all.tip156')" min-width="5%"> </el-table-column>
              </el-table-column>
              <el-table-column :sortable="true" :label="$t('all.tip1')">
                <el-table-column prop="leagueRating" :sortable="true" :label="$t('all.tip154')" min-width="6%"> </el-table-column>
                <el-table-column prop="leaguePPd" :sortable="true" :label="$t('all.tip155')" min-width="5%"> </el-table-column>
                <el-table-column prop="leagueMpr" :sortable="true" :label="$t('all.tip156')" min-width="5%"> </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              @size-change="captainListSizeChange"
              @current-change="captainListCurrentChange"
              :current-page="1"
              :page-sizes="[10, 20, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="captainListTotal"
            >
            </el-pagination>
          </div>
          <el-row class="DialogButton">
            <el-col :span="2">
              <el-button type="primary" size="mini" @click="addCaptain">{{ $t("all.tip528") }}</el-button>
            </el-col>
          </el-row>
        </el-dialog>
      </div>
    </div>
    <el-dialog :title="$t('all.tip263')" :visible.sync="addMemberTopBox" top="30px">
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip456") }}
        </el-col>
        <el-col :span="4">
          <el-input v-model="addMemberVO.playerId" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip259") }}
        </el-col>
        <el-col :span="4">
          <el-input v-model="addMemberVO.userName" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip260") }}
        </el-col>
        <el-col :span="4">
          <el-input v-model="addMemberVO.cardNumber" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip208") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="addMemberVO.gender" clearable :placeholder="$t('placeholder.select')">
            <el-option value="0" :label="$t('all.tip210')"></el-option>
            <el-option value="1" :label="$t('all.tip209')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip455") }}
        </el-col>
        <el-col :span="4">
          <el-input v-model="addMemberVO.homeShopName" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col :span="3" class="lineClass">
          <el-button type="primary" size="mini" @click="addMemberSearch">{{ $t("all.tip10") }}</el-button>
        </el-col>
      </el-row>
      <div class="dialogtable">
        <el-table :data="addMemberList" @selection-change="addMemberSelectionChange" :row-key="getRowKey">
          <el-table-column type="selection" width="55" :reserve-selection="true"> </el-table-column>
          <el-table-column :label="$t('all.tip456')" min-width="14%">
            <template slot-scope="scope">
              <div>{{ `${scope.row.account}` }}</div>
              <div>{{ scope.row.gender === 1 ? $t("all.tip209") : $t("all.tip210") }}</div>
            </template>
          </el-table-column>
          <el-table-column property="userName" :label="$t('all.tip412')" min-width="10%"></el-table-column>
          <el-table-column property="cardNumber" :label="$t('all.tip426')" min-width="14%"></el-table-column>
          <el-table-column label="Adarts">
            <el-table-column property="adartsRating" :label="$t('all.tip154')" min-width="10%"></el-table-column>
            <el-table-column property="adartsPPd" :label="$t('all.tip155')" min-width="10%"></el-table-column>
            <el-table-column property="adartsMpr" :label="$t('all.tip156')" min-width="10%"></el-table-column>
          </el-table-column>
          <el-table-column :label="$t('all.tip1')">
            <el-table-column property="leagueRating" :label="$t('all.tip154')" min-width="10%"></el-table-column>
            <el-table-column property="leaguePPd" :label="$t('all.tip155')" min-width="10%"></el-table-column>
            <el-table-column property="leagueMpr" :label="$t('all.tip156')" min-width="10%"></el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <el-row style="display:flex;justify-content:center">
        <el-col :span="2">
          <el-button type="primary" size="mini" @click="addAddMember">{{ $t("all.tip132") }}</el-button>
        </el-col>
      </el-row>
      <div class="page">
        <el-pagination
          @size-change="addMemberListSizeChange"
          @current-change="addMemberListCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="addMemberListTotal"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { returnType } from '@/components/common/Utils';

export default {
  data() {
    return {
      id: '',
      personImg: require('../../assets/person.jpg'),
      fileList: [],
      shopList: [],
      captainList: [],
      competitionList: [],
      addMemberListTotal: 1,
      playerListTotal: 1,
      yearList: [{ id: 2020, yaer: 2020 }],
      rating: {
        type: 0,
        year: 2020
      },
      captain: '',
      quarterList: [],
      monthList: [],
      changeCaptain: false,
      dialogVisible: false,
      addMemberTopBox: false,
      addMemberVO: {
        playerId: '',
        teamId: '',
        homeShopName: '',
        cardNumber: '',
        gender: '',
        pageNum: 1,
        pageSize: 10
      },
      scheduleResultVO: {
        leagueType: 0,
        matchStatus: 0,
        year: 2020,
        competitionId: '',
        teamId: '',
        pageNum: 1,
        pageSize: 10
      },
      playerVO: {
        teamId: '',
        pageNum: 1,
        pageSize: 10
      },
      addMemberList: [],
      addMemberSelectionList: [],
      dialogImageUrl: '',
      defaultName: 'first',
      entryHistoryTotal: 1,
      entryHistoryType: 0,
      entryHistoryList: [],
      playerList: [],
      entryHistoryVO: {
        id: '',
        competitorType: 'team',
        leagueType: 0,
        pageNum: 1,
        pageSize: 10
      },
      currentType: '',
      teamRatingList: [],
      TeamInformationVO: {
        id: '',
        regDate: '',
        teamName: '',
        creatorName: '',
        captainId: '',
        players: '',
        shopId: '',
        League: '',
        location: ''
      },
      editTeamInfo: {},
      captainDialogData: {
        id: '',
        name: '',
        cardNo: '',
        gender: '',
        captain: 1,
        teamId: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      scheduleResultList: [],
      scheduleResultListTotal: 1,
      captainListTotal: 1,
      radioId: ''
    };
  },
  mounted() {
    console.log(process.env.VUE_APP_IMGURL);
    this.id = this.$route.query.id;
    this.playerVO.teamId = this.id;
    this.entryHistoryVO.id = this.id;
    this.captainDialogData.teamId = this.id;
    this.scheduleResultVO.teamId = this.id;
    this.addMemberVO.teamId = this.id;
    this.init();
    this.getTeamRatingList('team', this.id);
    this.getRating('team', undefined, undefined, this.id, undefined);
    this.getTeamInfomation(this.id);
    this.getCompetitionList(this.id);
  },
  methods: {
    init() {
      const upLoad = document.getElementsByClassName('el-upload')[0];
      upLoad.style.visibility = 'hidden';
      if (new Date().getFullYear() !== this.yearList[0].id) {
        this.yearList.push({
          id: new Date().getFullYear,
          year: new Date().getFullYear
        });
      }
      this.captainSearch();
      this.addMemberSearch();
      this.getPlayerList();
      this.getEntryHistoryList();
      this.getScheduleResultList();
      this.getShopList();
    },
    setCaptain(list, id) {
      const vm = this;
      list.forEach(i => {
        if (Number(i.userId) === id) {
          vm.radioId = Number(i.userId);
        }
      });
    },
    getRowKey(row) {
      return row.id;
    },
    getTeamInfomation(id) {
      const vm = this;
      this.$axios.get(`/getteambyid?id=${id}`).then(res => {
        let imgUrl = '';
        if (res.data.data.imgUrl) {
          imgUrl = `${res.data.data.localhostImg}${res.data.data.imgUrl}`;
        } else {
          imgUrl = require('../../assets/team.jpg');
        }
        vm.fileList.push({ url: imgUrl });
        vm.TeamInformationVO = res.data.data;
        vm.TeamInformationVO.shopId = vm.TeamInformationVO.homeShopId;
        vm.TeamInformationVO.captainId = `${vm.TeamInformationVO.captainAccount}/${vm.TeamInformationVO.captainName}`;
      });
    },
    getTeamRatingList(type, id) {
      const data = {
        competitorType: type,
        id
      };
      this.$axios.post('/getRecord', this.$qs.stringify(data)).then(res => {
        if (res.data.errorCode) {
          this.$message(res.data.msg);
        } else {
          this.teamRatingList = res.data.data;
        }
      });
    },
    getRating(type, state = 0, year = 2020, id, currentType = 0) {
      const data = {
        competitorType: type,
        leagueType: state,
        year,
        id
      };
      this.$axios.post('/getRecordByDate', data).then(res => {
        this.quarterList = [];
        this.monthList = [];
        let name = '';
        let headName = '';
        let value = '';
        const list = res.data.data.quarterTotalList.concat(res.data.data.quarterAccumulatedList);
        const monthArr = res.data.data.monthTotalList.concat(res.data.data.monthAccumulatedList);
        // 数据处理
        for (let index = 0; index < 6; index += 1) {
          switch (index) {
          case 0:
            if (currentType === '1') {
              name = 'Monthly total';
            }
            name = name || 'Quarterly Total';
            headName = 'Rating';
            value = 'rating';
            break;
          case 1:
            headName = 'PPD';
            value = 'ppd';
            break;
          case 2:
            headName = 'MPR';
            value = 'mpr';
            break;
          case 3:
            name = 'Accumulated Total';
            headName = 'Rating';
            value = 'rating';
            break;
          case 4:
            headName = 'PPD';
            value = 'ppd';
            break;
          default:
            headName = 'MPR';
            value = 'mpr';
            break;
          }
          const quarterlyObj = {
            name,
            headName,
            Q1: list[0][value],
            Q2: list[1][value],
            Q3: list[2][value],
            Q4: list[3][value]
          };
          const monthObj = {
            name,
            headName,
            1: monthArr[0][value],
            2: monthArr[1][value],
            3: monthArr[2][value],
            4: monthArr[3][value],
            5: monthArr[4][value],
            6: monthArr[5][value],
            7: monthArr[6][value],
            8: monthArr[7][value],
            9: monthArr[8][value],
            10: monthArr[9][value],
            11: monthArr[10][value],
            12: monthArr[11][value]
          };
          this.quarterList.push(quarterlyObj);
          this.monthList.push(monthObj);
        }
      });
    },
    getEntryHistoryList() {
      this.$axios.post('/getEntryHistory', this.entryHistoryVO).then(res => {
        if (res.data.errorCode) {
          this.$message(res.data.msg);
        } else {
          this.entryHistoryList = res.data.data.list;
          this.entryHistoryTotal = res.data.data.total;
        }
      });
    },
    getScheduleResultList() {
      this.$axios.post('/getTeamSchedule', this.scheduleResultVO).then(res => {
        this.scheduleResultList = res.data.data.list;
        this.scheduleResultTotal = res.data.data.total;
      });
    },
    entryHistoryCurrentChange(value) {
      this.entryHistoryVO.pageNum = value;
      this.$axios.post('/getEntryHistory', this.entryHistoryVO).then(res => {
        this.entryHistoryList = res.data.data.list;
        this.entryHistoryTotal = res.data.data.total;
      });
    },
    entryHistorySizeChange(value) {
      this.entryHistoryVO.pageSize = value;
      this.$axios.post('/getEntryHistory', this.entryHistoryVO).then(res => {
        this.entryHistoryList = res.data.data.list;
        this.entryHistoryTotal = res.data.data.total;
      });
    },
    typeChange(value) {
      this.getRating('team', value, this.rating.year, this.id, this.currentType);
    },
    yearChange(value) {
      this.getRating('team', this.rating.type, value, this.id, this.currentType);
    },
    tabClick(tab) {
      this.currentType = tab.index;
      this.getRating('team', this.rating.type, this.rating.year, this.id, tab.index);
    },
    entryHistoryTypeChange(value) {
      this.entryHistoryVO.leagueType = value;
      this.getEntryHistoryList();
    },
    addMemberSearch() {
      this.$axios.post('/getNoPlayTeamList', this.addMemberVO).then(res => {
        this.addMemberList = res.data.data.list;
        this.addMemberListTotal = res.data.data.total;
      });
    },
    addMemberListCurrentChange(val) {
      this.addMemberVO.pageNum = val;
      this.$axios.post('/getNoPlayTeamList', this.addMemberVO).then(res => {
        this.addMemberList = res.data.data.list;
      });
    },
    addMemberListSizeChange(val) {
      this.addMemberVO.pageSize = val;
      this.$axios.post('/getNoPlayTeamList', this.addMemberVO).then(res => {
        this.addMemberList = res.data.data.list;
      });
    },
    scheduleResultListCurrentChange(val) {
      this.scheduleResultVO.pageNum = val;
      this.$axios.post('/getTeamSchedule', this.scheduleResultVO).then(res => {
        this.scheduleResultList = res.data.data.list;
        this.scheduleResultTotal = res.data.data.total;
      });
    },
    scheduleResultListSizeChange(val) {
      this.scheduleResultVO.pageSize = val;
      this.$axios.post('/getTeamSchedule', this.scheduleResultVO).then(res => {
        this.scheduleResultList = res.data.data.list;
        this.scheduleResultTotal = res.data.data.total;
      });
    },
    getPlayerList() {
      this.$axios.post('/getPlayerTeamList', this.playerVO).then(res => {
        this.playerList = res.data.data.list;
        this.playerListTotal = res.data.data.total;
      });
    },
    playerListCurrentChange(val) {
      this.playerVO.pageNum = val;
      this.$axios.post('/getPlayerTeamList', this.playerVO).then(res => {
        this.playerList = res.data.data.list;
      });
    },
    playerListSizeChange(val) {
      this.playerVO.pageSize = val;
      this.$axios.post('/getPlayerTeamList', this.playerVO).then(res => {
        this.playerList = res.data.data.list;
        this.playerListTotal = res.data.data.total;
      });
    },
    leagueTypeChange(value) {
      this.scheduleResultVO.leagueType = value;
      this.$axios.post('/getTeamSchedule', this.scheduleResultVO).then(res => {
        this.scheduleResultList = res.data.data.list;
        this.scheduleResultTotal = res.data.data.total;
      });
    },
    scheduleResultYearChange(value) {
      this.scheduleResultVO.year = value;
      this.$axios.post('/getTeamSchedule', this.scheduleResultVO).then(res => {
        this.scheduleResultList = res.data.data.list;
        this.scheduleResultTotal = res.data.data.total;
      });
    },
    competitionIdChange(value) {
      this.scheduleResultVO.competitionId = value;
      this.$axios.post('/getTeamSchedule', this.scheduleResultVO).then(res => {
        this.scheduleResultList = res.data.data.list;
        this.scheduleResultTotal = res.data.data.total;
      });
    },
    matchStatusChange(value) {
      this.scheduleResultVO.matchStatus = value;
      this.$axios.post('/getTeamSchedule', this.scheduleResultVO).then(res => {
        this.scheduleResultList = res.data.data.list;
        this.scheduleResultTotal = res.data.data.total;
      });
    },
    getCompetitionList(id) {
      this.$axios.post(`/getTeamCompetitionList?teamId=${id}`).then(res => {
        this.competitionList = res.data.data;
      });
    },
    addMember() {
      this.addMemberTopBox = true;
    },
    addMemberSelectionChange(val) {
      this.addMemberSelectionList = val;
    },
    addAddMember() {
      const data = returnType(this.addMemberSelectionList, 'id');
      this.$axios.post('/playerIntoTeam', { playerIds: data, teamId: this.playerVO.teamId }).then(res => {
        this.$message(res.data.msg);
        this.getPlayerList();
      });
      this.addMemberTopBox = false;
    },
    captainSearch() {
      this.$axios.post('/getPlayerTeamList', this.captainDialogData).then(res => {
        this.captainList = res.data.data.list;
        this.captainListTotal = res.data.data.total;
      });
    },
    captainListSizeChange(value) {
      this.captainDialogData.pageSize = value;
      this.$axios.post('/getPlayerTeamList', this.captainDialogData).then(res => {
        this.captainList = res.data.data.list;
      });
    },
    captainListCurrentChange(value) {
      this.captainDialogData.pageNum = value;
      this.$axios.post('/getPlayerTeamList', this.captainDialogData).then(res => {
        this.captainList = res.data.data.list;
      });
    },
    setViceCaptain(id) {
      const obj = {
        isViceCaptain: 1,
        playerId: id,
        teamId: this.$route.query.id
      };
      this.$axios.post('/viceCaptain', this.$qs.stringify(obj)).then(res => {
        this.$message(res.data.msg);
        this.getPlayerList();
      });
    },
    cacelViceCaptain(id) {
      const obj = {
        isViceCaptain: 0,
        playerId: id,
        teamId: this.$route.query.id
      };
      this.$axios.post('/viceCaptain', this.$qs.stringify(obj)).then(res => {
        this.$message(res.data.msg);
        this.getPlayerList();
      });
    },
    deletePlayer(id) {
      this.$axios.get(`/teamRemovePlayer?id=${id}`).then(res => {
        this.$message(res.data.msg);
        this.getPlayerList();
      });
    },
    getShopList(value = ' ') {
      this.$axios.post(`/getshopByName?shopName=${value}`).then(res => {
        this.shopList = res.data.data;
      });
    },
    radioChange(data) {
      this.captain = `${data.userId}/${data.userName}`;
    },
    showCaptianList() {
      this.changeCaptain = true;
    },
    addCaptain() {
      if (this.captain) {
        this.TeamInformationVO.captainId = this.captain;
        this.changeCaptain = false;
      } else {
        this.$message(this.$t('all.tip550'));
      }
    },
    fileChange(file, fileList) {
      console.log(file);
      if (fileList.length > 1) {
        fileList.shift();
      }
    },
    uploadImg(data) {
      const vm = this;
      const File = data.file;
      const formData = new FormData();
      // 文件对象
      formData.append('file', File);
      // 其他参数
      formData.append('teamId', this.id);
      this.handleRemove();
      this.$axios({
        method: 'POST',
        url: '/addTeamImg',
        data: formData
      }).then(res => {
        if (res.data.errorCode) {
          vm.$message(res.data.msg);
          vm.$route.push('/');
        } else {
          vm.$message(res.data.msg);
        }
      });
    },
    topBoxSizeChange() {
      console.log('a');
    },
    topBoxcurrentChange() {
      console.log('a');
    },
    handleClick() {},
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          };
        }
        return {
          rowspan: 0,
          colspan: 0
        };
      }
      return '';
    },
    save() {
      this.editTeamInfo.id = this.TeamInformationVO.id;
      this.editTeamInfo.captainId = Number(this.TeamInformationVO.captainId.split('/')[0]);
      this.editTeamInfo.creatorId = this.TeamInformationVO.creatorId;
      this.editTeamInfo.shopId = this.TeamInformationVO.shopId;
      this.editTeamInfo.teamName = this.TeamInformationVO.teamName;
      this.$axios.post('/editorTeamInfo', this.editTeamInfo).then(res => {
        this.$message(res.data.msg);
        this.getPlayerList();
      });
    },
    handleRemove() {
      const data = {
        file: null,
        teamId: this.id
      };
      this.$axios.post('/addTeamImg', this.$qs.stringify(data)).then(() => {});
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style scoped>
.uploadBox >>> .el-upload-list {
  height: 150px;
  width: 150px;
}
.uploadBox {
  position: relative;
}
.labelBox {
  position: absolute;
  right: 0px;
  bottom: 0px;
  text-align: left;
}
.borderClass {
  border: 1px solid #eee;
  padding: 5px;
  box-sizing: border-box;
}
.el-table >>> td,
.el-table >>> th {
  text-align: center;
}
.tableClass {
  position: relative;
}
.SelectClass {
  position: absolute;
  top: 0px;
  left: 13%;
}
.buttonBox {
  display: flex;
  justify-content: flex-end;
}
.formImgBox {
  width: 80px;
  height: 80px;
}
.formImgBox img {
  width: 100%;
  height: 100%;
}
.label {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #1890ff;
  color: #eee;
  display: inline-block;
  cursor: pointer;
}
.tipBox {
  display: flex;
  text-align: center;
  line-height: 40px;
}
.tipBox div {
  border: 1px solid #eee;
  height: 40px;
  width: 50%;
}
.tableButtonBox {
  margin: 5px 0;
}
/* .mergeTitleone>>>.has-gutter>tr>th:first-child{
  position: relative;
  left: 7%;
  z-index: 1;
}
.mergeTitletwo>>>.has-gutter>tr>th:first-child{
  position: relative;
  left: 3.5%;
  z-index: 1;
} */
.dialogtable {
  height: 600px;
  overflow-y: auto;
}
</style>
