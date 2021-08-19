'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout, Pagination, Input } from 'antd';
import { CloseCircleOutlined, CheckOutlined } from '@ant-design/icons';
import ScheduleDag from '../src/index.tsx';
import mockData from './mock_data/data';
import $ from 'jquery';
import newData from './mock_data/newdata';
import _ from 'lodash';
import 'antd/dist/antd.css';
import './index.less';

const { Header } = Layout;
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasData: {},
      runAnimation: {
        data: { nodes: [], edges: [], groups: [] },
      },
    };
  }

  componentWillMount() {
    this._data = _.cloneDeep(mockData);
    this.setState({
      canvasData: this._data,
    });
  }

  componentDidMount() {
    const newAnimation1 = {
      data: { nodes: ['1'], edges: [], groups: [] },
    };
    const newAnimation2 = {
      data: { nodes: [], edges: ['1source-2target','1source-3target','1source-4target'], groups: [] },
    };
    const newAnimation3 = {
      data: { nodes: ['2','3','4'], edges: [], groups: [] },
    };
    setTimeout(() => {
      this.setState({
        runAnimation: newAnimation1,
      });
    }, 1500);
    setTimeout(() => {
      this.setState({
        runAnimation: newAnimation2,
      });
    }, 3000);
    setTimeout(() => {
      this.setState({
        runAnimation: newAnimation3,
      });
    }, 4500);
  }

  render() {
    const { canvasData, runAnimation } = this.state;
    const config = {
      // labelRender: (label, info) => {
      //   return label;
      // // },
      // nodeRender: (nodeOpts) => {
      //   return (
      //     <span className="node-text">{nodeOpts.title + "hah"}</span>
      //   )
      // },
      nodeTipsRender: (nodeOpts) => {
        return <span className="node-tips">{nodeOpts.title}</span>;
      },
      // endpointTipRender: () => {
      //   return <span className="endpoint-tips">ha</span>;
      // },
      edge: {
        // shapeType:"Straight",
        config: {
          // arrow: false
        },
      },
      diffOptions: ['title'],
    };

    return (
      <ScheduleDag
        data={canvasData}
        className="schedule-dag"
        config={config}
        // onClickNode={(node) => {console.log(node)}}
        // validateConnectEdge={(item)=>{console.log(item)}}
        onChange={(data) => {
          this.setState({ canvasData: data });
        }}
        // onClickNode={()=>console.log('clicknode')}
        // onDbClickNode={()=>{console.log("dbclicknode")}}
        // onContextMenuNode={()=>{console.log('rightclicknode')}}
        // onFocusNode={()=>{console.log("focusnode")}}
        // onUnfocusNode={()=>{console.log("unfocusnode")}}
        // onClickEdge={()=>{console.log("clickedge")}}
        // onDbClickEdge={()=>{console.log("dbedge")}}
        // onContextMenuEdge={()=>{console.log("rightedge")}}
        // onClickEndpoint={()=>{console.log(1)}}
        runAnimation={runAnimation}
        validateConnectEdge = {false}
      />
    );
  }
}

ReactDOM.render(
  <Router>
    <Layout>
      <Header className="header">ScheduleDag</Header>
      <Layout>
        <Demo />
      </Layout>
    </Layout>
  </Router>,
  document.getElementById('main')
);
