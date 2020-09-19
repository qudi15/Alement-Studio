
### Rich Text Editor

富文本组件

```ts
interface RICH_TEXT_EDITOR extends BASE {

  tag: 'al-rich-text-editor';

  attrs?: {
    /**
     * 富文本中的默认值
     */ 
    value?: string;
  },

  events?: {
    /**
     * 富文本值发生改变时触发
     */ 
    onChange?: (value: string) => void;

    /**
     * 焦点丢失时触发
     */ 
    onBlur?: () => void;
  } 
}
```