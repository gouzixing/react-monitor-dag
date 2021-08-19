'use strict';
import { Edge } from 'butterfly-dag';
import $ from 'jquery';
import _ from 'lodash';
import * as ReactDOM from 'react-dom';
import { Tips } from 'butterfly-dag';
export default class ScheduleEdge extends Edge {
  constructor(data){
    super(data)
  }

  //连线中的线条虚线 连线后 触发 link：connect add成功状态
  mounted() {
    //事件监听
    $(this.eventHandlerDom).on('dblclick', (e) => {
      this.emit('events', {
        type: 'custom.edge.dblClick',
        edge: this,
      });
    });
    $(this.eventHandlerDom).contextmenu((e) => {
      this.emit('events', {
        type: 'custom.edge.rightClick',
        edge: this,
      });
    });
    $(this.eventHandlerDom).mouseenter(() => {
      $(this.dom).addClass('hover');
      $(this.arrowDom).addClass('hover');
    });
    $(this.eventHandlerDom).mouseleave(() => {
      $(this.dom).removeClass('hover');
      $(this.arrowDom).removeClass('hover');
    });
  }

  draw(obj) {
    let path = super.draw(obj);
    path.setAttribute('class', 'butterflies-link schedule-link');
    return path;
  }
  drawArrow(arrow) {
    let arrowDom = super.drawArrow(arrow);
    if (arrowDom) {
      arrowDom.setAttribute('class', 'butterflies-arrow schedule-arrow');
    }
    return arrowDom;
  }
  drawLabel(label) {
    if (label) {
      let labelRender = _.get(this, 'options._config.labelRender');
      let container = $('<span class="butterflies-label schedule-label"></span>');
      container.on('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.emit('custom.edge.labelClick', {
          edge: this,
          label: label
        });
      });
      if (labelRender) {
        ReactDOM.render(
          labelRender(label, this.options),
          container[0]
        );
        return container[0];
      } else if (label) {
        container.text(label);
        return container[0];
      }
    }
  }

  focus() {
    $(this.dom).addClass('select');
    $(this.arrowDom).addClass('select');
  }

  unfocus() {
    $(this.dom).removeClass('select');
    $(this.arrowDom).removeClass('select');
  }

  running(root){
    $(this.dom).addClass('running')
    $(this.arrowDom).addClass('running');
  }
  
  stopRunning(root){
    $(this.dom).removeClass('running')
    $(this.arrowDom).removeClass('running');
  }

  _connectedLink(){
    $(this.dom).addClass('connect')
  }
}