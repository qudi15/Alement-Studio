

### PAGE_SEARCH

查询页面配置

```ts
interface PAGE_SEARCH extends BASE {
  attrs: {
    /**
     * 主键
     */ 
    primaryKey: string;

    /**
     * 查询页面查询数据的API地址
     */ 
    searchApi: string;

    /**
     * 查询页面统计总数的API地址
     */ 
    countApi: string;
    

    /**
     * 当带有删除功能时的删除API地址
     */ 
    deleteApi?: string;

    /**
     * 是否隐藏新增按钮
     */
    hideAddBtn?: boolean;

    /**
     * 新增按钮的文字
     */ 
    addBtnText?: string;

    /**
     * 查询条件表单中的字段
     */
    fields: SEARCH_PAGE_QUERY_FIELD[];

    /**
     * 查询结果表格中的字段
     */
    columns: SEARCH_PAGE_RESULT_COLUMN[];

    /**
     * 查询条件标题
     */ 
    searchParamsTitle?: string;

    /**
     * 查询结果标题
     */ 
    searchResultTitle?: string;
  },

  
  /**
   * 查询页面的事件
   */ 
  events?: {
    /**
     * 当查询结果每行操作列中的查看按钮被点击时触发
     */ 
    onViewBtnClick: (scope: TableRowScope) => void;

    /**
     * 当查询结果每行操作列中的编辑按钮被点击时触发
     */ 
    onEditBtnClick: (scope: TableRowScope) => void;

    /**
     * 当查询结果上面的新增按钮被点击时触发
     */ 
    onAddBtnClick: () => void;
    
    /**
     * 当查询结果出现选择列时(包括多选和单选)，选中的行改变时触发
     */ 
    onSelectionChange: (rows: TableRow[]) => void;
  };

  hooks?: {
    /**
     * 查询调用服务前被调用，可用作在查询前修改查询条件
     */ 
    beforeSearchHook?: (searchParam: SearchParam) => SearchParam;
  }
}
```

### SEARCH_PAGE_QUERY_FIELD

查询条件表单中字段的设置

 * @see {@link bar}
 * @see bar

```ts
interface SEARCH_PAGE_QUERY_FIELD extends BASE {
  /**
   * 查询条件对象中字段所对应的key
   */ 
  primaryKey: string;
  
  /**
   * 当前字段不可被修改，以默认值作为值
   */ 
  fixed?: boolean;
  
  /**
   * 存在同一个条件多个值的情况下，两个值之间的关系
   */ 
  relationship: 'OR' | 'AND';
  
  /**
   * 字段与值之间的关系
   */ 
  conditionOperator: '=' | '<>' | '>' | '>=' | '<' | '<=' | 'like';
  
  /**
   * 查询条件表单中的组件类型，取决于表单组件支持的类型
   */
  type: string | (model, extra) => string;
  
  /**
   * 查询条件表单中字段的标题文字
   */ 
  label?: string;
  
  /**
   * 查询条件表单中字段的标题文字的宽度，默认150px
   */ 
  lableWidth?: string;

  /**
   * 查询条件是否被隐藏
   * 当定义成函数式，可根据当前表单model中的值动态显示或隐藏
   */ 
  hide?: boolean | (model, extra) => boolean;

  /**
   * 样式class
   */ 
  classList?: string[];

  /**
   * 内联样式
   */ 
  styleMap?: {
    [styleName: string]: string
  };

  /**
   * 控制字段的加载状态，可在对应类型的原子组件中查看
   */ 
  loading?: boolean;
}
```

### SEARCH_PAGE_RESULT_COLUMN

查询结果表格中列配置

```ts
interface SEARCH_PAGE_RESULT_COLUMN {
  /**
   * 使用行数据中哪个字段展示
   */ 
  primaryKey: string;

  /**
   * 查询结果列展示数据的类型
   */ 
  type: 'text' | 'valueset'

  /**
   * 查询结果列头文字
   */ 
  label?: string;

  /**
   * 查询结果列是否锁定在两侧
   */ 
  fixed?: 'left' | 'right';
  
  /**
   * 文字超长是否出现浮动弹窗
   */ 
  showOverflowTooltip?: boolean;
  
  /**
   * 列宽
   * 例: 120px
   */ 
  width?: string;

  /**
   * 列class
   */ 
  classList?: string[];

  /**
   * 列内联样式
   */ 
  styleMap?: {
    [styleName: string]: string
  };
}
```
