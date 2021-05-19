<template>
  <div class="content">
    <div class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip457") }}
        </el-col>
        <el-col :span="3">
          <el-select v-model="operatorVO.agentId" :placeholder="$t('placeholder.select')" clearable>
            <el-option v-for="item in agentList" :key="item.creatorId" :label="item.creatorName" :value="item.creatorId"></el-option>
          </el-select>
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip9") }}
        </el-col>
        <el-col :span="3">
          <el-input v-model="operatorVO.operName" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col :span="4" class="lineClass">
          <el-button type="primary" size="mini" @click="search">{{ $t("form.SearchButton") }}</el-button>
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="2" class="lineClass">
        <el-button type="primary" size="mini" @click="create">{{ $t("form.Createbutton") }}</el-button>
      </el-col>
    </el-row>

    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" :label="$t('all.tip257')" min-width="10%"> </el-table-column>
        <el-table-column prop="operName" :label="$t('all.tip9')" min-width="10%">
          <!-- <template slot-scope="scope">
            <div class="tableLink" @click="push(scope)">{{ scope.row.date }}</div>
          </template> -->
        </el-table-column>
        <el-table-column prop="agent" :label="$t('all.tip457')" min-width="10%"> </el-table-column>
        <el-table-column prop="description" :label="$t('all.tip49')" min-width="10%"> </el-table-column>
        <el-table-column :label="$t('all.tip433')" min-width="10%">
          <template slot-scope="scope">
            <div>{{ scope.row.createTime | capitalize }}</div>
          </template>
        </el-table-column>
        <el-table-column min-width="10%">
          <div slot-scope="scope" class="tableStyle">
            <el-button size="mini" type="primary" @click="modify(scope.row.id)">{{ $t("all.tip435") }}</el-button>
            <el-button size="mini" type="primary" @click="deleteOper(scope.row.id)">{{ $t("all.tip130") }}</el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="1"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 修改 -->
    <el-dialog :title="$t('all.tip462')" :visible.sync="changeDiolog">
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip423") }}
        </el-col>
        <el-col :span="8">
          <el-input v-model="changeVo.operAccount" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip424") }}
        </el-col>
        <el-col :span="8">
          <el-input v-model="changeVo.operPassword" type="password" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip63") }}
        </el-col>
        <el-col :span="20" id="divBoxWidth">
          <el-input v-model="changeVo.operName" show-word-limit maxlength="30" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip457") }}
        </el-col>
        <el-col :span="20" id="divBoxWidth">
          <el-select v-model="changeVo.agentId" :placeholder="$t('placeholder.select')">
            <el-option v-for="item in creatorList" :key="item.creatorId" :label="item.creatorName" :value="item.creatorId"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip49") }}
        </el-col>
        <el-col :span="20">
          <el-input v-model="changeVo.description" type="textarea" :autosize="{ minRows: 4, maxRows: 4 }" show-word-limit maxlength="100" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <div slot="footer" class="DialogButton">
        <el-button size="mini" @click="changeCreator" type="primary">{{ $t("all.tip136") }}</el-button>
      </div>
    </el-dialog>
    <!-- // 创建 -->
    <el-dialog :title="$t('all.tip462')" :visible.sync="CreatDialog">
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip423") }}
        </el-col>
        <el-col :span="8">
          <el-input v-model="creatorVo.operAccount" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip424") }}
        </el-col>
        <el-col :span="8">
          <el-input v-model="creatorVo.operPassword" type="password" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip63") }}
        </el-col>
        <el-col :span="20" id="divBoxWidth">
          <el-input v-model="creatorVo.operName" show-word-limit maxlength="30" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip457") }}
        </el-col>
        <el-col :span="20" id="divBoxWidth">
          <el-select v-model="creatorVo.agentId" :placeholder="$t('placeholder.select')">
            <el-option v-for="item in creatorList" :key="item.creatorId" :label="item.creatorName" :value="item.creatorId"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="label-g" :span="4">
          {{ $t("all.tip49") }}
        </el-col>
        <el-col :span="20">
          <el-input v-model="creatorVo.description" type="textarea" :autosize="{ minRows: 4, maxRows: 4 }" show-word-limit maxlength="100" clearable :placeholder="$t('placeholder.input')"></el-input>
        </el-col>
      </el-row>
      <div slot="footer" class="DialogButton">
        <el-button size="mini" @click="save" type="primary">{{ $t("all.tip136") }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Holiday",
  components: {},
  data() {
    return {
      total: 0,
      agentList: [],
      CreatDialog: false,
      changeDiolog: false,
      operatorVO: {
        userId: "",
        operId: "",
        operName: "",
        agentId: "",
        pageNo: 1,
        pageSize: 10
      },
      creatorVo: {
        operAccount: "",
        operPassword: "",
        agentId: "",
        operName: "",
        description: ""
      },
      changeVo: {
        operAccount: "",
        operPassword: "",
        agentId: "",
        operName: "",
        description: ""
      },
      creatorList: [],
      tableData: []
    };
  },
  mounted() {
    this.operatorVO.userId = sessionStorage.getItem("LeagueUserId");
    this.search();
    this.getCreatorList();
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      const [year, time] = value.split("T");
      return `${year} ${time.slice(0, 5)}`;
    }
  },
  methods: {
    deleteOper(id) {
      this.$axios.post(`/operation/deloperationtestbyid?id=${id}`).then(res => {
        this.$message(res.data.msg);
        this.search();
      });
    },
    getCreatorList() {
      const userId = sessionStorage.getItem("LeagueUserId");
      this.$axios.post(`/operation/getcreatorlist?userId=${userId}`).then(res => {
        this.creatorList = res.data.data;
        this.agentList = res.data.data;
      });
    },
    push(data) {
      this.$router.push({
        path: "/competition",
        query: data
      });
    },
    create() {
      this.CreatDialog = true;
    },
    modify(id) {
      this.$axios.post(`/operation/operationDetails?operationId=${id}`).then(res => {
        this.changeVo.operationId = res.data.data.operationId;
        this.changeVo.operAccount = res.data.data.operAccount;
        this.changeVo.operPassword = res.data.data.operPassword;
        this.changeVo.agentId = res.data.data.agentId;
        this.changeVo.operName = res.data.data.operName;
        this.changeVo.description = res.data.data.description;
      });
      this.changeDiolog = true;
    },
    changeCreator() {
      this.$axios.post("/operation/updateoperationbyid", this.$qs.stringify(this.changeVo)).then(res => {
        this.$message(res.data.msg);
        this.changeVo.operAccount = "";
        this.changeVo.operPassword = "";
        this.changeVo.agentId = "";
        this.changeVo.operName = "";
        this.changeVo.description = "";
        this.search();
      });
      this.changeDiolog = false;
    },
    save() {
      this.creatorVo.createId = sessionStorage.getItem("LeagueUserId");
      this.$axios.post("/operation/addoperation", this.creatorVo).then(res => {
        this.$message(res.data.msg);
        this.creatorVo.operAccount = "";
        this.creatorVo.operPassword = "";
        this.creatorVo.agentId = "";
        this.creatorVo.operName = "";
        this.creatorVo.description = "";
        this.search();
      });
      this.CreatDialog = false;
    },
    delete() {},
    search() {
      this.$axios.post("/operation/getoperationlist", this.$qs.stringify(this.operatorVO)).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    currentChange(val) {
      this.operatorVO.pageNo = val;
      this.$axios.post("/operation/getoperationlist", this.$qs.stringify(this.operatorVO)).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    sizeChange(val) {
      this.operatorVO.pageSize = val;
      this.$axios.post("/operation/getoperationlist", this.$qs.stringify(this.operatorVO)).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
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
  display: flex;
}
.dialogButton {
  display: flex;
  justify-content: center;
}
.timeStyle div {
  width: 49.4%;
}
</style>
