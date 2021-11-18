import React from 'react';

const ReactRouge = ({ width, height, tilesize }) => {
  const canvasReference = React.useRef();
  React.useEffect(() => {
    console.log('draw to canvas');
    const context = canvasReference.current.getContext('2d');
    context.clearRect(0, 0, width * tilesize, height * tilesize)
    context.fillStyle = '#000';
    context.fillRect(12, 22, 16, 16)
  })
  return (
    <canvas
      ref={canvasReference}
       width={width * tilesize}
       height={height * tilesize}
       style={{border: '1px solid black'}}
     ></canvas>
  )
}

export default ReactRouge;