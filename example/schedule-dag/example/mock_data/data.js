// 点击线条相应,还是点击label,相应区域的,相应之后的内容统一做出来 点击线条

// 锚点, 相对较好的交互;

// 节点连线可拖拽  响应区域；

// 
import React from 'react';

'use strict';
export default {
  nodes: [
    {
      id: '1',
      top: 10,
      left: 500, 
      title: '算法组件1',
      className: 'data',
      iconType: 'icon-kaifa',
      type:'data',
      status:'success',
      // nodeRender: (data) => {
      //   return (
      //     <span className="node-private">{data}</span>
      //   )
      // },
      // diff有变化，存在nodeRender，则把这块的数据塞进nodeRender内部，调用reactDom.render()
    },
    {
      id: '2',
      top: 100,
      left: 300,
      title: '算法组件2',
      className: 'algorithm',
      iconType: 'icon-kaifa',
      type:'algorithm',
      status:'fail'
    },
    {
      id: '3',
      top: 100,
      left: 500,
      title: '算法组件2',
      className: 'algorithm',
      iconType: 'icon-kaifa',
      type:'algorithm',
      status:'success'
    },
    {
      id: '4',
      top: 100,
      left: 700,
      title: '算法组件2',
      className: 'algorithm',
      iconType: 'icon-kaifa',
      type:'algorithm',
      status:'success'
    },
    {
      id: '5',
      top: 200,
      left: 300,
      title: '算法组件3',
      className: 'result',
      iconType: 'icon-kaifa',
      type:'algorithm',
      status:'running'
    },
    {
      id: '6',
      top: 200,
      left: 500,
      title: '算法组件3',
      className: 'result',
      iconType: 'icon-kaifa',
      type:'algorithm'
    },
    {
      id: '7',
      top: 200,
      left: 700,
      title: '算法组件3',
      className: 'result',
      iconType: 'icon-kaifa',
      type:'algorithm'
    },
    {
      id: '8',
      top: 300,
      left: 500,
      title: '算法组件4',
      className: 'result',
      iconType: 'icon-kaifa',
      type:'result'
    },
  ],

  edges: [
    {
      source: '1source',
      target: '2target',
      sourceNode: '1',
      targetNode: '2',
      type: 'endpoint',
      arrowPosition: 0.5,
      // label:'fafa'
    },
    {
      source: '1source',
      target: '3target',
      sourceNode: '1',
      targetNode: '3',
      type: 'endpoint',
      arrowPosition: 0.5,
      // label:'fafa'
    },
    {
      source: '1source',
      target: '4target',
      sourceNode: '1',
      targetNode: '4',
      type: 'endpoint',
      arrowPosition: 0.5,
      // label:'fafa'
    },
    {
      source: '2source',
      target: '5target',
      sourceNode: '2',
      targetNode: '5',
      type: 'endpoint',
      arrowPosition: 0.5,
    },
    {
      source: '3source',
      target: '6target',
      sourceNode: '3',
      targetNode: '6',
      type: 'endpoint',
      arrowPosition: 0.5,
    },
    {
      source: '4source',
      target: '7target',
      sourceNode: '4',
      targetNode: '7',
      type: 'endpoint',
      arrowPosition: 0.5,
    },
    {
      source: '5source',
      target: '8target',
      sourceNode: '5',
      targetNode: '8',
      type: 'endpoint',
      arrowPosition: 0.5,
    },
    {
      source: '6source',
      target: '8target',
      sourceNode: '6',
      targetNode: '8',
      type: 'endpoint',
      arrowPosition: 0.5,
    },
    {
      source: '7source',
      target: '8target',
      sourceNode: '7',
      targetNode: '8',
      type: 'endpoint',
      arrowPosition: 0.5,
    },
  ],
  // groups: [
  //   {
  //     id: 'g1',
  //     options: {
  //       title: '测试',
  //     },
  //     top: 650,
  //     left: 500,
  //     width: 100,
  //     height: 100,
  //   },
    
  //   {
  //     id: 'g2',
  //     options: {
  //       title: '测试',
  //     },
  //     top: 650,
  //     left: 500,
  //     width: 100,
  //     height: 100,
  //   },
  // ],
};