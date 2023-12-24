import { useCallback } from "react";
import { Handle, Position } from "reactflow";

function LeafNode({data}) {
  const onChange = useCallback((event) => {
    console.log(event.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div style={{display:"flex",flexDirection:"column"}}>
        <label htmlFor="text" style={{textAlign:"center"}}>Leaf node</label>
        <div className="text-sm">
          Key:
          <input id="text" name="text" onChange={onChange} defaultValue={data.key}/>
        </div>
        <div className="text-sm">
          Description:
          <input id="text" name="text" onChange={onChange} defaultValue={data.description}/>
        </div>
        <div className="text-sm">
          Final Answer:
          <input id="text" name="text" onChange={onChange} defaultValue={data.answer}/>
        </div>
      </div>
    </>
  );
}

export default LeafNode;