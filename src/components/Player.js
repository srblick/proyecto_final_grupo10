export default class Player {
    sprite;
    constructor(x, y, scene) {
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(x, y, 'nave').setScale(0.6).setImmovable();
    }

    getSprite(){
        return this.sprite;
    }
    animatePlayer() {
    }
}