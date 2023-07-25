import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({ data }) {

  return (
    <div className="shadow-md w-[100px] h-[100px] rounded-full bg-white border border-black flex items-center justify-center">
      <div className="flex items-center justify-center">
        <p>{data.label}</p>
      </div>  
      <Handle type="target" position={Position.Top} className='w-[3px] h-[3px] !bg-red-700'/>
      <Handle type="source" position={Position.Bottom} className='w-[3px] h-[3px] !bg-teal-500'/>
    </div>
  );
}

export default memo(CustomNode);
