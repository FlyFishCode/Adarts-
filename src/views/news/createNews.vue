<template>
  <div>
    <el-row class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip17") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="infoVO.countryId" :placeholder="$t('placeholder.select')">
            <el-option v-for="item in countryList" :key="item.id" :value="item.id" :label="item.label"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip51") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="infoVO.category" :placeholder="$t('placeholder.select')">
            <el-option v-for="item in categoryList" :key="item.value" :value="item.value" :label="$t(item.label)"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip9") }}
        </el-col>
        <el-col :span="3">
          <div v-if="flag">
            <el-input v-model="infoVO.opeatorName" disabled></el-input>
          </div>
          <div v-else>
            <el-select v-model="infoVO.opeatorId" filterable remote :remote-method="remoteMethod" :placeholder="$t('placeholder.input')">
              <el-option v-for="item in opeatorList" :key="item.operationId" :value="item.operationId" :label="item.operationName"> </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip436") }}
        </el-col>
        <el-col :span="3">
          <el-date-picker v-model="infoVO.registerDate" type="date" :disabled="flag" default-time="00:00:00" clearable> </el-date-picker>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip597") }}
        </el-col>
        <el-col :span="3">
          <el-input v-model="infoVO.title"></el-input>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip600") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="infoVO.display" :placeholder="$t('placeholder.select')">
            <el-option :value="0" :label="$t('all.tip601')"></el-option>
            <el-option :value="1" :label="$t('all.tip600')"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-button type="primary" size="mini" @click="save">{{ $t("all.tip136") }}</el-button>
        </el-col>
      </el-row>
    </el-row>
    <el-row>
      <div id="editorElem"></div>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="label-g">{{ $t("all.tip498") }}</div>
        <div>{{ `1：${$t("all.tip3871")}` }}</div>
        <div>{{ `2：${$t("all.tip3872")}` }}</div>
        <div>{{ `3：${$t("all.tip3873")}` }}</div>
      </el-col>
      <el-col :span="18">
        <el-upload
          :http-request="uploadImg"
          class="uploadBg"
          action=" "
          ref="upload"
          :auto-upload="false"
          list-type="picture-card"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :file-list="fileList"
          :limit="1"
          :multiple="false"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import E from "wangeditor";

export default {
  data() {
    return {
      flag: false,
      countryList: [],
      categoryList: [{ value: 1, label: "all.tip603" }, { value: 2, label: "all.tip604" }, { value: 3, label: "all.tip605" }, { value: 4, label: "all.tip606" }, { value: 5, label: "all.tip1" }],
      fileList: [],
      opeatorList: [],
      infoVO: {
        id: "",
        countryId: "",
        category: 1,
        opeatorId: "",
        registerDate: "",
        title: "",
        display: 0,
        thumbnail: "",
        contents: ""
      }
    };
  },
  mounted() {
    this.getCountryList();
    if (this.$route.query.newsId) {
      this.flag = true;
      this.infoVO.id = this.$route.query.newsId;
      this.getNewsInfo(this.$route.query.newsId);
    } else {
      this.init();
    }
  },
  methods: {
    init(flag = false) {
      const editor = new E("#editorElem");
      this.$nextTick(() => {
        editor.config.onchange = html => {
          this.infoVO.contents = html;
        };
        editor.config.height = 300;
        editor.config.menus = [
          "head", // 标题
          "bold", // 粗体
          "fontSize", // 字号
          "fontName", // 字体
          "italic", // 斜体
          "underline", // 下划线
          "strikeThrough", // 删除线
          "foreColor", // 文字颜色
          "backColor", // 背景颜色
          "link", // 插入链接
          "list", // 列表
          "justify", // 对齐方式
          // 'quote', // 引用
          // 'emoticon', // 表情
          // 'image', // 插入图片
          // 'table', // 表格
          // 'video', // 插入视频
          // 'code', // 插入代码
          "undo", // 撤销
          "redo" // 重复
        ];
        editor.config.zIndex = 100;
        // 过滤掉复制文本中自带的样式,默认开启
        editor.config.pasteFilterStyle = false;
        // 自定义处理粘贴的文本内容
        // editor.config.pasteTextHandle = function (content) {
        //   // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
        //   return `<p style='text-align:center;color:red;border-bottom:1px solid #DCDFE6;border-top:1px solid #DCDFE6;'>以下内容来源于网络,或者复制过来</p>${content}<p style='text-align:center;color:red;border-bottom:1px solid #DCDFE6;border-top:1px solid #DCDFE6;'>以上内容来源于网络,或者复制过来</p>`;
        // };
        // editor.config.uploadImgMaxSize = 2 * 1024 * 1024; // 限制图片大小为2M
        // eslint-disable-next-line func-names
        editor.config.linkImgCallback = function(url) {
          const arr = url.split(",");
          const mime = arr[0].match(/:(.*?);/)[1];
          const encodeStr = atob(arr[1]);
          let n = encodeStr.length;
          const u8Arr = new Uint8Array(n);
          // eslint-disable-next-line no-plusplus
          while (n--) {
            u8Arr[n] = encodeStr.charCodeAt(n);
          }
          this.infoVO.thumbnail = new Blob([u8Arr], { type: mime });
          // url 即插入图片的地址
        };
        // eslint-disable-next-line func-names
        editor.config.linkCheck = function(text, link) {
          console.log(text); // 插入的文字
          console.log(link); // 插入的链接
          return true; // 返回 true 表示校验成功
          // return '验证失败' // 返回字符串，即校验失败的提示信息
        };
        // 自定义配置颜色（字体颜色、背景色）
        editor.config.colors = ["#000000", "#eeece0", "#1c487f", "#4d80bf", "#c24f4a", "#8baa4a", "#7b5ba1", "#46acc8", "#f9963b", "#ffffff"];
        // 自定义字体
        editor.config.fontNames = ["宋体", "微软雅黑", "Arial", "Tahoma", "Verdana"];
        // 隐藏“网络图片”tab
        editor.config.showLinkImg = false;
        // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
        editor.config.uploadImgShowBase64 = true; // 使用 base64 保存图片不建议使用这种，我只是图个方便
        // editor.config.uploadImgServer = '/upload'; // 上传图片到服务器
        editor.create();
        if (flag) {
          editor.txt.html(this.infoVO.contents);
        }
      });
    },
    save() {
      if (this.infoVO.thumbnail) {
        this.$axios.post("/addleaguenews", this.$qs.stringify(this.infoVO)).then(res => {
          this.$message(res.data.msg);
        });
      } else {
        this.$refs.upload.submit();
      }
    },
    remoteMethod(value) {
      if (value) {
        this.$axios.post("/searchOperation", this.$qs.stringify({ opeatorIdName: value, userId: sessionStorage.getItem("userId") })).then(res => {
          this.opeatorList = res.data.data;
        });
      } else {
        this.opeatorList = [];
      }
    },
    getNewsInfo(id) {
      this.$axios.post("/getleaguenewsbyid", this.$qs.stringify({ id })).then(res => {
        if (res.data.data) {
          this.infoVO = res.data.data;
          this.fileList.push({ url: res.data.data.thumbnail });
          this.init(true);
        }
      });
    },
    getCountryList() {
      this.$axios.post("/getcountry", this.$qs.stringify({ creatorId: sessionStorage.getItem("userId") })).then(res => {
        this.countryList = res.data.data;
        this.infoVO.countryId = res.data.data[0].id;
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
        this.infoVO.thumbnail = value;
        this.$axios.post("/addleaguenews", this.infoVO).then(res => {
          this.$message(res.data.msg);
        });
      });
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      this.infoVO.thumbnail = "";
    },
    handleChange(response, file) {
      this.fileList = file;
    }
  }
};
</script>
<style scoped></style>
