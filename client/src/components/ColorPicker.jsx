import React from 'react'
import {SketchPicker} from 'react-color';//it will show a color picker
import { useSnapshot } from 'valtio';

import state from '../store';

const ColorPicker = () => {

  const snap = useSnapshot(state);

  return (
    <div className='absolute left-full ml-3'>
      <SketchPicker
        color={snap.color}
        disableAlpha //its the opacity we have
        //we can set some preset colors(the user can directly pick them) manuallly 
        //or we can remove this tag, and user will get 
        //some default preset colors by SketchPicker
        presetColors={[
          "#ccc",
          "#efbd4e",
          "#80c670",
          "#726de8",
          "#353934",
          "#2ccce4",
          "#ff8a65",
          "#7098da",
          "#c19277",
          "#ff96ad",
          "#512314",
          "#5f123d",
        ]}
        onChange={(color) => state.color = color.hex}
      />
    </div>
  )
}

export default ColorPicker