import React from 'react';

const ReactRouge = () => {
  const canvasStyle = {
    width: '256px',
    height: '256px',
    border: '5px black solid'
  }
  return (
    <canvas style={canvasStyle}></canvas>
  );
}

export default ReactRouge;