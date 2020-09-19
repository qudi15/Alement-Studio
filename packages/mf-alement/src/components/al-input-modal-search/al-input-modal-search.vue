<template>
  <div class="al-input-modal-search" :class="{ disabled: disabled }">

    <template v-if="nativeType === 'button'">
      <al-button :disabled="disabled" :text="$t(buttonText)" @click="onSearchBtnClick" />
    </template>

    <template v-else>
      <el-input
        v-if="mode === 'single'"
        :readonly="true"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="getDisplay()">
        <span slot="suffix" class="input-suffix">
          <i v-if="getDisplay() && !disabled" class="el-icon-circle-close" @click="onClearBtnClick"></i>
          <i class="el-icon-search" @click="onSearchBtnClick"></i>
        </span>
      </el-input>

      <div v-if="mode === 'multiple'" class="mutiple-layout">
        <div class="tags">
          <el-tag size="small" v-for="item in value" :key="item.code">{{ item[format] }}</el-tag>
        </div>
        <i class="el-icon-more-outline" @click="onSearchBtnClick"></i>
      </div>
    </template>

    <el-dialog
      :opened="onOpened"
      :title="modalTitle"
      :visible.sync="visible"
      :destroy-on-close="true"
      :append-to-body="true"
      :width="width"
    >
      <div class="al-input-modal-search-modal">
        <div class="selected-section" v-if="mode === 'multiple'">
          <al-text text="已选择"></al-text>
          <al-Table
            class="cached-table"
            :model="cache"
            :columns="cacheColumns"
            :hideAddBtn="true"
            @onDelBtnClick="onDelBtnClick"
            :pagination="false"
          />
        </div>

        <AlPageSearch
          ref="searchPage"
          :model="computedDefaultSearchParams"
          primaryKey="modal-search"
          :fields="fields"
          :columns="computedColumns"
          @onAddBtnClick="onAddBtnClick"
          :searchApi="searchApi"
          :countApi="countApi"
          :hideAddBtn="mode === 'single'"
          @onSelectionChange="onSelectionChange"
          :hideResetBtn="hideResetBtn"
          :hideSearchBtn="hideSearchBtn"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="onSubmitBtnClick">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Base from '../../mixins/base'
import alButton from '../al-button/al-button'
import alText from '../al-text/al-text'

/**
 * 弹窗查询
 * @displayName Al Modal Search
 */
export default {
  name: 'al-input-modal-search',

  components: {
    alButton,
    alText
  },

  mixins: [Base],

  data () {
    return {
      visible: false,
      selection: [],

      // 已选中缓存区
      cache: [],
      // 已选中缓存区中选中的元素
      cacheSelected: [],

      cacheColumns: [
        { attrs: { type: 'selection' } },
        { attrs: { type: 'text', label: '', primaryKey: 'name' } }
      ]
    }
  },

  props: {
    /**
     * 查询区域的数据模型 当defaultSearchParams为函数时 model作为defaultSearchParams的第一个参数 extra作为defaultSearchParams的第二个参数
     */
    model: {
      type: Object,
      default () {
        return {}
      }
    },
    /**
     * 隐藏重置按钮
     */
    hideResetBtn: {
      type: Boolean,
      default: false
    },

    /**
     * 类型：输入框型或是按钮型
     * @values input / button
     */
    nativeType: {
      type: String,
      default: 'input'
    },

    /**
     * 按钮型弹窗时，按钮的文字
     */
    buttonText: {
      type: String,
      default: '查询'
    },

    /**
     * 隐藏查询按钮
     */
    hideSearchBtn: {
      type: Boolean,
      default: false
    },

    /**
     * 默认的查询条件
     */
    defaultSearchParams: {
      type: [Object, Function],
      default () {
        return {}
      }
    },

    /**
     * 值
     */
    value: {
      type: [Object, Array],
      default () {
        return this.mode === 'single' ? {} : []
      }
    },

    /**
     * 用于获取value中用于显示的字段
     */
    format: {
      type: [String, Function],
      default: 'name'
    },

    /**
     * 用于获取value中用于传参的字段，主要用于查询页面
     */
    parse: {
      type: [String, Function],
      default: 'code'
    },

    /**
     * 占位符
     */
    placeholder: {
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
     * 计数用的api
     */
    countApi: {
      required: true,
      type: String
    },

    /**
     * 查询条件
     */
    fields: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },

    /**
     * 查询结果
     */
    columns: {
      type: Array,
      default () {
        return []
      }
    },

    /**
     * 额外的参数
     */
    extra: {
      type: Object
    },

    /**
     * 弹窗中的标题
     */
    modalTitle: {
      type: String,
      default () {
        return '请选择'
      }
    },

    /**
     * 单选还是多选，single | multiple
     */
    mode: {
      type: String,
      default: 'single'
    },

    /**
     * 禁用状态
     */
    disabled: {
      type: Boolean
    },

    /**
     * 弹窗默认宽度
     */
    width: {
      type: String,
      default () {
        return this.mode === 'single' ? '800px' : '80%'
      }
    }
  },

  computed: {
    computedColumns () {
      const mode = this.mode
      const colType = mode === 'single' ? 'singleSelection' : 'selection'
      const selectCol = this.columns.find(col => col.type === colType)
      return selectCol
        ? this.columns
        : [{ label: '请选择', type: colType }, ...this.columns]
    },
    computedDefaultSearchParams () {
      if (typeof this.defaultSearchParams === 'function') {
        return this.defaultSearchParams(this.model, this.extra)
      } else {
        return this.defaultSearchParams
      }
    }
  },

  methods: {
    onAddBtnClick () {
      this.cache = this.cache.concat(
        this.selection.filter(
          selected => !this.cache.find(cached => cached.code === selected.code)
        )
      )
    },

    onSelectedCacheChange (checked) {
      console.log(checked)
    },

    getDisplay () {
      const value = this.value || {}
      const format = this.format
      if (typeof format === 'function') {
        return format(value)
      }
      return value[format]
    },

    onSelectionChange (selection) {
      this.selection = selection
    },

    onOpened () {
      this.$refs.searchPage.search()
    },

    onSearchBtnClick () {
      if (this.disabled) {
        return
      }
      this.visible = true
      this.cache = this.value
    },

    onClearBtnClick () {
      this.$emit('change', this.mode === 'single' ? null : [])
    },

    onSubmitBtnClick () {
      this.visible = false
      this.$emit(
        'change',
        this.mode === 'single' ? this.selection[0] : this.cache
      )
    },

    onDelBtnClick (rows) {
      this.cache = this.cache.filter(row => !rows.find(r => r === row))
    }
  }
}
</script>

<style lang="scss" scoped>
.cached-table {
  margin-top: 20px;

  /deep/ .el-table::before {
    height: 0;
  }

  /deep/ .el-table th.is-leaf {
    border: none;
  }
}

.mutiple-layout {
  position: relative;

  .tags {
    padding: 0 30px 0 15px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    position: relative;
    line-height: 40px;
    min-height: 40px;

    > * {
      &:nth-child(n + 2) {
        margin-left: 5px;
      }
    }
  }

  > i {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    width: 25px;
    text-align: center;
    cursor: pointer;
    color: #c0c4cc;
  }
}

.al-input-modal-search-modal {
  display: flex;

  .selected-section {
    flex: 200px 0 0;
    width: 200px;
    padding-right: 20px;
  }

  .al-page-search {
    flex: 1;
    width: 100%;
  }
}

.al-input-modal-search {
  /deep/ .el-input__suffix {
    display: flex;
    align-items: center;
  }
}

.input-suffix {
  /deep/ i {
    width: 25px;
    cursor: pointer;
  }
}

.al-input-modal-search.disabled {
  .input-suffix {
    /deep/ i {
      cursor: not-allowed;
    }
  }
}
</style>

<docs>

单选

```vue
<template>
  <al-input-modal-search
    :value="value"
    @change="onChange"
    :format="format"
    :searchApi="searchApi"
    :countApi="countApi"
    :fields="fields"
    :columns="columns"
  />
</template>
<script>
export default {
  data() {
    return {
      value: null,
      format: "name",
      searchOrders: [{ fieldName: "createTime", order: "desc" }],
      searchApi: "/api/authority-role/search",
      countApi: "/api/authority-role/count",
      fields: [
        { label: "文本框", primaryKey: "code", conditionOperator: "like" },
        {
          label: "锁定",
          primaryKey: "name",
          conditionOperator: "like",
          fixed: true
        }
      ],
      columns: [
        { label: "编码", primaryKey: "code" },
        { label: "名称", primaryKey: "name" }
      ]
    };
  },
  methods: {
    onChange(selected) {
      this.value = selected;
    }
  }
};
</script>
```

多选

```vue
<template>
  <al-input-modal-search
    :value="value"
    @change="onChange"
    mode="multiple"
    :format="format"
    :searchApi="searchApi"
    :countApi="countApi"
    :fields="fields"
    :columns="columns"
  />
</template>
<script>
export default {
  data() {
    return {
      value: [
        { code: "1", name: "1" },
        { code: "2", name: "2" }
      ],
      format: "name",
      searchOrders: [{ fieldName: "createTime", order: "desc" }],
      searchApi: "/api/authority-role/search",
      countApi: "/api/authority-role/count",
      fields: [
        { label: "文本框", primaryKey: "code", conditionOperator: "like" },
        {
          label: "锁定",
          primaryKey: "name",
          conditionOperator: "like",
          fixed: true
        }
      ],
      columns: [
        { label: "编码", primaryKey: "code" },
        { label: "名称", primaryKey: "name" }
      ]
    };
  },
  methods: {
    onChange(selected) {
      this.value = selected;
    }
  }
};
</script>
```

默认查询条件

```vue
<template>
  <al-input-modal-search
    :defaultSearchParams="defaultSearchParams"
    :value="value"
    @change="onChange"
    mode="multiple"
    :format="format"
    :searchApi="searchApi"
    :countApi="countApi"
    :fields="fields"
    :columns="columns"
  />
</template>
<script>
export default {
  data() {
    return {
      defaultSearchParams: {
        code: "1",
        name: "name"
      },
      value: [
        { code: "1", name: "1" },
        { code: "2", name: "2" }
      ],
      format: "name",
      searchOrders: [{ fieldName: "createTime", order: "desc" }],
      searchApi: "/api/authority-role/search",
      countApi: "/api/authority-role/count",
      fields: [
        { label: "code", primaryKey: "code", conditionOperator: "like" },
        {
          label: "name",
          primaryKey: "name",
          conditionOperator: "like",
          fixed: true
        }
      ],
      columns: [
        { label: "编码", primaryKey: "code" },
        { label: "名称", primaryKey: "name" }
      ]
    };
  },
  methods: {
    onChange(selected) {
      this.value = selected;
    }
  }
};
</script>
```

默认查询条件 defaultSearchParams为函数

```vue
<template>
  <al-input-modal-search
    :defaultSearchParams="defaultSearchParams"
    :value="value"
    @change="onChange"
    mode="multiple"
    :format="format"
    :searchApi="searchApi"
    :countApi="countApi"
    :fields="fields"
    :columns="columns"
  />
</template>
<script>
export default {
  data() {
    return {
      defaultSearchParams: (scope, extra) => {
        // 在表格中model为scope 表单中model为表单的数据模型
        return {
          'parent.code': scope.row.parent && scope.row.parent.code
        }
      },
      value: [
        { code: "1", name: "1" },
        { code: "2", name: "2" }
      ],
      format: "name",
      searchOrders: [{ fieldName: "createTime", order: "desc" }],
      searchApi: "/api/authority-role/search",
      countApi: "/api/authority-role/count",
      fields: [
        { label: "code", primaryKey: "code", conditionOperator: "like" },
        {
          label: "name",
          primaryKey: "name",
          conditionOperator: "like",
          fixed: true
        },
        {
          label: "隐藏不可见的默认的查询参数",
          hide: true,
          primaryKey: "parent.code",
          conditionOperator: "=",
          fixed: true
        }
      ],
      columns: [
        { label: "编码", primaryKey: "code" },
        { label: "名称", primaryKey: "name" }
      ]
    };
  },
  methods: {
    onChange(selected) {
      this.value = selected;
    }
  }
};
</script>
```

隐藏查询与重置按钮

```vue
<template>
  <al-input-modal-search
    :value="value"
    @change="onChange"
    :format="format"
    :searchApi="searchApi"
    :countApi="countApi"
    :fields="fields"
    :columns="columns"
    :hideSearchBtn="true"
    :hideResetBtn="true"
  />
</template>
<script>
export default {
  data() {
    return {
      value: null,
      format: "name",
      searchOrders: [{ fieldName: "createTime", order: "desc" }],
      searchApi: "/api/authority-role/search",
      countApi: "/api/authority-role/count",
      fields: [],
      columns: [
        { label: "编码", primaryKey: "code" },
        { label: "名称", primaryKey: "name" }
      ]
    };
  },
  methods: {
    onChange(selected) {
      this.value = selected;
    }
  }
};
</script>
```

按钮类型

```vue
<template>
  <al-input-modal-search
    :value="value"
    nativeType="button"
    @change="onChange"
    :format="format"
    :searchApi="searchApi"
    :countApi="countApi"
    :fields="fields"
    :columns="columns"
  />
</template>
<script>
export default {
  data() {
    return {
      value: null,
      format: "name",
      searchOrders: [{ fieldName: "createTime", order: "desc" }],
      searchApi: "/api/authority-role/search",
      countApi: "/api/authority-role/count",
      fields: [
        { label: "文本框", primaryKey: "code", conditionOperator: "like" },
        {
          label: "锁定",
          primaryKey: "name",
          conditionOperator: "like",
          fixed: true
        }
      ],
      columns: [
        { label: "编码", primaryKey: "code" },
        { label: "名称", primaryKey: "name" }
      ]
    };
  },
  methods: {
    onChange(selected) {
      this.value = selected
      console.log(selected)
    }
  }
};
</script>
```
</docs>
