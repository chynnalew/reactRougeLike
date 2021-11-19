import React from 'react';
import InputControl from './inputControl';

const ReactRouge = ({ width, height, tilesize }) => {
  const canvasReference = React.useRef();
  const [player, setPlayer] = React.useState({x:64, y:128})
  let inputControl = new InputControl();

  const handleInput = (action, data) =>{
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
    let newPlayer = { ...player };
    newPlayer.x += data.x * tilesize;
    newPlayer.y += data.y * tilesize;
    setPlayer(newPlayer);
  }

  React.useEffect(() => {
    console.log('bind input');
    inputControl.bindKeys();
    inputControl.subscribe(handleInput);
    return () => {
      inputControl.unbindKeys();
      inputControl.unsubscribe(handleInput);
    }
  })


  React.useEffect(() => {
    console.log('draw to canvas');
    const context = canvasReference.current.getContext('2d');
    context.clearRect(0, 0, width * tilesize, height * tilesize)
    context.fillStyle = '#000';
    context.fillRect(player.x, player.y, 16, 16)
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