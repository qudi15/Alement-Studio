### Button

按钮

```ts
interface BUTTON extends BASE {
  tag: 'al-button',

  attrs?: {
    /**
     * 按钮类型
     * primary / success / danger / text ...
     */ 
    type?: string

    /**
     * 加载状态
     */ 
    loading?: boolean;

    /**
     * 禁用状态
     */ 
    disabled?: boolean;

    /**
     * 内容
     */ 
    text?: string;

    /**
     * 按钮中的图标
     */ 
    icon?: string;

    /**
     * 按钮尺寸
     */ 
    size?: string;
  }

  events?: {
    /**
     * 单击事件
     */ 
    click: Event => void;
  }
}
```