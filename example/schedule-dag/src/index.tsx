'use strict';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { transformInitData, diffPropsData } from './adaptor';
import './index.less';
import 'butterfly-dag/dist/index.css';
import ScheduleEdge from './canvas/edge';
import myCanvas from './canvas/canvas';
import * as _ from 'lodash';
import * as HotKeyPlugin from 'butterfly-dag/plugins/hotkey/dist/index.unpkg.js';

interface ComProps {
  data: Array<any> | Object;
  width?: number | string;
  height?: number | string;
  className?: string;
  config?: config;
  runAnimation?: runAnimation;
  onLoaded(canvas: any): void;
  onChange(data: any): void;
  // onFocusNode?(node: any): void;
  // onUnFocusNode?(node: any): void;
  onClickNode?(node: any): void;
  onDbClickNode?(node: any): void;
  onContextMenuNode?(node: any): void;
  // onFocusEdge?(edge: any): void;
  // onUnFocusEdge?(edge: any): void;
  onClickEdge?(edge: any): void;
  onDbClickEdge?(edge: any): void;
  onContextMenuNEdge?(edge: any): void;
  onFocusGroup?(group: any): void;
  onUnFocusGroup?(group: any): void;
  onClickGroup?(group: any): void;
  onDbClickGroup?(group: any): void;
  //画布功能：
  onSelect?(edges: Array<any>, nodes: Array<any>): void;
  unionGroup?(edges: Array<any>, nodes: Array<any>): void;
  separateGroup?(group: any): void;
  combineNodes?(edges: Array<any>, nodes: Array<any>): void;
  breakNodes?(node: any): void;

  //连线校验
}

interface config {
  allowKeyBoard: boolean;
  NodeRender?(node: any): JSX.Element;
  GroupRender?(group: any): JSX.Element;
  labelRender?(edge: any): JSX.Element;
  edge?: {
    type: string;
    config: any;
  };
  diffOptions: Array<string>;
  minimap: {
    // 是否开启缩略图
    enable: boolean;
    config: {
      nodeColor: any;
    };
  };
}
interface runAnimation {
  enable: boolean;
  data: {
    nodes: Array<any>;
    edges: Array<any>;
    groups: Array<any>;
  };
}

export default class ScheduleDag extends React.Component<ComProps, any> {
  protected canvas: any;
  protected canvasData: any;
  private _focusNodes: any;
  private _focusLinks: any;
  private isInit: boolean;
  props: any;
  constructor(props: ComProps) {
    super(props);
    this.canvas = null;
    this.canvasData = null;
    this._focusNodes = [];
    this._focusLinks = [];
    this.isInit = false;
  }

  componentDidMount() {
    let root = ReactDOM.findDOMNode(this) as HTMLElement;
    if (this.props.width !== undefined) {
      root.style.width = this.props.width + 'px';
    }
    if (this.props.height !== undefined) {
      root.style.height = this.props.height + 'px';
    }
    const canvasTheme = {
      edge: {
        type: 'endpoint',
        isExpandWidth: true,
        shapeType: _.get(this, 'props.config.edge.shapeType', 'AdvancedBezier'),
        arrow: _.get(this, 'props.config.edge.config.arrow', true),
        arrowPosition: _.get(
          this,
          'props.config.edge.config.arrowPosition',
          0.5
        ),
        arrowOffset: _.get(this, 'props.config.edge.config.arrowPosition', -8),
        Class: ScheduleEdge,
      },
      endpoint: {
        linkableHighlight: true,
      },
      group: {
        type: 'normal',
      },
    };

    let canvasObj = {
      root: root,
      disLinkable: true,
      linkable: true,
      draggable: true,
      zoomable: true,
      moveable: true,
      layout: 'dagreLayout',
      theme: canvasTheme,
    };
    this.canvas = new myCanvas(canvasObj);

    //注册快捷键
    HotKeyPlugin.register({
      canvas: this.canvas,
      root: root,
    });

    let result = transformInitData({
      config: this.props.config,
      data: _.cloneDeep(
        this.props.data || { nodes: [], edges: [], groups: [] }
      ),
    });

    this.canvas.draw(result, () => {
      this.isInit = true;
    });

    this.canvasData = result;
    // 监听画布事件
    this.canvas.on('events', this.handleCanvasEvents);
  }

  shouldComponentUpdate(newProps: ComProps, newState: any) {
    let result = transformInitData({
      config: this.props.config,
      data: _.cloneDeep(newProps.data || { nodes: [], edges: [], groups: [] }),
    });
    let diffInfo = diffPropsData(
      result,
      this.canvasData,
      _.get(this, 'props.config.diffOptions', [])
    );
    if (diffInfo.rmNodes.length > 0) {
      this.canvas.removeNodes(diffInfo.rmNodes.map((item) => item.id));
    }
    if (diffInfo.addNodes.length > 0) {
      this.canvas.addNodes(diffInfo.addNodes);
    }
    if (diffInfo.addEdges.length > 0) {
      this.canvas.addEdges(diffInfo.addEdges);
    }
    if (diffInfo.rmEdges.length > 0) {
      this.canvas.removeEdges(diffInfo.rmEdges.map((item) => item.id));
    }
    if (diffInfo.addGroups.length > 0) {
      this.canvas.addGroups(diffInfo.addGroups.map((item) => item));
    }
    if (diffInfo.rmGroups.length > 0) {
      this.canvas.removeGroups(diffInfo.rmGroups.map((item) => item.id));
    }
    if (diffInfo.updateNodes.length > 0) {
      let removeData = this.canvas.removeNodes(
        diffInfo.updateNodes.map((item) => item.id),
        false,
        true
      );
      let _addNodes = this.canvas.addNodes(diffInfo.updateNodes, true);
      _addNodes.forEach((item) => {
        item.mounted && item.mounted();
      });
      this.canvas.addEdges(
        removeData.edges.map((edge) => {
          return edge.options;
        }),
        true
      );
    }

    //监听动画
    if (newProps.runAnimation) {
      const { nodes, edges, groups } = newProps.runAnimation.data;
      //nodes动画
      if (nodes.length === 0) {
        this.canvas.nodes.forEach((element) => {
          element.stopRunning(element.dom);
        });
      }
      nodes.forEach((element) => {
        this.canvas.nodes.forEach((ele) => {
          if (ele.id === element) {
            ele.running(ele.dom);
          } 
        });
      });
      //edges动画
      if (edges.length === 0) {
        this.canvas.edges.forEach((element) => {
          element.stopRunning(element);
        });
      }
      edges.forEach((element) => {
        this.canvas.edges.forEach((ele) => {
          // debugger
          if (ele.id === element) {
            ele.running(ele);
          } 
        });
      });
    }
    return true;
  }

  componentDidUpdate() {}

  handleCanvasEvents = (args: any) => {
    const { type } = args;
    switch (type) {
      case 'node:click': {
        this._focusNode([args.node]);
        this.props.onClickNode && this.props.onClickNode(args.node);
        break;
      }
      case 'custom.node.dblClick': {
        this.props.onDbClickNode && this.props.onDbClickNode(args.node);
        break;
      }
      case 'custom.node.rightClick': {
        this.props.onContextMenuNode && this.props.onContextMenuNode(args.node);
        break;
      }
      case 'link:click': {
        this._focusLink([args.edge]);
        this.props.onClickEdge && this.props.onClickEdge(args.edge);
        break;
      }
      case 'custom.edge.dblClick': {
        this.props.onDbClickEdge && this.props.onDbClickEdge(args.edge);
        break;
      }
      case 'custom.edge.rightClick': {
        this.props.onContextMenuEdge && this.props.onContextMenuEdge(args.edge);
        break;
      }
      case 'nodes:delete': {
        this.onDeleteNodes(args);
        this.forceUpdate();
        break;
      }
      case 'link:connect': {
        this.onConnectEdges(args.links);
        this.forceUpdate();
        args.links.forEach((ele) => {
          ele._connectedLink();
        });
        break;
      }
      case 'links:delete': {
        this.onDeleteEdges(args);
        this.forceUpdate();
        break;
      }
      case 'link:reconnect': {
        this.onReConnectEdges(args.addLinks, args.delLinks);
        this.forceUpdate();
        break;
      }
      case 'custom.edge.labelClick': {
        this._focusLink([args.edge]);
        this.props.onClickLabel &&
          this.props.onClickLabel(args.label, args.edge);
        break;
      }
      case 'custom.endpoint.click': {
        this.props.onClickEndpoint && this.props.onClickEndpoint(args.endpoint);
        break;
      }
      case 'custom.endpoint.dblClick': {
        this.props.onDblClickEndpoint &&
          this.props.onDblClickEndpoint(args.endpoint);
        break;
      }
      case 'custom.endpoint.rightClick': {
        this.props.onContextMenuEndpoint &&
          this.props.onContextMenuEndpoint(args.endpoint);
        break;
      }
    }
  };

  // onChangeInfo(type: string, data: any) {
  //   // 不是初始化的时候才需要更改
  //   if (this.isInit) {
  //     if (type === 'system.node.delete') {
  //       const newData = { ...this.props.data };
  //       newData.nodes = (newData.nodes || []).filter((n) => n.id !== data.id);
  //       console.log(newData);
  //     }
  //     if (type === 'system.link.connect') {
  //       const newData = { ...this.props.data };
  //       const newEdges = [...(newData.edges || [])].concat(
  //         (data || []).map((e) => {
  //           return {
  //             arrowPosition: e.arrowPosition,
  //             source: e.sourceEndpoint.id,
  //             sourceNode: e.sourceNode.id,
  //             target: e.targetEndpoint.id,
  //             targetNode: e.targetNode.id,
  //             type: e.type,
  //           };
  //         })
  //       );
  //       newData.edges = newEdges;
  //       this.props.onChange(newData, type, data);
  //     }
  //   }
  // }

  // done
  onConnectEdges(links) {
    let beforeConnectEdge = this.props.validateConnectEdge
      ? this.props.validateConnectEdge
      : function () {
          return true;
        };
    const linkInfos = [];
    links.forEach((item) => {
      if (beforeConnectEdge(item.sourceNode, item.targetNode)) {
        this.props.onConnectedEdge && this.props.onConnectedEdge(item);
        linkInfos.push(item);
      }
    });
    // this.onChangeInfo('system.link.connect', linkInfos);
  }

  // done
  onReConnectEdges(addLinks, rmLinks) {
    let beforeConnectEdge = this.props.validateConnectEdge
      ? this.props.validateConnectEdge
      : function () {
          return true;
        };
    let addLinksInfo = addLinks.map((item) => {
      return _.assign(item.options, {
        source: _.get(item, 'options.source', '').replace('-right', ''),
        target: _.get(item, 'options.target', '').replace('-left', ''),
      });
    });
    console.log(addLinksInfo);
    let rmLinksInfo = rmLinks.map((item) => {
      return _.assign(item.options, {
        source: _.get(item, 'options.source', '').replace('-right', ''),
        target: _.get(item, 'options.target', '').replace('-left', ''),
      });
    });
    this.props.onChange &&
      this.props.onChange({
        type: 'system.link.reconnect',
        addLinks: addLinksInfo,
        rmLinks: rmLinksInfo,
      });
  }

  onDeleteNodes(nodes) {
    let neighborLinksInfo = [];
    nodes.nodes.forEach((node) => {
      let links = this.canvas.getNeighborEdges(node.id);
      let linksInfo = links.map((link) => {
        return link.options;
      });
      neighborLinksInfo = neighborLinksInfo.concat(linksInfo);
      node.remove();
    });
    let nodesInfo = nodes.map((item) => {
      return item.options;
    });
    const data = {
      type: 'system.node.delete',
      nodes: nodesInfo,
      neighborLinks: neighborLinksInfo,
    };
    // this.onChangeInfo('system.node.delete', data);
  }

  onDeleteEdges(links) {
    this.props.onDisConectedEdge && this.props.on;
  }

  _unfocus() {
    this._focusNodes.forEach((item) => {
      item.unfocus();
    });
    this._focusLinks.forEach((item) => {
      item.unfocus();
    });
    this.props.onUnfocusNode &&
      this._focusNodes.forEach((item) => {
        this.props.onUnfocusNode(item);
      });
    this._focusNodes = [];
    this._focusLinks = [];
  }

  _focusNode(nodes) {
    this._unfocus();
    nodes.forEach((node) => {
      node.focus();
    });
    this._focusNodes = this._focusNodes.concat(nodes);
    // this.props.onFocusNode && nodes.forEach((node) => {this.props.onFocusNode(node);});
  }

  _focusLink(links) {
    this._unfocus();
    links.forEach((link) => {
      link.focus();
    });
    this._focusLinks = this._focusLinks.concat(links);
    // this.props.onFocusEdge && links.forEach((link) => {this.props.onFocusEdge(link)});
  }

  _genClassName() {
    let classname = '';
    if (this.props.className) {
      classname = this.props.className + ' butterfly-schedule-dag';
    } else {
      classname = 'butterfly-schedule-dag';
    }
    return classname;
  }

  render() {
    return <div className={this._genClassName()}></div>;
  }
}
