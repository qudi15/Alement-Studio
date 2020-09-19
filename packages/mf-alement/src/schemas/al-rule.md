### RULE

表单、表格中字段的校验配置

```ts
interface RULE {
  /**
   * 是否必填
   */ 
  required?: boolean;

  /**
   * 验证不通过时显示的文字
   */ 
  message: string;

  /**
   * 校验的触发方式
   */
  trigger: 'blur' | 'change' | 'blur,change';

  /**
   * 自定义验证
   * 验证通过时：cb()
   * 验证失败时：cb(new Error('异常信息'))
   */ 
  validator?: (value, model, cb, extra) => void;
}
```