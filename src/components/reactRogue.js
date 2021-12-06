import React, {useEffect, useState, useRef} from 'react';
import InputControl from './InputControl';

const ReactRouge = ({ width, height, tilesize }) => {
  const canvasReference = useRef(null);

  //useState hook set equal to array [state, value] ex: [player, setPlayer]. in this case, the code means player state is set to  {x: coordinate position, y: coordinate position}
  //now we can change player state with the setPlayer method
  const [player, setPlayer] = useState({ x: width * tilesize / 2, y: height * tilesize / 2 })
  
  //create instance of input control class
  let inputControl = new InputControl();

  //this hook initially renders a black square where our player state defines the player coordinates
  useEffect(() => {
    const ctx = canvasReference.current.getContext('2d');
    ctx.clearRect(0, 0, width * tilesize, height * tilesize)
    ctx.fillStyle = '#000';
    ctx.fillRect(player.x, player.y, 16, 16)
  })

  //useEffect hook tells react the component needs to do something else after render. it runs after render and after each update to the component
  useEffect(() => {
    //bind keys with the input control class
    inputControl.bindKeys();
    inputControl.subscribe(handleInput);
    //return gets called with the component closes
    return () => {
      inputControl.unbindKeys();
      inputControl.unsubscribe(handleInput);
    }
  })

  const handleInput = (action, data) => {
    //JSON.stringify() allows us to see a string rendition of a json object
    console.log(`handle input: ${action}: ${JSON.stringify(data)}`)
    //copy player to make changes
    let newPlayer = { ...player };
    newPlayer.x += data.x * tilesize;
    newPlayer.y += data.y * tilesize;
    //setPlayer effects our useState to tell it to set player to new player
    setPlayer(newPlayer);
  }
  
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