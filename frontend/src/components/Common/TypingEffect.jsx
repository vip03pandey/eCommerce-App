import React, { useEffect, useRef, useState } from 'react'

const TypingEffect = ({text,delay}) => {
    const [displayText,setDisplayText]=useState(text);
    const velocityRef=useRef({speed:1,endIndex:0});
    useEffect(()=>{
       const interval= setInterval(()=>{
            if(velocityRef.current.endIndex>text.length){
                velocityRef.current.speed=-1;
            }
            else if(velocityRef.current.endIndex<=0){
                velocityRef.current.speed=1;
            }
            velocityRef.current.endIndex+=velocityRef.current.speed;
            setDisplayText(text.slice(0,velocityRef.current.endIndex))
        },delay)
        return ()=>{
            clearInterval(interval)
        }
    },[delay,text])
  return (
    <span>{displayText}</span>
  )
}

export default TypingEffect
