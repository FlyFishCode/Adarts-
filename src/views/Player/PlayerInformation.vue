<template>
  <div>
    <div class="box">
      <el-row>
        <el-col class="title-g" :span="23">
          {{ $t("all.tip384") }}
        </el-col>
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
          <el-upload :http-request="uploadImg" list-type="picture-card" action=" " :on-preview="handlePreview" :on-change="fileChange" :on-remove="handleRemove" :file-list="fileList">
            <div>
              <el-button id="upload" size="small" type="primary" style="display:none"></el-button>
            </div>
          </el-upload>
        </el-col>
        <el-dialog :visible.sync="dialogVisible">
          <div class="imgBox">
            <img width="90%" :src="dialogImageUrl" alt="" />
          </div>
        </el-dialog>
        <el-col :span="16" class="borderClass">
          <el-row class="center-Row">
            <el-col class="label-g" :span="3">
              {{ $t("all.tip456") }}
            </el-col>
            <el-col :span="5" class="lineClass">
              <el-input v-model="playerInformationVO.userId" disabled></el-input>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip389") }}
            </el-col>
            <el-col :span="5" class="lineClass">
              <el-input v-model="playerInformationVO.regDate" disabled></el-input>
            </el-col>
            <el-col class="label-g" :span="3">
              {{ $t("all.tip441") }}
            </el-col>
            <el-col :span="5" class="lineClass">
              <!-- <el-input v-model="playerInformationVO.birthday" disabled></el-input> -->
              <el-date-picker v-model="playerInformationVO.birthday" type="date" format="yyyy-MM-dd" :disabled="disable"> </el-date-picker>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col>
              <el-col class="label-g" :span="3">
                {{ $t("all.tip259") }}
              </el-col>
              <el-col :span="5" class="lineClass">
                <el-input v-model="playerInformationVO.nickName" disabled></el-input>
              </el-col>
              <el-col class="label-g" :span="3">
                {{ $t("all.tip208") }}
              </el-col>
              <el-col :span="5" class="lineClass">
                <el-radio v-model="playerInformationVO.gender" :label="1" disabled>{{ $t("all.tip209") }}</el-radio>
                <el-radio v-model="playerInformationVO.gender" :label="0" disabled>{{ $t("all.tip210") }}</el-radio>
              </el-col>
              <el-col class="label-g" :span="3">
                {{ $t("all.tip17") }}
              </el-col>
              <el-col :span="5" class="lineClass">
                <!-- <el-input v-model="playerInformationVO.countryId" disabled></el-input> -->
                <el-select v-model="playerInformationVO.countryId" :placeholder="$t('all.tip516')" @change="countryChange" :disabled="disable">
                  <el-option v-for="item in countryList" :key="item.id" :label="item.label" :value="String(item.id)"></el-option>
                </el-select>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col>
              <el-col class="label-g" :span="3">
                {{ $t("all.tip425") }}
              </el-col>
              <el-col :span="5" class="lineClass">
                <el-input v-model="playerInformationVO.nickName" disabled></el-input>
              </el-col>
              <el-col class="label-g" :span="3">
                {{ $t("all.tip429") }}
              </el-col>
              <el-col :span="5" class="lineClass">
                <el-input v-model="playerInformationVO.phone" disabled></el-input>
              </el-col>
              <el-col class="label-g" :span="3">
                {{ $t("all.tip442") }}
              </el-col>
              <el-col :span="5" class="lineClass">
                <!-- <el-input v-model="playerInformationVO.areaId" disabled></el-input> -->
                <el-select v-model="playerInformationVO.areaId" :placeholder="$t('all.tip516')" disabled>
                  <el-option v-for="item in areaList" :key="item.id" :label="item.label" :value="String(item.id)"></el-option>
                </el-select>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col>
              <el-col class="label-g" :span="3">
                {{ $t("all.tip455") }}
              </el-col>
              <el-col :span="5" class="lineClass">
                <!-- <el-input v-model="playerInformationVO.homeShopName" disabled></el-input> -->
                <el-select v-model="playerInformationVO.homeShopName" :placeholder="$t('all.tip516')" :disabled="disable">
                  <el-option v-for="item in shopList" :key="item.shopId" :label="item.shopName" :value="item.shopId"></el-option>
                </el-select>
              </el-col>
              <el-col class="label-g" :span="3">
                {{ $t("all.tip428") }}
              </el-col>
              <el-col :span="5" class="lineClass">
                <el-input v-model="playerInformationVO.email" disabled></el-input>
              </el-col>
              <el-col class="label-g" :span="3">
                {{ $t("all.tip460") }}
              </el-col>
              <el-col :span="5" class="lineClass">
                <el-input v-model="playerInformationVO.language" :disabled="disable"></el-input>
                <!-- <el-select v-model="playerInformationVO.language" :disabled="disable">
                  <el-option label="EEF" value="1"></el-option>
                  <el-option label="GDFSG" value="2"></el-option>
                  <el-option label="Gteam" value="3"></el-option>
                </el-select> -->
              </el-col>
            </el-col>
          </el-row>
          <el-row class="center-Row">
            <el-col>
              <el-col class="label-g" :span="3">
                {{ $t("all.tip463") }}
              </el-col>
              <el-col :span="5" class="lineClass">
                <el-input v-model="playerInformationVO.cardNumber" disabled></el-input>
              </el-col>
              <el-col class="label-g" :span="3">
                {{ $t("all.tip316") }}
              </el-col>
              <el-col :span="5" class="lineClass">
                <el-input v-model="playerInformationVO.teamName" :disabled="disable"></el-input>
                <!-- <el-select v-model="playerInformationVO.teamName" :placeholder="$t('all.tip516')" :disabled="disable">
                  <el-option label="EEF" value="1"></el-option>
                  <el-option label="GDFSG" value="2"></el-option>
                  <el-option label="Gteam" value="3"></el-option>
                  <el-option label="KKD" value="4"></el-option>
                </el-select> -->
              </el-col>
              <el-col class="label-g" :span="3">
                {{ $t("all.tip443") }}
              </el-col>
              <el-col :span="5" class="lineClass">
                <!-- <el-input v-model="playerInformationVO.valid" disabled></el-input> -->
                <el-select v-model="playerInformationVO.valid" :placeholder="$t('all.tip516')" :disabled="disable">
                  <el-option :label="$t('all.tip545')" :value="0"></el-option>
                  <el-option :label="$t('all.tip475')" :value="1"></el-option>
                </el-select>
              </el-col>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-row>
        <el-col class="title-g">
          {{ $t("all.tip546") }}
        </el-col>
        <div class="table">
          <el-table :data="playerRatingList" border style="width: 100%">
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
                  <el-table :data="quarterList" border style="width: 100%" :span-method="arraySpanMethod">
                    <el-table-column prop="name" :label="$t('all.tip52')" min-width="15%">
                      <el-table-column prop="name" min-width="15%"> </el-table-column>
                      <el-table-column prop="headName" min-width="15%"> </el-table-column>
                    </el-table-column>
                    <el-table-column prop="Q1" label="Q1" min-width="15%"> </el-table-column>
                    <el-table-column prop="Q2" label="Q2" min-width="15%"> </el-table-column>
                    <el-table-column prop="Q3" label="Q3" min-width="15%"> </el-table-column>
                    <el-table-column prop="Q4" label="Q4" min-width="15%"> </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('all.tip400')">
                <div class="table">
                  <el-table :data="monthList" border style="width: 100%" :span-method="arraySpanMethod">
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
              <el-select v-model="rating.type" :placeholder="$t('all.tip516')" @change="typeChange">
                <el-option :label="$t('all.tip0')" :value="0"></el-option>
                <el-option :label="$t('all.tip42')" :value="1"></el-option>
                <el-option :label="$t('all.tip43')" :value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              <el-select v-model="rating.year" :placeholder="$t('all.tip516')" @change="yearChange">
                <el-option v-for="item in yearList" :key="item.id" :label="item.year" :value="item.id"></el-option>
              </el-select>
            </el-col>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('all.tip398')" name="second">
          <el-row>
            <el-col :span="4">
              <el-select v-model="entryHistoryVO.leagueType" :placeholder="$t('all.tip516')" @change="entryHistoryTypeChange">
                <el-option :label="$t('all.tip0')" :value="0"></el-option>
                <el-option :label="$t('all.tip42')" :value="1"></el-option>
                <el-option :label="$t('all.tip43')" :value="2"></el-option>
              </el-select>
            </el-col>
            <div class="table">
              <el-table :data="entryHistoryList" border style="width: 100%">
                <el-table-column prop="date" :label="$t('all.tip5')" min-width="5%">
                  <template slot-scope="scope">
                    <div>{{ scope.row.leagueType === 1 ? $t("all.tip40") : $t("all.tip41") }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="leagueName" :label="$t('all.tip1')" min-width="10%"> </el-table-column>
                <el-table-column :label="$t('all.tip403')" min-width="5%">
                  <template slot-scope="scope">
                    <div>{{ scope.row.leagueStartTime.split(" ")[0] }}</div>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('all.tip404')" min-width="5%">
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
                <el-table-column prop="teamName" :label="$t('all.tip405')" min-width="10%"> </el-table-column>
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
          </el-row>
          <div class="page">
            <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="1" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { getYearList } from "@/components/common/Utils";

export default {
  data() {
    return {
      id: "",
      currentType: "",
      dialogVisible: false,
      disable: false,
      dialogImageUrl: "",
      fileList: [],
      shopList: [],
      playerRatingList: [],
      areaList: [],
      countryList: [],
      yearList: getYearList(),
      TeamInformationVO: {},
      rating: {
        type: 0,
        year: new Date().getFullYear()
      },
      entryHistoryVO: {
        id: "",
        competitorType: "player",
        leagueType: 0,
        pageNum: 1,
        pageSize: 10
      },
      defaultName: "first",
      playerInformationVO: {
        userId: "",
        regDate: "",
        nickName: "",
        gender: "1",
        phone: "",
        homeShopName: "",
        email: "",
        cardNumber: "",
        teamName: "",
        birthday: "",
        countryId: "",
        areaId: "",
        language: "",
        valid: ""
      },
      quarterList: [],
      monthList: [],
      entryHistoryList: [],
      total: 1
    };
  },
  mounted() {
    console.log(process.env.VUE_APP_IMGURL);
    this.id = this.$route.query.id;
    this.init(this.id);
  },
  methods: {
    init(id) {
      this.entryHistoryVO.id = id;
      this.disable = true;
      this.getPlayerRatingList("player", id);
      this.getRating("player", undefined, undefined, id, undefined);
      this.getEntryHistoryList();
      this.getShopList();
      this.getPlayerInfomation(id);
      this.getCountry(id);
      this.initStyle();
    },
    initStyle() {
      const upLoad = document.getElementsByClassName("el-upload")[0];
      upLoad.style.visibility = "hidden";
    },
    getCountry(userId) {
      this.$axios.post("/getcountry", this.$qs.stringify({ creatorId: userId })).then(res => {
        this.countryList = res.data.data;
      });
    },
    getAeraList() {
      this.$axios.post("/getareabycountryid", this.$qs.stringify({ countryId: this.playerInformationVO.countryId })).then(res => {
        this.areaList = res.data.data;
      });
    },
    countryChange() {
      this.$axios.post("/getareabycountryid", this.$qs.stringify({ countryId: this.playerInformationVO.countryId })).then(res => {
        this.areaList = res.data.data;
      });
      this.playerInformationVO.areaId = "";
    },
    getPlayerInfomation(id) {
      this.$axios.get(`/getPlayperInfo?id=${id}`).then(res => {
        let imgUrl = "";
        if (res.data.portrait) {
          imgUrl = res.data.portrait;
        } else {
          imgUrl = require("../../assets/person.jpg");
        }
        this.fileList.push({ url: imgUrl });
        this.playerInformationVO = res.data;
        this.getAeraList();
      });
    },
    getRating(type, state = 0, year = this.rating.year, id, currentType = 0) {
      const data = {
        competitorType: type,
        leagueType: state,
        year,
        id
      };
      this.$axios.post("/getRecordByDate", data).then(res => {
        this.quarterList = [];
        this.monthList = [];
        let name = "";
        let headName = "";
        let value = "";
        const list = res.data.data.quarterTotalList.concat(res.data.data.quarterAccumulatedList);
        const monthArr = res.data.data.monthTotalList.concat(res.data.data.monthAccumulatedList);
        // 数据处理
        for (let index = 0; index < 6; index += 1) {
          switch (index) {
            case 0:
              if (currentType === "1") {
                name = "Monthly total";
              }
              name = name || "Quarterly Total";
              headName = "Rating";
              value = "rating";
              break;
            case 1:
              headName = "PPD";
              value = "ppd";
              break;
            case 2:
              headName = "MPR";
              value = "mpr";
              break;
            case 3:
              name = "Accumulated Total";
              headName = "Rating";
              value = "rating";
              break;
            case 4:
              headName = "PPD";
              value = "ppd";
              break;
            default:
              headName = "MPR";
              value = "mpr";
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
      this.$axios.post("/playerEntryHistory", this.entryHistoryVO).then(res => {
        if (res.data.code === 1000) {
          this.entryHistoryList = res.data.data.list;
          this.total = res.data.data.total;
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    currentChange(value) {
      this.entryHistoryVO.pageNum = value;
      this.getEntryHistoryList();
    },
    sizeChange(value) {
      this.entryHistoryVO.pageSize = value;
      this.getEntryHistoryList();
    },
    entryHistoryTypeChange(value) {
      this.entryHistoryVO.leagueType = value;
      this.getEntryHistoryList();
    },
    typeChange(value) {
      this.getRating("player", value, this.rating.year, this.id, this.currentType);
    },
    yearChange(value) {
      this.getRating("player", this.rating.type, value, this.id, this.currentType);
    },
    tabClick(tab) {
      this.currentType = tab.index;
      this.getRating("player", this.rating.type, this.rating.year, this.id, tab.index);
    },
    getPlayerRatingList(type, id) {
      const data = {
        competitorType: type,
        id
      };
      this.$axios.post("/getRecord", this.$qs.stringify(data)).then(res => {
        if (res.data.errorCode) {
          this.$message(res.data.msg);
        } else {
          this.playerRatingList = res.data.data;
        }
      });
    },
    getShopList() {
      const userId = sessionStorage.getItem("LeagueUserId");
      this.$axios.post("/getshop", this.$qs.stringify({ userId })).then(res => {
        if (res.data.code === 1000) {
          this.shopList = res.data.data.list;
        }
      });
    },
    uploadImg(data) {
      const vm = this;
      const File = data.file;
      const formData = new FormData();
      // 文件对象
      formData.append("file", File);
      // 其他参数
      formData.append("memberId", this.id);
      this.$axios({
        method: "POST",
        url: "/addMemberImg",
        data: formData
      }).then(res => {
        if (res.data.errorCode) {
          vm.$message(res.data.msg);
          vm.$route.push("/");
        } else {
          vm.$message(res.data.msg);
        }
      });
    },
    handleClick(tab) {
      console.log(tab.index);
    },
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
      return "";
    },
    save() {
      this.$axios.post("/editorPlayerInfo", this.playerInformationVO).then(res => {
        this.$message(res.data.msg);
      });
    },
    fileChange(file, fileList) {
      console.log(file);
      if (fileList.length > 1) {
        fileList.shift();
      }
    },
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
      this.fileList = fileList;
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      const data = {
        file: null,
        memberId: this.id
      };
      this.$axios.post("/addMemberImg", this.$qs.stringify(data)).then(() => {});
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    addMember() {}
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
.uploadBox >>> .el-upload {
  line-height: 20px;
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
.imgBox {
  width: 50%;
  height: 50%;
  margin: 0 auto;
}
.imgBox img {
  width: 100%;
  height: 100%;
}
</style>
