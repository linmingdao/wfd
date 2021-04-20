import * as React from 'react';
import styles from './index.less';
import G6 from '@antv/g6/lib';
import { getShapeName } from './util/clazz';
import locale from './locales/index';
import Command from './plugins/command';
import Toolbar from './plugins/toolbar';
import AddItemPanel from './plugins/addItemPanel';
import CanvasPanel from './plugins/canvasPanel';
import { exportXML } from './util/bpmn';
import LangContext from './util/context';
import ItemPanel from './components/ItemPanel';
import ToolbarPanel from './components/ToolbarPanel';
import registerShape from './shape';
import registerBehavior from './behavior';
import { IDefaultModel, IProcessModel, ISelectData } from './types';

registerShape(G6);
registerBehavior(G6);

export interface DesignerProps {
  /** 流程数据 */
  data: any;
  /** 模式为只读或编辑 */
  mode: 'default' | 'view' | 'edit';
  /** 是否只显示中间画布 */
  isView?: boolean;
  /** 画布高度 */
  height?: number;
  /** 添加新节点到面板 */
  onNodeAdd?: (item: any) => void;
  /** 面板节点被点击 */
  onNodeClick?: (item: any) => void;
  /** 面板节点被双击 */
  onNodeDbClick?: (item: any) => void;
  /** 语言 */
  lang?: 'en' | 'zh';
}

export interface DesignerStates {
  selectedModel: IDefaultModel;
  processModel: IProcessModel;
}

export default class Designer extends React.Component<DesignerProps, DesignerStates> {
  static defaultProps = { height: 500, isView: false, mode: 'edit', lang: 'zh' };
  private readonly pageRef: React.RefObject<any>;
  private readonly toolbarRef: React.RefObject<any>;
  private readonly itemPanelRef: React.RefObject<any>;
  private resizeFunc: (...args: any[]) => any;
  private onNodeAdd: (item: any) => any;
  private onNodeClick: (item: any) => any;
  private onNodeDbClick: (item: any) => any;
  public graph: any;
  public cmdPlugin: any;

  constructor(cfg: DesignerProps) {
    super(cfg);
    this.pageRef = React.createRef();
    this.toolbarRef = React.createRef();
    this.itemPanelRef = React.createRef();
    this.onNodeAdd = cfg.onNodeAdd;
    this.onNodeClick = cfg.onNodeClick;
    this.onNodeDbClick = cfg.onNodeDbClick;
    this.resizeFunc = () => {};
    this.state = {
      selectedModel: {},
      processModel: {
        id: '',
        name: '',
        clazz: 'process',
        dataObjs: [],
        signalDefs: [],
        messageDefs: [],
      },
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.data !== this.props.data) {
      if (this.graph) {
        this.graph.changeData(this.initShape(this.props.data));
        this.graph.setMode(this.props.mode);
        if (this.cmdPlugin) {
          this.cmdPlugin.initPlugin(this.graph);
        }
        if (this.props.isView) {
          this.graph.fitView(5);
        }
      }
    }
  }

  componentDidMount() {
    const { isView, mode } = this.props;
    const height = this.props.height - 1;
    const width = this.pageRef.current.offsetWidth;
    let plugins = [];
    if (!isView) {
      this.cmdPlugin = new Command();
      const toolbar = new Toolbar({ container: this.toolbarRef.current });
      const addItemPanel = new AddItemPanel({ container: this.itemPanelRef.current });
      const canvasPanel = new CanvasPanel({ container: this.pageRef.current });
      plugins = [this.cmdPlugin, toolbar, addItemPanel, canvasPanel];
    }
    this.graph = new G6.Graph({
      plugins: plugins,
      container: this.pageRef.current,
      height: height,
      width: width,
      modes: {
        default: ['drag-canvas', 'clickSelected'],
        view: [],
        edit: [
          'drag-canvas',
          'hoverNodeActived',
          'hoverAnchorActived',
          'dragNode',
          'dragEdge',
          'dragPanelItemAddNode',
          'clickSelected',
          'deleteItem',
          'itemAlign',
          'dragPoint',
          'brush-select',
        ],
      },
      defaultEdge: {
        type: 'flow-polyline-round',
      },
    });
    this.graph.saveXML = (createFile = true) =>
      exportXML(this.graph.save(), this.state.processModel, createFile);
    if (isView) {
      this.graph.setMode('view');
    } else {
      this.graph.setMode(mode);
    }
    this.graph.data(this.props.data ? this.initShape(this.props.data) : { nodes: [], edges: [] });
    this.graph.render();
    if (isView && this.props.data && this.props.data.nodes) {
      this.graph.fitView(5);
    }
    this.initEvents();
  }

  initShape(data) {
    if (data && data.nodes) {
      return {
        nodes: data.nodes.map((node) => {
          return {
            type: getShapeName(node.clazz),
            ...node,
          };
        }),
        edges: data.edges,
      };
    }
    return data;
  }

  initEvents() {
    this.graph.on('afteritemselected', (items: any) => {
      if (items && items.length > 0) {
        let item = this.graph.findById(items[0]);
        if (!item) {
          item = this.getNodeInSubProcess(items[0]);
        }
        this.setState({ selectedModel: { ...item.getModel() } });
      } else {
        this.setState({ selectedModel: this.state.processModel });
      }
    });

    this.graph.on('onNodeClick', (item: any) => {
      this.onNodeClick && this.onNodeClick(item);
    });

    this.graph.on('onNodeDbClick', (data: any) => {
      this.onNodeDbClick && this.onNodeDbClick(data);
    });

    this.graph.on('onNodeAdd', (data: any) => {
      this.onNodeAdd && this.onNodeAdd(data);
    });

    const page = this.pageRef.current;
    const graph = this.graph;
    const height = this.props.height - 1;
    this.resizeFunc = () => {
      graph.changeSize(page.offsetWidth, height);
    };
    window.addEventListener('resize', this.resizeFunc);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunc);
    if (this.graph) {
      this.graph.getNodes().forEach((node) => {
        node.getKeyShape().stopAnimate();
      });
    }
  }

  onItemCfgChange(key, value) {
    const items = this.graph.get('selectedItems');
    if (items && items.length > 0) {
      let item = this.graph.findById(items[0]);
      if (!item) {
        item = this.getNodeInSubProcess(items[0]);
      }
      if (this.graph.executeCommand) {
        this.graph.executeCommand('update', {
          itemId: items[0],
          updateModel: { [key]: value },
        });
      } else {
        this.graph.updateItem(item, { [key]: value });
      }
      this.setState({ selectedModel: { ...item.getModel() } });
    } else {
      const canvasModel = { ...this.state.processModel, [key]: value };
      this.setState({ selectedModel: canvasModel });
      this.setState({ processModel: canvasModel });
    }
  }

  getNodeInSubProcess(itemId) {
    const subProcess = this.graph.find('node', (node) => {
      if (node.get('model')) {
        const clazz = node.get('model').clazz;
        if (clazz === 'subProcess') {
          const containerGroup = node.getContainer();
          const subGroup = containerGroup.subGroup;
          const item = subGroup.findById(itemId);
          return subGroup.contain(item);
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    if (subProcess) {
      const group = subProcess.getContainer();
      return group.getItem(subProcess, itemId);
    }
    return null;
  }

  render() {
    const height = this.props.height;
    const { isView, lang } = this.props;
    const i18n = locale[lang.toLowerCase()];
    return (
      <LangContext.Provider value={{ i18n, lang }}>
        <div className={styles.root}>
          {!isView && <ToolbarPanel ref={this.toolbarRef} />}
          <div>
            {!isView && <ItemPanel ref={this.itemPanelRef} height={height} />}
            <div
              ref={this.pageRef}
              className={styles.canvasPanel}
              style={{ height, width: isView ? '100%' : '90%', borderBottom: isView ? 0 : null }}
            />
          </div>
        </div>
      </LangContext.Provider>
    );
  }
}
