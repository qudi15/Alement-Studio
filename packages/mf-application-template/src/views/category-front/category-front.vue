
    <template>
  <div class="page_search">
    <div class="page_search_form">
      <el-form
        :inline="true"
        :model="form"
        status-icon
        :rules="formRules"
        ref="form"
        label-width="130px"
        class="page_form"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
            :label="$t('category_management.foreground_category_management.code')"
            prop="code">
              <el-input v-model="form.code" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('category_management.foreground_category_management.name')"  prop="name">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('category_management.foreground_category_management.name')" prop="status">
              <el-select clearable v-model="form.status">
                <el-option
                  v-for="option in form.statusOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="page_btn_group">
      <el-button class="form_btn form_btn_reset" @click="onResetBtnClick">重置</el-button>
      <el-button class="form_btn form_btn_search" @click="onSearchBtnClick" type="primary">查询</el-button>
    </div>

    <div class="page_line"></div>
    <div class="page_table">
      <div class="page_btn_group">
        <el-button
          class="form_btn"
          icon="el-icon-circle-plus-outline"
          @click="onAddBtnClick"
          type="primary"
        >新增</el-button>
      </div>
      <el-table
        :data="table"
        style="width: 100%"
        @sort-change="tablesortChange"
        class="page_table_detail"
      >
        <el-table-column
         :label="$t('category_management.foreground_category_management.code')"
          sortable="custom"
          show-overflow-tooltip
          prop="code"
          min-width="200px"
        >
          <template slot-scope="scope">
            <a v-if="'code' === key" @click="goToDetailPage(scope.row.code, 3)">{{ scope.row.code }}</a>
            <span v-if="'code' !== key">{{ scope.row.code }}</span>
          </template>
        </el-table-column>

        <el-table-column
         :label="$t('category_management.foreground_category_management.name')"
          sortable="custom"
          show-overflow-tooltip
          prop="name"
          min-width="200px"
        >
          <template slot-scope="scope">
            <a v-if="'name' === key" @click="goToDetailPage(scope.row.name, 3)">{{ scope.row.name }}</a>
            <span v-if="'name' !== key">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('category_management.foreground_category_management.state')"
          sortable="custom"
          show-overflow-tooltip
          prop="status"
          min-width="100px"
        >
          <template slot-scope="scope">
            <span >{{ getSelectLabel(scope.column.property,scope.row.status) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('category_management.foreground_category_management.remark')"
          sortable="custom"
          show-overflow-tooltip
          prop="memo"
          min-width="undefined"
        >
          <template slot-scope="scope">
            <a v-if="'memo' === key" @click="goToDetailPage(scope.row.memo, 3)">{{ scope.row.memo }}</a>
            <span v-if="'memo' !== key">{{ scope.row.memo }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('common.operation')" show-overflow-tooltip min-width="110px">
          <template slot-scope="scope">
            <i
              type="primary"
              @click="onEditBtnClick(scope.row, $event)"
              class="el-icon-edit-outline table_btn table_edit_btn"
            ></i>
            <el-popover
              v-if="scope.row.status === '1'"
              placement="top"
              width="160"
              v-model="scope.row.tablePopoverIsVisible"
            >
              <p>{{$t('common.confirm_delete')}}</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="scope.row.tablePopoverIsVisible = false"
                >{{$t('button.cancel')}}</el-button>
                <el-button type="primary" size="mini" @click="onDelBtnClick(scope.row, $event)">{{$t('button.ok')}}</el-button>
              </div>
              <i slot="reference" type="danger" class="el-icon-delete table_btn table_delete_btn"></i>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="tablePageSizeChange"
        class="page_search_table_page"
        @current-change="tablePageIndexChange"
        :current-page="tablePageIndex+1"
        :page-sizes="[10, 30, 50]"
        :page-size="tablePageSize"
        layout="total, sizes, prev, pager, next"
        :total="tableTotal"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import * as apis from '@/config/apis'
import { moment } from 'mf-shared-dependencies-vue'
export default {
  data () {
    return {
      valuesetList: [],
      key: 'code',
      detailTitle: '前台类目',
      detailPage: '/master-data/goods/category-front-detail',
      searchURL: 'QueryCategoryFront',
      countURL: 'CountCategoryFront',
      removeURL: 'RemoveCategoryFront',
      sort: {
        fieldName: 'createTime',
        order: 'desc'
      },
      form: {
        code: '',
        codeSearchParam: {
          fieldName: 'code',
          conditionOperator: 'like',
          relationship: 'AND'
        },
        name: '',
        nameSearchParam: {
          fieldName: 'name',
          conditionOperator: 'like',
          relationship: 'AND'
        },
        status: '',
        statusOptions: [
          {
            label: '未启用',
            value: '1'
          },
          {
            label: '启用',
            value: '2'
          },
          {
            label: '禁用',
            value: '3'
          }
        ],
        statusSearchParam: {
          fieldName: 'status',
          conditionOperator: '=',
          relationship: 'AND'
        }
      },
      formRules: {
        code: [
          {
            required: false,
            message: '',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: false,
            message: '',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: false,
            message: '',
            trigger: 'blur'
          }
        ]
      },
      valuesetCodes: [],
      tableSelectedRow: null,
      table: [],
      tablePageSize: 10,
      tableTotal: 0,
      tablePageIndex: 0,
      tablePopoverIsVisible: false
    }
  },

  created () {
    this.initValuesets()
    this.search()
  },

  methods: {
    formatDateTime (date) {
      return moment(date)
        .local()
        .format('YYYY-MM-DD HH:mm:ss')
    },

    search () {
      var _this = this
      var form = this.form
      var searchParams = []
      // tslint:disable-next-line: forin
      for (var key in form) {
        var paramKey = key + 'SearchParam'
        if (paramKey in form) {
          var param = form[paramKey]
          param.value = [form[key]]
          if (form[key]) {
            searchParams.push(param)
          }
        }
      }
      this.$http
        .post(apis[this.searchURL], {
          data: {
            filterFields: searchParams,
            pageIndex: this.tablePageIndex,
            pageSize: this.tablePageSize,
            orderFields: [this.sort]
          }
        })
        .then(function (res) {
          var data = Array.isArray(res.data) ? res.data : []
          _this.table = data
        })
      this.$http
        .post(apis[this.countURL], {
          data: {
            filterFields: searchParams,
            pageIndex: this.tablePageIndex,
            pageSize: this.tablePageSize
          }
        })
        .then(function (res) {
          _this.tableTotal = res.data
        })
    },

    getSelectLabel (key, stauts) {
      var form = this.form
      var valueSelectObject = {
        label: '',
        value: ''
      }
      var selectCode = key + 'Options'
      if (selectCode in form) {
        valueSelectObject = form[selectCode].find(function (val) {
          return val.value + '' === stauts
        })
      }
      return valueSelectObject ? valueSelectObject.label : ''
    },

    getValuesetLabel (value, stauts) {
      var form = this.form
      var valueSelectObject = {
        label: '',
        value: ''
      }
      var valCode = ''
      var valuesetCode = value + 'configCode'
      if (valuesetCode in form) {
        valCode = form[valuesetCode]
        valueSelectObject = form[valCode].find(function (val) {
          return val.value === stauts
        })
      } else if (this[valuesetCode]) {
        valCode = this[valuesetCode]
        valueSelectObject = this[valCode].find(function (val) {
          return val.value === stauts
        })
      }
      return valueSelectObject ? valueSelectObject.label : ''
    },

    initValuesets () {
      var _this = this
      var valuesetCodes = this.valuesetCodes
      if (!valuesetCodes.length) {
        return
      }
      this.$http
        .post('/api/valueset/query', {
          data: {
            filterFields: [
              {
                fieldName: 'code',
                conditionOperator: '=',
                relationship: 'AND',
                value: this.valuesetCodes
              }
            ]
          }
        })
        .then(function (res) {
          var data = Array.isArray(res.data) ? res.data : []
          _this.valuesetList = data
          _this.updateFieldOptions()
        })
    },

    updateFieldOptions () {
      var _this = this
      var form = this.form
      this.valuesetList.map(function (item) {
        var valCode = item.code + 'Options'
        if (valCode in form) {
          _this.form[valCode] = item.values.map(function (val) {
            return { label: val.value, value: val.code }
          })
        } else if (valCode in _this) {
          _this[valCode] = item.values.map(function (val) {
            return { label: val.value, value: val.code }
          })
        }
      })
      // for (const key in form) {
      //   if (key in form) {
      //     const valueset = this.valuesetList.find(val => `${val.code}Options` === key);
      //     if (valueset) {
      //       this.form[key] = valueset.values.map(val => ({ label: val.value, value: val.code }));
      //     }
      //   }
      // }
    },

    goToDetailPage (code, mode) {
      var queryParams = code
        ? ['title=' + this.detailTitle, this.key + '=' + code, 'mode=' + mode]
        : ['title=' + this.detailTitle, 'mode=' + mode]
      this.$router.push({
        path: this.detailPage + '?' + queryParams.join('&')
      })
    },

    deleteItem (row, $event) {
      var _this = this
      this.$http
        .post(apis[this.removeURL], {
          data: [row.code],
        })
        .then(function (res) {
          _this.search()
        })
    },

    sortChange (col) {
      if (col.order) {
        this.sort =
          col.order.indexOf('desc') !== -1
            ? { fieldName: col.prop, order: 'desc' }
            : { fieldName: col.prop, order: 'asc' }
      }
      this.search()
    },

    submitForm (formName) {
      this.$refs[formName].validate(function (valid) {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
      // 问题
    },

    tablePageSizeChange (size) {
      this.tablePageSize = size
      this.search()
    },

    tablePageIndexChange (index) {
      this.tablePageIndex = index - 1
      this.search()
    },

    tablesortChange (column, prop, order) {
      this.sortChange(column, prop, order)
    },

    onAddBtnClick () {
      this.goToDetailPage(undefined, 1)
    },

    onEditBtnClick (row, $evt) {
      this.goToDetailPage(row[this.key], 2)
    },

    onDelBtnClick (row, $evt) {
      this.deleteItem(row, $evt)
    },

    onSearchBtnClick () {
      this.tablePageIndex = 0
      this.search()
    },

    onResetBtnClick () {
      this.resetForm('form')
    }
  }
}
</script>
