export default class MenuScene extends Phaser.Scene{

    constructor(){
        super('MenuScene')
    }
    
    preload(){
        
        this.load.image('play-btn', 'assets/play-btn.png');
        this.load.image('settings-btn', 'assets/settings-btn.png');
        this.load.image('bg-menu', 'assets/retro-bg.png');

    }
    create(){
        this.add.image(230,450,'bg-menu').setScale(0.9).setDepth(0);

        this.add.text(300,250,'LOADING...',{fontSize: '40px',}).setDepth(1);

    }
    update(){

    }
}