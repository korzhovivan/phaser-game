import MenuScene from './MenuScene.js';

export default class LoadScene extends Phaser.Scene{

    constructor(){
        super('Load Scene')
    }
    

    preload(){
        
        
        //this.load.audio('menu-song', '../assets/menu-song.mp3');

        //Make loading bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            },
        })
        this.add.text(300,250,'LOADING...',{fontSize: '40px',})

        for (let i = 0; i < 100; i++) {
            this.load.image('bg-menu'+i, 'assets/retro-bg.png');
        }

        this.load.on('progress',(percent) => {
            loadingBar.fillRect(0,this.game.renderer.height /2, this.game.renderer.width * percent, 50)
        })
        
        this.load.on('complete', ()=>{

        })

    }
    create(){
        this.scene.start('MenuScene')
    }
    update(){

    }
}