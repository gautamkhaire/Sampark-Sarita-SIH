import { useCallback } from "react";
import { Handle, Position } from "reactflow";

function RootNode({data}) {
  const onChange = useCallback((event) => {
    console.log(event.target.value);
  }, []);

  return (
    <>
      <div style={{display:"flex",flexDirection:"column"}}>
        <label htmlFor="text" style={{textAlign:"center"}}>Root node</label>
        <div className="text-sm">
          Description:
          <input id="text" name="text" className="hover:h-full" onChange={onChange} defaultValue={data.description}/>
        </div>
        <div className="text-sm">
          Question:
          <input id="text" name="text" className="focus:h-full" onChange={onChange} defaultValue={data.question}/>
        </div>
        <div className="text-sm">
          Answers:
          <input id="text" name="text" className="hover:h-full" onChange={onChange} defaultValue={data.answer}/>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export default RootNode;
