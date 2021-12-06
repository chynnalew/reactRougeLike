import React, {useEffect, useState, useRef} from 'react';
import InputControl from './InputControl';
import Player from './Player';

const ReactRouge = ({ width, height, tilesize }) => {
  const canvasReference = useRef(null);

  //useState hook set equal to array [state, value] ex: [player, setPlayer]. in this case, the code means player state is set to a new instance of the player class
  //now we can change player state with the setPlayer method
  const [player, setPlayer] = useState(new Player(width*tilesize/2, height*tilesize/2, tilesize))
  
  //create instance of input control class
  let inputControl = new InputControl();

  //this hook initially renders the player with player class draw method
  useEffect(() => {
    const context = canvasReference.current.getContext('2d');
    context.clearRect(0, 0, width * tilesize, height * tilesize);
    player.draw(context)
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
    let newPlayer = new Player();
    //give new player player's properties
    Object.assign(newPlayer, player);
    newPlayer.move(data.x, data.y);
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