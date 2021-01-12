<template>
  <div class="content">
    <div class="search">
      <el-row class="center-Row">
        <el-col class="label-g" :span="3">
          {{ $t("all.tip17") }}
        </el-col>
        <el-col :span="4">
          <el-select v-model="holidayVO.countryId" :placeholder="$t('placeholder.select')" clearable>
            <el-option v-for="item in ContinentArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="lineClass">
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
        <el-table-column :label="$t('all.tip17')" min-width="10%">
          <template slot-scope="scope">
            <div>{{ returnCountry(scope.row.countryId) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="holidayName" :label="$t('all.tip434')" min-width="10%"> </el-table-column>
        <el-table-column :label="$t('all.tip436')" min-width="10%">
          <template slot-scope="scope">
            {{ scope.row.holidayStartTime.split(' ')[0] }}-{{ scope.row.holidayEndTime.split(' ')[0] }}
          </template>
        </el-table-column>
        <el-table-column prop="holidayDescribe" :label="$t('all.tip49')" min-width="20%"> </el-table-column>
        <el-table-column min-width="10%">
          <div slot-scope="scope" class="tableStyle">
            <el-button size="mini" type="primary" @click="modify(scope.row.id)">{{ $t("all.tip435") }}</el-button>
            <el-button size="mini" type="primary" @click="deleteHoliday(scope.row.id)">{{ $t("all.tip130") }}</el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page='1' :page-sizes="[10, 50, 100, 200]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>

    <el-dialog :title="$t('all.tip437')" :visible.sync="holidayDialog">
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip17") }}
        </el-col>
        <el-col :span="20" id="divBoxWidth">
          <el-select v-model="holidayDialogVO.countryId" :placeholder="$t('placeholder.select')" clearable>
            <el-option v-for="item in ContinentArr" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip438") }}
        </el-col>
        <el-col :span="20">
          <el-input v-model="holidayDialogVO.holidayName" :placeholder="$t('all.tip65')" autocomplete="off" maxlength="30" show-word-limit clearable></el-input>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip436") }}
        </el-col>
        <el-col :span="9">
          <el-date-picker v-model="holidayDialogVO.holidayStartTime" type="date" value-format="yyyy-MM-dd" :placeholder="$t('placeholder.datePicker')" clearable @change="change"> </el-date-picker>
        </el-col>
        <el-col :span="2" class="lineClass">-</el-col>
        <el-col :span="9">
          <el-date-picker v-model="holidayDialogVO.holidayEndTime" type="date" value-format="yyyy-MM-dd" :placeholder="$t('placeholder.datePicker')" :picker-options="pickerOptions" clearable> </el-date-picker>
        </el-col>
      </el-row>
      <el-row class="center-Row">
        <el-col class="label-g" :span="4">
          {{ $t("all.tip49") }}
        </el-col>
        <el-col :span="20">
          <el-input v-model="holidayDialogVO.holidayDescribe" :placeholder="$t('all.tip65')" type="textarea" maxlength="300" show-word-limit :autosize="{ minRows: 4, maxRows: 4 }" autocomplete="off" clearable></el-input>
        </el-col>
      </el-row>
      <div slot="footer" class="dialogButton">
        <el-button type="primary" size="mini" @click="save">{{ $t('all.tip136') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Holiday',
  components: {},
  data() {
    const vm = this;
    return {
      pickerOptions: {
        disabledDate(time) {
          const date1 = new Date(vm.holidayDialogVO.holidayStartTime);
          return time.getTime() < date1;
        }
      },
      holidayVO: {
        userId: '',
        ownerUserId: -1,
        countryId: '',
        pageNo: 1,
        pageSize: 10
      },
      total: 1,
      ContinentArr: [],
      holidayDialog: false,
      holidayDialogVO: {
        userId: sessionStorage.getItem('userId'),
        countryId: '',
        holidayName: '',
        holidayStartTime: '',
        holidayEndTime: '',
        holidayDescribe: ''
      },
      tableData: [],
      flag: 1,
      id: ''
    };
  },
  mounted() {
    this.holidayVO.userId = sessionStorage.getItem('userId');
    this.$axios.post('/getcountry', this.$qs.stringify({ creatorId: this.holidayVO.userId })).then(res => {
      this.ContinentArr = res.data.data;
    });
    this.search();
  },
  methods: {
    returnCountry(id) {
      let label = '';
      this.ContinentArr.forEach(i => {
        if (i.id === id) {
          label = i.label;
        }
      });
      return label;
    },
    search() {
      this.holidayVO.countryId = this.holidayVO.countryId || -1;
      this.$axios.post('/holiday/getholiday', this.holidayVO).then(res => {
        this.total = res.data.data.total;
        this.tableData = res.data.data.list;
        this.holidayVO.countryId = '';
      });
    },
    create() {
      this.flag = 1;
      this.holidayDialogVO.countryId = '';
      this.holidayDialogVO.holidayName = '';
      this.holidayDialogVO.holidayStartTime = '';
      this.holidayDialogVO.holidayEndTime = '';
      this.holidayDialogVO.holidayDescribe = '';
      this.holidayDialog = true;
    },
    save() {
      let url = '';
      if (this.flag === 1) {
        url = 'holiday/addholiday';
        delete this.holidayDialogVO.id;
      } else {
        url = 'holiday/modifyholiday';
        this.holidayDialogVO.id = this.id;
        this.holidayDialogVO.userId = sessionStorage.getItem('userId');
      }
      this.$axios.post(`/${url}`, this.holidayDialogVO).then(res => {
        this.$message(res.data.msg);
        this.search();
      });
      this.holidayDialog = false;
    },
    modify(id) {
      this.flag = 2;
      this.id = id;
      this.tableData.forEach(i => {
        if (i.id === id) {
          this.holidayDialogVO.countryId = i.countryId;
          this.holidayDialogVO.holidayName = i.holidayName;
          this.holidayDialogVO.holidayStartTime = i.holidayStartTime;
          this.holidayDialogVO.holidayEndTime = i.holidayEndTime;
          this.holidayDialogVO.holidayDescribe = i.holidayDescribe;
        }
      });
      this.holidayDialog = true;
    },
    deleteHoliday(id) {
      const data = {
        userId: sessionStorage.getItem('userId'),
        id
      };
      this.$axios.post('/holiday/delholidaybyid', this.$qs.stringify(data)).then(res => {
        this.$message(res.data.msg);
        this.search();
      });
    },
    currentChange(value) {
      this.holidayVO.pageNo = value;
      this.holidayVO.countryId = this.holidayVO.countryId || -1;
      this.$axios.post('/holiday/getholiday', this.holidayVO).then(res => {
        this.total = res.data.data.total;
        this.tableData = res.data.data.list;
      });
    },
    sizeChange(value) {
      this.holidayVO.pageSize = value;
      this.holidayVO.countryId = this.holidayVO.countryId || -1;
      this.$axios.post('/holiday/getholiday', this.holidayVO).then(res => {
        this.total = res.data.data.total;
        this.tableData = res.data.data.list;
      });
    },
    change(value) {
      if (value) {
        this.holidayDialogVO.holidayEndTime = '';
      }
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
