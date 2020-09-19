

### PAGEDETAIL

详情页面

```ts
interface PAGEDETAIL {
  // 详情页面的数据模型
  model: object;
  // 详情页面用到的额外的数据
  extra?: object;
  // 详情页面数据的主键 查询详情 启用 禁用的时候要用到
  primaryKey: string;
  // 查询数据用的api
  searchApi: string;
  // 创建用的api
  createApi: string;
  // 更新用的api
  updateApi: string;
  // 保存前的钩子函数 该函数的返回值用做保存/更新接口的参数
  beforeSaveHook: Function;
  // 页面的子元素 只能为FORM或者TABLE
  children: (FORM | TABLE)[];
  // 调用保存/更新接口时额外需要在URL中传递的参数
  extraApiParams?: object;
}
```
[FORM](/#/Alement%20Schema/Alement%20Form) [TABLE](/#/Alement%20Schema/Alement%20Table) 