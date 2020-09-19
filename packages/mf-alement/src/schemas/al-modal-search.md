### Modal Search

弹窗查询

```ts
interface MODAL_SEARCH extends BASE {
  tag: 'al-input-modal-search',

  attrs?: {

    /**
     * 查询区域的数据模型 当defaultSearchParams为函数时 model作为defaultSearchParams的第一个参数 extra作为defaultSearchParams的第二个参数
     */ 
    model?: object;
    /**
     * 弹窗模式，单选或多选
     */ 
    mode?: 'single' | 'multiple' = 'single';

    /**
     * 类型
     * 输入框型或按钮型
     */ 
    nativeType: 'input' | 'button' = 'input';

    /**
     * 禁用状态
     */ 
    disabled?: boolean;

    /**
     * 当前的值
     */ 
    value: object | object[];

    /**
     * 用于显示值中的哪个字段
     */ 
    format: string;

    /**
     * 占位符
     */ 
    placeholder?: string;

    /**
     * 查询使用的api
     */ 
    searchApi: string;

    /**
     * 计数用的api
     */ 
    countApi: string;

    /**
     * 查询条件，同查询页面的查询条件
     */
    fields: SEARCH_PAGE_QUERY_FIELD[];

    /**
     * 查询结果，同查询页面的查询结果
     */ 
    columns: SEARCH_PAGE_RESULT_COLUMN[];

    /**
     * 弹窗页面的宽度，默认为单选时800px，多选时80%
     */ 
    width?: string;

    /**
     * 默认的查询条件
     */ 
    defaultSearchParams?: object | (model: Model, extra: any) => object;

    /**
     * 隐藏重置按钮
     */ 
    hideResetBtn?: boolean = false;

    /**
     * 隐藏查询按钮
     */ 
    hideSearchBtn?: boolean = false;
  }

  events?: {
    /**
     * 点击确定时
     */ 
    change?: (selected: object | object[]) => void;
  },

  hooks?: {
    /**
     * 查询前的hook
     */ 
    beforeSearchHook?: (searchParams) => searchParams | null;
  }
}
```

### Related

- [SEARCH_PAGE_QUERY_FIELD](#/Alement%20Schema/Alement%20Page%20Search)

- [SEARCH_PAGE_RESULT_COLUMN](#/Alement%20Schema/Alement%20Page%20Search)