<template>
  <div class="al-page-detail">
    <template v-for="(child, index) in children">
      <AlForm
        ref="forms"
        v-if="child.type === 'form' && !child.hide"
        :model="getModel(child)"
        :cols="child.cols || 3"
        :name="child.name"
        :loading="child.loading"
        :classList="child.classList"
        :styleMap="child.styleMap"
        :key="child.primaryKey"
        :schema="child"
        :fields="generateFormFields(child)"
        :extra="extra"
      />
      <AlTable
        ref="tables"
        v-if="child.type === 'table' && !child.hide"
        :model="getModel(child)"
        :name="child.name"
        :loading="child.loading"
        :extra="extra"
        :classList="child.classList"
        :styleMap="child.styleMap"
        :key="child.primaryKey"
        :children="child.children"
        :schema="child"
        :columns="generateTableColumns(child)"
        @onAddBtnClick="onTableAddBtnClick(getModel(child), child)"
        @onPageSizeChange="onTablePageSizeChange($event, child)"
        @onPageIndexChange="onTablePageIndexChange($event, child)"
        :pagination="child.pagination"
        :hideAddBtn="child.hideAddBtn"
        :hideDelBtn="child.hideDelBtn"
        @onSortChange="onTableSortChange($event, child)"
        @onDelBtnClick="onTableDelBtnClick($event, getModel(child), child)"
      />

      <component
        v-if="isShow(child) && noSlot(child)"
        :is="child.tag"
        :key="index"
        :value="getAttr(child, 'value')"
        :model="getValue(child)"
        :extra="extra"
        v-bind="{ ...child, ...child.attrs, ...child.hooks }"
        :children="child.children"
        :schema="child"
        v-on="getEvents(child)"
      />
    </template>

    <AlLayout :model="model" justifyContent="flex-end" :children="[operationLayout]" />
  </div>
</template>

<script>
import AlForm from '../al-form/al-form'
import AlTable from '../al-table/al-table'
import AlLayout from '../al-layout/al-layout'
import ContainerMixin from '../../mixins/container'

import { alGetterCoolPath } from '../../utils'

const DEFAULT_LABEL_WIDTH = '150px'

function findValuesetFields (schemas = []) {
  const rst = []
  let children = []
  schemas.forEach(schema => {
    const fields = schema.fields || schema.columns || this.getAttr(schema, 'fields') || this.getAttr(schema, 'columns') || []
    fields.forEach(field => {
      // 处理page-detail中type: 'form/table'的字段
      if (field.type === 'valueset') {
        rst.push(field)
      }

      // 处理基于原生schema的字段
      if (this.getAttr(field, 'type') === 'valueset') {
        rst.push(field.attrs)
      }
    })
    children = children.concat(schema.children || [])
  })
  return children.length ? rst.concat(findValuesetFields.call(this, children)) : rst
}

/**
 * 详情页面
 * @displayName Al Page Detail
 */
export default {
  mixins: [ContainerMixin],

  provide () {
    const _this = this
    return {
      registerValidationComponent (ref) {
        const index = _this.childrenHaveValidation.findIndex(
          child => child === ref
        )
        if (index < 0) {
          _this.childrenHaveValidation.push(ref)
        }
      },

      unregisterValidationComponent (ref) {
        const index = _this.childrenHaveValidation.findIndex(
          child => child === ref
        )
        if (index > 0) {
          _this.childrenHaveValidation.splice(index, 1)
        }
      }
    }
  },

  props: {
    /**
     * 主键
     */
    primaryKey: {
      required: true,
      type: String
    },

    /**
     * 查询数据用的api
     */
    searchApi: {
      required: true,
      type: String
    },

    /**
     * 创建用的api
     */
    createApi: {
      required: true,
      type: String
    },

    /**
     * 更新用的api
     */
    updateApi: {
      required: true,
      type: String
    },

    /**
     * 子元素
     */
    children: {
      type: Array,
      default () {
        return []
      }
    },

    /**
     * 保存前的钩子函数
     */
    beforeSaveHook: {
      type: Function,
      required: true
    },

    /**
     * 调用请求时额外需要在URL中传递的参数 { name: 1 } : /xxx/{name} => /xxx/1. 尽量不要使用
     */
    extraApiParams: {
      type: Object,
      default () {
        return {}
      }
    },

    /**
     * 隐藏保存按钮
     */
    hideSaveBtn: {
      type: Boolean
    }
  },

  data () {
    return {
      // 1： 新建，2：修改，3：只读
      mode: '1',

      // 所有需要校验的子组件
      childrenHaveValidation: [],

      // 加载状态
      submitting: false
    }
  },

  computed: {
    operationLayout () {
      return {
        tag: 'al-layout',
        styleMap: {
          marginTop: '20px'
        },
        children: [
          {
            tag: 'al-button',
            children: [],
            hide: this.hideSaveBtn,
            attrs: {
              loading: this.submitting,
              type: 'primary',
              text: '保存'
            },
            events: {
              onClick: this.onSaveBtnClick.bind(this)
            }
          },

          // 从pageDetail的children中筛选出slot: 'operation'的子元素，实现插槽的功能
          ...this.children.filter(child => child.slot === 'operation')
        ]
      }
    }
  },

  components: {
    AlForm,
    AlTable,
    AlLayout
  },

  mounted () {
    // 根据URL参数判断当前页面的状态
    // this.mode = this.$route.query.mode
    this.getDetail()
    this.getValueSets()
  },

  methods: {
    /**
     * 判断元素是否没有slot
     * @private
     */
    noSlot (schema) {
      return !schema.slot
    },

    /**
     * @private
     */
    isShow (field = {}) {
      const hide = field.hide
      if (typeof hide === 'boolean') {
        return !hide
      }
      if (typeof hide === 'function') {
        return !hide(this.model, this.extra)
      }
      return true
    },

    getEvent (field = {}, name) {
      return (field.events || {})[name] || (_ => _)
    },

    getValue (schema) {
      return alGetterCoolPath(this.model, this.getAttr(schema, 'primaryKey'))
    },

    getModel (schema) {
      return alGetterCoolPath(this.model, schema.primaryKey)
    },

    onTableDelBtnClick (event, model, schema) {
      // const schemaEvent = getEvent(schema, 'onDelete')
      // schemaEvent(event, schema, this.extra)
      this.$emit('onTableDelBtnClick', { data: event, model, schema })
    },

    onTableSortChange (event, schema) {
      this.$emit('onTableSortChange', { data: event, schema })
    },

    onTablePageIndexChange (event, schema) {
      this.$emit('onTablePageIndexChange', { data: event, schema })
    },

    onTablePageSizeChange (event, schema) {
      this.$emit('onTablePageSizeChange', { data: event, schema })
    },

    onTableAddBtnClick (data, schema) {
      this.$emit('onTableAddBtnClick', { data, schema })
    },

    /**
     * 校验详情中所有需要校验的元素
     */
    validate () {
      return Promise.all(
        this.childrenHaveValidation.map(ins => ins.validate())
      )
    },

    async onSaveBtnClick () {
      const validStatuses = await this.validate()
      const isAllValid = !validStatuses.filter(_ => !_).length
      if (isAllValid) {
        this.saveDetail()
      }
    },

    async saveDetail () {
      const code = this.$route.query[this.primaryKey]
      const url = code ? this.updateApi : this.createApi
      const beforeSaveHook = this.beforeSaveHook
      try {
        const requestParams = beforeSaveHook()
        if (!requestParams) {
          return
        }
        this.toggleLoading(true)
        const rst = await this.$http.post(
          url,
          requestParams,
          this.extraApiParams || {}
        )
        if (rst.code === 'success') {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.reloadPage(code || rst.data[0])
        } else {
          this.$message({
            message: rst.msg,
            type: 'error'
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.toggleLoading(false)
      }
    },

    reloadPage (code) {
      if (this.mode === '1') {
        this.mode = '2'
        this.$router.replace({
          name: this.$route.name,
          query: { code, mode: 2 }
        })
      }
      this.getDetail()
    },

    toggleLoading (flag) {
      this.submitting = flag
      this.children.forEach(child => {
        child.loading = flag
      })
    },

    async getValueSets () {
      const valuesetFields = findValuesetFields.call(this, this.children)

      const toggleLoading = flg =>
        valuesetFields.forEach(field => {
          field.loading = flg
        })

      if (!valuesetFields.length) {
        return
      }

      try {
        toggleLoading(true)
        const rst = await this.$service.ValuesetService.getOptionsByCodes(
          valuesetFields.map(field => field.code)
        )
        valuesetFields.forEach(field => {
          const code = field.code
          const options = (
            (rst || []).find(valueset => valueset.code === code) || {}
          ).options
          this.$set(
            field,
            'options',
            options.map(opt => ({ text: opt.label, value: opt.value }))
          )
        })
      } catch (error) {
        console.log(error)
      } finally {
        toggleLoading(false)
      }
    },

    async getDetail () {
      const code = this.$route.query[this.primaryKey]
      // 新建逻辑，不需要查询数据
      if (!code) {
        return
      }
      try {
        this.toggleLoading(true)
        const requestParams = {
          filterFields: [
            {
              fieldName: this.primaryKey,
              conditionOperator: '=',
              value: [code],
              relationship: 'AND'
            }
          ]
        }
        const rst = await this.$http.post(this.searchApi, {
          data: requestParams
        })
        this.$emit('afterInit', rst.data)
      } catch (error) {
        console.log(error)
      } finally {
        this.toggleLoading(false)
      }
    },

    /**
     * 生成绑定的events
     * @private
     */
    getEvents (item) {
      const eventList = {}

      if (item.events) {
        Object.keys(item.events).forEach(eventName => {
          eventList[eventName] = this.getEvent(item, eventName)
        })
      }

      return eventList
    },

    generateFormFields (schema) {
      const fields = schema.fields || []

      const changeType = (type = 'input') => {
        // 将值集变成下拉
        if (type === 'valueset') {
          return 'select'
        }
        return type
      }

      return fields.map(field => {
        return {
          hide: field.hide,
          attrs: {
            ...field,
            type: changeType(field.type),
            lableWidth:
              field.lableWidth || schema.lableWidth || DEFAULT_LABEL_WIDTH
          },
          styleMap: field.styleMap,
          classList: field.classList,
          events: field.events,
          children: field.children
        }
      })
    },

    generateTableColumns (schema) {
      const columns = schema.columns || []

      const changeType = (type = 'input') => {
        // 将值集变成下拉
        if (type === 'valueset') {
          return 'select'
        }
        return type
      }

      return columns.map(column => {
        return {
          hide: column.hide,
          classList: column.classList,
          styleMap: column.styleMap,
          attrs: {
            ...column,
            type: changeType(column.type)
          },
          events: column.events,
          children: column.children
        }
      })
    }
  }
}
</script>

<style>
</style>

<docs>

普通详情页面

```vue
<template>
  <AlPageDetail
    ref="page-detail"
    primaryKey="code"
    :model="pageModel"
    :beforeSaveHook="beforeSaveHook"
    :searchApi="QueryRegionManage"
    :updateApi="UpdateRegionManage"
    :createApi="CreateRegionManage"
    :children="[basicSchema, rowDetailsSchema, enableBtn, disableBtn]"
    :hideSaveBtn="hideSaveBtn"
    @afterInit="afterInit"
  />
</template>

<script>
function validCode(code) {
  return /^[A-Z0-9-_]+$/.test(code);
}

function validName(name) {
  const regEn = /[=`\\~!@&#$%^*+<>?:"{},.\\/;'[\]\s]/im;
  const regCn = /[·！#&￥——：……；“”‘、，| [\]]/im;
  return !(regEn.test(name) || regCn.test(name));
}

const QueryRegionManage = "/api/region/query";
const UpdateRegionManage = "/api/region/update";
const CountRegionManage = "/api/region/count";
const CreateRegionManage = "/api/region/create";
const EnableRegionManage = "/api/region/enable";
const DisableRegionManage = "/api/region/disable";

export default {
  data() {
    return {
      QueryRegionManage,
      UpdateRegionManage,
      CreateRegionManage,
      beforeSaveHook: () => {
        const copyFormData = JSON.parse(JSON.stringify(this.pageModel.basic));
        const removePropertyArr = [
          "createBy",
          "createTime",
          "modifyBy",
          "modifyTime"
        ];
        removePropertyArr.forEach(item => {
          delete copyFormData[item];
        });
        if (typeof copyFormData.saleTeamFlag === "boolean") {
          if (copyFormData.saleTeamFlag) {
            copyFormData.saleTeamFlag = "是";
          } else {
            copyFormData.saleTeamFlag = "否";
          }
        }
        if (!copyFormData.code) {
          delete copyFormData.status;
        }
        return { data: [copyFormData] };
      },
      pageModel: {
        basic: {
          code: "",
          name: "",
          position: "",
          positionCn: "",
          parent: null,
          status: "",
          principal: null,
          saleTeamFlag: "",
          seq: 1,
          createBy: "",
          createTime: "",
          modifyBy: "",
          modifyTime: ""
        },
        attributes: [{ codeName: "" }]
      },
      basicSchema: {
        type: "form",
        primaryKey: "basic",
        fields: [
          {
            label: "区域编号",
            primaryKey: "code",
            type: "input",
            maxLength: 20,
            disabled: (model, extra) => {
              return ["2", "3"].includes(this.mode);
            },
            rules: [
              { required: true, message: "请输入区域编号", trigger: "blur" },
              {
                validator: (value, model, cb, extra) => {
                  if (this.mode === "1" && !validCode(value)) {
                    cb(new Error("区域编号只能输入大写字母和数字"));
                  }
                  cb();
                },
                trigger: "blur"
              },
              {
                validator: (value, model, cb, extra) => {
                  if (this.mode === "1") {
                    this.$http
                      .post(
                        CountRegionManage,
                        {
                          data: {
                            filterFields: [
                              {
                                fieldName: "code",
                                conditionOperator: "=",
                                relationship: "AND",
                                value: [value]
                              }
                            ],
                            pageSize: 10,
                            pageIndex: 0
                          }
                        },
                        {}
                      )
                      .then(res => {
                        if (res.data) {
                          cb(new Error("区域编号重复"));
                        }
                        cb();
                      });
                  } else {
                    cb();
                  }
                },
                trigger: "blur"
              }
            ]
          },
          {
            label: "区域名称",
            primaryKey: "name",
            type: "input",
            maxLength: 50,
            disabled: (model, extra) => {
              return ["3"].includes(model.status) || this.mode === "3";
            },
            rules: [
              { required: true, message: "请输入区域名称", trigger: "blur" },
              {
                validator: (value, model, cb, extra) => {
                  if (!validName(value)) {
                    cb(
                      new Error(
                        "区域名称不可输入空格、（）() - _&外的所有特殊符号"
                      )
                    );
                  }
                  cb();
                },
                trigger: "blur"
              }
            ]
          },
          {
            label: "职位描述",
            primaryKey: "position",
            type: "input",
            maxLength: 50,
            disabled: (model, extra) => {
              return ["3"].includes(model.status) || this.mode === "3";
            },
            rules: [
              { required: true, message: "请输入职位描述", trigger: "blur" }
            ]
          },
          {
            label: "中文描述",
            primaryKey: "positionCn",
            type: "input",
            maxLength: 50,
            disabled: (model, extra) => {
              return ["3"].includes(model.status) || this.mode === "3";
            },
            rules: [
              { required: true, message: "请输入中文职位描述", trigger: "blur" }
            ]
          },
          {
            label: "状态",
            primaryKey: "status",
            type: "valueset",
            disabled: true,
            code: "XSQY_STATUS"
          },
          {
            label: "排序",
            primaryKey: "seq",
            type: "number",
            min: 1,
            max: 99,
            disabled: (model, extra) => {
              return ["3"].includes(model.status) || this.mode === "3";
            },
            rules: [
              { required: true, message: "排序不能为空", trigger: "blur" }
            ]
          },
          {
            label: "销售团队",
            primaryKey: "saleTeamFlag",
            format: val => {
              return val === "是" ? ["是否为销售团队"] : [];
            },
            type: "checkbox",
            disabled: (model, extra) => {
              return ["3"].includes(model.status) || this.mode === "3";
            },
            options: [{ text: "是否为销售团队", value: "是否为销售团队" }]
          },
          {
            label: "创建人",
            primaryKey: "createBy",
            type: "input",
            disabled: true
          },
          {
            label: "创建时间",
            primaryKey: "createTime",
            type: "date",
            nativeType: "datetime",
            disabled: true
          },
          {
            label: "修改人",
            primaryKey: "modifyBy",
            type: "input",
            disabled: true
          },
          {
            label: "修改时间",
            primaryKey: "modifyTime",
            type: "date",
            nativeType: "datetime",
            disabled: true
          }
        ]
      },
      enableBtn: {
        tag: "al-button",
        slot: "operation",
        children: [],
        hide: model => {
          return (
            !model.basic.code ||
            ["2"].includes(model.basic.status) ||
            this.mode === "3" ||
            this.mode === "1"
          );
        },
        attrs: {
          text: "启用"
        },
        events: {
          onClick: async () => {
            await this.$http.post(
              EnableRegionManage,
              { data: [this.pageModel.basic.code] },
              {}
            );
            this.$refs["page-detail"].reloadPage(this.pageModel.basic.code);
          }
        }
      },
      disableBtn: {
        tag: "al-button",
        slot: "operation",
        children: [],
        hide: model => {
          return (
            !model.basic.code ||
            ["1", "3"].includes(model.basic.status) ||
            this.mode === "3" ||
            this.mode === "1"
          );
        },
        attrs: {
          text: "禁用"
        },
        events: {
          onClick: async () => {
            await this.$http.post(
              UpdateRegionManage,
              this.beforeSaveHook(),
              {}
            );
            await this.$http.post(
              DisableRegionManage,
              { data: [this.pageModel.basic.code] },
              {}
            );
            this.$refs["page-detail"].reloadPage(this.pageModel.basic.code);
          }
        }
      },
      rowDetailsSchema: {
        type: "table",
        primaryKey: "attributes",
        children: [
          {
            tag: "al-button",
            slot: "operation",
            attrs: {
              text: "导入"
            },
            events: {
              onClick(e, model) {
                _this.importModal = true;
              }
            }
          }
        ],
        columns: [
          {
            width: "50px",
            type: "selection"
          },
          {
            width: "50px",
            label: "序号",
            type: "text",
            primaryKey: "code"
          },
          {
            label: "交易代码名称",
            type: "select",
            primaryKey: "codeName",
            width: "200px",
            options: [
              { text: "夜审房费", value: "10" },
              { text: "日审房费", value: "20" }
            ],
            rules: [{ required: true, message: "请输入值", trigger: "blur" }]
          },
          {
            label: "项目",
            primaryKey: "project",
            type: "input",
            width: "200px",
            rules: [{ required: true, message: "请输入项目", trigger: "blur" }]
          },
          {
            label: "单位",
            primaryKey: "unit",
            type: "select",
            width: "200px",
            options: []
          },
          {
            label: "数量",
            primaryKey: "quantity",
            type: "number",
            width: "150px",
            styleMap: { width: "100%" },
            rules: [{ required: true, message: "请输入数量", trigger: "blur" }]
          },
          {
            label: "单价（不含税）",
            primaryKey: "unitPrice",
            width: "200px",
            type: "input"
          },
          {
            label: "金额（不含税）",
            primaryKey: "amount",
            width: "200px",
            type: "input"
          },
          {
            label: "税率",
            primaryKey: "tariff",
            width: "150px",
            type: "input"
          },
          {
            label: "税额",
            primaryKey: "tax",
            disabled: true,
            type: "input"
          },
          {
            label: "含税金额",
            primaryKey: "taxAmount",
            disabled: true,
            width: "150px",
            type: "input"
          },
          {
            label: "收款计划号",
            primaryKey: "planNumber",
            width: "200px",
            type: "input"
          },
          {
            label: "受益期",
            primaryKey: "benefitPeriod",
            width: "200px",
            type: "input"
          },
          {
            label: "备注",
            width: "200px",
            primaryKey: "memo",
            type: "input"
          }
        ],
        pagination: false
      }
    };
  },
  computed: {
    // 1： 新建，2：修改，3：只读
    mode() {
      // return this.$route.query.mode
    },
    hideSaveBtn() {
      return this.mode === "3" || this.pageModel.basic.status === "3";
    }
  },
  methods: {
    afterInit(data) {
      if (data && data.length) {
        this.pageModel.basic = data[0];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

```

基于schema嵌套的复杂详情页面

```vue
<template>
  <AlPageDetail
    ref="page-detail"
    primaryKey="code"
    :model="pageModel"
    :beforeSaveHook="beforeSaveHook"
    :searchApi="QueryRegionManage"
    :updateApi="UpdateRegionManage"
    :createApi="CreateRegionManage"
    :children="[basicSchema, sectionA, sectionD, sectionB, sectionC]"
    :hideSaveBtn="hideSaveBtn"
    @afterInit="afterInit"
  />
</template>

<script>
function validCode(code) {
  return /^[A-Z0-9-_]+$/.test(code);
}

function validName(name) {
  const regEn = /[=`\\~!@&#$%^*+<>?:"{},.\\/;'[\]\s]/im;
  const regCn = /[·！#&￥——：……；“”‘、，| [\]]/im;
  return !(regEn.test(name) || regCn.test(name));
}

const QueryRegionManage = "/api/region/query";
const UpdateRegionManage = "/api/region/update";
const CountRegionManage = "/api/region/count";
const CreateRegionManage = "/api/region/create";
const EnableRegionManage = "/api/region/enable";
const DisableRegionManage = "/api/region/disable";

export default {
  data() {
    return {
      QueryRegionManage,
      UpdateRegionManage,
      CreateRegionManage,
      beforeSaveHook: () => {
        const copyFormData = JSON.parse(JSON.stringify(this.pageModel.basic));
        const removePropertyArr = [
          "createBy",
          "createTime",
          "modifyBy",
          "modifyTime"
        ];
        removePropertyArr.forEach(item => {
          delete copyFormData[item];
        });
        if (typeof copyFormData.saleTeamFlag === "boolean") {
          if (copyFormData.saleTeamFlag) {
            copyFormData.saleTeamFlag = "是";
          } else {
            copyFormData.saleTeamFlag = "否";
          }
        }
        if (!copyFormData.code) {
          delete copyFormData.status;
        }
        return { data: [copyFormData] };
      },
      pageModel: {
        basic: {
          code: "",
          name: "",
          position: "",
          positionCn: "",
          parent: null,
          status: "",
          principal: null,
          saleTeamFlag: "",
          seq: 1,
          createBy: "",
          createTime: "",
          modifyBy: "",
          modifyTime: ""
        },
        sectionATable1: [{
          input: ""
        }],
        sectionATable2: [{
          input: ""
        }],
        sectionBTable: [{
          input: ""
        }],
        sectionCTable3: [{
          input: ""
        }],
        sectionCTable4: [{
          input: ""
        }],
        sectionDForm: {
          type: 'input',
          disabled: false,
          readonly: false,
          hide: false,
          title: '表单区域',
          text: ''
        }
      },
      basicSchema: {
        type: "form",
        primaryKey: "basic",
        fields: [
          {
            label: "区域编号",
            primaryKey: "code",
            type: "input",
            maxLength: 20,
            disabled: (model, extra) => {
              return ["2", "3"].includes(this.mode);
            },
            rules: [
              { required: true, message: "请输入区域编号", trigger: "blur" },
              {
                validator: (value, model, cb, extra) => {
                  if (this.mode === "1" && !validCode(value)) {
                    cb(new Error("区域编号只能输入大写字母和数字"));
                  }
                  cb();
                },
                trigger: "blur"
              },
              {
                validator: (value, model, cb, extra) => {
                  if (this.mode === "1") {
                    this.$http
                      .post(
                        CountRegionManage,
                        {
                          data: {
                            filterFields: [
                              {
                                fieldName: "code",
                                conditionOperator: "=",
                                relationship: "AND",
                                value: [value]
                              }
                            ],
                            pageSize: 10,
                            pageIndex: 0
                          }
                        },
                        {}
                      )
                      .then(res => {
                        if (res.data) {
                          cb(new Error("区域编号重复"));
                        }
                        cb();
                      });
                  } else {
                    cb();
                  }
                },
                trigger: "blur"
              }
            ]
          },
          {
            label: "区域名称",
            primaryKey: "name",
            type: "input",
            maxLength: 50,
            disabled: (model, extra) => {
              return ["3"].includes(model.status) || this.mode === "3";
            },
            rules: [
              { required: true, message: "请输入区域名称", trigger: "blur" },
              {
                validator: (value, model, cb, extra) => {
                  if (!validName(value)) {
                    cb(
                      new Error(
                        "区域名称不可输入空格、（）() - _&外的所有特殊符号"
                      )
                    );
                  }
                  cb();
                },
                trigger: "blur"
              }
            ]
          },
          {
            label: "职位描述",
            primaryKey: "position",
            type: "input",
            maxLength: 50,
            disabled: (model, extra) => {
              return ["3"].includes(model.status) || this.mode === "3";
            },
            rules: [
              { required: true, message: "请输入职位描述", trigger: "blur" }
            ]
          },
          {
            label: "中文描述",
            primaryKey: "positionCn",
            type: "input",
            maxLength: 50,
            disabled: (model, extra) => {
              return ["3"].includes(model.status) || this.mode === "3";
            },
            rules: [
              { required: true, message: "请输入中文职位描述", trigger: "blur" }
            ]
          },
          {
            label: "状态",
            primaryKey: "status",
            type: "valueset",
            disabled: true,
            code: "XSQY_STATUS"
          },
          {
            label: "排序",
            primaryKey: "seq",
            type: "number",
            min: 0,
            max: 99,
            disabled: (model, extra) => {
              return ["3"].includes(model.status) || this.mode === "3";
            },
            rules: [
              { required: true, message: "排序不能为空", trigger: "blur" }
            ]
          },
          {
            label: "销售团队",
            primaryKey: "saleTeamFlag",
            format: val => {
              return val === "是" ? ["是否为销售团队"] : [];
            },
            type: "checkbox",
            disabled: (model, extra) => {
              return ["3"].includes(model.status) || this.mode === "3";
            },
            options: [{ text: "是否为销售团队", value: "是否为销售团队" }]
          },
          {
            label: "创建人",
            primaryKey: "createBy",
            type: "input",
            disabled: true
          },
          {
            label: "创建时间",
            primaryKey: "createTime",
            type: "date",
            nativeType: "datetime",
            disabled: true
          },
          {
            label: "修改人",
            primaryKey: "modifyBy",
            type: "input",
            disabled: true
          },
          {
            label: "修改时间",
            primaryKey: "modifyTime",
            type: "date",
            nativeType: "datetime",
            disabled: true
          }
        ]
      },
      sectionA: {
        tag: "al-tabs",
        attrs: {
          value: "tab1",
          tabs: [
            {
              attrs: {
                label: "标签1",
                name: "tab1"
              },
              children: [
                {
                  tag: "al-table",
                  attrs: {
                    primaryKey: "sectionATable1",
                    columns: [
                      {
                        attrs: {
                          fixed: "left",
                          type: "selection"
                        }
                      },
                      {
                        attrs: {
                          label: "列",
                          type: "input",
                          primaryKey: "input",
                          rules: [
                            { required: true, message: '必填项', trigger: 'blur' }
                          ]
                        }
                      },
                    ],
                    children: [
                      {
                        slot: "operation",
                        tag: "al-button",
                        attrs: {
                          text: "自定义按钮"
                        },
                        events: {}
                      }
                    ]
                  },
                  events: {
                    onAddBtnClick: () => {
                      this.pageModel.sectionATable1.push({
                        input: ""
                      })
                    },

                    onDelBtnClick: (rows) => {
                      this.pageModel.sectionATable1 = this.pageModel.sectionATable1.filter(row => !rows.includes(row))
                    }
                  },
                  children: [
                    {
                      slot: "operation",
                      tag: "al-button",
                      attrs: {
                        text: "自定义按钮"
                      },
                      events: {
                        onClick: () => {
                          console.log('自定义按钮')
                        }
                      }
                    }
                  ]
                }
              ]
            },
            {
              attrs: {
                label: "标签2",
                name: "tab2"
              },
              children: [
                {
                  tag: "al-table",
                  attrs: {
                    primaryKey: "sectionATable2",
                    columns: [
                      {
                        attrs: {
                          fixed: "left",
                          type: "selection"
                        }
                      },
                      {
                        attrs: {
                          label: "列",
                          type: "input",
                          primaryKey: "input",
                          rules: [
                            { required: true, message: '必填项', trigger: 'blur' }
                          ]
                        }
                      },
                    ]
                  }
                }
              ]
            }
          ]
        }
      },
      sectionB: {
        tag: "al-table",
        attrs: {
          primaryKey: "sectionBTable",
          columns: [
            {
              attrs: {
                fixed: "left",
                type: "selection"
              }
            },
            {
              attrs: {
                label: "列",
                type: "input",
                primaryKey: "input",
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }
                ]
              }
            },
          ],
          children: [
            {
              slot: "operation",
              tag: "al-button",
              attrs: {
                text: "自定义按钮"
              },
              events: {
                onClick: () => {
                  console.log('自定义按钮')
                }
              }
            }
          ]
        },
        events: {
          onAddBtnClick: () => {
            this.pageModel.sectionBTable.push({
              input: ""
            })
          },

          onDelBtnClick: (rows) => {
            this.pageModel.sectionBTable = this.pageModel.sectionBTable.filter(row => !rows.includes(row))
          }
        },
        children: [
          {
            slot: "operation",
            tag: "al-button",
            attrs: {
              text: "自定义按钮"
            },
            events: {
              onClick: () => {
                console.log('自定义按钮')
              }
            }
          }
        ]
      },
      sectionC: {
        tag: "al-collapse",
        attrs: {
          value: ["3", "4"],
        },
        children: [
          {
            name: "3",
            attrs: {
              title: "折叠面板3",
            },
            children: [
              {
                tag: "al-table",
                attrs: {
                  primaryKey: "sectionCTable3",
                  columns: [
                    {
                      attrs: {
                        fixed: "left",
                        type: "selection"
                      }
                    },
                    {
                      attrs: {
                        label: "列",
                        type: "input",
                        primaryKey: "input",
                        rules: [
                          { required: true, message: '必填项', trigger: 'blur' }
                        ]
                      }
                    },
                  ],
                  children: [
                    {
                      slot: "operation",
                      tag: "al-button",
                      attrs: {
                        text: "自定义按钮"
                      },
                      events: {}
                    }
                  ]
                },
                events: {
                  onAddBtnClick: () => {
                    this.pageModel.sectionCTable3.push({
                      input: ""
                    })
                  },

                  onDelBtnClick: (rows) => {
                    this.pageModel.sectionCTable3 = this.pageModel.sectionCTable3.filter(row => !rows.includes(row))
                  }
                },
                children: [
                  {
                    slot: "operation",
                    tag: "al-button",
                    attrs: {
                      text: "自定义按钮"
                    },
                    events: {
                      onClick: () => {
                        console.log('自定义按钮')
                      }
                    }
                  }
                ]
              }
            ]
          },
          {
            name: "4",
            attrs: {
              title: "折叠面板4",
            },
            children: [
              {
                tag: "al-table",
                attrs: {
                  primaryKey: "sectionCTable4",
                  columns: [
                    {
                      attrs: {
                        fixed: "left",
                        type: "selection"
                      }
                    },
                    {
                      attrs: {
                        label: "列",
                        type: "input",
                        primaryKey: "input",
                        rules: [
                          { required: true, message: '必填项', trigger: 'blur' }
                        ]
                      }
                    },
                  ]
                }
              }
            ]
          }
        ],
      },
      sectionD: {
        tag: 'al-form',
        attrs: {
          primaryKey: 'sectionDForm',
          fields: [
            {
              attrs: {
                label: '',
                type: 'text',
                primaryKey: 'title',
                width: 24,
                labelWidth: '0'
              }
            },
            {
              attrs: {
                label: "类型",
                type: "select",
                primaryKey: "type",
                options: [
                  { text: "输入框", value: 'input' },
                  { text: "日期", value: 'date' },
                  { text: "开关", value: 'switch' },
                  { text: "富文本", value: 'richtext' },
                ]
              }
            },
            {
              attrs: {
                label: "禁用",
                type: "switch",
                primaryKey: "disabled"
              }
            },
            {
              attrs: {
                label: "隐藏",
                type: "switch",
                primaryKey: "hide"
              }
            },
            {
              hide: (model) => model.hide,
              attrs: {
                label: "动态类型",
                width: 24,
                type: model => model.type,
                disabled: model => model.disabled,
                primaryKey: "text"
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    // 1： 新建，2：修改，3：只读
    mode() {
      // return this.$route.query.mode
    },
    hideSaveBtn() {
      return this.mode === "3" || this.pageModel.basic.status === "3";
    }
  },
  methods: {
    afterInit(data) {
      if (data && data.length) {
        this.pageModel.basic = data[0];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

```
</docs>
