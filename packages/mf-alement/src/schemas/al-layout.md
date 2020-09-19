### Layout

布局

```ts
interface LAYOUT extends BASE {
  tag: 'al-layout',

  attrs?: {
    /**
     * 子元素排列主方向
     */ 
    direction?: 'row' | 'column' = 'row';

    /**
     * 子元素在主方向上的排列方式
     */ 
    justifyContent?: 'start' | 'end' | 'center' | 'around' | 'between' = 'start';

    /**
     * 子元素在副方向的排列方式
     */ 
    alignItems?: 'start' | 'end' | 'center' = 'start';

    /**
     * 所有子元素的记载状态
     */ 
    loading?: boolean = false;
  }
}
```