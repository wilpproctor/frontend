import React, { memo} from 'react';
import { Handle, Position } from 'reactflow';

function StartNode({ data }) {

  return (
    <div className="shadow-md w-[150px] h-[50px] rounded-md bg-white border border-black flex items-center justify-center">
      <div className="flex items-center justify-center">
        <p>Start</p>
      </div>  

      <Handle id='c'type="source" position={Position.Bottom} className='w-[3px] h-[3px] !bg-teal-500'/>
    </div>    
  );
}

export default memo(StartNode);