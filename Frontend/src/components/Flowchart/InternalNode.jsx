import { useCallback } from "react";
import { Handle, Position } from "reactflow";

function InternalNode({data}) {
  const onChange = useCallback((event) => {
    console.log(event.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div style={{display:"flex",flexDirection:"column"}}>
        <label htmlFor="text" style={{textAlign:"center"}}>Internal node</label>
        <div className="text-sm">
          Key:
          <input id="text" name="text" onChange={onChange} defaultValue={data.key}/>
        </div>
        <div className="text-sm">
          Description:
          <input id="text" name="text" onChange={onChange} defaultValue={data.description}/>
        </div>
        <div className="text-sm">
          Question:
          <input id="text" name="text" onChange={onChange} defaultValue={data.question}/>
        </div>
        <div className="text-sm">
          Answers:
          <input id="text" name="text" onChange={onChange} defaultValue={data.answer}/>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export default InternalNode;