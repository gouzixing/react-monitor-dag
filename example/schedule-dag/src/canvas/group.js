import {Group} from 'butterfly-dag';
import $ from 'jquery';
import _ from 'lodash';


export default class  ScheduleGroup extends Group{
  constructor(opts) {
    super(opts);
  }
  
  draw(obj) {
    let _dom = obj.dom;
    if (!_dom) {
      _dom = $('<div></div>')
        .attr('class', 'group')
        .css('top', obj.top)
        .css('left', obj.left)
        .css('width', obj.width + 'px')
        .css('height', obj.height + 'px')
        .attr('id', obj.id);
    }
    let group = $(_dom);
    this._container = $('<div></div>')
    .attr('class', 'butterflie-group');
    let titleContainer = $('<div class="butterfly-group-title-content"></div>');
    group.append(titleContainer)
    return _dom;
  } 
}