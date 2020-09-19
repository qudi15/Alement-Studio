

### Form

表单组件

```ts
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
    onValidate: (model: Model, extra: any, result) => void;
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

### Form Field

表单字段

```ts
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

    // 其他原子组件的event为Event对象 富文本的event为富文本对象 目前只支持富文本组件的onBlur事件
    onBlur?: (event: any, model: Model, extra: any) => void;
  }
}
```