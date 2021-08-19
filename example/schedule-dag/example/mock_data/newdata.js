'use strict';
export default {
  nodes: [
    {
      id: '1',
      top: 50,
      left: 500, 
      title: '数据集22',
      className: 'data',
      iconType: 'icon-kaifa',
      type:'data',
      // status:'suc'
    },
    {
      id: '2',
      top: 100,
      left: 500,
      title: '算法',
      className: 'algorithm',
      iconType: 'icon-kaifa',
      type:'algorithm'
    },
  ],
  edges: [
    {
      source: '1source',
      target: '2target',
      sourceNode: '1',
      targetNode: '2',
      arrow: true,
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
  //     top: 250,
  //     left: 500,
  //     width: 100,
  //     height: 100,
  //     resize: true,
  //     draggable: false,
  //   },
  //   {
  //     id: 'g2',
  //     options: {
  //       title: '测试',
  //     },
  //     top: 350,
  //     left: 500,
  //     width: 100,
  //     height: 100,
  //     resize: true,
  //     draggable: false,
  //   }
  // ],
};
