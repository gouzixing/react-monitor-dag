'use strict';

import { Node, Tips } from 'butterfly-dag';
import $ from 'jquery';
import ScheduleEndpoint from './endpoint';
import * as _ from 'lodash';
import * as ReactDOM from 'react-dom';
import '../iconfont.less';

const nodeStatusList = ['selected', 'running', 'success', 'fail'];

export default class ScheduleNode extends Node {
  constructor(opts) {
    super(opts);
  }
  draw(obj) {
    let _dom = obj.dom;
    if (!_dom) {
      _dom = $('<div></div>')
        .attr('class', 'node schedule-node')
        .attr('id', obj.id);
      let statusDom = $('<div></div>');
      $(statusDom).attr('class', 'node-status');
      _dom.append(statusDom);
      let _className = _.get(obj, 'options.className');
      if (_className) {
        $(_dom).addClass(_className);
      }
    }
    const node = $(_dom);
    if (obj.top !== undefined) {
      node.css('top', `${obj.top}px`);
    }
    if (obj.left !== undefined) {
      node.css('left', `${obj.left}px`);
    }
    if (_.get(this, 'options._config.nodeRender')) {
      this._createCustomDom(node);
    } else {
      this._createTypeIcon(node, 'options.iconType');
      this._createTitle(node, obj.options.title);
    }
    if (_.get())
      if (_.get(this, 'options._config.nodeTipRender')) {
        this._createTipDom();
      }
    return node[0];
  }

  mounted() {
    this._createEndpoint();
    this._createTipDom();
    $(this.dom).on('dblclick', (e) => {
      this.emit('events', {
        type: 'custom.node.dblClick',
        node: this,
      });
    });
    $(this.dom).contextmenu((e) => {
      this.emit('events', {
        type: 'custom.node.rightClick',
        node: this,
      });
    });
  }

  _createCustomDom(container = this.dom) {
    let nodeRender = _.get(this, 'options._config.nodeRender');
    ReactDOM.render(nodeRender(this.options), container[0]);
  }

  _createCustomPrivateDom(container = this.dom) {
    let nodeRenderPrivate = _.get(this, 'options');
    if (nodeRenderPrivate.nodeRender) {
      ReactDOM.render(nodeRenderPrivate.nodeRender(this.options), container[0]);
    }
  }

  _createTypeIcon = (root, icon) => {
    let iconDom = $('<i><span class="icon iconfont">&#xe623;</span></i>');
    $(iconDom).attr('class', 'node-icon');
    root.append(iconDom);
  };

  _createTitle = (root, text) => {
    let textDom = $('<span class="node-text"></span>');
    textDom.text(text);
    textDom.appendTo(root);
  };

  focus() {
    $(this.dom).addClass('select');
  }

  unfocus() {
    $(this.dom).removeClass('select');
  }

  running(root) {
    $(this.dom).addClass('running');
    console.log(root)
  }

  stopRunning(root) {
    $(this.dom).removeClass('running');
  }

  combine(nodes) {}

  break(node) {}

  _createTipDom() {
    let nodeTipsRender = _.get(this, 'options._config.nodeTipsRender');
    if (nodeTipsRender) {
      let tipsDom = $('<div class="tips-content"></div>');
      ReactDOM.render(nodeTipsRender(this.options), tipsDom[0]);
      Tips.createTip({
        placement: 'right',
        targetDom: this.dom,
        genTipDom: () => {
          return tipsDom[0];
        },
      });
    }
  }

  _createEndpoint() {
    const expandArea = {
      left: 20,
      right: 20,
      top: 20,
      botton: 20,
    };
    if (this.options.type === 'result') {
      this.addEndpoint({
        id: this.id + 'target',
        orientation: [0, -1],
        type: 'target',
        expandArea: expandArea,
        _config: _.get(this, 'options._config'),
        Class: ScheduleEndpoint,
      });
    } else if (this.options.type === 'algorithm') {
      this.addEndpoint({
        id: this.id + 'target',
        orientation: [0, -1],
        type: 'target',
        expandArea: expandArea,
        _config: _.get(this, 'options._config'),
        Class: ScheduleEndpoint,
      });
      this.addEndpoint({
        id: this.id + 'source',
        orientation: [0, 1],
        type: 'source',
        expandArea: expandArea,
        _config: _.get(this, 'options._config'),
        Class: ScheduleEndpoint,
      });
    } else if (this.options.type === 'data') {
      this.addEndpoint({
        id: this.id + 'source',
        orientation: [0, 1],
        type: 'source',
        expandArea: expandArea,
        _config: _.get(this, 'options._config'),
        Class: ScheduleEndpoint,
      });
    }
  }
}
