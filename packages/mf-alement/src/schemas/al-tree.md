### Tree

树

```ts
interface TREE extends BASE {
  attrs: {
    /**
     * 从model中获得数据的主键
     */ 
    primaryKey: string;

    /**
     * 没有数据时的文字
     */ 
    emptyText?: string;

    /**
     * 数据中节点的主键
     */ 
    nodeKey: string;

    /**
     * 选中是否高亮
     */ 
    highlightCurrent?: boolean = false;	

    /**
     * 是否默认展开全部
     */ 
    defaultExpandAll?: boolean = false;

    /**
     * 默认展开节点的主键
     */ 
    defaultExpandeKeys?: string[] = [];

    /**
     * 默认选中
     */ 
    currentNodeKey?: string;

    /**
     * 是否子节点懒加载
     */ 
    lazy?: boolean = false;

    /**
     * 树节点文字的key
     */ 
    labelKey?: string = 'name';

    /**
     * 树节点子节点key
     */ 
    childrenKey?: string = 'children';

    /**
     * 在lazy = true的情况下，指定节点是否是叶子节点
     */ 
    isLeaf?: boolean | (data: TREE_DATA, node: TREE_NODE) => boolean;
  },

  events?: {
    onClick: (data: TREE_DATA, node: TREE_NODE) => void;
  }
}
```

```ts
interface TREE_DATA {
  [nodeKey: string]: string;
  [labelKey: string]: string;
  [childrenKey: string]: TREE_DATA[];
  
  [extraKey: string]?: any;
}
```

```ts
interface TREE_NODE {
  id: string;
  childNodes: TREE_NODE[];
  data: TREE_DATA;
  level: number;
  parent: TREE_NODE;
  isLeaf: boolean;
  isCurrent: boolean;
  expanded: boolean;
}
```