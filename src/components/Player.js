class Player {
  //create the player constructor
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  //method to handle movement
  move(moveX, moveY) {
    this.x += moveX*this.size;
    this.y += moveY*this.size;
  }

  //method to draw the player on the canvas
  draw(context) {
    context.fillStyle = '#c24b63';
    context.textBaseline = 'hanging';
    context.font = '16px Helvetica';
    context.fillText('@',this.x, this.y);
  }
}

export default Player;