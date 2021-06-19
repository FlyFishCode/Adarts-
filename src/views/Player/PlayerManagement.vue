<template>
  <div class="content">
    <div class="box">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip1") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle">
          {{ AddMemberVO.competition }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip6") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle">
          {{ AddMemberVO.status }}
        </el-col>
      </el-row>
      <el-row>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip5") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle">
          {{ AddMemberVO.type }}
        </el-col>
        <el-col class="label-g" :span="3">
          {{ $t("all.tip7") }}
        </el-col>
        <el-col :span="4" class="overFlowStyle">
          {{ AddMemberVO.period }}
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="4" class="btnClass">
        <el-button type="primary" size="mini" @click="add">{{ "Add Menber" }}</el-button>
      </el-col>
    </el-row>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" :label="$t('all.tip257')" width="55"> </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip258')" min-width="8%">
          <template>
            <div class="formImgBox">
              <img src="../../assets/img/2.jpg" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip259')" min-width="6%"></el-table-column>
        <el-table-column prop="date" :label="$t('all.tip208')" min-width="5%"></el-table-column>
        <el-table-column prop="date" :label="$t('all.tip260')" min-width="7%"> </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip247')" min-width="13%"> </el-table-column>
        <el-table-column prop="date" label="AdartsPPD" min-width="6%"> </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip156')" min-width="5%"> </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip154')" min-width="5%"> </el-table-column>
        <el-table-column prop="date" label="LeaguePPD" min-width="6%"> </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip156')" min-width="5%"> </el-table-column>
        <el-table-column prop="date" :label="$t('all.tip25')" min-width="5%"> </el-table-column>
        <el-table-column min-width="5%">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="remove(scope.$index, scope.row)">{{ $t("all.tip134") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="1"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
    <div>
      <el-dialog title="Add Member" :visible.sync="dialogTableVisible">
        <el-row class="center-Row">
          <el-col class="label-g" :span="4">
            {{ $t("all.tip268") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="AddMemberVO.ID" clearable :placeholder="$t('all.tip38')"></el-input>
          </el-col>
          <el-col class="label-g" :span="4">
            {{ $t("all.tip324") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="AddMemberVO.Name" clearable :placeholder="$t('all.tip38')"></el-input>
          </el-col>
          <el-col class="label-g" :span="4">
            {{ $t("all.tip260") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="AddMemberVO.CardNumber" clearable :placeholder="$t('all.tip38')"></el-input>
          </el-col>
        </el-row>
        <el-row class="center-Row">
          <el-col class="label-g" :span="4">
            {{ $t("all.tip208") }}
          </el-col>
          <el-col :span="4">
            <el-select v-model="AddMemberVO.Gender" :placeholder="$t('all.tip516')">
              <el-option :label="$t('all.tip209')" value="1"></el-option>
              <el-option :label="$t('all.tip210')" value="2"></el-option>
            </el-select>
          </el-col>
          <el-col class="label-g" :span="4">
            {{ "Home Shop" }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="AddMemberVO.HomeShop" clearable :placeholder="$t('all.tip38')"></el-input>
          </el-col>
          <el-col class="label-g" :span="4">
            {{ $t("all.tip316") }}
          </el-col>
          <el-col :span="4">
            <el-input v-model="AddMemberVO.TeamName" clearable :placeholder="$t('all.tip38')"></el-input>
          </el-col>
        </el-row>
        <el-row class="DialogButton">
          <el-col :span="2">
            <el-button type="primary" size="mini" @click="search">{{ $t("all.tip10") }}</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" @selection-change="SelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column property="name" :label="$t('all.tip259')" min-width="15%"> </el-table-column>
          <el-table-column property="name" :label="$t('all.tip208')" min-width="10%"></el-table-column>
          <el-table-column property="address" :label="$t('all.tip260')" min-width="16%"></el-table-column>
          <el-table-column property="address" label="Home Shop" min-width="15%"></el-table-column>
          <el-table-column property="address" label="Adarts">
            <el-table-column property="address" :label="$t('all.tip154')" min-width="10%"></el-table-column>
            <el-table-column property="address" :label="$t('all.tip155')" min-width="10%"></el-table-column>
            <el-table-column property="address" :label="$t('all.tip156')" min-width="10%"></el-table-column>
          </el-table-column>
          <el-table-column property="address" :label="$t('all.tip1')">
            <el-table-column property="address" :label="$t('all.tip154')" min-width="10%"></el-table-column>
            <el-table-column property="address" :label="$t('all.tip155')" min-width="10%"></el-table-column>
            <el-table-column property="address" :label="$t('all.tip156')" min-width="10%"></el-table-column>
          </el-table-column>
        </el-table>
        <el-row style="display:flex;justify-content:center;margin-top:100px">
          <el-col :span="2">
            <el-button type="primary" size="mini" @click="addTopbox">{{ $t("all.tip132") }}</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      dialogTableVisible: false,
      multipleSelection: [],
      AddMemberVO: {
        ID: "",
        Name: "",
        CardNumber: "",
        Gender: "",
        HomeShop: "",
        TeamName: ""
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  methods: {
    add() {
      this.dialogTableVisible = true;
    },
    SelectionChange(val) {
      this.multipleSelection = val;
    },
    addTopbox() {
      this.dialogTableVisible = false;
    },
    search() {},
    remove() {},
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
.btnClass {
  height: 40px;
  line-height: 35px;
  padding-left: 10px;
}
.topBox {
  display: flex;
}
.formImgBox {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}
.formImgBox img {
  width: 100%;
  height: 100%;
}
</style>
