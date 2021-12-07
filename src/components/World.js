import { Map } from 'rot-js';

class World {
  constructor(width, height, tilesize) {
    this.width = width;
    this.height = height;
    this.tilesize = tilesize;
    //create one dimensional array
    this.worldmap = new Array(this.width);
    //loop over one dimensional array and add a new array at each index to make our array 2d
    for (let x = 0; x < this.width; x++) {
      this.worldmap[x] = new Array(this.height)
    }
    this.createCellularMap()
  }
  //uses cellular map generator from rot-js
  createCellularMap() {
    //last argument = properties of map
    let map = new Map.Cellular(this.width, this.height, { connected: true })
    //adjust how dense the map is
    map.randomize(0.57);
    //create walls around the edges of the map
    const userCallback = (x, y, value) => {
      if (x === 0 || y === 0 || x === (this.width - 1) || y === (this.height - 1)) {
        this.worldmap[x][y] = 1;
        return;
      }
      this.worldmap[x][y] = (value === 0) ? 1 : 0;
    }
    map.create(userCallback);
    map.connect(userCallback, 1);
  }

  //draw a wall for a 1 in the 2d array
  draw(context) {
    for (let x = 0; x < this.width; x++){
      for (let y = 0; y < this.height; y++){
        if (this.worldmap[x][y] === 1) {
          this.drawWall(context, x, y)
        }
      }
    }
  }

  //use filled in squares for walls
  drawWall(context, x, y) {
    context.fillStyle = '#000';
    context.fillRect(x*this.tilesize, y*this.tilesize, this.tilesize, this.tilesize)
  }
}

export default World;