<template>
  <div class="content">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane :label="$t('all.tip446')" name="first">
        <el-row class="search">
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip456") }}
            </el-col>
            <el-col :span="3">
              <el-input v-model.number="searchPlayer.account" clearable :placeholder="$t('all.tip38')"> </el-input>
            </el-col>
            <el-col class="label-g" :span="2">
              {{ $t("all.tip259") }}
            </el-col>
            <el-col :span="3">
              <el-input v-model="searchPlayer.userName" clearable :placeholder="$t('all.tip38')"></el-input>
            </el-col>
            <el-col class="label-g" :span="2">
              {{ $t("all.tip260") }}
            </el-col>
            <el-col :span="3">
              <el-input v-model.number="searchPlayer.cardNember" clearable :placeholder="$t('all.tip38')"> </el-input>
            </el-col>
            <el-col class="label-g" :span="2">
              {{ $t("all.tip427") }}
            </el-col>
            <el-col :span="3">
              <el-select v-model="searchPlayer.cardType" :placeholder="$t('all.tip516')">
                <el-option :value="0" :label="$t('all.tip0')"></el-option>
                <el-option :value="1" :label="$t('all.tip68')"></el-option>
                <el-option :value="5" :label="$t('all.tip69')"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip442") }}
            </el-col>
            <el-col :span="3">
              <el-select v-model="searchPlayer.countryId" clearable :placeholder="$t('all.tip516')" @change="countryChange">
                <el-option v-for="item in countryList" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-select v-model="searchPlayer.areaId" clearable :placeholder="$t('all.tip516')">
                <el-option v-for="item in areaList" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="2">
              {{ $t("all.tip455") }}
            </el-col>
            <el-col :span="3">
              <el-select v-model="searchPlayer.homeShop" clearable :placeholder="$t('all.tip516')">
                <el-option v-for="item in shopList" :key="item.shopId" :label="item.shopName" :value="item.shopId"> </el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="2">
              {{ $t("all.tip208") }}
            </el-col>
            <el-col :span="3">
              <el-select v-model="searchPlayer.gender" :placeholder="$t('all.tip516')">
                <el-option :label="$t('all.tip0')" :value="null"></el-option>
                <el-option :label="$t('all.tip209')" :value="1"></el-option>
                <el-option :label="$t('all.tip210')" :value="0"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip154") }}
            </el-col>
            <el-col :span="3">
              <el-select v-model="ratingGrade" :placeholder="$t('all.tip516')">
                <el-option :label="$t('all.tip76')" value="league"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-select v-model="searchPlayer.timeSlot" :placeholder="$t('all.tip516')">
                <el-option :label="$t('all.tip378')" :value="0"></el-option>
                <el-option :label="$t('all.tip379')" :value="1"></el-option>
                <el-option :label="$t('all.tip380')" :value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-select v-model="searchPlayer.pmr" :placeholder="$t('all.tip516')">
                <el-option :label="$t('all.tip155')" :value="1"></el-option>
                <el-option :label="$t('all.tip156')" :value="2"></el-option>
                <el-option :label="$t('all.tip154')" :value="3"></el-option>
              </el-select>
            </el-col>
            <!-- <el-col :span="10">
              <el-select v-model="ratingGrade" :placeholder="$t('all.tip516')">
                <el-option :label="$t('all.tip64')" value="league"></el-option>
              </el-select>
              <el-select v-model="searchPlayer.timeSlot" :placeholder="$t('all.tip516')">
                <el-option :label="$t('all.tip378')" :value="0"></el-option>
                <el-option :label="$t('all.tip379')" :value="1"></el-option>
                <el-option :label="$t('all.tip380')" :value="2"></el-option>
              </el-select>
              <el-select v-model="searchPlayer.pmr" :placeholder="$t('all.tip516')">
                <el-option :label="$t('all.tip155')" :value="1"></el-option>
                <el-option :label="$t('all.tip156')" :value="2"></el-option>
                <el-option :label="$t('all.tip154')" :value="3"></el-option>
              </el-select>
            </el-col> -->
            <el-col :span="4" class="lineInputClass">
              <el-input v-model.number="searchPlayer.min" clearable :placeholder="$t('all.tip38')"></el-input> _
              <el-input v-model.number="searchPlayer.max" clearable :placeholder="$t('all.tip38')"></el-input>
            </el-col>
            <el-col :span="2" class="buttonBox">
              <el-button type="primary" size="mini" @click="PlayerSearch">{{ $t("all.tip10") }}</el-button>
              <!-- <el-button type="primary" size="mini" @click="PlayerDownload">{{ $t("all.tip521") }}</el-button> -->
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-col :span="1" class="buttonBox">
            <el-button type="primary" size="mini" @click="() => (this.playerDialog = true)">{{ $t("all.tip16") }}</el-button>
          </el-col>
        </el-row>
        <div class="table">
          <el-table :data="SearchPlayerTableData" border style="width: 100%">
            <el-table-column prop="date" :label="$t('all.tip80')" min-width="4%">
              <template slot-scope="scope">
                <div class="formImgBox">
                  <img v-if="scope.row.portrait" :src="scope.row.portrait" alt="" />
                  <img v-else :src="person" alt="" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="account" :label="$t('all.tip456')" min-width="4%"> </el-table-column>
            <el-table-column :label="$t('all.tip412')" min-width="4%">
              <template slot-scope="scope">
                <div class="tableLink" @click="push(scope.row.id)">{{ scope.row.nickName }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="teamName" :label="$t('all.tip316')" min-width="5%"> </el-table-column>
            <el-table-column prop="homeShop" :label="$t('all.tip455')" min-width="5%"> </el-table-column>
            <el-table-column :label="$t('all.tip426')" min-width="8%">
              <template slot-scope="scope">
                <div v-for="card in scope.row.cardList" :key="card.cardId" class="leagueImgBox">
                  {{ card.cardNumber }}
                  <img v-if="card.cardType === 1 || card.cardType === 2" class="leagueImg" :src="staticObj.adartsImg" />
                  <img v-if="card.cardType === 5" class="leagueImg" :src="staticObj.leagueImg" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="countryName" :label="$t('all.tip17')" min-width="4%">
              <!-- <template slot-scope="scope">
                <div v-for="item in scope.row.countryList" :key="item.index">
                  {{ item.countryName }}
                </div>
              </template> -->
            </el-table-column>
            <el-table-column prop="areaName" :label="$t('all.tip442')" min-width="4%">
              <!-- <template slot-scope="scope">
                <div v-for="item in scope.row.countryList" :key="item.index">
                  {{ item.areaName }}
                </div>
              </template> -->
            </el-table-column>
            <el-table-column :label="$t('all.tip208')" min-width="3%">
              <template slot-scope="scope">
                <div v-if="scope.row.gender === 0">{{ $t("all.tip210") }}</div>
                <div v-if="scope.row.gender === 1">{{ $t("all.tip209") }}</div>
              </template>
            </el-table-column>
            <el-table-column label="Adarts">
              <el-table-column prop="adartsRating" :label="$t('all.tip154')" min-width="4%">
                <template slot-scope="scope">
                  <div>{{ scope.row.adartsRating }}</div>
                  <div v-if="scope.row.adartsRatingNum">{{ `(${scope.row.adartsRatingNum})` }}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('all.tip155')" min-width="3%">
                <template slot-scope="scope">
                  <div>{{ scope.row.adartsPPd }}</div>
                  <div v-if="scope.row.adartsPPdNum">{{ `(${scope.row.adartsPPdNum})` }}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('all.tip156')" min-width="3%">
                <template slot-scope="scope">
                  <div>{{ scope.row.adartsMpr }}</div>
                  <div v-if="scope.row.adartsMprNum">{{ `(${scope.row.adartsMprNum})` }}</div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="address" :label="$t('all.tip1')" min-width="3%">
              <el-table-column prop="leagueRating" :label="$t('all.tip154')" min-width="4%"> </el-table-column>
              <el-table-column prop="leaguePPd" :label="$t('all.tip155')" min-width="3%">
                <template slot-scope="scope">
                  <div>{{ scope.row.leaguePPd }}</div>
                  <div v-if="scope.row.leaguePPdNum">{{ `(${scope.row.leaguePPdNum})` }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="leagueMpr" :label="$t('all.tip156')" min-width="3%">
                <template slot-scope="scope">
                  <div>{{ scope.row.leagueMpr }}</div>
                  <div>{{ `(${scope.row.leagueMprNum})` }}</div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="address" :label="$t('all.tip491')" min-width="3%">
              <el-table-column prop="totalRating" :label="$t('all.tip154')" min-width="4%"> </el-table-column>
              <el-table-column :label="$t('all.tip155')" min-width="3%">
                <template slot-scope="scope">
                  <div>{{ scope.row.totalPPd }}</div>
                  <div>{{ `(${scope.row.totalPPdNum})` }}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('all.tip156')" min-width="3%">
                <template slot-scope="scope">
                  <div>{{ scope.row.totalMpr }}</div>
                  <div>{{ `(${scope.row.totalMprNum})` }}</div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="address" :label="$t('all.tip128')" min-width="3%">
              <el-table-column prop="participationLg" :label="$t('all.tip1')" min-width="3%"> </el-table-column>
              <el-table-column prop="participationSum" :label="$t('all.tip386')" min-width="3%"> </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            @size-change="SearchPlayerHandleSizeChange"
            @current-change="SearchPlayerHandleCurrentChange"
            :current-page="1"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="SearchPlayerPageTotal"
          >
          </el-pagination>
        </div>
        <el-dialog :title="$t('all.tip422')" :visible.sync="playerDialog">
          <el-row class="center-Row">
            <el-col class="label-g" :span="4">
              {{ $t("all.tip456") }}
            </el-col>
            <el-col :span="8">
              <el-input v-model="dialog.userId" clearable :placeholder="$t('all.tip38')"></el-input>
            </el-col>
            <el-col class="label-g" :span="4">
              {{ $t("all.tip424") }}
            </el-col>
            <el-col :span="8">
              <el-input v-model="password" type="password" clearable :placeholder="$t('all.tip38')"> </el-input>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col class="label-g" :span="4">
              {{ $t("all.tip425") }}
            </el-col>
            <el-col :span="8">
              <el-input v-model="dialog.nickName" clearable :placeholder="$t('all.tip38')"></el-input>
            </el-col>
            <el-col class="label-g" :span="4">
              {{ $t("all.tip208") }}
            </el-col>
            <el-col :span="8" class="lineClass">
              <el-radio v-model="dialog.gender" :label="1">{{ $t("all.tip209") }}</el-radio>
              <el-radio v-model="dialog.gender" :label="0">{{ $t("all.tip210") }}</el-radio>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col class="label-g" :span="4">
              {{ $t("all.tip428") }}
            </el-col>
            <el-col :span="8">
              <el-input v-model="dialog.email" clearable :placeholder="$t('all.tip38')" @blur="checkEmail"> </el-input>
            </el-col>
            <el-col class="label-g" :span="4">
              {{ $t("all.tip429") }}
            </el-col>
            <el-col :span="8">
              <el-input v-model="dialog.phone" clearable :placeholder="$t('all.tip38')" @blur="checkPhone"> </el-input>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col class="label-g" :span="4">
              {{ $t("all.tip455") }}
            </el-col>
            <el-col :span="8" id="divBoxWidth">
              <el-select v-model="dialog.homeShopId" clearable :placeholder="$t('all.tip516')" @change="shopChange">
                <el-option v-for="item in shopList" :key="item.shopId" :label="item.shopName" :value="item.shopId"> </el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="4">
              {{ $t("all.tip389") }}
            </el-col>
            <el-col :span="8" id="divBoxWidth">
              <el-date-picker v-model="dialog.regDate" type="date" :placeholder="$t('all.tip516')" clearable> </el-date-picker>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col class="label-g" :span="4">
              {{ $t("all.tip260") }}
            </el-col>
            <el-col :span="8">
              <el-input v-model.number="dialog.cardNumber" clearable :placeholder="$t('all.tip38')"></el-input>
            </el-col>
          </el-row>
          <el-row class="DialogButton">
            <el-col :span="2" class="buttonBox">
              <el-button type="primary" size="mini" @click="save">{{ $t("all.tip136") }}</el-button>
            </el-col>
          </el-row>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane :label="$t('all.tip447')" name="two">
        <div class="search">
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip4") }}
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="searchByCompetition.countryId" clearable :placeholder="$t('all.tip516')" @change="otherCountryChange">
                <el-option v-for="item in countryList" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="searchByCompetition.areaId" clearable :placeholder="$t('all.tip516')">
                <el-option v-for="item in areaList" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip6") }}
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="searchByCompetition.status" :placeholder="$t('all.tip516')">
                <el-option :value="0" :label="$t('all.tip0')"></el-option>
                <el-option :value="1" :label="$t('all.tip26')"></el-option>
                <el-option :value="2" :label="$t('all.tip27')"></el-option>
                <el-option :value="3" :label="$t('all.tip28')"></el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip9") }}
            </el-col>
            <el-col :span="3">
              <el-select v-model="searchByCompetition.operId" clearable :placeholder="$t('all.tip516')">
                <el-option v-for="item in operList" :key="item.id" :label="item.operName" :value="item.id"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip7") }}
            </el-col>
            <el-col :span="3">
              <el-date-picker v-model="searchByCompetition.competitionStartPeriod" type="date" :placeholder="$t('all.tip516')"> </el-date-picker>
            </el-col>
            <el-col :span="3">
              <el-date-picker v-model="searchByCompetition.competitionEndPeriod" type="date" :placeholder="$t('all.tip516')"> </el-date-picker>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip5") }}
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="searchByCompetition.type" :placeholder="$t('all.tip516')">
                <el-option :value="0" :label="$t('all.tip0')"></el-option>
                <el-option :value="1" :label="$t('all.tip42')"></el-option>
                <el-option :value="2" :label="$t('all.tip43')"></el-option>
              </el-select>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip382") }}
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="searchByCompetition.userId" clearable :placeholder="$t('all.tip516')">
                <el-option v-for="item in creteList" :key="item.creatorId" :label="item.creatorName" :value="item.creatorId"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip8") }}
            </el-col>
            <el-col :span="3" class="lineClass">
              <el-select v-model="searchByCompetition.competitionName" clearable filterable :placeholder="$t('all.tip516')">
                <el-option v-for="(item, index) in competitionNameList" :key="index" :label="item" :value="item"> </el-option>
              </el-select>
            </el-col>
            <el-col :span="2" class="buttonBox">
              <el-button size="mini" type="primary" @click="competitionSearch">{{ $t("all.tip10") }}</el-button>
              <!-- <el-button size="mini" type="primary" @click="CompetitionDownload">{{ $t("all.tip11") }}</el-button> -->
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table :data="SearchByCompetitionTableData" border style="width: 100%">
            <el-table-column :label="$t('all.tip80')" min-width="4%">
              <template slot-scope="scope">
                <div class="formImgBox">
                  <img v-if="scope.row.portrait" :src="scope.row.portrait" alt="" />
                  <img v-else :src="person" alt="" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="account" :label="$t('all.tip456')" min-width="4%"> </el-table-column>
            <el-table-column :label="$t('all.tip412')" min-width="6%">
              <template slot-scope="scope">
                <div class="tableLink" @click="push(scope.row.id)">{{ scope.row.nickName }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="teamName" :label="$t('all.tip316')" min-width="5%"> </el-table-column>
            <!-- <el-table-column prop="homeShop"  :label="$t('all.tip455')" min-width="5%"> </el-table-column>
            <el-table-column  :label="$t('all.tip426')" min-width="5%">
              <template slot-scope="scope">
                <div>{{ `${scope.row.cardNumber}` }}({{ scope.row.cardType === 5 ? $t("all.tip69") : $t("all.tip68") }})</div>
              </template>
            </el-table-column> -->
            <el-table-column prop="countryName" :label="$t('all.tip17')" min-width="4%"></el-table-column>
            <el-table-column prop="areaName" :label="$t('all.tip442')" min-width="3%"></el-table-column>
            <el-table-column label="Adarts">
              <el-table-column prop="adartsRating" :label="$t('all.tip154')" min-width="3%">
                <template slot-scope="scope">
                  <div>{{ scope.row.adartsRating }}</div>
                  <div v-if="scope.row.adartsRatingNum">{{ `(${scope.row.adartsRatingNum})` }}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('all.tip155')" min-width="3%">
                <template slot-scope="scope">
                  <div>{{ scope.row.adartsPPd }}</div>
                  <div v-if="scope.row.adartsPPdNum">{{ `(${scope.row.adartsPPdNum})` }}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('all.tip156')" min-width="3%">
                <template slot-scope="scope">
                  <div>{{ scope.row.adartsMpr }}</div>
                  <div v-if="scope.row.adartsMprNum">{{ `(${scope.row.adartsMprNum})` }}</div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="address" :label="$t('all.tip1')" min-width="3%">
              <el-table-column prop="leagueRating" :label="$t('all.tip154')" min-width="3%"> </el-table-column>
              <el-table-column :label="$t('all.tip155')" min-width="3%">
                <template slot-scope="scope">
                  <div>{{ scope.row.leaguePPd }}</div>
                  <div v-if="scope.row.leaguePPdNum">{{ `(${scope.row.leaguePPdNum})` }}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('all.tip156')" min-width="3%">
                <template slot-scope="scope">
                  <div>{{ scope.row.leagueMpr }}</div>
                  <div v-if="scope.row.leagueMprNum">{{ `(${scope.row.leagueMprNum})` }}</div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="address" :label="$t('all.tip1') + '(' + $t('all.tip439') + ')'" min-width="3%">
              <el-table-column prop="totalRating" :label="$t('all.tip154')" min-width="3%"> </el-table-column>
              <el-table-column :label="$t('all.tip155')" min-width="3%">
                <template slot-scope="scope">
                  <div>{{ scope.row.totalPPd }}</div>
                  <div v-if="scope.row.totalPPdNum">{{ `(${scope.row.totalPPdNum})` }}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('all.tip156')" min-width="3%">
                <template slot-scope="scope">
                  <div>{{ scope.row.totalMpr }}</div>
                  <div v-if="scope.row.totalMprNum">{{ `(${scope.row.totalMprNum})` }}</div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="address" :label="$t('all.tip128')" min-width="3%">
              <el-table-column prop="participationLg" :label="$t('all.tip1')" min-width="3%"> </el-table-column>
              <el-table-column prop="participationSum" :label="$t('all.tip386')" min-width="3%"> </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="leagueTotal"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
// import md5 from "blueimp-md5";
import { downloadFile, staticObj } from "@/components/common/Utils";

export default {
  name: "PlayerMgmt",
  components: {},
  data() {
    return {
      staticObj,
      person: require("../../assets/img/person.jpg"),
      password: "",
      userId: "",
      playerDialog: false,
      name: "",
      activeName: "first",
      ratingGrade: "league",
      shopList: [],
      countryList: [],
      areaList: [],
      operList: [],
      creteList: [],
      leagueTotal: 0,
      SearchPlayerPageTotal: 0,
      SearchPlayerTableData: [],
      SearchByCompetitionTableData: [],
      competitionNameList: [],
      searchPlayer: {
        account: "",
        userName: "",
        cardNember: "",
        gender: null,
        countryId: "",
        areaId: "",
        homeShop: "",
        cardType: 0,
        timeSlot: 0,
        pmr: 3,
        min: null,
        max: null,
        pageNum: 1,
        pageSize: 10
      },
      searchByCompetition: {
        countryId: "",
        areaId: "",
        status: 0,
        type: 0,
        competitionStartPeriod: "",
        competitionEndPeriod: "",
        competitionName: "",
        userId: "",
        operId: "",
        pageNum: 1,
        pageSize: 10
      },
      dialog: {
        userId: "",
        password: "",
        nickName: "",
        gender: 1,
        email: "",
        phone: "",
        homeShopId: "",
        homeShopName: "",
        regDate: ""
      }
    };
  },
  mounted() {
    this.userId = sessionStorage.getItem("LeagueUserId");
    this.name = this.$route.params.name;
    this.getCounry(this.userId);
    this.PlayerSearch();
    this.competitionSearch();
    this.getShopList(this.userId);
    this.getOperationdata(this.userId);
    this.getCretetionData(this.userId);
    this.getAllCompetitionName(this.userId);
  },
  methods: {
    checkEmail() {
      const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!reg.test(this.dialog.email)) {
        this.$message(`【${this.$t("all.tip428")}】${this.$t("all.tip572")}`);
        this.dialog.email = "";
      }
    },
    checkPhone() {
      const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
      if (!reg.test(this.dialog.phone)) {
        this.$message(`【${this.$t("all.tip429")}】${this.$t("all.tip572")}`);
        this.dialog.phone = "";
      }
    },
    getAllCompetitionName(userId) {
      this.$axios.get(`/getAllCompetitionName?userId=${userId}`).then(res => {
        if (res.data.data) {
          this.password = res.data.data.password;
          this.competitionNameList = res.data.data;
        }
      });
    },
    getCounry(userId) {
      this.$axios.post("/getcountry", this.$qs.stringify({ creatorId: userId })).then(res => {
        this.countryList = res.data.data;
      });
    },
    countryChange(value) {
      this.$axios.post("/getareabycountryid", this.$qs.stringify({ countryId: value })).then(res => {
        this.areaList = res.data.data;
      });
      this.searchPlayer.areaId = "";
    },
    otherCountryChange(value) {
      this.$axios.post("/getareabycountryid", this.$qs.stringify({ countryId: value })).then(res => {
        this.areaList = res.data.data;
      });
      this.searchByCompetition.areaId = "";
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
    competitionSearch() {
      this.$axios.post("/getPlayperCompList", this.searchByCompetition).then(res => {
        if (res.data.code === 1000) {
          this.SearchByCompetitionTableData = res.data.data.list;
          this.leagueTotal = res.data.data.total;
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    handleSizeChange(value) {
      this.searchByCompetition.pageSize = value;
      this.competitionSearch();
    },
    handleCurrentChange(value) {
      this.searchByCompetition.pageNum = value;
      this.competitionSearch();
    },
    PlayerSearch() {
      this.$axios.post("/getPlayperList", this.searchPlayer).then(res => {
        if (res.data.code === 1000) {
          this.SearchPlayerPageTotal = res.data.data.total;
          this.SearchPlayerTableData = res.data.data.list;
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    SearchPlayerHandleSizeChange(value) {
      this.searchPlayer.pageSize = value;
      this.PlayerSearch();
    },
    SearchPlayerHandleCurrentChange(value) {
      this.searchPlayer.pageNum = value;
      this.PlayerSearch();
    },
    getShopList(userId) {
      this.$axios.post("/getshop", this.$qs.stringify({ userId })).then(res => {
        this.shopList = res.data.data.list;
      });
    },
    PlayerDownload() {
      this.$axios.post("/exportPlayperList", this.searchPlayer).then(res => {
        downloadFile(res);
      });
    },
    shopChange(value) {
      this.shopList.forEach(i => {
        if (i.shopId === value) {
          this.dialog.homeShopName = i.shopName;
        }
      });
    },
    save() {
      const vm = this;
      // this.dialog.password = md5(`${this.password}kitekey`).toUpperCase();
      this.dialog.password = this.password;
      this.$axios.post("/createPlayer", vm.dialog).then(res => {
        if (res.data.code === 1000) {
          this.PlayerSearch();
          this.playerDialog = false;
          this.dialog = {
            userId: "",
            password: "",
            nickName: "",
            gender: 1,
            cardType: "",
            email: "",
            phone: "",
            homeShopId: "",
            homeShopName: "",
            regDate: ""
          };
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    push(id) {
      this.$router.push({
        name: "playerInformation",
        query: {
          id
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
.tableLink {
  color: #1890ff;
  cursor: pointer;
}
.lineInputClass {
  display: flex;
}
</style>
