class GameScreen {
    constructor(width,height) {
        this.width  = width;
        this.height = height;
    }
}

class Coordinates {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}
class Velocity extends Coordinates{
    constructor(x,y){
        super(x,y);
        this.velocityX = 0;
        this.velocityY = 0;
    }
}
class MovingObject extends Velocity {
    constructor(context,width,height,x,y,color){
        super(x,y);
        this.width = width;
        this.height = height;
        this.color = color;
        this.context = context;
    }
    render() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.render()
    }
}
class StandingObject extends Coordinates{
    constructor (context,width,height,x,y,color){
        super(x,y);
        this.width = width;
        this.height = height;
        this.color = color;
        this.context = context;
    }
    render() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}