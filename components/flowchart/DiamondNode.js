import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function DiamondNode({ data }) {
  return (
    <div className="shadow-md  h-[100px] text-center rotate-45 w-[100px] rounded-md bg-white border border-black flex items-center justify-center">
      <div className="flex items-center justify-center -rotate-45">
        <p>{data.label}</p>
      </div>  

      <Handle id='a' type="target" position={Position.Top} className='!left-[0px] w-[2px] h-[2px] !bg-red-700'/>
      <Handle id='b' type="source" position={Position.Right} className='right-[50px] translate-x-[51px] translate-y-[-51px] w-[2px] h-[2px] !bg-teal-500' />
      <Handle id='c'type="source" position={Position.Bottom} className='bottom-[50px] translate-x-[47px] translate-y-[53px] w-[2px] h-[2px] !bg-teal-500'/>
    </div>    
  );
}

export default memo(DiamondNode);