### Tabs

标签页

```ts
interface TAB extends BASE {
  tag: 'al-tab';

  attrs?: {
    /**
     * 选项卡选中的值
     */
    value?: string;  

    /**
     * 标签页项
     */
    tabs: TAB_PANEL[];
    
    /**
     * 标签是否可关闭，当选项卡的closable存在时，选项卡优先级高
     */
    closable?: boolean = false;
  }

  events?: {
    /**
     * 	tab 被选中时触发
     */ 
    onTabClick?: (name: string) => void
  }
  
  hooks?: {
    /**
     * 切换标签前的钩子, Promise中为false时不切换页签
     */ 
    beforeLeaveHook?: (newActiveName: string, oldActiveName: string) => Promise<true>
  }
}
```

### Tab Panel

选项卡

```ts
interface TAB_PANEL extends BASE {
  tag: 'al-tab-panel';
  
  attrs: {
    /**
     * 选项卡绑定Model值, 与TABS中的value对应
     */ 
    name: string;
    
    /**
     * 选项卡标题
     */ 
    label: string;
  
    /**
     * 选项卡的禁用状态
     */ 
    disabled?: boolean = false;
    
    /**
     * 标签是否可关闭
     */
    closable?: boolean = false;
  }
}
```
