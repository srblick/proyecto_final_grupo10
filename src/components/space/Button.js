import Phaser from "phaser";
export default class Button extends Phaser.GameObjects.Sprite{
    /**
     * frameOut: frame para el evento over. 
     * frameOunt: frame para el evento out.
     * frameDown: frame para el evento down.
     * redirectScene: nombre de la escena a la que sera redirigida.
     */
    constructor(scene, x, y, sprite, frameOver, frameOut, frameDown, redirectScene) {
        super(scene, x, y, sprite); // creo el sprite 
        this.scene = scene;
        this.scene.add.existing(this); // hace visible el button
        this.setInteractive(); // lo hace interactivo con el mouse

        //se activa cuando pasa el cursor por arriba del boton
        this.on('pointerover', () => {
            this.setFrame(frameOver);
        });
        //se activa cuando el cursor sale del boton
        this.on('pointerout', () => {
            this.setFrame(frameOut);
        });
        //se activa cuando hace click en el boton y cambia a la escena pasada por parametro
        this.on('pointerdown', () => {
            this.setFrame(frameDown);
            this.scene.sound.add('click',{loop: false}).play();
            this.scene.sound.stopByKey('audioMenu');
            /** creo un evento para que se muestre el boton presionado 
             *  y despues 150 milisegundos cambie de escena*/ 
            this.scene.time.addEvent({ 
                delay: 150,
                callback: () => {
                    this.scene.scene.start(redirectScene);
                }
            });            
        });
    }
}