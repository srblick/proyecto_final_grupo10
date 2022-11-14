import Phaser from "phaser";
class Movement{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.directionX = 2;
        this.directionY = 0;
        this.xMax = 380;
        this.yMax = 300;
        this.xMin = 20;
        this.yMin = 20;
        this.iteraction = 0;
    }

    calcularPosition(){
        if(this.y > this.yMin){

        }else{
            this.y += this.directionY;
        }
        this.iteraction++;
        return new Phaser.Math.Vector2(this.x, this.y);
    }
}