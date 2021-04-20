import Designer from '../../dist';
import React, { Component } from 'react';
import { Button, Modal, Dropdown, Menu } from 'antd';
import 'antd/dist/antd.less';
class Demo extends Component {
  constructor(props) {
    super(props);
    this.wfdRef = React.createRef();
  }

  state = { modalVisible: false, selectedLang: 'zh' };

  langMenu = (
    <Menu
      onClick={(lang) => {
        this.changeLang(lang);
      }}
    >
      <Menu.Item key="zh">
        <span role="img">{'🇨🇳'}</span>
        {' 简体中文'}
      </Menu.Item>
      <Menu.Item key="en">
        <span role="img">{'🇬🇧'}</span>
        {' English'}
      </Menu.Item>
    </Menu>
  );

  handleModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  changeLang({ key }) {
    this.setState({ selectedLang: key });
  }

  onNodeAdd(data) {
    console.log('onNodeAdd', data);
  }

  onNodeClick(data) {
    console.log('onNodeClick', data);
  }

  onNodeDbClick(data) {
    console.log('onNodeDbClick', data);
  }

  render() {
    const data = {
      nodes: [
        {
          type: 'start-node',
          id: 'startNode1',
          x: 101.5163297045101,
          y: 259.45645412130636,
          label: '开始',
          clazz: 'start',
          data: { type: '告警' },
          style: {},
          size: [30, 30],
        },
        {
          type: 'timer-start-node',
          id: 'startNode2',
          x: 101.5163297045101,
          y: 349,
          label: '开始',
          clazz: 'timerStart',
          style: {},
          size: [30, 30],
        },
        {
          type: 'script-task-node',
          id: 'taskNode2',
          x: 394,
          y: 199,
          label: '经理审批',
          clazz: 'scriptTask',
          style: {},
          size: [80, 44],
        },
        {
          type: 'end-node',
          id: 'endNode',
          x: 600,
          y: 320,
          label: '结束',
          clazz: 'end',
          style: {},
          size: [30, 30],
        },
        {
          type: 'script-task-node',
          clazz: 'scriptTask',
          size: [80, 44],
          label: '脚本节点',
          x: 210,
          y: 199,
          id: 'scriptTask1618914827260',
          style: {},
        },
        {
          type: 'parallel-gateway-node',
          clazz: 'parallelGateway',
          size: [40, 40],
          label: '条件',
          x: 394,
          y: 314.5,
          id: 'parallelGateway1618914858909',
          style: {},
        },
        {
          type: 'script-task-node',
          clazz: 'scriptTask',
          size: [80, 44],
          label: '脚本节点',
          x: 435,
          y: 434,
          id: 'scriptTask1618914874682',
          style: {},
        },
      ],
      edges: [
        {
          clazz: 'flow',
          source: 'startNode1',
          target: 'scriptTask1618914827260',
          sourceAnchor: 1,
          targetAnchor: 3,
          type: 'flow-polyline-round',
          id: 'edge11',
          style: {},
          startPoint: { x: 117.0163297045101, y: 259.45645412130636, index: 1 },
          endPoint: { x: 169.5, y: 199, index: 3 },
        },
        {
          clazz: 'flow',
          source: 'scriptTask1618914827260',
          target: 'taskNode2',
          sourceAnchor: 1,
          targetAnchor: 3,
          type: 'flow-polyline-round',
          id: 'edge12',
          style: {},
          startPoint: { x: 250.5, y: 199, index: 1 },
          endPoint: { x: 353.5, y: 199, index: 3 },
        },
        {
          clazz: 'flow',
          source: 'taskNode2',
          target: 'parallelGateway1618914858909',
          sourceAnchor: 2,
          targetAnchor: 0,
          type: 'flow-polyline-round',
          id: 'edge13',
          style: {},
          startPoint: { x: 394, y: 221.5, index: 2 },
          endPoint: { x: 394, y: 296, index: 0 },
        },
        {
          clazz: 'flow',
          source: 'startNode2',
          target: 'parallelGateway1618914858909',
          sourceAnchor: 1,
          targetAnchor: 3,
          type: 'flow-polyline-round',
          id: 'edge14',
          style: {},
          startPoint: { x: 117.0163297045101, y: 349, index: 1 },
          endPoint: { x: 375.5, y: 314.5, index: 3 },
        },
        {
          clazz: 'flow',
          source: 'scriptTask1618914874682',
          target: 'endNode',
          sourceAnchor: 1,
          targetAnchor: 2,
          type: 'flow-polyline-round',
          id: 'edge16',
          style: {},
          startPoint: { x: 475.5, y: 434, index: 1 },
          endPoint: { x: 584.5, y: 320, index: 2 },
        },
        {
          clazz: 'flow',
          source: 'parallelGateway1618914858909',
          target: 'scriptTask1618914874682',
          sourceAnchor: 2,
          targetAnchor: 0,
          type: 'flow-polyline-round',
          id: 'edge17',
          style: {},
          startPoint: { x: 394, y: 333, index: 2 },
          endPoint: { x: 435, y: 411.5, index: 0 },
        },
        {
          clazz: 'flow',
          source: 'taskNode2',
          target: 'endNode',
          sourceAnchor: 1,
          targetAnchor: 0,
          type: 'flow-polyline-round',
          id: 'edge18',
          style: {},
          startPoint: { x: 434.5, y: 199, index: 1 },
          endPoint: { x: 600, y: 304.5, index: 0 },
        },
        {
          clazz: 'flow',
          source: 'startNode2',
          target: 'scriptTask1618914874682',
          sourceAnchor: 2,
          targetAnchor: 3,
          type: 'flow-polyline-round',
          id: 'edge19',
          style: {},
          startPoint: { x: 101.5163297045101, y: 364.5, index: 2 },
          endPoint: { x: 394.5, y: 434, index: 3 },
        },
        {
          clazz: 'flow',
          source: 'scriptTask1618914827260',
          target: 'endNode',
          sourceAnchor: 0,
          targetAnchor: 0,
          type: 'flow-polyline-round',
          id: 'edge20',
          style: {},
          startPoint: { x: 210, y: 176.5, index: 0 },
          endPoint: { x: 600, y: 304.5, index: 0 },
        },
      ],
      combos: [],
      groups: [],
    };

    const data1 = {
      nodes: [
        { id: 'startNode1', x: 50, y: 200, label: '', clazz: 'start' },
        { id: 'startNode2', x: 50, y: 320, label: '', clazz: 'timerStart' },
        { id: 'taskNode1', x: 200, y: 200, label: '主任审批', clazz: 'userTask' },
        { id: 'taskNode2', x: 400, y: 200, label: '经理审批', clazz: 'scriptTask', active: true },
        { id: 'gatewayNode', x: 400, y: 320, label: '金额大于1000', clazz: 'gateway' },
        { id: 'taskNode3', x: 400, y: 450, label: '董事长审批', clazz: 'receiveTask' },
        { id: 'catchNode1', x: 600, y: 200, label: '等待结束', clazz: 'signalCatch' },
        { id: 'endNode', x: 600, y: 320, label: '', clazz: 'end' },
      ],
      edges: [
        {
          source: 'startNode1',
          target: 'taskNode1',
          sourceAnchor: 1,
          targetAnchor: 3,
          clazz: 'flow',
        },
        {
          source: 'startNode2',
          target: 'gatewayNode',
          sourceAnchor: 1,
          targetAnchor: 3,
          clazz: 'flow',
        },
        {
          source: 'taskNode1',
          target: 'catchNode1',
          sourceAnchor: 0,
          targetAnchor: 0,
          clazz: 'flow',
        },
        {
          source: 'taskNode1',
          target: 'taskNode2',
          sourceAnchor: 1,
          targetAnchor: 3,
          clazz: 'flow',
        },
        {
          source: 'taskNode2',
          target: 'gatewayNode',
          sourceAnchor: 1,
          targetAnchor: 0,
          clazz: 'flow',
        },
        {
          source: 'taskNode2',
          target: 'taskNode1',
          sourceAnchor: 2,
          targetAnchor: 2,
          clazz: 'flow',
        },
        {
          source: 'gatewayNode',
          target: 'taskNode3',
          sourceAnchor: 2,
          targetAnchor: 0,
          clazz: 'flow',
        },
        {
          source: 'gatewayNode',
          target: 'endNode',
          sourceAnchor: 1,
          targetAnchor: 2,
          clazz: 'flow',
        },
        { source: 'taskNode3', target: 'endNode', sourceAnchor: 1, targetAnchor: 1, clazz: 'flow' },
        {
          source: 'catchNode1',
          target: 'endNode',
          sourceAnchor: 1,
          targetAnchor: 0,
          clazz: 'flow',
        },
      ],
    };

    const candidateUsers = [
      { id: '1', name: 'Tom' },
      { id: '2', name: 'Steven' },
      { id: '3', name: 'Andy' },
    ];
    const candidateGroups = [
      { id: '1', name: 'Manager' },
      { id: '2', name: 'Security' },
      { id: '3', name: 'OA' },
    ];
    const height = 715;
    const { modalVisible, selectedLang } = this.state;

    return (
      <div>
        <Button
          style={{ float: 'right', marginTop: 6, marginRight: 6 }}
          onClick={() => console.log(JSON.stringify(this.wfdRef.current.graph.save()))}
        >
          保存
        </Button>
        <Button
          style={{ float: 'right', marginTop: 6, marginRight: 6 }}
          onClick={() => this.wfdRef.current.graph.saveXML()}
        >
          导出XML
        </Button>
        <Button
          style={{ float: 'right', marginTop: 6, marginRight: 6 }}
          onClick={() => this.handleModalVisible(true)}
        >
          查看流程图
        </Button>
        <Dropdown overlay={this.langMenu} trigger={['click']}>
          <Button style={{ float: 'right', marginTop: 6, marginRight: 10 }}>语言</Button>
        </Dropdown>
        <Designer
          ref={this.wfdRef}
          data={data}
          height={height}
          mode={'edit'}
          onNodeAdd={(data) => this.onNodeAdd(data)}
          onNodeClick={(data) => this.onNodeClick(data)}
          onNodeDbClick={(data) => this.onNodeDbClick(data)}
          users={candidateUsers}
          groups={candidateGroups}
          lang={selectedLang}
        />
        <Modal
          title="查看流程图"
          visible={modalVisible}
          onCancel={() => this.handleModalVisible(false)}
          width={800}
          maskClosable={false}
          footer={null}
          destroyOnClose
          bodyStyle={{ height }}
        >
          <Designer data={data1} height={height - 40} isView />
        </Modal>
      </div>
    );
  }
}

export default Demo;
