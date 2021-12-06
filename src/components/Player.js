class Player {
  //create the player constructor
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  //method to handle movement
  move(moveX, moveY) {
    this.x += moveX;
    this.y += moveY;
  }

  //method to draw the player on the canvas
  draw(context) {
    //color
    context.fillStyle = '#f00';
    //make the text (character symbol) appear in the tile instead of above it
    context.textBaseline = 'hanging';
    // player font
    context.font = '16pt Helvetica';
    //symbol to represent the character, Xcoords, Ycoords
    context.fillText('@', this.x*this.size, this.y*this.size)
  } 
}