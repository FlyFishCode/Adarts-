<template>
  <div>
    <el-row class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip17") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="infoVO.countryId" :placeholder="$t('all.tip516')">
            <el-option v-for="item in countryList" :key="item.id" :value="item.id" :label="item.label"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip9") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="infoVO.userId" filterable remote :remote-method="remoteMethod" :placeholder="$t('all.tip38')">
            <el-option v-for="item in playerList" :key="item.operationId" :label="item.operationName" :value="item.operationId"> </el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip600") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="infoVO.status" :placeholder="$t('all.tip516')">
            <el-option :value="0" :label="$t('all.tip601')"></el-option>
            <el-option :value="1" :label="$t('all.tip600')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip597") }}
        </el-col>
        <el-col :span="3">
          <el-input v-model="infoVO.name"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip615") }}
        </el-col>
        <el-col :span="3">
          <el-input v-model="infoVO.link"></el-input>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip616") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="infoVO.target" :placeholder="$t('all.tip516')">
            <el-option :value="1" :label="$t('all.tip617')"></el-option>
            <el-option :value="2" :label="$t('all.tip618')"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip594") }}
        </el-col>
        <el-col :span="3">
          <el-input v-model="typeOrder"></el-input>
        </el-col>
        <el-col :span="2" class="lineClass">
          <el-button type="primary" size="mini" @click="save">{{ $t("all.tip136") }}</el-button>
        </el-col>
      </el-row>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="label-g">{{ $t("all.tip498") }}</div>
        <div>{{ `1：${$t("all.tip3872")}` }}</div>
        <div>{{ `2：${$t("all.tip3873")}` }}</div>
      </el-col>
      <el-col :span="18">
        <el-upload
          :http-request="uploadImg"
          class="uploadBg"
          action=" "
          ref="upload"
          :limit="1"
          :auto-upload="false"
          list-type="picture-card"
          :on-remove="handleRemove"
          :file-list="fileList"
          :multiple="false"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    const vm = this;
    return {
      pickerOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.infoVO.startDate);
          return time.getTime() < date1;
        }
      },
      flag: false,
      typeOrder: "",
      countryList: [],
      playerList: [],
      fileList: [],
      infoVO: {
        id: "",
        countryId: "",
        userId: "",
        useType: 1,
        startDate: "",
        endDate: "",
        link: "",
        name: "",
        target: 1,
        status: 1,
        mainOrderNo: "",
        viceOrderNo: ""
      }
    };
  },
  mounted() {
    if (this.$route.query.iconId) {
      this.flag = true;
      this.infoVO.id = this.$route.query.iconId;
      this.getBannerInfo(this.$route.query.iconId);
    }
    this.init();
  },
  methods: {
    init() {
      this.getCountryList();
    },
    save() {
      if (this.infoVO.useType === 1 && this.flag) {
        this.infoVO.mainOrderNo = this.typeOrder;
      } else {
        this.infoVO.viceOrderNo = this.typeOrder;
      }
      if (this.flag) {
        this.$axios.post("/operationbanner", this.infoVO).then(res => {
          if (res.data.msg) {
            this.$message(res.data.msg);
          }
        });
      } else {
        this.$refs.upload.submit();
      }
    },
    remoteMethod(value) {
      if (value) {
        this.$axios.post("/searchOperation", this.$qs.stringify({ opeatorIdName: value, userId: sessionStorage.getItem("LeagueUserId") })).then(res => {
          this.playerList = res.data.data;
        });
      } else {
        this.playerList = [];
      }
    },
    dateChange(data) {
      if (this.infoVO.endDate && this.infoVO.endDate < data) {
        this.infoVO.endDate = "";
      }
    },
    getBannerInfo(id) {
      this.$axios.post("/getbannerbyid", this.$qs.stringify({ id })).then(res => {
        if (res.data.data) {
          this.infoVO = res.data.data;
          this.remoteMethod(res.data.data.userName);
          if (res.data.data.useType === 1) {
            this.infoVO.useType = 1;
            this.typeOrder = res.data.data.mainOrderNo;
          } else {
            this.infoVO.useType = 2;
            this.typeOrder = res.data.data.viceOrderNo;
          }
          this.fileList.push({ url: res.data.data.image });
          this.init();
        }
      });
    },
    getCountryList() {
      this.$axios.post("/getcountry", this.$qs.stringify({ creatorId: sessionStorage.getItem("LeagueUserId") })).then(res => {
        this.countryList = res.data.data;
      });
    },
    uploadImg(data) {
      const File = data.file;
      const formData = new FormData();
      formData.append("image", File);
      const P1 = new Promise((resolve, reject) => {
        this.$axios({
          method: "POST",
          url: "/uploadPictures",
          data: formData
        }).then(res => {
          if (res.data.data) {
            resolve(res.data.data);
          } else {
            reject(res.data.data);
          }
        });
      });
      P1.then(value => {
        this.infoVO.image = value;
        this.$axios.post("/operationbanner", this.infoVO).then(res => {
          if (res.data.msg) {
            this.$message(res.data.msg);
          }
        });
      });
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      this.infoVO.image = "";
    }
  }
};
</script>
<style scoped></style>
