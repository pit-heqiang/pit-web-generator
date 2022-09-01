<template>
  <div id="app">
    <div class="app-header">
      <el-form :inline="true" class="app-header-form" ref="formInline" :rules="formRules" :model="formInline">
        <el-form-item>
          <el-button type="primary" @click="dialogVisible = true;isConnect=false" style="margin-right: 15px;">切换MYSQL
          </el-button>
        </el-form-item>
        <el-form-item label="数据库" prop="dataBase">
          <el-select v-model="formInline.dataBase" filterable @change="handleDatabase" placeholder="请选择数据库">
            <el-option v-for="item in dataBases" :key="item.Database" :value="item.Database" :label="item.Database">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表" prop="tableName">
          <el-select v-model="formInline.tableName" filterable multiple placeholder="请选择表">
            <el-option v-for="item in tableNameArr" :key="item.TABLE_NAME" :value="item.TABLE_NAME"
              :label="item.TABLE_NAME">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="app-body">
      <div class="app-body-tool">
        <div>
          <el-button type="primary" size="small" @click="handleGenerate">生成</el-button>
        </div>
        <div>
          <el-button type="primary" @click="handleSelection('addForm')" size="small">全选新增表单</el-button>
          <el-button type="primary" @click="handleSelection('searchForm')" size="small">全选搜索表单</el-button>
          <el-button type="primary" @click="handleSelection('queryForm')" size="small">全选查询表单</el-button>
          <el-button type="primary" @click="handleSelection('isRequired')" size="small">全选是否必填</el-button>
        </div>
      </div>
      <div class="app-body-table">
        <el-table :data="tableData" height="100%" border style="width: 100%;height:100%">
          <el-table-column type="index" label="序号" align="center" width="55">
          </el-table-column>
          <el-table-column prop="Field" align="center" label="字段">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.Field" placeholder="请输入字段"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="字段<驼峰>">
            <template slot-scope="scope">
              <span>{{camelCase(scope.row.Field)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Comment" align="center" label="注释<对应前端界面label>">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.Comment" placeholder="请输入名称"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="component" align="center" label="展示组件">
            <template slot-scope="scope">
              <el-select size="small" v-model="scope.row.component" placeholder="请选择组件">
                <el-option v-for="item in componentList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="addForm" align="center" width="115" label="新增表单">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.addForm" :true-label="1" :false-label="0"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="searchForm" align="center" width="115" label="搜索表单">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.searchForm" :true-label="1" :false-label="0"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="queryForm" align="center" width="115" label="查询表单">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.queryForm" :true-label="1" :false-label="0"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="isRequired" align="center" width="115" label="是否必填">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.isRequired" :true-label="1" :false-label="0"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="isConnect ? '连接MYSQL' : '切换MYSQL'" :show-close="!isConnect" :close-on-click-modal="false"
      :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="100px">
        <el-form-item label="host" prop="host">
          <el-input v-model="formData.host"></el-input>
        </el-form-item>
        <el-form-item label="port" prop="port">
          <el-input v-model="formData.port"></el-input>
        </el-form-item>
        <el-form-item label="user" prop="user">
          <el-input v-model="formData.user"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" v-if="!isConnect">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="生成模板" :close-on-click-modal="false" :visible.sync="generateVisible" v-if="generateVisible"
      width="40%" :before-close="handleGenerateClose">
      <el-form :model="generateForm" :rules="generateRules" ref="generateForm" label-width="140px">
        <el-form-item label="生成文件的模板" prop="templateFile">
          <el-input v-model="generateForm.templateFile" readonly
            @click.native="vsPossMessage('getTemplateUrl', {canSelectFiles: true, filters: {'TypeScript': ['ejs']}, canSelectFolders: false, openLabel: '选择模板'})"
            placeholder="请选择模板(*.ejs)">
          </el-input>
        </el-form-item>
        <el-form-item label="生成到指定目录" prop="path">
          <el-input v-model="generateForm.path" readonly @click.native="vsPossMessage('getFolderUrl')"
            placeholder="请选择文件路径">
          </el-input>
        </el-form-item>
        <el-form-item label="生成文件的名称" prop="fileName">
          <el-input v-model="generateForm.fileName" placeholder="请输入文件名称(*.vue)"></el-input>
        </el-form-item>
        <el-form-item label="其它配置">
          <span class="other-config-tip">(只能在默认配置上新增配置不能删除默认配置，属性没有值就为空字符串)</span>
          <vue-json-editor class="json-editor" @has-error="isJosn = false" v-model="otherConfig"
            @json-change="isJosn = true" :showBtns="false" :mode="'code'" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleGenerateClose">取 消</el-button>
        <el-button type="primary" @click="handleGenerateSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import vueJsonEditor from 'vue-json-editor';
import _ from 'lodash';
export default {
  components: {
    vueJsonEditor
  },
  data() {
    return {
      isJosn: true,
      isConnect: true,
      formData: {
        host: '',
        port: '',
        user: '',
        password: ''
      },
      otherConfig: {
        "左侧树标题": "",
        "树接口": "",
        "主键": "",
        "查询接口": "",
        "查询详情接口": "",
        "保存接口": "",
        "修改接口": "",
        "删除接口": ""
      },
      generateForm: {
        path: '',
        fileName: '',
        templateFile: '',
      },
      generateRules: {
        path: { required: true, message: '指定文件夹不能为空', trigger: ["change", 'blur'] },
        fileName: { required: true, message: '文件名称不能为空', trigger: ["change", 'blur'] },
        templateFile: { required: true, message: '模板文件不能为空', trigger: ["change", 'blur'] },
      },
      formInline: {
        dataBase: '',
        tableName: ''
      },
      componentList: [],
      formRules: {
        dataBase: { required: true, message: '数据库不能为空', trigger: ["change", 'blur'] },
        tableName: { required: true, message: '表不能为空', trigger: ["change", 'blur'] },
      },
      rules: {
        host: { required: true, message: 'host不能为空', trigger: ["change", 'blur'] },
        port: { required: true, message: 'port不能为空', trigger: ["change", 'blur'] },
        user: { required: true, message: 'user不能为空', trigger: ["change", 'blur'] },
        password: { required: true, message: 'password不能为空', trigger: ["change", 'blur'] }
      },
      dialogVisible: true,
      generateVisible: false,
      vscodeApi: null,
      dataBases: [],
      tableNameArr: [],
      tableData: []
    };
  },
  mounted() {
    let _this = this;
    _this.vscodeApi = acquireVsCodeApi && acquireVsCodeApi();
    window.addEventListener('message', function (res) {
      switch (res.data.command) {
        case 'webGeneratorConfig':
          let obj = _.get(res, 'data.data', {});
          Object.assign(_this.formData, _.get(obj, 'connect', {}));
          _this.componentList = _.get(obj, 'componentList', []);
          break;
        case 'getDataBases':
          _this.dataBases = res.data.data;
          _this.handleClose();
          break;
        case 'getTableName':
          _this.tableNameArr = res.data.data;
          break;
        case 'getTableColumn':
          _this.handleTableData(res.data.data);
          break;
        case 'getFolderUrl':
          _this.generateForm.path = res.data.data || '';
          break;
        case 'getTemplateUrl':
          _this.generateForm.templateFile = res.data.data || '';
          break;
        case 'tips':
          _this.handleTip(res.data.data);
          break;
      }
    })
  },
  methods: {
    camelCase(str) {
      return _.camelCase(str)
    },
    handleGenerateClose() {
      this.$refs.generateForm.resetFields();
      this.generateVisible = false;
    },
    handleGenerateSubmit() {
      this.$refs['generateForm'].validate((valid) => {
        if (valid) {
          if (!this.isJosn) {
            return this.$message.warning("其它配置JSON格式有误");
          }
          this.vsPossMessage('createAFile', {
            generateForm: this.generateForm,
            data: this.getTemplateData()
          });
          this.handleGenerateClose();
        }
      })
    },
    getTemplateData() {
      let data = {
        kdata: [],
        queryList: [], // 表格列
        searchList: [], // 搜索条件
        insertList: [], // 新增
        requiredList: [] // 是否必填
      }
      for (let key in this.otherConfig) {
        data.kdata.push({
          key,
          value: this.otherConfig[key]
        })
      }
      this.tableData.map(item => {
        if (item.primaryKey == '是') {
          data.kdata.map(v => {
            v.key === '主键' && Object.assign(v, { value: item.Field })
          });
        }
        item.addForm && data.insertList.push(item);
        item.queryForm && data.queryList.push(item);
        item.searchForm && data.searchList.push(item);
        item.isRequired && data.requiredList.push(item);
      });
      console.log(data);
      return data;
    },
    handleGenerate() {
      if (!this.tableData.length) {
        return this.$message.warning("没有数据无法生成");
      }
      const obj = this.getTemplateData();
      if (!obj.queryList.length && !obj.searchList.length && !obj.insertList.length && !obj.requiredList.length) {
        return this.$message.warning("表单配置必须勾选一项");
      }
      this.generateVisible = true;
    },
    handleSelection(Field) {
      this.tableData.map(item => {
        item[Field + 'State'] = item[Field + 'State'] != undefined ? item[Field + 'State'] == 1 ? 0 : 1 : 1;
        this.$set(item, Field, item[Field + 'State']);
      })
    },
    handleTip(data) {
      this.$message({ showClose: true, duration: 1500, offset: 80, ...data });
    },
    handleTableData(data) {
      this.tableData = (data || []).map(item => {
        return {
          Field: item.Field,
          Comment: item.label,
          primaryKey: item.primaryKey,
          component: '',
          addForm: 0,
          searchForm: 0,
          queryForm: 0,
          isRequired: 0
        }
      });
    },
    handleDatabase(val) {
      this.vsPossMessage('getTableName', val);
      this.formInline.tableName = '';
      this.tableData = [];
    },
    handleQuery() {
      this.$refs['formInline'].validate((valid) => {
        if (valid) {
          this.tableData = [];
          this.vsPossMessage('getTableColumn', this.formInline);
        }
      });
    },
    handleClose() {
      this.$refs.formData.resetFields();
      this.dialogVisible = false;
    },
    handleClick() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          if (!this.isConnect) {
            this.dataBases = [];
            this.tableNameArr = [];
            this.tableData = [];
            Object.assign(this.formInline, {
              dataBase: '',
              tableName: ''
            })
          }
          this.vsPossMessage('getConnection', this.formData);
        }
      })
    },
    vsPossMessage(command, data) {
      this.vscodeApi && this.vscodeApi.postMessage({
        command: command,
        data: data
      })
    },
    handlePreview() {

    }
  }
};
</script>

<style lang="less" scoped>
#app {
  height: 100%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: #efefef;
  .app-header {
    background: #fff;
    padding: 20px 10px;
  }
  .app-body {
    height: calc(100% - 90px);
    margin: 10px 0px;
    background: #fff;
    .app-body-tool {
      padding: 10px;
      display: flex;
      justify-content: space-between;
    }
    .app-body-table {
      height: calc(100% - 52px);
    }
  }
  .other-config-tip {
    font-size: 12px;
    color: red;
  }
}
</style>
