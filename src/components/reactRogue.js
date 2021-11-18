import React from 'react';

const ReactRouge = ({ width, height, tilesize }) => {
  const canvasReference = React.useRef();
  React.useEffect(() => {
  console.log('draw to canvas');
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