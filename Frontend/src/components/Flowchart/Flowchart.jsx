import { useState, useRef, useCallback } from "react";

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
  Panel,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./FlowchartSidebar";
import CSS from "./Flowchart.module.css";

import RootNode from "./RootNode";
import InternalNode from "./InternalNode";
import LeafNode from "./LeafNode";

import CustomEdge from "./CustomEdge";

const initialNodes = [
  {
    id: "1",
    type: "rootNode",
    data: {
      question: "Kind of Information?",
      description:
        "Textile factory query",
      answer: "Order Details, Product Information, Fabric Care & Maintenance ",
    },
    position: { x: 250, y: -20 },
  },
  {
    id: "2",
    type: "leafNode",
    data: {
      key: "Order Details",
      description: "Order related query",
      answer:
        "Please type in the order ID, details will be sent immediately. Thank you!",
    },
    position: { x: 25, y: 100 },
  },
  {
    id: "3",
    type: "internalNode",
    data: {
      key: "Product Information",
      question: "Natural or synthetic-fiber textiles?",
      description: "Product information query",
      answer: "Natural Fibers, Synthetic Fibers",
    },
    position: { x: 150, y: 250 },
  },
  {
    id: "4",
    type: "internalNode",
    data: {
      key: "Fabric Care & Maintenance",
      question: "Fabric washing or stain removal?",
      description: "Fabric care query",
      answer: "Fabric Wash, Stain Removal ",
    },
    position: { x: 450, y: 90 },
  },
  {
    id: "5",
    type: "leafNode",
    data: {
      key: "Natural Fibers ",
      description: "Natural fiber textiles query",
      answer:
        "A product catalogue of natural fiber textiles will be sent by email. Thank you!",
    },
    position: { x: 25, y: 450 },
  },
  {
    id: "6",
    type: "leafNode",
    data: {
      key: "Synthetic Fibers ",
      description: "Synthetic fiber textiles query",
      answer:
        "A product catalogue of synthetic fiber textiles will be sent by email. Thank you!",
    },
    position: { x: 375, y: 450 },
  },
  {
    id: "7",
    type: "leafNode",
    data: {
      key: "Fabric Wash ",
      description: "Fabric washing query",
      answer:
        "Specialized care instructions for fabrics will be sent by email soon. Thank you!",
    },
    position: { x: 480, y: 270 },
  },
  {
    id: "8",
    type: "leafNode",
    data: {
      key: "Stain Removal ",
      description: "Stain removal query",
      answer:
        "Detailed stain removal guidelines for fabrics will be sent by email soon. Thank you!",
    },
    position: { x: 840, y: 270 },
  },
];

const initialEdges = [
  { id: "e1-2", type: "custom-edge", source: "1", target: "2" },
  { id: "e1-3", type: "custom-edge", source: "1", target: "3" },
  { id: "e1-4", type: "custom-edge", source: "1", target: "4" },
  { id: "e3-5", type: "custom-edge", source: "3", target: "5" },
  { id: "e3-6", type: "custom-edge", source: "3", target: "6" },
  { id: "e4-7", type: "custom-edge", source: "4", target: "7" },
  { id: "e4-8", type: "custom-edge", source: "4", target: "8" },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
  rootNode: RootNode,
  internalNode: InternalNode,
  leafNode: LeafNode,
};
const edgeTypes = {
  "custom-edge": CustomEdge,
};

const flowKey = "example-flow";

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => {
      const edge = { ...params, type: "custom-edge" };
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const [variant, setVariant] = useState("cross");

  const nodeColors = (color) => {
    switch (color.type) {
      case "rootNode":
        return "green";
      case "internalNode":
        return "blue";
      case "leafNode":
        return "red";
    }
  };

  // Storing and Restoring from localStorage
  // const [rfInstance, setRfInstance] = useState(null);
  // const { setViewport } = useReactFlow();
  // const onSave = useCallback(() => {
  //   if (rfInstance) {
  //     const flow = rfInstance.toObject();
  //     localStorage.setItem(flowKey, JSON.stringify(flow));
  //   }
  // }, [rfInstance]);

  // const onRestore = useCallback(() => {
  //   const restoreFlow = async () => {
  //     const flow = JSON.parse(localStorage.getItem(flowKey));

  //     if (flow) {
  //       const { x = 0, y = 0, zoom = 1 } = flow.viewport;
  //       setNodes(flow.nodes || []);
  //       setEdges(flow.edges || []);
  //       setViewport({ x, y, zoom });
  //     }
  //   };

  //   restoreFlow();
  // }, [setNodes, setViewport,setEdges]);

  return (
    <div className={CSS.container}>
      <div className={CSS.dndflow}>
        <ReactFlowProvider>
          {/* const { setViewport } = useReactFlow(); */}

          <div className={CSS.reactflowwrapper} ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
            >
              <Controls />

              <MiniMap zoomable pannable nodeColor={nodeColors} />

              <Background color="#ccc" variant={variant} />

              <Panel position="top-left">
                <div>Viewpoint Variants:</div>
                <div className={CSS.panel}>
                  <button
                    onClick={() => setVariant("dots")}
                    className={CSS.panelBtn}
                  >
                    dots
                  </button>
                  <button
                    onClick={() => setVariant("lines")}
                    className={CSS.panelBtn}
                  >
                    lines
                  </button>
                  <button
                    onClick={() => setVariant("cross")}
                    className={CSS.panelBtn}
                  >
                    cross
                  </button>
                </div>
              </Panel>

              {/* <Panel position="top-right">
                <button onClick={onSave}>save</button>
                <button onClick={onRestore}>restore</button>
              </Panel> */}
            </ReactFlow>
          </div>
          <Sidebar />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default DnDFlow;
