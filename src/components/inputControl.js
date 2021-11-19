class InputControl{
  observer = [];

  subscribe(fn) {
  this.observer.push(fn)
  }
  unsubscribe(fn) {
    this.observers= this.observers.filter(subscriber => subscriber !== fn)
  }

  broadcast(action, data) {
    this.observers.forEach(subscriber => subscriber(action, data));
  }

  handleKeys = (event) => {
    event.preventDefault();
    switch (event.keyCode) {
      case 37:
        this.broadcast('move', { x: -1, y: 0 });
        break;
      case 38:
        this.broadcast('move', { x: 0, y: -1 });
        break;
      case 39:
        this.broadcast('move', { x: 1, y: 0 });
        break;
      case 40:
        this.broadcast('move', { x: 0, y: 1 });
        break;
      default:
        break;
    }
  }

  bindKeys() {
    document.addEventListener('keydown',this.handleKeys)
  }
  unbindKeys() {
    document.removeEventListener('keydown', this.handleKeys)
  }
}

export default InputControl;