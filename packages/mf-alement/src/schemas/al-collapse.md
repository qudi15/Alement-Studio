### Collapse

折叠面板

```ts
interface COLLAPSE extends BASE {
  tag: 'al-collapse',

  attrs?: {
    /**
     * 手风琴模式
     */ 
    accordion?: boolean = false;

    /**
     * 默认打开的页签name
     */ 
    value?: string | string[];
  }

  events?: {
    /**
     * 单击事件
     */ 
    onChange: (event: (string | number)[]) => void;
  }
}
```

### Collapse Item

折叠面板中的元素

```ts
interface COLLAPSE_ITEM extends BASE {

  /**
   * 与COLLAPSE中的value对应
   */ 
  name: string | number;

  attrs?: {

    /**
     * 面板标题
     */ 
    title?: string;

    /**
     * 禁用状态
     */ 
    disabled?: boolean | (model, extra) => boolean;
  }
}
```