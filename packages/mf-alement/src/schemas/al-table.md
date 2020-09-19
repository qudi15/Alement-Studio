

### Table

表格组件

```ts
interface TABLE extends BASE {
  attrs: {
    // 表单主键
    primaryKey: string;

    // 表单的loading状态
    loading: boolean;

    // 列信息
    columns: COLUMN[];

    // 隐藏新增按钮
    hideAddBtn?: boolean;

    // 新增按钮的文字
    addBtnText?: string;

    // 隐藏删除按钮
    hideDelBtn?: boolean;

    // 分页
    pagination?: boolean | {

      // 每页条目数，默认10
      pageSize?: number;

      // 每页条目书选择器，默认[10, 20, 30, 40, 50, 100]
      pageSizes?: number[];

      // 只有一页时隐藏
      hideOnSinglePage?: boolean;
    };

  },

  hooks?: {
    // 新增行
    addRow?: (data: Row[], extra: any) => Promise<Row>;

    // 删除行
    delRow?: (rows: Row[], data: Row[], extra: any) => Promise<boolean>;
  }

  events?: {
    // 分页改变时
    onPageChange?: (pageIndex: number, pageSize: number, sortField: string, sortBy: string) => void;

    // 选中改变时
    onSelectedChange?: (rows: object[]) => void;
  },

  methods: {

    /**
     * 校验
     * true: 校验通过, false: 校验不通过
     */ 
    validate: () => Promise<boolean>
  }
}

```

### Table Column

表格列

```ts
interface COLUMN extends BASE {
  attrs: {
    // 表单字段主键
    primaryKey: string;

    // 类型: index, singleSelection, selection, text, input, select, date, switch, search, textarea, checkbox, radio, time, slot
    type: string | ((model: Model, extra: any) => string);

    // 列标题
    label: string;

    // 左右锁定
    fixed?: 'left' | 'right';

    // 是否排序
    sortable?: boolean; 

    // 是否可以清除，默认为true
    clearable?: boolean;

    // 占为内容
    placeholder?: string | string[]

    // 是否禁用
    disabled?: boolean | ((model: Model, extra: any) => boolean);

    // 是否只读
    readonly?: boolean | ((model: Model, extra: any) => boolean);

    // format, model -> component 
    format?: string | ((model: Model, extra: any) => any);

    // parse component -> model
    parse?: string | ((model: Model, extra: any) => any);

    // 验证规则
    rules?: Rule[];
  },

  events?: {
    onChange?: (value: any, model: Model, extra: any) => void;
  }
}
```

### Table Action Column

表格操作列

```ts
interface ACTION_COLUMN extends COLUMN {
  attrs: {
    // 表单字段主键
    primaryKey: string;

    // 类型: index, selection, text, input, select, date, switch, search, textarea, checkbox, radio, time, slot
    type: string | ((model: Model, extra: any) => string);

    // 列标题
    label: string;

    // 操作列中的按钮
    options: ACTION_COLUMN_BUTTON[]
  }
}
```

### Table Action Column Button

表格操作列中的按钮

```ts
interface ACTION_COLUMN_BUTTON extends BASE {

  hide: boolean | ((row: Row, extra) => boolean);

  attrs?: {
    // 按钮类型
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'icon';

    // 加载状态
    loading?: boolean;

    // 禁用状态
    disabled?: boolean | ((row: Row, extra) => boolean);

    // 按钮文字
    label?: string;
  };

  events?: {
    onClick: (row: Row, extra) => void;
  }
}
```
