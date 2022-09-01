(function(){"use strict";var e={9902:function(e,t,a){var r=a(144),l=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("div",{staticClass:"app-header"},[t("el-form",{ref:"formInline",staticClass:"app-header-form",attrs:{inline:!0,rules:e.formRules,model:e.formInline}},[t("el-form-item",[t("el-button",{staticStyle:{"margin-right":"15px"},attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!0,e.isConnect=!1}}},[e._v("切换MYSQL ")])],1),t("el-form-item",{attrs:{label:"数据库",prop:"dataBase"}},[t("el-select",{attrs:{filterable:"",placeholder:"请选择数据库"},on:{change:e.handleDatabase},model:{value:e.formInline.dataBase,callback:function(t){e.$set(e.formInline,"dataBase",t)},expression:"formInline.dataBase"}},e._l(e.dataBases,(function(e){return t("el-option",{key:e.Database,attrs:{value:e.Database,label:e.Database}})})),1)],1),t("el-form-item",{attrs:{label:"表",prop:"tableName"}},[t("el-select",{attrs:{filterable:"",multiple:"","collapse-tags":"",placeholder:"请选择表"},model:{value:e.formInline.tableName,callback:function(t){e.$set(e.formInline,"tableName",t)},expression:"formInline.tableName"}},e._l(e.tableNameArr,(function(e){return t("el-option",{key:e.tableName,attrs:{value:e.tableName,label:e.tableName}})})),1)],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.handleQuery}},[e._v("查询")])],1)],1)],1),t("div",{staticClass:"app-body"},[t("div",{staticClass:"app-body-tool"},[t("div",[t("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.handleGenerate}},[e._v("生成")])],1),t("div",[t("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.handleSelection("addForm")}}},[e._v("全选新增表单")]),t("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.handleSelection("searchForm")}}},[e._v("全选搜索表单")]),t("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.handleSelection("queryForm")}}},[e._v("全选查询表单")]),t("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.handleSelection("isRequired")}}},[e._v("全选是否必填")])],1)]),t("div",{staticClass:"app-body-table"},[t("el-table",{staticStyle:{width:"100%",height:"100%"},attrs:{data:e.tableData,height:"100%",border:""}},[t("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"55"}}),t("el-table-column",{attrs:{prop:"Field",align:"center",label:"字段"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-input",{attrs:{size:"small",placeholder:"请输入字段"},model:{value:a.row.Field,callback:function(t){e.$set(a.row,"Field",t)},expression:"scope.row.Field"}})]}}])}),t("el-table-column",{attrs:{align:"center",label:"字段<驼峰>"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",[e._v(e._s(e.camelCase(a.row.Field)))])]}}])}),t("el-table-column",{attrs:{prop:"Comment",align:"center",label:"注释<对应前端界面label>"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-input",{attrs:{size:"small",placeholder:"请输入名称"},model:{value:a.row.Comment,callback:function(t){e.$set(a.row,"Comment",t)},expression:"scope.row.Comment"}})]}}])}),t("el-table-column",{attrs:{prop:"component",align:"center",label:"展示组件"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-select",{attrs:{size:"small",placeholder:"请选择组件"},model:{value:a.row.component,callback:function(t){e.$set(a.row,"component",t)},expression:"scope.row.component"}},e._l(e.componentList,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)]}}])}),t("el-table-column",{attrs:{prop:"addForm",align:"center",width:"115",label:"新增表单"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-checkbox",{attrs:{"true-label":1,"false-label":0},model:{value:a.row.addForm,callback:function(t){e.$set(a.row,"addForm",t)},expression:"scope.row.addForm"}})]}}])}),t("el-table-column",{attrs:{prop:"searchForm",align:"center",width:"115",label:"搜索表单"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-checkbox",{attrs:{"true-label":1,"false-label":0},model:{value:a.row.searchForm,callback:function(t){e.$set(a.row,"searchForm",t)},expression:"scope.row.searchForm"}})]}}])}),t("el-table-column",{attrs:{prop:"queryForm",align:"center",width:"115",label:"查询表单"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-checkbox",{attrs:{"true-label":1,"false-label":0},model:{value:a.row.queryForm,callback:function(t){e.$set(a.row,"queryForm",t)},expression:"scope.row.queryForm"}})]}}])}),t("el-table-column",{attrs:{prop:"isRequired",align:"center",width:"115",label:"是否必填"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-checkbox",{attrs:{"true-label":1,"false-label":0},model:{value:a.row.isRequired,callback:function(t){e.$set(a.row,"isRequired",t)},expression:"scope.row.isRequired"}})]}}])})],1)],1)]),e.dialogVisible?t("el-dialog",{attrs:{title:e.isConnect?"连接MYSQL":"切换MYSQL","show-close":!e.isConnect,"close-on-click-modal":!1,visible:e.dialogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[t("el-form",{ref:"formData",attrs:{model:e.formData,rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"host",prop:"host"}},[t("el-input",{model:{value:e.formData.host,callback:function(t){e.$set(e.formData,"host",t)},expression:"formData.host"}})],1),t("el-form-item",{attrs:{label:"port",prop:"port"}},[t("el-input",{model:{value:e.formData.port,callback:function(t){e.$set(e.formData,"port",t)},expression:"formData.port"}})],1),t("el-form-item",{attrs:{label:"user",prop:"user"}},[t("el-input",{model:{value:e.formData.user,callback:function(t){e.$set(e.formData,"user",t)},expression:"formData.user"}})],1),t("el-form-item",{attrs:{label:"password",prop:"password"}},[t("el-input",{model:{value:e.formData.password,callback:function(t){e.$set(e.formData,"password",t)},expression:"formData.password"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e.isConnect?e._e():t("el-button",{on:{click:e.handleClose}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.handleClick}},[e._v("确 定")])],1)],1):e._e(),e.generateVisible?t("el-dialog",{attrs:{title:"生成模板","close-on-click-modal":!1,visible:e.generateVisible,width:"40%","before-close":e.handleGenerateClose},on:{"update:visible":function(t){e.generateVisible=t}}},[t("el-form",{ref:"generateForm",attrs:{model:e.generateForm,rules:e.generateRules,"label-width":"140px"}},[t("el-form-item",{attrs:{label:"生成文件的模板",prop:"templateFile"}},[t("el-input",{attrs:{readonly:"",placeholder:"请选择模板(*.ejs)"},nativeOn:{click:function(t){return e.vsPossMessage("getTemplateUrl",{canSelectFiles:!0,filters:{TypeScript:["ejs"]},canSelectFolders:!1,openLabel:"选择模板"})}},model:{value:e.generateForm.templateFile,callback:function(t){e.$set(e.generateForm,"templateFile",t)},expression:"generateForm.templateFile"}})],1),t("el-form-item",{attrs:{label:"生成到指定目录",prop:"path"}},[t("el-input",{attrs:{readonly:"",placeholder:"请选择文件路径"},nativeOn:{click:function(t){return e.vsPossMessage("getFolderUrl")}},model:{value:e.generateForm.path,callback:function(t){e.$set(e.generateForm,"path",t)},expression:"generateForm.path"}})],1),t("el-form-item",{attrs:{label:"生成文件的名称",prop:"fileName"}},[t("el-input",{attrs:{placeholder:"请输入文件名称(*.vue)"},model:{value:e.generateForm.fileName,callback:function(t){e.$set(e.generateForm,"fileName",t)},expression:"generateForm.fileName"}})],1),t("el-form-item",{attrs:{label:"其它配置"}},[t("span",{staticClass:"other-config-tip"},[e._v("(只能在默认配置上新增配置不能删除默认配置，属性没有值就为空字符串)")]),t("vue-json-editor",{staticClass:"json-editor",attrs:{showBtns:!1,mode:"code"},on:{"has-error":function(t){e.isJosn=!1},"json-change":function(t){e.isJosn=!0}},model:{value:e.otherConfig,callback:function(t){e.otherConfig=t},expression:"otherConfig"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.handleGenerateClose}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.handleGenerateSubmit}},[e._v("确 定")])],1)],1):e._e()],1)},o=[],s=a(3247),n=a(6486),i=a.n(n),c={components:{vueJsonEditor:s.Z},data(){return{isJosn:!0,isConnect:!0,formData:{host:"",port:"",user:"",password:""},otherConfig:{"左侧树标题":"","树接口":"","主键":"","查询接口":"","查询详情接口":"","保存接口":"","修改接口":"","删除接口":""},generateForm:{path:"",fileName:"",templateFile:""},generateRules:{path:{required:!0,message:"指定文件夹不能为空",trigger:["change","blur"]},fileName:{required:!0,message:"文件名称不能为空",trigger:["change","blur"]},templateFile:{required:!0,message:"模板文件不能为空",trigger:["change","blur"]}},formInline:{dataBase:"",tableName:""},componentList:[],formRules:{dataBase:{required:!0,message:"数据库不能为空",trigger:["change","blur"]},tableName:{required:!0,message:"表不能为空",trigger:["change","blur"]}},rules:{host:{required:!0,message:"host不能为空",trigger:["change","blur"]},port:{required:!0,message:"port不能为空",trigger:["change","blur"]},user:{required:!0,message:"user不能为空",trigger:["change","blur"]},password:{required:!0,message:"password不能为空",trigger:["change","blur"]}},dialogVisible:!0,generateVisible:!1,vscodeApi:null,dataBases:[],tableNameArr:[],tableData:[]}},mounted(){let e=this;e.vscodeApi=acquireVsCodeApi&&acquireVsCodeApi(),window.addEventListener("message",(function(t){switch(t.data.command){case"webGeneratorConfig":let a=i().get(t,"data.data",{});Object.assign(e.formData,i().get(a,"connect",{})),e.componentList=i().get(a,"componentList",[]);break;case"getDataBases":e.dataBases=t.data.data,e.handleClose();break;case"getTableName":e.tableNameArr=t.data.data;break;case"getTableColumn":e.handleTableData(t.data.data);break;case"getFolderUrl":e.generateForm.path=t.data.data||"";break;case"getTemplateUrl":e.generateForm.templateFile=t.data.data||"";break;case"tips":e.handleTip(t.data.data);break}}))},methods:{camelCase(e){return i().camelCase(e)},handleGenerateClose(){this.$refs.generateForm.resetFields(),this.generateVisible=!1},handleGenerateSubmit(){this.$refs["generateForm"].validate((e=>{if(e){if(!this.isJosn)return this.$message.warning("其它配置JSON格式有误");this.vsPossMessage("createAFile",{generateForm:this.generateForm,data:this.getTemplateData()}),this.handleGenerateClose()}}))},getTemplateData(){let e={kdata:[],queryList:[],searchList:[],insertList:[],requiredList:[]};for(let t in this.otherConfig)e.kdata.push({key:t,value:this.otherConfig[t]});return this.tableData.map((t=>{"是"==t.primaryKey&&e.kdata.map((e=>{"主键"===e.key&&Object.assign(e,{value:t.Field})})),t.addForm&&e.insertList.push(t),t.queryForm&&e.queryList.push(t),t.searchForm&&e.searchList.push(t),t.isRequired&&e.requiredList.push(t)})),console.log(e),e},handleGenerate(){if(!this.tableData.length)return this.$message.warning("没有数据无法生成");const e=this.getTemplateData();if(!e.queryList.length&&!e.searchList.length&&!e.insertList.length&&!e.requiredList.length)return this.$message.warning("表单配置必须勾选一项");this.generateVisible=!0},handleSelection(e){this.tableData.map((t=>{t[e+"State"]=void 0!=t[e+"State"]&&1==t[e+"State"]?0:1,this.$set(t,e,t[e+"State"])}))},handleTip(e){this.$message({showClose:!0,duration:1500,offset:80,...e})},handleTableData(e){this.tableData=(e||[]).map((e=>({Field:e.Field,Comment:e.label,primaryKey:e.primaryKey,component:"",addForm:0,searchForm:0,queryForm:0,isRequired:0})))},handleDatabase(e){this.vsPossMessage("getTableName",e),this.formInline.tableName="",this.tableData=[]},handleQuery(){this.$refs["formInline"].validate((e=>{e&&(this.tableData=[],this.vsPossMessage("getTableColumn",this.formInline))}))},handleClose(){this.$refs.formData.resetFields(),this.dialogVisible=!1},handleClick(){this.$refs["formData"].validate((e=>{e&&(this.isConnect||(this.dataBases=[],this.tableNameArr=[],this.tableData=[],Object.assign(this.formInline,{dataBase:"",tableName:""})),this.vsPossMessage("getConnection",this.formData))}))},vsPossMessage(e,t){this.vscodeApi&&this.vscodeApi.postMessage({command:e,data:t})},handlePreview(){}}},u=c,d=a(1001),m=(0,d.Z)(u,l,o,!1,null,"f29252f8",null),p=m.exports,f=a(4720),b=a.n(f);r["default"].use(b()),r["default"].config.productionTip=!1,new r["default"]({render:e=>e(p)}).$mount("#app")}},t={};function a(r){var l=t[r];if(void 0!==l)return l.exports;var o=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(o.exports,o,o.exports,a),o.loaded=!0,o.exports}a.m=e,function(){var e=[];a.O=function(t,r,l,o){if(!r){var s=1/0;for(u=0;u<e.length;u++){r=e[u][0],l=e[u][1],o=e[u][2];for(var n=!0,i=0;i<r.length;i++)(!1&o||s>=o)&&Object.keys(a.O).every((function(e){return a.O[e](r[i])}))?r.splice(i--,1):(n=!1,o<s&&(s=o));if(n){e.splice(u--,1);var c=l();void 0!==c&&(t=c)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[r,l,o]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){var e={826:0};a.O.j=function(t){return 0===e[t]};var t=function(t,r){var l,o,s=r[0],n=r[1],i=r[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(l in n)a.o(n,l)&&(a.m[l]=n[l]);if(i)var u=i(a)}for(t&&t(r);c<s.length;c++)o=s[c],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(u)},r=self["webpackChunkvue"]=self["webpackChunkvue"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=a.O(void 0,[998],(function(){return a(9902)}));r=a.O(r)})();
//# sourceMappingURL=index.a0babc68.js.map