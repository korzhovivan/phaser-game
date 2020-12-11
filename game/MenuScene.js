
export default class MenuScene extends Phaser.Scene{

    constructor(){
        super('MenuScene')
    }

    preload(){
        
        this.load.image('play-btn', 'assets/play-btn.png');
        this.load.image('option-btn', 'assets/settings-btn.png');
        this.load.image('bg-menu', 'assets/retro-bg.png');
        this.load.image('blue-star', 'assets/blue-star.png');
        this.load.image('red-star', 'assets/red-star.png');
        this.load.image('stars-boys', 'assets/stars-boys.png');
        this.load.image('window', 'assets/window.png');
        this.load.audio('menu-song', '../assets/menu-song.mp3');
    }
    create(){
        if (this.sound.context.state === 'suspended') { this.sound.context.resume();}
        var audioCtx = new AudioContext();
        this.music = this.add.audio('menu-song');

        this.music.play();
        //this.input.setDefaultCursor('url(assets/cursor.cur), pointer');

        this.add.image(160,460,'bg-menu').setScale(1)

        this.add.image(680,50,'blue-star').setScale(2.5)
        this.add.image(150,50,'red-star').setScale(2.5)
        this.add.image(415,50,'stars-boys').setScale(0.38)


        this.play_btn = this.add.image(200,215,'play-btn').setScale(0.9)
        this.option_btn = this.add.image(200,325,'option-btn').setScale(0.9)

        this.play_btn.setInteractive()
        this.option_btn.setInteractive()

        this.play_btn.on('pointerover', ()=>{
            this.play_btn.setScale(0.95)

        })
        this.play_btn.on('pointerout', ()=>{
            this.play_btn.setScale(0.9)
        })
        this.play_btn.on('pointerup',()=>{
            console.log('click');
        })
        
        this.option_btn.on('pointerover', ()=>{
            this.option_btn.setScale(0.95)

        })
        this.option_btn.on('pointerout', ()=>{
            this.option_btn.setScale(0.9)
        })
        this.option_btn.on('pointerup',()=>{
            this.scene.start('OptionsScene')
        })
        

       

    }
    update(){

    }
}