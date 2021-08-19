
import { Endpoint, Tips } from 'butterfly-dag';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';
import {renderToStaticMarkup } from 'react-dom/server';
import * as React from 'react';

function stringToDom(str) {
  var div = document.createElement("div");
  if (typeof str == "string")
      div.innerHTML = str;
  return div.childNodes;
}

// const EndPointElement = ({ id, className }) => {
//   return <div className='schedule-endpoint' id={id} />;
// };

export default class ScheduleEndpoint extends Endpoint{
  constructor(opts) {
    super(opts);
  }

  draw(obj){
    let endpoint = super.draw(obj);
    $(endpoint).addClass('schedule-endpoint')
    // endpoint.setAttribute('class', 'butterflies-endpoint schedule-endpoint');
    return endpoint;
  }

  mounted(){
    this._createTipDom();
    $(this.dom).on('click', (e) => {
      this.emit('events', {
        type: 'custom.endpoint.click',
        endpoint: this,
      });
    });
    $(this.dom).on('dblclick', (e) => {
      this.emit('events', {
        type:'custom.endpoint.dblClick',
        endpoint: this,
      });
    });
    $(this.dom).contextmenu((e) => {
      this.emit('events',{
        type:'custom.endpoint.rightClick',
        endpoint:this,
      })
    })
  }

  linkable(){
    $(this.dom).addClass('linkable')
  }

  unlinkable(){}

  _createTipDom() {
    let pointTipsRender = _.get(this, 'options._config.endpointTipRender');
    if (pointTipsRender) {
      let placement = '';
      let direction = _.get(this, 'options._config.direction');
      if (direction === 'left-right') {
        placement = this.type === 'target' ? 'left' : 'right';
      } else {
        placement = this.type === 'target' ? 'top' : 'bottom';
      }
      let tipsDom = $('<div class="tips-content"></div>');
      ReactDOM.render(
        pointTipsRender(this.options),
        tipsDom[0]
      );
      Tips.createTip({
        placement: placement,
        targetDom: this.dom,
        notEventThrough: true,
        genTipDom: () => {
          return tipsDom[0];
        }
      });
    }
  }
}