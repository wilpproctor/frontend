import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function ParallelogramNode({ data }) {

  return (
    <div className="shadow-md w-[150px] h-[50px] skew-x-[20deg] rounded-md bg-white border border-black flex items-center justify-center">
      <div className="flex items-center justify-center">
        <p>{data.label}</p>
      </div>  

      <Handle id='a' type="target" position={Position.Top} className='w-[3px] h-[3px] !bg-red-700'/>
      <Handle id='b' type="target" position={Position.Right} className='w-[3px] h-[3px] !bg-red-700'/>
      <Handle id='c'type="source" position={Position.Bottom} className='w-[3px] h-[3px] !bg-teal-500'/>
    </div>    
  );
}

export default memo(ParallelogramNode);