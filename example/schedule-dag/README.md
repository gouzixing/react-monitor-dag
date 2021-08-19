## 🌟 特点

1. 支持自定义 focus、hover 及动画状态
2. 支持线段 label 样式
3. 支持节点，锚点，线段 label 的 tooltips
4. 运行状态的动画展示
5. Endpoint connectable的展示
6. 支持节点框选合成子节点 --todo

<br/>

## 组件使用方法<a name='canvas-attr'></a>：

### <b>组件引入</b>

```jsx
<ScheduleDag
    data={canvasData}
    width
    height
    className
    config={config}
    runAnimation={runAnimation}
    onLoaded={()=>{}}
    onChange={()=>{}}//
    //画布点击等事件
    onFocusNode={(node)=>{}}
    onUnfocusNode={(node)=>{}}
    onClickNode={(node)=>{}}
    onDbClickNode={(node)=>{}}
    onContextMenuNode={(node)=>{}}
    onFocusEdge={(edge)=>{}}
    onUnfocusEdge={(edge)=>{}}
    onClickEdge={(edge)=>{}}
    onDbClickEdge={(edge)=>{}}
    onContextMenuEdge={(edge)=>{}}
    onFocusGroup={(group)=>{}}
    onUnFocusGroup={(group)=>{}}
    onClickGroup={(group)=>{}}
    //画布功能事件
    onSelect={(nodes,edge)=>void}
    unionGruop = {(nodes,edge)=>void}
    breakGroup = {(nodes,edge)=>void}
    combine={(nodes,edges)=>void}
    breakNode={(node)=>void}
    // 连线校验方法
    validateConnectEdge={({fromNode,toNode})=>bool}
    // 连线回调
    onConnectedEdge={({fromNode,toNode})=>void}
    // 删线回调
    onDisConectedEdge={({fromNode,toNode})=>void}
/>
```

## ScheduleDag 属性

|     参数     |           说明            |       类型       | 默认值 |
| :----------: | :-----------------------: | :--------------: | :----: |
|     data     |         画布数据          |       any        |   -    |
|    width     |          组件宽           | number ｜ string |   -    |
|    height    |          组件高           | number ｜ string |   -    |
|  className   |         组件类名          |      string      |   -    |
|    config    | 画布配置，见 config props |       any        |   -      |
| runAnimation |      动画配置，见下       |       any        |  - ｜
|onChange| 图内数据变化事件抛出全量data|`(data) => void`| - |
|onClickNode  |单击节点事件  |`(node) => void`| - |
|onDbClickNode  |双击节点事件  |`(node) => void`| - |
|onContextMenuNode | 右键节点事件 | `(node) => void` |  |-|
|onClickEdge  |单击线条事件  |`(edge) => void`| - |
|onDbClickEdge  |双击线条事件  |`(edge) => void`| - |
|onContextMenuEdge |  右键线条事件 | `(edge) => void` |  |-|
|onClickGroup|  单击节点组事件 |`(group) => void`| - |
|onClickCanvas  |双击画布事件  |`(canvas) => void`| - |
|onContextCanvas |  右键画布事件 | `(canvas) => void` |  |-|
|validateConnectEdge | 连线前校验 | `boolean` | true |
|onConnectedEdge | 连接回调 | `(sourceNode, targetNode) => void`| - |
|onDisConectedEdge | 断线回调 | `(sourceNode, targetNode) => void`| - |


## config: 渲染方式定义

|     参数      |           说明            |      类型       | 默认值 |
| :-----------: | :-----------------------: | :-------------: | :----: |
| allowKeyBoard |     允许键盘默认事件      |     boolean     |   -    |
|  NodeRender   |        Node 的渲染        | (node) => void  |   -   |
|  GroupRender  |       Group 的渲染        | (group) => void |   -    |
|  labelRender  |       label 的渲染        | (edge) => void  |   -    |
|     edge      | edge 的渲染 见 edge props |       {}        |        |
|  diffOptions  | 节点更新时 diff 字段集合  |  Array<string>  | ['id'] |
|    minimap    |      是否开启缩略图       | minimap prop{}  |   -    |

## <a name='edge-prop'></a><b>edge</b>

定制线段属性
| 参数 | 说明 | 类型 | 默认值 |
|:------:|:--------:|:----------------------------------:|:-----:|
| shapeType | 线段的类型 | <font color="c41d7f">string</font> | - |
| config | 线段的配置 | <font color="c41d7f"> any</font> | - |

其中的 config 支持参数：
| 参数 | 说明 | 类型 | 默认值 |
|:------:|:--------:|:----------------------------------:|:-----:|
| arrow | 箭头 | <font color="c41d7f">bool</font> | true |
| arrowPosition | 箭头的位置 | <font color="c41d7f"> Number</font> | 0.5 |
| arrowOffset | 箭头的偏置 | <font color="c41d7f"> Number</font> | -8 |

## runAnimation:

|  参数  |            说明             |  类型   |            默认值             |
| :----: | :-------------------------: | :-----: | :---------------------------: |
| enable |        是否开启动画         | boolean |             false             |
|  data  | 需要变为 running 状态的数据 |   {}    | {nodes:[],egdes:[],groups:[]} |


```javascript
const runAnimation = {
  enable:true;
  data:{
    nodes:[],
    edges:[],
    groups:[],
  }
}

<ScheduleDag
  runAnimation = {runAnimation}
/>
```