import { useEffect, useState } from 'react';

const UseMobileWidth = () => {
const [width, setWidth] = useState();

useEffect(()=>{
  const handleResize = () => {
    setWidth(window.innerWidth)
  }
  window.addEventListener('resize', handleResize);
  handleResize();

  return () => window.addEventListener('resize', handleResize)
},[])

  return width <= 1024;
}

export default UseMobileWidth;