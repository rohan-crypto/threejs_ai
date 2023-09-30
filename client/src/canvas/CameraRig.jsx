//component to set positioning of the camera
import React, {useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'

import state from '../store'

const CameraRig = ({children}) => {

  const group = useRef();
  const snap = useSnapshot(state);

//   call effects and states in each frame; so we can also get delta 
//   (delta is difference in current and previous frame)
  useFrame((state, delta) => {

    // make shirt of proper sizes on each screen type
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    //set the initial position of the model according to screen sizes and page
    let targetPosition = [-0.4,0,2];//by hit and trial
    if(snap.intro)//if we are on home page
    {
        if(isBreakpoint) targetPosition = [0,0,2];
        if(isMobile) targetPosition = [0,0.2,2.5];//for mobile screen
    }
    else//not on home page
    {   
        if(isMobile) targetPosition = [0,0.2,2.5];
        else targetPosition = [0,0,2];
    }

    //set model camera position 
    //(it will smoothly render the shirt with some movement)
    //(but not complete movement)
    easing.damp3(state.camera.position, targetPosition, 0.25,delta);
    
    //set the model rotation smoothly
    easing.dampE(
        group.current.rotation,//current axis
        [state.pointer.y /10, -state.pointer.x / 5, 0], //target [x,y,z] axis
        0.25,//smooth time
        delta //delta
    )
  })

  return <group ref={group} >{children}</group>
}

export default CameraRig