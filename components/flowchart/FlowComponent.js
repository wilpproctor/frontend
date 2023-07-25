import React, {  useState, useRef, useCallback} from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  Controls
} from 'reactflow';

import 'reactflow/dist/style.css';
import DownloadButton from './DownloadButton';
import CustomNode from './CustomNode';
import ParallelogramNode from "./ParallelogramNode";
import DiamondNode from './DiamondNode';
import StartNode from './StartNode';
import EndNode from './EndNode';



const nodeTypes = {
  custom: CustomNode,
  parallelogram: ParallelogramNode,
  diamond: DiamondNode,
  start: StartNode,
  end: EndNode
};

const initialNodes = [
  {
    id: '1',
    type: 'start',
    position: { x: 250, y: 250},
  },
  {
    id: '2',
    type: 'end',
    position: { x: 250, y: 600},
  },
];

const initEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2'
  }
];

let id = 0;
const getId = () => `dndnode_${id++}`;
const defaultViewport = { x: 250, y: 375, zoom: 1.5 };

const FlowComponent = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform your desired action with the selected option and input value
    console.log('Selected Option:', selectedOption);
    console.log('Input Value:', inputValue);
    const newNode = {
        id: getId(),
        type: selectedOption,
        position: {x: 250, y: 420},
        data: { label: inputValue },
      };
      setNodes((nds) => nds.concat(newNode));
    // Reset the form
    setSelectedOption('');
    setInputValue('');
  };

  const onConnect = useCallback((params) => setEdges(addEdge(params, edges)), [edges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );


  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );
  
  
  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onNodesDelete={onNodesDelete}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            fitView
            attributionPosition="top-right"
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            className="h-[700px] w-[800px]"
            defaultViewport={defaultViewport}
            minZoom={0.2}
            maxZoom={4}
          >
            <Controls />
            <Background variant="dots" gap={12} size={1} />
            <DownloadButton /> 
          </ReactFlow>
        </div>
      </ReactFlowProvider>
        <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 border border-gray-300 shadow-md">
        <div className="mb-4">
          <label htmlFor="option" className="block text-gray-700 text-sm font-bold mb-2">Select an option:</label>
          <select id="option" value={selectedOption} onChange={(event) => {setSelectedOption(event.target.value)}} className="w-full p-2 border border-gray-300 rounded">
            <option value="">-- Select --</option>
            {
              Object.keys(nodeTypes).map(node => <option value={node}>{node}</option>)
            }
          </select>
        </div>
        { (selectedOption !== "start" && selectedOption !== "end") && (<div className="mb-4">
          <label htmlFor="input" className="block text-gray-700 text-sm font-bold mb-2">Input value:</label>
          <input id="input" type="text" value={inputValue} onChange={(event) => {setInputValue(event.target.value)}} className="w-full p-2 border border-gray-300 rounded" />
        </div>)}
        <div className="text-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </div>
          <spam className="text-xs">To remove node or edge use backspace</spam>
      </form>
    </div>
    </div>
  );
}

export default FlowComponent