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
    this.createRandomMap()
  }

  createRandomMap() {
    for (let x = 0; x < this.width; x++){
      for (let y = 0; y < this.height; y++){
        //randomly put a 1 or 0 at each element in 2d array
        this.worldmap[x][y] = Math.round(Math.random());
      }
    }
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