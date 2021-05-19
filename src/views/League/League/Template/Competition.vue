<template>
  <div>
    <div class="box">
      <el-row class="buttonClass">
        <!-- <el-col :span="2">
          <el-button size="mini" type="info" @click="Delete">{{ $t("all.tip130") }}</el-button>
        </el-col> -->
        <el-col :span="2">
          <el-button size="mini" type="primary" @click="saveCompetition">{{ $t("all.tip136") }}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="title-g">
          {{ $t("all.tip55") }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip5") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          {{ AddCompetitionRequest.competition.type == 1 ? "Local" : "Online" }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip4") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-button type="primary" size="mini" @click="SaveCompetitionAreaDialog">{{ $t("all.tip4") }}</el-button>
        </el-col>
        <el-col :span="14" style="display:flex" class="lineClass">
          <div v-for="(item, index) in CountryShowArr" :key="index">{{ item.countryName }}{{ item.areaName ? ">" + item.areaName : " " }};</div>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip7") }}
        </el-col>
        <el-col :span="8">
          <el-col :span="11">
            <el-date-picker
              v-model="AddCompetitionRequest.competition.competitionStartPeriod"
              type="datetime"
              :placeholder="$t('placeholder.datePicker')"
              default-time="00:00:00"
              @change="competitionStartTime"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="1" class="lineClass">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="AddCompetitionRequest.competition.competitionEndPeriod"
              type="datetime"
              :placeholder="$t('placeholder.datePicker')"
              default-time="23:59:59"
              :picker-options="competitionEndPeriodPickerOptions"
              @change="competitionEndTime"
            >
            </el-date-picker>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip56") }}
        </el-col>
        <el-col :span="8">
          <el-col :span="11">
            <el-date-picker v-model="AddCompetitionRequest.competition.entryStartPeriod" type="datetime" :placeholder="$t('placeholder.datePicker')" default-time="00:00:00" @change="entryDateChange">
            </el-date-picker>
          </el-col>
          <el-col :span="1" class="lineClass">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="AddCompetitionRequest.competition.entryEndPeriod"
              type="datetime"
              :placeholder="$t('placeholder.datePicker')"
              default-time="23:59:59"
              :picker-options="entryEndPeriodPickerOptions"
            >
            </el-date-picker>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip57") }}
        </el-col>
        <el-col :span="8">
          <el-col :span="11">
            <el-date-picker
              v-model="AddCompetitionRequest.competition.advertisementStartPeriod"
              type="datetime"
              :placeholder="$t('placeholder.datePicker')"
              default-time="00:00:00"
              @change="advertisementDateChange"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="1" class="lineClass">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="AddCompetitionRequest.competition.advertisementEndPeriod"
              type="datetime"
              :placeholder="$t('placeholder.datePicker')"
              default-time="23:59:59"
              :picker-options="advertisementEndPeriodPickerOptions"
            >
            </el-date-picker>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip58") }}
        </el-col>
        <el-col :span="8">
          <el-col :span="11">
            <el-date-picker
              v-model="AddCompetitionRequest.competition.resultStartPeriod"
              type="datetime"
              :placeholder="$t('placeholder.datePicker')"
              default-time="00:00:00"
              @change="resultDateChange"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="1" class="lineClass">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="AddCompetitionRequest.competition.resultEndPeriod"
              type="datetime"
              :placeholder="$t('placeholder.datePicker')"
              default-time="23:59:59"
              :picker-options="resultEndPeriodPickerOptions"
            >
            </el-date-picker>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip8") }}
        </el-col>
        <el-col :span="20">
          <el-input
            v-model.trim="AddCompetitionRequest.competition.competitionName"
            filterable
            :show-word-limit="showLimit"
            clearable
            maxlength="100"
            :placeholder="$t('placeholder.input')"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip59") }}
        </el-col>
        <el-col :span="20">
          <el-input
            v-model="AddCompetitionRequest.competition.competitionDescription"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4 }"
            :show-word-limit="showLimit"
            clearable
            maxlength="100"
            :placeholder="$t('placeholder.input')"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip60") }}
        </el-col>
        <el-col :span="20">
          <el-input
            v-model="AddCompetitionRequest.competition.rewardDescription"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4 }"
            :show-word-limit="showLimit"
            clearable
            maxlength="100"
            :placeholder="$t('placeholder.input')"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip61") }}
        </el-col>
        <el-col :span="20">
          <el-input
            v-model="AddCompetitionRequest.competition.gameTypeDescription"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4 }"
            :show-word-limit="showLimit"
            clearable
            maxlength="100"
            :placeholder="$t('placeholder.input')"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip62") }}
        </el-col>
        <el-col :span="20">
          <el-upload
            :http-request="uploadImg"
            class="uploadBg"
            action=" "
            ref="upload"
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :multiple="false"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-col>
      </el-row>
      <!-- <el-dialog :title="$t('all.tip62')" center :visible.sync="showPhotoDialog">
        <el-upload id="selectPhoto" action="http://192.168.2.105:9091/darts/addcompetition" list-type="picture-card" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="fileList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="selectPhoto" type="primary" size="mini">{{ $t("all.tip135") }}</el-button>
        </span>
      </el-dialog> -->
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip63") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-button type="primary" size="mini" @click="AssignOperatorer" :disabled="userType === '5'">{{ $t("all.tip476") }}</el-button>
        </el-col>
        <el-col :span="14" style="display:flex" class="lineClass">
          <div v-for="item in operatorSelectionList" :key="item.index">
            <span>{{ item.operName || item.operatorName }}{{ ";" }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-row>
        <el-col class="title-g">
          {{ $t("all.tip66") }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip427") }}
        </el-col>
        <el-col :span="20">
          <el-select v-model="AddCompetitionRequest.competitionOption.cardType" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip70')"></el-option>
            <el-option :value="2" :label="$t('all.tip69')"></el-option>
            <el-option :value="3" :label="$t('all.tip68')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip467") }}
        </el-col>
        <el-col :span="20">
          <el-select v-model="AddCompetitionRequest.competitionOption.ratingType" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip468')"></el-option>
            <el-option :value="2" :label="$t('all.tip469')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip71") }}
        </el-col>
        <el-col :span="20">
          <el-select v-model="AddCompetitionRequest.competitionOption.rankingDecision" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip72')"></el-option>
            <el-option :value="2" :label="$t('all.tip73')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip74") }}
        </el-col>
        <el-col :span="20">
          <el-select v-model="AddCompetitionRequest.competitionOption.rankingCalculationScope" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip21')"></el-option>
            <el-option :value="2" :label="$t('all.tip52')"></el-option>
            <el-option :value="3" :label="$t('all.tip51')"></el-option>
            <el-option :value="4" :label="$t('all.tip3')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip75") }}
        </el-col>
        <el-col :span="20">
          <el-select v-model="AddCompetitionRequest.competitionOption.rankingDecision" :placeholder="$t('placeholder.select')">
            <el-option value="1" :label="$t('all.tip51')"></el-option>
            <el-option value="3" :label="$t('all.tip3')"></el-option>
          </el-select>
        </el-col>
      </el-row> -->
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip78") }}
        </el-col>
        <el-col :span="20">
          <el-select v-model="AddCompetitionRequest.competitionOption.photoRecord" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip470')"></el-option>
            <el-option :value="2" :label="$t('all.tip80')"></el-option>
            <el-option :value="3" :label="$t('all.tip81')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip88") }}
        </el-col>
        <el-col :span="20">
          <el-select v-model="AddCompetitionRequest.competitionOption.entryPhotoShooting" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip87')"></el-option>
            <el-option :value="2" :label="$t('all.tip86')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip85") }}
        </el-col>
        <el-col :span="20">
          <el-select v-model="AddCompetitionRequest.competitionOption.approveEntry" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip87')"></el-option>
            <el-option :value="2" :label="$t('all.tip86')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip82") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="AddCompetitionRequest.competitionOption.entryFee" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip84')"></el-option>
            <el-option :value="2" :label="$t('all.tip83')"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <div v-if="AddCompetitionRequest.competitionOption.entryFee === 1">
            <el-input v-model="AddCompetitionRequest.competitionOption.entryFeePay" :show-word-limit="showLimit" clearable maxlength="100" :placeholder="$t('placeholder.input')"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip89") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-checkbox v-model="A1">{{ $t("all.tip471") }}</el-checkbox>
          <el-checkbox v-model="W1">{{ $t("all.tip472") }}</el-checkbox>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip489") }}
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-button type="primary" size="mini" @click="ShopDialogClick">{{ $t("all.tip91") }}</el-button>
        </el-col>
        <el-col :span="2" class="cursor lineClass">
          <div @click="showDetails">{{ `shop(${this.showShopList.length})` }}</div>
        </el-col>
      </el-row>
    </div>
    <!--  Competition Basic Option -->
    <div class="box">
      <el-row>
        <el-col class="title-g">
          {{ $t("all.tip93") }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip95") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="AddCompetitionRequest.competitionBasicOption.participationType" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip244')"></el-option>
            <el-option :value="2" :label="$t('all.tip311')"></el-option>
          </el-select>
        </el-col>
        <el-col :span="16" v-if="AddCompetitionRequest.competitionBasicOption.participationType === 1">
          <el-col class="label-g" :span="4">{{ $t("all.tip96") }}</el-col>
          <el-col :span="4">
            <el-select v-model="AddCompetitionRequest.competitionBasicOption.includeWoman" :placeholder="$t('placeholder.select')">
              <el-option :value="1" :label="$t('all.tip87')"></el-option>
              <el-option :value="2" :label="$t('all.tip86')"></el-option>
            </el-select>
          </el-col>
          <div v-if="AddCompetitionRequest.competitionBasicOption.includeWoman === 1">
            <el-col :span="4">
              <el-input v-model.number="AddCompetitionRequest.competitionBasicOption.womanNum" clearable :placeholder="$t('placeholder.input')"></el-input>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="5">
          {{ $t("all.tip97") }}
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip98") }}
        </el-col>
        <el-col :span="3">
          <el-input v-model.number="AddCompetitionRequest.competitionBasicOption.minimum" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip99") }}
        </el-col>
        <el-col :span="3">
          <el-input v-model.number="AddCompetitionRequest.competitionBasicOption.maximum" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip94") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="AddCompetitionRequest.competitionBasicOption.playerChangeAvailable" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip87')"></el-option>
            <el-option :value="2" :label="$t('all.tip86')"></el-option>
          </el-select>
        </el-col>
        <div v-show="AddCompetitionRequest.competitionBasicOption.playerChangeAvailable === 1">
          <el-col :span="4">
            <el-input v-model.number="AddCompetitionRequest.competitionBasicOption.playerChangeNumber" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col :span="4">
            <el-select v-model="AddCompetitionRequest.competitionBasicOption.playerChangeType" :placeholder="$t('placeholder.select')">
              <el-option :value="0" :label="$t('all.tip523')"></el-option>
              <el-option :value="1" label="Set"></el-option>
              <el-option :value="2" label="Leg"></el-option>
            </el-select>
          </el-col>
        </div>
      </el-row>
      <el-row>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip106") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="AddCompetitionRequest.competitionBasicOption.forceAttend" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip87')"></el-option>
            <el-option :value="2" :label="$t('all.tip86')"></el-option>
          </el-select>
        </el-col>
        <el-col v-show="AddCompetitionRequest.competitionBasicOption.forceAttend === 1" :span="4">
          <el-input v-model.number="AddCompetitionRequest.competitionBasicOption.forceAttendNumber" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip100") }}
        </el-col>
        <el-col class="label-g" :span="1.5">
          {{ $t("all.tip101") }}
        </el-col>
        <el-col :span="2">
          <el-input v-model.number="timeRangeBefore" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="1">
          {{ $t("all.tip102") }}
        </el-col>
        <el-col :span="2">
          <el-input v-model.number="timeRangeBeforehours" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="2"> {{ $t("all.tip285") }}-{{ $t("all.tip104") }} </el-col>
        <el-col :span="2">
          <el-input v-model.number="timeRangeAfter" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="1">
          {{ $t("all.tip102") }}
        </el-col>
        <el-col :span="2">
          <el-input v-model.number="timeRangeAfterhours" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="1">
          {{ $t("all.tip285") }}
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip72") }}
        </el-col>
        <el-col class="label-g" :span="1">
          {{ $t("all.tip107") }}
        </el-col>
        <el-col :span="3">
          <el-input v-model.number="AddCompetitionRequest.competitionBasicOption.winningPointWin" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="1.5">
          {{ $t("all.tip108") }}
        </el-col>
        <el-col :span="3">
          <el-input v-model.number="AddCompetitionRequest.competitionBasicOption.winningPointDrawn" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="1">
          {{ $t("all.tip109") }}
        </el-col>
        <el-col :span="3">
          <el-input v-model.number="AddCompetitionRequest.competitionBasicOption.winningPointLose" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip586") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="AddCompetitionRequest.competitionBasicOption.giveUp" :placeholder="$t('placeholder.select')">
            <el-option v-for="item in giveUpList" :label="$t(item.label)" :key="item.value" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip466") }}
        </el-col>
        <el-col :span="20">
          <el-select v-model="AddCompetitionRequest.competitionBasicOption.setFirst" :placeholder="$t('placeholder.select')">
            <el-option v-for="item in setFirstList" :label="$t(item.label)" :key="item.value" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip522") }}
        </el-col>
        <el-col :span="20">
          <el-select v-model="AddCompetitionRequest.competitionBasicOption.legScoreDraw" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip116')"></el-option>
            <el-option :value="2" :label="$t('all.tip473')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip117") }}
        </el-col>
        <el-col :span="20">
          <el-select v-model="AddCompetitionRequest.competitionBasicOption.lineUpType" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip118')"></el-option>
            <el-option :value="2" :label="$t('all.tip295')"></el-option>
            <el-option :value="3" :label="$t('all.tip474')"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip119") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="AddCompetitionRequest.competitionBasicOption.lineUpDeadline" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip87')"></el-option>
            <el-option :value="2" :label="$t('all.tip86')"></el-option>
          </el-select>
        </el-col>
        <div v-show="AddCompetitionRequest.competitionBasicOption.lineUpDeadline === 1">
          <el-col class="label-g" :span="3">
            {{ $t("all.tip120") }}
          </el-col>
          <el-col class="label-g" :span="1.5">
            {{ $t("all.tip101") }}
          </el-col>
          <el-col :span="2">
            <el-input v-model.number="fromMatchTimeBefore" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col class="label-g" :span="1.5">
            {{ $t("all.tip102") }}
          </el-col>
          <el-col :span="2">
            <el-input v-model.number="fromMatchTimeBeforeHours" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col class="label-g" :span="1.5">
            {{ $t("all.tip285") }}
          </el-col>
          <el-col :span="2">
            <el-input v-model.number="fromMatchTimeBeforeMinute" clearable :placeholder="$t('placeholder.input')"></el-input>
          </el-col>
          <el-col class="label-g" :span="1.5">
            {{ $t("all.tip121") }}
          </el-col>
        </div>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip122") }}
        </el-col>
        <el-col :span="4">
          <el-input v-model.number="AddCompetitionRequest.competitionBasicOption.entryMaxSetCount" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip124") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="AddCompetitionRequest.competitionBasicOption.entryType" :placeholder="$t('placeholder.select')">
            <el-option :value="1" :label="$t('all.tip125')"></el-option>
            <el-option :value="2" :label="$t('all.tip126')"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-input v-model.number="AddCompetitionRequest.competitionBasicOption.entryTypeNum" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <div class="box">
        <el-row>
          <el-col class="title-g">
            {{ $t("all.tip127") }}
          </el-col>
        </el-row>
        <el-table :data="categoryList" border>
          <el-table-column prop="category" :label="$t('all.tip51')" min-width="13%"> </el-table-column>
          <el-table-column prop="classType" :label="$t('all.tip530')" min-width="10%"> </el-table-column>
          <el-table-column prop="division" :label="$t('all.tip52')" min-width="9%"> </el-table-column>
          <el-table-column min-width="6%">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleCategoryDelete(scope.row.id)">{{ $t("all.tip130") }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="$t('all.tip9')" :visible.sync="OperAtorDialog">
      <el-row class="center-Row">
        <el-col class="label-g" :span="5">
          {{ $t("all.tip140") }}
        </el-col>
        <el-col :span="5">
          <el-input v-model="searchOperator.operId" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="5">
          {{ $t("all.tip63") }}
        </el-col>
        <el-col :span="5">
          <el-input v-model="searchOperator.operName" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-button size="mini" type="primary" @click="OperAtorSearch">{{ $t("all.tip10") }}</el-button>
        </el-col>
      </el-row>
      <el-table :data="OperatorList" ref="operListRef" border :row-key="rowOperKey" @selection-change="OperatorSelection">
        <el-table-column type="selection" width="55" :reserve-selection="true"> </el-table-column>
        <el-table-column prop="id" :label="$t('all.tip140')" min-width="9%"> </el-table-column>
        <el-table-column prop="operName" :label="$t('all.tip63')" min-width="6%"> </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @size-change="operatorSizeChange"
          @current-change="operatorCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="operatorTotal"
        >
        </el-pagination>
      </div>
      <div slot="footer" class="DialogButton">
        <el-button size="mini" @click="Select" type="primary">{{ $t("all.tip135") }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('all.tip91')" :visible.sync="ShopDialog" top="5vh">
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip17") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="Shop.countryId" clearable :placeholder="$t('placeholder.select')">
            <el-option v-for="item in ContinentArr" :key="item.id" :label="item.label" :value="item.id" clearable></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip442") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="Shop.areaId" clearable :placeholder="$t('placeholder.select')">
            <el-option v-for="item in CountryArr" :key="item.id" :label="item.label" :value="item.id" clearable></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip142") }}
        </el-col>
        <el-col :span="4">
          <el-input v-model="Shop.shopName" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip141") }}
        </el-col>
        <el-col :span="4">
          <el-input v-model="Shop.shopId" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="2">
          {{ $t("all.tip457") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="Shop.agentId" :placeholder="$t('placeholder.select')" clearable>
            <el-option v-for="item in agentList" :key="item.creatorId" :label="item.creatorName" :value="item.creatorId"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-button size="mini" type="primary" @click="shopSearch">{{ $t("all.tip10") }}</el-button>
        </el-col>
      </el-row>
      <el-table ref="ShopListRef" :data="CompetitionOptionShopList" :row-key="rowKey" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" :reserve-selection="true"> </el-table-column>
        <el-table-column prop="country" :label="$t('all.tip17')" min-width="5%"> </el-table-column>
        <el-table-column prop="local1" :label="$t('all.tip442')" min-width="5%"> </el-table-column>
        <el-table-column prop="agent" :label="$t('all.tip457')" min-width="5%"> </el-table-column>
        <el-table-column prop="shopId" :label="$t('all.tip141')" min-width="5%"> </el-table-column>
        <el-table-column prop="shopName" :label="$t('all.tip142')" min-width="5%"> </el-table-column>
        <el-table-column prop="machine" :label="$t('all.tip295')" min-width="5%"> </el-table-column>
      </el-table>
      <div slot="footer" class="DialogButton">
        <el-button size="mini" @click="AddCompetition" type="primary">{{ $t("all.tip143") }}</el-button>
      </div>
      <div class="page">
        <el-pagination
          @size-change="showShopListSizeChange"
          @current-change="showShopListCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="showShopListTotal"
        >
        </el-pagination>
      </div>
    </el-dialog>
    <!-- // shoplist -->
    <el-dialog :title="$t('all.tip489')" :visible.sync="ShopList">
      <div class="table">
        <el-table ref="showShopListRef" :data="showShopList" border @selection-change="selectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="country" :label="$t('all.tip17')" min-width="5%"> </el-table-column>
          <el-table-column prop="local1" :label="$t('all.tip442')" min-width="5%"> </el-table-column>
          <el-table-column prop="shopId" :label="$t('all.tip141')" min-width="5%"> </el-table-column>
          <el-table-column prop="shopName" :label="$t('all.tip142')" min-width="5%"> </el-table-column>
          <el-table-column prop="machine" :label="$t('all.tip295')" min-width="5%"> </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="DialogButton">
        <el-button size="mini" @click="Remove" type="danger">{{ $t("all.tip134") }}</el-button>
      </div>
    </el-dialog>
    <!-- CompetitionAreaDialog -->
    <el-dialog :title="$t('all.tip4')" :visible.sync="CompetitionAreaDialog">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip17") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="countryId" @change="ContinentChange" clearable :default-first-option="true" :placeholder="$t('placeholder.select')">
            <el-option v-for="item in ContinentArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip442") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="areaId" @change="CountryChange" clearable :default-first-option="true" :placeholder="$t('placeholder.select')">
            <el-option v-for="item in CountryArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" class="lineClass">
          <el-button size="mini" @click="addContinent" type="primary">{{ $t("all.tip132") }}</el-button>
        </el-col>
      </el-row>
      <el-table :data="CompetitionAreaList" border>
        <el-table-column prop="countryName" :label="$t('all.tip17')" min-width="5%"> </el-table-column>
        <el-table-column prop="areaName" :label="$t('all.tip442')" min-width="5%"> </el-table-column>
        <el-table-column min-width="6%">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="cityDelete(scope.$index, scope.row)">{{ $t("all.tip130") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="DialogButton">
        <el-button size="mini" @click="CountrySave" type="primary">{{ $t("all.tip136") }}</el-button>
      </div>
    </el-dialog>
    <div>
      <DeleteDialog :deleteVisible="deleteVisible" @handleCancel="handleCancel" @handleOk="handleOk" />
    </div>
  </div>
</template>
<script>
import { changeMenus, changeCurrentObj, changeHash } from "@/components/common/Utils";
import DeleteDialog from "@/components/deleteDialog";

export default {
  name: "Competition",
  components: {
    DeleteDialog
  },
  data() {
    const vm = this;
    return {
      userType: sessionStorage.getItem("LeagueUserType"),
      competitionEndPeriodPickerOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.AddCompetitionRequest.competition.competitionStartPeriod);
          return time.getTime() < date1;
        }
      },
      entryEndPeriodPickerOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.AddCompetitionRequest.competition.entryStartPeriod);
          return time.getTime() < date1;
        }
      },
      advertisementEndPeriodPickerOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.AddCompetitionRequest.competition.advertisementStartPeriod);
          return time.getTime() < date1;
        }
      },
      resultEndPeriodPickerOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.AddCompetitionRequest.competition.resultStartPeriod);
          return time.getTime() < date1;
        }
      },
      uploadCompetitionId: "",
      countryId: "",
      areaId: "",
      showShopListTotal: 0,
      operatorSelectionList: [],
      removeList: [],
      setFirstList: [
        {
          value: 1,
          label: "all.tip323"
        },
        {
          value: 2,
          label: "all.tip112"
        },
        {
          value: 3,
          label: "all.tip113"
        }
      ],
      operatorTotal: 1,
      searchOperator: {
        userId: "",
        operId: "",
        operName: "",
        agentId: "",
        pageNo: 1,
        pageSize: 10
      },
      giveUpList: [
        {
          value: 0,
          label: "all.tip587"
        },
        {
          value: 1,
          label: "all.tip588"
        },
        {
          value: 2,
          label: "all.tip589"
        },
        {
          value: 3,
          label: "all.tip590"
        },
        {
          value: 4,
          label: "all.tip623"
        },
        {
          value: 5,
          label: "all.tip624"
        },
        {
          value: 6,
          label: "all.tip625"
        },
        {
          value: 7,
          label: "all.tip626"
        }
      ],
      timeRangeBefore: 0,
      timeRangeAfter: 0,
      timeRangeBeforehours: 4,
      timeRangeAfterhours: 4,
      fromMatchTimeBefore: 0,
      fromMatchTimeBeforeHours: 0,
      fromMatchTimeBeforeMinute: 45,
      // isCurrentSave: '',
      showLimit: true,
      dialogImageUrl: "",
      dialogVisible: false,
      showPhotoDialog: false,
      OperAtorDialog: false,
      CompetitionAreaDialog: false,
      ShopDialog: false,
      ShopList: false,
      disabled: false,
      deleteVisible: false,
      deleteCategoryId: 0,
      fileList: [],
      CompetitionOptionShopList: [],
      A1: true,
      W1: false,
      AddCompetitionRequest: {
        countryList: [],
        competition: {
          userId: "",
          userName: "",
          type: "",
          competitionStartPeriod: "",
          competitionEndPeriod: "",
          entryStartPeriod: "",
          entryEndPeriod: "",
          advertisementStartPeriod: "",
          advertisementEndPeriod: "",
          resultStartPeriod: "",
          resultEndPeriod: "",
          competitionName: "",
          competitionDescription: "",
          rewardDescription: "",
          gameTypeDescription: "",
          image: "",
          application: 0
        },
        competitionOption: {
          approveEntry: 1,
          cardType: 1,
          ratingType: 1,
          cdateInt: "",
          entryFee: 1,
          entryFeePay: 100,
          entryPhotoShooting: 1,
          id: "",
          machineType: "",
          photoRecord: 1,
          rankingCalculationScope: 2,
          rankingDecision: 2
        },
        competitionBasicOption: {
          cdateInt: "",
          // entryMaxLegCount: '',
          // entryMaxModeCount: '',
          entryMaxSetCount: 9,
          entryType: 2,
          entryTypeNum: 0,
          forceAttend: 2,
          forceAttendNumber: 1,
          fromMatchTimeBefore: 0,
          id: "",
          includeWoman: 2,
          legScoreDraw: 1,
          lineUpDeadline: 1,
          lineUpType: 1,
          maximum: 99,
          minimum: 1,
          participationType: 1,
          playerChangeAvaila: "",
          playerChangeNumber: 0,
          playerChangeType: 0,
          setFirst: 1,
          timeRangeBefore: 0,
          timeRangeAfter: 0,
          winningPointWin: 0,
          winningPointDrawn: 0,
          winningPointLose: 0,
          womanNum: 0,
          playerChangeAvailable: 2,
          giveUp: 0
        },
        operatorList: [],
        shopIdList: []
      },
      Shop: {
        countryId: null,
        areaId: null,
        shopName: null,
        shopId: null,
        agentId: null,
        userId: "",
        pageNum: 1,
        pageSize: 10
      },
      agentList: [],
      CountryShowArr: [],
      ContinentArr: [],
      CountryArr: [],
      CompetitionAreaList: [],
      checked: true,
      OperatorList: [],
      showShopList: [],
      categoryList: [],
      getShopList: [],
      afterRomeveList: [],
      imgId: ""
    };
  },
  beforeRouteLeave(to, from, next) {
    const id = this.$route.query.id;
    changeCurrentObj(id, "competition", this.$store.state.menuList, this.AddCompetitionRequest);
    next();
  },
  mounted() {
    this.init();
  },
  computed: {
    // 换算成为分钟
    totalMinute() {
      return (this.fromMatchTimeBefore * 24 + this.fromMatchTimeBeforeHours) * 60 + this.fromMatchTimeBeforeMinute;
    }
  },
  methods: {
    init() {
      const query = this.$route.query;
      if (query.id || query.currentId) {
        this.uploadCompetitionId = query.id || query.currentId;
        sessionStorage.setItem("competitionId", this.uploadCompetitionId);
      }
      const userId = sessionStorage.getItem("LeagueUserId");
      this.searchOperator.userId = userId;
      this.AddCompetitionRequest.competition.userId = userId;
      this.Shop.userId = userId;
      if (query.type !== "1") {
        this.setFirstList.push({ value: 4, label: "all.tip517" });
        this.setFirstList.push({ value: 5, label: "all.tip518" });
      }
      this.AddCompetitionRequest.competition.type = query.type;
      // 获取保存的阶段数据
      if (query.id && !query.first) {
        // 有数据就拿保存的数据
        this.setData(query.id);
        this.getCategoryList();
      } else {
        this.OperAtorSearch();
      }
      this.getOperationdata();
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      return isJPG;
    },
    setData(id) {
      const vm = this;
      this.$axios.post(`/getcompetitionbyid?id=${id}`).then(res => {
        if (res.data.data) {
          const data = Object.assign({}, res.data.data);
          const list = [];
          vm.AddCompetitionRequest = res.data.data;
          vm.timeRangeBeforehours = data.competitionBasicOption.timeRangeBefore % 24;
          vm.timeRangeAfterhours = data.competitionBasicOption.timeRangeAfter % 24;
          if (data.competitionBasicOption.timeRangeBefore / 24 > 1) {
            vm.timeRangeBefore = Math.floor(data.competitionBasicOption.timeRangeBefore / 24);
          } else {
            vm.timeRangeBefore = 0;
          }
          if (data.competitionBasicOption.timeRangeAfter / 24 > 1) {
            vm.timeRangeAfter = Math.floor(data.competitionBasicOption.timeRangeAfter / 24);
          } else {
            vm.timeRangeAfter = 0;
          }
          vm.fromMatchTimeBefore = Math.floor(data.competitionBasicOption.fromMatchTimeBefore / 60 / 24);
          vm.fromMatchTimeBeforeHours = Math.floor(data.competitionBasicOption.fromMatchTimeBefore / 60) % 24;
          vm.fromMatchTimeBeforeMinute = data.competitionBasicOption.fromMatchTimeBefore - Math.floor(data.competitionBasicOption.fromMatchTimeBefore / 60) * 60;
          data.operatorList.forEach(i => {
            list.push(i.operatorId);
          });
          vm.AddCompetitionRequest.operatorList = list;
          this.CompetitionAreaList = res.data.data.countryList;
          this.CountryShowArr = res.data.data.countryList;
          // 显示图片
          if (data.competition.image) {
            vm.fileList = [{ url: `${data.competition.localhostImg}${data.competition.image}` }];
          }
          // 设置操作员数据
          this.$axios.post("/operation/getoperationlist", vm.$qs.stringify(vm.searchOperator)).then(operRes => {
            vm.OperatorList = operRes.data.data.list;
            if (vm.userType === "5") {
              vm.operatorSelectionList = data.operatorList;
            } else {
              operRes.data.data.list.forEach(i => {
                data.operatorList.forEach(j => {
                  if (i.id === j.operatorId) {
                    vm.operatorSelectionList.push(i);
                  }
                });
              });
            }
          });
          // 设置店铺地址
          vm.Shop.pageSize = 100;
          this.$axios.post("/getshop", vm.$qs.stringify(vm.Shop)).then(operRes => {
            if (data.shopIdList.length > 0) {
              operRes.data.data.list.forEach(i => {
                data.shopIdList.forEach(j => {
                  if (i.shopId === j) {
                    vm.getShopList.push(i);
                    vm.showShopList.push(i);
                  }
                });
              });
            }
          });
          vm.Shop.pageSize = 10;
        }
      });
    },
    getOperationdata() {
      this.$axios.post("/operation/getcreatorlist", this.$qs.stringify({ userId: this.searchOperator.userId })).then(res => {
        this.agentList = res.data.data;
        this.Shop.agentId = Number(sessionStorage.getItem("LeagueUserId"));
        this.shopSearch();
      });
    },
    getCategoryList() {
      const vm = this;
      const competitionId = this.$route.query.id;
      this.$axios.post("/categorylist", vm.$qs.stringify({ competitionId })).then(res => {
        vm.categoryList = res.data.data;
      });
    },
    competitionStartTime(data) {
      if (this.AddCompetitionRequest.competition.competitionEndPeriod && this.AddCompetitionRequest.competition.competitionEndPeriod < data) {
        this.AddCompetitionRequest.competition.competitionEndPeriod = "";
      }
    },
    competitionEndTime(data) {
      this.AddCompetitionRequest.competition.entryStartPeriod = this.AddCompetitionRequest.competition.competitionStartPeriod || "";
      this.AddCompetitionRequest.competition.advertisementStartPeriod = this.AddCompetitionRequest.competition.competitionStartPeriod || "";
      this.AddCompetitionRequest.competition.entryEndPeriod = data;
      this.AddCompetitionRequest.competition.advertisementEndPeriod = data;
      const [Syear, SMM, SDD] = new Date(this.AddCompetitionRequest.competition.competitionStartPeriod).toLocaleDateString().split("/");
      const [Eyear, EMM, EDD] = data.toLocaleDateString().split("/");
      this.AddCompetitionRequest.competition.resultStartPeriod = new Date(Syear, Number(SMM) + 2, SDD);
      this.AddCompetitionRequest.competition.resultEndPeriod = new Date(Eyear, Number(EMM) + 2, EDD, Number(23), Number(59), Number(59));
    },
    entryDateChange(data) {
      if (this.AddCompetitionRequest.competition.entryEndPeriod && this.AddCompetitionRequest.competition.entryEndPeriod < data) {
        this.AddCompetitionRequest.competition.entryEndPeriod = "";
      }
    },
    advertisementDateChange(data) {
      if (this.AddCompetitionRequest.competition.advertisementEndPeriod && this.AddCompetitionRequest.competition.advertisementEndPeriod < data) {
        this.AddCompetitionRequest.competition.advertisementEndPeriod = "";
      }
    },
    resultDateChange(data) {
      if (this.AddCompetitionRequest.competition.resultEndPeriod && this.AddCompetitionRequest.competition.resultEndPeriod < data) {
        this.AddCompetitionRequest.competition.resultEndPeriod = "";
      }
    },
    shopSearch() {
      const vm = this;
      this.$axios.post("/getshop", vm.$qs.stringify(vm.Shop)).then(res => {
        vm.CompetitionOptionShopList = res.data.data.list;
        vm.showShopListTotal = res.data.data.total;
      });
    },
    findName(list, num) {
      return list.find(i => i.id === num);
    },
    SrechRegion(key, list) {
      return list.includes(key);
    },
    CountrySave() {
      this.CountryShowArr = this.CompetitionAreaList;
      this.CompetitionAreaDialog = false;
    },
    SaveCompetitionAreaDialog() {
      this.CompetitionAreaDialog = true;
      const vm = this;
      this.$axios.post("/getcountry", vm.$qs.stringify({ creatorId: this.searchOperator.userId })).then(res => {
        vm.ContinentArr = res.data.data;
      });
    },
    ContinentChange() {
      const vm = this;
      this.$axios.post("/getareabycountryid", vm.$qs.stringify({ countryId: vm.countryId })).then(res => {
        vm.CountryArr = res.data.data;
      });
      this.areaId = "";
    },
    addContinent() {
      if (this.countryId) {
        const vm = this;
        let flag = true;
        const ContinentName = this.findName(this.ContinentArr, this.countryId);
        const CountryName = this.findName(this.CountryArr, this.areaId) || "";
        if (!this.areaId) {
          this.areaId = 0;
        }
        if (this.CompetitionAreaList.length > 0) {
          flag = this.CompetitionAreaList.every(i => i.countryId !== vm.countryId || i.areaId !== vm.areaId);
        }
        if (flag) {
          this.CompetitionAreaList.push({
            countryId: this.countryId,
            countryName: ContinentName.label,
            areaId: this.areaId,
            areaName: CountryName.label
          });
        }
        this.areaId = "";
        // this.AddCompetitionRequest.competition.areaName = '';
      }
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      const formData = new FormData();
      formData.append("file", null);
      formData.append("competitionId", this.uploadCompetitionId);
      this.$axios({
        method: "POST",
        url: "/addCompetitionImg",
        headers: { "Content-Type": "mutipart/form-data" },
        data: formData
      }).then(() => {});
      // this.$axios.post('/addCompetitionImg', this.$qs.stringify(data)).then(() => {});
    },
    handleSuccess(response, file, fileList) {
      this.fileList = fileList;
      // console.log('response, file, fileList:', response, file, fileList);
      console.log(this.fileList);
    },
    handlePictureCardPreview(file, fileList) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(fileList);
    },
    download() {},
    showDetail() {},
    showDetails() {
      this.ShopList = true;
    },
    handleCancel() {
      this.deleteVisible = false;
    },
    handleOk(type) {
      if (type) {
        this.$axios.post(`/delcategorybyid?id=${this.deleteCategoryId}`).then(res => {
          if (res.data.code === 1000) {
            this.getCategoryList();
            this.getMenuList();
          }
          this.$message(res.data.msg);
          this.deleteVisible = false;
        });
      }
    },
    getMenuList() {
      this.$axios.post(`/allsubset?competitionId=${sessionStorage.getItem("competitionId")}`).then(res => {
        if (res.data.data) {
          this.$store.state.menuList = res.data.data;
        }
      });
    },
    handleCategoryDelete(id) {
      this.deleteVisible = true;
      this.deleteCategoryId = id;
    },
    // eslint-disable-next-line consistent-return
    saveCompetition() {
      // console.log(this.$store.state.menuList);
      const vm = this;
      const id = vm.$route.query.id || vm.$route.query.currentId;
      let href = "";
      if (this.A1 && !this.W1) {
        this.AddCompetitionRequest.competitionOption.machineType = 1;
      } else if (this.W1 && !this.A1) {
        this.AddCompetitionRequest.competitionOption.machineType = 2;
      } else {
        this.AddCompetitionRequest.competitionOption.machineType = 3;
      }
      this.AddCompetitionRequest.countryList = [];
      this.CountryShowArr.forEach(i => {
        this.AddCompetitionRequest.countryList.push({
          countryId: i.countryId,
          areaId: i.areaId || 0
        });
      });
      if (!vm.AddCompetitionRequest.competition.competitionName) {
        this.$message(this.$t("all.tip552"));
        return false;
      }
      // 不等于1，第一个进来是调用add
      if (String(vm.$route.query.id) !== "1" || vm.$route.query.isTemplate || vm.$route.query.showData) {
        href = "updatecompetition";
        vm.AddCompetitionRequest.competitionId = id;
        // 上传图片接口需要id
        vm.uploadCompetitionId = id;
      } else {
        href = "addcompetition";
      }
      vm.AddCompetitionRequest.competitionBasicOption.timeRangeBefore = vm.timeRangeBefore * 24 + vm.timeRangeBeforehours;
      vm.AddCompetitionRequest.competitionBasicOption.timeRangeAfter = vm.timeRangeAfter * 24 + vm.timeRangeAfterhours;
      vm.AddCompetitionRequest.competitionBasicOption.fromMatchTimeBefore = this.totalMinute;
      const saveMethods = () => {
        // 保存 结果查询时间
        sessionStorage.setItem(
          "time",
          JSON.stringify({
            begin: this.AddCompetitionRequest.competition.competitionStartPeriod,
            end: this.AddCompetitionRequest.competition.competitionEndPeriod
          })
        );
        this.$axios.post(`/${href}`, vm.AddCompetitionRequest).then(res => {
          if (res.data) {
            const url = "competition";
            const competitionId = res.data.data && res.data.data.competitionId;
            let item = {};
            vm.$message({
              message: res.data.msg,
              type: "success",
              duration: 2000
            });
            if (competitionId) {
              vm.uploadCompetitionId = competitionId;
              sessionStorage.setItem("competitionId", competitionId);
              item = {
                label: vm.AddCompetitionRequest.competition.competitionName,
                id: competitionId,
                url
              };
            } else {
              item = {
                label: vm.AddCompetitionRequest.competition.competitionName,
                url
              };
            }
            this.$refs.upload.submit();
            changeHash(window.location.hash.split("&")[0], "competition", competitionId || id);
            this.$store.commit("changeMenuList", changeMenus(vm.$store.state.menuList, id, item));
            // changeMEenuList(this.$store.state.menuList, id, item);
            // this.getList(id);
          } else {
            vm.$message({
              message: res.data.msg,
              type: "warning",
              duration: 2000
            });
          }
        });
      };
      // 判断比赛是否已经开打？
      if (href === "updatecompetition" && vm.AddCompetitionRequest.numFight) {
        this.$confirm(this.$t("all.tip575"), {
          confirmButtonText: this.$t("all.tip47"),
          cancelButtonText: this.$t("all.tip30"),
          type: "warning"
        })
          .then(() => {
            saveMethods();
          })
          .catch(() => false);
      } else {
        saveMethods();
      }
    },
    uploadImg(data) {
      const File = data.file;
      const formData = new FormData();
      // 文件对象
      formData.append("file", File);
      // 其他参数
      formData.append("competitionId", this.uploadCompetitionId);
      this.$axios({
        method: "POST",
        url: "/addCompetitionImg",
        headers: { "Content-Type": "mutipart/form-data" },
        data: formData
      }).then(res => {
        if (res.data.code !== 1000) {
          this.$message(res.data.msg);
        }
      });
      // 此方法FormData参数无效
      // this.$axios.post('/addCompetitionImg', vm.$qs.stringify(formData)).then(res => {
      //
      //   console.log(res);
      // });
    },
    cityDelete(a, b) {
      console.log(a, b);
      this.CompetitionAreaList.splice(a, 1);
    },
    AssignOperatorer() {
      const vm = this;
      this.OperAtorDialog = true;
      this.$nextTick(() => {
        if (!this.$refs.operListRef.selection.length) {
          const arr = JSON.parse(JSON.stringify(vm.operatorSelectionList));
          this.OperatorList.forEach((i, index) => {
            arr.forEach(j => {
              if (i.id === j.id) {
                vm.$refs.operListRef.toggleRowSelection(vm.OperatorList[index]);
              }
            });
          });
        }
      });
    },
    OperAtorSearch() {
      this.$axios.post("/operation/getoperationlist", this.$qs.stringify(this.searchOperator)).then(res => {
        this.OperatorList = res.data.data.list;
        this.operatorTotal = res.data.data.total;
      });
    },
    operatorCurrentChange(val) {
      this.searchOperator.pageNo = val;
      this.$axios.post("/operation/getoperationlist", this.$qs.stringify(this.searchOperator)).then(res => {
        this.OperatorList = res.data.data.list;
        this.operatorTotal = res.data.data.total;
      });
    },
    operatorSizeChange(val) {
      this.searchOperator.pageSize = val;
      this.$axios.post("/operation/getoperationlist", this.$qs.stringify(this.searchOperator)).then(res => {
        this.OperatorList = res.data.data.list;
        this.operatorTotal = res.data.data.total;
      });
    },
    Select() {
      this.AddCompetitionRequest.operatorList = [];
      this.operatorSelectionList.forEach(i => {
        this.AddCompetitionRequest.operatorList.push(i.id);
      });
      this.OperAtorDialog = false;
    },
    OperatorSelection(val) {
      this.operatorSelectionList = val;
    },
    rowKey(row) {
      return row.shopId;
    },
    rowOperKey(row) {
      return row.id;
    },
    handleSelectionChange(val) {
      this.getShopList = val;
    },
    selectionChange(val) {
      this.removeList = val;
    },
    Remove() {
      const vm = this;
      this.ShopDialog = true;
      this.$nextTick(() => {
        if (vm.$refs.ShopListRef && vm.$refs.ShopListRef.selection) {
          const list = vm.$refs.ShopListRef.selection;
          vm.removeList.forEach(i => {
            vm.showShopList.splice(vm.showShopList.findIndex(j => i.shopId === j.shopId), 1);
            list.forEach((k, kndex) => {
              if (i.shopId === k.shopId) {
                list.splice(kndex, 1);
              }
            });
          });
          this.ShopDialog = false;
        }
      });
      this.ShopList = false;
      if (this.removeList.length === 1) {
        this.AddCompetitionRequest.shopIdList = [];
      } else {
        // this.AddCompetitionRequest.shopIdList = [...new Set(arr.map(i => i.shopId))];
        this.removeList.forEach(i => {
          this.AddCompetitionRequest.shopIdList.forEach((j, jndex) => {
            if (i.shopId === j) {
              this.AddCompetitionRequest.shopIdList.splice(jndex, 1);
            }
          });
        });
        // this.AddCompetitionRequest.shopIdList = [...new Set([...this.AddCompetitionRequest.shopIdList, ...this.removeList])];
      }
    },
    ShopDialogClick() {
      const vm = this;
      this.ShopDialog = true;
      this.$nextTick(() => {
        if (!this.$refs.ShopListRef.selection.length) {
          this.CompetitionOptionShopList.forEach((i, index) => {
            vm.showShopList.forEach(j => {
              if (i.shopId === j.shopId) {
                vm.$refs.ShopListRef.toggleRowSelection(vm.CompetitionOptionShopList[index]);
              }
            });
          });
        }
      });
    },
    showShopListCurrentChange(val) {
      const vm = this;
      function toggleStates(data) {
        // vm.$refs.ShopListRef.clearSelection();
        if (vm.showShopList.length > 0) {
          vm.showShopList.forEach(i => {
            if (data.findIndex(j => i.shopId === j.shopId) > -1) {
              vm.$refs.ShopListRef.toggleRowSelection(data[data.findIndex(j => i.shopId === j.shopId)]);
            }
          });
        }
      }
      this.Shop.pageNum = val;
      this.$axios.post("/getshop", this.$qs.stringify(this.Shop)).then(res => {
        this.CompetitionOptionShopList = res.data.data.list;
        this.showShopListTotal = res.data.data.total;
        toggleStates(this.CompetitionOptionShopList);
      });
    },
    showShopListSizeChange(val) {
      this.Shop.pageSize = val;
      this.$axios.post("/getshop", this.$qs.stringify(this.Shop)).then(res => {
        this.CompetitionOptionShopList = res.data.data.list;
        this.showShopListTotal = res.data.data.total;
      });
    },
    AddCompetition() {
      const obj = {};
      const arr = [];
      [...this.showShopList, ...this.$refs.ShopListRef.selection].forEach(i => {
        if (!obj[i.shopId]) {
          obj[i.shopId] = true;
          arr.push(i);
        }
      });
      this.showShopList = arr;
      if (arr.length > 0) {
        this.AddCompetitionRequest.shopIdList = [...new Set(arr.map(i => i.shopId))];
      }
      this.ShopDialog = false;
    },
    CountryChange() {}
  }
};
</script>
<style scoped>
.cursor {
  cursor: pointer;
  color: #1890ff;
}
.el-table >>> td,
.el-table >>> th {
  text-align: center;
}
.buttonClass {
  display: flex;
  justify-content: flex-end;
}
.table {
  height: 600px;
  overflow-y: auto;
}
</style>
