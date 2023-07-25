import React, { memo} from 'react';
import { Handle, Position } from 'reactflow';

function EndNode({ data }) {

  return (
    <div className="shadow-md w-[150px] h-[50px] rounded-md bg-white border border-black flex items-center justify-center">
      <div className="flex items-center justify-center">
        <p>End</p>
      </div>  
      <Handle id='a' type="target" position={Position.Top} className='w-[3px] h-[3px] !bg-red-700'/>
    </div>    
  );
}

export default memo(EndNode);