
### Base

将页面中的元素抽象成一个对象，用对象中的属性表达元素的特点

```ts
interface BASE {
  /**
   * 标签名
   */ 
  tag?: string;

  /**
   * 唯一id，用于定位元素
   */ 
  id?: string;

  /**
   * 名称
   */ 
  name?: string;

  /**
   * 样式class列表
   */ 
  classList?: string[];

  /**
   * 具名插槽，用来扩展
   */ 
  slot?: string;

  /**
   * 内联样式
   */ 
  styleMap?: {
    [styleName: string]: string
  };

  /**
   * 子元素
   */ 
  children?: BASE[];

  /**
   * 元素是否隐藏
   */ 
  hide?: boolean | ((...args: any[]) => boolean);

  /**
   * 元素的属性
   */ 
  attrs?: {
    [attributeName: string]: any;
  };

  /**
   * 元素被监听的事件
   */ 
  events?: {
    [eventName: string]: (...args: any[]) => void;
  };

  /**
   * 可以主动调用的元素方法
   */ 
  methods?: {
    [methodName: string]: (...args: any[]) => any;
  }
}
```