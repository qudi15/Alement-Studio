
### Upload

上传组件

```ts
interface UPLOAD extends BASE {

  tag: 'al-upload';

  attrs?: {
    /**
     * 选择完文件是否自动上传
     */ 
    autoUpload?: boolean = false;

    /**
     * 上传文件的地址
     */ 
    action?: string;

    /**
     * 请求头
     */ 
    headers?: object;

    /**
     * 是否支持多选
     */ 
    multiple?: boolean = false;

    /**
     * 上传接受的文件类型
     */ 
    accept?: string;

    /**
     * 组件类型
     */ 
    type?: 'text' | 'picture-card' = 'text';

    /**
     * 组件中的文件
     */ 
    value?: FILE[] = [];

    /**
     * 是否禁用
     */ 
    disabled?: boolean;

    /**
     * 最大允许上传数量
     */ 
    limit?: number;

    /**
     * 提示说明文字
     */ 
    tips?: string;

    /**
     * 自动上传时请求体中附加的数据
     */ 
    data?: object;

    /**
     * 隐藏选取按钮
     */ 
    hideSelectBtn?: boolean;

    /**
     * 选取按钮文字
     */ 
    selectBtnText?: string = '选取文件';

    /**
     * 隐藏上传按钮
     */ 
    hideUploadBtn?: boolean;

    /**
     * 上传按钮文字
     */
    uploadBtnText?: string = '上传按钮的文字'
  },

  children?: UPLOAD_SLOT[];

  hooks?: {
    /**
     * 上传前的hook
     */ 
    beforeUploadHook?: (files) => boolean | Promise<boolean>;

    /**
     * 文件被删除前的hook
     */ 
    beforeRemoveHook?: (file, files) => Promise<boolean>;
  };

  events?: {

    /**
     * 文件被点击时
     */ 
    onPreview: (file: FILE) => void;

    /**
     * 文件被删除时
     */ 
    onRemove: (file: FILE, fileList: FILE[]) => void;

    /**
     * 文件上传成功时
     */ 
    onSuccess: (response, file: FILE, fileList: FILE[]) => void;

    /**
     * 文件上传失败时
     */
    onError: (err, file: FILE, fileList: FILE[]) => void;
  } 
}
```

```ts
interface FILE {
  /**
   * 名称
   */ 
  name: string;

  /**
   * 地址
   */ 
  url: string;
}
```

上传组件支持的插槽

```ts
interface UPLOAD_SLOT extends BASE {
  /**
   * trigger: 选取
   * upload: 上传
   */ 
  slot: 'trigger' | 'upload'
}
```