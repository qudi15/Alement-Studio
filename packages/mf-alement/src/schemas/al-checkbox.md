### Checkbox

复选框

```ts
interface CHECKBOX extends BASE {
  tag: 'al-checkbox',

  attrs?: {

    /**
     * 复选框选中的值
     */ 
    value?: (string | number)[]

    /**
     * 禁用状态
     */ 
    disabled?: boolean;

    /**
     * 可供选择的选项
     */ 
    options: CHECKBOX_OPTION[];

    /**
     * 复选框的校验条件
     */ 
    rules?: RULE[];
  }

  events?: {
    /**
     * 选中项变化时触发
     */ 
    change: ((string | number)[]) => void;
  }
}
```

### Checkbox Option

复选框中的选项

```ts
interface CHECKBOX_OPTION {
  /**
   * 选项的文字
   */ 
  text: string;

  /**
   * 选项的值
   */ 
  value: string | number;

  /**
   * 选项的禁用状态
   */ 
  disabled?: boolean;
}
```

### Related

[RULE](#/Alement%20Schema/Alement%20Rule)