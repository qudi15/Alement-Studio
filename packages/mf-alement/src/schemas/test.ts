
interface Model {}

interface Row {}

interface Rule {}

interface BASE {
  // 标签名
  tag?: string;

  id?: string;

  name?: string;

  classList?: string[];

  // 扩展
  slot?: string;

  styleMap?: {
    [styleName: string]: string
  };

  children?: BASE[];

  hide?: boolean | ((...args: any[]) => boolean);

  attrs?: {
    [attributeName: string]: any;
  };

  events?: {
    [eventName: string]: (...args: any[]) => void;
  }
}

interface FORM extends BASE {
  attrs: {
    // 表单主键
    primaryKey: string;

    // 表格字段label的默认宽度，会被field的labelWidth覆盖
    labelWidth?: string;

    // 表单的loading状态
    loading?: boolean;

    // 表单中的字段
    fields: FORM_FIELD[];
  },

  events?: {
    // 校验
    onValidate: (model: Model, extra: any, result) => Promise<boolean>;
  } 
}

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
  }
}

interface COLUMN extends BASE {
  attrs: {
    // 表单字段主键
    primaryKey: string;

    // 类型: index, selection, text, input, select, date, switch, search, textarea, checkbox, radio, time, slot
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


interface FORM_FIELD extends BASE {
  attrs: {
    // 表单字段主键
    primaryKey: string;

    // 类型：text, input, select, date, switch, search, textarea, checkbox, radio, time, slot
    type: string | ((model: Model, extra: any) => string);

    // 文本
    label: string;

    // 是否锁定，锁定的字段不可编辑，不可清空
    fixed?: boolean;

    // 是否可以清除，默认为true
    clearable?: boolean;

    // 占为内容
    placeholder?: string | string[]

    // 占几个分栏 0 - 24, 默认8
    width?: number;

    // 字段label宽度
    labelWidth?: string;

    // 是否禁用
    disabled?: boolean | ((model: Model, extra: any) => boolean);

    // 是否只读
    readonly?: boolean | ((model: Model, extra: any) => boolean);

    // format, model -> component 
    format?: string | ((value: any, model: Model, extra: any) => any);

    // parse component -> model
    parse?: string | ((value: any, model: Model, extra: any) => any);

    // 验证规则
    rules?: Rule[];
  },

  events?: {
    onChange?: (value: any, model: Model, extra: any) => void;
  }
}

interface SELECT_FIELD extends BASE {
  attrs: {
    // 表单字段主键
    primaryKey: string;

    // 类型
    type: string | ((model: Model, extra: any) => string);

    // 文本
    label: string;

    // 模式，多选、单选、标签，默认单选
    mode?: string;

    // 搜索
    search?: boolean;

    // 下拉选项
    options: { label: string, value: string | number }[];
  }
}

interface DATE_FIELD extends BASE {
  attrs: {
    // 表单字段主键
    primaryKey: string;

    // 类型
    type: string | ((model: Model, extra: any) => string);

    // 文本
    label: string;

    // 是否显示时间
    time?: boolean;

    // 不可选日期的控制
    disabledDate?: ((date, model: Model, extra: any) => boolean);
  }
}

interface NUMBER_FIELD extends BASE {
  attrs: {
    // 表单字段主键
    primaryKey: string;

    // 类型
    type: string | ((model: Model, extra: any) => string);

    // 文本
    label: string;

    // 最小值
    min?: number | ((model: Model, extra: any) => number);

    // 最大值
    max?: number | ((model: Model, extra: any) => number);

    // 步长
    step?: number | ((model: Model, extra: any) => number);

    // 精度
    precision?: number | ((model: Model, extra: any) => number);
  }
}

interface SEARCH_FIELD extends BASE {
  attrs: {
    // 表单字段主键
    primaryKey: string;

    // 类型
    type: string | ((model: Model, extra: any) => string);

    // 文本
    label: string;
  }
}

interface PAGE_SEARCH_FIELD {
  // 查询字段的类型
  type: string | ((model: Model, extra) => string);

  // 查询字段
  label: string;

  // 查询字段key
  primaryKey: string;

  // 查询条件 AND, OR
  relationship?: string;

  // 查询条件匹配规则 =, like
  conditionOperator?: string;

  // 将查询字段中的值转换成api参数
  parse?: string | ((model: Model, extra) => any);

  // 查询条件占几个格子，默认8，最大24
  width?: number;

  // 查询条件是否锁定，禁用且不可清空
  fixed?: boolean;

  // 下拉选项
  options?: { text: string, value: any }[]

  // 值集的code
  code?: string;
}

interface PAGE_SEARCH_COLUMN {
  // 查询结果列类型
  type?: string;

  // 取行数据的哪个字段
  primaryKey?: string;

  // 将api的数据转换成展示的值
  format?: string | ((row: Row, extra) => string);

  // 列宽
  width?: string;

  // 列锁定
  fixed?: 'left' | 'right';

  // 下拉选项，用于value -> text
  options?: { text: string, value: any }[]

  // 值集的code
  code?: string;
  
}

interface PAGE_SEARCH_SCHEMA extends BASE {
  attrs: {
    // 主键
    primaryKey: string;

    // 查询用的api
    searchApi: string;

    // 计数用的api
    countApi: string;

    // 删除用的api
    deleteApi: string;

    // 查询条件
    fields: PAGE_SEARCH_FIELD[];

    // 查询结果
    columns: PAGE_SEARCH_COLUMN[];
  },

  hooks?: {
    beforeSearchHook: (params) => object;
  }
}