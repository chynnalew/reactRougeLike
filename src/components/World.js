import { Map } from "rot-js";
import Player from "./Player";

class World {
  constructor(width, height, tilesize) {
    this.width = width;
    this.height = height;
    this.tilesize = tilesize;
    //add player as an entity in the world so it can interact with world elements
    this.entities = [new Player(0, 0, 16)];

    //create one dimensional array
    this.worldmap = new Array(this.width);
    //loop over one dimensional array and add a new array at each index to make our array 2d
    for (let x = 0; x < this.width; x++) {
      this.worldmap[x] = new Array(this.height);
    }
  }

  //method to prevent entities from spawning on a wall
  moveToSpace(entity) {
    console.log('moveToSpace triggered')
    for (let x = entity.x; x < this.width; x++) {
      for (let y = entity.y; y < this.height; y++) {
        if (this.worldmap[x][y] === 0) {
          console.log('moved!')
          entity.x = x;
          console.log(`${entity} + ${x}`)
          entity.y = y;
          console.log(`${entity} + ${y}`)
          return;
        }
      }
    }
  }

  get player() {
    return this.entities[0];
  }

  //method to check if a wall is at the coords
  isWall(x, y) {
    return (
      this.worldmap[x] === undefined ||
      this.worldmap[y] === undefined ||
      (this.worldmap[x][y] === 1 )
    );
  }

  movePlayer(dx, dy) {
    console.log('player moved!')
    let tempPlayer = this.player.copyPlayer();
    if (this.isWall(tempPlayer.x, tempPlayer.y)) {
      console.log(`way blocked at ${tempPlayer.x} and ${tempPlayer.y}`);
    } else {
      this.player.move(dx, dy);
    }
  }

  //uses cellular map generator from rot-js
  createCellularMap() {
    //last argument = properties of map
    let map = new Map.Cellular(this.width, this.height, { connected: true });
    //adjust how dense the map is
    map.randomize(0.57);
    //create walls around the edges of the map
    const userCallback = (x, y, value) => {
      if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
        this.worldmap[x][y] = 1;
        return;
      }
      this.worldmap[x][y] = value === 0 ? 1 : 0;
    };
    map.create(userCallback);
    map.connect(userCallback, 1);
  }

  //draw a wall for a 1 in the 2d array
  draw(context) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.worldmap[x][y] === 1) {
          this.drawWall(context, x, y);
        }
      }
    }
    this.entities.forEach((entity) => {
      entity.draw(context);
    });
  }

  //use filled in squares for walls
  drawWall(context, x, y) {
    context.fillStyle = "#000";
    context.fillRect(
      x * this.tilesize,
      y * this.tilesize,
      this.tilesize,
      this.tilesize
    );
  }
}

export default World;
