import CSS from './Flowchart.module.css';

function Sidebar () {
    const onDragStart = (event, nodeType) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <aside className={CSS.sidebarcontainer}>
        <div className={CSS.description}>You can drag these nodes to the viewport.</div>
        <div className={CSS.dndnodeinput} onDragStart={(event) => onDragStart(event, 'rootNode')} draggable>
          Root Node
        </div>
        <div className={CSS.dndnode} onDragStart={(event) => onDragStart(event, 'internalNode')} draggable>
          Internal Node
        </div>
        <div className={CSS.dndnodeoutput} onDragStart={(event) => onDragStart(event, 'leafNode')} draggable>
          Leaf Node
        </div>
      </aside>
    );
  }
  
  export default Sidebar;
  
  