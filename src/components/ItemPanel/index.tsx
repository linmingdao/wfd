import React, { forwardRef, RefAttributes, useContext } from 'react';
import styles from './index.less';
import { Collapse } from 'antd';
import 'antd/lib/collapse/style';
import LangContext from '../../util/context';
const { Panel } = Collapse;

export interface ItemPanelProps {
  height: number;
}
const ItemPanel = forwardRef<any, ItemPanelProps>(({ height }, ref) => {
  const { i18n } = useContext(LangContext);
  return (
    <div ref={ref} className={styles.itemPanel} style={{ height }}>
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header="节点类型" key="1" forceRender>
          <img
            data-item={"{clazz:'start',size:'30*30',label:''}"}
            src={require('../assets/flow/start.svg')}
            style={{ width: 42, height: 42 }}
          />
          <div>{i18n['startEvent']}</div>
          <img
            data-item={"{clazz:'scriptTask',size:'80*44',label:'" + i18n['scriptTask'] + "'}"}
            src={require('../assets/flow/script-task.svg')}
            style={{ width: 80, height: 44 }}
          />
          <div>{i18n['scriptTask']}</div>
          <img
            data-item="{clazz:'parallelGateway',size:'40*40',label:''}"
            src={require('../assets/flow/parallel-gateway.svg')}
            style={{ width: 48, height: 48 }}
          />
          <div>{i18n['parallelGateway']}</div>
          <img
            data-item={"{clazz:'end',size:'30*30',label:''}"}
            src={require('../assets/flow/end.svg')}
            style={{ width: 42, height: 42 }}
          />
          <div>{i18n['endEvent']}</div>
        </Panel>
      </Collapse>
    </div>
  );
});

export default ItemPanel;
