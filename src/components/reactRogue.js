import React, {useEffect, useState, useRef} from 'react';
import InputControl from './InputControl';
import World from './World';

const ReactRouge = ({ width, height, tilesize }) => {
  const canvasReference = useRef(null);
  //useState hook set equal to array [state, value] ex: [world, setWorld]. in this case, the code means world state is set to a new instance of the world class
  //now we can change world state with the setWorld method
  //the player is instantiated in the world constructor so it has access to the world's properties
  const [world, setWorld] = useState(new World(width, height, tilesize))
  
  //create instance of input control class
  let inputControl = new InputControl();

  const handleInput = (action, data) => {
    //JSON.stringify() allows us to see a string rendition of a json object
    console.log(`handle input: ${action}: ${JSON.stringify(data)}`)
    // create instance of world that we can manipulate
    let newWorld = new World();
    //give new world world's properties
    Object.assign(newWorld, world);
    //call method to listen and move the player property of the world
    newWorld.movePlayer(data.x, data.y);
    //setWorld effects our useState to tell it to set world to new world
    setWorld(newWorld);
  }

  // create map. passing in an empty array as a second parameter tells the program to only use effect once on initial render
  useEffect(() => {
    let newWorld = new World();
    //give new world world's properties
    Object.assign(newWorld, world);
    //call method create the map
    newWorld.createCellularMap();
    console.log(world.player)
    newWorld.moveToSpace(world.player);
    console.log(world.player)
    setWorld(newWorld);
    console.log(world.player)
    // eslint-disable-next-line
  },[])

  //this hook initially renders the world and its entities
  useEffect(() => {
    const context = canvasReference.current.getContext('2d');
    context.clearRect(0, 0, width * tilesize, height * tilesize);
    world.draw(context);
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