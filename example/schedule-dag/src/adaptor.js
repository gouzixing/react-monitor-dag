'use strict';

import ScheduleNode from './canvas/node';
import ScheduleEdge from './canvas/edge';
import ScheduleGroup from './canvas/group';
import * as _ from 'lodash';

export let transformInitData = (info) => {
  let { data, config } = info;
  let nodes = (data.nodes || []).map((item) => {
    return _.assign(item, {
      _config: config,
      Class: ScheduleNode,
    });
  });

  let edges = (data.edges || []).map((item) => {
    return _.assign(item, {
      id: `${item.source}-${item.target}`,
      type: 'endpoint',
      sourceNode: item.sourceNode,
      targetNode: item.targetNode,
      source: `${item.source}`,
      target: `${item.target}`,
      _config: config,
      Class: ScheduleEdge,
    });
  });

  let groups = (data.groups || []).map((item) => {
    return _.assign(item, {
      options: {
        ...item.options,
      },
      Class: ScheduleGroup,
    });
  })

  return {
    nodes,
    edges, 
    groups
  };
};

// diff 帮助用户setstate中不用主动去更新页面

// render()
export let diffPropsData = (newData, oldData, diffOptions = []) => {
  let addNodes = _.differenceWith(newData.nodes, oldData.nodes, (a, b) => {
    return a.id === b.id;
  });
  let rmNodes = _.differenceWith(oldData.nodes, newData.nodes, (a, b) => {
    return a.id === b.id;
  });

  let updateNodes = [];
  if (diffOptions.length > 0) {
    updateNodes = _.differenceWith(newData.nodes, oldData.nodes, (a, b) => {
      return diffOptions.reduce((pre, cur) => {
        return pre && a[cur] === b[cur];
      }, a[diffOptions[0]] === b[diffOptions[0]]);
    })
  }

  let addEdges = _.differenceWith(newData.edges, oldData.edges, (a, b) => {
    return (
      a.sourceNode === b.sourceNode &&
      a.targetNode === b.targetNode &&
      a.sourceEndpoint === b.sourceEndpoint &&
      a.targetEndpoint === b.targetEndpoint
    );
  });
  let rmEdges = _.differenceWith(oldData.edges, newData.edges, (a, b) => {
    return (
      a.sourceNode === b.sourceNode &&
      a.targetNode === b.targetNode &&
      a.sourceEndpoint === b.sourceEndpoint &&
      a.targetEndpoint === b.targetEndpoint
    );
  });

  let addGroups = _.differenceWith(newData.groups, oldData.groups, (a, b) => {
    return a.id === b.id;
  });

  let rmGroups = _.differenceWith(oldData.groups, newData.groups, (a, b) => {
    return a.id === b.id;
  })

  return {
    addNodes,
    rmNodes,
    updateNodes,
    addEdges,
    rmEdges,
    addGroups,
    rmGroups
  };
}